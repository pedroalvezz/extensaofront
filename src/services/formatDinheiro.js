export const formatDinheiro = (valor) => {
    const numericValue =  +valor;

    if (isNaN(numericValue)) {
      return "R$ 0,00"; // Retorna um valor padrão em caso de entrada inválida
    }
  
    return numericValue.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
};