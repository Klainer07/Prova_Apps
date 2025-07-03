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
    const token = localStorage.getItem('token');
    const usuarioSalvo = JSON.parse(localStorage.getItem('usuario'));

    if (!token || !usuarioSalvo) {
      navigate('/login');
      return;
    }

    setUsuario(usuarioSalvo);
    carregarListas(usuarioSalvo.id);
  }, []);

  const carregarListas = async (usuarioId) => {
    try {
      const res = await api.get(`/listas?usuarioId=${usuarioId}`);
      setListas(res.data);
    } catch (error) {
      console.error('Erro ao carregar listas:', error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.clear();
        navigate('/login');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setUsuario(null);
    navigate('/login');
  };

  const handleDeleteLista = (listaId) => {
    setListas((prevListas) => prevListas.filter((lista) => lista.id !== listaId));
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

  const handleIrParaAdmin = () => {
    navigate('/admin');
  };

  return (
    <div style={{ padding: '2rem' }}>
      {usuario ? (
        <>
          <h2>Bem-vindo, {usuario.nome}!</h2>
          <div style={{ marginBottom: '1rem' }}>
            <button onClick={handleLogout} style={{ marginRight: '1rem' }}>
              Sair
            </button>
            <button onClick={handleNovaLista} style={{ marginRight: '1rem' }}>
              Nova Lista
            </button>
            <button onClick={handleIrParaPesquisa} style={{ marginRight: '1rem' }}>
              Pesquisar Itens
            </button>
            {usuario.role === 'admin' && (
              <button
                onClick={handleIrParaAdmin}
                style={{ backgroundColor: '#6c63ff', color: '#fff' }}
              >
                Ir para Área de Administrador
              </button>
            )}
          </div>

          <h3>Minhas listas:</h3>
          <ListaContainer
            listas={listas}
            onDelete={handleDeleteLista}
            onEdit={handleEditLista}
          />
        </>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
}

export default HomePage;
