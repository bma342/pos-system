function tenantMiddleware(req, res, next) {
  if (req.user && req.user.clientId) {
    req.tenantFilter = { clientId: req.user.clientId };
  } else {
    return res.status(403).json({ message: 'Unauthorized' });
  }
  next();
}

module.exports = tenantMiddleware;
