const { Item, Lista } = require('../models');

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
        const filtro = listaId ? { where: { listaId } } : {};
        const itens = await Item.findAll({
            ...filtro,
            include: { model: Lista, attributes: ['nome', 'descricao'] }
        });
        res.status(200).json(itens);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar itens', error });
    }
};

exports.atualizarItem = async (req, res) => {
    try {
        const { id } = req.params;
        const [atualizados] = await Item.update(req.body, { where: { id } });
        if (!atualizados) return res.status(404).json({ message: 'Item não encontrado' });

        const atualizado = await Item.findByPk(id);
        res.status(200).json(atualizado);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao atualizar item', error });
    }
};

exports.deletarItem = async (req, res) => {
    try {
        const { id } = req.params;
        const deletados = await Item.destroy({ where: { id } });
        if (!deletados) return res.status(404).json({ message: 'Item não encontrado' });
        res.status(200).json({ message: 'Item deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar item', error });
    }
};
