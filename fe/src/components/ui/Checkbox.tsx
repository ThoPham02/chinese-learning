import React from 'react';

type CheckboxProps = {
  id: string;
  label: React.ReactNode;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Checkbox: React.FC<CheckboxProps> = ({ id, label, checked, onChange }) => {
  return (
    <div className="flex items-center">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 text-red-700 border-gray-300 rounded focus:ring-red-700 cursor-pointer"
      />
      <label htmlFor={id} className="ml-2 block text-sm text-gray-700 cursor-pointer">
        {label}
      </label>
    </div>
  );
};

export default Checkbox;