
import Database from "better-sqlite3";
import { mkdirSync } from "node:fs";
import path from "node:path";

const dataDir = path.join(process.cwd(), "data");
mkdirSync(dataDir, { recursive: true });

const dbPath = process.env.DATABASE_PATH
  ? path.resolve(process.env.DATABASE_PATH)
  : path.join(dataDir, "kvarta.sqlite");

mkdirSync(path.dirname(dbPath), { recursive: true });

const db = new Database(dbPath);

// SQLite настройки
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 5000");

db.exec(`
  CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    interest TEXT NOT NULL,
    comment TEXT NOT NULL DEFAULT '',
    source TEXT NOT NULL DEFAULT '',
    campaign TEXT NOT NULL DEFAULT '',
    ad TEXT NOT NULL DEFAULT '',
    page TEXT NOT NULL DEFAULT '',
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE INDEX IF NOT EXISTS idx_leads_phone_created
  ON leads(phone, created_at);
`);

export type NewLead = {
  name: string;
  phone: string;
  interest: "subscription" | "order" | "question";
  comment: string;
  source: string;
  campaign: string;
  ad: string;
  page: string;
};

const insertLead = db.prepare(`
  INSERT INTO leads (
    name, phone, interest, comment,
    source, campaign, ad, page
  ) VALUES (
    @name, @phone, @interest, @comment,
    @source, @campaign, @ad, @page
  )
`);

const findRecentLead = db.prepare(`
  SELECT id
  FROM leads
  WHERE phone = ?
    AND created_at >= datetime('now', '-10 minutes')
  LIMIT 1
`);

export const createLead = db.transaction((lead: NewLead) => {
  const duplicate = findRecentLead.get(lead.phone);

  if (duplicate) {
    return { duplicate: true as const };
  }

  const result = insertLead.run(lead);

  return {
    duplicate: false as const,
    id: Number(result.lastInsertRowid),
  };
});
