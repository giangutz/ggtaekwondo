"use client";
import { useEffect, useState } from "react";
import { updateUserType } from "@/lib/actions/usertype.actions";

type ChangeUserTypeProps = {
  userType: string;
  userId: string;
  userTypes: any[];
  onUserTypeChanged: () => void;
};

const ChangeUserType = ({
  userType,
  userId,
  userTypes,
  onUserTypeChanged,
}: ChangeUserTypeProps) => {
  const [selectedUserType, setSelectedUserType] = useState(userType);

  const handleChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newUserType = event.target.value;
    setSelectedUserType(newUserType);

    // Call API to update userType in the database
    await updateUserType(userId, newUserType);

    // Call the callback function to notify the parent component that the user type has been changed
    onUserTypeChanged();
  };

  return (
    <select
      name={userId}
      id={userId}
      value={selectedUserType}
      onChange={handleChange}
    >
      {userTypes.map((type: any) => (
        <option key={type._id} value={type._id}>
          {type.name}
        </option>
      ))}
    </select>
  );
};

export default ChangeUserType;
