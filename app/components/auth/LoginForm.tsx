import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";

const LoginForm = () => {
  return (
    <section className="w-full">
      <Card className="mx-auto w-full max-w-md rounded-lg border border-slate-200/80 bg-white py-6 shadow-[0_20px_70px_rgba(15,23,42,0.1)] backdrop-blur">
        <CardContent className="px-6 sm:px-7">
          <div className="mb-5 text-center">
            <Link to="/glowup" className="inline-flex justify-center">
              <img src="/GlowUp.png" alt="GlowUp" className="h-12 w-auto" />
            </Link>

            <h2 className="mt-2.5 text-2xl font-semibold text-slate-900">
              Login to your account
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Enter your email and password to continue shopping.
            </p>
          </div>

          <form className="space-y-4">
            <div className="space-y-2">
              <Input
                id="email"
                type="email"
                placeholder="Email"
                className="h-10 rounded-none border-slate-200/80"
                autoComplete="email"
              />
            </div>

            <div className="space-y-2">
              <Input
                id="password"
                type="password"
                placeholder="Password"
                className="h-10 rounded-none border-slate-200/80"
                autoComplete="current-password"
              />
              <div className="flex justify-end">
                <Link
                  to="/glowup/forgot-password"
                  className="text-sm font-medium text-pink-600 transition-colors hover:text-pink-700"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <Button
              type="button"
              size="lg"
              className="h-10 w-full rounded-none bg-slate-900 text-white hover:bg-slate-800"
            >
              <>
                Login
                <ArrowRight className="h-4 w-4" />
              </>
            </Button>

            <p className="text-center text-sm text-slate-500">
              Don't have an account?{" "}
              <Link
                to="/glowup/register"
                className="font-semibold text-pink-600 transition-colors hover:text-pink-700"
              >
                Register
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

export default LoginForm;
