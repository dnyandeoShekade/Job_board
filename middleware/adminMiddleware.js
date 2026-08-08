// const adminOnly = (req, res, next) => {
//   // temporary fake admin check
//   const userRole = req.headers.role;

//   // check admin If role is not admin:
//   // ❌ blocks request
// //   HTTP 403 means:
// // You are authenticated but not authorized.
//   if (userRole !== "admin") {
//     return res.status(403).json({
//       success: false,
//       message: "Access denied .admin only",
//     });
//   }

//   // contine
//   next();
// };
// module.exports = adminOnly;

// Admin Authorization Middleware
const adminOnly = (req, res, next) => {
  // Check if logged-in user is admin
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Admin only.",
    });
  }

  // Continue to next middleware
  next();
};

module.exports = adminOnly;
// Its purpose is to check whether the user is an admin before allowing access to certain routes.
