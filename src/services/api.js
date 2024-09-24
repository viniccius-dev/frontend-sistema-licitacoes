import axios from "axios";

export const api = axios.create({
    baseURL: "https://backend-sistema-licitacoes.onrender.com"
});