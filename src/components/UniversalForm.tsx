"use client";

import React, { useState } from "react";
import { FormElement } from "@/types/formTypes";
import CommonInput from "./CommonInput";
import CommonSelect from "./CommonSelect";
import CommonButton from "./CommonButton";
import { validateField } from "@/utils/validation";

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
  const [formData, setFormData] = useState<any>({});
  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (name: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev: any) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: any = {};
    let isValid = true;

    fields.forEach((field) => {
      const errorMsg = validateField(formData[field.name], field);
      if (errorMsg) {
        newErrors[field.name] = errorMsg;
        isValid = false;
      }
    });

    setErrors(newErrors);

    if (isValid) {
      setIsSubmitting(true);
      const success = await onSubmit(formData);
      setIsSubmitting(false);

      if (success) {
        setFormData({});
        setErrors({});
      }
    }
  };

  const renderField = (field: FormElement) => {
    switch (field.componentType) {
      case "input":
        return (
          <CommonInput
            field={field}
            value={formData[field.name]}
            onChange={handleChange}
            error={errors[field.name]}
          />
        );
      case "select":
        return (
          <CommonSelect
            field={field}
            value={formData[field.name]}
            onChange={handleChange}
            error={errors[field.name]}
          />
        );
      case "button":
        return <CommonButton field={field} isSubmitting={isSubmitting} />;
      default:
        return null;
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`grid grid-cols-12 gap-4 ${className}`}
      noValidate
    >
      {fields.map((field, index) => {
        const colClass = colSpanClasses[field.colSpan || 12];
        return (
          <div key={index} className={colClass}>
            {renderField(field)}
          </div>
        );
      })}
    </form>
  );
}
