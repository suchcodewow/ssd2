import Sidebar from "@/components/sidebar";
// import { SideNav } from "@/components/hui";

export default async function Layout({ children }) {
  return (
    <div className="flex">
      <Sidebar nodeStart="_/docs/workshops/dynabank" />
      {children}
    </div>
  );
}
