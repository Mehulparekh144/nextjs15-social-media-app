"use client";

import { Session, User } from "lucia";
import React, { createContext, useContext } from "react";

interface SessionContext {
  user: User;
  session: Session;
}

const SessionContext = createContext<SessionContext | null>(null);

// The component returns encloses the children with the session
export default function SessionProvider({
  children,
  value,
}: React.PropsWithChildren<{ value: SessionContext }>) {
  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

// Hook that can be used to get current session
export function useSession(){
  const context = useContext(SessionContext);
  // If context is null, probably it ll be because it's not used within Session Provider
  if(!context) {
    throw new Error("useSession must be used within a Session Provider");
  }

  return context;
}
