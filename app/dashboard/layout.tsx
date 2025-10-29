export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased font-lato">
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}