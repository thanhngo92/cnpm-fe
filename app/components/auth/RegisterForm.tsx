import { FormEvent, useState } from "react";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { useRegister } from "../../hooks/useRegister";

const RegisterForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { isSubmitting, errorMessage, submitRegister } = useRegister();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await submitRegister({
      fullName,
      email,
      phoneNumber,
      password,
      confirmPassword,
    });
  };

  return (
    <section className="w-full">
      <Card className="mx-auto w-full max-w-md rounded-lg border border-slate-200/80 bg-white py-6 shadow-[0_20px_70px_rgba(15,23,42,0.1)] backdrop-blur">
        <CardContent className="px-6 sm:px-7">
          <div className="mb-5 text-center">
            <Link to="/glowup" className="inline-flex justify-center">
              <img src="/GlowUp.png" alt="GlowUp" className="h-12 w-auto" />
            </Link>

            <h2 className="mt-2.5 text-2xl font-semibold text-slate-900">
              Create your account
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Sign up to save orders and track your cart.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Input
                id="fullName"
                type="text"
                placeholder="Full Name"
                className="h-10 rounded-none border-pink-200/70 transition-colors focus-visible:border-pink-400 focus-visible:ring-pink-200/70"
                autoComplete="name"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Input
                id="register-email"
                type="email"
                placeholder="Email"
                className="h-10 rounded-none border-pink-200/70 transition-colors focus-visible:border-pink-400 focus-visible:ring-pink-200/70"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Input
                id="phone-number"
                type="tel"
                placeholder="Phone Number"
                className="h-10 rounded-none border-pink-200/70 transition-colors focus-visible:border-pink-400 focus-visible:ring-pink-200/70"
                autoComplete="tel"
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Input
                id="register-password"
                type="password"
                placeholder="Password"
                className="h-10 rounded-none border-pink-200/70 transition-colors focus-visible:border-pink-400 focus-visible:ring-pink-200/70"
                autoComplete="new-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Input
                id="confirm-password"
                type="password"
                placeholder="Confirm Password"
                className="h-10 rounded-none border-pink-200/70 transition-colors focus-visible:border-pink-400 focus-visible:ring-pink-200/70"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            </div>

            {errorMessage ? (
              <p className="text-sm text-red-600">{errorMessage}</p>
            ) : null}

            <Button
              type="submit"
              size="lg"
              className="h-10 w-full rounded-none bg-slate-900 text-white hover:bg-slate-800"
              disabled={isSubmitting}
            >
              <>
                {isSubmitting ? "Registering..." : "Register"}
                <ArrowRight className="h-4 w-4" />
              </>
            </Button>

            <p className="text-center text-sm text-slate-500">
              Already have an account?{" "}
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
    </section>
  );
};

export default RegisterForm;
