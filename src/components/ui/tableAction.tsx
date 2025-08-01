import { Button, Checkbox, Popconfirm, Space, Switch, Tooltip } from 'antd';
import { BorderOuterOutlined, DeleteOutlined, DownloadOutlined, EditOutlined, LeftSquareOutlined, PlusOutlined, ReloadOutlined, SwapOutlined } from '@ant-design/icons';
import { useState } from 'react';

interface TableActionsProps {
  onSwitch?:()=>void;
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
  onSwitchDisbled?: boolean;
  onCheck?: (checked: boolean) => void; 
  checkedCheck?: boolean; 
}

export const TableActions = ({ onSwitch,onCreate, onRefresh,onExcel,onReturn,onEdit,onDelete,onDetail,onJoin,onCheck,checkedCheck, onJoinStatus,customButtons,onSwitchDisbled }: TableActionsProps) => {
    const [rotate, setRotate] = useState(0);
  return (
     
     <Space.Compact size='small' >
     
      {onDetail &&<Button type="text"  variant="text" icon={<Tooltip title="Detalhes"><BorderOuterOutlined /></Tooltip>} onClick={onDetail}></Button>}
      {onRefresh && <Button  type="link" variant="outlined" icon={<Tooltip title="Atualizar"><ReloadOutlined /></Tooltip>} onClick={onRefresh}></Button>}
      {onCreate && <Button type="text" variant="text" icon={<Tooltip title="Novo item"><PlusOutlined /></Tooltip>} onClick={onCreate}></Button>}
      {onExcel && <Button type="text" variant="text" icon={<Tooltip title="Download Excel"><DownloadOutlined /></Tooltip>} onClick={onExcel}></Button>}
      {onReturn && <Button type="text" variant="text" icon={<Tooltip title="Voltar"><LeftSquareOutlined /></Tooltip>} onClick={onReturn}></Button>}
      {onJoin && <Button type="text" variant="text" disabled={onJoinStatus} onMouseEnter={() => setRotate(90)}   onMouseLeave={() => setRotate(0)} icon={<Tooltip title="Vincular"><SwapOutlined rotate={rotate}/></Tooltip>} onClick={onJoin}></Button>}
      {onEdit && <Button type="text" variant="solid" icon={<Tooltip title="Editar"><EditOutlined  style={{color: '#005bac'}}/></Tooltip>} onClick={onEdit}></Button>}
      {onDelete && <Popconfirm title="Realmente deseja deletar esse registro?" okText="Sim" onConfirm={onDelete} cancelText="Não"><Button type="text"  variant="text" icon={<Tooltip title="Deletar"><DeleteOutlined style={{color: '#005bac'}}/></Tooltip>} ></Button></Popconfirm>}
      {onSwitch && <Button type="text" variant="solid" icon={<Tooltip title="Status"><Switch size="small" checked={onSwitchDisbled} onChange={onSwitch}  style={{transform: 'scale(0.75)',marginLeft: 4}} /></Tooltip>}></Button>}
      {onCheck !== undefined && (  <Tooltip title="Ativar">    <Checkbox      checked={checkedCheck}      onChange={(e) => onCheck?.(e.target.checked)}      style={{ marginLeft: 4 }}    />  </Tooltip>
)}
      {customButtons}
    </Space.Compact>
  );
};
