import React from 'react';
import { Button, Result } from 'antd';

const ErrorPage403: React.FC = () => (
  <Result
    status="403"
    title="403"
    subTitle="Desculpe, você não está autorizado a acessar esta página."
    // extra={<Button type="primary">Back Home</Button>}
  />
);

export default ErrorPage403;