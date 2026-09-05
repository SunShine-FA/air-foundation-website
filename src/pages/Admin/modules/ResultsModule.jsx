import React, { useState, useEffect, useMemo } from 'react';
import {
  Plus, Edit2, Trash2, Trophy, GripVertical, ChevronLeft, ChevronRight,
  User, Award, Percent, Search, GraduationCap, Sparkles
} from 'lucide-react';
import CrudModal from '../components/CrudModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import { contentService } from '../../../services/contentService';

export default function ResultsModule({ results = [], onRefresh, showToast }) {
  const [resultList, setResultList] = useState(results);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isReordering, setIsReordering] = useState(false);
  const [draggedIdx, setDraggedIdx] = useState(null);
  const [dragOverIdx, setDragOverIdx] = useState(null);
  const [activeFilterTab, setActiveFilterTab] = useState('all');
  const [adminSearch, setAdminSearch] = useState('');

  useEffect(() => {
    setResultList(results);
  }, [results]);

  const getStudentClassKey = (item) => {
    const exam = (item?.examination || '').toLowerCase();
    if (exam.includes('10') || exam.includes('matric') || exam.includes('ssc-ii') || exam.includes('tenth')) return '10th';
    if (exam.includes('9') || exam.includes('ninth') || exam.includes('ssc-i')) return '9th';
    if (exam.includes('12') || exam.includes('2nd year') || exam.includes('second year') || exam.includes('hssc-ii') || exam.includes('twelfth')) return '12th';
    if (exam.includes('11') || exam.includes('1st year') || exam.includes('first year') || exam.includes('hssc-i') || exam.includes('eleventh')) return '11th';
    return '10th';
  };

  const filteredList = useMemo(() => {
    let list = resultList;
    if (activeFilterTab !== 'all') {
      list = list.filter(item => getStudentClassKey(item) === activeFilterTab);
    }
    if (adminSearch.trim()) {
      const q = adminSearch.toLowerCase();
      list = list.filter(item =>
        (item.student_name || '').toLowerCase().includes(q) ||
        (item.examination || '').toLowerCase().includes(q) ||
        (item.score || '').toLowerCase().includes(q)
      );
    }
    return list;
  }, [resultList, activeFilterTab, adminSearch]);

  const fields = [
    { name: 'student_name', label: 'Student / Topper Full Name', placeholder: 'e.g. Alice Wang', required: true },
    { name: 'score', label: 'Student Score / Total Marks', placeholder: 'e.g. 1091 / 1100', required: true },
    { name: 'percentage', label: 'Student Percentage', placeholder: 'e.g. 99.2%', required: true },
    { name: 'image', label: 'Student Photo / Avatar', type: 'image', required: false },
    {
      name: 'examination',
      label: 'Examination / Board Level',
      placeholder: 'e.g. Grade 10 (FBISE)',
      helper: 'Standard classes: Grade 10 (FBISE), Grade 9 (FBISE), 1st Year (11th FBISE), 2nd Year (12th FBISE)',
      required: true
    },
    { name: 'year', label: 'Academic Year', placeholder: 'e.g. 2026', required: true },
    { name: 'passing_percentage', label: 'Overall Class Passing %', placeholder: 'e.g. 100%', defaultValue: '100%', required: false },
    { name: 'distinctions', label: 'Class Distinctions Rate', placeholder: 'e.g. 92%', defaultValue: '90%+', required: false },
    { name: 'toppers', label: 'Position / Distinction Note (Optional)', placeholder: 'e.g. 1st Position FBISE', required: false },
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

    const updated = [...resultList];
    const [movedItem] = updated.splice(draggedIdx, 1);
    updated.splice(targetIndex, 0, movedItem);

    const withUpdatedOrder = updated.map((item, index) => ({
      ...item,
      sort_order: index + 1
    }));

    setResultList(withUpdatedOrder);
    setDraggedIdx(null);
    setDragOverIdx(null);
    await saveNewOrder(withUpdatedOrder, movedItem.student_name || movedItem.examination);
  };

  const handleDragEnd = () => {
    setDraggedIdx(null);
    setDragOverIdx(null);
  };

  const handleMove = async (currentIndex, direction) => {
    const targetIndex = currentIndex + direction;
    if (targetIndex < 0 || targetIndex >= resultList.length) return;

    const updated = [...resultList];
    const temp = updated[currentIndex];
    updated[currentIndex] = updated[targetIndex];
    updated[targetIndex] = temp;

    const withUpdatedOrder = updated.map((item, index) => ({
      ...item,
      sort_order: index + 1
    }));

    setResultList(withUpdatedOrder);
    await saveNewOrder(withUpdatedOrder, temp.student_name || temp.examination);
  };

  const saveNewOrder = async (orderedList, itemName) => {
    setIsReordering(true);
    try {
      const payload = orderedList
        .filter(item => item && item.id)
        .map(item => ({ id: item.id, sort_order: item.sort_order }));

      if (payload.length > 0) {
        const res = await contentService.reorder('results', payload);
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
    let inferredName = item.student_name || '';
    let inferredPercentage = item.percentage || '';
    if (!inferredName && item.toppers) {
      const match = item.toppers.match(/^([^(]+)(?:\(([^)]+)\))?/);
      if (match) {
        inferredName = match[1].trim();
        if (!inferredPercentage && match[2]) inferredPercentage = match[2].trim();
      } else {
        inferredName = item.toppers;
      }
    }

    setEditingItem({
      ...item,
      student_name: inferredName,
      percentage: inferredPercentage || item.percentage || '',
      score: item.score || '',
      image: item.image || '',
      passing_percentage: item.passing_percentage || item.passingPercentage || '100%',
      distinctions: item.distinctions || '90%+'
    });
    setIsModalOpen(true);
  };

  const handleSave = async (formData) => {
    setIsSaving(true);
    try {
      const studentName = (formData.student_name || '').trim() || (formData.toppers || '').trim() || 'Top Student';
      const studentScore = (formData.score || '').trim();
      const studentPercentage = (formData.percentage || '').trim();
      const topperSummary = (formData.toppers || '').trim() || (studentPercentage ? `${studentName} (${studentPercentage})` : studentName);

      const payload = {
        student_name: studentName,
        score: studentScore,
        percentage: studentPercentage,
        image: formData.image || '',
        year: formData.year,
        examination: formData.examination,
        toppers: topperSummary,
        passing_percentage: formData.passing_percentage || formData.passingPercentage || '100%',
        distinctions: formData.distinctions || '90%+',
        sort_order: Number(formData.sort_order) || (resultList.length + 1)
      };

      if (editingItem?.id) {
        const res = await contentService.update('results', editingItem.id, payload);
        if (res.success) {
          showToast('Examination record updated', 'success');
        } else {
          showToast(res.error || 'Failed to update result', 'error');
        }
      } else {
        const res = await contentService.create('results', payload);
        if (res.success) {
          showToast('Examination record added', 'success');
        } else {
          showToast(res.error || 'Failed to add result', 'error');
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
        const res = await contentService.remove('results', deleteItem.id);
        if (res.success) {
          showToast('Examination record deleted', 'success');
        } else {
          showToast(res.error || 'Failed to delete record from database', 'error');
        }
      } else {
        showToast('Examination record deleted', 'success');
      }
      setResultList(prev => prev.filter(item => item !== deleteItem && (!deleteItem.id || item.id !== deleteItem.id)));
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
              Examination Results & Toppers ({resultList.length})
            </h2>
            {isReordering && (
              <span className="text-[11px] font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full animate-pulse">
                Saving Order...
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage toppers, student scores, percentages, photos, and drag cards to reorder.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-light text-white font-semibold text-xs flex items-center space-x-2 transition-all shadow-md shadow-primary/15 cursor-pointer w-fit"
        >
          <Plus size={16} />
          <span>Add Exam Record</span>
        </button>
      </div>

      {/* Class Filter Tabs & Search Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200/80">
          <button
            type="button"
            onClick={() => setActiveFilterTab('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeFilterTab === 'all'
                ? 'bg-primary text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            All Classes ({resultList.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveFilterTab('10th')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeFilterTab === '10th'
                ? 'bg-primary text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            10th Class ({resultList.filter(i => getStudentClassKey(i) === '10th').length})
          </button>
          <button
            type="button"
            onClick={() => setActiveFilterTab('9th')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeFilterTab === '9th'
                ? 'bg-primary text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            9th Class ({resultList.filter(i => getStudentClassKey(i) === '9th').length})
          </button>
          <button
            type="button"
            onClick={() => setActiveFilterTab('11th')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeFilterTab === '11th'
                ? 'bg-primary text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            1st Year ({resultList.filter(i => getStudentClassKey(i) === '11th').length})
          </button>
          <button
            type="button"
            onClick={() => setActiveFilterTab('12th')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeFilterTab === '12th'
                ? 'bg-primary text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            2nd Year ({resultList.filter(i => getStudentClassKey(i) === '12th').length})
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-60">
          <Search size={14} className="text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={adminSearch}
            onChange={(e) => setAdminSearch(e.target.value)}
            placeholder="Search student..."
            className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {filteredList.map((res, idx) => {
          const isDragging = draggedIdx === idx;
          const isDragOver = dragOverIdx === idx;
          const studentName = res.student_name || (res.toppers ? res.toppers.replace(/\s*\([^)]*\)/, '') : 'Topper Student');
          const studentPercentage = res.percentage || (res.toppers && res.toppers.includes('(') ? res.toppers.match(/\(([^)]+)\)/)?.[1] : '');

          return (
            <div
              key={res.id || idx}
              draggable
              onDragStart={(e) => handleDragStart(e, idx)}
              onDragOver={(e) => handleDragOver(e, idx)}
              onDrop={(e) => handleDrop(e, idx)}
              onDragEnd={handleDragEnd}
              className={`bg-white p-6 rounded-3xl border shadow-sm flex flex-col justify-between transition-all duration-200 text-left space-y-4 select-none relative group ${
                isDragging
                  ? 'opacity-40 scale-95 border-primary ring-2 ring-primary/20'
                  : isDragOver
                  ? 'border-secondary ring-2 ring-secondary/30 scale-[1.02]'
                  : 'border-slate-100 hover:shadow-md hover:border-slate-200'
              }`}
            >
              <div className="space-y-4">
                {/* Header: Examination & Year */}
                <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                  <div className="flex items-center space-x-2">
                    <div
                      className="bg-slate-900 text-white hover:bg-secondary hover:text-slate-950 px-2 py-0.5 rounded-md text-[10px] font-bold flex items-center space-x-1 cursor-grab active:cursor-grabbing transition-colors"
                      title="Drag to rearrange"
                    >
                      <GripVertical size={12} />
                      <span>#{idx + 1}</span>
                    </div>
                    <h3 className="font-bold text-sm sm:text-base text-slate-800 font-poppins line-clamp-1">{res.examination}</h3>
                  </div>
                  <span className="text-[11px] font-bold text-primary bg-primary/5 px-2.5 py-0.5 rounded-md shrink-0">
                    Year {res.year}
                  </span>
                </div>

                {/* Student Profile & Scores */}
                <div className="flex items-center space-x-3.5 bg-slate-50/80 p-3.5 rounded-2xl border border-slate-100">
                  {/* Little Image Section */}
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-white border border-slate-200/80 shrink-0 shadow-xs flex items-center justify-center">
                    {res.image ? (
                      <img
                        src={res.image}
                        alt={studentName}
                        className="w-full h-full object-cover object-top"
                        onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                      />
                    ) : null}
                    <div className={`w-full h-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm ${res.image ? 'hidden' : 'flex'}`}>
                      <User size={22} className="text-primary/70" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="font-bold text-sm text-slate-900 truncate font-poppins">{studentName}</h4>
                      {studentPercentage && (
                        <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-2 py-0.5 rounded-md shrink-0 shadow-2xs">
                          {studentPercentage}
                        </span>
                      )}
                    </div>
                    
                    {res.score ? (
                      <p className="text-xs text-slate-600 font-medium flex items-center space-x-1">
                        <Award size={13} className="text-secondary shrink-0" />
                        <span>Score: <strong className="text-slate-800 font-mono">{res.score}</strong></span>
                      </p>
                    ) : (
                      <p className="text-xs text-slate-400 italic">Top Performer</p>
                    )}
                  </div>
                </div>

                {/* Class Stats Summary */}
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 pt-1">
                  <div className="bg-slate-50/50 p-2 rounded-xl border border-slate-100">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Class Passing</span>
                    <strong className="text-slate-800 text-xs">{res.passing_percentage || res.passingPercentage || '100%'}</strong>
                  </div>
                  <div className="bg-slate-50/50 p-2 rounded-xl border border-slate-100">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Distinctions</span>
                    <strong className="text-slate-800 text-xs">{res.distinctions || '90%+'}</strong>
                  </div>
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
                    disabled={idx === resultList.length - 1}
                    onClick={() => handleMove(idx, 1)}
                    className="p-1 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Move Right"
                  >
                    <ChevronRight size={13} />
                  </button>
                </div>

                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => handleOpenEdit(res)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-primary hover:bg-primary/5 transition-colors cursor-pointer"
                    title="Edit"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => setDeleteItem(res)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
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
        title={editingItem ? 'Edit Exam Result' : 'Add Exam Result'}
        fields={fields}
        initialData={
          editingItem || {
            year: new Date().getFullYear().toString(),
            passing_percentage: '100%',
            distinctions: '90%+',
            sort_order: resultList.length + 1
          }
        }
        isSaving={isSaving}
      />

      <DeleteConfirmModal
        isOpen={!!deleteItem}
        onClose={() => setDeleteItem(null)}
        onConfirm={handleDelete}
        title="Delete Examination Result"
        itemName={deleteItem?.student_name ? `${deleteItem.student_name} (${deleteItem.examination})` : deleteItem?.examination}
        isDeleting={isDeleting}
      />
    </div>
  );
}
