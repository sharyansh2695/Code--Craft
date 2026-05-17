<<<<<<< HEAD
import { clerkMiddleware } from '@clerk/nextjs/server';
=======
import { clerkMiddleware } from "@clerk/nextjs/server";
>>>>>>> d2efcd745807296654e57a365c594d0340d88886

export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
<<<<<<< HEAD
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};

//to handle authentication correctly
=======
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
>>>>>>> d2efcd745807296654e57a365c594d0340d88886
