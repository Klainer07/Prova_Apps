const isAdmin = (req, res, next) => {
  if (!req.usuario) {
    return res.status(401).json({ message: 'Usuário não autenticado' });
  }
  if (req.usuario.role !== 'admin') {
    return res.status(403).json({ message: 'Acesso restrito a administradores' });
  }
  next();
};

module.exports = isAdmin;
