import { JSX, useState, useEffect } from "react";
import estilo from './FormEmprestimo.module.css';
import AlunoDTO from "../../../interfaces/AlunoInterface";
import AlunoRequests from "../../../fetch/AlunoRequests";
import LivroDTO from "../../../interfaces/LivroInterface";
import LivroRequests from "../../../fetch/LivroRequests";
import { STATUS_EMPRESTIMO } from "../../../appConfig";
import EmprestimoRequests from "../../../fetch/EmprestimoRequests";

function FormEmprestimo(): JSX.Element {
    const [statusEmprestimo, setStatusEmprestimo] = useState<string[]>([]);
    const [alunos, setAlunos] = useState<AlunoDTO[]>([]);
    const [livros, setLivros] = useState<LivroDTO[]>([]);
    const [formData, setFormData] = useState({
        idAluno: 0,
        idLivro: 0,
        dataEmprestimo: new Date().toISOString().slice(0, 10),
        dataDevolucao: '',
        statusEmprestimo: ''
    });

    useEffect(() => {
        /* Função para buscar informações dos alunos */
        const fetchAlunos = async () => {
            try {
                const alunos: AlunoDTO[] | AlunoDTO | null = await AlunoRequests.listarAlunos();
                setAlunos(alunos ? (Array.isArray(alunos) ? alunos : [alunos]) : []);
            } catch (error) {
                console.error(`Erro ao recuperar lista de alunos. ${error}`);
                alert("Erro ao recuperar lista de alunos");
            }
        }

        const fetchLivros = async () => {
            try {
                const livros: LivroDTO[] | LivroDTO | null = await LivroRequests.listarLivros();
                setLivros(livros ? (Array.isArray(livros) ? livros : [livros]) : []);
            } catch (error) {
                console.error(`Erro ao recuperar lista de livros.${error}`);
                alert("Erro ao recuperar lista de livros");
            }
        }

        fetchAlunos();
        fetchLivros();
        setStatusEmprestimo(Object.values(STATUS_EMPRESTIMO));
    }, []);

    /**
     * Função para enviar o formulário
     */
    const handleSubmit = async (formData: {
        idAluno: number, idLivro: number, dataEmprestimo: string, dataDevolucao: string,
        statusEmprestimo: string
    }) => {
        if(new Date(formData.dataDevolucao) <= new Date(formData.dataEmprestimo)) {
            alert("A data de devolução não deve ser anterior à data de empréstimo.");
            return;
        }

        const resposta = await EmprestimoRequests.enviaFormularioEmprestimo(formData);
        resposta ?
            alert("Empréstimo cadastrado com sucesso!") :
            alert("Erro ao cadastrar o empréstimo")
    }

    const handleChange = (e: any) => {
        const { nome, valor } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [nome]: valor
        }));
    }

    return (
        <section className={estilo['sec-form-emprestimo']}>
            <h1>Cadastro de Empréstimo</h1>

            <form action="" method="post"
                className={estilo['form-emprestimo']}
                onSubmit={(e) => { e.preventDefault(); handleSubmit(formData) }}>

                {/* SELECT e OPTIONS */}
                <label htmlFor="">
                    Aluno
                    <select 
                        value={formData.idAluno}
                        onChange={handleChange}
                        name="idAluno"
                        required
                        >
                        {/* Montando as OPTIONS */}
                        <option value="">Selecione o aluno</option>
                        {alunos.map(aluno => (
                            <option key={aluno.idAluno} value={aluno.idAluno}>
                                {aluno.nome} {aluno.sobrenome} {aluno.ra}
                            </option>
                        ))}
                    </select>
                </label>

                <label htmlFor="">
                    Livro
                    <select 
                        value={formData.idLivro}
                        onChange={handleChange}
                        name="idLivro"
                        required>
                        <option value="">Selecione o livro</option>
                        {livros.map(livro => (
                            <option key={livro.idLivro} value={livro.idLivro}>
                                {livro.titulo}
                            </option>
                        ))}
                    </select>
                </label>

                <label htmlFor="">
                    Data do empréstimo
                    <input
                        type="date"
                        name="dataEmprestimo"
                        id="dataEmprestimo"
                        value={formData.dataEmprestimo}
                        onChange={handleChange}
                        required />
                </label>

                <label htmlFor="">
                    Data da devolução
                    <input
                        type="date"
                        name="dataDevolucao"
                        id="dataDevolucao"
                        value={formData.dataDevolucao}
                        onChange={handleChange}
                        required />
                </label>

                <label htmlFor="">
                    Status do empréstimo
                    <select 
                        value={formData.statusEmprestimo}
                        onChange={handleChange}
                        name="statusEmprestimo"
                        required
                    >
                        <option value="">Selecione o status do empréstimo</option>
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

export default FormEmprestimo;