// components/form-elements/FormSelect.tsx
import { UseFormRegister, FieldError } from "react-hook-form";
import { FormElement } from "@/types/formTypes";
import { getRules } from "@/utils/validation";

interface Props {
  field: FormElement;
  register: UseFormRegister<any>;
  error?: FieldError;
}

const CommonSelect = ({ field, register, error }: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <select
        className={`p-2 border rounded-md w-full bg-white ${field.className} ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        {...register(field.name, getRules(field))}
      >
        <option value="">Select Option</option>
        {field.options?.map((opt, i) => (
          <option key={i} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  );
};

export default CommonSelect