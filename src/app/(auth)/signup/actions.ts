// Server actions for sign up
"use server"

import { lucia } from "@/app/auth";
import prisma from "@/lib/prisma";
import { signupSchema, SignupType } from "@/lib/validation";
import { hash } from "@node-rs/argon2"
import { generateIdFromEntropySize } from "lucia";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { isRedirectError } from "next/dist/client/components/redirect";

export async function signUp(
  credentials: SignupType
): Promise<{ error: string }> {
  try {

    const { username, email, password } = signupSchema.parse(credentials)

    const passwordHash = await hash(password, {
      memoryCost: 19456, // 128MB
      timeCost: 2, // 2 iterations
      outputLen: 32, // 32 bytes
      parallelism: 1, // 1 thread
    })

    const userId = generateIdFromEntropySize(10);
    const existingUsername = await prisma.user.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive", // Case insensitive
        }
      }
    })

    if (existingUsername) {
      return {
        error: "Username already exists. Please try another one."
      }
    }

    const existingEmail = await prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: "insensitive", // Case insensitive
        }
      }
    })

    if (existingEmail) {
      return {
        error: "Email already exists. Please try another one."
      }
    }

    await prisma.user.create({
      data: {
        id: userId,
        username,
        displayName: username,
        email,
        passwordHash

      }
    })

    const session = await lucia.createSession(userId, {})
    const sessionCookie = lucia.createSessionCookie(session.id)

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    )

    return redirect("/");

  } catch (error) {
    if (isRedirectError(error)) throw error // It's a bug as redirect error is not caught
    console.error(error)
    return {
      error: "Something went wrong. Please try again later."
    }
  }
}