import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, BookOpen, GripVertical, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import CrudModal from '../components/CrudModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import { contentService } from '../../../services/contentService';

export default function ProgramsModule({ programs = [], onRefresh, showToast }) {
  const [programList, setProgramList] = useState(programs);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isReordering, setIsReordering] = useState(false);
  const [draggedIdx, setDraggedIdx] = useState(null);
  const [dragOverIdx, setDragOverIdx] = useState(null);

  useEffect(() => {
    setProgramList(programs);
  }, [programs]);

  const fields = [
    { name: 'slug', label: 'Program Identifier / Slug (Optional)', placeholder: 'e.g. primary, college', required: false },
    { name: 'title', label: 'Program Title', placeholder: 'e.g. Primary School (Grade 1 - 5)', required: true },
    { name: 'curriculum', label: 'Curriculum Board / Structure', placeholder: 'e.g. Federal Board (FBISE)', required: true },
    { name: 'description', label: 'Program Description', type: 'textarea', rows: 4, required: true },
    { name: 'image', label: 'Program Cover Image', type: 'image', required: true },
    { name: 'sort_order', label: 'Sort Order', type: 'number', placeholder: '1', required: false }
  ];

  // Drag and Drop handlers
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

    const updated = [...programList];
    const [movedItem] = updated.splice(draggedIdx, 1);
    updated.splice(targetIndex, 0, movedItem);

    const withUpdatedOrder = updated.map((item, index) => ({
      ...item,
      sort_order: index + 1
    }));

    setProgramList(withUpdatedOrder);
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
    if (targetIndex < 0 || targetIndex >= programList.length) return;

    const updated = [...programList];
    const temp = updated[currentIndex];
    updated[currentIndex] = updated[targetIndex];
    updated[targetIndex] = temp;

    const withUpdatedOrder = updated.map((item, index) => ({
      ...item,
      sort_order: index + 1
    }));

    setProgramList(withUpdatedOrder);
    await saveNewOrder(withUpdatedOrder, temp.title);
  };

  const saveNewOrder = async (orderedList, itemName) => {
    setIsReordering(true);
    try {
      const payload = orderedList
        .filter(item => item && item.id)
        .map(item => ({ id: item.id, sort_order: item.sort_order }));

      if (payload.length > 0) {
        const res = await contentService.reorder('programs', payload);
        if (res.success) {
          showToast(`Reordered "${itemName}". Display order updated!`, 'success');
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

  const handleOpenAdd = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem({
      ...item,
      slug: item.slug || item.code || (typeof item.id === 'string' && !item.id.includes('-') ? item.id : '')
    });
    setIsModalOpen(true);
  };

  const handleSave = async (formData) => {
    setIsSaving(true);
    try {
      const generatedSlug = (formData.slug || '').trim() ||
        (formData.code || '').trim() ||
        (formData.title || '')
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '') ||
        `program-${Date.now()}`;

      const payload = {
        title: formData.title,
        slug: generatedSlug,
        curriculum: formData.curriculum,
        description: formData.description,
        image: formData.image,
        sort_order: Number(formData.sort_order) || (programList.length + 1)
      };

      if (editingItem?.id) {
        const res = await contentService.update('programs', editingItem.id, payload);
        if (res.success) {
          showToast('Program updated successfully', 'success');
        } else {
          showToast(res.error || 'Failed to update program', 'error');
        }
      } else {
        const res = await contentService.create('programs', payload);
        if (res.success) {
          showToast('Program created successfully', 'success');
        } else {
          showToast(res.error || 'Failed to create program', 'error');
        }
      }
      setIsModalOpen(false);
      onRefresh();
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteItem?.id) return;
    setIsDeleting(true);
    try {
      const res = await contentService.remove('programs', deleteItem.id);
      if (res.success) {
        showToast('Program deleted', 'success');
        setDeleteItem(null);
        onRefresh();
      } else {
        showToast(res.error || 'Failed to delete program', 'error');
      }
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6 text-left max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center space-x-2.5">
            <h2 className="text-xl font-bold font-poppins text-slate-900">
              Academic Programs & Curricula ({programList.length})
            </h2>
            {isReordering && (
              <span className="text-[11px] font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full animate-pulse">
                Saving Order...
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Drag cards or use arrows to rearrange the program display sequence on the website.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-light text-white font-semibold text-xs flex items-center space-x-2 transition-all shadow-md shadow-primary/15 cursor-pointer w-fit"
        >
          <Plus size={16} />
          <span>Add New Program</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {programList.map((prog, idx) => {
          const isDragging = draggedIdx === idx;
          const isDragOver = dragOverIdx === idx;

          return (
            <div
              key={prog.id || idx}
              draggable
              onDragStart={(e) => handleDragStart(e, idx)}
              onDragOver={(e) => handleDragOver(e, idx)}
              onDrop={(e) => handleDrop(e, idx)}
              onDragEnd={handleDragEnd}
              className={`bg-white rounded-2xl border shadow-sm overflow-hidden flex flex-col justify-between transition-all duration-200 select-none ${
                isDragging
                  ? 'opacity-40 scale-95 border-primary ring-2 ring-primary/20'
                  : isDragOver
                  ? 'border-secondary ring-2 ring-secondary/30 scale-[1.02]'
                  : 'border-slate-100 hover:shadow-md'
              }`}
            >
              <div className="relative h-44 overflow-hidden bg-slate-100 group">
                <img src={prog.image} alt={prog.title} className="w-full h-full object-cover" />
                
                {/* Drag Grip Handle */}
                <div
                  className="absolute top-3 left-3 bg-slate-950/80 hover:bg-secondary hover:text-slate-950 text-white backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-bold flex items-center space-x-1 cursor-grab active:cursor-grabbing transition-colors shadow-md z-10"
                  title="Drag to rearrange display order"
                >
                  <GripVertical size={14} />
                  <span>#{idx + 1}</span>
                </div>

                <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md text-secondary px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                  {prog.slug || prog.code || 'Academic'}
                </div>
              </div>

              <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-base font-bold font-poppins text-slate-900">{prog.title}</h3>
                  <p className="text-xs text-primary font-semibold mt-1">{prog.curriculum}</p>
                  <p className="text-xs text-slate-500 mt-2.5 leading-relaxed line-clamp-3">
                    {prog.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  {/* Position Shift Buttons */}
                  <div className="flex items-center space-x-1">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMove(idx, -1)}
                      className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      title="Move Left"
                    >
                      <ChevronLeft size={14} />
                    </button>
                    <span className="text-[11px] font-mono text-slate-400 font-bold px-1">#{idx + 1}</span>
                    <button
                      type="button"
                      disabled={idx === programList.length - 1}
                      onClick={() => handleMove(idx, 1)}
                      className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      title="Move Right"
                    >
                      <ChevronRight size={14} />
                    </button>
                  </div>

                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => handleOpenEdit(prog)}
                      className="p-2 rounded-lg text-slate-400 hover:text-primary hover:bg-primary/5 transition-colors cursor-pointer"
                      title="Edit"
                    >
                      <Edit2 size={16} />
                    </button>
                    {prog.id && (
                      <button
                        onClick={() => setDeleteItem(prog)}
                        className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <CrudModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        title={editingItem ? 'Edit Academic Program' : 'Add Academic Program'}
        fields={fields}
        initialData={
          editingItem
            ? {
                ...editingItem,
                slug: editingItem.slug || editingItem.code || ''
              }
            : { sort_order: programList.length + 1 }
        }
        isSaving={isSaving}
      />

      <DeleteConfirmModal
        isOpen={!!deleteItem}
        onClose={() => setDeleteItem(null)}
        onConfirm={handleDelete}
        title="Delete Academic Program"
        itemName={deleteItem?.title}
        isDeleting={isDeleting}
      />
    </div>
  );
}
