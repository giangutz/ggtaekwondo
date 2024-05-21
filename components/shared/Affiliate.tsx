import { companies } from '@/constants';
import React from 'react'

const Affiliate = () => {
  return (
    <div>
        {/* <h4 className='h5-bold text-center'>AFFILIATED WITH</h4> */}
      <div className="flex flex-wrap items-center justify-center gap-4 md:gap-16 max-lg:mt-10">
        {companies.map((company) => (
          <React.Fragment key={company.id}>
            <div className="flex md:max-w-60 max-w-32 gap-4 p-4">
              <img
                src={company.img}
                alt={company.name}
                className={`md:w-24 w-20 ${
                  [3, 4, 5].includes(company.id) ? "md:w-32 w-28" : ""
                }`}
              />
            </div>
            {/* <img
            src={company.img}
            alt={company.name}
            width={company.id === 4 || company.id === 5 ? 100 : 150}
            className="md:w-24 w-20" hidden
          /> */}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default Affiliate