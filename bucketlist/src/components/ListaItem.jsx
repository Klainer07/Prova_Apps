import api from '../services/api';
import { useNavigate } from 'react-router-dom';

function ListaItem({ lista, onDelete, onEdit }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await api.delete(`/listas/${lista._id}`);
      onDelete(lista._id);
    } catch (error) {
      console.error('Erro ao excluir lista:', error);
    }
  };

  return (
    <div
      style={{
        border: '1px solid #9f00ff',
        marginBottom: '1rem',
        padding: '1rem',
      }}
    >
      <h4>{lista.nome}</h4>
      {lista.descricao && <p>{lista.descricao}</p>}

      <button onClick={handleDelete} style={{ marginRight: '0.5rem' }}>
        Deletar
      </button>
      <button
        onClick={() => onEdit(lista._id)}
        style={{ marginRight: '0.5rem' }}
      >
        Editar
      </button>
      <button onClick={() => navigate(`/listas/${lista._id}`)}>Ver</button>
    </div>
  );
}

export default ListaItem;
