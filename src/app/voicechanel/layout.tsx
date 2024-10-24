export default function VoiceLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <div
        className={`antialiased overflow-hidden`}
      >
          {children}
      </div>
    );
  }