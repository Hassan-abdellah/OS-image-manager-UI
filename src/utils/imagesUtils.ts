// Display helper
export const getBlobUrl = (blob: Blob): string => {
  return URL.createObjectURL(blob);
};

// generate file url

export const getFileUrl = (file: File): string => {
  return URL.createObjectURL(file);
};
// revoke generated file url

export const revokeUrl = (url: string): void => {
  URL.revokeObjectURL(url);
};
// Download helper
export const downloadBlob = (blob: Blob, fileName: string = "image"): void => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// Download helper
export const downloadImgURL = async (
  url: string,
  fileName: string = "image",
): Promise<void> => {
  const res = await fetch(url);
  const blob = await res.blob();
  const blobUrl = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = blobUrl;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(blobUrl);
};

export const getImageDimensions = (
  url: string,
): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () =>
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    img.onerror = reject;
    img.src = url;
  });
};

// convert bytes to MB
export const getSizeWithUnit = (
  bytes: number,
): { value: number; unit: "KB" | "MB" } => {
  if (bytes <= 0) return { value: 0, unit: "KB" };

  const mb = bytes / (1024 * 1024);

  if (mb >= 0.2) {
    return { value: Number(mb.toFixed(2)), unit: "MB" };
  }

  return { value: Number((bytes / 1024).toFixed(2)), unit: "KB" };
};
