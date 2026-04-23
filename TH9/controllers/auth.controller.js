exports.login = (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === '123456') {
    req.session.loggedIn = true;
    return res.json({ success: true });
  }

  res.status(401).json({ message: 'Invalid login' });
};