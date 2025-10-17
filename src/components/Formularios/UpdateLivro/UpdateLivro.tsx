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
        valorAquisicao: ''
    });

    // Busca as informações do livro para preencher o formulário
    useEffect(() => {
        const fetchLivro = async () => {
            try {
                const livro = await LivroRequests.consultarLivro(idLivro);
                if (livro) {
                    setFormData({
                        idLivro: formData.idLivro,
                        titulo: livro.titulo || '',
                        autor: livro.autor || '',
                        editora: livro.editora || '',
                        anoPublicacao: livro.anoPublicacao || '',
                        isbn: livro.isbn || '',
                        quantTotal: Number(livro.quantTotal) || 0,
                        quantDisponivel: Number(livro.quantDisponivel) || 0,
                        valorAquisicao: livro.valorAquisicao || ''
                    });
                }
            } catch (error) {
                console.error(`Erro ao buscar dados do livro: ${error}`);
            }
        };

        fetchLivro();
    }, [idLivro]);

    // Função para atualizar o state
    const handleChange = (nome: string, valor: string) => {
    const numFields = ["quantTotal", "quantDisponivel", "valorAquisicao"];
    setFormData({ ...formData, [nome]: numFields.includes(nome) ? Number(valor) : valor });
};

    // Envia o formulário
    const handleSubmit = async (formData: { idLivro: number; titulo: string; autor: string; editora: string; anoPublicacao: string; isbn: string; quantTotal: number; quantDisponivel: number; valorAquisicao: string}) => {
        const formDataToSend = {
            ...formData,
            quantTotal: Number(formData.quantTotal) || 0,
            quantDisponivel: Number(formData.quantDisponivel) || 0,
        };
        
        const resposta = await LivroRequests.enviarFormularioAtualizacaoLivro(formDataToSend);

        if (resposta) {
            alert('Livro atualizado com sucesso.');
        } else {
            alert('Erro ao atualizar livro.');
        }
    };

    return (
        <section className={estilo['sec-form-aluno']}>
            <h1>Atualizar Livro</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(formData);
                }}
                className={estilo['form-aluno']}
            >
                <div className={estilo['input-group']}>
                    <label>
                        Título
                        <input
                            type="text"
                            value={formData.titulo}
                            required
                            onChange={(e) => handleChange("titulo", e.target.value)}
                        />
                    </label>

                    <label>
                        Autor
                        <input
                            type="text"
                            value={formData.autor}
                            required
                            onChange={(e) => handleChange("autor", e.target.value)}
                        />
                    </label>
                </div>

                <div className={estilo['input-group']}>
                    <label>
                        Editora
                        <input
                            type="text"
                            value={formData.editora}
                            required
                            onChange={(e) => handleChange("editora", e.target.value)}
                        />
                    </label>

                    <label>
                        Ano de Publicação
                        <input
                            type="text"
                            value={formData.anoPublicacao || 0}
                            onChange={(e) => handleChange("anoPublicacao", e.target.value)}
                        />
                    </label>
                </div>

                <div className={estilo['input-group']}>
                    <label>
                        ISBN
                        <input
                            type="text"
                            value={formData.isbn}
                            onChange={(e) => handleChange("isbn", e.target.value)}
                        />
                    </label>

                    <label>
                        Quantidade Total
                        <input
                            type="number"
                            value={formData.quantTotal}
                            required
                            onChange={(e) => handleChange("quantTotal", e.target.value)}
                        />
                    </label>
                </div>

                <div className={estilo['input-group']}>
                    <label>
                        Quantidade Disponível
                        <input
                            type="number"
                            value={formData.quantDisponivel}
                            required
                            onChange={(e) => handleChange("quantDisponivel", e.target.value)}
                        />
                    </label>

                    <label>
                        Valor da Aquisição
                        <input
                            type="number"
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
