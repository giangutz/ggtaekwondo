import { companies } from "@/constants";
import Image from "next/image";
import React from "react";

const Affiliate = () => {
  return (
   <div className="p-4">
  <h2 className="text-3xl font-bold text-center mb-4">Our Affiliations</h2>
  <p className="text-center mb-6 text-base md:text-lg">
    We are proud to be affiliated with these outstanding organizations:
  </p>
  <div className="flex flex-wrap items-center justify-center gap-4 md:gap-16">
    {companies.map((company) => (
      <div key={company.id} className="flex md:max-w-60 max-w-32 gap-4 p-4 transition-transform duration-200 hover:scale-105">
        <Image
          src={company.img}
          alt={company.name}
          width={600}
          height={1000}
          className={`md:w-24 w-20 ${[3, 4, 5].includes(company.id) ? "md:w-32 w-28" : ""}`}
        />
      </div>
    ))}
  </div>
</div>
  );
};

export default Affiliate;
