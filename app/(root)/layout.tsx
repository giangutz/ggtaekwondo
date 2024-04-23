import CreateAttendance from "@/components/shared/CreateAttendance";
import CreatePackage from "@/components/shared/CreatePackage";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { getUserType } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let userType = null;
  const { sessionClaims } = auth();

  if (sessionClaims) {
    const userId = sessionClaims?.userId as string;
    userType = await getUserType(userId);
  }
  // console.log(userType);
  return (
    <div className="flex h-screen flex-col">
      <Header userType={userType} />
      <main className="flex-1">{children}</main>
      {/* {userType === "Admin" ? ( */}
        <>
          <div className="fixed right-4 bottom-3">
            <CreateAttendance />
          </div>

          <div className="fixed right-4 bottom-16">
            {/* <PackageForm users={users} /> */}
            <CreatePackage />
          </div>
        </>
      {/* ) : null} */}
      <Footer />
    </div>
  );
}
