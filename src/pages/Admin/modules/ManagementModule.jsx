import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, GripVertical, ChevronUp, ChevronDown, ShieldCheck, User } from 'lucide-react';
import CrudModal from '../components/CrudModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import { contentService } from '../../../services/contentService';

export default function ManagementModule({ management = [], onRefresh, showToast }) {
  const [managementList, setManagementList] = useState(management);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isReordering, setIsReordering] = useState(false);
  const [draggedIdx, setDraggedIdx] = useState(null);
  const [dragOverIdx, setDragOverIdx] = useState(null);

  useEffect(() => {
    setManagementList(management);
  }, [management]);

  const fields = [
    {
      name: 'image',
      label: 'Member Photo / Portrait',
      type: 'image',
      required: false,
      placeholder: 'Upload photo or enter image URL',
      helper: 'Click Upload to select a photo from your computer, or enter an image URL.'
    },
    { name: 'name', label: 'Member Full Name', placeholder: 'e.g. Major (R) Sajid Kiani', required: true },
    { name: 'role', label: 'Role / Designation', placeholder: 'e.g. Managing Director or Director Academics', required: true },
    { name: 'bg', label: 'Background / Credentials / Tag (Optional)', placeholder: 'e.g. Major (R), Ph.D, MBA, B.A', required: false },
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

    const updated = [...managementList];
    const [movedItem] = updated.splice(draggedIdx, 1);
    updated.splice(targetIndex, 0, movedItem);

    const withUpdatedOrder = updated.map((item, index) => ({
      ...item,
      sort_order: index + 1
    }));

    setManagementList(withUpdatedOrder);
    setDraggedIdx(null);
    setDragOverIdx(null);
    await saveNewOrder(withUpdatedOrder, movedItem.name);
  };

  const handleDragEnd = () => {
    setDraggedIdx(null);
    setDragOverIdx(null);
  };

  const handleMove = async (currentIndex, direction) => {
    const targetIndex = currentIndex + direction;
    if (targetIndex < 0 || targetIndex >= managementList.length) return;

    const updated = [...managementList];
    const temp = updated[currentIndex];
    updated[currentIndex] = updated[targetIndex];
    updated[targetIndex] = temp;

    const withUpdatedOrder = updated.map((item, index) => ({
      ...item,
      sort_order: index + 1
    }));

    setManagementList(withUpdatedOrder);
    await saveNewOrder(withUpdatedOrder, temp.name);
  };

  const saveNewOrder = async (orderedList, itemName) => {
    setIsReordering(true);
    try {
      const payload = orderedList
        .filter(item => item && item.id)
        .map(item => ({ id: item.id, sort_order: item.sort_order }));

      if (payload.length > 0) {
        const res = await contentService.reorder('management_team', payload);
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
        name: (formData.name || '').trim(),
        role: (formData.role || '').trim(),
        bg: (formData.bg || '').trim(),
        image: (formData.image || '').trim(),
        sort_order: Number(formData.sort_order) || (managementList.length + 1)
      };

      if (editingItem?.id) {
        const res = await contentService.update('management_team', editingItem.id, payload);
        if (res.success) {
          showToast('Management member updated successfully', 'success');
        } else {
          showToast(res.error || 'Failed to update management member', 'error');
        }
      } else {
        const res = await contentService.create('management_team', payload);
        if (res.success) {
          showToast('Management member added successfully', 'success');
        } else {
          showToast(res.error || 'Failed to add management member', 'error');
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
        const res = await contentService.remove('management_team', deleteItem.id);
        if (res.success) {
          showToast('Management member deleted successfully', 'success');
        } else {
          showToast(res.error || 'Failed to delete member from database', 'error');
        }
      } else {
        showToast('Management member removed', 'success');
      }
      setManagementList(prev => prev.filter(item => item !== deleteItem && (!deleteItem.id || item.id !== deleteItem.id)));
      setDeleteItem(null);
      onRefresh();
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6 text-left max-w-4xl">
      {/* Module Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center space-x-2.5">
            <h2 className="text-xl font-bold font-poppins text-slate-900">
              Management Desk & Board of Governors ({managementList.length})
            </h2>
            {isReordering && (
              <span className="text-[11px] font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full animate-pulse">
                Saving Order...
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage the governors and executive leadership profiles displayed on the Management Desk page.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-light text-white font-semibold text-xs flex items-center space-x-2 transition-all shadow-md shadow-primary/15 cursor-pointer w-fit"
        >
          <Plus size={16} />
          <span>Add New Member</span>
        </button>
      </div>

      {/* Member List */}
      <div className="space-y-3">
        {managementList.length === 0 ? (
          <div className="bg-slate-50 p-12 rounded-2xl border border-dashed border-slate-200 text-center space-y-2">
            <ShieldCheck size={36} className="mx-auto text-slate-300" />
            <p className="text-sm font-semibold text-slate-600">No Management Members Listed</p>
            <p className="text-xs text-slate-400">Click &quot;Add New Member&quot; to populate your Management Desk.</p>
          </div>
        ) : (
          managementList.map((mgt, idx) => {
            const isDragging = draggedIdx === idx;
            const isDragOver = dragOverIdx === idx;

            return (
              <div
                key={mgt.id || idx}
                draggable
                onDragStart={(e) => handleDragStart(e, idx)}
                onDragOver={(e) => handleDragOver(e, idx)}
                onDrop={(e) => handleDrop(e, idx)}
                onDragEnd={handleDragEnd}
                className={`bg-white p-5 rounded-2xl border shadow-sm flex items-center justify-between gap-4 transition-all duration-200 text-left select-none ${
                  isDragging
                    ? 'opacity-40 scale-95 border-primary ring-2 ring-primary/20'
                    : isDragOver
                    ? 'border-secondary ring-2 ring-secondary/30 scale-[1.01]'
                    : 'border-slate-100 hover:shadow-md'
                }`}
              >
                <div className="flex items-center space-x-3.5 min-w-0 flex-1">
                  {/* Drag Handle */}
                  <div
                    className="bg-slate-900 text-white hover:bg-secondary hover:text-slate-950 p-2 rounded-xl flex items-center justify-center cursor-grab active:cursor-grabbing transition-colors shrink-0"
                    title="Drag to reorder"
                  >
                    <GripVertical size={16} />
                  </div>

                  {/* Avatar / Photo Thumbnail */}
                  {mgt.image ? (
                    <img
                      src={mgt.image}
                      alt={mgt.name}
                      className="w-12 h-12 rounded-xl object-cover object-top border border-slate-200 shadow-2xs shrink-0"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  ) : (
                    <div className="bg-primary/5 text-primary p-3 rounded-xl shrink-0">
                      <User size={20} className="text-secondary" />
                    </div>
                  )}

                  {/* Details */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-[11px] font-bold text-slate-400 font-mono">#{idx + 1}</span>
                      <h4 className="font-bold text-slate-800 font-poppins text-sm truncate">{mgt.name}</h4>
                    </div>
                    <div className="flex items-center space-x-2 mt-0.5">
                      <span className="text-xs text-primary font-semibold uppercase tracking-wider">{mgt.role}</span>
                      {mgt.bg && (
                        <span className="text-[10px] text-slate-500 font-semibold bg-slate-100 px-2 py-0.5 rounded-md">
                          {mgt.bg}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2 shrink-0">
                  {/* Shift Buttons */}
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
                      disabled={idx === managementList.length - 1}
                      onClick={() => handleMove(idx, 1)}
                      className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Move Down"
                    >
                      <ChevronDown size={14} />
                    </button>
                  </div>

                  <button
                    onClick={() => handleOpenEdit(mgt)}
                    className="p-2 rounded-lg text-slate-400 hover:text-primary hover:bg-primary/5 transition-colors cursor-pointer"
                    title="Edit Member"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => setDeleteItem(mgt)}
                    className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    title="Delete Member"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add / Edit Modal */}
      <CrudModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        title={editingItem ? 'Edit Management Member' : 'Add New Member'}
        fields={fields}
        initialData={editingItem || { sort_order: managementList.length + 1 }}
        isSaving={isSaving}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={!!deleteItem}
        onClose={() => setDeleteItem(null)}
        onConfirm={handleDelete}
        title="Delete Management Member"
        itemName={deleteItem?.name}
        isDeleting={isDeleting}
      />
    </div>
  );
}
