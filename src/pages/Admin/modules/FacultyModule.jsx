import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Mail, Search, GripVertical, ChevronLeft, ChevronRight, CheckCircle2, ArrowUpDown } from 'lucide-react';
import CrudModal from '../components/CrudModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import { contentService } from '../../../services/contentService';
import { getImageUrl, handleImageError } from '../../../utils/imageHelper';

export default function FacultyModule({ faculty = [], departments = [], onRefresh, showToast }) {
  const [facultyList, setFacultyList] = useState(faculty);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [draggedIdx, setDraggedIdx] = useState(null);
  const [dragOverIdx, setDragOverIdx] = useState(null);
  const [isReordering, setIsReordering] = useState(false);

  useEffect(() => {
    setFacultyList(faculty);
  }, [faculty]);

  const customDeptNames = (departments || []).map(d => d.name).filter(Boolean);
  const departmentOptions = Array.from(new Set([
    'English',
    'Urdu',
    'Mathematics',
    'Islamiyat',
    'Translation of Quran',
    'Pak Studies',
    'Biology',
    'Physics',
    'Chemistry',
    'History',
    'Geography',
    'General Science',
    ...customDeptNames
  ]));

  const fields = [
    { name: 'name', label: 'Faculty Full Name', placeholder: 'e.g. Ma\'am Farhat Iqbal', required: true },
    { name: 'role', label: 'Role / Designation', placeholder: 'e.g. Senior Urdu Educator & Head of Languages', required: true },
    { name: 'qualification', label: 'Academic Qualification', placeholder: 'e.g. M.A Urdu, B.Ed', required: true },
    { name: 'experience', label: 'Teaching Experience', placeholder: 'e.g. 8 Years Teaching Experience', required: true },
    { name: 'email', label: 'Contact Email', type: 'email', placeholder: 'teacher@airfoundationtahashaheedcampus.com', required: true },
    { name: 'image', label: 'Profile Photo', type: 'image', required: true },
    {
      name: 'department',
      label: 'Department / Category',
      type: 'select',
      options: departmentOptions,
      defaultValue: 'English'
    },
    { name: 'sort_order', label: 'Sort Order', type: 'number', placeholder: '1', required: false }
  ];

  const filteredFaculty = facultyList.filter(f =>
    (f.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (f.role || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (f.qualification || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem({
      ...item,
      department: item.department || item.category || 'English'
    });
    setIsModalOpen(true);
  };

  const handleSave = async (formData) => {
    setIsSaving(true);
    try {
      const payload = {
        name: formData.name,
        role: formData.role,
        qualification: formData.qualification,
        experience: formData.experience,
        email: formData.email,
        image: formData.image,
        department: formData.department || formData.category || 'Academics',
        sort_order: Number(formData.sort_order) || (facultyList.length + 1)
      };

      if (editingItem?.id) {
        const res = await contentService.update('faculty', editingItem.id, payload);
        if (res.success) {
          showToast('Faculty member updated successfully', 'success');
        } else {
          showToast(res.error || 'Failed to update faculty member', 'error');
        }
      } else {
        const res = await contentService.create('faculty', payload);
        if (res.success) {
          showToast('Faculty member added successfully', 'success');
        } else {
          showToast(res.error || 'Failed to add faculty member', 'error');
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
      const res = await contentService.remove('faculty', deleteItem.id);
      if (res.success) {
        showToast('Faculty member removed', 'success');
        setDeleteItem(null);
        onRefresh();
      } else {
        showToast(res.error || 'Failed to delete faculty member', 'error');
      }
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  // --- Drag and Drop Reordering Handlers ---
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

    const updated = [...facultyList];
    const [movedItem] = updated.splice(draggedIdx, 1);
    updated.splice(targetIndex, 0, movedItem);

    // Recalculate sequential sort_order (1, 2, 3...)
    const withUpdatedOrder = updated.map((item, index) => ({
      ...item,
      sort_order: index + 1
    }));

    setFacultyList(withUpdatedOrder);
    setDraggedIdx(null);
    setDragOverIdx(null);
    await saveNewOrder(withUpdatedOrder, movedItem.name);
  };

  const handleDragEnd = () => {
    setDraggedIdx(null);
    setDragOverIdx(null);
  };

  // Step-wise shift position (Left/Right)
  const handleMove = async (currentIndex, direction) => {
    const targetIndex = currentIndex + direction;
    if (targetIndex < 0 || targetIndex >= facultyList.length) return;

    const updated = [...facultyList];
    const temp = updated[currentIndex];
    updated[currentIndex] = updated[targetIndex];
    updated[targetIndex] = temp;

    const withUpdatedOrder = updated.map((item, index) => ({
      ...item,
      sort_order: index + 1
    }));

    setFacultyList(withUpdatedOrder);
    await saveNewOrder(withUpdatedOrder, temp.name);
  };

  const saveNewOrder = async (orderedList, itemName) => {
    setIsReordering(true);
    try {
      const payload = orderedList
        .filter(item => item && item.id)
        .map(item => ({ id: item.id, sort_order: item.sort_order }));

      if (payload.length > 0) {
        const res = await contentService.reorder('faculty', payload);
        if (res.success) {
          showToast(`Reordered "${itemName}". New sort orders saved automatically!`, 'success');
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

  return (
    <div className="space-y-6 text-left max-w-6xl">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center space-x-2.5">
            <h2 className="text-xl font-bold font-poppins text-slate-900">
              Faculty & Mentors Directory ({facultyList.length})
            </h2>
            {isReordering && (
              <span className="text-[11px] font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full animate-pulse flex items-center space-x-1">
                <span>Saving Order...</span>
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage teachers, qualifications, and drag cards to customize display ranking.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search faculty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-xs outline-none w-48 sm:w-60"
            />
          </div>
          <button
            onClick={handleOpenAdd}
            className="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-light text-white font-semibold text-xs flex items-center space-x-1.5 transition-all shadow-md shadow-primary/15 cursor-pointer shrink-0"
          >
            <Plus size={16} />
            <span>Add Faculty</span>
          </button>
        </div>
      </div>

      {/* Helpful Drag Instruction Banner */}
      {!searchQuery && (
        <div className="bg-primary/5 border border-primary/15 p-3.5 rounded-2xl flex items-center justify-between text-xs text-slate-700">
          <div className="flex items-center space-x-2.5">
            <div className="bg-primary text-white p-1.5 rounded-lg shrink-0">
              <ArrowUpDown size={14} />
            </div>
            <span>
              <strong>Drag & Drop to Sort:</strong> Grab any card by its handle (<GripVertical size={13} className="inline text-primary mx-0.5" />) to move its position, or use the <strong>← →</strong> shift buttons. Ranking updates automatically across all faculty members.
            </span>
          </div>
          <span className="hidden md:inline-block text-[11px] font-bold text-primary bg-white px-2.5 py-1 rounded-lg border border-primary/20 shadow-xs">
            Auto-Syncs Sort Order
          </span>
        </div>
      )}

      {/* Faculty Cards Grid with Drag & Drop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredFaculty.map((member, idx) => {
          const isBeingDragged = draggedIdx === idx;
          const isDragTarget = dragOverIdx === idx && draggedIdx !== idx;

          return (
            <div
              key={member.id || idx}
              draggable={!searchQuery}
              onDragStart={(e) => handleDragStart(e, idx)}
              onDragOver={(e) => handleDragOver(e, idx)}
              onDragEnd={handleDragEnd}
              onDrop={(e) => handleDrop(e, idx)}
              className={`bg-white rounded-3xl border shadow-sm overflow-hidden flex flex-col justify-between transition-all duration-200 text-left relative group ${
                isBeingDragged
                  ? 'opacity-40 scale-95 border-2 border-dashed border-primary ring-4 ring-primary/10'
                  : isDragTarget
                  ? 'ring-2 ring-primary ring-offset-2 scale-[1.02] shadow-xl border-primary'
                  : 'border-slate-100 hover:shadow-md hover:border-primary/30'
              }`}
            >
              {/* Card Top Toolbar: Drag Handle + Rank Badge + Quick Shift */}
              <div className="bg-slate-50/90 border-b border-slate-100 px-3 py-2 flex items-center justify-between">
                <div
                  className="flex items-center space-x-1.5 cursor-grab active:cursor-grabbing text-slate-500 hover:text-primary transition-colors select-none"
                  title="Drag card to reorder"
                >
                  <GripVertical size={16} className="text-slate-400 group-hover:text-primary transition-colors" />
                  <span className="text-[11px] font-bold font-mono bg-slate-900 text-secondary px-2 py-0.5 rounded-md shadow-xs">
                    #{idx + 1}
                  </span>
                </div>

                {/* Left/Right quick position controls */}
                {!searchQuery && (
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => handleMove(idx, -1)}
                      disabled={idx === 0}
                      className="p-1 rounded-md text-slate-400 hover:text-primary hover:bg-slate-200/60 disabled:opacity-25 disabled:cursor-not-allowed transition-colors cursor-pointer"
                      title="Move Left / Earlier"
                    >
                      <ChevronLeft size={14} />
                    </button>
                    <button
                      onClick={() => handleMove(idx, 1)}
                      disabled={idx === facultyList.length - 1}
                      className="p-1 rounded-md text-slate-400 hover:text-primary hover:bg-slate-200/60 disabled:opacity-25 disabled:cursor-not-allowed transition-colors cursor-pointer"
                      title="Move Right / Later"
                    >
                      <ChevronRight size={14} />
                    </button>
                  </div>
                )}
              </div>

              {/* Photo Box */}
              <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                <img
                  src={getImageUrl(member.image, (member.name || '').toLowerCase().includes("ma'am") || (member.name || '').toLowerCase().includes("ms") ? 'female' : 'male')}
                  alt={member.name}
                  className="w-full h-full object-cover object-top"
                  onError={(e) => handleImageError(e, (member.name || '').toLowerCase().includes("ma'am") || (member.name || '').toLowerCase().includes("ms"))}
                />
                {(member.department || member.category) && (
                  <div className="absolute top-2.5 right-2.5 bg-slate-950/80 backdrop-blur-sm text-secondary text-[10px] font-bold px-2 py-0.5 rounded-md">
                    {member.department || member.category}
                  </div>
                )}
              </div>

              {/* Body */}
              <div className="p-4 flex-grow flex flex-col justify-between space-y-3">
                <div>
                  <h4 className="font-bold text-sm text-slate-800 font-poppins">{member.name}</h4>
                  <p className="text-[11px] text-primary font-semibold mt-0.5 line-clamp-1">{member.role}</p>
                  <div className="text-[11px] text-slate-400 space-y-0.5 mt-2">
                    <p><strong>Deg:</strong> {member.qualification}</p>
                    <p><strong>Exp:</strong> {member.experience}</p>
                    {member.email && (
                      <p className="truncate text-slate-500 font-mono text-[10px]">{member.email}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <span className="text-[10px] text-slate-400 font-mono">
                    Order: {member.sort_order ?? idx + 1}
                  </span>

                  <div className="flex items-center space-x-1.5">
                    <button
                      onClick={() => handleOpenEdit(member)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-primary hover:bg-primary/5 transition-colors cursor-pointer"
                      title="Edit"
                    >
                      <Edit2 size={15} />
                    </button>
                    {member.id && (
                      <button
                        onClick={() => setDeleteItem(member)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 size={15} />
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
        title={editingItem ? 'Edit Faculty Member' : 'Add New Faculty Member'}
        fields={fields}
        initialData={
          editingItem
            ? {
                ...editingItem,
                department: editingItem.department || editingItem.category || 'English'
              }
            : { department: 'English', sort_order: facultyList.length + 1 }
        }
        isSaving={isSaving}
      />

      <DeleteConfirmModal
        isOpen={!!deleteItem}
        onClose={() => setDeleteItem(null)}
        onConfirm={handleDelete}
        title="Remove Faculty Member"
        itemName={deleteItem?.name}
        isDeleting={isDeleting}
      />
    </div>
  );
}
