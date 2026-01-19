import { FormElement } from "@/types/formTypes";

export const validateField = (
  value: any,
  field: FormElement,
): string | null => {
  if (field.validation?.required) {
    if (!value || value.toString().trim() === "") {
      return `${field.label || field.name} is required`;
    }
  }

  if (value && field.validation?.pattern) {
    const regex = new RegExp(field.validation.pattern);
    if (!regex.test(value)) {
      return field.validation.errorMessage || "Invalid format";
    }
  }

  return null;
};
