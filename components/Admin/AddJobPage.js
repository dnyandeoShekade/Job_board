"use client";

import { useState } from "react";
import {
  Briefcase,
  Building2,
  MapPin,
  DollarSign,
  FileText,
  ArrowRight,
  Tag,
} from "lucide-react";

export default function AddJobPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
const [logo, setLogo] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    category: "",
    description: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("company", formData.company);
      formDataToSend.append("location", formData.location);
      formDataToSend.append("salary", formData.salary);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("description", formData.description);
      
      if (logo) {
        formDataToSend.append("companyLogo", logo);
      }

      const response = await fetch("https://job-board-kup0.onrender.com/api/jobs", {
        method: "POST",
        credentials: "include",
        body: formDataToSend,
      });

      let result;
      try {
        result = await response.json();
      } catch (jsonError) {
        setMessage("Backend API error. Make sure the server is running at https://job-board-kup0.onrender.com/");
        return;
      }

      if (!response.ok) {
        setMessage(result.message || "Failed to create job");
        return;
      }

      setMessage("Job posted successfully!");

      setFormData({
        title: "",
        company: "",
        location: "",
        salary: "",
        category: "",
        description: "",
      });
      setLogo(null);
    } catch (error) {
      setMessage(error.message || "Failed to create job");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-xl font-bold text-slate-900">Add New Job</h1>
        <p className="text-sm text-slate-500 mt-1">
          Create and publish a new job opportunity to reach candidates.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm">
        {message && (
          <div
            className={`mb-3 text-sm font-medium ${
              message.includes("success")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Job Title */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                Job Title
              </label>

              <input
                type="text"
                name="title"
                placeholder="e.g. Senior Frontend Developer"
                value={formData.title}
                onChange={handleChange}
                className="w-full text-xs sm:text-sm text-slate-800 bg-slate-50/70 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                required
              />
            </div>

            {/* Company */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                Company Name
              </label>

              <input
                type="text"
                name="company"
                placeholder="e.g. Acme Corp"
                value={formData.company}
                onChange={handleChange}
                className="w-full text-xs sm:text-sm text-slate-800 bg-slate-50/70 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Location */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                Location
              </label>

              <input
                type="text"
                name="location"
                placeholder="e.g. Pune or Remote"
                value={formData.location}
                onChange={handleChange}
                className="w-full text-xs sm:text-sm text-slate-800 bg-slate-50/70 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                required
              />
            </div>

            {/* Salary */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                Salary Range
              </label>

              <input
                type="text"
                name="salary"
                placeholder="e.g. 8 - 12 LPA"
                value={formData.salary}
                onChange={handleChange}
                className="w-full text-xs sm:text-sm text-slate-800 bg-slate-50/70 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                required
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-slate-400" />
              Category
            </label>

            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g. Frontend Development"
              className="w-full text-xs sm:text-sm text-slate-800 bg-slate-50/70 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
              required
            />
          </div>

          {/* Company Logo */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Company Logo
            </label>
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={(e) => setLogo(e.target.files[0])}
              className="w-full text-xs sm:text-sm text-slate-600 bg-slate-50/70 border border-slate-200 rounded-lg px-3 py-2"
            />
            <p className="text-[11px] text-slate-400 mt-1">PNG, JPG or WebP</p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-slate-400" />
              Job Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write a detailed description of the role, requirements, and benefits..."
              className="w-full text-xs sm:text-sm text-slate-800 bg-slate-50/70 border border-slate-200 rounded-lg px-3 py-2.5 h-28 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition resize-none"
              required
            />
          </div>

          {/* Submit */}
          <div className="pt-2 flex items-center justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg text-xs font-bold transition shadow-sm shadow-indigo-100 flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
            >
              {loading ? "Publishing..." : "Post Job"}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}