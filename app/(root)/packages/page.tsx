import { getAllPackageDetails } from '@/lib/actions/packagedetails.actions';
import React from 'react'

const page = async () => {
    const pkgDetails = await getAllPackageDetails();
  return (
    <div>
      {pkgDetails.map((pkg) => (
        <div key={pkg._id}>
          <h1>{pkg.name}</h1>
          <p>{pkg.price}</p>
        </div>
      ))}
    </div>
  )
}

export default page