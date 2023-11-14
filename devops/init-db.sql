CREATE TABLE "user" (
  id SERIAL PRIMARY KEY,  
  "nickName" VARCHAR(120),
  "city" VARCHAR(120),
  "gender" INTEGER CHECK( gender IN (0,1,2) ),  
  "avatarUrl" VARCHAR(500),
  "tosAcceptedByIp" VARCHAR(15),  
  "lastSeenAt" TIMESTAMP,
  "openid" TEXT, 
  "createdAt" TIMESTAMP WITH TIME ZONE,
  "updatedAt" TIMESTAMP WITH TIME ZONE
);

CREATE TABLE "upload" (
  id SERIAL PRIMARY KEY, 
  "url" TEXT NOT NULL,  
  "createdAt" TIMESTAMP WITH TIME ZONE,
  "updatedAt" TIMESTAMP WITH TIME ZONE
);

CREATE TABLE "group" (
  id SERIAL PRIMARY KEY, 
  "name" TEXT NOT NULL,
  "tags" TEXT NOT NULL,
  "location" TEXT,
  "images" TEXT,
  "contact" TEXT,
  "owner" INTEGER,
  "createdAt" TIMESTAMP WITH TIME ZONE,
  "updatedAt" TIMESTAMP WITH TIME ZONE,
  FOREIGN KEY ("owner") REFERENCES "user" ("id") ON DELETE SET NULL
);

CREATE TABLE "user_group" (
  "userId" INTEGER,
  "groupId" INTEGER,
  PRIMARY KEY ("userId", "groupId"),
  FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE,
  FOREIGN KEY ("groupId") REFERENCES "group" ("id") ON DELETE CASCADE
);
