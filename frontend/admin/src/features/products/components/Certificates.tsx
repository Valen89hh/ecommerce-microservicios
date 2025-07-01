import Card from "../../../components/ui/Card";
import Heading3 from "../../../components/texts/Heading3";
import CertificateSection from "./CertificateSection"; // Asegúrate de que la ruta sea correcta
import type { HookCertificates } from "../hooks/useCertificates";
import type React from "react";

interface Props{
  hook: HookCertificates
}

const Certificates: React.FC<Props> = ({
  hook
}) => {
  const { certificates, updateCertificate } = hook;
  return (
    <Card className="space-y-2">
      <Heading3>Certificates</Heading3>
      <div className="space-y-3">
        {(["Organic", "Vegan", "Gluten Free"] as const).map((label) => (
          <CertificateSection
            key={label}
            label={label}
            data={certificates.find(cr=>cr.type == label)}
            onChange={(data) => {
              updateCertificate(data, label)
            }}
          />
        ))}
      </div>
    </Card>
  );
};

export default Certificates;
