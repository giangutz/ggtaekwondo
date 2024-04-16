import React, { useEffect, useState } from 'react';
import { getAllUser } from "@/lib/actions/user.actions";
import PackageForm from './PackageForm';

const FetchUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUser().then(setUsers);
  }, []); // Empty dependency array

  return <PackageForm users={users} />;
};

export default FetchUsers;