import { NextResponse } from "next/server";

export async function POST(req) {
  const data = req.json();

  try {
    const response = await fetch(`${process.env.API_URL}/api/v1/webinar/new/`, {
      method: "POST",
      //   body: formData,
    });
    const data = await response.json();

    return NextResponse({ message: data.message, data: data.data });
  } catch (error) {
    return NextResponse({ message: "hata" });
  }
}
