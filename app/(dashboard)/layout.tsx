// import SidebarWrapper from "@/components/shared/SidebarWapper";
// import Header from "@/components/shared/Header";
// import { auth } from "@/lib/auth";
// import { redirect } from "next/navigation";

// interface DashboardLayoutProps {
//   children: React.ReactNode;
// }

// export default async function DashboardLayout({ children }: DashboardLayoutProps) {
//   const session = await auth();
//   if (!session) redirect("/login");

//   const user = session.user as any;

//   return (
//     <div className="min-h-screen flex bg-slate-50">
//       <SidebarWrapper user={user} />

//       {/* Main Content */}
//       <div className="flex flex-col flex-1">
//         <Header user={user} />

//         <main className="flex-1 p-6">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }


import SidebarWrapper from "@/components/shared/SidebarWapper";
import Header from "@/components/shared/Header";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const user = session.user as any;

  return (
   <div className="min-h-screen bg-slate-50">
  <SidebarWrapper user={user} />

  <div className="lg:ml-64">
    <main className="pt-20 px-4 sm:px-6">
      {children}
    </main>
  </div>
</div>
  );
}