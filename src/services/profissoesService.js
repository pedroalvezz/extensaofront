import axios from "axios";

const API_URL = `${process.env.API_URL}/profissoes`;

export const getProfissoes = async (searchQuery = "") => {
  const response = await axios.get(`${API_URL}/`, {
    params: { search: searchQuery }, // Envia o termo de busca como parâmetro
  });
  return response.data;
};


// Função para criar uma profissão
export const createProfissao = async (profissao) => {
  try {
    const response = await axios.post(API_URL, profissao);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar profissão:", error);
    throw error;
  }
};

// Função para atualizar uma profissão
export const updateProfissao = async (id, profissao) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, profissao);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar profissão:", error);
    throw error;
  }
};

// Função para excluir uma profissão
export const deleteProfissao = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao excluir profissão:", error);
    throw error;
  }
};
