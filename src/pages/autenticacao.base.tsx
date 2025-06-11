
import { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { Form, Input, Button, Typography, message, Card } from 'antd';
import axios from 'axios';

const firebaseConfig = {
  apiKey: "AIzaSyBQAYEvKU_85Xrj_1HFiazdc4G5x7Pa8vs",
  authDomain: "fullautomatewebsolution.firebaseapp.com",
  projectId: "fullautomatewebsolution",
  storageBucket: "fullautomatewebsolution.firebasestorage.app",
  messagingSenderId: "544476675765",
  appId: "1:544476675765:web:402af9e09b228b563d88fc",
  measurementId: "G-PJ0HKP092Y"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const AuthPage = () => {
  const [modo, setModo] = useState<'login' | 'cadastro'>('login');

  const onFinish = async ({ email, senha }: { email: string; senha: string }) => {
    try {
      const userCredential =
        modo === 'login'
          ? await signInWithEmailAndPassword(auth, email, senha)
          : await createUserWithEmailAndPassword(auth, email, senha);

      const token = await userCredential.user.getIdToken();

      const response = await axios.post(
        'http://localhost:3000/api/auth/firebase',
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      localStorage.setItem('token', token);
      message.success(`Bem-vindo, ${email}`);
      window.location.href = '/'; // redireciona para home
    } catch (err: any) {
      console.error(err);
      message.error('Erro ao autenticar');
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
      <Card title={modo === 'login' ? 'Login' : 'Cadastro'} style={{ width: 360 }}>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="E-mail" name="email" rules={[{ required: true, type: 'email' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Senha" name="senha" rules={[{ required: true, min: 6 }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {modo === 'login' ? 'Entrar' : 'Cadastrar'}
            </Button>
          </Form.Item>
        </Form>
        <Typography.Paragraph style={{ textAlign: 'center' }}>
          {modo === 'login' ? 'Não tem conta?' : 'Já tem conta?'}{' '}
          <a onClick={() => setModo(modo === 'login' ? 'cadastro' : 'login')}>
            {modo === 'login' ? 'Cadastre-se' : 'Faça login'}
          </a>
        </Typography.Paragraph>
      </Card>
    </div>
  );
};

export default AuthPage;


//  1. Via painel do Firebase (console web)
// Acesse https://console.firebase.google.com

// Selecione seu projeto.

// No menu lateral, vá em Authentication > Usuários.

// Clique em Adicionar usuário.

// Preencha email e senha — pronto! ✅


// ✅ Soluções possíveis:
// 1. Verifique se o Firebase Auth está habilitado no Console
// Vá até o Firebase Console.

// Acesse o projeto.

// Vá em "Authentication" > "Método de login".

// Habilite o E-mail e senha.

// 2. Verifique se você está usan