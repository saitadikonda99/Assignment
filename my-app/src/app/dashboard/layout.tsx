import Navbar from "../components/layout/navbar/Navbar";
import "./Dashboard.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="DashboardLayout">
      <Navbar />
      <div className="DashboardLayout__content">{children}</div>
    </div>
  );
}
