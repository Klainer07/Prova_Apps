const authService = require('../services/authService');

exports.registrar = async (req, res) => {
  try {
    const usuario = await authService.registrarUsuario(req.body);
    res
      .status(201)
      .json({ message: 'Usuário registrado com sucesso', usuario });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { token, usuario } = await authService.autenticarUsuario(req.body);
    res.status(200).json({ message: 'Login bem-sucedido', token, usuario });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
