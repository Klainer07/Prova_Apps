import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

function EditarUsuarioPage() {
  const [usuario, setUsuario] = useState({
    nome: '',
    email: '',
    senha: '',
    role: 'user',
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const carregarUsuario = async () => {
      try {
        const res = await api.get('/usuarios');
        const usuarioEncontrado = res.data.find((u) => u.id === parseInt(id));
        if (!usuarioEncontrado) {
          alert('Usuário não encontrado');
          navigate('/admin');
        } else {
          setUsuario({ ...usuarioEncontrado, senha: '' }); 
        }
      } catch (error) {
        console.error('Erro ao carregar usuário:', error);
        alert('Erro ao carregar usuário');
      }
    };

    carregarUsuario();
  }, [id, navigate]);

  const handleChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usuario.senha || usuario.senha.trim().length < 6) {
      alert('A nova senha é obrigatória e deve ter pelo menos 6 caracteres.');
      return;
    }

    try {
      await api.put(`/usuarios/${id}`, usuario);
      alert('Usuário atualizado com sucesso!');
      navigate('/admin');
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      alert('Erro ao atualizar usuário');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Editar Usuário</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', gap: '1rem' }}
      >
        <div>
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            value={usuario.nome}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={usuario.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Nova Senha:</label>
          <input
            type="password"
            name="senha"
            value={usuario.senha}
            onChange={handleChange}
            required
            minLength={6}
          />
        </div>
        <div>
          <label>Tipo:</label>
          <select name="role" value={usuario.role} onChange={handleChange}>
            <option value="user">Usuário</option>
            <option value="admin">Administrador</option>
          </select>
        </div>
        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  );
}

export default EditarUsuarioPage;
