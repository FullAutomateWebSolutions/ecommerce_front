import { Button, Space } from 'antd';
import {
  BorderOuterOutlined,
  DownloadOutlined,
  EditOutlined,
  FilterOutlined,
  LeftSquareOutlined,
  PlusOutlined,
  ReloadOutlined,
  SaveOutlined,
  SwapOutlined,
} from '@ant-design/icons';

interface PageActionsProps {
  onCreate?: () => void;
  onRefresh?: () => void;
  onExcel?: () => void;
  onReturn?: () => void;
  onEdit?: () => void;
  onFilter?: () => void;
  onSave?: () => void;
  onDetail?: () => void;
  onJoin?: () => void;
  
  customButtons?: React.ReactNode;
  createText?: string;
  refreshText?: string;
  excelText?: string;
  returnText?: string;
  editText?: string;
  filterText?: string;
  saveText?: string;
  detailText?: string;
  onJoinText?: string;
}

export const PageActions = ({ 
   onCreate,  onRefresh,  onExcel,  onReturn,  onEdit,onFilter,onSave,onDetail,onJoin,
  customButtons,  
  createText = 'Novo',  refreshText = 'Atualizar',  excelText = 'Download Excel',  returnText = 'Voltar', onJoinText, editText = 'Editar',filterText = 'Editar',saveText="Salvar",detailText="Detalhes"
}: PageActionsProps) => {
  return (
    <Space>
      {onRefresh && (   <Button icon={<ReloadOutlined />} onClick={onRefresh}>          {refreshText}</Button>)}      
      {onCreate && (   <Button type="primary" icon={<PlusOutlined />} onClick={onCreate}>     {createText}</Button>)}
      {onExcel && (    <Button type="primary" icon={<DownloadOutlined />} onClick={onExcel}>   {excelText}</Button>)}
      {onReturn && (   <Button type="primary" icon={<LeftSquareOutlined />} onClick={onReturn}>{returnText}</Button>)}
      {onEdit && (     <Button type="primary" icon={<EditOutlined />} onClick={onEdit}>{editText}</Button>)}     
      {onSave && (     <Button type="primary" htmlType="submit" icon={<SaveOutlined />} onClick={onSave}>{saveText}</Button>)}
      {onDetail && (     <Button type="primary" htmlType="submit" icon={<BorderOuterOutlined />} onClick={onDetail}>{detailText}</Button>)}
      {onFilter && (     <Button type="primary"  htmlType="submit" icon={<FilterOutlined />} block onClick={onFilter}>{filterText}</Button>)}
      {onJoin && (     <Button type="primary"  htmlType="submit"   onClick={onJoin}>{onJoinText}</Button>)}


      {customButtons}
    </Space>
  );
};
