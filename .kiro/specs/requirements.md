# Job Portal Authentication & Role-Based Access Control Specification

## Overview
This specification documents the authentication and authorization system for the Job Portal application. The system implements JWT-based authentication with three distinct user roles: user (candidate), recruiter, and admin.

## Project Context
- **Framework**: Next.js 14+ (App Router)
- **Authentication**: JWT Bearer tokens stored in localStorage
- **Language**: JavaScript (not TypeScript)
- **Styling**: Tailwind CSS
- **Backend**: External REST API at `http://localhost:5000/api`

## User Roles

### 1. User (Candidate)
- **Role Value**: `"user"` (lowercase)
- **Access**: 
  - Homepage
  - Job listings and search
  - Job details
  - Job application submission
  - User dashboard (view applications, saved jobs)

### 2. Recruiter
- **Role Value**: `"recruiter"` (lowercase)
- **Access**:
  - All User permissions
  - Admin Dashboard (`/admin`)
  - Add new job listings
  - Edit job listings
  - View and manage applications for their jobs

### 3. Admin
- **Role Value**: `"admin"` (lowercase)
- **Access**:
  - All Recruiter permissions
  - Admin Dashboard (`/admin`)
  - Manage all jobs (any company)
  - Manage all applications
  - User management

## Authentication Flow

### Registration (Sign Up)
1. User fills signup form with:
   - Full Name
   - Email Address
   - Password (min 8 chars, must include uppercase, lowercase, number, special char)
   - Role selection (user/recruiter/admin)

2. Frontend submits to `/auth/register` endpoint:
   ```javascript
   {
     name: string,
     email: string,
     password: string,
     role: "user" | "recruiter" | "admin"
   }
   ```

3. Backend response:
   ```javascript
   {
     success: boolean,
     token: string,  // JWT token
     user: {
       id: string,
       name: string,
       email: string,
       role: "user" | "recruiter" | "admin"
     }
   }
   ```

4. Frontend stores:
   - `localStorage.setItem('token', data.token)`
   - `localStorage.setItem('user', JSON.stringify(data.user))`

5. Trigger `authChange` event and redirect to homepage

### Login
1. User fills login form with:
   - Email Address
   - Password

2. Frontend submits to `/auth/login` endpoint:
   ```javascript
   {
     email: string,
     password: string
   }
   ```

3. Backend response (same structure as registration)

4. Frontend stores token and user data

5. Trigger `authChange` event and redirect to homepage

### Authentication Check
- **Endpoint**: `/auth/me`
- **Method**: GET
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
  ```javascript
  {
    success: boolean,
    user: {
      id: string,
      name: string,
      email: string,
      role: string
    }
  }
  ```

### Logout
1. Clear localStorage:
   - `localStorage.removeItem('token')`
   - `localStorage.removeItem('user')`

2. Trigger `authChange` event

3. Redirect to homepage

## Authorization Rules

### Navbar Display Logic
```javascript
const isAuthenticated = !!user;
const hasAdminAccess = user?.role === "admin" || user?.role === "recruiter";

// Show "Dashboard" link if authenticated
// Show "Admin" link if hasAdminAccess is true
```

### Route Protection

#### User Dashboard (`/dashboard`)
- **Allowed Roles**: user, recruiter, admin (any authenticated user)
- **Implementation**: Client-side auth check in `DashboardShellClient.js`
- **Redirect**: Unauthenticated → `/auth/login`

#### Admin Dashboard (`/admin`)
- **Allowed Roles**: recruiter, admin ONLY
- **Implementation**: Client-side auth check in `AdminShellClient.js`
- **Authorization Logic**:
  ```javascript
  const hasAdminAccess = user?.role === "admin" || user?.role === "recruiter";
  
  if (!hasAdminAccess) {
    router.push('/');
    return;
  }
  ```
- **Redirect**: 
  - Unauthenticated → `/auth/login`
  - Authenticated but wrong role → `/`

## Critical Implementation Requirements

### 1. Role Value Consistency
**CRITICAL**: All role values MUST be lowercase throughout the entire frontend:
- ✅ Correct: `"user"`, `"recruiter"`, `"admin"`
- ❌ Wrong: `"User"`, `"Recruiter"`, `"Admin"`, `"Candidate"`

### 2. JWT Token Usage
All protected API requests MUST include:
```javascript
headers: {
  "Authorization": `Bearer ${localStorage.getItem('token')}`,
  "Content-Type": "application/json"
}
```

