
import "server-only";
import { neon } from "@neondatabase/serverless";
import { LeadInput } from "./lead-schema";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("Missing DATABASE_URL environment variable");
}

const sql = neon(databaseUrl);

export async function createLead(lead: LeadInput) {
  const rows = await sql`
    WITH lock AS MATERIALIZED (
      SELECT pg_advisory_xact_lock(
        hashtextextended(${lead.phone}, 0)
      )
    ),
    recent AS MATERIALIZED (
      SELECT l.id
      FROM leads AS l
      CROSS JOIN lock
      WHERE l.phone = ${lead.phone}
        AND l.created_at > NOW() - INTERVAL '10 minutes'
      LIMIT 1
    ),
    inserted AS (
      INSERT INTO leads (
        name, phone, interest, comment,
        source, campaign, ad, page
      )
      SELECT
        ${lead.name},
        ${lead.phone},
        ${lead.interest},
        ${lead.comment ?? ""},
        ${lead.source ?? ""},
        ${lead.campaign ?? ""},
        ${lead.ad ?? ""},
        ${lead.page ?? ""}
      FROM lock
      WHERE NOT EXISTS (SELECT 1 FROM recent)
      RETURNING id
    )
    SELECT
      EXISTS (SELECT 1 FROM recent) AS duplicate,
      (SELECT id FROM inserted) AS id
  `;

  return {
    duplicate: Boolean(rows[0]?.duplicate),
    id: rows[0]?.id ?? null,
  };
}
