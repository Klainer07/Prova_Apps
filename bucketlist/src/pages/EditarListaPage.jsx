import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

function EditarListaPage() {
  const [lista, setLista] = useState({ nome: '', descricao: '' });
  const { listaId } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/listas/${listaId}`, lista);
      alert('Lista atualizada com sucesso!');
      navigate('/');
    } catch (error) {
      console.error('Erro ao editar a lista:', error);
      alert('Erro ao editar a lista. Tente novamente.');
    }
  };

  const handleChange = (e) => {
    setLista({
      ...lista,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Editar Lista</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', gap: '1rem' }}
      >
        <div className="form-field">
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            value={lista.nome}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field">
          <label>Descrição:</label>
          <textarea
            name="descricao"
            value={lista.descricao}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default EditarListaPage;
