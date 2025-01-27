import Categoria from "../../../models/Categoria";
import { Link } from "react-router-dom";

interface CardCategoriaProps {
  categoria: Categoria;
}
export const CardCategoria = ({ categoria }: CardCategoriaProps) => {
  return (
    <>
      <div className="border flex flex-col rounded-2xl overflow-hidden justify-between">
        <header className="py-2 px-6 bg-indigo-400 text-white font-bold text-2xl">
          Categoria
        </header>
        <p className="p-8 text-3xl font-normal bg-slate-100 h-full">
          {categoria.descricao}
        </p>

        <div className="flex">
          <Link
            to="/editarCategoria/:id"
            className="w-full text-slate-100 bg-indigo-400 hover:bg-indigo-600 
    flex items-center justify-center py-2 duration-700"
          >
            <button>Editar</button>
          </Link>

          <Link
            to="/deletarCategoria/:id"
            className="text-slate-100 bg-red-400 hover:bg-red-600 w-full 
		flex items-center justify-center duration-700"
          >
            <button>Deletar</button>
          </Link>
        </div>
      </div>
    </>
  );
};
