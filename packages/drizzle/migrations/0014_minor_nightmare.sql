ALTER TABLE "authenticator" DROP CONSTRAINT "authenticator_credentialID_unique";--> statement-breakpoint
DROP INDEX IF EXISTS "Authenticator_credentialID_key";--> statement-breakpoint
ALTER TABLE "authenticator" ADD COLUMN "credentialId" text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Authenticator_credentialID_key" ON "authenticator" USING btree ("credentialId");--> statement-breakpoint
ALTER TABLE "authenticator" DROP COLUMN IF EXISTS "credentialID";