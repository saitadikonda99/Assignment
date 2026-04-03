'use client';

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRole } from "../../../context/RoleContext";

import "./Navbar.css";

const Navbar = () => {
  const { role, setRole } = useRole();
  const pathname = usePathname();

  return (
    <div className="NavbarComponent">
      <div className="NavbarComponent__in">
        <div className="navbar__one">
          <Image src="/image.png" alt="logo" width={40} height={40} />
          <h1>Finance Dashboard</h1>
        </div>
        <div className="navbar__two">
          <Link
            href="/dashboard/home"
            className={pathname === "/dashboard/home" ? "navbar__link navbar__link--active" : "navbar__link"}
          >
            Home
          </Link>
          <Link
            href="/dashboard/insights"
            className={pathname === "/dashboard/insights" ? "navbar__link navbar__link--active" : "navbar__link"}
          >
            Insights
          </Link>
          <Link
            href="/dashboard/transactions"
            className={pathname === "/dashboard/transactions" ? "navbar__link navbar__link--active" : "navbar__link"}
          >
            Transactions
          </Link>
        </div>
        <div className="navbar__three">
          <select
            className="navbar__role-select"
            value={role}
            onChange={(e) => setRole(e.target.value as "Admin" | "User")}
          >
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
