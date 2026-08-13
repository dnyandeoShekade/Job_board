"use client";

import React, { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Search,
  MapPin,
  Briefcase,
  Bookmark,
  SlidersHorizontal,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
} from "lucide-react";

export default function JobSearchDashboard({ jobs, hero }) {
  const searchParams = useSearchParams();
  const [activePage, setActivePage] = useState(1);
  const [savedJobs, setSavedJobs] = useState([]);

  // Interactive Filter States
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [selectedLocations, setSelectedLocations] = useState({
    "All Locations": true,
  });
  const [selectedCategories, setSelectedCategories] = useState({
    "All Categories": true,
  });
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [sortBy, setSortBy] = useState("Newest First");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  // Handle URL query parameters for category filtering
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const keywordParam = searchParams.get('keyword');
    const locationParam = searchParams.get('location');
    
    if (categoryParam) {
      // Map full category names to filter names
      const categoryMap = {
        "Frontend Development": "Frontend",
        "Backend Development": "Backend",
        "Full Stack Development": "Full Stack",
        "DevOps": "DevOps",
        "UI/UX Design": "UI/UX",
        "Data Science": "Data Science",
      };
      
      const filterCategory = categoryMap[categoryParam] || categoryParam;
      setSelectedCategories({ [filterCategory]: true });
    }
    
    if (keywordParam) {
      setSearchKeyword(keywordParam);
    }
    
    if (locationParam) {
      setSearchLocation(locationParam);
    }
  }, [searchParams]);

  const toggleBookmark = (id) => {
    setSavedJobs((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleLocationCheckbox = (loc) => {
    if (loc === "All Locations") {
      setSelectedLocations({ "All Locations": true });
    } else {
      setSelectedLocations((prev) => {
        const updated = { ...prev, [loc]: !prev[loc] };
        delete updated["All Locations"];
        const anySelected = Object.values(updated).some(Boolean);
        if (!anySelected) return { "All Locations": true };
        return updated;
      });
    }
  };

  const handleCategoryCheckbox = (cat) => {
    if (cat === "All Categories") {
      setSelectedCategories({ "All Categories": true });
    } else {
      setSelectedCategories((prev) => {
        const updated = { ...prev, [cat]: !prev[cat] };
        delete updated["All Categories"];
        const anySelected = Object.values(updated).some(Boolean);
        if (!anySelected) return { "All Categories": true };
        return updated;
      });
    }
  };

  const clearAllFilters = () => {
    setSearchKeyword("");
    setSearchLocation("");
    setSelectedLocations({ "All Locations": true });
    setSelectedCategories({ "All Categories": true });
    setMinSalary("");
    setMaxSalary("");
  };

  // Filter and sort the dynamic job list
  const filteredJobs = jobs.filter((job) => {
    // Keyword filter
    if (searchKeyword.trim() !== "") {
      const query = searchKeyword.toLowerCase();
      const matchTitle = (job.title || "").toLowerCase().includes(query);
      const matchCompany = (job.company || "").toLowerCase().includes(query);
      if (!matchTitle && !matchCompany) return false;
    }

    // Top search bar location filter
    if (searchLocation.trim() !== "") {
      if (!job.location.toLowerCase().includes(searchLocation.toLowerCase())) {
        return false;
      }
    }

    // Sidebar Location Filter
    if (!selectedLocations["All Locations"]) {
      const activeLocs = Object.keys(selectedLocations).filter(
        (k) => selectedLocations[k],
      );
      if (activeLocs.length > 0) {
        const matchLoc = activeLocs.some((loc) =>
          job.location.toLowerCase().includes(loc.toLowerCase()),
        );
        if (!matchLoc) return false;
      }
    }

    // Sidebar Category Filter
    if (!selectedCategories["All Categories"]) {
      const activeCats = Object.keys(selectedCategories).filter(
        (k) => selectedCategories[k],
      );
      if (activeCats.length > 0) {
        const matchCat = activeCats.some(
          (c) => job.category.toLowerCase() === c.toLowerCase(),
        );

        if (!matchCat) return false;
      }
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-16">
      {/* Top Header / Hero Section */}
      <div className="bg-white border-b border-slate-200 pt-4 pb-4 px-4 sm:px-8 lg:px-16">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{hero.title}</h1>
            <p className="text-slate-500 text-sm">{hero.description}</p>
          </div>
          {hero.stats && (
            <div className="hidden lg:flex items-center gap-2 bg-indigo-50/50 px-3 py-2 rounded-xl border border-indigo-100/50">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm">
                👤
              </div>
              <div className="text-xs text-indigo-900 font-medium">
                <span>
                  Over {hero.stats.count} {hero.stats.label}
                </span>
                <div className="text-slate-500 font-normal">
                  {hero.stats.sublabel}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Search Bar Container */}
        <div className="max-w-5xl mx-auto mt-3 bg-white rounded-xl shadow-sm border border-slate-200 p-1.5 grid grid-cols-1 md:grid-cols-12 gap-1.5">
          <div className="md:col-span-5 flex items-center px-2.5 py-1.5 bg-slate-50 rounded-lg border border-transparent focus-within:border-blue-500 focus-within:bg-white transition">
            <Search className="w-4 h-4 text-slate-400 mr-1.5 shrink-0" />
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="Search jobs by title, keyword..."
              className="w-full bg-transparent border-none outline-none text-sm text-slate-700 placeholder-slate-400"
            />
          </div>

          <div className="md:col-span-3 flex items-center px-2.5 py-1.5 bg-slate-50 rounded-lg border border-transparent focus-within:border-blue-500 focus-within:bg-white transition">
            <MapPin className="w-4 h-4 text-slate-400 mr-1.5 shrink-0" />
            <input
              type="text"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              placeholder="Location"
              className="w-full bg-transparent border-none outline-none text-sm text-slate-700 placeholder-slate-400"
            />
          </div>

          <div
            className="md:col-span-2 relative flex items-center px-2.5 py-1.5 bg-slate-50 rounded-lg border border-transparent hover:border-slate-200 transition cursor-pointer justify-between"
            onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
          >
            <div className="flex items-center text-slate-500 text-sm truncate">
              <Briefcase className="w-4 h-4 text-slate-400 mr-1.5 shrink-0" />
              <span className="truncate">
                {selectedCategories["All Categories"]
                  ? "Category"
                  : Object.keys(selectedCategories)
                      .filter((k) => selectedCategories[k])
                      .join(", ")}
              </span>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />

            {isCategoryDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white border border-slate-200 rounded-lg shadow-lg z-20 p-2 space-y-1">
                {[
                  "All Categories",
                  "Frontend",
                  "Backend",
                  "Full Stack",
                  "DevOps",
                  "UI/UX",
                  "Data Science",
                ].map((cat) => (
                  <div
                    key={cat}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCategoryCheckbox(cat);
                      setIsCategoryDropdownOpen(false);
                    }}
                    className="text-xs text-slate-700 hover:bg-slate-100 p-1.5 rounded cursor-pointer"
                  >
                    {cat}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition flex items-center justify-center gap-1.5 shadow-sm shadow-blue-500/20">
            <Search className="w-4 h-4" />
            <span>Search</span>
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-3 bg-white p-6 rounded-2xl border border-slate-200 h-fit space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2 font-semibold text-slate-900">
              <SlidersHorizontal className="w-4 h-4 text-blue-600" />
              <span>Filters</span>
            </div>
            <button
              onClick={clearAllFilters}
              className="text-xs text-blue-600 hover:underline font-medium"
            >
              Clear All
            </button>
          </div>

          {/* Location Filter */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm font-semibold text-slate-800">
              <span>Location</span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </div>
            <div className="space-y-2 text-sm text-slate-600">
              {[
                "All Locations",
                "Remote",
                "Bangalore",
                "Delhi",
                "Mumbai",
                "Pune",
              ].map((loc) => (
                <label
                  key={loc}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={!!selectedLocations[loc]}
                    onChange={() => handleLocationCheckbox(loc)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                  />
                  <span>{loc}</span>
                </label>
              ))}
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Category Filter */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm font-semibold text-slate-800">
              <span>Category</span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </div>
            <div className="space-y-2 text-sm text-slate-600">
              {[
                "All Categories",
                "Frontend",
                "Backend",
                "Full Stack",
                "DevOps",
                "UI/UX",
                "Data Science",
              ].map((cat) => (
                <label
                  key={cat}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={!!selectedCategories[cat]}
                    onChange={() => handleCategoryCheckbox(cat)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Salary Range Filter */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm font-semibold text-slate-800">
              <span>Salary Range</span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={minSalary}
                onChange={(e) => setMinSalary(e.target.value)}
                placeholder="Min Salary"
                className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-700 outline-none focus:border-blue-500"
              />
              <input
                type="text"
                value={maxSalary}
                onChange={(e) => setMaxSalary(e.target.value)}
                placeholder="Max Salary"
                className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-700 outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <button
            onClick={() => {}}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-xl text-sm transition shadow-sm"
          >
            Apply Filters
          </button>
        </div>

        {/* Job Listings Column */}
        <div className="lg:col-span-9 space-y-4">
          <div className="flex items-center justify-between px-1">
            <span className="text-sm text-slate-500 font-medium">
              Showing {filteredJobs.length} jobs
            </span>
            <div className="flex items-center gap-2 text-sm relative">
              <span className="text-slate-500">Sort By:</span>
              <div
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex items-center gap-1 bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-slate-700 font-medium cursor-pointer shadow-sm"
              >
                <span>{sortBy}</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </div>

              {isSortOpen && (
                <div className="absolute right-0 top-full mt-1 w-40 bg-white border border-slate-200 rounded-lg shadow-lg z-20 py-1">
                  {["Newest First", "Salary: High to Low", "A-Z"].map(
                    (option) => (
                      <div
                        key={option}
                        onClick={() => {
                          setSortBy(option);
                          setIsSortOpen(false);
                        }}
                        className="px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-100 cursor-pointer"
                      >
                        {option}
                      </div>
                    ),
                  )}
                </div>
              )}
            </div>
          </div>

          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => {
              const isBookmarked = savedJobs.includes(job._id);
              return (
                <Link
                  key={job._id}
                  href={`/job/${job.slug}`}
                  className="block bg-white p-5 rounded-2xl border border-slate-200 hover:shadow-md transition"
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-lg font-bold text-slate-700 shrink-0 overflow-hidden">
                        {(job.logo || job.companyLogo || job.logoUrl) ? (
                          <img 
                            src={job.logo || job.companyLogo || job.logoUrl} 
                            alt={`${job.company} logo`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.parentElement.innerHTML = `<span>${job.company?.charAt(0) || "J"}</span>`;
                            }}
                          />
                        ) : (
                          <span>{job.company?.charAt(0) || "J"}</span>
                        )}
                      </div>
                      <div>
                        <h2 className="font-bold text-slate-900 text-base hover:text-blue-600 transition">
                          {job.title}
                        </h2>
                        <p className="text-slate-500 text-sm">{job.company}</p>

                        <div className="flex flex-wrap items-center gap-2 mt-3">
                          <div className="flex gap-2 mt-3">
                            <span className="px-2 py-1 rounded bg-green-100 text-green-700 text-xs">
                              {job.jobType}
                            </span>

                            <span className="px-2 py-1 rounded bg-purple-100 text-purple-700 text-xs">
                              {job.category}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto border-t md:border-t-0 pt-3 md:pt-0 border-slate-100 gap-2">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          toggleBookmark(job._id);
                        }}
                        className="text-slate-400 hover:text-blue-600 transition hidden md:block"
                      >
                        <Bookmark
                          className={`w-5 h-5 ${isBookmarked ? "fill-blue-600 text-blue-600" : ""}`}
                        />
                      </button>
                      <div className="flex flex-col md:items-end gap-1 text-sm text-slate-500">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1 font-medium text-slate-700">
                          <span>{job.salary}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-slate-400">
                          <Clock className="w-3 h-3" />
                          <span>
                            <span>
                              {job.createdAt
                                ? formatDistanceToNow(new Date(job.createdAt), {
                                    addSuffix: true,
                                  })
                                : "Recently Posted"}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center flex flex-col items-center justify-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-base">
                  No jobs found
                </h3>
                <p className="text-slate-500 text-sm mt-1">
                  Try adjusting your search or filter to find what you're
                  looking for.
                </p>
              </div>
              <button
                onClick={clearAllFilters}
                className="mt-2 px-4 py-2 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-semibold text-slate-700 transition"
              >
                Clear Filters
              </button>
            </div>
          )}

          <div className="flex items-center justify-center gap-1 pt-6">
            <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 transition">
              <ChevronLeft className="w-4 h-4" />
            </button>
            {[1, 2, 3, 4, 5].map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setActivePage(pageNum)}
                className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition ${
                  activePage === pageNum
                    ? "bg-blue-600 text-white shadow-sm shadow-blue-500/20"
                    : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                {pageNum}
              </button>
            ))}
            <span className="text-slate-400 px-1">...</span>
            <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 text-sm font-medium hover:bg-slate-50 transition">
              13
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 transition">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
