import type { Metadata } from "next";
import ClientContainer from "src/components/Container";

export const metadata: Metadata = {
  title: "Task Calender",
  description: "Task Calender",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientContainer>{children}</ClientContainer>
      </body>
    </html>
  );
}
