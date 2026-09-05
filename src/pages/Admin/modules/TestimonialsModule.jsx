import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Quote, GripVertical, ChevronLeft, ChevronRight } from 'lucide-react';
import CrudModal from '../components/CrudModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import { contentService } from '../../../services/contentService';

export default function TestimonialsModule({ testimonials = [], onRefresh, showToast }) {
  const [testimonialList, setTestimonialList] = useState(testimonials);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isReordering, setIsReordering] = useState(false);
  const [draggedIdx, setDraggedIdx] = useState(null);
  const [dragOverIdx, setDragOverIdx] = useState(null);

  useEffect(() => {
    setTestimonialList(testimonials);
  }, [testimonials]);

  const fields = [
    { name: 'author', label: 'Author / Parent Name', placeholder: 'e.g. Mr. Faisal Iqbal', required: true },
    { name: 'relation', label: 'Relationship to School', placeholder: 'e.g. Father of Student Class 10', required: true },
    { name: 'quote', label: 'Review / Testimonial Quote', type: 'textarea', rows: 4, required: true },
    { name: 'sort_order', label: 'Sort Order', type: 'number', placeholder: '1', required: false }
  ];

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

    const updated = [...testimonialList];
    const [movedItem] = updated.splice(draggedIdx, 1);
    updated.splice(targetIndex, 0, movedItem);

    const withUpdatedOrder = updated.map((item, index) => ({
      ...item,
      sort_order: index + 1
    }));

    setTestimonialList(withUpdatedOrder);
    setDraggedIdx(null);
    setDragOverIdx(null);
    await saveNewOrder(withUpdatedOrder, movedItem.author);
  };

  const handleDragEnd = () => {
    setDraggedIdx(null);
    setDragOverIdx(null);
  };

  const handleMove = async (currentIndex, direction) => {
    const targetIndex = currentIndex + direction;
    if (targetIndex < 0 || targetIndex >= testimonialList.length) return;

    const updated = [...testimonialList];
    const temp = updated[currentIndex];
    updated[currentIndex] = updated[targetIndex];
    updated[targetIndex] = temp;

    const withUpdatedOrder = updated.map((item, index) => ({
      ...item,
      sort_order: index + 1
    }));

    setTestimonialList(withUpdatedOrder);
    await saveNewOrder(withUpdatedOrder, temp.author);
  };

  const saveNewOrder = async (orderedList, itemName) => {
    setIsReordering(true);
    try {
      const payload = orderedList
        .filter(item => item && item.id)
        .map(item => ({ id: item.id, sort_order: item.sort_order }));

      if (payload.length > 0) {
        const res = await contentService.reorder('testimonials', payload);
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

  const handleOpenAdd = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleSave = async (formData) => {
    setIsSaving(true);
    try {
      if (editingItem?.id) {
        const res = await contentService.update('testimonials', editingItem.id, formData);
        if (res.success) {
          showToast('Review updated successfully', 'success');
        } else {
          showToast(res.error || 'Failed to update review', 'error');
        }
      } else {
        const res = await contentService.create('testimonials', formData);
        if (res.success) {
          showToast('Review added successfully', 'success');
        } else {
          showToast(res.error || 'Failed to add review', 'error');
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
      const res = await contentService.remove('testimonials', deleteItem.id);
      if (res.success) {
        showToast('Review deleted', 'success');
        setDeleteItem(null);
        onRefresh();
      } else {
        showToast(res.error || 'Failed to delete review', 'error');
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
              Parent & Alumna Testimonials ({testimonialList.length})
            </h2>
            {isReordering && (
              <span className="text-[11px] font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full animate-pulse">
                Saving Order...
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Drag cards or use arrows to rearrange testimonial display order.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-light text-white font-semibold text-xs flex items-center space-x-2 transition-all shadow-md shadow-primary/15 cursor-pointer w-fit"
        >
          <Plus size={16} />
          <span>Add Testimonial</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonialList.map((item, idx) => {
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
              className={`bg-white p-6 rounded-2xl border shadow-sm flex flex-col justify-between transition-all duration-200 text-left space-y-4 select-none ${
                isDragging
                  ? 'opacity-40 scale-95 border-primary ring-2 ring-primary/20'
                  : isDragOver
                  ? 'border-secondary ring-2 ring-secondary/30 scale-[1.02]'
                  : 'border-slate-100 hover:shadow-md'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div
                    className="bg-slate-900 text-white hover:bg-secondary hover:text-slate-950 px-2 py-0.5 rounded-md text-[10px] font-bold flex items-center space-x-1 cursor-grab active:cursor-grabbing transition-colors"
                    title="Drag to rearrange"
                  >
                    <GripVertical size={12} />
                    <span>#{idx + 1}</span>
                  </div>
                  <Quote size={20} className="text-secondary/60" />
                </div>
                <p className="text-xs text-slate-600 leading-relaxed italic line-clamp-4">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs font-poppins text-slate-900">{item.author}</h4>
                  <p className="text-[10px] text-slate-400 font-semibold">{item.relation}</p>
                </div>

                <div className="flex items-center space-x-1">
                  {/* Shift buttons */}
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
                    disabled={idx === testimonialList.length - 1}
                    onClick={() => handleMove(idx, 1)}
                    className="p-1 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Move Right"
                  >
                    <ChevronRight size={13} />
                  </button>

                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-primary hover:bg-primary/5 transition-colors cursor-pointer"
                    title="Edit"
                  >
                    <Edit2 size={15} />
                  </button>
                  {item.id && (
                    <button
                      onClick={() => setDeleteItem(item)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 size={15} />
                    </button>
                  )}
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
        title={editingItem ? 'Edit Testimonial' : 'Add Testimonial'}
        fields={fields}
        initialData={editingItem || { sort_order: (testimonialList.length + 1) }}
        isSaving={isSaving}
      />

      <DeleteConfirmModal
        isOpen={!!deleteItem}
        onClose={() => setDeleteItem(null)}
        onConfirm={handleDelete}
        title="Delete Testimonial"
        itemName={deleteItem?.author}
        isDeleting={isDeleting}
      />
    </div>
  );
}
