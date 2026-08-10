# CORS Authentication Issue - Vercel + Render Setup

## Problem
Your frontend (Vercel) and backend (Render) are on **different domains**, which causes browsers to block HTTP-only cookies due to cross-origin security policies.

## Current Setup
- **Frontend**: Vercel (e.g., `your-app.vercel.app`)
- **Backend**: Render (e.g., `job-board-1-tx34.onrender.com`)
- **Issue**: Cookies with `credentials: "include"` don't work across different origins

## Solution: Configure Backend CORS Properly

### Backend (Express.js) Configuration Required:

```javascript
// In your backend server (app.js or server.js)
const cors = require('cors');

app.use(cors({
  origin: [
    'http://localhost:3000',           // Local development
    'https://your-app.vercel.app',     // Your Vercel deployment URL
    'https://your-custom-domain.com'   // If you have a custom domain
  ],
  credentials: true,                   // Allow cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Set-Cookie']
}));

// Cookie configuration for cross-origin
app.use(cookieParser());

// When setting cookies in your auth routes:
res.cookie('token', token, {
  httpOnly: true,
  secure: true,              // Required for HTTPS (production)
  sameSite: 'none',          // Required for cross-origin
  maxAge: 24 * 60 * 60 * 1000 // 1 day
});
```

### Important Notes:

1. **Replace Vercel URL**: Change `'https://your-app.vercel.app'` to your actual Vercel deployment URL
2. **HTTPS Required**: `secure: true` only works with HTTPS (both Vercel and Render use HTTPS)
3. **SameSite None**: Required for cross-origin cookie sharing
4. **Credentials True**: Must be enabled on both frontend and backend

### Alternative Solution: Use JWT in localStorage

If you can't configure backend CORS properly, use JWT tokens in localStorage instead:

**Backend Change:**
```javascript
// Return token in response body instead of cookie
res.json({
  success: true,
  token: token,  // Send token in response
  user: userData
});
```

**Frontend Change (authService.js):**
```javascript
export const loginUser = async (userData) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const result = await response.json();
  
  if (result.success && result.token) {
    // Store token in localStorage
    localStorage.setItem('token', result.token);
  }
  
  return result;
};

// For authenticated requests, include token in header
export async function getCurrentUser() {
  const token = localStorage.getItem('token');
  
  const response = await fetch(`${BASE_URL}/auth/me`, {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  const result = await response.json();
  return result.success ? result.user : null;
}
```

## Testing

1. Deploy backend changes to Render
2. Clear browser cookies and localStorage
3. Try signing up again
4. Check browser console for CORS errors
5. Check Network tab to see if cookies are being set

## Debugging

Check browser console for errors like:
- `Access to fetch has been blocked by CORS policy`
- `Cookie was blocked due to SameSite policy`
- `Cross-origin request blocked`

These indicate CORS configuration issues on the backend.
