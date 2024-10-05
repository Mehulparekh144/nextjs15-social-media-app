import { Metadata } from "next"
import Link from "next/link";
import LoginForm from "./LoginForm";


export const metadata : Metadata ={
  title: "Login",
}

export default function Login(){
  return (
    <main className="flex h-screen items-center justify-center p-5">
      <div className="flex h-full max-h-[40rem] justify-center items-center w-full max-w-[40rem] rounded-2xl overflow-hidden shadow-2xl">
        <div className="w-2/3">
          <div className="space-y-1 text-center p-4">
            <h1 className="text-3xl font-bold">Login</h1>
          </div>
          <LoginForm />
          <div className="mt-2">
            <Link href={"/signup"} className="block text-center hover:underline">
              Don't have an account ? Sign up{" "}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}