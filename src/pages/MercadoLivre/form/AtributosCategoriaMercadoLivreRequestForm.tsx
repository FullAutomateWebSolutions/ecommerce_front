import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Categoria = {
  id: string;
  name: string;
};

type Props = {
  onCategoriaSelecionada: (categoria: Categoria) => void;
};

export const CategoriaMeliForm = ({ onCategoriaSelecionada }: Props) => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string>('');

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get<Categoria[]>(
          'https://api.mercadolibre.com/sites/MLB/categories',
          {
            headers: {
              Authorization:
                'Bearer APP_USR-2668378137203164-073119-6f6bd7973146fdaa5acf2505ef94a411-130928655',
            },
          }
        );
        setCategorias(response.data);
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      }
    };

    fetchCategorias();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoriaId = e.target.value;
    setCategoriaSelecionada(categoriaId);

    const categoria = categorias.find((cat) => cat.id === categoriaId);
    if (categoria) {
      onCategoriaSelecionada(categoria);
    }
  };

  return (
    <form>
      <label htmlFor="categoria">Categoria:</label>
      <select
        id="categoria"
        value={categoriaSelecionada}
        onChange={handleChange}
      >
        <option value="">Selecione uma categoria</option>
        {categorias.map((categoria) => (
          <option key={categoria.id} value={categoria.id}>
            {categoria.name}
          </option>
        ))}
      </select>
    </form>
  );
};
