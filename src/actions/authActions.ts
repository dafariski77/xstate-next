// "use server"

interface BaseApiResponse<T> {
  meta: {
    code: number;
    message: string;
  };
  data?: T;
  error?: unknown;
}

interface LoginResponse {
  token: string
}

export const loginUser = async (body: {
  email: string;
  password: string;
}): Promise<BaseApiResponse<LoginResponse>> => {
  try {
    const response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error);
    }

    return result;
  } catch (error) {
    throw error;
  }
};

interface IRegister {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const registerUser = async (body: IRegister) => {
  try {
    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error);
    }

    return result;
  } catch (error) {
    throw error;
  }
};
