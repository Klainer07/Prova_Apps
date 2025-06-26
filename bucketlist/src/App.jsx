import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NovaListaPage from './pages/NovaListaPage';
import EditarListaPage from './pages/EditarListaPage';
import ListaDetalhesPage from './pages/ListaDetalhesPage'; 
import PesquisarItensPage from './pages/PesquisarItensPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/listas/nova" element={<NovaListaPage />} />
      <Route path="/listas/editar/:listaId" element={<EditarListaPage />} />
      <Route path="/listas/:listaId" element={<ListaDetalhesPage />} /> 
      <Route path="/pesquisar" element={<PesquisarItensPage />} />
    </Routes>
  );
}

export default App;
