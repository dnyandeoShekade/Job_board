"use server";

import {
  DASHBOARD_DATA,
  ALL_APPLICATIONS,
  PROFILE_DATA,
  RESUME_DATA,
  SAVED_JOBS_DATA,
  JOB_ALERTS_DATA,
  SETTINGS_DATA,
} from "../../data/dashboardData";

import {
  ADMIN_DASHBOARD_DATA,
  MANAGE_JOBS_DATA,
  MANAGE_APPLICATIONS_DATA,
  USERS_DATA,
  CATEGORIES_DATA,
  REPORTS_DATA,
  ADMIN_SETTINGS_DATA,
} from "../../data/adminData";

// Dashboard Actions
export async function getDashboardData() {
  return { success: true, data: DASHBOARD_DATA };
}

export async function getAllApplications() {
  return { success: true, data: ALL_APPLICATIONS };
}

export async function getProfileData() {
  return { success: true, data: PROFILE_DATA };
}

export async function getResumeData() {
  return { success: true, data: RESUME_DATA };
}

export async function getSavedJobsData() {
  return { success: true, data: SAVED_JOBS_DATA };
}

export async function getJobAlertsData() {
  return { success: true, data: JOB_ALERTS_DATA };
}

export async function getSettingsData() {
  return { success: true, data: SETTINGS_DATA };
}

// Admin Actions
export async function getAdminDashboardData() {
  return { success: true, data: ADMIN_DASHBOARD_DATA };
}

export async function getManageJobsData() {
  return { success: true, data: MANAGE_JOBS_DATA };
}

export async function getManageApplicationsData() {
  return { success: true, data: MANAGE_APPLICATIONS_DATA };
}

export async function getUsersData() {
  return { success: true, data: USERS_DATA };
}

export async function getCategoriesData() {
  return { success: true, data: CATEGORIES_DATA };
}

export async function getReportsData() {
  return { success: true, data: REPORTS_DATA };
}

export async function getAdminSettingsData() {
  return { success: true, data: ADMIN_SETTINGS_DATA };
}
