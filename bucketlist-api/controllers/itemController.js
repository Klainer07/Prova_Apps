const Item = require('../models/Item');

exports.criarItem = async (req, res) => {
    try {
        const item = new Item(req.body);
        await item.save();
        res.status(201).json(item);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao criar item', error });
    }
};

exports.obterItens = async (req, res) => {
    try {
        const { listaId } = req.query;

       
        const filtro = listaId ? { listaId } : {};

        const itens = await Item.find(filtro).populate('listaId', 'nome descricao');
        res.status(200).json(itens);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar itens', error });
    }
};

exports.atualizarItem = async (req, res) => {
    try {
        const { id } = req.params;
        const atualizado = await Item.findByIdAndUpdate(id, req.body, { new: true });
        if (!atualizado) return res.status(404).json({ message: 'Item não encontrado' });
        res.status(200).json(atualizado);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao atualizar item', error });
    }
};

exports.deletarItem = async (req, res) => {
    try {
        const { id } = req.params;
        const deletado = await Item.findByIdAndDelete(id);
        if (!deletado) return res.status(404).json({ message: 'Item não encontrado' });
        res.status(200).json({ message: 'Item deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar item', error });
    }
};
