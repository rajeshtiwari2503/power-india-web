 import SidebarWrapper from "@/components/shared/SidebarWapper";
import Header from "@/components/shared/Header";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen flex bg-slate-50">
      <SidebarWrapper />

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        <Header />

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}