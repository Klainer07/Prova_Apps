const { Lista, Usuario } = require('../models');

exports.criarLista = async (req, res) => {
    try {
        const lista = await Lista.create(req.body);
        res.status(201).json(lista);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao criar lista', error });
    }
};

exports.obterListas = async (req, res) => {
    try {
        const { usuarioId } = req.query;
        const filtro = usuarioId ? { where: { usuarioId } } : {};
        const listas = await Lista.findAll({
            ...filtro,
            include: { model: Usuario, attributes: ['nome', 'email'] }
        });
        res.status(200).json(listas);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar listas', error });
    }
};

exports.atualizarLista = async (req, res) => {
    try {
        const { id } = req.params;
        const [atualizadas] = await Lista.update(req.body, { where: { id } });
        if (!atualizadas) return res.status(404).json({ message: 'Lista não encontrada' });

        const atualizada = await Lista.findByPk(id);
        res.status(200).json(atualizada);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao atualizar lista', error });
    }
};

exports.deletarLista = async (req, res) => {
    try {
        const { id } = req.params;
        const deletadas = await Lista.destroy({ where: { id } });
        if (!deletadas) return res.status(404).json({ message: 'Lista não encontrada' });
        res.status(200).json({ message: 'Lista deletada com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar lista', error });
    }
};
