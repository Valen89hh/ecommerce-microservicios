export interface UploadFileItem {
  id: string;
  type: string | null;
  file?: File;
  previewUrl: string;
  url?: string;
  path?: string;
  uploading?: boolean;
  deleting?: boolean;
}