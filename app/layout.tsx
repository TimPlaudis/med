export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily:
            "Inter, system-ui, -apple-system, Arial, sans-serif",
          background: "#f4f6f8",
          color: "#111",
        }}
      >
        {children}
      </body>
    </html>
  );
}
