import { useEffect, useState } from "react";
import type { Certificate } from "../schemas/Product";

export interface HookCertificates{
    certificates: Certificate[];
    updateCertificate: (certificate: Certificate, type: string) => void;
    removeCertificate: (type: string) => void
}


export const useCertificates = (initCertificates: Certificate[] = []): HookCertificates => {
  const [certificates, setCertificates] = useState<Certificate[]>(initCertificates)

  const updateCertificate = (certificate: Certificate, type: string) => {
    const ctr = certificates.find(cr=>cr.type == type)
    if(ctr){
      setCertificates(prev=>prev.map(cr=>cr.type != type ? cr : certificate))
    }else{
      setCertificates(prev=>[...prev, certificate])
    }
  };

  useEffect(()=>{
    console.log("Cambio certificados ->>", certificates)
  }, [certificates])

  const removeCertificate = (type: string)=>{
    setCertificates(prev=>prev.filter(cr=>cr.type != type))
  } 


  return {
    certificates,
    updateCertificate,
    removeCertificate,
  };
};
