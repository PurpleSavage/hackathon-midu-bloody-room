import Header from "@/features/landing/components/Header";
export default function AuthLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <div
        className={`antialiased overflow-hidden`}
      > 
          <Header/>
          {children}
      </div>
    );
  }