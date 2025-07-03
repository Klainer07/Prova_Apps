const { Lista, Usuario } = require('../models');

exports.criarLista = async (req, res) => {
  try {
    const usuarioId = req.usuario.id; // VEM DO TOKEN
    const { nome, descricao } = req.body;

    const lista = await Lista.create({ nome, descricao, usuarioId });

    res.status(201).json(lista);
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Erro ao criar lista', error: error.message });
  }
};

exports.obterListas = async (req, res) => {
  try {
    const usuarioId = req.usuario.id;

    const listas = await Lista.findAll({
      where: { usuarioId },
      include: [
        {
          model: Usuario,
          as: 'usuario',
          attributes: ['id', 'nome', 'email'],
        },
      ],
    });

    res.status(200).json(listas);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Erro ao buscar listas', error: error.message });
  }
};

exports.atualizarLista = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioId = req.usuario.id;

    const lista = await Lista.findByPk(id);

    if (!lista)
      return res.status(404).json({ message: 'Lista não encontrada' });
    if (lista.usuarioId !== usuarioId)
      return res.status(403).json({ message: 'Acesso negado' });

    await lista.update(req.body);
    res.status(200).json(lista);
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Erro ao atualizar lista', error: error.message });
  }
};

exports.deletarLista = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioId = req.usuario.id;

    const lista = await Lista.findByPk(id);

    if (!lista)
      return res.status(404).json({ message: 'Lista não encontrada' });
    if (lista.usuarioId !== usuarioId)
      return res.status(403).json({ message: 'Acesso negado' });

    await lista.destroy();
    res.status(200).json({ message: 'Lista deletada com sucesso' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Erro ao deletar lista', error: error.message });
  }
};
