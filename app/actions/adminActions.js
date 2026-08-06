"use server";

import {
  ADMIN_DASHBOARD_DATA,
  MANAGE_JOBS_DATA,
  MANAGE_APPLICATIONS_DATA,
  USERS_DATA,
  CATEGORIES_DATA,
  REPORTS_DATA,
  ADMIN_SETTINGS_DATA,
} from "../../data/adminData";

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
