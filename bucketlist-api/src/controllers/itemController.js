const { Item, Lista } = require('../models');

exports.criarItem = async (req, res) => {
  try {
    const { titulo, categoria, prioridade, status, prazo, listaId } = req.body;
    const usuarioId = req.usuario.id;

    const lista = await Lista.findOne({ where: { id: listaId, usuarioId } });
    if (!lista) {
      return res.status(403).json({ message: 'Lista não pertence ao usuário ou não existe' });
    }

    const item = await Item.create({ titulo, categoria, prioridade, status, prazo, listaId });
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar item', error: error.message });
  }
};

exports.obterItens = async (req, res) => {
  try {
    const usuarioId = req.usuario.id;
    const { listaId } = req.query;

    const whereListas = listaId ? { id: listaId, usuarioId } : { usuarioId };
    const listasUsuario = await Lista.findAll({ where: whereListas, attributes: ['id'] });
    const listaIds = listasUsuario.map(l => l.id);

    if (listaIds.length === 0) {
      return res.status(200).json([]);
    }

    const itens = await Item.findAll({
      where: { listaId: listaIds },
      include: {
        association: 'lista',
        attributes: ['nome', 'descricao'],
      },
    });

    res.status(200).json(itens);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar itens', error: error.message });
  }
};

exports.atualizarItem = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioId = req.usuario.id;

    const item = await Item.findByPk(id, { include: 'lista' });
    if (!item || item.lista.usuarioId !== usuarioId) {
      return res.status(403).json({ message: 'Item não pertence ao usuário ou não existe' });
    }

    const [updated] = await Item.update(req.body, { where: { id } });

    if (!updated) {
      return res.status(404).json({ message: 'Item não encontrado para atualizar' });
    }

    const itemAtualizado = await Item.findByPk(id);
    res.status(200).json(itemAtualizado);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar item', error: error.message });
  }
};

exports.deletarItem = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioId = req.usuario.id;

    const item = await Item.findByPk(id, { include: 'lista' });
    if (!item || item.lista.usuarioId !== usuarioId) {
      return res.status(403).json({ message: 'Item não pertence ao usuário ou não existe' });
    }

    await Item.destroy({ where: { id } });
    res.status(200).json({ message: 'Item deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar item', error: error.message });
  }
};
