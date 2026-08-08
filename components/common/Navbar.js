"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, User, LogOut } from "lucide-react";
import { logoutUser } from "@/services/logoutService";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Check authentication status
    const checkAuth = () => {
      const userData = localStorage.getItem("user");
      
      if (userData) {
        setIsAuthenticated(true);
        setUser(JSON.parse(userData));
      } else {
        setIsAuthenticated(false);
        setUser(null);
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

  const handleLogout = async () => {
    try {
      // Call backend to clear HTTP-only cookie
      await logoutUser();
      
      // Remove user data from localStorage
      localStorage.removeItem("user");
      
      // Update UI state
      setIsAuthenticated(false);
      setUser(null);
      setIsOpen(false);
      
      // Trigger auth change event
      window.dispatchEvent(new Event("authChange"));
      
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
      // Still clear local data even if backend call fails
      localStorage.removeItem("user");
      setIsAuthenticated(false);
      setUser(null);
      setIsOpen(false);
      router.push("/");
    }
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
            <li>
              <Link
                href="/dashboard"
                className="hover:text-indigo-600 transition"
              >
                dashboard
              </Link>
            </li>
           
           
           
          </ul>
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition"
              >
                <User className="w-4 h-4" />
                <span>{user?.name || user?.fullName || "Dashboard"}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </>
          ) : (
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
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 rounded-md hover:bg-gray-200 transition"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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

            <Link href="/companies" onClick={() => setIsOpen(false)}>
              Companies
            </Link>

            <Link href="/about" onClick={() => setIsOpen(false)}>
              About
            </Link>

            <Link href="/contact" onClick={() => setIsOpen(false)}>
              Contact
            </Link>
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
