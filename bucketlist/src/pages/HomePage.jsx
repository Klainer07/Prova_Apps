// ... imports
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../App.css';
import ListaContainer from '../components/ListaContainer';

function HomePage() {
  const [usuario, setUsuario] = useState(null);
  const [listas, setListas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioSalvo = JSON.parse(localStorage.getItem('usuario'));

    if (usuarioSalvo && usuarioSalvo.usuario && usuarioSalvo.usuario.id) {
      setUsuario(usuarioSalvo);
      carregarListas(usuarioSalvo.usuario.id);
    }
  }, []);

  const carregarListas = async (usuarioId) => {
    try {
      const res = await api.get(`/listas?usuarioId=${usuarioId}`);
      setListas(res.data);
    } catch (error) {
      console.error('Erro ao carregar listas:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    setUsuario(null);
    navigate('/login');
  };

  const handleDeleteLista = (listaId) => {
    setListas((prevListas) => prevListas.filter((lista) => lista._id !== listaId));
  };

  const handleNovaLista = () => {
    navigate('/listas/nova');
  };

  const handleEditLista = (listaId) => {
    navigate(`/listas/editar/${listaId}`);
  };

  const handleIrParaPesquisa = () => {
    navigate('/pesquisar');
  };

  return (
    <div style={{ padding: '2rem' }}>
      {usuario ? (
        <>
          <h2>Bem-vindo, {usuario.usuario.nome}!</h2>
          <button onClick={handleLogout} style={{ marginBottom: '1rem', marginRight: '1rem' }}>
            Sair
          </button>
          <button onClick={handleNovaLista} style={{ marginBottom: '1rem', marginRight: '1rem' }}>
            Nova Lista
          </button>
          <button onClick={handleIrParaPesquisa} style={{ marginBottom: '1rem' }}>
            Pesquisar Itens
          </button>

          <h3>Minhas listas:</h3>
          <ListaContainer 
            listas={listas} 
            onDelete={handleDeleteLista} 
            onEdit={handleEditLista}
          />
        </>
      ) : (
        <>
          <p>Você não está logado.</p>
          <button onClick={() => navigate('/login')} style={{ marginRight: '1rem' }}>
            Fazer login
          </button>
          <button onClick={() => navigate('/register')}>Registrar</button>
        </>
      )}
    </div>
  );
}

export default HomePage;
