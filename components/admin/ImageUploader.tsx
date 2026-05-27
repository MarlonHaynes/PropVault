'use client';
import { useState, useCallback } from 'react';
<<<<<<< HEAD
<<<<<<< HEAD
import Image from 'next/image';
import { Upload, X, GripVertical, Star, Link as LinkIcon, Plus } from 'lucide-react';

interface ImageUploaderProps {
=======
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { Upload, X, Loader2, GripVertical, Star } from 'lucide-react';
import { uploadListingImage, deleteListingImage } from '@/firebase/storage';
import { cn } from '@/utils';

interface ImageUploaderProps {
  listingId: string;
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
}

<<<<<<< HEAD
<<<<<<< HEAD
export function ImageUploader({ images, onChange, maxImages = 10 }: ImageUploaderProps) {
  const [urlInput, setUrlInput] = useState('');
  const [draggingIdx, setDraggingIdx] = useState<number | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);

  function addUrl() {
    const url = urlInput.trim();
    if (!url || images.includes(url) || images.length >= maxImages) return;
    if (!url.startsWith('http')) { alert('Please enter a valid URL starting with http'); return; }
    onChange([...images, url]);
    setUrlInput('');
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    const newUrls = files.map(f => URL.createObjectURL(f));
    onChange([...images, ...newUrls].slice(0, maxImages));
    e.target.value = '';
  }

  function removeImage(idx: number) {
    onChange(images.filter((_, i) => i !== idx));
  }

  function setAsCover(idx: number) {
    onChange([images[idx], ...images.filter((_, i) => i !== idx)]);
  }

  function handleDragStart(idx: number) { setDraggingIdx(idx); }
  function handleDragOver(e: React.DragEvent, idx: number) { e.preventDefault(); setDragOverIdx(idx); }
=======
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
interface FileWithProgress {
  file: File;
  preview: string;
  progress: number;
  uploading: boolean;
  error?: string;
}

export function ImageUploader({ listingId, images, onChange, maxImages = 10 }: ImageUploaderProps) {
  const [uploading, setUploading] = useState<FileWithProgress[]>([]);
  const [draggingIdx, setDraggingIdx] = useState<number | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);

