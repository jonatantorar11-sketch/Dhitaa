import './globals.css';

export const metadata = {
  title: 'Happy Birthday, Dhita ♡',
  description: 'A birthday surprise made with love for Dhita.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
