// app/(portal)/layout.jsx
// Separate layout for client portal (no sidebar)
export default function PortalLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif", background: "#f1f5f9" }}>
        {children}
      </body>
    </html>
  );
}