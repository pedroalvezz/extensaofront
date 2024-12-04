import React from "react";
import { NumericFormat } from "react-number-format";

export default function Modal({
  isOpen,
  closeModal,
  onSubmit,
  formData,
  handleChange,
  isEditing,
}) {
  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-white p-6 rounded shadow-lg max-w-md w-full transform transition-transform duration-300 ${
          isOpen ? "scale-100" : "scale-95"
        }`}
      >
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          {isEditing ? "Editar Profissão" : "Cadastrar Profissão"}
        </h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            name="nome"
            placeholder="Nome"
            value={formData.nome}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded text-gray-800"
            required
          />
          <textarea
            name="descricao"
            placeholder="Descrição"
            value={formData.descricao}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded text-gray-800"
          ></textarea>
          <NumericFormat
            name="salario"
            value={formData.salario}
            onValueChange={(values) => {
              const { formattedValue } = values;
              handleChange({ target: { name: "salario", value: formattedValue } });
            }}
            thousandSeparator="."
            decimalSeparator=","
            prefix="R$ "
            placeholder="Salário"
            className="w-full px-3 py-2 border rounded text-gray-800"
            required
          />
          <input
            name="empresa"
            placeholder="Empresa"
            value={formData.empresa}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded text-gray-800"
            required
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
