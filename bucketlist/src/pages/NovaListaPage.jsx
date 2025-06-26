import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function NovaListaPage() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const usuarioSalvo = JSON.parse(localStorage.getItem('usuario'));

    if (!usuarioSalvo || !usuarioSalvo.usuario?.id) {
      alert('Usuário não autenticado.');
      return;
    }

    try {
      await api.post('/listas', {
        nome,
        descricao,
        usuarioId: usuarioSalvo.usuario.id
      });
      navigate('/'); 
    } catch (error) {
      console.error('Erro ao criar lista:', error);
      alert('Erro ao criar lista.');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Criar Nova Lista</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px' }}>
        <label>Nome da lista:</label>
        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />

        <label>Descrição:</label>
        <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} />

        <button type="submit" style={{ marginTop: '1rem' }}>Criar</button>
      </form>
    </div>
  );
}

export default NovaListaPage;
