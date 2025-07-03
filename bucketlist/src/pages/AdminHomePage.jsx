import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function AdminHomePage() {
  const [usuario, setUsuario] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const usuarioSalvo = JSON.parse(localStorage.getItem('usuario'));

    if (!token || !usuarioSalvo || usuarioSalvo.role !== 'admin') {
      navigate('/login');
      return;
    }

    setUsuario(usuarioSalvo);
    carregarUsuarios();
  }, []);

  const carregarUsuarios = async () => {
    try {
      const res = await api.get('/usuarios');
      setUsuarios(res.data);
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
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

  const handleDeleteUsuario = async (id) => {
    if (!window.confirm('Deseja realmente deletar este usuário?')) return;

    try {
      await api.delete(`/usuarios/${id}`);
      setUsuarios((prev) => prev.filter((u) => u.id !== id));
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      alert('Erro ao deletar usuário.');
    }
  };

  const handleEditUsuario = (id) => {
    navigate(`/admin/usuarios/editar/${id}`);
  };

  const handleVoltarHome = () => {
    navigate('/');
  };

  return (
    <div style={{ padding: '2rem' }}>
      {usuario ? (
        <>
          <h2>Área do Administrador: {usuario.nome}</h2>
          <button onClick={handleLogout} style={{ marginBottom: '1rem', marginRight: '1rem' }}>
            Sair
          </button>
          <button onClick={handleVoltarHome} style={{ marginBottom: '1rem' }}>
            Voltar para BucketList
          </button>

          <h3>Usuários Registrados:</h3>
          {usuarios.length === 0 ? (
            <p>Nenhum usuário encontrado.</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>Nome</th>
                  <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>Email</th>
                  <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>Tipo</th>
                  <th style={{ borderBottom: '1px solid #ccc' }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((u) => (
                  <tr key={u.id}>
                    <td>{u.nome}</td>
                    <td>{u.email}</td>
                    <td>{u.role}</td>
                    <td>
                      {u.role !== 'admin' ? (
                        <>
                          <button onClick={() => handleEditUsuario(u.id)} style={{ marginRight: '0.5rem' }}>
                            Editar
                          </button>
                          <button onClick={() => handleDeleteUsuario(u.id)}>Excluir</button>
                        </>
                      ) : (
                        <span style={{ color: '#888' }}>Administrador</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
}

export default AdminHomePage;
