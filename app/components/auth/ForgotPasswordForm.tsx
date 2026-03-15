import { Link } from "react-router";

import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";

const ForgotPasswordForm = () => {
  return (
    <Card className="mx-auto w-full max-w-md rounded-lg border border-slate-200/80 bg-white py-6 shadow-[0_20px_70px_rgba(15,23,42,0.1)] backdrop-blur">
      <CardContent className="px-6 sm:px-7">
        <div className="mb-5 text-center">
          <Link to="/glowup" className="inline-flex justify-center">
            <img src="/GlowUp.png" alt="GlowUp" className="h-12 w-auto" />
          </Link>

          <h2 className="mt-2.5 text-2xl font-semibold text-slate-900">
            Forgot Password
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>
        </div>

        <form className="space-y-4">
          <div className="space-y-2">
            <Input
              id="forgot-email"
              type="email"
              placeholder="Email"
              className="h-10 rounded-none border-slate-200/80"
            />
          </div>

          <Button
            type="button"
            size="lg"
            className="h-10 w-full rounded-none bg-slate-900 text-white hover:bg-slate-800"
          >
            Send Reset Link
          </Button>

          <p className="text-center text-sm text-slate-500">
            Remember your password?{" "}
            <Link
              to="/glowup/login"
              className="font-semibold text-pink-600 transition-colors hover:text-pink-700"
            >
              Login
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default ForgotPasswordForm;
