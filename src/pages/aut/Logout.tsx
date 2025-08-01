import { loginStore } from "@/store/useStore";
import { Button, Space, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const Logout = () => {
   const navigate = useNavigate();
  const {logout}= loginStore();
  const handleLogout = async () => {
    try {
     await logout();
      navigate('/login');
    } catch (error) {

    }
  };
  return (
   <div style={{ padding: 24 }}>
      <Space direction="vertical" size="middle">
        <Button type="primary" danger onClick={() => handleLogout()}>
          Deslogar
        </Button>
      </Space>
    </div>
  )
}

export default Logout
