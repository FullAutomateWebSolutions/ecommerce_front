import 'antd/dist/reset.css';
import { Button, Space, Typography, message } from 'antd';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const App = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      message.success('Deslogado com sucesso!');
      localStorage.removeItem('token');
      navigate('/login');
    } catch (error) {
      console.error('Erro ao deslogar:', error);
      message.error('Erro ao deslogar');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/login');
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <Space direction="vertical" size="middle">
        <Typography.Title level={3}>Bem-vindo 👋</Typography.Title>
        <Button type="primary" danger onClick={handleLogout}>
          Deslogar
        </Button>
      </Space>
    </div>
  );
};

export default App;
