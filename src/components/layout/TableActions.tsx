import { Button, Popconfirm, Space, Tooltip } from 'antd';
import { BorderOuterOutlined, DeleteOutlined, DownloadOutlined, EditOutlined, LeftSquareOutlined, PlusOutlined, ReloadOutlined, SwapOutlined } from '@ant-design/icons';
import { useState } from 'react';

interface TableActionsProps {
  onCreate?: () => void;
  onRefresh?: () => void;
  onExcel?: () => void;
  onReturn?: () => void;
  onJoin?: () => void;
  onJoinStatus: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onDetail?: () => void;
  customButtons?: React.ReactNode;
}

export const TableActions = ({ onCreate, onRefresh,onExcel,onReturn,onEdit,onDelete,onDetail,onJoin, onJoinStatus,customButtons }: TableActionsProps) => {
    const [rotate, setRotate] = useState(0);
  return (
     
     <Space.Compact >
      {onDetail &&<Button type="text"  variant="text" icon={<Tooltip title="Detalhes"><BorderOuterOutlined /></Tooltip>} onClick={onDetail}></Button>}
      {onRefresh && <Button  type="link" variant="outlined" icon={<Tooltip title="Atualizar"><ReloadOutlined /></Tooltip>} onClick={onRefresh}></Button>}
      {onCreate && <Button type="text" variant="text" icon={<Tooltip title="Novo item"><PlusOutlined /></Tooltip>} onClick={onCreate}></Button>}
      {onExcel && <Button type="text" variant="text" icon={<Tooltip title="Download Excel"><DownloadOutlined /></Tooltip>} onClick={onExcel}></Button>}
      {onReturn && <Button type="text" variant="text" icon={<Tooltip title="Voltar"><LeftSquareOutlined /></Tooltip>} onClick={onReturn}></Button>}
      {onJoin && <Button type="text" variant="text" disabled={onJoinStatus} onMouseEnter={() => setRotate(90)}   onMouseLeave={() => setRotate(0)} icon={<Tooltip title="Vincular"><SwapOutlined rotate={rotate}/></Tooltip>} onClick={onJoin}></Button>}
      {onEdit && <Button type="text" variant="solid" icon={<Tooltip title="Editar"><EditOutlined /></Tooltip>} onClick={onEdit}></Button>}
      {onDelete && <Popconfirm title="Realmente deseja deletar esse registro?" okText="Sim" cancelText="Não"><Button type="text"  variant="text" icon={<Tooltip title="Deletar"><DeleteOutlined style={{color: 'red'}}/></Tooltip>} onClick={onDelete}></Button></Popconfirm>}
      
      {customButtons}
    </Space.Compact>
  );
};
