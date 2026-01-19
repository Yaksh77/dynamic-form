// components/form-elements/FormInput.tsx
import { UseFormRegister, FieldError } from "react-hook-form";
import { FormElement } from "@/types/formTypes";
import { getRules } from "@/utils/validation";

interface Props {
  field: FormElement;
  register: UseFormRegister<any>;
  error?: FieldError;
}

const CommonInput = ({ field, register, error }: Props) => {
  return (
    <div className="flex flex-col gap-1">
      {/* {field.label && (
        <label
          htmlFor={field.name}
          className="font-semibold text-gray-700 text-sm"
        >
          {field.label}{" "}
          {field.validation?.required && (
            <span className="text-red-500">*</span>
          )}
        </label>
      )} */}
      <input
        type={field.inputType || "text"}
        placeholder={field.placeholder}
        className={`p-2 border rounded-md w-full ${field.className} ${
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-blue-500"
        }`}
        {...register(field.name, getRules(field))}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  );
};


export default CommonInput