import type { NextRequest } from "next/server";

import { and, asc, eq, ilike, like, schema, sql } from "@voiceai/db";

export default function GET(request: NextRequest) {
  const serachParams = request.nextUrl.searchParams;
  console.log(serachParams.get("id"));

  return new Response("Hello, world!");
}
