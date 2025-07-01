/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { CloudUpload, X } from "lucide-react";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Loader from "../../../components/ui/Loader";
import Caption from "../../../components/texts/Caption";
import ButtonPrimary from "../../../components/buttons/ButtonPrimary";
import SmallText from "../../../components/texts/SmallText";

interface FileUploadManagerProps {
  hook: ReturnType<typeof import("../hooks/useUploadManager").useUploadManager>;
  renderFilePreview?: (file: any) => React.ReactNode;
  acceptLabel?: string;
}

const SortableFile = ({ file, index, removeFile, renderPreview }: any) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: file.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} className="relative group">
      <div {...listeners}>
        {renderPreview ? (
          renderPreview(file)
        ) : (
          <img
            src={file.previewUrl}
            alt={`preview-${index}`}
            className="w-[200px] h-[200px] object-cover rounded-lg border"
          />
        )}
      </div>

      {file.uploading && (
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center rounded-lg">
          <Loader />
          <Caption>Uploading...</Caption>
        </div>
      )}

      {file.deleting && (
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center rounded-lg">
          <Loader />
          <Caption>Deleting...</Caption>
        </div>
      )}

      {!file.uploading && (
        <button
          type="button"
          className="absolute top-1 right-1 bg-black/60 rounded-full p-1 text-white hidden group-hover:block"
          onClick={() => removeFile(file.id)}
          title="Remove"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

const FileUploadManager: React.FC<FileUploadManagerProps> = ({
  hook,
  renderFilePreview,
  acceptLabel = "PDF, JPG, PNG (max. 5MB)"
}) => {
  const {
    files,
    isDragging,
    fileInputRef,
    setIsDragging,
    handleChange,
    handleDrop,
    openFileDialog,
    removeFile,
    reorderFiles,
  } = hook;

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id !== over.id) {
      const oldIndex = files.findIndex(f => f.id === active.id);
      const newIndex = files.findIndex(f => f.id === over.id);
      reorderFiles(arrayMove(files, oldIndex, newIndex));
    }
  };

  return (
    <>
      {files.length === 0 ? (
        <div
          className={`p-8 bg-background dark:bg-dark-background border-dashed border rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors min-h-[200px] ${
                isDragging
                    ? "border-primary bg-blue-50 dark:bg-blue-900/20"
                    : "border-border dark:border-dark-border"
            }`}
          onClick={openFileDialog}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
            <input
                type="file"
                multiple
                hidden
                ref={fileInputRef}
                onChange={handleChange}
            />
            <CloudUpload className="text-muted dark:text-dark-muted" size={32} />
            <Caption className="text-muted mt-2 dark:text-dark-muted">
                Drag & Drop or Click to Upload Images
            </Caption>
            <Caption className="text-muted mt-1 dark:text-dark-muted font-normal text-[10px]">
                {acceptLabel}
            </Caption>
            <div className="mt-4">
                <ButtonPrimary type="button" onClick={(e) => { e.stopPropagation(); openFileDialog(); }}>
                    <SmallText className="text-white dark:text-white">Select Files</SmallText>
                </ButtonPrimary>
            </div>
        </div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={files.map(f => f.id)} strategy={verticalListSortingStrategy}>
            <div className="flex flex-wrap gap-4">
              {files.map((file, index) => (
                <SortableFile
                  key={file.id}
                  file={file}
                  index={index}
                  removeFile={removeFile}
                  renderPreview={renderFilePreview}
                />
              ))}
              
              <div
                className={`p-4 bg-background dark:bg-dark-background border-dashed border rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors w-[200px] h-[200px] ${
                isDragging
                    ? "border-primary bg-blue-50 dark:bg-blue-900/20"
                    : "border-border dark:border-dark-border"
                }`}
                onClick={openFileDialog}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
            >
                <input type="file" multiple hidden ref={fileInputRef} onChange={handleChange} />
                <CloudUpload className="text-muted dark:text-dark-muted" size={24} />
                <Caption className="text-muted mt-2 text-center dark:text-dark-muted">
                    Add More Files
                </Caption>
            </div>
            </div>
          </SortableContext>
        </DndContext>
      )}
    </>
  );
};

export default FileUploadManager;
