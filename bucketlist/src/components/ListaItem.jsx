import api from '../services/api';
import { useNavigate } from 'react-router-dom';

function ListaItem({ lista, onDelete, onEdit }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!window.confirm(`Deseja realmente deletar a lista "${lista.nome}"?`)) return;

    try {
      await api.delete(`/listas/${lista.id || lista._id}`);
      if (typeof onDelete === 'function') {
        onDelete(lista.id || lista._id);
      }
    } catch (error) {
      console.error('Erro ao excluir lista:', error);
      alert('Erro ao excluir a lista. Verifique sua conexão ou tente novamente.');
    }
  };

  return (
    <div style={{ border: '1px solid #9f00ff', marginBottom: '1rem', padding: '1rem' }}>
      <h4>{lista.nome}</h4>
      {lista.descricao && <p>{lista.descricao}</p>}

      <button onClick={handleDelete} style={{ marginRight: '0.5rem' }}>Deletar</button>
      <button onClick={() => typeof onEdit === 'function' && onEdit(lista.id || lista._id)} style={{ marginRight: '0.5rem' }}>Editar</button>
      <button onClick={() => navigate(`/listas/${lista.id || lista._id}`)}>Ver</button>
    </div>
  );
}

export default ListaItem;
