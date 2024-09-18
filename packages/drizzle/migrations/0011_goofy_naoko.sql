ALTER TABLE "authenticator" ALTER COLUMN "userId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "authenticator" ADD CONSTRAINT "authenticator_credentialID_unique" UNIQUE("credentialID");