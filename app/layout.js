import { ClerkProvider } from "@clerk/nextjs";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "AIMock - Revolutionize Your Interview Prep with AI",
  description:
    "Ace your interviews with AiMock's cutting-edge AI-driven mock interviews, tailored feedback, and personalized coaching, all at your fingertips.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={jakarta.className}>
          {children}
          <Toaster richColors/>
        </body>
      </html>
    </ClerkProvider>
  );
}
