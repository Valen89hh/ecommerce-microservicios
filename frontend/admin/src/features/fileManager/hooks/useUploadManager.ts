/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react";
import { api } from "../../../lib/axios";
import { generateUUID } from "../../../utils/uuid";
import type { UploadFileItem } from "../types/fyle-type";
import { getFileExtension } from "../../../utils/utils";

interface UseUploadManagerOptions {
    accept: string[];
    maxSizeMB?: number;
    initFiles: UploadFileItem[];
}

export const useUploadManager = ({ accept, maxSizeMB = 5, initFiles = [] }: UseUploadManagerOptions) => {
    const [files, setFiles] = useState<UploadFileItem[]>(initFiles);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const openFileDialog = () => fileInputRef.current?.click();

    const uploadFile = async (file: File, id: string) => {
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await api.post("/s3/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            const { url, path } = res.data.data;
            setFiles(prev =>
                prev.map(f =>
                f.id !== id
                    ? f
                    : { ...f, url, path, previewUrl: url, uploading: false }
                )
            );
        } catch (error) {
            console.error("Upload failed", error);
            removeFile(id);
        }
    };

    const handleFiles = (files: File[]) => {
        const valid = files.filter(
        (file) =>
            accept.some(type => file.type.includes(type)) &&
            file.size <= maxSizeMB * 1024 * 1024
        );

        valid.forEach(async (file) => {
            const id = generateUUID();
            const previewUrl =
                file.type.startsWith("image/") ? URL.createObjectURL(file) : "";

            const newFile: UploadFileItem = {
                id,
                file,
                type: getFileExtension(file),
                previewUrl,
                uploading: true,
            };

            setFiles(prev => [...prev, newFile]);
            await uploadFile(file, id);
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) handleFiles(Array.from(e.target.files));
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        handleFiles(Array.from(e.dataTransfer.files));
    };

    const removeFile = async (id: string) => {
        try {
        setFiles(prev =>
            prev.map(f => (f.id !== id ? f : { ...f, deleting: true }))
        );
        const file = files.find(f => f.id === id);
        if (file?.path) {
            await api.post("/s3/delete", { paths: [file.path] });
        }
        setFiles(prev => prev.filter(f => f.id !== id));
        } catch (error: any) {
            console.log(error)
            setFiles(prev => prev.filter(f => f.id !== id));
        }
    };

    const reorderFiles = (newOrder: UploadFileItem[]) => {
        setFiles(newOrder);
    };

    return {
        files,
        isDragging,
        fileInputRef,
        setIsDragging,
        handleChange,
        handleDrop,
        openFileDialog,
        removeFile,
        reorderFiles,
    };
};
