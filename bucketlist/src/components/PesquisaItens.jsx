import { useEffect, useState } from 'react';
import api from '../services/api';

function PesquisaItens() {
  const [filtros, setFiltros] = useState({
     titulo: '',
    categoria: '',
    status: '',
    prioridade: '',
  });
  const [resultados, setResultados] = useState([]);

  const buscarItens = async () => {
    try {
      const res = await api.get('/itens');
      const itensFiltrados = res.data.filter((item) => {
        return (
          (!filtros.titulo ||
            item.titulo.toLowerCase().includes(filtros.titulo.toLowerCase())) &&
          (!filtros.categoria || item.categoria === filtros.categoria) &&
          (!filtros.status || item.status === filtros.status) &&
          (!filtros.prioridade || item.prioridade === filtros.prioridade)
        );
      });
      setResultados(itensFiltrados);
    } catch (error) {
      console.error('Erro ao buscar itens:', error);
      alert('Erro ao buscar itens.');
    }
  };

  useEffect(() => {
    buscarItens();
  }, [filtros]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiltros((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          name="titulo"
          placeholder="Buscar por título"
          value={filtros.titulo}
          onChange={handleChange}
          style={{ marginRight: '1rem' }}
        />
        <select
          name="categoria"
          value={filtros.categoria}
          onChange={handleChange}
          style={{ marginRight: '1rem' }}
        >
          <option value="">Todas as categorias</option>
          <option value="Livro">Livro</option>
          <option value="Jogo">Jogo</option>
          <option value="Filme">Filme</option>
          <option value="Viagem">Viagem</option>
          <option value="Esporte">Esporte</option>
          <option value="Outro">Outro</option>
        </select>
        <select
          name="prioridade"
          value={filtros.prioridade}
          onChange={handleChange}
          style={{ marginRight: '1rem' }}
        >
          <option value="">Todas as prioridades</option>
          <option value="Alta">Alta</option>
          <option value="Média">Média</option>
          <option value="Baixa">Baixa</option>
        </select>
        <select name="status" value={filtros.status} onChange={handleChange}>
          <option value="">Todos os status</option>
          <option value="Pendente">Pendente</option>
          <option value="Concluído">Concluído</option>
        </select>
      </div>

      <h3>Resultados:</h3>
      {resultados.length > 0 ? (
        <ul>
          {resultados.map((item) => (
            <li key={item._id}>
              <strong>{item.titulo}</strong> - {item.categoria},{' '}
              {item.prioridade}, {item.status}
              <br />
              <small>Lista: {item.listaId?.nome}</small>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum item encontrado.</p>
      )}
    </div>
  );
}

export default PesquisaItens;
