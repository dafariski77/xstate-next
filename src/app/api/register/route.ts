import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (
      body.fullname == "" ||
      body.email === "" ||
      body.password === "" ||
      body.confirmPassword == ""
    ) {
      return NextResponse.json(
        {
          meta: {
            code: 400,
            message: "Invalid validation",
          },
          error: "You must fill all form field!",
        },
        {
          status: 400,
        }
      );
    }

    if (body.password !== body.confirmPassword) {
      return NextResponse.json(
        {
          meta: {
            code: 400,
            message: "Invalid password",
          },
          error: "Password does't match!",
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(
      {
        meta: {
          code: 200,
          message: "Success",
        },
        data: body,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        meta: {
          code: 500,
          message: "Internal server error",
        },
        error: "Something wrong, try again later",
      },
      {
        status: 500,
      }
    );
  }
}
