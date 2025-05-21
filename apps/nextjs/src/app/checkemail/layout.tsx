export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="h-screen overflow-x-hidden md:h-[calc(100%-10px)]">
        {children}
      </body>
    </html>
  );
}
