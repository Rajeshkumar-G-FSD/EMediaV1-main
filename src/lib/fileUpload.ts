// Client-side validation + compression for competition registration uploads.
// This project has no Firebase Storage (it requires the paid Blaze plan) and
// no backend server, so uploaded images are compressed down to a small size
// and stored as base64 data URIs directly on the Firestore document —
// size/type limits are enforced here since Firestore's 1 MiB per-document
// cap is the only backstop. PDFs aren't supported since they can't be
// client-side compressed to a guaranteed size.

export const ID_PROOF_TYPES = ['image/jpeg', 'image/png'];
export const SCREENSHOT_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

interface FilePrepOptions {
  allowedTypes: string[];
  minBytes: number;
  maxBytes: number;
}

const readImage = (file: File): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Could not read image file'));
    };
    img.src = url;
  });

// Iteratively re-encodes an image at shrinking quality/dimensions until it
// fits under maxBytes, so uploads stay within the site's storage limits.
async function compressImage(file: File, maxBytes: number): Promise<Blob> {
  const img = await readImage(file);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return file;

  let { width, height } = img;
  let quality = 0.85;
  let blob: Blob | null = null;

  for (let attempt = 0; attempt < 8; attempt++) {
    canvas.width = width;
    canvas.height = height;
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, 0, 0, width, height);

    blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, 'image/jpeg', quality)
    );

    if (blob && blob.size <= maxBytes) break;

    quality -= 0.15;
    if (quality < 0.4) {
      width = Math.round(width * 0.75);
      height = Math.round(height * 0.75);
      quality = 0.7;
    }
  }

  return blob ?? file;
}

export interface PreparedFile {
  blob: Blob;
  error: null;
}

export interface PreparedFileError {
  blob: null;
  error: string;
}

export async function prepareFileForUpload(
  file: File,
  { allowedTypes, minBytes, maxBytes }: FilePrepOptions
): Promise<PreparedFile | PreparedFileError> {
  if (!allowedTypes.includes(file.type)) {
    return { blob: null, error: `Unsupported file type. Allowed: ${allowedTypes.map((t) => t.split('/')[1]).join(', ')}` };
  }
  if (file.size < minBytes) {
    return { blob: null, error: `File is too small (minimum ${Math.round(minBytes / 1024)} KB).` };
  }

  const isImage = file.type.startsWith('image/');
  const blob = isImage && file.size > maxBytes ? await compressImage(file, maxBytes) : file;

  if (blob.size > maxBytes) {
    return { blob: null, error: `File is too large even after compression (maximum ${Math.round(maxBytes / 1024)} KB). Please choose a smaller file.` };
  }
  if (blob.size < minBytes) {
    return { blob: null, error: `File is too small (minimum ${Math.round(minBytes / 1024)} KB).` };
  }

  return { blob, error: null };
}

export const blobToDataUri = (blob: Blob): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Could not read file'));
    reader.readAsDataURL(blob);
  });
