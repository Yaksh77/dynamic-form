import { pgTable, serial, text, timestamp, jsonb } from "drizzle-orm/pg-core";

export const submissions = pgTable("submissions", {
  id: serial("id").primaryKey(),

  // Aa column badha form data ne JSON tarike save karse
  // Example: { firstName: "Yaksh", age: 22, gender: "male" }
  formData: jsonb("form_data").notNull(),

  submittedAt: timestamp("submitted_at").defaultNow(),
});
