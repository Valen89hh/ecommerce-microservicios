import { motion, AnimatePresence } from "framer-motion";
import Checkbox from "../../../components/inputs/Checkbox";
import Heading4 from "../../../components/texts/Heading4";
import Field from "../../../components/inputs/Field";
import FieldDate from "../../../components/inputs/FieldDate";
import type { Certificate, FileData } from "../schemas/Product";
import { useUploadManager } from "../../fileManager/hooks/useUploadManager";
import FileUploadManager from "../../fileManager/components/FileUploadManager";
import { useEffect, useState } from "react";
import { formatDateToString, getExtensionFromPath } from "../../../utils/utils";

interface CertificateSectionProps {
  label: string;
  data?: Certificate | null;
  onChange: (certificate: Certificate) => void;
}

const CertificateSection:React.FC<CertificateSectionProps> = ({
  label,
  data,
  onChange
}) => {

  const hook = useUploadManager({ accept: ["image/", "pdf"], initFiles: data ? data.files.map(fl=>({
    id: fl.id.toString(),
    previewUrl: fl.fileUrl,
    url: fl.fileUrl,
    path: fl.filePath,
    type: getExtensionFromPath(fl.filePath)
  })) : [] });
  const [enabled, setEnabled] = useState(data != null);
  const [certifyingBody, setCertifyingBody] = useState(data ? data.certifyingBody : "")
  const [certificateNumber, setCertificateNumber] = useState(data ? data.certificateNumber : "")
  const [issueDate, setIssueDate] = useState(data ? formatDateToString(data.issueDate) : "")
  const [expirationDate, setExpirationDate] = useState(data ? formatDateToString(data.expirationDate) : "")

  useEffect(()=>{
    if(hook.files.length > 0 && enabled && certifyingBody && certificateNumber && issueDate && expirationDate){
      console.log("Cambiando Dato")
      onChange({
        id: data ? data.id : -1,
        certifyingBody,
        certificateNumber,
        issueDate: new Date(issueDate),
        expirationDate: new Date(expirationDate),
        type: label,
        files: hook.files.filter(fl=>fl.path && fl.url && fl.type).map(fl=>{
          return {
            id: !isNaN(Number(fl.id)) ? Number(fl.id) : -1,
            filePath: fl.path,
            fileUrl: fl.url,
            fileType: fl.type
          } as FileData
        })
      })
    }
  }, [hook.files, enabled, certifyingBody, certificateNumber, issueDate, expirationDate])
  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center gap-2 bg-card dark:bg-dark-card border border-border dark:border-dark-border rounded-lg px-2 py-3">
        <Checkbox checked={enabled} onChange={() => setEnabled(!enabled)} />
        <Heading4 className="text-muted dark:text-dark-muted">{label}</Heading4>
      </div>

      {/* Formulario animado */}
      <AnimatePresence>
        {enabled && (
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
                <FileUploadManager
                  hook={hook}
                  renderFilePreview={(file) =>
                    file.file?.type === "application/pdf" ? (
                      <div className="w-[200px] h-[200px] bg-gray-200 rounded-lg flex items-center justify-center text-center text-sm">
                        {file.file?.name}
                      </div>
                    ) : (
                      <img src={file.previewUrl} className="w-[200px] h-[200px] object-cover rounded-lg" />
                    )
                  }
                />
              </div>


              {/* Cert info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Heading4 className="text-muted dark:text-dark-muted">Certifying Body *</Heading4>
                  <Field 
                    placeholder="Name of the organization" 
                    className="bg-card dark:bg-dark-card" 
                    value={certifyingBody}
                    onChange={(e)=>setCertifyingBody(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Heading4 className="text-muted dark:text-dark-muted">Certificate Number *</Heading4>
                  <Field 
                    placeholder="Ej: CERT-2025-001" 
                    className="bg-card dark:bg-dark-card" 
                    value={certificateNumber}
                    onChange={(e)=>setCertificateNumber(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Heading4 className="text-muted dark:text-dark-muted">Issue Date *</Heading4>
                  <FieldDate 
                    placeholder="yyyy-mm-dd" 
                    className="bg-card dark:bg-dark-card"
                    value={issueDate}
                    onChange={e=>setIssueDate(e.target.value)} 
                  />
                </div>
                <div className="space-y-1">
                  <Heading4 className="text-muted dark:text-dark-muted">Expiration Date *</Heading4>
                  <FieldDate 
                    placeholder="yyyy-mm-dd" 
                    className="bg-card dark:bg-dark-card"
                    value={expirationDate}
                    onChange={e=>setExpirationDate(e.target.value)} 
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
