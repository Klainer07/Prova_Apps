// src/pages/PesquisarItensPage.jsx
import { useNavigate } from 'react-router-dom';
import PesquisaItens from '../components/PesquisaItens';

function PesquisarItensPage() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '2rem' }}>
      <button onClick={() => navigate('/')} style={{ marginBottom: '1rem' }}>
        Voltar
      </button>
      <h2>Pesquisar Itens</h2>
      <PesquisaItens />
    </div>
  );
}

export default PesquisarItensPage;
