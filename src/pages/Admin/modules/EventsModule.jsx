import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Calendar, Clock, MapPin, GripVertical, ChevronUp, ChevronDown } from 'lucide-react';
import CrudModal from '../components/CrudModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import { contentService } from '../../../services/contentService';

export default function EventsModule({ events = [], onRefresh, showToast }) {
  const [eventList, setEventList] = useState(events);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isReordering, setIsReordering] = useState(false);
  const [draggedIdx, setDraggedIdx] = useState(null);
  const [dragOverIdx, setDragOverIdx] = useState(null);

  useEffect(() => {
    setEventList(events);
  }, [events]);

  const fields = [
    { name: 'title', label: 'Event Title', placeholder: 'e.g. Annual Sports Meet & Athletic Championship', required: true },
    { name: 'date', label: 'Event Date', type: 'date', placeholder: 'Pick or enter date', required: true },
    { name: 'time', label: 'Event Time Range', type: 'time-range', placeholder: 'e.g. 08:00 AM - 04:00 PM', required: true },
    { name: 'location', label: 'Event Location / Arena', placeholder: 'e.g. Main Sports Complex', required: true },
    { name: 'description', label: 'Event Description', type: 'textarea', rows: 3, required: true },
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

    const updated = [...eventList];
    const [movedItem] = updated.splice(draggedIdx, 1);
    updated.splice(targetIndex, 0, movedItem);

    const withUpdatedOrder = updated.map((item, index) => ({
      ...item,
      sort_order: index + 1
    }));

    setEventList(withUpdatedOrder);
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
    if (targetIndex < 0 || targetIndex >= eventList.length) return;

    const updated = [...eventList];
    const temp = updated[currentIndex];
    updated[currentIndex] = updated[targetIndex];
    updated[targetIndex] = temp;

    const withUpdatedOrder = updated.map((item, index) => ({
      ...item,
      sort_order: index + 1
    }));

    setEventList(withUpdatedOrder);
    await saveNewOrder(withUpdatedOrder, temp.title);
  };

  const saveNewOrder = async (orderedList, itemName) => {
    setIsReordering(true);
    try {
      const payload = orderedList
        .filter(item => item && item.id)
        .map(item => ({ id: item.id, sort_order: item.sort_order }));

      if (payload.length > 0) {
        const res = await contentService.reorder('events', payload);
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
      const payload = {
        title: (formData.title || '').trim(),
        date: (formData.date || '').trim(),
        time: (formData.time || '').trim(),
        location: (formData.location || '').trim(),
        description: (formData.description || '').trim(),
        sort_order: Number(formData.sort_order) || (eventList.length + 1)
      };

      if (editingItem?.id) {
        const res = await contentService.update('events', editingItem.id, payload);
        if (res.success) {
          showToast('Event updated successfully', 'success');
        } else {
          showToast(res.error || 'Failed to update event', 'error');
        }
      } else {
        const res = await contentService.create('events', payload);
        if (res.success) {
          showToast('Event scheduled successfully', 'success');
        } else {
          showToast(res.error || 'Failed to schedule event', 'error');
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
    if (!deleteItem) return;
    setIsDeleting(true);
    try {
      if (deleteItem.id) {
        const res = await contentService.remove('events', deleteItem.id);
        if (res.success) {
          showToast('Event deleted successfully', 'success');
        } else {
          showToast(res.error || 'Failed to delete event from database', 'error');
        }
      } else {
        showToast('Event removed', 'success');
      }
      setEventList(prev => prev.filter(item => item !== deleteItem && (!deleteItem.id || item.id !== deleteItem.id)));
      setDeleteItem(null);
      onRefresh();
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
              Upcoming Events & Calendar ({eventList.length})
            </h2>
            {isReordering && (
              <span className="text-[11px] font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full animate-pulse">
                Saving Order...
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Drag rows or use arrows to rearrange event sequence on the calendar.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-light text-white font-semibold text-xs flex items-center space-x-2 transition-all shadow-md shadow-primary/15 cursor-pointer w-fit"
        >
          <Plus size={16} />
          <span>Schedule New Event</span>
        </button>
      </div>

      <div className="space-y-3">
        {eventList.map((evt, idx) => {
          const isDragging = draggedIdx === idx;
          const isDragOver = dragOverIdx === idx;

          return (
            <div
              key={evt.id || idx}
              draggable
              onDragStart={(e) => handleDragStart(e, idx)}
              onDragOver={(e) => handleDragOver(e, idx)}
              onDrop={(e) => handleDrop(e, idx)}
              onDragEnd={handleDragEnd}
              className={`bg-white p-5 rounded-2xl border shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all duration-200 text-left select-none ${
                isDragging
                  ? 'opacity-40 scale-95 border-primary ring-2 ring-primary/20'
                  : isDragOver
                  ? 'border-secondary ring-2 ring-secondary/30 scale-[1.01]'
                  : 'border-slate-100 hover:shadow-md'
              }`}
            >
              <div className="flex items-start space-x-3.5 flex-1 min-w-0">
                {/* Drag Handle */}
                <div
                  className="bg-slate-900 text-white hover:bg-secondary hover:text-slate-950 p-2 rounded-xl flex items-center justify-center cursor-grab active:cursor-grabbing transition-colors shrink-0 mt-0.5"
                  title="Drag to rearrange event order"
                >
                  <GripVertical size={16} />
                </div>

                <div className="bg-primary/5 text-primary p-3 rounded-xl text-center shrink-0 min-w-[60px]">
                  <Calendar size={18} className="text-secondary mx-auto" />
                  <span className="text-[10px] font-bold uppercase tracking-wider block mt-1">
                    {(evt.date || '').split(',')[0]}
                  </span>
                </div>

                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-[11px] font-bold text-slate-400 font-mono">#{idx + 1}</span>
                    <h3 className="text-base font-bold text-slate-800 font-poppins truncate">{evt.title}</h3>
                  </div>
                  <p className="text-xs text-slate-500 max-w-xl leading-relaxed line-clamp-2">{evt.description}</p>
                  <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-400 pt-0.5">
                    <span className="flex items-center space-x-1">
                      <Clock size={12} className="text-primary" />
                      <span>{evt.time}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <MapPin size={12} className="text-primary" />
                      <span>{evt.location}</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 shrink-0 self-end sm:self-center">
                {/* Shift buttons */}
                <div className="flex items-center space-x-1">
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
                    disabled={idx === eventList.length - 1}
                    onClick={() => handleMove(idx, 1)}
                    className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Move Down"
                  >
                    <ChevronDown size={14} />
                  </button>
                </div>

                <button
                  onClick={() => handleOpenEdit(evt)}
                  className="p-2 rounded-lg text-slate-400 hover:text-primary hover:bg-primary/5 transition-colors cursor-pointer"
                  title="Edit"
                >
                  <Edit2 size={16} />
                </button>
                {evt.id && (
                  <button
                    onClick={() => setDeleteItem(evt)}
                    className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
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
        title={editingItem ? 'Edit Scheduled Event' : 'Schedule New Event'}
        fields={fields}
        initialData={editingItem || {
          date: 'July 18, 2026',
          time: '09:00 AM - 02:00 PM',
          location: 'School Campus Auditorium',
          sort_order: (eventList.length + 1)
        }}
        isSaving={isSaving}
      />

      <DeleteConfirmModal
        isOpen={!!deleteItem}
        onClose={() => setDeleteItem(null)}
        onConfirm={handleDelete}
        title="Delete Event"
        itemName={deleteItem?.title}
        isDeleting={isDeleting}
      />
    </div>
  );
}
