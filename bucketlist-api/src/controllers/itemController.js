const { Item } = require('../models');

exports.criarItem = async (req, res) => {
  try {
    const item = await Item.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar item', error });
  }
};

exports.obterItens = async (req, res) => {
  try {
    const { listaId } = req.query;
    const where = listaId ? { listaId } : {};

    const itens = await Item.findAll({
      where,
      include: {
        association: 'lista',
        attributes: ['nome', 'descricao'],
      },
    });

    res.status(200).json(itens);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar itens', error });
  }
};

exports.atualizarItem = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Item.update(req.body, { where: { id } });

    if (!updated) {
      return res.status(404).json({ message: 'Item não encontrado' });
    }

    const itemAtualizado = await Item.findByPk(id);
    res.status(200).json(itemAtualizado);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar item', error });
  }
};

exports.deletarItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Item.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({ message: 'Item não encontrado' });
    }

    res.status(200).json({ message: 'Item deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar item', error });
  }
};
