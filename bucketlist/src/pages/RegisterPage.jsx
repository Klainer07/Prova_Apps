import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const registerSchema = Yup.object().shape({
  nome: Yup.string().required('Nome é obrigatório'),
  email: Yup.string().email('Email inválido').required('Email é obrigatório'),
  senha: Yup.string().min(6, 'Mínimo de 6 caracteres').required('Senha é obrigatória'),
});

function RegisterPage() {
  const navigate = useNavigate();

  const handleRegister = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await api.post('/auth/registrar', values);

      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('usuario', JSON.stringify(response.data.usuario));

      navigate('/');
    } catch (error) {
      console.error(error);
      setErrors({ email: 'Erro ao registrar. Tente outro email.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Registrar Novo Usuário</h2>
      <Formik
        initialValues={{ nome: '', email: '', senha: '' }}
        validationSchema={registerSchema}
        onSubmit={handleRegister}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label>Nome:</label>
              <Field type="text" name="nome" />
              <ErrorMessage name="nome" component="div" />
            </div>

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

            <button type="submit" disabled={isSubmitting} style={{ marginTop: '1rem' }}>
              Registrar
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default RegisterPage;
