import Categoria from "./Categoria";

export default interface Produto {
    id: number;
    nome: string;
    quantidade: Number;
    preco: Number;
    data: string;
    categoria?: Categoria | null;
}
