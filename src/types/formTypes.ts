// types/formTypes.ts

export type ComponentType =
  | "input"
  | "select"
  | "textarea"
  | "button"
  | "checkbox"
  | "radio";

export interface FormElement {
  name: string; // Unique ID for state
  componentType: ComponentType; // Main type decider

  // Visual & Label Props
  label?: string;
  placeholder?: string;
  className?: string; // Custom CSS classes

  // Layout Prop (Grid Control)
  colSpan?: number; // 1 to 12 (Tailwind Grid System)

  // Input Specifics
  inputType?: string; // 'text', 'password', 'email', 'submit', 'reset'
  //   required?: boolean;

  // Select/Radio Specifics
  options?: { label: string; value: string }[];

  // Button Specifics
  buttonText?: string; // Button label
  buttonSubmitText?: string;
  icon?: React.ReactNode; // Optional Icon
  onClick?: () => void; // Custom click handler (optional)

  validation?: {
    required?: boolean; // True hoy to required
    // minLength?: number; // Minimum characters
    // maxLength?: number; // Maximum characters
    pattern?: string; // Regex (mate Email, Phone)
    errorMessage?: string; // Custom error msg (optional)
  };
}
