import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  cookies().delete("access");

  return NextResponse.json(
    {
      success: true,
    },
    {
      status: 200,
    }
  );
}
