import { NextRequest, NextResponse } from "next/server";

type LoginBody = {
  email: string;
  password: string;
};

export async function POST(request: NextRequest) {
  try {
    const body: LoginBody = await request.json();

    if (body.email == "" || body.password == "") {
      return NextResponse.json(
        {
          meta: {
            code: 400,
            message: "Validation failed",
          },
          error: "Email and Password are required!",
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
        data: {
          token: "this is token"
        },
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
