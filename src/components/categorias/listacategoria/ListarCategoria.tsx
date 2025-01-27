import Categoria from "../../../models/Categoria";
import { buscar } from "../../../service/Services";
import { useEffect, useState } from "react";
import { DNA } from "react-loader-spinner";
import { CardCategoria } from "../cardcategoria/CardCategoria";
import { useNavigate } from "react-router-dom";

export const ListarCategoria = () => {
  const navigate = useNavigate();
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const buscarCategoria = async () => {
    try {
      await buscar(`/categorias`, setCategorias, {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error: any) {
      navigate("/");
    }
  };

  useEffect(() => {
    buscarCategoria();
  }, [categorias.length]);

  return (
    <>
      {categorias.length === 0 && (
        <DNA
          visible={true}
          height="200"
          width="200"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper mx-auto"
        />
      )}
      <div className="flex justify-center w-full my-4">
        <div className="container flex flex-col">
          <div
            className="grid grid-cols-1 md:grid-cols-2 
                                    lg:grid-cols-3 gap-8"
          >
            {categorias.map((categoria) => (
              <CardCategoria key={categoria.id} categoria={categoria} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
