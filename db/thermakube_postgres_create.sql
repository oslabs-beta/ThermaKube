CREATE TABLE "users" (
	"id" serial NOT NULL UNIQUE,
	"email" varchar(255) NOT NULL UNIQUE,
	"password" varchar(255) NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "aws_users" (
	"id" serial NOT NULL UNIQUE,
	"access_key_id" varchar(255) NOT NULL UNIQUE,
	"secret_access_key" varchar(255) NOT NULL,
	CONSTRAINT "aws_users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "alerts" (
	"id" serial NOT NULL UNIQUE,
	"user_id" integer NOT NULL,
	"pod_name" varchar(255) NOT NULL,
	"namespace" varchar(255) NOT NULL,
	"status" varchar(255) NOT NULL,
	"pod_ip" varchar(255),
	"timestamp" varchar(255) NOT NULL,
	CONSTRAINT "alerts_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "aws_alerts" (
	"id" serial NOT NULL UNIQUE,
	"user_id" integer NOT NULL,
	"pod_name" varchar(255) NOT NULL,
	"namespace" varchar(255) NOT NULL,
	"status" varchar(255) NOT NULL,
	"pod_ip" varchar(255),
	"timstamp" TIMESTAMP(255) NOT NULL,
	CONSTRAINT "aws_alerts_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);





ALTER TABLE "alerts" ADD CONSTRAINT "alerts_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE "aws_alerts" ADD CONSTRAINT "aws_alerts_fk0" FOREIGN KEY ("user_id") REFERENCES "aws_users"("id");
