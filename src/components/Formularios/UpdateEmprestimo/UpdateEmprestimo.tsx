import { JSX, useEffect, useState } from "react";
import estilo from "./UpdateEmprestimo.module.css";
import EmprestimoRequests from "../../../fetch/EmprestimoRequests";

function UpdateEmprestimo({ idEmprestimo }: { idEmprestimo: number }): JSX.Element {
  const [formData, setFormData] = useState({
    idEmprestimo: idEmprestimo,
    idAluno: 0,
    idLivro: 0,
    dataEmprestimo: "",
    dataDevolucao: "",
    statusEmprestimo: "",
  });

  const [alunos, setAlunos] = useState<any[]>([]);
  const [livros, setLivros] = useState<any[]>([]);
  const [statusEmprestimo] = useState<string[]>([
    "Ativo",
    "Concluído",
    "Atrasado",
  ]);

  // Busca as informações do empréstimo para preencher o formulário
  useEffect(() => {
    const fetchEmprestimo = async () => {
      try {
        const emprestimo = await EmprestimoRequests.consultarEmprestimo(
          formData.idEmprestimo
        );
        if (emprestimo) {
          setFormData({
            idEmprestimo: idEmprestimo,
            idAluno: emprestimo.idAluno || 0,
            idLivro: emprestimo.idLivro || 0,
            dataEmprestimo: emprestimo.dataEmprestimo
              ? new Date(emprestimo.dataEmprestimo).toISOString().slice(0, 10)
              : "",
            dataDevolucao: emprestimo.dataDevolucao
              ? new Date(emprestimo.dataDevolucao).toISOString().slice(0, 10)
              : "",
            statusEmprestimo: emprestimo.statusEmprestimo || "",
          });
        }
      } catch (error) {
        console.error(`Erro ao buscar dados do empréstimo: ${error}`);
      }
    };

    fetchEmprestimo();
  }, [idEmprestimo]);

  // Função para atualizar o state
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Função para enviar o formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formDataToSend = {
        idEmprestimo: formData.idEmprestimo,
        aluno: { idAluno: formData.idAluno },
        livro: { idLivro: formData.idLivro },
        dataEmprestimo: formData.dataEmprestimo || undefined,
        dataDevolucao: formData.dataDevolucao || undefined,
        statusEmprestimo: formData.statusEmprestimo,
    };

    try {
      const resposta = await EmprestimoRequests.enviarFormularioAtualizacaoEmprestimo(
      formDataToSend
    );

      if (resposta) {
        alert("Empréstimo atualizado com sucesso.");
      } else {
        alert("Erro ao atualizar o empréstimo. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao enviar atualização de empréstimo:", error);
    }
  };

  return (
    <section className={estilo["sec-form-emprestimo"]}>
      <h1>Atualizar Empréstimo</h1>

      <form
        className={estilo["form-emprestimo"]}
        onSubmit={handleSubmit}
      >
        <label>
          Aluno
          <select
            value={formData.idAluno}
            onChange={handleChange}
            name="idAluno"
            required
          >
            <option value="">Selecione o aluno</option>
            {alunos.map((aluno) => (
              <option key={aluno.idAluno} value={aluno.idAluno}>
                {aluno.nome} {aluno.sobrenome} ({aluno.ra})
              </option>
            ))}
          </select>
        </label>

        <label>
          Livro
          <select
            value={formData.idLivro}
            onChange={handleChange}
            name="idLivro"
            required
          >
            <option value="">Selecione o livro</option>
            {livros.map((livro) => (
              <option key={livro.idLivro} value={livro.idLivro}>
                {livro.titulo}
              </option>
            ))}
          </select>
        </label>

        <label>
          Data do empréstimo
          <input
            type="date"
            name="dataEmprestimo"
            value={formData.dataEmprestimo}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Data da devolução
          <input
            type="date"
            name="dataDevolucao"
            value={formData.dataDevolucao}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Status do empréstimo
          <select
            value={formData.statusEmprestimo}
            onChange={handleChange}
            name="statusEmprestimo"
            required
          >
            <option value="">Selecione o status</option>
            {statusEmprestimo.map((status, id) => (
              <option key={id} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>

        <input type="submit" value="ENVIAR" />
      </form>
    </section>
  );
}
export default UpdateEmprestimo;