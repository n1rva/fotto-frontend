import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req) {
  const cookieStore = cookies();

  const accessToken = cookieStore.get("access");

  if (!accessToken) {
    return NextResponse.json(
      {
        message: "Login first to load user",
      },
      { status: 401 }
    );
  }

  try {
    const response = await fetch(`${process.env.API_URL}/api/user/`, {
      headers: {
        Authorization: `Bearer ${accessToken.value}`,
      },
    });

    const data = await response.json();

    if (data) {
      return NextResponse.json(
        {
          user: data,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        error: "Something went wrong while retrieving user",
      },
      { status: error?.response.status }
    );
  }
}
