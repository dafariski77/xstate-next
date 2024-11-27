"use client";

import React from "react";
import { useSelector } from "@xstate/react";
import { AuthContext } from "../layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const authActor = AuthContext.useActorRef();
  const { isLoading, ...registerData } = useSelector(
    authActor,
    (s) => s.context
  );

  const router = useRouter();

  return (
    <div className="flex h-screen justify-center items-center">
      <Card className="min-w-[450px]">
        <form
          onSubmit={(e) => {
            e.preventDefault();

            authActor.send({
              type: "REGISTER",
              callbacks: {
                onSuccess: () => {
                  toast.success("Login success");

                  return router.push("/login");
                },
                onError: (error) => {
                  toast.error((error as Error).message);

                  return;
                },
              },
            });
          }}
        >
          <CardHeader>
            <CardTitle>Register</CardTitle>
            <CardDescription>
              Already have account?{" "}
              <Link href={"/login"} className="font-bold">
                Sign In
              </Link>
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-y-6">
            <div className="flex flex-col gap-y-3">
              <Label htmlFor="fullname">Fulname</Label>
              <Input
                id="fullname"
                name="fullname"
                type="text"
                placeholder="Your Full Name"
                onChange={(e) =>
                  authActor.send({
                    type: "SET_USER_REGISTER",
                    value: {
                      ...registerData,
                      confirmPassword: registerData.confirmPassword,
                      fullname: e.target.value || "",
                    },
                  })
                }
              />
            </div>
            <div className="flex flex-col gap-y-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Your Email"
                onChange={(e) =>
                  authActor.send({
                    type: "SET_USER_REGISTER",
                    value: {
                      ...registerData,
                      confirmPassword: registerData.confirmPassword,
                      fullname: registerData.fullname,
                      email: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div className="flex flex-col gap-y-3">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Your Password"
                onChange={(e) =>
                  authActor.send({
                    type: "SET_USER_REGISTER",
                    value: {
                      ...registerData,
                      confirmPassword: registerData.confirmPassword,
                      fullname: registerData.fullname,
                      password: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div className="flex flex-col gap-y-3">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Your Confirm Password"
                onChange={(e) =>
                  authActor.send({
                    type: "SET_USER_REGISTER",
                    value: {
                      ...registerData,
                      fullname: registerData.fullname,
                      confirmPassword: e.target.value,
                    },
                  })
                }
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <span className="flex flex-row items-center gap-x-2">
                  <Loader2Icon className="animate-spin" /> Loading
                </span>
              ) : (
                "Register"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
