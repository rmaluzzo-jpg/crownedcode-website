import {
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
  index,
} from "drizzle-orm/pg-core";

export const leads = pgTable(
  "leads",
  {
    id: serial("id").primaryKey(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    name: varchar("name", { length: 200 }).notNull(),
    company: varchar("company", { length: 200 }),
    email: varchar("email", { length: 320 }).notNull(),
    message: text("message").notNull(),
    source: varchar("source", { length: 64 }).default("contact_form").notNull(),
    status: varchar("status", { length: 32 }).default("new").notNull(),
  },
  (t) => ({
    createdAtIdx: index("leads_created_at_idx").on(t.createdAt),
    statusIdx: index("leads_status_idx").on(t.status),
    emailIdx: index("leads_email_idx").on(t.email),
  }),
);

export type Lead = typeof leads.$inferSelect;
export type NewLead = typeof leads.$inferInsert;
