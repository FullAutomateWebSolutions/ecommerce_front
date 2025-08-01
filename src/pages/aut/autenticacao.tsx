import { useEffect, useState } from "react";
import { Form, Input, Button, Typography, Card, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { loginStore } from "@/store/useStore";
import { UserOutlined, LockOutlined, LoginOutlined, MailOutlined } from "@ant-design/icons";

const AuthPage = () => {
  const navigate = useNavigate();
  const { fech, loginUser, redfinePassword, creatUser } = loginStore();
  const [modo, setModo] = useState<"login" | "cadastro" | "redefinir">("login");
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fech();
  }, []);

const onFinish = async ({ email, senha }: { email: string; senha?: string }) => {
  try {
    setLoading(true);

    if (modo === "login") {
      await loginUser(email, senha!);
   
      setTimeout(() => navigate("/"), 800); // tempo para exibir a notificação
    } else if (modo === "redefinir") {
      await redfinePassword(email);
      notification.success({
        message: "Redefinição enviada",
        description: "Se o e-mail existir, um link de redefinição foi enviado.",
        placement: "topRight",
      });
      setModo("login");
    } else if (modo === "cadastro") {
      await creatUser(email, senha!);
      form.resetFields();
      notification.success({
        message: "Cadastro concluído",
        description: "Sua conta foi criada.",
        placement: "topRight",
      });
      setModo("login");
    }

  } catch (error: any) {
    console.log(error)
    notification.error({
      message: "Erro",
      description:  "Algo deu errado. Tente novamente.",
      placement: "topRight",
    });
  } finally {
    setLoading(false);
  }
};
  return (
    <div
      style={{
        background: "linear-gradient(to bottom, #e0f7f5, #f8fffe)",
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
      }}
    >
      <Card
        // bordered={false}
        style={{
          width: 380,
          maxWidth: "100%",
          padding: 24,
          borderRadius: 16,
          boxShadow: "0 8px 32px rgba(42, 157, 143, 0.2)",
          background: "rgba(255, 255, 255, 0.55)",
          backdropFilter: "blur(8px)",
          transition: "all 0.4s ease-in-out",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <img
            src="logo2.png"
            alt="Logo"
            style={{ width: 85, marginBottom: 12 }}
          />
          <Typography.Title level={5} style={{ color: "#2a9d8f", margin: 0 }}>
            Full Automate Web Solutions
          </Typography.Title>
          <Typography.Text type="secondary">
            Plataforma de acesso unificado
          </Typography.Text>
          <Typography.Title level={2} style={{ color: "#2a9d8f", margin: 15 }}>
            {{
              login: "Acessar Sistema",
              cadastro: "Criar Conta",
              redefinir: "Redefinir Senha",
            }[modo]}
          </Typography.Title>
        </div>

        <Form layout="vertical" onFinish={onFinish} form={form}>
          <Form.Item
            label="E-mail"
            name="email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="seu@email.com" />
          </Form.Item>

          {modo !== "redefinir" && (
            <Form.Item
              label="Senha"
              name="senha"
              rules={[{ required: true, min: 6 }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="******" />
            </Form.Item>
          )}

          <Form.Item>
            <Button
              htmlType="submit"
              block
              icon={<LoginOutlined />}
              loading={loading}
              style={{
                color: "#2a9d8f",
                borderRadius: "8px",
                background:
                  "linear-gradient(to right, rgba(11, 65, 92, 0.12), rgba(42, 157, 143, 0.05))",
                border: "1px solid #2a9d8f",
                boxShadow: "0 0 10px rgba(42, 157, 143, 0.2)",
                transition: "all 0.3s ease-in-out",
              }}
            >
              {{
                login: "Entrar",
                cadastro: "Cadastrar",
                redefinir: "Enviar redefinição",
              }[modo]}
            </Button>
          </Form.Item>
        </Form>

        <Typography.Paragraph style={{ textAlign: "center" }}>
          {modo === "login" && (
            <>
              <a
                onClick={() => setModo("redefinir")}
                style={{
                  color: "#2a9d8f",
                  fontWeight: 500,
                  cursor: "pointer",
                  marginRight: 8,
                  display: "inline-block",
                }}
              >
                Esqueceu a senha?
              </a>
              <br />
              Ainda não tem conta?{" "}
              <a
                onClick={() => setModo("cadastro")}
                style={{
                  color: "#2a9d8f",
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                Cadastre-se
              </a>
            </>
          )}

          {modo === "cadastro" && (
            <>
              Já tem conta?{" "}
              <a
                onClick={() => setModo("login")}
                style={{ color: "#2a9d8f", fontWeight: 500, cursor: "pointer" }}
              >
                Faça login
              </a>
            </>
          )}

          {modo === "redefinir" && (
            <>
              Lembrou a senha?{" "}
              <a
                onClick={() => setModo("login")}
                style={{ color: "#2a9d8f", fontWeight: 500, cursor: "pointer" }}
              >
                Voltar para login
              </a>
            </>
          )}
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
