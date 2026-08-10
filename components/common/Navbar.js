"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, User, LogOut, ChevronDown } from "lucide-react";
import { logoutUser } from "@/services/logoutService";
import { getCurrentUser } from "@/services/authService";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);

  const router = useRouter();

useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await getCurrentUser();

        if (currentUser) {
          setIsAuthenticated(true);
          setUser(currentUser);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        console.error("AUTH CHECK ERROR:", error);
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    // Check on mount
    checkAuth();

    // Listen for auth changes
    const handleAuthChange = () => {
      checkAuth();
    };

    window.addEventListener("authChange", handleAuthChange);

    return () => {
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, []);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsAuthenticated(false);
      setUser(null);
      setIsOpen(false);
      setShowUserMenu(false);

      window.dispatchEvent(new Event("authChange"));

      router.push("/");
    }
  };

  const isAdmin = user?.role === "admin";

  // Get user initials for avatar
  const getUserInitials = () => {
    const name = user?.name || user?.fullName || "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="w-full bg-[#F2F5FF] border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-[#6366F1]">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-7 h-7"
          >
            <path d="M4 7c3-1.5 6-1.5 9 0s6 1.5 9 0" />
            <path d="M4 12h16" />
            <path d="M4 17c3 1.5 6 1.5 9 0s6-1.5 9 0" />
          </svg>

          <span className="text-xl font-bold whitespace-nowrap">
            JOB Portal
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:block">
          <ul className="flex items-center gap-8 text-sm font-semibold text-gray-700">
            <li>
              <Link href="/" className="hover:text-indigo-600 transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/job" className="hover:text-indigo-600 transition">
                Jobs
              </Link>
            </li>
           {isAuthenticated && (
              <li>
                <Link
                  href="/dashboard"
                  className="hover:text-indigo-600 transition"
                >
                  Dashboard
                </Link>
              </li>
            )}
              {/* ONLY ADMIN */}
            {isAdmin && (
              <li>
                <Link
                  href="/admin"
                  className="hover:text-indigo-600 transition"
                >
                  Admin
                </Link>
              </li>
            )}

          </ul>
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          {!loading && isAuthenticated ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-semibold text-xs">
                  {getUserInitials()}
                </div>
                <span className="max-w-[120px] truncate">
                  {user?.name || user?.fullName || "User"}
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    showUserMenu ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-200">
                    <p className="text-sm font-semibold text-gray-900">
                      {user?.name || user?.fullName}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user?.email}
                    </p>
                    {user?.role && (
                      <p className="text-xs text-indigo-600 font-medium mt-1 capitalize">
                        {user.role}
                      </p>
                    )}
                  </div>

                  <Link
                    href="/dashboard"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                  >
                    <User className="w-4 h-4" />
                    Dashboard
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : !loading ? (
            <>
              <Link
                href="/auth/login"
                className="px-5 py-2 text-sm font-medium text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition"
              >
                Login
              </Link>

              <Link
                href="/auth/signup"
                className="px-5 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
              >
                Sign Up
              </Link>
            </>
          ) : null}
        </div>

        {/* Mobile Menu Button */}
         <button
          className="lg:hidden p-2 rounded-md hover:bg-gray-200 transition"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        <div className="px-6 pb-6 border-t bg-[#F2F5FF]">
          <nav className="flex flex-col mt-4 space-y-4 font-medium text-gray-700">
            <Link href="/" onClick={() => setIsOpen(false)}>
              Home
            </Link>

            <Link href="/job" onClick={() => setIsOpen(false)}>
              Jobs
            </Link>

         
            {isAuthenticated && (
              <Link
                href="/dashboard"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
            )}


            {/* ONLY ADMIN */}
            {isAdmin && (
              <Link
                href="/admin"
                onClick={() => setIsOpen(false)}
              >
                Admin
              </Link>
            )}
          </nav>

          <div className="flex flex-col gap-3 mt-6">
            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  className="w-full py-2 border rounded-lg bg-white hover:bg-gray-100 text-center flex items-center justify-center gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  <User className="w-4 h-4" />
                  {user?.name || user?.fullName || "Dashboard"}
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 text-center flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="w-full py-2 border rounded-lg bg-white hover:bg-gray-100 text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>

                <Link
                  href="/auth/signup"
                  className="w-full py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}