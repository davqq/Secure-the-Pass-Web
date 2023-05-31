import { useEffect, useState } from "react";

const CompanyLogo = ({ companyName }: { companyName: string }) => {
  const [logoUrl, setLogoUrl] = useState("");

  useEffect(() => {
    try {
      if (!companyName) return;
      fetch(
        `https://logo.clearbit.com/${companyName
          .toLowerCase()
          .replace(" ", "")}`
      ).then((res) => setLogoUrl(res.url));
    } catch (error) {
      console.log(error);
    }
  }, [companyName]);

  return (
    <img
      className="w-14 max-h-full my-auto rounded "
      src={logoUrl || "https://via.placeholder.com/150"}
      alt={companyName}
    />
  );
};

export default CompanyLogo;
