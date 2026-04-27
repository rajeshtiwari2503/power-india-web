import Sidebar from "@/components/shared/Sidebar";
import Header from "@/components/shared/Header";
import SidebarWrapper from "@/components/shared/SidebarWapper";
// import { auth } from "@/auth";
// import { redirect } from "next/navigation";

// export default async function DashboardLayout({ children }) {
//   const session = await auth();
//   if (!session) redirect("/login");

//   return (
//     <div style={{ display: "flex" }}>
//       <Sidebar user={session.user} />
//       <div className="main-content" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
//         <Header user={session.user} />
//         <main style={{ padding: "24px", flex: 1 }}>
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }

export default async function DashboardLayout({ children }) {
  // const session = await auth();
  // if (!session) redirect("/login");
 
  return (
    // <div style={{ display: "flex" }}>
    //   <Sidebar user={session.user} />
    //   <div className="main-content" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
    //     <Header user={session.user} />
    //     <main style={{ padding: "24px", flex: 1 }}>
    //       {children}
    //     </main>
    //   </div>
    // </div>
   
    <div  >
      <SidebarWrapper>
      <div className="main-content  " style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Header />
          <main style={{ padding: "24px", flex: 1 }}>
 {children}
        </main>
      </div>
      </SidebarWrapper>
    </div>
  );
}
 