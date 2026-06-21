export const metadata = {
  title: "To-Do App",
  description: "A comprehensive to-do list application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
