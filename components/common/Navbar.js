"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

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
                href="/companies"
                className="hover:text-indigo-600 transition"
              >
                Companies
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-indigo-600 transition">
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-indigo-600 transition"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <Link href="/auth/login" className="px-5 py-2 text-sm font-medium text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition">
            Login
          </Link>

          <Link href="/auth/signup" className="px-5 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition">
            Sign Up
          </Link>
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
            <Link href="/auth/login" className="w-full py-2 border rounded-lg bg-white hover:bg-gray-100 text-center" onClick={() => setIsOpen(false)}>
              Login
            </Link>

            <Link href="/auth/signup" className="w-full py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 text-center" onClick={() => setIsOpen(false)}>
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
