"use client";

import { useForm } from "react-hook-form";
import { FormElement } from "@/types/formTypes";
import { getRules } from "@/utils/validation";
import CommonInput from "./CommonInput";
import CommonButton from "./CommonButton";
import CommonSelect from "./CommonSelect";

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

  return (
    <form
      onSubmit={handleSubmit(handleInternalSubmit)}
      className={`grid grid-cols-12 gap-4 ${className}`}
    >
      {fields.map((field, index) => {
        const colClass = colSpanClasses[field.colSpan || 12];

        return (
          <div key={index} className={`${colClass} flex flex-col gap-1`}>
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

            {field.componentType === "input" && (
              <CommonInput
                field={field}
                register={register}
                error={errors[field.name] as any}
              />
            )}

            {field.componentType === "select" && (
            <CommonSelect field={field} register={register} error={errors[field.name] as any} />
            )} 

            {field.componentType === "button" && (
              <CommonButton field={field} isSubmitting={isSubmitting} />
            )}
          </div>
        );
      })}
    </form>
  );
}
