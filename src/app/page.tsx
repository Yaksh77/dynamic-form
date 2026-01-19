"use client";

import { submitDynamicForm } from "@/actions/formActions";
import UniversalForm from "@/components/UniversalForm";
import { FormElement } from "@/types/formTypes";
import { SaveIcon } from "lucide-react";

export default function Page() {
  // Json data
  const formConfig: FormElement[] = [
    {
      name: "firstName",
      componentType: "input",
      label: "First Name",
      placeholder: "Enter first name",
      colSpan: 6,
      className: "border-gray-300",
      validation: {
        required: true,
        errorMessage: "First name is required",
      },
    },
    {
      name: "lastName",
      componentType: "input",
      label: "Last Name",
      placeholder: "Enter last name",
      colSpan: 6,
      className: "border-gray-300",
      validation: {
        required: true,
        errorMessage: "Last name is required",
      },
    },
    {
      name: "fatherName",
      componentType: "input",
      label: "Father Name",
      placeholder: "Enter father name",
      colSpan: 6,
      className: "border-gray-300",
      validation: {
        required: true,
        errorMessage: "Father name is required",
      },
    },
    {
      name: "collegeName",
      componentType: "input",
      inputType: "text",
      label: "College Name",
      placeholder: "Enter college name",
      colSpan: 6,
      className: "border-gray-300",
      validation: {
        required: true,
        errorMessage: "College name is required",
      },
    },
    {
      name: "email",
      componentType: "input",
      inputType: "text",
      label: "Email Address",
      placeholder: "Enter email address",
      colSpan: 12,
      className: "border-gray-300",
      validation: {
        required: true,
        pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
        errorMessage: "Plase enter a valid email address",
      },
    },
    {
      name: "aadharNumber",
      componentType: "input",
      inputType: "text",
      label: "Aadhar Number",
      placeholder: "Enter aadhar number",
      colSpan: 12,
      className: "border-gray-300",
      validation: {
        required: true,
        pattern: "^[0-9]{12}$",
        errorMessage: "Please enter a valid aadhar number",
      },
    },
    {
      name: "gender",
      componentType: "select",
      label: "Select Gender",
      options: [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
        { label: "other...", value: "other" },
      ],
      colSpan: 12,
      className: "border-gray-300",
      validation: {
        required: true,
      },
    },
    {
      name: "submitBtn",
      componentType: "button",
      inputType: "submit",
      buttonText: "Register Now",
      buttonSubmitText: "Submitting...",
      icon: <SaveIcon size={18} />,
      className: "bg-blue-600 text-white hover:bg-blue-700 mt-4",
      colSpan: 12,
    },
  ];

  const handleFormSubmit = async (data: any) => {
    console.log("Final Data:", data);

    try {
      const result = await submitDynamicForm(data);
      return result.success;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border border-gray-300 rounded-xl shadow-lg bg-white">
      <h1 className="text-2xl font-bold mb-6 text-center">Dynamic Form</h1>

      <UniversalForm
        fields={formConfig}
        onSubmit={handleFormSubmit}
        className="w-full"
      />
    </div>
  );
}
