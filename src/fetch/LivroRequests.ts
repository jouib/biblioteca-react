// Importa as configurações do servidor a partir de um arquivo externo
import { SERVER_CFG } from "../appConfig";
import LivroDTO from "../interfaces/LivroInterface";

/**
 * Classe responsável por fazer as requisições relacionadas aos livros
 * Esta classe irá se comunicar com a API para listar, cadastrar, atualizar e remover livros
 */
class LivroRequests {

    private serverURL: string;          // URL base do servidor da API
    private routeListaLivros: string;   // Rota (endpoint) para buscar a lista de livros
    private routeCadastraLivro: string; // Rota para cadastrar um novo livro
    private routeAtualizaLivro: string; // Rota para atualizar os dados de um livro
    private routeRemoveLivro: string;   // Rota para remover um livro

    /**
     * O construtor é chamado automaticamente quando criamos uma nova instância da classe.
     * Ele define os valores iniciais das variáveis com base nas configurações da API.
     */
    constructor() {
        this.serverURL = SERVER_CFG.SERVER_URL;         // Endereço do servidor web
        this.routeListaLivros = SERVER_CFG.ENDPOINT_LISTAR_LIVROS;        // Define a rota para listar os livrosO;
        this.routeCadastraLivro = SERVER_CFG.ENDPOINT_CADASTRAR_LIVRO;    // Define a rota para cadastrar livros
        this.routeAtualizaLivro = SERVER_CFG.ENDPOINT_LISTAR_LIVRO;    // Define a rota para atualizar livros
        this.routeAtualizaLivro = SERVER_CFG.ENDPOINT_ATUALIZAR_LIVRO;    // Define a rota para atualizar livros
        this.routeRemoveLivro = SERVER_CFG.ENDPOINT_REMOVER_LIVRO;        // Define a rota para remover livros
    }

    /**
     * Método que faz uma requisição à API para buscar a lista de livros cadastrados
     * @returns Retorna um JSON com a lista de livros ou null em caso de erro
     */
    async listarLivros(): Promise<LivroDTO | null> {
        const token = localStorage.getItem('token'); // recupera o token do localStorage
        try {
            // Faz a requisição GET para a rota da lista de livros
            const respostaAPI = await fetch(`${this.serverURL}${this.routeListaLivros}`, {
                headers: {
                    'x-access-token': `${token}`
                }
            });
        
            // Verifica se a resposta da API foi bem-sucedida (status 200-299)
            if(respostaAPI.ok) {
                // Converte a resposta para formato JSON
                const listaDeLivros: LivroDTO = await respostaAPI.json();

                // Retorna a lista de livros
                return listaDeLivros;
            }

            // retorna um valor nulo caso o servidor não envie a resposta
            return null;
        } catch (error) {
            // Caso ocorra algum erro (ex: servidor fora do ar), exibe no console
            console.error(`Erro ao fazer a consulta de livros: ${error}`);

            // Retorna null para indicar que a operação falhou
            return null;
        }
    }

    async consultarLivro(idLivro: number): Promise<LivroDTO | null> {
        const token = localStorage.getItem('token');
        try {
            const respostaAPI = await fetch(`
                ${this.serverURL}${this.routeListaLivros}?idLivro=${idLivro}`, {
                    headers: {
                        'x-access-token': `${token}`
                    }
                });
            if(respostaAPI.ok) {
                const livro: LivroDTO = await respostaAPI.json();
                return livro;
            } else {
                throw new Error('Não foi possível consultar o livro.');
            }
        } catch (error) {
            console.error(`Erro ao fazer a consulta do livro. ${error}`)
            return null;
        }
    }

    async enviaFormularioLivro(formLivro: string): Promise<boolean> {
        const token = localStorage.getItem('token'); // recupera o token do localStorage
        try {
            const respostaAPI = await fetch(`${this.serverURL}${this.routeCadastraLivro}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                },
                body: formLivro
            });

            if(!respostaAPI.ok) {
                throw new Error('Erro ao fazer requisição no servidor');
            }

            return true;
        } catch (error) {
            console.error(`Erro ao enviar o formulário. ${error}`);
            return false;
        }
    }

    async removerLivro(idLivro: number): Promise<boolean> {
        const token = localStorage.getItem('token');
        try {
            const respostaAPI = await fetch(`${this.serverURL}${this.routeRemoveLivro}?idLivro=${idLivro}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                    'x-access-token': `${token}`
                }
            });

            if(!respostaAPI.ok) {
                throw new Error('Erro ao fazer requisição à API.');
            }

            return true;
        } catch (error) {
            console.error(`Erro ao fazer solicitação. ${error}`);
            return false;
        }
    }

    async enviarFormularioAtualizacaoLivro(formLivro: LivroDTO): Promise<boolean> {
        const token = localStorage.getItem('token');

        try {
            const respostaAPI = await fetch(`${this.serverURL}${this.routeAtualizaLivro}
                ?idLivro=${formLivro.idLivro}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': `${token}`
                    },
                    body: JSON.stringify(formLivro)
                });

            if(!respostaAPI.ok) {
                throw new Error('Erro ao fazer requisição com o servidor.');
            }

            return true;
        } catch (error) {
            console.error(`Erro ao enviar requisição. ${error}`);
            return false;
        }
    }
}

// Exporta a classe já com um objeto instanciado para ser usado diretamente
export default new LivroRequests();
