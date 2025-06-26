const { Lista, Usuario } = require('../models');

exports.criarLista = async (req, res) => {
  try {
    const { nome, descricao, usuarioId } = req.body;

    if (!usuarioId) {
      return res.status(400).json({ message: 'usuarioId é obrigatório' });
    }

    // Opcional: Verificar se o usuário existe
    const usuarioExiste = await Usuario.findByPk(usuarioId);
    if (!usuarioExiste) {
      return res.status(400).json({ message: 'Usuário não encontrado' });
    }

    const lista = await Lista.create({ nome, descricao, usuarioId });

    res.status(201).json(lista);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar lista', error: error.message });
  }
};

exports.obterListas = async (req, res) => {
  try {
    const { usuarioId } = req.query;

    const where = usuarioId ? { usuarioId } : {};

    // Inclui dados do usuário associado (nome, email)
    const listas = await Lista.findAll({
      where,
      include: [{
        model: Usuario,
        as: 'usuario',
        attributes: ['id', 'nome', 'email'],
      }],
    });

    res.status(200).json(listas);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar listas', error: error.message });
  }
};

exports.atualizarLista = async (req, res) => {
  try {
    const { id } = req.params;

    const [updated] = await Lista.update(req.body, {
      where: { id },
    });

    if (!updated) {
      return res.status(404).json({ message: 'Lista não encontrada' });
    }

    const listaAtualizada = await Lista.findByPk(id);
    res.status(200).json(listaAtualizada);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar lista', error: error.message });
  }
};

exports.deletarLista = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Lista.destroy({
      where: { id },
    });

    if (!deleted) {
      return res.status(404).json({ message: 'Lista não encontrada' });
    }

    res.status(200).json({ message: 'Lista deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar lista', error: error.message });
  }
};
