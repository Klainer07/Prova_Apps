import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

function ListaDetalhesPage() {
  const { listaId } = useParams();
  const [itens, setItens] = useState([]);
  const [novoItem, setNovoItem] = useState({
    titulo: '',
    categoria: 'Outro',
    prioridade: 'Média',
    status: 'Pendente',
    prazo: ''
  });
  const [editandoId, setEditandoId] = useState(null);
  const [itemEditado, setItemEditado] = useState({});
  const navigate = useNavigate();

  const carregarItens = async () => {
    try {
      const resItens = await api.get(`/itens?listaId=${listaId}`);
      setItens(resItens.data);
    } catch (error) {
      console.error('Erro ao carregar itens:', error);
      alert('Erro ao carregar os itens.');
    }
  };

  useEffect(() => {
    carregarItens();
  }, [listaId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovoItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setItemEditado((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const itemParaEnviar = {
        ...novoItem,
        listaId,
        prazo: novoItem.prazo ? new Date(novoItem.prazo).toISOString() : undefined,
      };

      await api.post('/itens', itemParaEnviar);
      setNovoItem({ titulo: '', categoria: 'Outro', prioridade: 'Média', status: 'Pendente', prazo: '' });
      carregarItens();
    } catch (error) {
      console.error('Erro ao adicionar item:', error.response?.data || error.message);
      alert('Erro ao adicionar item: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleDelete = async (itemId) => {
    if (!confirm('Tem certeza que deseja deletar este item?')) return;
    try {
      await api.delete(`/itens/${itemId}`);
      carregarItens();
    } catch (error) {
      console.error('Erro ao deletar item:', error);
      alert('Erro ao deletar item: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleEdit = (item) => {
    setEditandoId(item.id);
    setItemEditado({ ...item, prazo: item.prazo ? item.prazo.substring(0, 10) : '' });
  };

  const handleSave = async () => {
    try {
      await api.put(`/itens/${editandoId}`, {
        ...itemEditado,
        prazo: itemEditado.prazo ? new Date(itemEditado.prazo).toISOString() : undefined,
      });
      setEditandoId(null);
      setItemEditado({});
      carregarItens();
    } catch (error) {
      console.error('Erro ao editar item:', error);
      alert('Erro ao editar item');
    }
  };

  const handleCancelEdit = () => {
    setEditandoId(null);
    setItemEditado({});
  };

  return (
    <div style={{ padding: '2rem' }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: '1rem' }}>
        Voltar
      </button>

      <h2>Itens da Lista</h2>

      {itens.length > 0 ? (
        <ul>
          {itens.map((item) => (
            <li key={item.id}>
              {editandoId === item.id ? (
                <>
                  <input
                    type="text"
                    name="titulo"
                    value={itemEditado.titulo}
                    onChange={handleEditChange}
                    required
                  />
                  <select name="categoria" value={itemEditado.categoria} onChange={handleEditChange}>
                    <option value="Livro">Livro</option>
                    <option value="Jogo">Jogo</option>
                    <option value="Filme">Filme</option>
                    <option value="Viagem">Viagem</option>
                    <option value="Esporte">Esporte</option>
                    <option value="Outro">Outro</option>
                  </select>
                  <select name="prioridade" value={itemEditado.prioridade} onChange={handleEditChange}>
                    <option value="Alta">Alta</option>
                    <option value="Média">Média</option>
                    <option value="Baixa">Baixa</option>
                  </select>
                  <select name="status" value={itemEditado.status} onChange={handleEditChange}>
                    <option value="Pendente">Pendente</option>
                    <option value="Concluído">Concluído</option>
                  </select>
                  <input
                    type="date"
                    name="prazo"
                    value={itemEditado.prazo}
                    onChange={handleEditChange}
                  />
                  <button onClick={handleSave}>Salvar</button>
                  <button onClick={handleCancelEdit}>Cancelar</button>
                </>
              ) : (
                <>
                  <strong>{item.titulo}</strong> -- {item.status} -- Prioridade: {item.prioridade} -- Categoria: {item.categoria} -- Prazo: {item.prazo ? new Date(item.prazo).toLocaleDateString() : 'Sem prazo'}
                  <button onClick={() => handleEdit(item)} style={{ marginLeft: '1rem' }}>
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    style={{ marginLeft: '0.5rem' }}
                  >
                    Deletar
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>Esta lista não possui itens.</p>
      )}

      <h3>Adicionar novo item</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="titulo"
          placeholder="Título"
          value={novoItem.titulo}
          onChange={handleChange}
          required
        />
        <select name="categoria" value={novoItem.categoria} onChange={handleChange}>
          <option value="Livro">Livro</option>
          <option value="Jogo">Jogo</option>
          <option value="Filme">Filme</option>
          <option value="Viagem">Viagem</option>
          <option value="Esporte">Esporte</option>
          <option value="Outro">Outro</option>
        </select>
        <select name="prioridade" value={novoItem.prioridade} onChange={handleChange}>
          <option value="Alta">Alta</option>
          <option value="Média">Média</option>
          <option value="Baixa">Baixa</option>
        </select>
        <select name="status" value={novoItem.status} onChange={handleChange}>
          <option value="Pendente">Pendente</option>
          <option value="Concluído">Concluído</option>
        </select>
        <input
          type="date"
          name="prazo"
          value={novoItem.prazo}
          onChange={handleChange}
        />
        <button type="submit">Adicionar</button>
      </form>
    </div>
  );
}

export default ListaDetalhesPage;
