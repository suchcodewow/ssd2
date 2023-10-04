import Sidebar from "@/components/sidebar";
// import { SideNav } from "@/components/hui";

export default async function Layout({ children }) {
  return (
    <div className="flex">
      <Sidebar nodeStart="/content" />
      {children}
    </div>
  );
}
