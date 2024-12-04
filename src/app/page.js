"use client";

import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Modal from "@/components/Modal";
import Table from "@/components/Table";

import {
  getProfissoes,
  createProfissao,
  updateProfissao,
  deleteProfissao,
} from "@/services/profissoesService";

export default function ProfissoesPage() {
  const [profissoes, setProfissoes] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [highlightedRow, setHighlightedRow] = useState(null);
  const [deletingRow, setDeletingRow] = useState(null);
  const [editingProfissao, setEditingProfissao] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    salario: "",
    empresa: "",
  });

  useEffect(() => {
    fetchProfissoes();
  }, []);

  const filterProfissoes = async () => {
    try {
      Swal.fire({
        icon: "info",
        title: "Buscando profissões...",
        showConfirmButton: false,
        didOpen: () => Swal.showLoading()
      });
      const data = await getProfissoes(searchQuery);
      setProfissoes(data);
      Swal.close();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Erro ao carregar as profissões.",
      });
    }
  };

  const fetchProfissoes = async () => {
    try {
      const data = await getProfissoes();
      setProfissoes(data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Erro ao carregar as profissões.",
      });
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const openModal = (profissao = null) => {
    setEditingProfissao(profissao);
    setForm(
      profissao || { nome: "", descricao: "", salario: "", empresa: "" }
    );
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingProfissao(null);
  };

  const saveProfissao = async (e) => {
    e.preventDefault();
    try {
      // Remover a formatação do salário antes de enviar à API
      const salarioFloat = parseFloat(
        form.salario.replace(/[R$.\s]/g, "").replace(",", ".")
      );
  
      const payload = {
        ...form,
        salario: salarioFloat, // Salário convertido para número
      };
  
      if (editingProfissao) {
        await updateProfissao(editingProfissao.id, payload);
        Swal.fire("Sucesso", "Profissão atualizada com sucesso!", "success");
      } else {
        const newProfissao = await createProfissao(payload);
        Swal.fire("Sucesso", "Profissão cadastrada com sucesso!", "success");
        setHighlightedRow(newProfissao.id);
        setTimeout(() => setHighlightedRow(null), 3000);
      }
      closeModal();
      fetchProfissoes();
    } catch (error) {
      Swal.fire("Erro", "Erro ao salvar a profissão!", "error");
    }
  };
  

  const deleteProfissaoHandler = async (id) => {
    Swal.fire({
      title: "Tem certeza?",
      text: "Você não poderá reverter esta ação!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sim, excluir!",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setDeletingRow(id);
        setTimeout(async () => {
          await deleteProfissao(id);
          Swal.fire("Deletado!", "Profissão excluída com sucesso!", "success");
          setDeletingRow(null);
          fetchProfissoes();
        }, 500);
      }
    });
  };

  if (profissoes === null) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-xl font-bold">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 to-blue-50">
      <div className="max-w-4xl mx-auto py-10 px-4">
        <link
          href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;600&display=swap"
          rel="stylesheet"
        />
        <h1
          className="text-4xl font-bold text-center mb-6 text-gray-800"
          style={{ fontFamily: "Fredoka, sans-serif" }}
        >
          Gerenciamento de Profissões
        </h1>
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => openModal()}
            className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700"
          >
            Cadastrar Profissão
          </button>
          {/* Filtro de Pesquisa */}
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Pesquisar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 border rounded-l w-64"
              style={{ fontFamily: "Fredoka, sans-serif",color:'darkmagenta'}}
            />
            <button
              onClick={filterProfissoes}
              className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700"
            >
              Buscar
            </button>
          </div>
        </div>
        <Table
          data={profissoes}
          onEdit={openModal}
          onDelete={deleteProfissaoHandler}
          highlightedRow={highlightedRow}
          deletingRow={deletingRow}
        />
        <Modal
          isOpen={modalOpen}
          closeModal={closeModal}
          onSubmit={saveProfissao}
          formData={form}
          handleChange={handleChange}
          isEditing={!!editingProfissao}
        />
      </div>
    </div>
  );  
}
