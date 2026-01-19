import { FormElement } from "@/types/formTypes";

interface Props {
  field: FormElement;
  value: any;
  onChange: (name: string, value: any) => void;
  error?: string;
}

const CommonInput = ({ field, value, onChange, error }: Props) => {
  return (
    <div className="flex flex-col gap-1">
      {field.label && (
        <label
          htmlFor={field.name}
          className="font-semibold text-gray-700 text-sm"
        >
          {field.label}{" "}
          {field.validation?.required && (
            <span className="text-red-500">*</span>
          )}
        </label>
      )}
      <input
        type={field.inputType || "text"}
        placeholder={field.placeholder}
        value={value || ""}
        onChange={(e) => onChange(field.name, e.target.value)}
        className={`p-2 border rounded-md w-full ${field.className} ${
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-blue-500"
        }`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default CommonInput;
