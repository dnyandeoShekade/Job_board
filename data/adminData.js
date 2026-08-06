export const ADMIN_DASHBOARD_DATA = {
  stats: {
    totalJobs: 1247,
    activeJobs: 892,
    totalApplications: 8934,
    totalUsers: 12458,
    newUsers: 342,
    categories: 24,
  },
  recentApplications: [
    { id: 1, jobTitle: "Senior Frontend Developer", applicant: "John Doe", status: "pending", date: "2 hours ago" },
    { id: 2, jobTitle: "Product Manager", applicant: "Jane Smith", status: "approved", date: "5 hours ago" },
    { id: 3, jobTitle: "UX Designer", applicant: "Mike Johnson", status: "rejected", date: "1 day ago" },
  ],
};

export const MANAGE_JOBS_DATA = [
  { id: 1, title: "Senior Frontend Developer", company: "Tech Corp", status: "active", applications: 45, postedDate: "2024-01-15" },
  { id: 2, title: "Product Manager", company: "StartupXYZ", status: "active", applications: 32, postedDate: "2024-01-14" },
  { id: 3, title: "Backend Engineer", company: "CloudSoft", status: "closed", applications: 89, postedDate: "2024-01-10" },
];

export const MANAGE_APPLICATIONS_DATA = [
  { id: 1, jobTitle: "Senior Frontend Developer", applicant: "John Doe", email: "john@example.com", status: "pending", appliedDate: "2024-01-20" },
  { id: 2, jobTitle: "Product Manager", applicant: "Jane Smith", email: "jane@example.com", status: "approved", appliedDate: "2024-01-19" },
  { id: 3, jobTitle: "UX Designer", applicant: "Mike Johnson", email: "mike@example.com", status: "rejected", appliedDate: "2024-01-18" },
];

export const USERS_DATA = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "user", joinDate: "2023-12-01", status: "active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "user", joinDate: "2023-11-15", status: "active" },
  { id: 3, name: "Admin User", email: "admin@example.com", role: "admin", joinDate: "2023-01-01", status: "active" },
];

export const CATEGORIES_DATA = [
  { id: 1, name: "Technology", jobCount: 423, slug: "technology" },
  { id: 2, name: "Marketing", jobCount: 156, slug: "marketing" },
  { id: 3, name: "Design", jobCount: 234, slug: "design" },
  { id: 4, name: "Sales", jobCount: 189, slug: "sales" },
];

export const REPORTS_DATA = {
  monthlyStats: {
    jobsPosted: [45, 52, 48, 61, 55, 67],
    applications: [234, 267, 289, 312, 298, 356],
  },
  topCompanies: [
    { name: "Tech Corp", jobs: 45, applications: 892 },
    { name: "StartupXYZ", jobs: 32, applications: 654 },
    { name: "CloudSoft", jobs: 28, applications: 543 },
  ],
};

export const ADMIN_SETTINGS_DATA = {
  siteName: "Job Portal",
  contactEmail: "admin@jobportal.com",
  maintenanceMode: false,
  allowRegistration: true,
  emailNotifications: true,
};
