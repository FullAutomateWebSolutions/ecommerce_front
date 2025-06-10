import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { Card, Col, Progress, Row } from "antd";

import CPDashBoardGraphic from "../component/dashBoard.comp";

const DashBoard = () => {
  const { Meta } = Card;
  return (
    <Card style={{ margin: "16px 0", padding: 2 }} title={"Dashboard"}>
      <Row
        gutter={20}
        style={{
          width: "100%",
          alignItems: "center",
          display: "end",
          padding: "0 16px",
        }}
      >
        <Col span={6}>
          <CPDashBoardGraphic
            type="circle"
            status="success"
            title="Integrações com sucesso"
            description="Mensagens processadas e integradas no destino"
            percent={100}
            format={() => "150000"}
          />
        </Col>
        <Col span={6}>
          <Card
            className="hover-border-card"
            style={{ width: 300 }}
            cover={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "16px",
                }}
              >
                <Progress
                  type="dashboard"
                  status="normal"
                  percent={100}
                  format={() => `${300}`}
                />
              </div>
            }
            actions={[
              <SettingOutlined key="setting" />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Meta
              avatar={<WarningOutlined style={{ color: "blue" }} />}
              title="Reprocessamento Pendente"
              description="Mensagens aguardando tratativas"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card
            className="hover-border-card"
            style={{ width: 300 }}
            cover={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "16px",
                }}
              >
                <Progress
                  type="dashboard"
                  percent={100}
                  status="exception"
                  format={() => `${150000}`}
                />
              </div>
            }
            actions={[
              <SettingOutlined key="setting" />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Meta
              avatar={<CloseCircleOutlined style={{ color: "red" }} />}
              title="Falha de integração"
              description="Mesagens pendentes de atuação para integração."
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card
            className="hover-border-card"
            style={{ width: 300 }}
            cover={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "16px",
                }}
              >
                <Progress
                  type="dashboard"
                  percent={100}
                  status="exception"
                  format={() => `${150000}`}
                />
              </div>
            }
            actions={[
              <SettingOutlined key="setting" />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Meta
              avatar={<CloseCircleOutlined style={{ color: "red" }} />}
              title="Falha de integração"
              description="Mesagens pendentes de atuação para integração."
            />
          </Card>
        </Col>
      </Row>
      <Row
        gutter={20}
        style={{
          width: "100%",
          alignItems: "center",
          display: "end",
          padding: "0 16px",
        }}
      >
        <Col span={24}></Col>
      </Row>
    </Card>
  );
};

export default DashBoard;
