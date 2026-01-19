"use server";

import { db } from "@/db";
import { submissions } from "@/db/schema";

export async function submitDynamicForm(data: any) {
  try {
    console.log("Server received:", data);

    // Drizzle query to insert data
    await db.insert(submissions).values({
      formData: data,
    });

    return { success: true, message: "Form submitted successfully!" };
  } catch (error) {
    console.error("Database Error:", error);
    return { success: false, message: "Failed to submit form." };
  }
}
