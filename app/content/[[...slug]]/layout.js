import Sidebar from "@/components/sidebar";
// import { SideNav } from "@/components/hui";

export default async function Layout({ children }) {
  return (
    <div className="flex">
      <div className="py-6 px-5 border-r">
        <Sidebar />
      </div>
      <div className="py-6 px-8">{children}</div>
    </div>
  );
}
