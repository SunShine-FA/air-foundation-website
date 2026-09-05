import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Image as ImageIcon, Filter, GripVertical, ChevronLeft, ChevronRight, Layers, Calendar, Sparkles } from 'lucide-react';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import EventAlbumModal from '../components/EventAlbumModal';
import BulkGalleryModal from '../components/BulkGalleryModal';
import { contentService } from '../../../services/contentService';

export default function GalleryModule({ gallery = [], onRefresh, showToast }) {
  const [galleryList, setGalleryList] = useState(gallery);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isAlbumModalOpen, setIsAlbumModalOpen] = useState(false);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [editingAlbum, setEditingAlbum] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isReordering, setIsReordering] = useState(false);
  const [draggedIdx, setDraggedIdx] = useState(null);
  const [dragOverIdx, setDragOverIdx] = useState(null);

  useEffect(() => {
    setGalleryList(gallery);
  }, [gallery]);

  const categories = ['All', 'Events', 'Arts', 'Tech', 'Sports', 'Academic', 'Ceremonies'];

  const filteredGallery = activeCategory === 'All'
    ? galleryList
    : galleryList.filter(item => (item.category || '').toLowerCase() === activeCategory.toLowerCase());

  // Drag and Drop Handlers
  const handleDragStart = (e, index) => {
    setDraggedIdx(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverIdx !== index) {
      setDragOverIdx(index);
    }
  };

  const handleDrop = async (e, targetIndex) => {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === targetIndex) {
      setDraggedIdx(null);
      setDragOverIdx(null);
      return;
    }

    const updated = [...galleryList];
    const [movedItem] = updated.splice(draggedIdx, 1);
    updated.splice(targetIndex, 0, movedItem);

    const withUpdatedOrder = updated.map((item, index) => ({
      ...item,
      sort_order: index + 1
    }));

    setGalleryList(withUpdatedOrder);
    setDraggedIdx(null);
    setDragOverIdx(null);
    await saveNewOrder(withUpdatedOrder, movedItem.title);
  };

  const handleDragEnd = () => {
    setDraggedIdx(null);
    setDragOverIdx(null);
  };

  const handleMove = async (currentIndex, direction) => {
    const targetIndex = currentIndex + direction;
    if (targetIndex < 0 || targetIndex >= galleryList.length) return;

    const updated = [...galleryList];
    const temp = updated[currentIndex];
    updated[currentIndex] = updated[targetIndex];
    updated[targetIndex] = temp;

    const withUpdatedOrder = updated.map((item, index) => ({
      ...item,
      sort_order: index + 1
    }));

    setGalleryList(withUpdatedOrder);
    await saveNewOrder(withUpdatedOrder, temp.title);
  };

  const saveNewOrder = async (orderedList, itemName) => {
    setIsReordering(true);
    try {
      const payload = orderedList
        .filter(item => item && item.id)
        .map(item => ({ id: item.id, sort_order: item.sort_order }));

      if (payload.length > 0) {
        const res = await contentService.reorder('gallery', payload);
        if (res.success) {
          showToast(`Reordered "${itemName}". Order saved!`, 'success');
        } else {
          showToast(res.error || 'Failed to save order in database', 'error');
        }
      } else {
        showToast(`Reordered "${itemName}" locally`, 'success');
      }
      onRefresh();
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setIsReordering(false);
    }
  };

  const handleOpenCreate = () => {
    setEditingAlbum(null);
    setIsAlbumModalOpen(true);
  };

  const handleOpenEdit = (album) => {
    setEditingAlbum(album);
    setIsAlbumModalOpen(true);
  };

  const handleSaveAlbum = async (payload, id) => {
    if (id) {
      const res = await contentService.update('gallery', id, payload);
      if (res.success) {
        showToast('Event album updated successfully', 'success');
      } else {
        showToast(res.error || 'Failed to update event album', 'error');
      }
    } else {
      const res = await contentService.create('gallery', payload);
      if (res.success) {
        showToast('New event album created successfully', 'success');
      } else {
        showToast(res.error || 'Failed to create event album', 'error');
      }
    }
    setIsAlbumModalOpen(false);
    onRefresh();
  };

  const handleDelete = async () => {
    if (!deleteItem?.id) return;
    setIsDeleting(true);
    try {
      const res = await contentService.remove('gallery', deleteItem.id);
      if (res.success) {
        showToast('Event album removed from gallery', 'success');
        setDeleteItem(null);
        onRefresh();
      } else {
        showToast(res.error || 'Failed to remove album', 'error');
      }
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6 text-left max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center space-x-2.5">
            <h2 className="text-xl font-bold font-poppins text-slate-900">
              Campus Media Gallery ({galleryList.length} Albums)
            </h2>
            {isReordering && (
              <span className="text-[11px] font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full animate-pulse">
                Saving Order...
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Create event albums (PTM, Sports Gala, Poetry Fest) containing multiple photos per event.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleOpenCreate}
            className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-light text-white font-bold text-xs flex items-center space-x-2 transition-all shadow-md shadow-primary/20 cursor-pointer"
          >
            <Plus size={16} />
            <span>Create Event Album</span>
          </button>
          <button
            onClick={() => setIsBulkModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center space-x-2 transition-all cursor-pointer"
          >
            <Layers size={15} />
            <span>Quick Batch Upload</span>
          </button>
        </div>
      </div>

      {/* Categories Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              activeCategory === cat
                ? 'bg-primary text-white shadow-sm'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGallery.map((item, idx) => {
          const isDragging = draggedIdx === idx;
          const isDragOver = dragOverIdx === idx;

          return (
            <div
              key={item.id || idx}
              draggable
              onDragStart={(e) => handleDragStart(e, idx)}
              onDragOver={(e) => handleDragOver(e, idx)}
              onDrop={(e) => handleDrop(e, idx)}
              onDragEnd={handleDragEnd}
              className={`bg-white rounded-2xl border shadow-sm overflow-hidden group transition-all duration-200 text-left flex flex-col justify-between select-none ${
                isDragging
                  ? 'opacity-40 scale-95 border-primary ring-2 ring-primary/20'
                  : isDragOver
                  ? 'border-secondary ring-2 ring-secondary/30 scale-[1.02]'
                  : 'border-slate-100 hover:shadow-md'
              }`}
            >
              {(() => {
                const photos = Array.isArray(item.images) && item.images.length > 0 ? item.images : (item.image ? [item.image] : []);
                const photoCount = photos.length;
                const cover = photos[0] || item.image;

                return (
                  <>
                    <div className="relative aspect-[4/3] bg-slate-950 overflow-hidden">
                      <img
                        src={cover}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=600'; }}
                      />
                      
                      {/* Drag Grip Handle */}
                      <div
                        className="absolute top-3 left-3 bg-slate-950/80 hover:bg-secondary hover:text-slate-950 text-white backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-bold flex items-center space-x-1 cursor-grab active:cursor-grabbing transition-colors shadow-md z-10"
                        title="Drag to rearrange"
                      >
                        <GripVertical size={13} />
                        <span>#{idx + 1}</span>
                      </div>

                      {/* Category & Photo Count Badges */}
                      <div className="absolute top-3 right-3 flex items-center space-x-1.5 z-10">
                        <span className="bg-slate-900/85 backdrop-blur-md text-secondary text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                          {item.category}
                        </span>
                        <span className="bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-sm">
                          {photoCount} {photoCount === 1 ? 'Photo' : 'Photos'}
                        </span>
                      </div>

                      {/* Mini Preview Strip on Card Hover */}
                      {photoCount > 1 && (
                        <div className="absolute bottom-2 inset-x-2 flex items-center gap-1.5 bg-slate-950/70 backdrop-blur-xs p-1.5 rounded-xl">
                          {photos.slice(0, 4).map((pUrl, pIdx) => (
                            <img
                              key={pIdx}
                              src={pUrl}
                              alt=""
                              className="w-8 h-8 rounded-lg object-cover border border-white/20 shrink-0"
                            />
                          ))}
                          {photoCount > 4 && (
                            <span className="text-[10px] font-bold text-white px-1">
                              +{photoCount - 4}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="p-4 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-bold text-sm text-slate-800 font-poppins truncate" title={item.title}>
                          {item.title}
                        </h4>
                        {item.date && (
                          <span className="text-[10px] text-slate-400 font-semibold shrink-0">
                            {item.date}
                          </span>
                        )}
                      </div>

                      {item.description && (
                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      )}

                      {/* Action Controls */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                        <div className="flex items-center space-x-1">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => handleMove(idx, -1)}
                            className="p-1 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed"
                            title="Move Left"
                          >
                            <ChevronLeft size={13} />
                          </button>
                          <button
                            type="button"
                            disabled={idx === galleryList.length - 1}
                            onClick={() => handleMove(idx, 1)}
                            className="p-1 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed"
                            title="Move Right"
                          >
                            <ChevronRight size={13} />
                          </button>
                        </div>

                        <div className="flex items-center space-x-1.5">
                          <button
                            onClick={() => handleOpenEdit(item)}
                            className="px-2.5 py-1 rounded-lg bg-primary/10 hover:bg-primary text-primary hover:text-white text-xs font-bold transition-colors flex items-center space-x-1 cursor-pointer"
                            title="Edit Event Album & Photos"
                          >
                            <Edit2 size={13} />
                            <span>Edit Album</span>
                          </button>
                          {item.id && (
                            <button
                              onClick={() => setDeleteItem(item)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                              title="Delete Album"
                            >
                              <Trash2 size={14} />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          );
        })}
      </div>

      <EventAlbumModal
        isOpen={isAlbumModalOpen}
        onClose={() => setIsAlbumModalOpen(false)}
        onSave={handleSaveAlbum}
        album={editingAlbum}
        showToast={showToast}
        nextSortOrder={galleryList.length + 1}
      />

      <BulkGalleryModal
        isOpen={isBulkModalOpen}
        onClose={() => setIsBulkModalOpen(false)}
        onUploadSuccess={() => {
          onRefresh();
        }}
        showToast={showToast}
        nextSortOrder={galleryList.length + 1}
      />

      <DeleteConfirmModal
        isOpen={!!deleteItem}
        onClose={() => setDeleteItem(null)}
        onConfirm={handleDelete}
        title="Delete Event Album"
        itemName={deleteItem?.title}
        isDeleting={isDeleting}
      />
    </div>
  );
}
