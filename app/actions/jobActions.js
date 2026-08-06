import { JOBS_DATA } from '@/data/jobs';
import { JOB_DETAILS } from '@/data/jobDetails';
import { DASHBOARD_DATA, ALL_APPLICATIONS, PROFILE_DATA } from '@/data/dashboardData';

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// Helper: Create response
const createResponse = (success, data, error = null) => ({ success, data, error });

// Helper: Validate string
const isValid = (str) => typeof str === 'string' && str.trim().length > 0;

/**
 * Get all jobs
 */
export async function getJobsData() {
  try {
    return createResponse(true, JOBS_DATA, null);
  } catch (error) {
    console.error('getJobsData error:', error);
    return createResponse(false, null, 'Failed to fetch jobs');
  }
}

/**
 * Get filtered jobs
 */
export async function getFilteredJobs(filters = {}) {
  try {
    let jobs = [...JOBS_DATA];

    if (filters.location && filters.location !== 'All Locations') {
      jobs = jobs.filter(job => job.location?.includes(filters.location));
    }

    if (filters.category && filters.category !== 'All Categories') {
      jobs = jobs.filter(job => job.tags?.some(tag => tag.label === filters.category));
    }

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase().trim();
      jobs = jobs.filter(job => 
        job.title?.toLowerCase().includes(query) || 
        job.company?.toLowerCase().includes(query)
      );
    }

    return createResponse(true, jobs, null);
  } catch (error) {
    console.error('getFilteredJobs error:', error);
    return createResponse(false, null, 'Failed to filter jobs');
  }
}

/**
 * Get job by slug
 */
export async function getJobBySlug(slug) {
  try {
    if (!isValid(slug)) {
      return createResponse(false, null, 'Invalid slug');
    }

    const job = JOB_DETAILS[slug];
    
    if (!job) {
      return createResponse(false, null, 'Job not found');
    }

    return createResponse(true, job, null);
  } catch (error) {
    console.error('getJobBySlug error:', error);
    return createResponse(false, null, 'Failed to fetch job');
  }
}

/**
 * Future: Fetch from API
 * Uncomment when backend is ready
 */
// export async function getJobBySlugAPI(slug) {
//   try {
//     const response = await fetch(`${API_BASE_URL}/api/jobs/slug/${slug}`, {
//       cache: 'no-store'
//     });
//     
//     if (!response.ok) throw new Error('API request failed');
//     
//     const job = await response.json();
//     return createResponse(true, job, null);
//   } catch (error) {
//     console.error('API error, using fallback:', error);
//     return getJobBySlug(slug);
//   }
// }

/**
 * Get dashboard data
 */
export async function getDashboardData() {
  try {
    return createResponse(true, DASHBOARD_DATA, null);
  } catch (error) {
    console.error('getDashboardData error:', error);
    return createResponse(false, null, 'Failed to fetch dashboard data');
  }
}

/**
 * Get all applications
 */
export async function getAllApplications() {
  try {
    return createResponse(true, ALL_APPLICATIONS, null);
  } catch (error) {
    console.error('getAllApplications error:', error);
    return createResponse(false, null, 'Failed to fetch applications');
  }
}

/**
 * Get profile data
 */
export async function getProfileData() {
  try {
    return createResponse(true, PROFILE_DATA, null);
  } catch (error) {
    console.error('getProfileData error:', error);
    return createResponse(false, null, 'Failed to fetch profile data');
  }
}
