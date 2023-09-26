import Sidebar from "@/components/sidebar";

export default async function Layout({ children }) {
  return (
    <div>
      <Sidebar />
      {children}
    </div>
  );
}
