import { Metadata } from "next";
import Link from "next/link";
import SignupForm from "./SignupForm";

export const metadata: Metadata = {
  title: "Signup",
};

export default function Signup() {
  return (
    <main className="flex h-screen items-center justify-center p-5">
      <div className="flex h-full max-h-[40rem] justify-center items-center w-full max-w-[40rem] rounded-2xl overflow-hidden shadow-2xl">
        <div>
          <div className="space-y-1 text-center p-4">
            <h1 className="text-3xl font-bold">Sign up</h1>
            <p className="text-muted-foreground">
              A place to share knowledge and better understand the world
            </p>
          </div>
          <SignupForm />
          <div className="mt-2">
            <Link href={"/login"} className="block text-center hover:underline">
              Already have an account ? Log in{" "}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
