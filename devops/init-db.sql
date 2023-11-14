DROP TABLE IF EXISTS "user_group";
DROP TABLE IF EXISTS "group";
DROP TABLE IF EXISTS "upload";
DROP TABLE IF EXISTS "user";

CREATE TABLE "user" (
  id SERIAL PRIMARY KEY,  
  "nickName" VARCHAR(120),
  "city" VARCHAR(120),
  "gender" INTEGER CHECK( gender IN (0,1,2) ),  
  "avatarUrl" VARCHAR(500),
  "tosAcceptedByIp" VARCHAR(15),  
  "lastSeenAt" BIGINT,
  "openid" TEXT, 
  "createdAt" BIGINT,
  "updatedAt" BIGINT
);

CREATE TABLE "upload" (
  id SERIAL PRIMARY KEY, 
  "url" TEXT NOT NULL,  
  "createdAt" BIGINT,
  "updatedAt" BIGINT
);

CREATE TABLE "group" (
  id SERIAL PRIMARY KEY, 
  "name" TEXT NOT NULL,
  "tags" TEXT NOT NULL,
  "location" TEXT,
  "images" TEXT,
  "contact" TEXT,
  "owner" INTEGER,
  "createdAt" BIGINT,
  "updatedAt" BIGINT,
  FOREIGN KEY ("owner") REFERENCES "user" ("id") ON DELETE SET NULL
);

CREATE TABLE "user_group" (
  "userId" INTEGER,
  "groupId" INTEGER,
  PRIMARY KEY ("userId", "groupId"),
  FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE,
  FOREIGN KEY ("groupId") REFERENCES "group" ("id") ON DELETE CASCADE
);
