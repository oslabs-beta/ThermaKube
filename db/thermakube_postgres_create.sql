CREATE TABLE "users" (
	"id" serial NOT NULL UNIQUE,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL UNIQUE,
	"password" varchar(255) NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "aws_users" (
	"id" serial NOT NULL,
	"access_key_id" varchar(255) NOT NULL,
	"secret_access_key" varchar(255) NOT NULL,
	CONSTRAINT "aws_users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "alerts" (
	"id" serial NOT NULL,
	"pod_name" varchar(255) NOT NULL,
	"namespace" varchar(255) NOT NULL,
	"status" varchar(255) NOT NULL,
	"pod_ip" varchar(255),
	"timestamp" TIMESTAMP(255) NOT NULL,
	CONSTRAINT "alerts_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "users" ADD CONSTRAINT "users_fk0" FOREIGN KEY ("id") REFERENCES "alerts"("id");

ALTER TABLE "aws_users" ADD CONSTRAINT "aws_users_fk0" FOREIGN KEY ("id") REFERENCES "alerts"("id");

