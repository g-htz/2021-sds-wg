/*
 Navicat Premium Data Transfer

 Source Server         : 2021-WG-main
 Source Server Type    : PostgreSQL
 Source Server Version : 130002
 Source Host           : localhost:5432
 Source Catalog        : postgres
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 130002
 File Encoding         : 65001

 Date: 17/04/2021 12:31:02
*/


-- ----------------------------
-- Sequence structure for admin_user_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."admin_user_id_seq";
CREATE SEQUENCE "public"."admin_user_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for client_user_copy1_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."client_user_copy1_id_seq";
CREATE SEQUENCE "public"."client_user_copy1_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for client_user_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."client_user_id_seq";
CREATE SEQUENCE "public"."client_user_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Table structure for admin_user
-- ----------------------------
DROP TABLE IF EXISTS "public"."admin_user";
CREATE TABLE "public"."admin_user" (
  "id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
),
  "email" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "password" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "priorities" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "first_name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "last_name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL
)
;

-- ----------------------------
-- Records of admin_user
-- ----------------------------
INSERT INTO "public"."admin_user" OVERRIDING SYSTEM VALUE VALUES (1, 'admin@me.com', '123456', '1', 'admin', 'jack');

-- ----------------------------
-- Table structure for client_user
-- ----------------------------
DROP TABLE IF EXISTS "public"."client_user";
CREATE TABLE "public"."client_user" (
  "id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
),
  "first_name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "last_name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "custom_id" int4 NOT NULL,
  "email" varchar(255) COLLATE "pg_catalog"."default",
  "password" varchar(255) COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Records of client_user
-- ----------------------------

-- ----------------------------
-- Table structure for uts_staff_user
-- ----------------------------
DROP TABLE IF EXISTS "public"."uts_staff_user";
CREATE TABLE "public"."uts_staff_user" (
  "id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
),
  "first_name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "last_name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "custom_id" int4 NOT NULL,
  "email" varchar(255) COLLATE "pg_catalog"."default",
  "password" varchar(255) COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Records of uts_staff_user
-- ----------------------------

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."admin_user_id_seq"
OWNED BY "public"."admin_user"."id";
SELECT setval('"public"."admin_user_id_seq"', 2, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."client_user_copy1_id_seq"
OWNED BY "public"."uts_staff_user"."id";
SELECT setval('"public"."client_user_copy1_id_seq"', 4, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."client_user_id_seq"
OWNED BY "public"."client_user"."id";
SELECT setval('"public"."client_user_id_seq"', 5, true);

-- ----------------------------
-- Primary Key structure for table admin_user
-- ----------------------------
ALTER TABLE "public"."admin_user" ADD CONSTRAINT "admin_user_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table client_user
-- ----------------------------
ALTER TABLE "public"."client_user" ADD CONSTRAINT "client_user_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table uts_staff_user
-- ----------------------------
ALTER TABLE "public"."uts_staff_user" ADD CONSTRAINT "client_user_copy1_pkey" PRIMARY KEY ("id");
