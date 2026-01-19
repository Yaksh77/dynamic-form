import { pgTable, serial, text, timestamp, jsonb } from "drizzle-orm/pg-core";

export const submissions = pgTable("submissions", {
  id: serial("id").primaryKey(),
  formData: jsonb("form_data").notNull(),

  submittedAt: timestamp("submitted_at").defaultNow(),
});
