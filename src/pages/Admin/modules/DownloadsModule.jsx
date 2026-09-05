import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, FileText, Download, GripVertical, ChevronUp, ChevronDown, ExternalLink } from 'lucide-react';
import CrudModal from '../components/CrudModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import { contentService } from '../../../services/contentService';

export default function DownloadsModule({ downloads = [], onRefresh, showToast }) {
  const [downloadList, setDownloadList] = useState(downloads);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isReordering, setIsReordering] = useState(false);
  const [draggedIdx, setDraggedIdx] = useState(null);
  const [dragOverIdx, setDragOverIdx] = useState(null);

  useEffect(() => {
    setDownloadList(downloads);
  }, [downloads]);

  const fields = [
    {
      name: 'file_url',
      label: 'Upload Document / PDF (Auto-Extracts Metadata)',
      type: 'file',
      accept: '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip',
      required: false,
      helper: 'Choose or drop any document to auto-fill Title, File Size, and Format.'
    },
    { name: 'title', label: 'Document Title (Auto-Filled On Upload)', placeholder: 'e.g. Admissions Prospectus & Guidelines', required: true },
    { name: 'size', label: 'File Size (Auto-Filled On Upload)', placeholder: 'e.g. 1.4 MB', required: true },
    { name: 'format', label: 'File Format (Auto-Filled On Upload)', placeholder: 'e.g. PDF', defaultValue: 'PDF', required: true },
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

    const updated = [...downloadList];
    const [movedItem] = updated.splice(draggedIdx, 1);
    updated.splice(targetIndex, 0, movedItem);

    const withUpdatedOrder = updated.map((item, index) => ({
      ...item,
      sort_order: index + 1
    }));

    setDownloadList(withUpdatedOrder);
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
    if (targetIndex < 0 || targetIndex >= downloadList.length) return;

    const updated = [...downloadList];
    const temp = updated[currentIndex];
    updated[currentIndex] = updated[targetIndex];
    updated[targetIndex] = temp;

    const withUpdatedOrder = updated.map((item, index) => ({
      ...item,
      sort_order: index + 1
    }));

    setDownloadList(withUpdatedOrder);
    await saveNewOrder(withUpdatedOrder, temp.title);
  };

  const saveNewOrder = async (orderedList, itemName) => {
    setIsReordering(true);
    try {
      const payload = orderedList
        .filter(item => item && item.id)
        .map(item => ({ id: item.id, sort_order: item.sort_order }));

      if (payload.length > 0) {
        const res = await contentService.reorder('downloads', payload);
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
        title: (formData.title || 'Document').trim(),
        size: (formData.size || '1.0 MB').trim(),
        format: (formData.format || 'PDF').trim().toUpperCase(),
        file_url: (formData.file_url || '#').trim(),
        sort_order: Number(formData.sort_order) || (downloadList.length + 1)
      };

      if (editingItem?.id) {
        const res = await contentService.update('downloads', editingItem.id, payload);
        if (res.success) {
          showToast('Document updated successfully', 'success');
        } else {
          showToast(res.error || 'Failed to update document', 'error');
        }
      } else {
        const res = await contentService.create('downloads', payload);
        if (res.success) {
          showToast('Document added successfully', 'success');
        } else {
          showToast(res.error || 'Failed to add document', 'error');
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
        const res = await contentService.remove('downloads', deleteItem.id);
        if (res.success) {
          showToast('Document removed successfully', 'success');
        } else {
          showToast(res.error || 'Failed to delete document from database', 'error');
        }
      } else {
        showToast('Document removed', 'success');
      }
      setDownloadList(prev => prev.filter(item => item !== deleteItem && (!deleteItem.id || item.id !== deleteItem.id)));
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center space-x-2.5">
            <h2 className="text-xl font-bold font-poppins text-slate-900">
              Academic Downloads & Documents ({downloadList.length})
            </h2>
            {isReordering && (
              <span className="text-[11px] font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full animate-pulse">
                Saving Order...
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Drag items or use arrows to rearrange the document list order.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-light text-white font-semibold text-xs flex items-center space-x-2 transition-all shadow-md shadow-primary/15 cursor-pointer w-fit"
        >
          <Plus size={16} />
          <span>Add New Document</span>
        </button>
      </div>

      <div className="space-y-3">
        {downloadList.map((doc, idx) => {
          const isDragging = draggedIdx === idx;
          const isDragOver = dragOverIdx === idx;

          return (
            <div
              key={doc.id || idx}
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
                {/* Drag handle */}
                <div
                  className="bg-slate-900 text-white hover:bg-secondary hover:text-slate-950 p-2 rounded-xl flex items-center justify-center cursor-grab active:cursor-grabbing transition-colors shrink-0"
                  title="Drag to reorder"
                >
                  <GripVertical size={16} />
                </div>

                <div 
                  onClick={() => {
                    if (doc.file_url && doc.file_url !== '#') {
                      window.open(doc.file_url, '_blank', 'noopener,noreferrer');
                    }
                  }}
                  className={`bg-primary/5 text-primary p-3 rounded-xl shrink-0 ${
                    doc.file_url && doc.file_url !== '#' ? 'cursor-pointer hover:bg-primary/10 hover:scale-105 transition-all' : ''
                  }`}
                  title={doc.file_url && doc.file_url !== '#' ? "Click to open PDF" : "Document"}
                >
                  <FileText size={20} className="text-secondary" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-[11px] font-bold text-slate-400 font-mono">#{idx + 1}</span>
                    <h4 
                      onClick={() => {
                        if (doc.file_url && doc.file_url !== '#') {
                          window.open(doc.file_url, '_blank', 'noopener,noreferrer');
                        }
                      }}
                      className={`font-bold text-slate-800 font-poppins text-sm truncate ${
                        doc.file_url && doc.file_url !== '#' ? 'cursor-pointer hover:text-primary hover:underline' : ''
                      }`}
                      title={doc.file_url && doc.file_url !== '#' ? "Click to open PDF" : doc.title}
                    >
                      {doc.title}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-400 font-semibold mt-0.5 uppercase">
                    Size: {doc.size} | Format: {doc.format || 'PDF'}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
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
                    disabled={idx === downloadList.length - 1}
                    onClick={() => handleMove(idx, 1)}
                    className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Move Down"
                  >
                    <ChevronDown size={14} />
                  </button>
                </div>

                {doc.file_url && doc.file_url !== '#' && (
                  <button
                    type="button"
                    onClick={() => window.open(doc.file_url, '_blank', 'noopener,noreferrer')}
                    className="p-2 rounded-lg text-slate-400 hover:text-primary hover:bg-primary/5 transition-colors cursor-pointer"
                    title="Open / Preview PDF"
                  >
                    <ExternalLink size={16} />
                  </button>
                )}

                <button
                  onClick={() => handleOpenEdit(doc)}
                  className="p-2 rounded-lg text-slate-400 hover:text-primary hover:bg-primary/5 transition-colors cursor-pointer"
                  title="Edit"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => setDeleteItem(doc)}
                  className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <CrudModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        title={editingItem ? 'Edit Document' : 'Add New Document'}
        fields={fields}
        initialData={editingItem || { format: 'PDF', sort_order: (downloadList.length + 1) }}
        isSaving={isSaving}
      />

      <DeleteConfirmModal
        isOpen={!!deleteItem}
        onClose={() => setDeleteItem(null)}
        onConfirm={handleDelete}
        title="Delete Document"
        itemName={deleteItem?.title}
        isDeleting={isDeleting}
      />
    </div>
  );
}
