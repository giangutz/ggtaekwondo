import { updateUserType } from '@/lib/actions/usertype.actions';
import React, { useState } from 'react';

type ChangeUserTypeProps = {
  userType: string;
  userId: string;
  userTypes: string[];
  onUserTypeChanged: () => void;
};

export const ChangeUserType: React.FC<ChangeUserTypeProps> = ({ userType, userId, userTypes, onUserTypeChanged }) => {
  const [selectedUserType, setSelectedUserType] = useState(userType);

  const handleChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserType(event.target.value);
    await updateUserType(userId, event.target.value);
    onUserTypeChanged();
  };

  return (
    <select value={selectedUserType} onChange={handleChange}>
      {userTypes.map((type) => (
        <option key={type} value={type}>
          {type}
        </option>
      ))}
    </select>
  );
};