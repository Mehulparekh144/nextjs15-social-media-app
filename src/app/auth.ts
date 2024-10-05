import { PrismaAdapter } from "@lucia-auth/adapter-prisma"
import prisma from "../lib/prisma"
import { Lucia, User, Session } from "lucia"
import { cache } from "react"
import { cookies } from "next/headers"

const adapter = new PrismaAdapter(prisma.session, prisma.user)


export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    }
  },
  getUserAttributes(databaseUserAttributes) {
    return {
      id: databaseUserAttributes.id,
      username: databaseUserAttributes.username,
      displayName: databaseUserAttributes.displayName,
      avatarUrl: databaseUserAttributes.avatarUrl,
      googleId: databaseUserAttributes
    }
  }
})

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia,
    DatabaseUserAttributes: DatabaseUserAttributes
  }
}

interface DatabaseUserAttributes {
  id: string,
  username: string,
  displayName: string,
  avatarUrl: string | null,
  googleId: string | null,
}

// Cache duplicates of the validateRequest function. It only fetches from the database once per request.
export const validateRequest = cache(
  async (): Promise<{ user: User, session: Session } | { user: null, session: null }> => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) {
      return { user: null, session: null }
    }

    const session = await lucia.validateSession(sessionId);

    try {
      if (session.session && session.session.fresh) {
        const sessionCookie = lucia.createSessionCookie(session.session.id);
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
      }

      if (!session.session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
      }
    } catch { }

    return session;
  }
)