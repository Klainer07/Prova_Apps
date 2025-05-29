const Usuario = require('../models/Usuario');

exports.criarUsuario = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        const existente = await Usuario.findOne({ email });
        if (existente) {
            return res.status(400).json({ message: 'Email já cadastrado' });
        }

        const novoUsuario = new Usuario({ nome, email, senha });
        await novoUsuario.save();

        res.status(201).json({ message: 'Usuário registrado com sucesso', usuario: novoUsuario });
    } catch (error) {
        res.status(400).json({ message: 'Erro ao registrar usuário', error });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        const usuario = await Usuario.findOne({ email });
        if (!usuario || usuario.senha !== senha) {
            return res.status(401).json({ message: 'Email ou senha incorretos' });
        }

        res.status(200).json({
            message: 'Login bem-sucedido',
            usuario: {
                id: usuario._id,
                nome: usuario.nome,
                email: usuario.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao fazer login', error });
    }
};

exports.obterUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar usuários', error });
    }
};

exports.atualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const atualizado = await Usuario.findByIdAndUpdate(id, req.body, { new: true });
        if (!atualizado) return res.status(404).json({ message: 'Usuário não encontrado' });
        res.status(200).json(atualizado);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao atualizar usuário', error });
    }
};

exports.deletarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const deletado = await Usuario.findByIdAndDelete(id);
        if (!deletado) return res.status(404).json({ message: 'Usuário não encontrado' });
        res.status(200).json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar usuário', error });
    }
};
