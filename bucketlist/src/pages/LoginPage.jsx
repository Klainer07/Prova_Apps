import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Email inválido').required('Obrigatório'),
  senha: Yup.string().required('Obrigatório'),
});

function LoginPage() {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await api.post('/auth/login', values);

      // Salva o token e os dados do usuário no localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('usuario', JSON.stringify(response.data.usuario));

      navigate('/');
    } catch (error) {
      setErrors({ senha: 'Login inválido' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Login</h2>
      <Formik
        initialValues={{ email: '', senha: '' }}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label>Email:</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" />
            </div>
            <div>
              <label>Senha:</label>
              <Field type="password" name="senha" />
              <ErrorMessage name="senha" component="div" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Entrar
            </button>
          </Form>
        )}
      </Formik>
      <div style={{ marginTop: '1rem' }}>
        <p>Não tem uma conta?</p>
        <button onClick={() => navigate('/register')}>Registre-se</button>
      </div>
    </div>
  );
}

export default LoginPage;
