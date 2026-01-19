"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { FormElement } from "@/types/formTypes";

interface MasterFormProps {
  fields: FormElement[];
  onSubmit: (data: any) => Promise<boolean> | void;
  className?: string;
}

const colSpanClasses: Record<number, string> = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
  5: "col-span-5",
  6: "col-span-6",
  7: "col-span-7",
  8: "col-span-8",
  9: "col-span-9",
  10: "col-span-10",
  11: "col-span-11",
  12: "col-span-12",
};

export default function UniversalForm({
  fields,
  onSubmit,
  className,
}: MasterFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleInternalSubmit = async (data: any) => {
    const success = await onSubmit(data);

    if (success) {
      reset();
    }
  };

  // Aa function JSON data ne React Hook Form na rules ma convert kare che
  const getRules = (field: FormElement) => {
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

  return (
    <form
      onSubmit={handleSubmit(handleInternalSubmit)}
      className={`grid grid-cols-12 gap-4 ${className}`}
    >
      {fields.map((field, index) => {
        const colClass = colSpanClasses[field.colSpan || 12];
        const hasError = errors[field.name];

        return (
          <div key={index} className={`${colClass} flex flex-col gap-1`}>
            {/* Label */}
            {field.label && field.componentType !== "button" && (
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

            {/* --- INPUT --- */}
            {field.componentType === "input" && (
              <input
                type={field.inputType || "text"}
                placeholder={field.placeholder}
                className={`p-2 border rounded-md w-full ${field.className} ${
                  hasError
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
                {...register(field.name, getRules(field))}
              />
            )}

            {/* --- SELECT --- */}
            {field.componentType === "select" && (
              <select
                className={`p-2 border rounded-md w-full bg-white ${
                  field.className
                } ${hasError ? "border-red-500" : "border-gray-300"}`}
                {...register(field.name, getRules(field))}
              >
                <option value="">Select Option</option>
                {field.options?.map((opt, i) => (
                  <option key={i} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            )}

            {/* --- BUTTON --- */}
            {field.componentType === "button" && (
              <button
                type={field.inputType === "submit" ? "submit" : "button"}
                disabled={isSubmitting}
                className={`w-full py-2 px-4 rounded flex items-center justify-center gap-2 ${
                  field.className
                } ${isSubmitting ? "opacity-50" : ""}`}
              >
                {field.icon && <span>{field.icon}</span>}
                {isSubmitting ? field.buttonSubmitText : field.buttonText}
              </button>
            )}

            {/* --- ERROR MESSAGE --- */}
            {hasError && (
              <p className="text-red-500 text-xs mt-1">
                {errors[field.name]?.message as string}
              </p>
            )}
          </div>
        );
      })}
    </form>
  );
}
