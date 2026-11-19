"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Menu,
  X,
  UserRound,
  LogOut,
  ChevronDown,
  BriefcaseBusiness,
  LayoutDashboard,
  ShieldCheck,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

import { logoutUser } from "@/services/logoutService";
import { getCurrentUser } from "@/services/authService";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Find Jobs", href: "/job" },
  { label: "AI Resume Analyzer", href: "/resume-analyzer" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const userMenuRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let mounted = true;

    const checkAuth = async () => {
      try {
        const currentUser = await getCurrentUser();

        if (!mounted) return;

        setUser(currentUser || null);
        setIsAuthenticated(Boolean(currentUser));
      } catch (error) {
        console.error("AUTH CHECK ERROR:", error);

        if (mounted) {
          setUser(null);
          setIsAuthenticated(false);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    const handleAuthChange = () => checkAuth();

    checkAuth();
    window.addEventListener("authChange", handleAuthChange);

    return () => {
      mounted = false;
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setShowUserMenu(false);
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setShowUserMenu(false);
  }, [pathname]);

  const isAdmin = user?.role === "admin";
  const userName = user?.name || user?.fullName || "User";

  const getUserInitials = () =>
    userName
      .trim()
      .split(/\s+/)
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U";

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname?.startsWith(`${href}/`);
  };

  const handleLogout = async () => {
    if (loggingOut) return;

    setLoggingOut(true);

    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsAuthenticated(false);
      setUser(null);
      setIsOpen(false);
      setShowUserMenu(false);
      setLoggingOut(false);

      window.dispatchEvent(new Event("authChange"));
      router.push("/");
    }
  };

  const navLinkClass = (href) =>
    `relative flex items-center gap-2 rounded-xl px-4 py-2.5
    text-[13px] font-semibold transition-all duration-200 ${
      isActive(href)
        ? "bg-indigo-50 text-indigo-700"
        : "text-slate-600 hover:bg-slate-50 hover:text-indigo-700"
    }`;

  const renderNavigation = (mobile = false) => (
    <>
      {navigation.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={() => mobile && setIsOpen(false)}
          aria-current={isActive(item.href) ? "page" : undefined}
          className={
            mobile
              ? `flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-semibold transition ${
                  isActive(item.href)
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-600 hover:bg-slate-50"
                }`
              : navLinkClass(item.href)
          }
        >
          {item.label}

          {mobile && isActive(item.href) && (
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
          )}
        </Link>
      ))}

      {isAuthenticated && (
        <Link
          href="/dashboard"
          onClick={() => mobile && setIsOpen(false)}
          aria-current={isActive("/dashboard") ? "page" : undefined}
          className={
            mobile
              ? `flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-semibold ${
                  isActive("/dashboard")
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-600 hover:bg-slate-50"
                }`
              : navLinkClass("/dashboard")
          }
        >
          Dashboard
          {mobile && isActive("/dashboard") && (
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
          )}
        </Link>
      )}

      {isAdmin && (
        <Link
          href="/admin"
          onClick={() => mobile && setIsOpen(false)}
          aria-current={isActive("/admin") ? "page" : undefined}
          className={
            mobile
              ? `flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-semibold ${
                  isActive("/admin")
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-600 hover:bg-slate-50"
                }`
              : navLinkClass("/admin")
          }
        >
          Admin
          {mobile && isActive("/admin") && (
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
          )}
        </Link>
      )}
    </>
  );

  const renderAuthButtons = (mobile = false) => (
    <>
      <Link
        href="/auth/login"
        onClick={() => mobile && setIsOpen(false)}
        className={`inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 ${
          mobile ? "w-full px-4 py-3" : "px-5 py-2.5"
        }`}
      >
        Log in
      </Link>

      <Link
        href="/auth/signup"
        onClick={() => mobile && setIsOpen(false)}
        className={`group inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 ${
          mobile ? "w-full px-4 py-3" : "px-5 py-2.5"
        }`}
      >
        Get started
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </Link>
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-3"
          aria-label="JobSphere home"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-md shadow-indigo-200 transition-transform duration-200 group-hover:scale-105">
            <BriefcaseBusiness className="h-5 w-5" strokeWidth={2.2} />
          </span>

          <span className="flex flex-col">
            <span className="text-[19px] font-extrabold leading-tight tracking-tight text-slate-900">
              Job<span className="text-indigo-600">Sphere</span>
            </span>
            <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
              Your next chapter
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-1 rounded-2xl bg-slate-50/80 p-1 lg:flex"
        >
          {renderNavigation()}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 lg:flex">
          {loading ? (
            <div className="h-10 w-32 animate-pulse rounded-xl bg-slate-100" />
          ) : isAuthenticated ? (
            <div className="relative" ref={userMenuRef}>
              <button
                type="button"
                onClick={() => setShowUserMenu((previous) => !previous)}
                aria-expanded={showUserMenu}
                aria-haspopup="menu"
                className={`flex items-center gap-3 rounded-2xl border p-1.5 pr-3 transition ${
                  showUserMenu
                    ? "border-indigo-200 bg-indigo-50/70"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-xs font-bold text-white">
                  {getUserInitials()}
                </span>

                <span className="max-w-[115px] truncate text-left text-sm font-semibold text-slate-800">
                  {userName}
                </span>

                <ChevronDown
                  className={`h-4 w-4 text-slate-400 transition-transform ${
                    showUserMenu ? "rotate-180" : ""
                  }`}
                />
              </button>

              {showUserMenu && (
                <div
                  role="menu"
                  className="absolute right-0 top-[calc(100%+12px)] w-72 origin-top-right rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-200/60 animate-in fade-in slide-in-from-top-2 duration-200"
                >
                  <div className="rounded-xl bg-slate-50 p-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-sm font-bold text-indigo-700">
                        {getUserInitials()}
                      </span>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-slate-900">
                          {userName}
                        </p>
                        <p className="truncate text-xs text-slate-500">
                          {user?.email || "Signed in"}
                        </p>
                      </div>
                    </div>

                    {user?.role && (
                      <span className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-white px-2.5 py-1 text-[11px] font-semibold capitalize text-indigo-700 ring-1 ring-slate-200">
                        {isAdmin && <ShieldCheck className="h-3.5 w-3.5" />}
                        {user.role} account
                      </span>
                    )}
                  </div>

                  <div className="my-2 h-px bg-slate-100" />

                  <Link
                    href="/dashboard"
                    role="menuitem"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-700"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    My dashboard
                    <ArrowUpRight className="ml-auto h-4 w-4 opacity-50" />
                  </Link>

                  {isAdmin && (
                    <Link
                      href="/admin"
                      role="menuitem"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-700"
                    >
                      <ShieldCheck className="h-4 w-4" />
                      Admin panel
                    </Link>
                  )}

                  <button
                    type="button"
                    role="menuitem"
                    disabled={loggingOut}
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-rose-600 transition hover:bg-rose-50 disabled:opacity-50"
                  >
                    <LogOut className="h-4 w-4" />
                    {loggingOut ? "Signing out..." : "Sign out"}
                  </button>
                </div>
              )}
            </div>
          ) : (
            renderAuthButtons()
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          type="button"
          onClick={() => setIsOpen((previous) => !previous)}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 lg:hidden"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-in-out lg:hidden ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="border-t border-slate-100 bg-white px-4 pb-5 pt-4 sm:px-6">
            <div className="mb-4 flex items-center gap-2 px-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <Sparkles className="h-4 w-4 text-indigo-500" />
              Navigation
            </div>

            <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
              {renderNavigation(true)}
            </nav>

            <div className="my-4 h-px bg-slate-100" />

            {loading ? (
              <div className="h-11 animate-pulse rounded-xl bg-slate-100" />
            ) : isAuthenticated ? (
              <div className="space-y-3">
                <Link
                  href="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 p-3"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-sm font-bold text-indigo-700">
                    {getUserInitials()}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-bold text-slate-800">
                      {userName}
                    </span>
                    <span className="block text-xs text-slate-500">
                      View your account
                    </span>
                  </span>
                  <UserRound className="h-4 w-4 text-slate-400" />
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-600 transition hover:bg-rose-100 disabled:opacity-50"
                >
                  <LogOut className="h-4 w-4" />
                  {loggingOut ? "Signing out..." : "Sign out"}
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {renderAuthButtons(true)}
              </div>
            )}

            <p className="mt-5 text-center text-xs text-slate-400">
              Find opportunities. Build your future.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
