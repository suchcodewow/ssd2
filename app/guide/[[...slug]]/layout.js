import Sidebar from "@/components/sidebar";
// import { SideNav } from "@/components/hui";

export default async function Layout({ children }) {
  return (
    <div>
      <Sidebar nodeStart="_/docs" />
      {children}
    </div>
  );
}
