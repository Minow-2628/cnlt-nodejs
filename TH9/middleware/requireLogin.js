module.exports = (req, res, next) => {
  if (req.session && req.session.loggedIn) {
    return next();
  }
  res.status(401).json({ message: 'Not logged in' });
};