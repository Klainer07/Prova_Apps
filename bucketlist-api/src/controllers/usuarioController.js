const { Usuario } = require('../models');
const bcrypt = require('bcrypt');

exports.obterUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuários', error });
  }
};

exports.atualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const dadosAtualizados = { ...req.body };

    if (dadosAtualizados.senha) {
      dadosAtualizados.senha = await bcrypt.hash(dadosAtualizados.senha, 10);
    }

    const [updated] = await Usuario.update(dadosAtualizados, {
      where: { id },
    });

    if (!updated)
      return res.status(404).json({ message: 'Usuário não encontrado' });

    const usuarioAtualizado = await Usuario.findByPk(id);
    res.status(200).json(usuarioAtualizado);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar usuário', error });
  }
};

exports.deletarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const deletado = await Usuario.destroy({ where: { id } });

    if (!deletado)
      return res.status(404).json({ message: 'Usuário não encontrado' });

    res.status(200).json({ message: 'Usuário deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar usuário', error });
  }
};
