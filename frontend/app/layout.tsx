import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "ClipForge - Gaming Shorts Generator",
  description: "Automated gaming highlight clipper for YouTube, Twitch, and esports creators",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
