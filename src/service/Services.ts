import axios from "axios";

const API = axios.create({
    baseURL: 'http://localhost:8080'
})

export const buscar = async (url: string, setDados: Function, header: Object) => {
    const res = await API.get(url, header)
    setDados(res.data);
}

export const cadastrar = async (url: string, dados: Object, setDados: Function, header: Object) => {
    const res = await API.post(url, dados, header)
    setDados(res.data);
}

export const atualizar = async (url: string, dados: Object, setDados: Function, header: Object) => {
    const res = await API.put(url, dados, header)
    setDados(res.data);
}

export const deletar = async(url: string, header: Object) => {
    await API.delete(url, header)
}