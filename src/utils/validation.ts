import { FormElement } from "@/types/formTypes";

export const getRules = (field: FormElement) => {
    const rules: any = {};

    if (field.validation?.required) {
      rules.required = `${field.label || field.name} is required`;
    }

    if (field.validation?.pattern) {
      rules.pattern = {
        value: new RegExp(field.validation.pattern),
        message: field.validation.errorMessage || "Invalid format",
      };
    }

    return rules;
  };