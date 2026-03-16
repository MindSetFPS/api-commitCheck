CREATE TABLE "commit_analyses" (
	"id" serial PRIMARY KEY NOT NULL,
	"commit_hash" varchar(40) NOT NULL,
	"user_id" integer,
	"risk_score" integer DEFAULT 0,
	"lines_added" integer DEFAULT 0,
	"lines_deleted" integer DEFAULT 0,
	"files_modified" integer DEFAULT 0,
	"tests_modified" boolean DEFAULT false,
	"complex_sql_added" boolean DEFAULT false,
	"analysis_date" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar(50) NOT NULL,
	"email" varchar(100) NOT NULL,
	"password" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "commit_analyses" ADD CONSTRAINT "commit_analyses_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;