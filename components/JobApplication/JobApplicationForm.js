"use client";

import { useState } from "react";
import { Upload, Check, AlertCircle } from "lucide-react";
import { submitApplication } from "@/services/applicationService";
import { APPLICATION_FORM_CONFIG } from "@/data/applicationFormData";

export default function JobApplicationForm({ applicationData }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    coverLetter: "",
    resume: null,
    agreedToTerms: false,
  });

  const [resumeFile, setResumeFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = [".pdf", ".doc", ".docx"];
      const fileExtension = "." + file.name.split(".").pop().toLowerCase();
      
      if (!allowedTypes.includes(fileExtension)) {
        setMessage({
          type: "error",
          text: "Please upload a valid resume file (PDF, DOC, or DOCX)",
        });
        return;
      }

      // Validate file size (5MB max)
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (file.size > maxSize) {
        setMessage({
          type: "error",
          text: "File size must be less than 5MB",
        });
        return;
      }

      setResumeFile(file);
      setFormData((prev) => ({ ...prev, resume: file }));
      setMessage({ type: "", text: "" }); // Clear any previous errors
      console.log("✅ File selected:", file.name, "Size:", (file.size / 1024 / 1024).toFixed(2), "MB");
    }
  };

  const removeFile = () => {
    setResumeFile(null);
    setFormData((prev) => ({ ...prev, resume: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: "", text: "" });

    console.log("=== FORM SUBMISSION START ===");
    console.log("Form Data:", {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      coverLetterLength: formData.coverLetter?.length || 0,
      hasResume: !!resumeFile,
      resumeFileName: resumeFile?.name,
    });
    console.log("Application Data:", applicationData);

    try {
      // Extract jobId - handle both nested and direct structures
      const jobId = applicationData?.job?._id || applicationData?._id;
      
      console.log("Extracted jobId:", jobId);

      if (!jobId) {
        throw new Error("Job ID is missing. Cannot submit application.");
      }

      // Prepare payload
      const payload = {
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        coverLetter: formData.coverLetter.trim(),
        resumeFile: resumeFile, // Send the actual File object
        jobId: jobId,
      };

      console.log("Submitting payload with jobId:", payload.jobId);

      const response = await submitApplication(payload);

      console.log("Submission response:", response);

      if (response && response.success) {
        setMessage({
          type: "success",
          text: response.message || "Application submitted successfully!",
        });
        
        // Reset form on success
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          coverLetter: "",
          resume: null,
          agreedToTerms: false,
        });
        setResumeFile(null);
        
        console.log("✅ Form reset after successful submission");
      } else {
        setMessage({
          type: "error",
          text: response?.message || "Failed to submit application. Please try again.",
        });
        console.error("❌ Submission failed:", response);
      }
    } catch (error) {
      console.error("❌ Submission error:", error);
      setMessage({
        type: "error",
        text: error.message || "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
      console.log("=== FORM SUBMISSION END ===");
    }
  };

  const applicationForm =
    applicationData?.applicationForm || APPLICATION_FORM_CONFIG.applicationForm;

  const applicationSettings =
    applicationData?.applicationSettings ||
    APPLICATION_FORM_CONFIG.applicationSettings;

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-900 mb-2">
        Apply for this Job
      </h2>
      <p className="text-slate-500 text-sm mb-6">
        Fill in the details below to submit your application for{" "}
        <span className="font-semibold">{applicationData?.title || "this"}</span> position.
      </p>

      {/* Success/Error Message */}
      {message.text && (
        <div
          className={`mb-4 p-4 rounded-lg text-sm font-medium flex items-start gap-3 ${
            message.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-rose-50 text-rose-800 border border-rose-200"
          }`}
        >
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <span>{message.text}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder={applicationForm.fullNamePlaceholder}
            required
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition"
          />
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder={applicationForm.emailPlaceholder}
            required
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder={applicationForm.phonePlaceholder}
            required
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition"
          />
        </div>

        {/* Resume Upload */}
        {applicationSettings.allowResumeUpload && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Resume {applicationForm.resumeRequired && <span className="text-red-500">*</span>}
            </label>

            {!resumeFile ? (
              <label className="flex items-center justify-center w-full px-4 py-8 bg-slate-50 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:bg-slate-100 transition">
                <div className="text-center">
                  <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <span className="text-sm text-slate-600">
                    Click to upload resume
                  </span>
                  <span className="text-xs text-slate-400 block mt-1">
                    {applicationForm.acceptedFileTypes} | Max {applicationForm.maxFileSize}
                  </span>
                </div>
                <input
                  type="file"
                  accept={applicationForm.acceptedFileTypes}
                  onChange={handleFileChange}
                  className="hidden"
                  required={applicationForm.resumeRequired}
                />
              </label>
            ) : (
              <div className="flex items-center justify-between p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <Upload className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      {resumeFile.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-emerald-600" />
                  <button
                    type="button"
                    onClick={removeFile}
                    className="px-3 py-1.5 text-xs font-medium text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-100 transition"
                  >
                    Change
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Cover Letter */}
        {applicationSettings.allowCoverLetter && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Cover Letter (Optional)
            </label>
            <textarea
              name="coverLetter"
              value={formData.coverLetter}
              onChange={handleInputChange}
              placeholder={applicationForm.coverLetterPlaceholder}
              rows={6}
              maxLength={500}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition resize-none"
            />
            <div className="text-xs text-slate-400 text-right mt-1">
              {formData.coverLetter.length} / 500
            </div>
          </div>
        )}

        {/* Terms and Conditions */}
        {applicationSettings.termsRequired && (
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              name="agreedToTerms"
              checked={formData.agreedToTerms}
              onChange={handleInputChange}
              required
              className="mt-1 w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
            />
            <label className="text-sm text-slate-600">
              I agree to the{" "}
              <a href="/terms" target="_blank" className="text-indigo-600 hover:underline">
                Terms and Conditions
              </a>
            </label>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed text-white font-medium py-3 rounded-xl transition shadow-sm shadow-indigo-500/20 text-sm"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
              {applicationSettings.loadingText}
            </span>
          ) : (
            applicationSettings.submitButtonText
          )}
        </button>
      </form>
    </div>
  );
}
