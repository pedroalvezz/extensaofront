import React from "react";
import { formatDinheiro } from "@/services/formatDinheiro";
import Swal from "sweetalert2";

export default function Table({
  data,
  onEdit,
  onDelete,
  highlightedRow,
  deletingRow,
}) {
  return (
    <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
      <thead className="bg-blue-600 text-white">
        <tr>
          <th className="px-4 py-2">Nome</th>
          <th className="px-4 py-2">Empresa</th>
          <th className="px-4 py-2">Salário</th>
          <th className="px-4 py-2">Ações</th>
        </tr>
      </thead>
      <tbody className="text-dark-500" style={{ fontFamily: "Fredoka, sans-serif", color: 'darkolivegreen' }}>
        {data.map((item, index) => (
          <tr
            key={item.id}
            className={`text-center transition-opacity duration-500 ${deletingRow === item.id
              ? "opacity-0"
              : highlightedRow === item.id
                ? "bg-green-100"
                : index % 2 === 0
                  ? "bg-gray-100"
                  : "bg-gray-50"
              }`}
          >
            <td className="px-4 py-2">{item.nome}</td>
            <td className="px-4 py-2">{item.empresa}</td>
            <td className="px-4 py-2">{formatDinheiro(item.salario)}</td>
            <td className="px-4 py-2">
              <button
                onClick={() =>
                  Swal.fire({
                    title: "Descrição",
                    text: item.descricao || "Sem descrição disponível",
                    icon: "info",
                    confirmButtonText: "Fechar",
                  })
                }
                className="text-gray-600 hover:text-gray-800 mr-2"
              >
                ℹ️
              </button>
              <button
                onClick={() => onEdit(item)}
                className="text-blue-500 hover:text-blue-700 mr-2"
              >
                ✏️
              </button>
              <button
                onClick={() => onDelete(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                🗑️
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