**Never use**: `credentials: "include"` (no cookies)

### 3. Server vs Client Components
- **Server Components**: Routes (`page.js`, `layout.js`)
- **Client Components**: Data fetching wrappers with `"use client"`
  - `DashboardClient.js` - fetches user dashboard data
  - `DashboardShellClient.js` - auth check and layout
  - `AdminDashboardClient.js` - fetches admin data
  - `AdminShellClient.js` - admin auth check and layout

### 4. Auth State Management
- Use `authChange` event to sync auth state across components
- Navbar listens to `authChange` event to update user display
- Dispatch event after login, signup, and logout

### 5. Client-Side Only Operations
localStorage operations MUST be wrapped in client-side checks:
```javascript
if (typeof window !== 'undefined') {
  localStorage.getItem('token');
}
```

## User Stories & Acceptance Criteria

### US-1: User Registration
**As a** new user  
**I want to** create an account with a specific role  
**So that** I can access features appropriate to my role

**Acceptance Criteria**:
- [ ] Role selection buttons display: Candidate (user), Recruiter, Admin
- [ ] Clicking role button sets role state to lowercase value
- [ ] Form validation enforces password requirements
- [ ] Role value is sent correctly in registration request
- [ ] JWT token is stored in localStorage after successful registration
- [ ] User data including role is stored in localStorage
- [ ] User is redirected to homepage after registration
- [ ] Navbar updates to show authenticated state

### US-2: User Login
**As a** registered user  
**I want to** log in with my credentials  
**So that** I can access my account

**Acceptance Criteria**:
- [ ] Login form accepts email and password
- [ ] Credentials are sent to `/auth/login` endpoint
- [ ] JWT token is received and stored
- [ ] User data including role is stored
- [ ] User is redirected to homepage
- [ ] Navbar shows user dropdown with name and role

### US-3: Role-Based Navbar
**As a** logged-in user  
**I want to** see navigation options appropriate to my role  
**So that** I can quickly access my allowed features

**Acceptance Criteria**:
- [ ] All authenticated users see "Dashboard" link
- [ ] Only admin and recruiter see "Admin" link
- [ ] User dropdown shows name, email, role badge
- [ ] Dropdown includes Dashboard and Logout options
- [ ] Role check uses correct logic: `role === "admin" || role === "recruiter"`

### US-4: Admin Dashboard Access (Recruiter)
**As a** recruiter  
**I want to** access the admin dashboard  
**So that** I can manage job listings and applications

**Acceptance Criteria**:
- [ ] Recruiter role allows access to `/admin` route
- [ ] AdminShellClient checks: `user.role === "admin" || user.role === "recruiter"`
- [ ] Recruiter can view admin dashboard
- [ ] Recruiter can add new jobs
- [ ] Recruiter can edit jobs
- [ ] Recruiter can manage applications

### US-5: Admin Dashboard Access (Admin)
**As an** admin  
**I want to** access the admin dashboard  
**So that** I can manage the entire platform

**Acceptance Criteria**:
- [ ] Admin role allows access to `/admin` route
- [ ] Admin can perform all recruiter actions
- [ ] Admin can manage all users
- [ ] Admin can manage all jobs regardless of company

### US-6: User Dashboard Access
**As any** authenticated user  
**I want to** access my personal dashboard  
**So that** I can view my applications and saved jobs

**Acceptance Criteria**:
- [ ] User role can access `/dashboard`
- [ ] Recruiter role can access `/dashboard`
- [ ] Admin role can access `/dashboard`
- [ ] Unauthenticated users are redirected to login
- [ ] DashboardShellClient validates token via `/auth/me`

### US-7: Access Denial for Wrong Role
**As a** regular user (candidate)  
**I want to** be prevented from accessing admin features  
**So that** the platform remains secure

**Acceptance Criteria**:
- [ ] User role cannot see "Admin" link in navbar
- [ ] Direct navigation to `/admin` redirects user to homepage
- [ ] AdminShellClient blocks user role from accessing admin routes

### US-8: Logout
**As a** logged-in user  
**I want to** log out of my account  
**So that** my session is terminated

**Acceptance Criteria**:
- [ ] Logout button appears in user dropdown
- [ ] Clicking logout clears token from localStorage
- [ ] Clicking logout clears user data from localStorage
- [ ] authChange event is triggered
- [ ] User is redirected to homepage
- [ ] Navbar updates to show unauthenticated state

## Known Issues & Resolutions

