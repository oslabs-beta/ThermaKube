CREATE TABLE "users" (
    "_id" serial NOT NULL,
    "name" varchar(255) NOT NULL,
    "email" varchar(255) UNIQUE NOT NULL,
    "password" varchar(255) NOT NULL
);

CREATE TABLE "aws_users" (
    "_id" serial NOT NULL,
    "access_key_id" varchar(255) NOT NULL,
    "secret_access_key" varchar(255) NOT NULL
);

CREATE TABLE "alerts" (
    "_id" serial NOT NULL,
    "pod_name" varchar(255) NOT NULL,
    "namespace" varchar(255) NOT NULL,
    "status" varchar(255) NOT NULL,
    "pod_ip" varchar(255),
    "timestamp" TIMESTAMP NOT NULL
);