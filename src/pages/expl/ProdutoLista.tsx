import { useEffect, useState } from 'react';
import { Input, Select, Space, Form, Row, Col } from 'antd';
import { BaseLayout } from '../../components/layout/BaseLayout';
import { PageActions } from '../../components/layout/PageActions';
import { SectionCard } from '../../components/ui/SectionCard';
import { StandardTable } from '../../components/table/StandardTable';
import type { ColumnsType } from 'antd/es/table';

interface Produto {
  id: number;
  nome: string;
  codigo: string;
  categoria: string;
}

const categoriasMock = ['Eletrônico', 'Limpeza', 'Alimento'];

const produtosMock: Produto[] = [
  { id: 1, nome: 'Mouse Gamer', codigo: '001', categoria: 'Eletrônico' },
  { id: 2, nome: 'Sabão em pó', codigo: '002', categoria: 'Limpeza' },
  { id: 3, nome: 'Arroz 5kg', codigo: '003', categoria: 'Alimento' },
];

export const ProdutoLista = () => {
  const [data, setData] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(false);
  const [filtros, setFiltros] = useState({ busca: '', categoria: '' });

  const handleBuscar = () => {
    setLoading(true);
    setTimeout(() => {
      let resultado = produtosMock;

      if (filtros.busca) {
        resultado = resultado.filter(p =>
          p.nome.toLowerCase().includes(filtros.busca.toLowerCase())
        );
      }

      if (filtros.categoria) {
        resultado = resultado.filter(p => p.categoria === filtros.categoria);
      }

      setData(resultado);
      setLoading(false);
    }, 500); // simula requisição
  };

  useEffect(() => {
    handleBuscar();
  }, []);

  const handleInputChange = (changedValues: any) => {
    setFiltros(prev => ({ ...prev, ...changedValues }));
  };

  const handleAtualizar = () => {
    handleBuscar();
  };

  const columns: ColumnsType<Produto> = [
    { title: 'Nome', dataIndex: 'nome', key: 'nome' },
    { title: 'Código', dataIndex: 'codigo', key: 'codigo' },
    { title: 'Categoria', dataIndex: 'categoria', key: 'categoria' },
    {
      title: 'Ações',
      key: 'acoes',
      render: (_, record) => <a onClick={() => alert(record.id)}>Editar</a>,
    },
  ];

  return (
    <BaseLayout
      title="Lista de Produtos"
      breadcrumb={['Início', 'Produtos']}
      actions={
        <PageActions
          onCreate={() => alert('Novo produto')}
          onRefresh={handleAtualizar}
        />
      }
    >
      <SectionCard title="Filtros de Busca">
        <Form layout="vertical" onValuesChange={handleInputChange}>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="Buscar por nome" name="busca">
                <Input placeholder="Ex: arroz" allowClear />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Categoria" name="categoria">
                <Select placeholder="Todas" allowClear>
                  {categoriasMock.map(cat => (
                    <Select.Option key={cat} value={cat}>
                      {cat}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8} style={{ display: 'flex', alignItems: 'flex-end' }}>
              <Space>
                <button onClick={handleBuscar} className="ant-btn ant-btn-primary">Filtrar</button>
              </Space>
            </Col>
          </Row>
        </Form>
      </SectionCard>

      <SectionCard title="Produtos Cadastrados">
        <StandardTable
          columns={columns}
          dataSource={data}
          loading={loading}
        />
      </SectionCard>
    </BaseLayout>
  );
};