### Issue 1: AdminShellClient Only Checking Admin Role
**Problem**: Original code only allowed `user.role === "admin"`  
**Fix**: Changed to `user.role === "admin" || user.role === "recruiter"`  
**File**: `components/Admin/AdminShellClient.js`

### Issue 2: Capitalized Role Values in Signup
**Problem**: SignupPage was using `"Candidate"` and `"Recruiter"` instead of lowercase  
**Fix**: Changed role setter to use `"user"` and `"recruiter"`  
**File**: `components/Auth/SignupPage.js`

### Issue 3: Navbar Not Checking Both Roles
**Problem**: Navbar only checked `user.role === "admin"` for admin link  
**Fix**: Added `hasAdminAccess` variable checking both roles  
**File**: `components/common/Navbar.js`

## Testing Checklist

### Manual Testing
- [ ] Register as user → Should NOT see Admin link
- [ ] Register as user → Can access /dashboard
- [ ] Register as user → Cannot access /admin (redirects to /)
- [ ] Register as recruiter → Should see Admin link
- [ ] Register as recruiter → Can access /dashboard
- [ ] Register as recruiter → Can access /admin
- [ ] Register as admin → Should see Admin link
- [ ] Register as admin → Can access /dashboard
- [ ] Register as admin → Can access /admin
- [ ] Login as each role → Verify same access patterns
- [ ] Logout → Token and user data cleared
- [ ] Logout → Navbar shows login/signup buttons
- [ ] Navigate to protected route while logged out → Redirects to login
- [ ] Check localStorage after signup → token and user exist
- [ ] Check localStorage after login → token and user exist
- [ ] Check localStorage after logout → token and user removed

### Console Log Verification
Add comprehensive logging to verify:
- [ ] Role value sent in signup/login request
- [ ] Role value received in response
- [ ] Role value stored in localStorage
- [ ] Role value retrieved in Navbar
- [ ] Role value checked in AdminShellClient
- [ ] Token presence in all protected requests

## File Structure

```
components/
├── Auth/
│   ├── LoginPage.js (client component)
│   └── SignupPage.js (client component)
├── common/
│   └── Navbar.js (client component)
├── Dashboard/
│   ├── DashboardClient.js (client component - data fetching)
│   └── DashboardShellClient.js (client component - auth + layout)
└── Admin/
    ├── AdminDashboardClient.js (client component - data fetching)
    └── AdminShellClient.js (client component - auth + layout)

services/
├── authService.js (login, register, getCurrentUser)
└── logoutService.js (logout logic)

app/
├── auth/
│   ├── login/page.js (server component)
│   └── signup/page.js (server component)
├── dashboard/
│   ├── page.js (server component)
│   └── layout.js (server component)
└── admin/
    ├── page.js (server component)
    └── layout.js (server component)
```

## Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Future Enhancements

1. **Token Refresh**: Implement automatic token refresh before expiration
2. **Remember Me**: Store refresh token for extended sessions
3. **OAuth Integration**: Implement Google OAuth login
4. **Password Reset**: Add forgot password flow
5. **Email Verification**: Require email verification after signup
6. **2FA**: Add two-factor authentication option
7. **Session Management**: Allow users to view and revoke active sessions
8. **Role-Based UI**: More granular feature toggling based on role
9. **Audit Logs**: Track admin/recruiter actions for security

## Security Considerations

1. **Token Storage**: Using localStorage (consider httpOnly cookies for production)
2. **Token Expiration**: Backend should enforce token expiration
3. **HTTPS Only**: Always use HTTPS in production
4. **Input Validation**: Frontend validates, backend must also validate
5. **XSS Protection**: Sanitize user inputs displayed in UI
6. **CSRF Protection**: JWT in localStorage provides some CSRF protection
7. **Rate Limiting**: Backend should implement rate limiting on auth endpoints

## Maintenance Notes

### When Adding New Protected Routes
1. Determine which roles should have access
2. Create client wrapper component with auth check
3. Use appropriate shell client (DashboardShellClient or AdminShellClient)
4. Add route link to Navbar with role check if needed

### When Modifying Role Logic
1. Search codebase for all role comparisons
2. Ensure consistent lowercase role values
3. Update AdminShellClient if changing access rules
4. Update Navbar role checks
5. Test all role combinations

### When Debugging Auth Issues
1. Check browser console for auth errors
2. Verify localStorage contains token and user
3. Check role value (must be lowercase)
4. Verify Authorization header in network tab
5. Check backend response for user role
6. Verify authChange event is firing
