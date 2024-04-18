import CreateAttendance from "@/components/shared/CreateAttendance";
import CreatePackage from "@/components/shared/CreatePackage";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <div className="fixed right-4 bottom-3">
        <CreateAttendance />
      </div>
      <div className="fixed right-4 bottom-16">
        {/* <PackageForm users={users} /> */}
        <CreatePackage />
      </div>
      <Footer />
    </div>
  );
}
