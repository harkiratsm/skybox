DROP INDEX IF EXISTS "Authenticator_credentialID_key";--> statement-breakpoint
ALTER TABLE "authenticator" ADD COLUMN "credentialID" text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Authenticator_credentialID_key" ON "authenticator" USING btree ("credentialID");--> statement-breakpoint
ALTER TABLE "authenticator" DROP COLUMN IF EXISTS "credentialId";