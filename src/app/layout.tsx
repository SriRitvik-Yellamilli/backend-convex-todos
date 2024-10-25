import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Todos AI!",
  description: "Boost your productivity with Todos AI! Stay organized, track your tasks, and accomplish more with our intuitive and user-friendly app. Whether you're managing daily chores or long-term projects, Todos AI empowers you to prioritize, plan, and execute with ease. Unlock your full potential today and take control of your to-do list!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
        {children}
        </Providers>
      </body>
    </html>
  );
}