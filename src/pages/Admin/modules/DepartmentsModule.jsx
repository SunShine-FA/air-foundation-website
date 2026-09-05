import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Box, UserCheck, GripVertical, ChevronLeft, ChevronRight } from 'lucide-react';
import CrudModal from '../components/CrudModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import { contentService } from '../../../services/contentService';

export default function DepartmentsModule({ departments = [], faculty = [], onRefresh, showToast }) {
  const [deptList, setDeptList] = useState(departments);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isReordering, setIsReordering] = useState(false);
  const [draggedIdx, setDraggedIdx] = useState(null);
  const [dragOverIdx, setDragOverIdx] = useState(null);

  useEffect(() => {
    setDeptList(departments);
  }, [departments]);

  const facultyNames = (faculty || []).map(f => f.name).filter(Boolean);
  const headOptions = Array.from(new Set([
    ...facultyNames,
    'Sir Faseeh Ur Rehman',
    'Ma\'am Zopash Imran',
    'Sir Mouavia',
    'Sir Zaki',
    'Sir Usman',
    'Sir Syed Hassaan',
    'Mam Bushra Abid',
    'Ma\'am Farhat Iqbal',
    'Sir Abuzar',
    'Dr. Amir'
  ]));

  const fields = [
    { name: 'name', label: 'Department Name', placeholder: 'e.g. Computer Science & AI', required: true },
    { 
      name: 'head', 
      label: 'Head of Department', 
      placeholder: 'Select or type head name (e.g. Sir Faseeh Ur Rehman)', 
      required: true,
      options: headOptions,
      helper: 'Choose from active faculty or type a custom head name'
    },
    { 
      name: 'head_image', 
      label: 'Head of Department (HOD) Photo', 
      type: 'image', 
      required: false,
      helper: 'Upload or paste HOD photo (optional - auto-matches faculty profile photo if left blank)'
    },
    { name: 'description', label: 'Department Overview', type: 'textarea', rows: 3, required: true },
    { name: 'labs_text', label: 'Labs / Facilities (comma separated)', placeholder: 'e.g. Computer Science Lab, AI Tinker Room', required: false },
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

    const updated = [...deptList];
    const [movedItem] = updated.splice(draggedIdx, 1);
    updated.splice(targetIndex, 0, movedItem);

    const withUpdatedOrder = updated.map((item, index) => ({
      ...item,
      sort_order: index + 1
    }));

    setDeptList(withUpdatedOrder);
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
    if (targetIndex < 0 || targetIndex >= deptList.length) return;

    const updated = [...deptList];
    const temp = updated[currentIndex];
    updated[currentIndex] = updated[targetIndex];
    updated[targetIndex] = temp;

    const withUpdatedOrder = updated.map((item, index) => ({
      ...item,
      sort_order: index + 1
    }));

    setDeptList(withUpdatedOrder);
    await saveNewOrder(withUpdatedOrder, temp.name);
  };

  const saveNewOrder = async (orderedList, itemName) => {
    setIsReordering(true);
    try {
      const payload = orderedList
        .filter(item => item && item.id)
        .map(item => ({ id: item.id, sort_order: item.sort_order }));

      if (payload.length > 0) {
        const res = await contentService.reorder('departments', payload);
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
    const formatted = {
      ...item,
      head_image: item.head_image || item.headImage || '',
      labs_text: Array.isArray(item.labs) ? item.labs.join(', ') : ''
    };
    setEditingItem(formatted);
    setIsModalOpen(true);
  };

  const handleSave = async (formData) => {
    setIsSaving(true);
    try {
      const labsArray = formData.labs_text
        ? formData.labs_text.split(',').map(l => l.trim()).filter(Boolean)
        : [];

      const payload = {
        name: formData.name,
        head: formData.head,
        head_image: formData.head_image || null,
        description: formData.description,
        labs: labsArray,
        sort_order: formData.sort_order || (deptList.length + 1)
      };

      if (editingItem?.id) {
        const res = await contentService.update('departments', editingItem.id, payload);
        if (res.success) {
          showToast('Department updated successfully', 'success');
        } else {
          showToast(res.error || 'Failed to update department', 'error');
        }
      } else {
        const res = await contentService.create('departments', payload);
        if (res.success) {
          showToast('Department created successfully', 'success');
        } else {
          showToast(res.error || 'Failed to create department', 'error');
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
      const res = await contentService.remove('departments', deleteItem.id);
      if (res.success) {
        showToast('Department deleted', 'success');
        setDeleteItem(null);
        onRefresh();
      } else {
        showToast(res.error || 'Failed to delete department', 'error');
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
              Academic Departments & Science Wings ({deptList.length})
            </h2>
            {isReordering && (
              <span className="text-[11px] font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full animate-pulse">
                Saving Order...
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Drag cards or use arrows to rearrange department display sequence.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-light text-white font-semibold text-xs flex items-center space-x-2 transition-all shadow-md shadow-primary/15 cursor-pointer w-fit"
        >
          <Plus size={16} />
          <span>Add Department</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {deptList.map((dept, idx) => {
          const isDragging = draggedIdx === idx;
          const isDragOver = dragOverIdx === idx;

          const matchedHead = (faculty || []).find(f => 
            f.name && dept.head && (
              f.name.toLowerCase().trim() === dept.head.toLowerCase().trim() ||
              f.name.toLowerCase().includes(dept.head.toLowerCase().trim()) ||
              dept.head.toLowerCase().includes(f.name.toLowerCase().trim())
            )
          );

          const hodPhoto = dept.head_image || dept.headImage || matchedHead?.image;

          return (
            <div
              key={dept.id || idx}
              draggable
              onDragStart={(e) => handleDragStart(e, idx)}
              onDragOver={(e) => handleDragOver(e, idx)}
              onDrop={(e) => handleDrop(e, idx)}
              onDragEnd={handleDragEnd}
              className={`bg-white p-6 rounded-2xl border shadow-sm flex flex-col justify-between transition-all duration-200 space-y-4 text-left select-none ${
                isDragging
                  ? 'opacity-40 scale-95 border-primary ring-2 ring-primary/20'
                  : isDragOver
                  ? 'border-secondary ring-2 ring-secondary/30 scale-[1.02]'
                  : 'border-slate-100 hover:shadow-md'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <div
                    className="bg-slate-900 text-white hover:bg-secondary hover:text-slate-950 px-2 py-0.5 rounded-md text-[10px] font-bold flex items-center space-x-1 cursor-grab active:cursor-grabbing transition-colors"
                    title="Drag to reorder"
                  >
                    <GripVertical size={12} />
                    <span>#{idx + 1}</span>
                  </div>
                  <span className="text-[10px] font-bold text-primary bg-primary/5 px-2 py-0.5 rounded-md uppercase tracking-wider">
                    Wing #{idx + 1}
                  </span>
                </div>

                <h3 className="text-lg font-bold font-poppins text-slate-800 mt-2">{dept.name}</h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed line-clamp-3">{dept.description}</p>

                <div className="mt-4 pt-3 border-t border-slate-100 space-y-2.5 text-xs text-slate-600">
                  <div className="flex items-center space-x-2.5 bg-slate-50 p-2 rounded-xl border border-slate-100">
                    {hodPhoto ? (
                      <img
                        src={hodPhoto}
                        alt={dept.head}
                        className="w-8 h-8 rounded-full object-cover shrink-0 border border-primary/20"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0">
                        <UserCheck size={14} />
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Head of Department</p>
                      <p className="font-bold text-slate-800 truncate text-xs">{dept.head}</p>
                    </div>
                  </div>

                  {Array.isArray(dept.labs) && dept.labs.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {dept.labs.map((lab, lIdx) => (
                        <span key={lIdx} className="bg-primary/5 text-primary border border-primary/15 px-2 py-0.5 rounded-md text-[10px] font-semibold">
                          {lab}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                {/* Shift buttons */}
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
                    disabled={idx === deptList.length - 1}
                    onClick={() => handleMove(idx, 1)}
                    className="p-1 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Move Right"
                  >
                    <ChevronRight size={13} />
                  </button>
                </div>

                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => handleOpenEdit(dept)}
                    className="p-2 rounded-lg text-slate-400 hover:text-primary hover:bg-primary/5 transition-colors cursor-pointer"
                    title="Edit"
                  >
                    <Edit2 size={16} />
                  </button>
                  {dept.id && (
                    <button
                      onClick={() => setDeleteItem(dept)}
                      className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 size={16} />
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
        title={editingItem ? 'Edit Department' : 'Add Department'}
        fields={fields}
        initialData={editingItem || { sort_order: (deptList.length + 1) }}
        isSaving={isSaving}
      />

      <DeleteConfirmModal
        isOpen={!!deleteItem}
        onClose={() => setDeleteItem(null)}
        onConfirm={handleDelete}
        title="Delete Department"
        itemName={deleteItem?.name}
        isDeleting={isDeleting}
      />
    </div>
  );
}
