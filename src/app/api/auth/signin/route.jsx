import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  const data = await req.json();

  const { username, password } = data;

  try {
    const response = await fetch(`${process.env.API_URL}/api/v1/token/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    const res = NextResponse.next();

    if (data.access) {
      cookies().set("access", data.access, {
        secure: true,
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 15,
        sameSite: "lax",
        path: "/",
      });
      // res.cookies.set("Set-Cookie", [
      //   cookie.serialize("access", data.access, {
      //     httpOnly: true,
      //     // secure: process.env.NODE_ENV !== "development",
      //     secure: true,
      //     maxAge: 60 * 60 * 24 * 15,
      //     sameSite: "Lax",
      //     path: "/",
      //   }),
      // ]);

      return NextResponse.json({
        success: true,
      });
    } else {
      throw new Error("Kullanıcı adı veya şifre yanlış.");
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Kullanıcı adı veya şifre yanlış.",
    });
  }
}
