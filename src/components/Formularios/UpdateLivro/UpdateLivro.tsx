import { JSX, useEffect, useState } from "react";
import estilo from './UpdateLivro.module.css';
import LivroRequests from "../../../fetch/LivroRequests";

function UpdateLivro({ idLivro }: { idLivro: number }): JSX.Element {

    const [formData, setFormData] = useState({
        idLivro: idLivro,
        titulo: '',
        autor: '',
        editora: '',
        anoPublicacao: '',
        isbn: '',
        quantTotal: 0,
        quantDisponivel: 0,
        valorAquisicao: '',
        statusLivroEmprestado: ''
    });

    // Busca as informações do aluno para preencher o formulário
    useEffect(() => {
        const fetchLivros = async () => {
            try {
                const livro = await LivroRequests.consultarLivro(formData.idLivro);
                if (livro) {
                    setFormData({
                        idLivro: idLivro,
                        titulo: livro.titulo || '',
                        autor: livro.autor || '',
                        editora: livro.editora || '',
                        anoPublicacao: livro.anoPublicacao || '',
                        isbn: livro.isbn || '',
                        quantTotal: livro.quantTotal || 0,
                        quantDisponivel: livro.quantDisponivel || 0,
                        valorAquisicao: livro.valorAquisicao || '',
                        statusLivroEmprestado: livro.statusLivroEmprestado || ''
                    });
                }

            } catch (error) {
                console.error(`Erro ao buscar dados do livro. ${error}`);
            }
        }

        fetchLivros();
    }, []);

    // Função para atualizar o state
    const handleChange = (nome: string, valor: string) => {
        setFormData({ ...formData, [nome]: valor });
    };

        // função para recuperar dados do formulário e enviar para a requisição
        const handleSubmit = async (formData: { idLivro: number; titulo: string; autor: string; editora: string; anoPublicacao: string; isbn: string; quantTotal: number; quantDisponivel:number; valorAquisicao:string, statusLivroEmprestado: string }) => {
            const formDataToSend = {
                ...formData,
                quantTotal: Number(formData.quantTotal) || 0,
                quantDisponivel: Number(formData.quantDisponivel) || 0,
                valorAquisicao: formData.valorAquisicao // keep as string
            }
            
            const resposta = await LivroRequests.enviarFormularioAtualizacaoLivro(formDataToSend);

            if (resposta) {
                alert('Aluno cadastrado com sucesso.');
            } else {
                alert('Erro ao cadastrar aluno.');
            }
        }

    return (
         <section className={estilo['sec-form-aluno']}>
    <h1>Atualizar Livro</h1>
    <form 
        action="" 
        onSubmit={(e) => { 
            e.preventDefault(); 
            handleSubmit(formData); 
        }} 
        className={estilo['form-aluno']}
    >
        <div className={estilo['input-group']}>
            <label htmlFor="">
                Título
                <input
                    type="text"
                    name="titulo"
                    id="titulo"
                    value={formData.titulo}
                    required
                    onChange={(e) => handleChange("titulo", e.target.value)} 
                />
            </label>

            <label htmlFor="">
                Autor
                <input
                    type="text"
                    name="autor"
                    id="autor"
                    value={formData.autor}
                    required
                    onChange={(e) => handleChange("autor", e.target.value)} 
                />
            </label>
        </div>

        <div className={estilo['input-group']}>
            <label htmlFor="">
                Editora
                <input
                    type="text"
                    name="editora"
                    id="editora"
                    value={formData.editora}
                    required
                    onChange={(e) => handleChange("editora", e.target.value)} 
                />
            </label>

            <label htmlFor="">
                Ano de Publicação
                <input
                    type="number"
                    name="anoPublicacao"
                    id="anoPublicacao"
                    value={formData.anoPublicacao}
                    onChange={(e) => handleChange("anoPublicacao", e.target.value)} 
                />
            </label>
        </div>

        <div className={estilo['input-group']}>
            <label htmlFor="">
                ISBN
                <input
                    type="text"
                    name="isbn"
                    id="isbn"
                    value={formData.isbn}
                    onChange={(e) => handleChange("isbn", e.target.value)} 
                />
            </label>

            <label htmlFor="">
                Quantidade Total
                <input
                    type="number"
                    name="quantTotal"
                    id="quantTotal"
                    value={formData.quantTotal}
                    required
                    onChange={(e) => handleChange("quantTotal", e.target.value)} 
                />
            </label>
        </div>

        <div className={estilo['input-group']}>
            <label htmlFor="">
                Quantidade Disponível
                <input
                    type="number"
                    name="quantDisponivel"
                    id="quantDisponivel"
                    value={formData.quantDisponivel}
                    required
                    onChange={(e) => handleChange("quantDisponivel", e.target.value)} 
                />
            </label>

            <label htmlFor="">
                Valor da Aquisição
                <input
                    type="number"
                    name="valorAquisicao"
                    id="valorAquisicao"
                    value={formData.valorAquisicao}
                    step={0.01}
                    onChange={(e) => handleChange("valorAquisicao", e.target.value)} 
                />
            </label>
        </div>

        <input type="submit" value="ENVIAR" />
    </form>
</section>

    );
}
export default UpdateLivro;