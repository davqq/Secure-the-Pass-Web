import React, { useEffect, useState } from "react";

const CompanyLogo = ({ companyName }: { companyName: string }) => {
  const [logoUrl, setLogoUrl] = useState("");

  useEffect(() => {
    try {
      if (!companyName) return;
      fetch(
        `https://logo.clearbit.com/${companyName
          .toLowerCase()
          .replace(" ", "")}`
      )
        .then((res) => res.json())
        .then((res) => setLogoUrl(res.url));
    } catch (error) {
      console.log(error);
    }
  }, [companyName]);

  return (
    <div>
      <img
        className="w-12 h-12 rounded bg-gray-300"
        src={logoUrl || "https://via.placeholder.com/150"}
        alt={companyName}
      />
    </div>
  );
};

export default CompanyLogo;
