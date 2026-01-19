import { FormElement } from "@/types/formTypes";

interface buttonProps {
  field: FormElement;
  isSubmitting: boolean;
}

const CommonButton = ({ field, isSubmitting }: buttonProps) => {
  return (
    <button
      type={field.inputType === "submit" ? "submit" : "button"}
      disabled={isSubmitting}
      className={`w-full py-2 px-4 rounded flex items-center justify-center gap-2 ${field.className} ${
        isSubmitting ? "opacity-50" : ""
      }`}
    >
      {field.icon && <span>{field.icon}</span>}
      {isSubmitting ? field.buttonSubmitText : field.buttonText}
    </button>
  );
};

export default CommonButton;
