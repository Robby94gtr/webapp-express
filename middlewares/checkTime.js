function checkTime(req, res, next) {
  const currentHour = new Date().getHours();
  if (currentHour >= 0 && currentHour < 23) {
    next(); // Proceed to the next middleware or route handler
  } else {
    res.status(403).json({
      status: 'fail',
      message: 'Access denied. The service is available only from 9 AM to 5 PM.',
    });
  }
}

module.exports = checkTime; // Export the middleware function for use in other files