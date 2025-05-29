const Lista = require('../models/Lista');

exports.criarLista = async (req, res) => {
    try {
        const { nome, descricao, usuarioId } = req.body;

        if (!usuarioId) {
            return res.status(400).json({ message: 'usuarioId é obrigatório' });
        }

        const lista = new Lista({ nome, descricao, usuarioId });
        await lista.save();

        res.status(201).json(lista);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao criar lista', error });
    }
};

exports.obterListas = async (req, res) => {
    try {
        const { usuarioId } = req.query;

        const filtro = usuarioId ? { usuarioId } : {};
        const listas = await Lista.find(filtro).populate('usuarioId', 'nome email');

        res.status(200).json(listas);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar listas', error });
    }
};

exports.atualizarLista = async (req, res) => {
    try {
        const { id } = req.params;
        const atualizada = await Lista.findByIdAndUpdate(id, req.body, { new: true });
        if (!atualizada) return res.status(404).json({ message: 'Lista não encontrada' });
        res.status(200).json(atualizada);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao atualizar lista', error });
    }
};

exports.deletarLista = async (req, res) => {
    try {
        const { id } = req.params;
        const deletada = await Lista.findByIdAndDelete(id);
        if (!deletada) return res.status(404).json({ message: 'Lista não encontrada' });
        res.status(200).json({ message: 'Lista deletada com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar lista', error });
    }
};
