import React from 'react';
import { Button, Result } from 'antd';

const ErrorPage404: React.FC = () => (
  <Result
    status="404"
    title="404"
    subTitle="Desculpe, a página que você visitou não existe."
    // extra={<Button type="primary">Back Home</Button>}
  />
);

export default ErrorPage404;