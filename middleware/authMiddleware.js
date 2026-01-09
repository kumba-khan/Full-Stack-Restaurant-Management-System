// Protect routes
export const authMiddleware = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/auth/register");
  }
  req.user = req.session.user;
  next();
};

// Error handler
export const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(err.statusCode || 500).render("error", {
    title: "Oops!",
    message: err.message || "Internal Server Error",
  });
};

export const roleMiddleware = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.redirect("/auth/register");
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).render("error", {
        title: "Admin use Only!",
        message: "You do not have permission to access this page",
      });
    }
    next();
  };
};
