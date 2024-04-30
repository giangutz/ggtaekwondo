import CreateAttendance from "@/components/shared/CreateAttendance";
import CreatePackage from "@/components/shared/CreatePackage";
import CreateTransactions from "@/components/shared/CreateTransactions";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import HoverLabelComponent from "@/components/shared/HoverLabelComponent";
import { getUserMetadata } from "@/lib/utils";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = getUserMetadata();
  console.log(user);
  return (
    <div className="flex h-screen flex-col">
      <Header userType={user?.role} />
      <main className="flex-1">{children}</main>
      {user?.role === "admin" ? (
        <>
          <div className="fixed right-4 bottom-4">
            <HoverLabelComponent label="Make Attendance" tooltipLeft="-left-36">
              <CreateAttendance />
            </HoverLabelComponent>
          </div>

          <div className="fixed right-4 bottom-16">
            <HoverLabelComponent label="Create Package" tooltipLeft="-left-32">
              <CreatePackage />
            </HoverLabelComponent>
          </div>

          <div className="fixed right-4 bottom-28">
            <HoverLabelComponent label="Transactions" tooltipLeft="-left-28">
              <CreateTransactions createdBy={user?.userId} />
            </HoverLabelComponent>
          </div>
        </>
      ) : null}

      <Footer />
    </div>
  );
}
