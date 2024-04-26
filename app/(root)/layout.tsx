import CreateAttendance from "@/components/shared/CreateAttendance";
import CreatePackage from "@/components/shared/CreatePackage";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { CheckUserType } from "@/lib/actions/user.actions";
import { getRole } from "@/lib/utils";
import { auth } from "@clerk/nextjs";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const role = getRole();
  return (
    <div className="flex h-screen flex-col">
      <Header userType={role} />
      <main className="flex-1">{children}</main>
      {role === "admin" ? (
        <>
          <div className="fixed right-4 bottom-3">
            <CreateAttendance />
          </div>

          <div className="fixed right-4 bottom-16">
            <CreatePackage />
          </div>
        </>
      ) : null}

      <Footer />
    </div>
  );
}
