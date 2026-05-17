"use client";

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";

<<<<<<< HEAD
const convex = new ConvexReactClient(
  process.env.NEXT_PUBLIC_CONVEX_URL!
);

function ConvexClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      publishableKey={
        process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!
      }
    >
      <ConvexProviderWithClerk
        client={convex}
        useAuth={useAuth}
      >
=======
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

function ConvexClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
>>>>>>> d2efcd745807296654e57a365c594d0340d88886
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}

<<<<<<< HEAD
export default ConvexClientProvider;
=======
export default ConvexClientProvider;
>>>>>>> d2efcd745807296654e57a365c594d0340d88886
