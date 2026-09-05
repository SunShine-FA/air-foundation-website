import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, History, GripVertical, ChevronUp, ChevronDown } from 'lucide-react';
import CrudModal from '../components/CrudModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import { contentService } from '../../../services/contentService';

export default function HistoryModule({ history = [], onRefresh, showToast }) {
  const [historyList, setHistoryList] = useState(history);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isReordering, setIsReordering] = useState(false);
  const [draggedIdx, setDraggedIdx] = useState(null);
  const [dragOverIdx, setDragOverIdx] = useState(null);

  useEffect(() => {
    setHistoryList(history);
  }, [history]);

  const fields = [
    { name: 'year', label: 'Milestone Year', placeholder: 'e.g. 2018', required: true },
    { name: 'title', label: 'Milestone Title', placeholder: 'e.g. The Beginning', required: true },
    { name: 'description', label: 'Milestone Description', type: 'textarea', rows: 3, required: true },
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

    const updated = [...historyList];
    const [movedItem] = updated.splice(draggedIdx, 1);
    updated.splice(targetIndex, 0, movedItem);

    const withUpdatedOrder = updated.map((item, index) => ({
      ...item,
      sort_order: index + 1
    }));

    setHistoryList(withUpdatedOrder);
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
    if (targetIndex < 0 || targetIndex >= historyList.length) return;

    const updated = [...historyList];
    const temp = updated[currentIndex];
    updated[currentIndex] = updated[targetIndex];
    updated[targetIndex] = temp;

    const withUpdatedOrder = updated.map((item, index) => ({
      ...item,
      sort_order: index + 1
    }));

    setHistoryList(withUpdatedOrder);
    await saveNewOrder(withUpdatedOrder, temp.title);
  };

  const saveNewOrder = async (orderedList, itemName) => {
    setIsReordering(true);
    try {
      const payload = orderedList
        .filter(item => item && item.id)
        .map(item => ({ id: item.id, sort_order: item.sort_order }));

      if (payload.length > 0) {
        const res = await contentService.reorder('history_milestones', payload);
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
        const res = await contentService.update('history_milestones', editingItem.id, formData);
        if (res.success) {
          showToast('Milestone updated', 'success');
        } else {
          showToast(res.error || 'Failed to update milestone', 'error');
        }
      } else {
        const res = await contentService.create('history_milestones', formData);
        if (res.success) {
          showToast('Milestone added', 'success');
        } else {
          showToast(res.error || 'Failed to add milestone', 'error');
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
      const res = await contentService.remove('history_milestones', deleteItem.id);
      if (res.success) {
        showToast('Milestone deleted', 'success');
        setDeleteItem(null);
        onRefresh();
      } else {
        showToast(res.error || 'Failed to delete milestone', 'error');
      }
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6 text-left max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center space-x-2.5">
            <h2 className="text-xl font-bold font-poppins text-slate-900">
              School History & Timeline Milestones ({historyList.length})
            </h2>
            {isReordering && (
              <span className="text-[11px] font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full animate-pulse">
                Saving Order...
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Drag milestones or use arrows to rearrange the timeline progression.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-light text-white font-semibold text-xs flex items-center space-x-2 transition-all shadow-md shadow-primary/15 cursor-pointer w-fit"
        >
          <Plus size={16} />
          <span>Add Milestone</span>
        </button>
      </div>

      <div className="space-y-3">
        {historyList.map((mile, idx) => {
          const isDragging = draggedIdx === idx;
          const isDragOver = dragOverIdx === idx;

          return (
            <div
              key={mile.id || idx}
              draggable
              onDragStart={(e) => handleDragStart(e, idx)}
              onDragOver={(e) => handleDragOver(e, idx)}
              onDrop={(e) => handleDrop(e, idx)}
              onDragEnd={handleDragEnd}
              className={`bg-white p-5 rounded-2xl border shadow-sm flex items-start justify-between gap-4 transition-all duration-200 text-left select-none ${
                isDragging
                  ? 'opacity-40 scale-95 border-primary ring-2 ring-primary/20'
                  : isDragOver
                  ? 'border-secondary ring-2 ring-secondary/30 scale-[1.01]'
                  : 'border-slate-100 hover:shadow-md'
              }`}
            >
              <div className="flex items-start space-x-3.5 flex-1 min-w-0">
                {/* Drag handle */}
                <div
                  className="bg-slate-900 text-white hover:bg-secondary hover:text-slate-950 p-2 rounded-xl flex items-center justify-center cursor-grab active:cursor-grabbing transition-colors shrink-0 mt-1"
                  title="Drag to rearrange"
                >
                  <GripVertical size={16} />
                </div>

                <div className="w-14 h-14 rounded-2xl bg-primary/5 text-primary flex items-center justify-center font-extrabold font-poppins text-sm shrink-0">
                  {mile.year}
                </div>
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-[11px] font-bold text-slate-400 font-mono">#{idx + 1}</span>
                    <h3 className="text-base font-bold text-slate-800 font-poppins truncate">{mile.title}</h3>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-xl line-clamp-2">{mile.description || mile.desc}</p>
                </div>
              </div>

              <div className="flex items-center space-x-1 shrink-0">
                {/* Shift buttons */}
                <button
                  type="button"
                  disabled={idx === 0}
                  onClick={() => handleMove(idx, -1)}
                  className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Move Up"
                >
                  <ChevronUp size={14} />
                </button>
                <button
                  type="button"
                  disabled={idx === historyList.length - 1}
                  onClick={() => handleMove(idx, 1)}
                  className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Move Down"
                >
                  <ChevronDown size={14} />
                </button>

                <button
                  onClick={() => handleOpenEdit(mile)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-primary hover:bg-primary/5 transition-colors cursor-pointer"
                  title="Edit"
                >
                  <Edit2 size={16} />
                </button>
                {mile.id && (
                  <button
                    onClick={() => setDeleteItem(mile)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <CrudModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        title={editingItem ? 'Edit Milestone' : 'Add History Milestone'}
        fields={fields}
        initialData={editingItem || { year: new Date().getFullYear().toString(), sort_order: (historyList.length + 1) }}
        isSaving={isSaving}
      />

      <DeleteConfirmModal
        isOpen={!!deleteItem}
        onClose={() => setDeleteItem(null)}
        onConfirm={handleDelete}
        title="Delete Milestone"
        itemName={deleteItem?.title}
        isDeleting={isDeleting}
      />
    </div>
  );
}