  const onDrop = useCallback(async (accepted: File[]) => {
    const remaining = maxImages - images.length;
    const toUpload = accepted.slice(0, remaining);
    if (toUpload.length === 0) return;

    // Create previews
    const previews: FileWithProgress[] = toUpload.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      progress: 0,
      uploading: true,
    }));
    setUploading(prev => [...prev, ...previews]);

    // Upload each
    const urls: string[] = [];
    for (let i = 0; i < toUpload.length; i++) {
      const file = toUpload[i];
      try {
        const url = await uploadListingImage(listingId, file, (pct) => {
          setUploading(prev =>
            prev.map((u, idx) =>
              u.file === file ? { ...u, progress: pct } : u
            )
          );
        });
        urls.push(url);
      } catch {
        setUploading(prev =>
          prev.map(u => u.file === file ? { ...u, error: 'Upload failed', uploading: false } : u)
        );
      }
    }

    // Done: clear uploading queue and add URLs
    setUploading(prev => prev.filter(u => !toUpload.includes(u.file)));
    onChange([...images, ...urls]);
  }, [images, listingId, maxImages, onChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] },
    multiple: true,
    disabled: images.length >= maxImages,
  });

  async function removeImage(url: string, idx: number) {
    const updated = images.filter((_, i) => i !== idx);
    onChange(updated);
    if (!url.startsWith('blob:')) {
      await deleteListingImage(url).catch(() => {});
    }
  }

  function setAsCover(idx: number) {
    const reordered = [images[idx], ...images.filter((_, i) => i !== idx)];
    onChange(reordered);
  }

  // Drag-to-reorder
  function handleDragStart(idx: number) { setDraggingIdx(idx); }
  function handleDragOver(e: React.DragEvent, idx: number) {
    e.preventDefault();
    setDragOverIdx(idx);
  }
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
  function handleDrop(e: React.DragEvent, idx: number) {
    e.preventDefault();
    if (draggingIdx === null || draggingIdx === idx) return;
    const reordered = [...images];
    const [moved] = reordered.splice(draggingIdx, 1);
    reordered.splice(idx, 0, moved);
    onChange(reordered);
    setDraggingIdx(null);
    setDragOverIdx(null);
  }

  return (
    <div className="space-y-4">
<<<<<<< HEAD
<<<<<<< HEAD
      {/* Add by URL */}
      <div className="flex gap-2">
        <div className="flex-1 flex items-center gap-2 bg-slate-800 border border-slate-600 rounded-lg px-3 h-10">
          <LinkIcon className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="url"
            value={urlInput}
            onChange={e => setUrlInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addUrl())}
            placeholder="Paste image URL (https://...)"
            className="flex-1 bg-transparent text-sm text-slate-200 placeholder-slate-500 focus:outline-none"
          />
        </div>
        <button type="button" onClick={addUrl}
          className="h-10 px-4 rounded-lg bg-brand-gold text-slate-900 text-sm font-semibold hover:bg-amber-400 transition-colors flex items-center gap-1.5">
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>

      {/* Upload local file */}
      <label className="flex items-center justify-center gap-3 h-20 rounded-xl border-2 border-dashed border-slate-600 hover:border-brand-gold/50 cursor-pointer transition-colors group">
        <Upload className="w-5 h-5 text-slate-500 group-hover:text-brand-gold transition-colors" />
        <div className="text-center">
          <p className="text-sm text-slate-400 group-hover:text-slate-300">Click to upload from your device</p>
          <p className="text-xs text-slate-600">JPG, PNG, WebP — preview only (use URL for persistence)</p>
        </div>
        <input type="file" accept="image/*" multiple className="sr-only" onChange={handleFileChange} />
      </label>

      {/* Image grid */}
      {images.length > 0 && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {images.map((url, idx) => (
              <div
                key={idx}
                draggable
                onDragStart={() => handleDragStart(idx)}
                onDragOver={e => handleDragOver(e, idx)}
                onDrop={e => handleDrop(e, idx)}
                onDragEnd={() => { setDraggingIdx(null); setDragOverIdx(null); }}
                className={`relative aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all cursor-grab ${
                  idx === 0 ? 'border-brand-gold' :
                  dragOverIdx === idx ? 'border-blue-400 scale-105' : 'border-slate-700'
                } ${draggingIdx === idx ? 'opacity-40' : ''}`}
              >
                <Image src={url} alt={`Image ${idx + 1}`} fill className="object-cover" unoptimized />
                {idx === 0 && (
                  <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-brand-gold text-slate-900 text-[9px] font-bold flex items-center gap-0.5">
                    <Star className="w-2.5 h-2.5 fill-current" /> Cover
                  </div>
                )}
                <div className="absolute top-1 right-1 w-5 h-5 rounded bg-black/50 flex items-center justify-center">
                  <GripVertical className="w-3 h-3 text-white" />
                </div>
                <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5">
                  {idx !== 0 && (
                    <button type="button" onClick={() => setAsCover(idx)}
                      className="px-2 py-1 rounded bg-brand-gold text-slate-900 text-[9px] font-bold">
                      Cover
                    </button>
                  )}
                  <button type="button" onClick={() => removeImage(idx)}
                    className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-500">
            {images.length}/{maxImages} images · Drag to reorder · First image is the cover photo
          </p>
        </>
=======
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
      {/* Drop zone */}
      <div
        {...getRootProps()}
        className={cn(
          'border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all',
          isDragActive ? 'border-brand-gold bg-brand-gold/5' : 'border-slate-600 hover:border-slate-400',
          images.length >= maxImages && 'opacity-50 cursor-not-allowed'
        )}
      >
        <input {...getInputProps()} />
        <Upload className="w-8 h-8 text-slate-400 mx-auto mb-3" />
        <p className="text-sm text-slate-300 font-medium">
          {isDragActive ? 'Drop images here...' : 'Drag & drop images, or click to browse'}
        </p>
        <p className="text-xs text-slate-500 mt-1">
          JPG, PNG, WebP — up to {maxImages} images ({images.length}/{maxImages} uploaded)
        </p>
      </div>

      {/* Upload progress queue */}
      {uploading.length > 0 && (
        <div className="space-y-2">
          {uploading.map((u, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-slate-800/50 border border-slate-700 rounded-lg">
              <div className="w-10 h-10 rounded overflow-hidden shrink-0">
                <Image src={u.preview} alt="uploading" width={40} height={40} className="object-cover w-full h-full" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-300 truncate">{u.file.name}</p>
                {u.error ? (
                  <p className="text-xs text-red-400">{u.error}</p>
                ) : (
                  <div className="mt-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-gold transition-all" style={{ width: `${u.progress}%` }} />
                  </div>
                )}
              </div>
              <Loader2 className="w-4 h-4 text-brand-gold animate-spin shrink-0" />
            </div>
          ))}
        </div>
      )}

      {/* Image grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {images.map((url, idx) => (
            <div
              key={idx}
              draggable
              onDragStart={() => handleDragStart(idx)}
              onDragOver={(e) => handleDragOver(e, idx)}
              onDrop={(e) => handleDrop(e, idx)}
              onDragEnd={() => { setDraggingIdx(null); setDragOverIdx(null); }}
              className={cn(
                'relative aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all cursor-grab active:cursor-grabbing',
                idx === 0 ? 'border-brand-gold' : 'border-slate-700',
                dragOverIdx === idx && draggingIdx !== idx ? 'border-blue-400 scale-105' : '',
                draggingIdx === idx ? 'opacity-50' : ''
              )}
            >
              <Image src={url} alt={`Property image ${idx + 1}`} fill className="object-cover" />

              {/* Cover badge */}
              {idx === 0 && (
                <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full bg-brand-gold text-slate-900 text-[10px] font-bold flex items-center gap-1">
                  <Star className="w-2.5 h-2.5 fill-current" /> Cover
                </div>
              )}

              {/* Drag handle */}
              <div className="absolute top-1.5 right-1.5 w-6 h-6 rounded bg-black/50 flex items-center justify-center">
                <GripVertical className="w-3.5 h-3.5 text-white" />
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                {idx !== 0 && (
                  <button
                    type="button"
                    onClick={() => setAsCover(idx)}
                    className="px-2 py-1 rounded bg-brand-gold text-slate-900 text-[10px] font-bold hover:bg-amber-400 transition-colors"
                  >
                    Set Cover
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => removeImage(url, idx)}
                  className="w-7 h-7 rounded-full bg-red-500/90 flex items-center justify-center text-white hover:bg-red-600 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {images.length > 1 && (
        <p className="text-xs text-slate-500">
          Drag to reorder. First image is the cover photo shown on listing cards.
        </p>
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
      )}
    </div>
  );
}
