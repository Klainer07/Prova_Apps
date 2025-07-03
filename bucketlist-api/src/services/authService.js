const { Usuario } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function registrarUsuario({ nome, email, senha }) {
  const existente = await Usuario.findOne({ where: { email } });
  if (existente) throw new Error('Email já cadastrado');

  const senhaCriptografada = await bcrypt.hash(senha, 10);

  const novoUsuario = await Usuario.create({
    nome,
    email,
    senha: senhaCriptografada,
    role: 'usuario',
  });

  return {
    id: novoUsuario.id,
    nome: novoUsuario.nome,
    email: novoUsuario.email,
    role: novoUsuario.role,
  };
}

async function autenticarUsuario({ email, senha }) {
  const usuario = await Usuario.findOne({ where: { email } });
  if (!usuario) throw new Error('Email ou senha inválidos');

  const senhaValida = await bcrypt.compare(senha, usuario.senha);
  if (!senhaValida) throw new Error('Email ou senha inválidos');

  const token = jwt.sign(
    { id: usuario.id, role: usuario.role },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  return {
    token,
    usuario: {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      role: usuario.role,
    },
  };
}

module.exports = {
  registrarUsuario,
  autenticarUsuario,
};
