import React from "react";

interface InputProps {
  label: string;
  name: string;
  type: string;
  required: boolean;
  //   value: string;
  //   onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ label, name, type, required }) => {
  return (
    <div className={`input-container email relative w-full`}>
      <input
        className="peer block w-full rounded-t-lg border-0 bg-inherit px-25 pb-25
        pt-5 text-sm text-gray-900"
        name={name}
        type={type}
        required={required}
      />
      <label className="input-label">{label}</label>
    </div>
  );
};

export default Input;
