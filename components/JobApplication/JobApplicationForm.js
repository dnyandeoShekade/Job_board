// "use client";

// import { useState } from "react";
// import { Upload, Check, X } from "lucide-react";

// export default function JobApplicationForm({ applicationData }) {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     coverLetter: "",
//     resume: null,
//     agreedToTerms: false,
//   });

//   const [resumeFile, setResumeFile] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setResumeFile(file);
//       setFormData((prev) => ({ ...prev, resume: file }));
//     }
//   };

//   const removeFile = () => {
//     setResumeFile(null);
//     setFormData((prev) => ({ ...prev, resume: null }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     // Simulate API call
//     await new Promise((resolve) => setTimeout(resolve, 2000));

//     alert(applicationData.applicationSettings.successMessage);
//     setIsSubmitting(false);
//   };

//   const { applicationForm, applicationSettings } = applicationData;

//   return (
//     <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
//       <h2 className="text-2xl font-bold text-slate-900 mb-2">
//         Apply for this Job
//       </h2>
//       <p className="text-slate-500 text-sm mb-6">
//         Fill in the details below to submit your application for{" "}
//         {applicationData.title} position.
//       </p>

//       <form onSubmit={handleSubmit} className="space-y-5">
//         {/* Full Name */}
//         <div>
//           <label className="block text-sm font-medium text-slate-700 mb-2">
//             Full Name
//           </label>
//           <input
//             type="text"
//             name="fullName"
//             value={formData.fullName}
//             onChange={handleInputChange}
//             placeholder={applicationForm.fullNamePlaceholder}
//             required
//             className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition"
//           />
//         </div>

//         {/* Email */}
//         <div>
//           <label className="block text-sm font-medium text-slate-700 mb-2">
//             Email Address
//           </label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleInputChange}
//             placeholder={applicationForm.emailPlaceholder}
//             required
//             className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition"
//           />
//         </div>

//         {/* Phone */}
//         <div>
//           <label className="block text-sm font-medium text-slate-700 mb-2">
//             Phone Number
//           </label>
//           <input
//             type="tel"
//             name="phone"
//             value={formData.phone}
//             onChange={handleInputChange}
//             placeholder={applicationForm.phonePlaceholder}
//             required
//             className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition"
//           />
//         </div>

//         {/* Resume Upload */}
//         {applicationSettings.allowResumeUpload && (
//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-2">
//               Resume (PDF only)
//             </label>

//             {!resumeFile ? (
//               <label className="flex items-center justify-center w-full px-4 py-8 bg-slate-50 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:bg-slate-100 transition">
//                 <div className="text-center">
//                   <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
//                   <span className="text-sm text-slate-600">
//                     Click to upload resume
//                   </span>
//                   <span className="text-xs text-slate-400 block mt-1">
//                     PDF only, max {applicationForm.maxFileSize}
//                   </span>
//                 </div>
//                 <input
//                   type="file"
//                   accept={applicationForm.acceptedFileTypes}
//                   onChange={handleFileChange}
//                   className="hidden"
//                   required={applicationForm.resumeRequired}
//                 />
//               </label>
//             ) : (
//               <div className="flex items-center justify-between p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
//                     <Upload className="w-5 h-5 text-indigo-600" />
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-slate-900">
//                       {resumeFile.name}
//                     </p>
//                     <p className="text-xs text-slate-500">
//                       ({(resumeFile.size / 1024 / 1024).toFixed(2)} MB)
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Check className="w-5 h-5 text-emerald-600" />
//                   <button
//                     type="button"
//                     onClick={removeFile}
//                     className="px-3 py-1.5 text-xs font-medium text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-100 transition"
//                   >
//                     Change
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Cover Letter */}
//         {applicationSettings.allowCoverLetter && (
//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-2">
//               Cover Letter (Optional)
//             </label>
//             <textarea
//               name="coverLetter"
//               value={formData.coverLetter}
//               onChange={handleInputChange}
//               placeholder={applicationForm.coverLetterPlaceholder}
//               rows={6}
//               className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition resize-none"
//             />
//             <div className="text-xs text-slate-400 text-right mt-1">
//               {formData.coverLetter.length} / 500
//             </div>
//           </div>
//         )}

//         {/* Terms */}
//         {applicationSettings.termsRequired && (
//           <div className="flex items-start gap-2">
//             <input
//               type="checkbox"
//               name="agreedToTerms"
//               checked={formData.agreedToTerms}
//               onChange={handleInputChange}
//               required
//               className="mt-1 w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
//             />
//             <label className="text-sm text-slate-600">
//               I agree to the{" "}
//               <a href="#" className="text-indigo-600 hover:underline">
//                 Terms and Conditions
//               </a>
//             </label>
//           </div>
//         )}

//         {/* Submit Button */}
//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium py-3 rounded-xl transition shadow-sm shadow-indigo-500/20 text-sm"
//         >
//           {isSubmitting
//             ? applicationSettings.loadingText
//             : applicationSettings.submitButtonText}
//         </button>

//         <p className="text-center text-xs text-slate-500">
//           {applicationSettings.successMessage}
//         </p>
//       </form>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import { Upload, Check } from "lucide-react";
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
      setResumeFile(file);
      setFormData((prev) => ({ ...prev, resume: file }));
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

    try {
      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        coverLetter: formData.coverLetter,
        resume: resumeFile ? resumeFile.name : null,
        jobId: applicationData?.job?._id || applicationData?._id,
      };

      const response = await submitApplication(payload);

      if (response && response.success) {
        setMessage({
          type: "success",
          text: response.message || "Application submitted successfully!",
        });
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          coverLetter: "",
          resume: null,
          agreedToTerms: false,
        });
        setResumeFile(null);
      } else {
        setMessage({
          type: "error",
          text:
            response?.message ||
            "Failed to submit application. Please try again.",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error.message || "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
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
        {applicationData?.title || "this"} position.
      </p>

      {message.text && (
        <div
          className={`mb-4 p-4 rounded-lg text-sm font-medium ${
            message.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-rose-50 text-rose-800 border border-rose-200"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Full Name
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

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Email Address
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

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Phone Number
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

        {applicationSettings.allowResumeUpload && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Resume (PDF only)
            </label>

            {!resumeFile ? (
              <label className="flex items-center justify-center w-full px-4 py-8 bg-slate-50 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:bg-slate-100 transition">
                <div className="text-center">
                  <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <span className="text-sm text-slate-600">
                    Click to upload resume
                  </span>
                  <span className="text-xs text-slate-400 block mt-1">
                    PDF only, max {applicationForm.maxFileSize}
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
                      ({(resumeFile.size / 1024 / 1024).toFixed(2)} MB)
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
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition resize-none"
            />
            <div className="text-xs text-slate-400 text-right mt-1">
              {formData.coverLetter.length} / 500
            </div>
          </div>
        )}

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
              <a href="#" className="text-indigo-600 hover:underline">
                Terms and Conditions
              </a>
            </label>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium py-3 rounded-xl transition shadow-sm shadow-indigo-500/20 text-sm"
        >
          {isSubmitting
            ? applicationSettings.loadingText
            : applicationSettings.submitButtonText}
        </button>

        <p className="text-center text-xs text-slate-500">
          {applicationSettings.successMessage}
        </p>
      </form>
    </div>
  );
}
