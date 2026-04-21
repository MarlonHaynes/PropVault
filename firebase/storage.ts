import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  listAll,
} from 'firebase/storage';
import { storage, isDemoMode } from './config';

export interface UploadProgress {
  progress: number;
  downloadURL?: string;
  error?: string;
}

/**
 * Upload a single image file to Firebase Storage.
 * Returns download URL when complete.
 * In demo mode: returns a fake blob URL so UI still works.
 */
export async function uploadListingImage(
  listingId: string,
  file: File,
  onProgress?: (pct: number) => void
): Promise<string> {
  if (isDemoMode) {
    // Simulate upload delay then return object URL for preview
    await new Promise(r => setTimeout(r, 800 + Math.random() * 600));
    onProgress?.(100);
    return URL.createObjectURL(file);
  }

  const path = `listings/${listingId}/${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
  const storageRef = ref(storage!, path);
  const task = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    task.on(
      'state_changed',
      snap => {
        const pct = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
        onProgress?.(pct);
      },
      reject,
      async () => {
        const url = await getDownloadURL(task.snapshot.ref);
        resolve(url);
      }
    );
  });
}

/**
 * Upload multiple images in parallel.
 * onProgress called with { fileIndex, progress } for each file.
 */
export async function uploadMultipleImages(
  listingId: string,
  files: File[],
  onProgress?: (fileIndex: number, pct: number) => void
): Promise<string[]> {
  const uploads = files.map((file, i) =>
    uploadListingImage(listingId, file, pct => onProgress?.(i, pct))
  );
  return Promise.all(uploads);
}

/**
 * Delete an image by its full Firebase Storage URL.
 */
export async function deleteListingImage(downloadURL: string): Promise<void> {
  if (isDemoMode) return;
  try {
    const imageRef = ref(storage!, downloadURL);
    await deleteObject(imageRef);
  } catch {
    // Image may already be deleted — ignore
  }
}

/**
 * Delete all images for a listing (when deleting the listing itself).
 */
export async function deleteAllListingImages(listingId: string): Promise<void> {
  if (isDemoMode) return;
  try {
    const folderRef = ref(storage!, `listings/${listingId}`);
    const list = await listAll(folderRef);
    await Promise.all(list.items.map(item => deleteObject(item)));
  } catch {
    // Folder may not exist
  }
}
