// types/formTypes.ts

export type ComponentType =
  | "input"
  | "select"
  | "textarea"
  | "button"
  | "checkbox"
  | "radio";

export interface FormElement {
  name: string; 
  componentType: ComponentType; 

  label?: string;
  placeholder?: string;
  className?: string;

  colSpan?: number; 

  inputType?: string; 

  options?: { label: string; value: string }[];

  buttonText?: string; 
  buttonSubmitText?: string;
  icon?: React.ReactNode; 
  onClick?: () => void; 

  validation?: {
    required?: boolean; 
    pattern?: string; 
    errorMessage?: string; 
  };
}
