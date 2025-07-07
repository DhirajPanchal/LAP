"use client";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import { store } from "@/lib/redux/store";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Toaster richColors position="top-right" />
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
