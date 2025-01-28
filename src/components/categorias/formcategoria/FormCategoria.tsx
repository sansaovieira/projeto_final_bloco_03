import { ChangeEvent, useEffect, useState } from "react";
import Categoria from "../../../models/Categoria";
import { useNavigate, useParams } from "react-router-dom";
import { atualizar, buscar, cadastrar } from "../../../service/Services";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { RotatingLines } from "react-loader-spinner";

export const FormCategoria = () => {
  const [categoria, setCategoria] = useState<Categoria>({} as Categoria);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  async function buscarPorId(id: string) {
    try {
      await buscar(`/categorias/${id}`, setCategoria, {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error: any) {
      if (error.toString().includes("403")) {
        navigate("/");
      } else {
        ToastAlerta("Erro ao carregar a categoria.", "erro");
      }
    }
  }

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setCategoria({
      ...categoria,
      [e.target.name]: e.target.value,
    });
  }

  function retornar() {
    navigate("/categorias");
  }

  async function gerarNovaCategoria(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (id !== undefined) {
        await atualizar(`/categorias/${id}`, categoria, setCategoria, {
          headers: { "Content-Type": "application/json" },
        });
        ToastAlerta("A Categoria foi atualizada com sucesso!", "sucesso");
      } else {
        await cadastrar(`/categorias`, categoria, setCategoria, {
          headers: { "Content-Type": "application/json" },
        });
        ToastAlerta("A Categoria foi cadastrada com sucesso!", "sucesso");
      }
    } catch (error: any) {
      if (error.toString().includes("403")) {
        navigate("/");
      } else {
        ToastAlerta("Erro ao atualizar ou cadastrar a categoria.", "erro");
      }
    }

    setIsLoading(false);
    retornar();
  }

  return (
    <div className="container flex flex-col items-center justify-center mx-auto">
      <h1 className="text-4xl text-center my-8">
        {id === undefined ? "Cadastrar Categoria" : "Editar Categoria"}
      </h1>

      <form className="w-1/2 flex flex-col gap-4" onSubmit={gerarNovaCategoria}>
        <div className="flex flex-col gap-2">
          <label htmlFor="descricao">Descrição da Categoria</label>
          <input
            type="text"
            placeholder="Descreva aqui a Categoria"
            name="descricao"
            className="bmt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-violet-500 focus:ring-1 focus:violet-500"
            value={categoria.descricao || ""}
            onChange={atualizarEstado}
          />
        </div>
        <button
          className="mx-auto rounded-full w-1/2 text-white bg-green-700 hover:bg-green-900 py-2 flex justify-center duration-700"
          type="submit"
        >
          {isLoading ? (
            <RotatingLines
              strokeColor="white"
              strokeWidth="5"
              animationDuration="0.75"
              width="24"
              visible={true}
            />
          ) : (
            <span>{id === undefined ? "Cadastrar" : "Atualizar"}</span>
          )}
        </button>
      </form>
    </div>
  );
};
