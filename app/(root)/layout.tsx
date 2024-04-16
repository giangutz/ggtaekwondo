import AttendanceForm from "@/components/shared/AttendanceForm";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import PackageForm from "@/components/shared/PackageForm";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <div className="fixed right-8 bottom-4">
        <AttendanceForm />
      </div>
      <div className="fixed right-8 bottom-16">
        <PackageForm />
      </div>
      <Footer />
    </div>
  );
}
