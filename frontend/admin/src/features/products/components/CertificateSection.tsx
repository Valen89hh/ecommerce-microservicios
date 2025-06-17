import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CloudUpload, X } from "lucide-react";
import Checkbox from "../../../components/inputs/Checkbox";
import Heading4 from "../../../components/texts/Heading4";
import Caption from "../../../components/texts/Caption";
import Field from "../../../components/inputs/Field";
import FieldDate from "../../../components/inputs/FieldDate";
import type { CertificateData } from "../schemas/Product";

interface CertificateSectionProps {
  label: string;
  data: CertificateData;
  onChange: (data: Partial<CertificateData>) => void;
}

const CertificateSection:React.FC<CertificateSectionProps> = ({
  label,
  data,
  onChange
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleFiles = (incomingFiles: File[]) => {
    const validFiles = incomingFiles.filter(
      (file) =>
        (file.type.startsWith("image/") || file.type === "application/pdf") &&
        file.size <= 5 * 1024 * 1024
    );
    onChange({ files: [...data.files, ...validFiles] });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      handleFiles(Array.from(selectedFiles));
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const removeFile = (indexToRemove: number) => {
    onChange({ files: data.files.filter((_, index) => index !== indexToRemove) });
  };

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center gap-2 bg-card dark:bg-dark-card border border-border dark:border-dark-border rounded-lg px-2 py-3">
        <Checkbox checked={data.enabled} onChange={() => onChange({enabled: !data.enabled})} />
        <Heading4 className="text-muted dark:text-dark-muted">{label}</Heading4>
      </div>

      {/* Formulario animado */}
      <AnimatePresence>
        {data.enabled && (
          <motion.div
            key="form"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="rounded-lg space-y-3 bg-background dark:bg-dark-background border border-border dark:border-dark-border px-4 pb-4 pt-2">
              {/* Upload */}
              
              <div className="space-y-1">
                <Heading4 className="text-muted dark:text-dark-muted">
                  {label} Certificate *
                </Heading4>
                {data.files.length == 0 && (
                  <div
                    className={`p-8 border-dashed border rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors min-h-[200px] ${
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
                      accept="image/*,application/pdf"
                      multiple
                      hidden
                      ref={fileInputRef}
                      onChange={handleChange}
                    />
                    <CloudUpload className="text-muted dark:text-dark-muted" size={32} />
                    <Caption className="text-muted mt-2 dark:text-dark-muted">
                      Drag and drop or click to upload the certificate
                    </Caption>
                    <Caption className="text-muted mt-1 dark:text-dark-muted font-normal text-[10px]">
                      PDF, JPG or PNG (max. 5MB)
                    </Caption>
                  </div>
                )}
                {/* Vista previa de archivos */}
                {data.files.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {data.files.map((file, index) => {
                      const isImage = file.type.startsWith("image/");
                      const fileURL = URL.createObjectURL(file);

                      return (
                        <div
                          key={index}
                          className="relative group border rounded-lg overflow-hidden bg-card dark:bg-dark-card p-2"
                        >
                          <button
                              className="absolute top-1 right-1 bg-black/60 rounded-full p-1 text-white hidden group-hover:block"
                              onClick={() => removeFile(index)}
                              title="Remove"
                          >
                              <X size={16}  />
                          </button>

                          {isImage ? (
                            <img
                              src={fileURL}
                              alt={`Uploaded ${file.name}`}
                              className="w-full h-32 object-cover rounded"
                            />
                          ) : (
                            <div className="flex flex-col items-center justify-center h-32 text-center px-2">
                              <span className="text-xs font-medium text-muted dark:text-dark-muted break-all">
                                {file.name}
                              </span>
                              <span className="text-[10px] text-gray-500 mt-1">PDF File</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                    <div
                      className={`p-8 border-dashed border rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors ${
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
                        accept="image/*,application/pdf"
                        multiple
                        hidden
                        ref={fileInputRef}
                        onChange={handleChange}
                      />
                      <CloudUpload className="text-muted dark:text-dark-muted" size={32} />
                      <Caption className="text-muted mt-2 dark:text-dark-muted">
                        Drag and drop or click to upload the certificate
                      </Caption>
                      <Caption className="text-muted mt-1 dark:text-dark-muted font-normal text-[10px]">
                        PDF, JPG or PNG (max. 5MB)
                      </Caption>
                    </div>
                  </div>
                )}
              </div>


              {/* Cert info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Heading4 className="text-muted dark:text-dark-muted">Certifying Body *</Heading4>
                  <Field 
                    placeholder="Name of the organization" 
                    className="bg-card dark:bg-dark-card" 
                    value={data.certifyingBody}
                    onChange={(e)=>onChange({certifyingBody: e.target.value})}
                  />
                </div>
                <div className="space-y-1">
                  <Heading4 className="text-muted dark:text-dark-muted">Certificate Number *</Heading4>
                  <Field 
                    placeholder="Ej: CERT-2025-001" 
                    className="bg-card dark:bg-dark-card" 
                    value={data.certificateNumber}
                    onChange={(e)=>onChange({certificateNumber: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Heading4 className="text-muted dark:text-dark-muted">Issue Date *</Heading4>
                  <FieldDate 
                    placeholder="yyyy-mm-dd" 
                    className="bg-card dark:bg-dark-card"
                    value={data.issueDate}
                    onChange={e=>onChange({issueDate: e.target.value})} 
                  />
                </div>
                <div className="space-y-1">
                  <Heading4 className="text-muted dark:text-dark-muted">Expiration Date *</Heading4>
                  <FieldDate 
                    placeholder="yyyy-mm-dd" 
                    className="bg-card dark:bg-dark-card"
                    value={data.expirationDate}
                    onChange={e=>onChange({expirationDate: e.target.value})} 
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CertificateSection;
