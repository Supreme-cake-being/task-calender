import type { Metadata } from "next";
import StyledComponentsRegistry from "src/lib/registry";
import ClientContainer from "src/components/Container";
import "./globals.css";

export const metadata: Metadata = {
  title: "Task Calendar",
  description: "Task Calendar",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <ClientContainer>{children}</ClientContainer>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
