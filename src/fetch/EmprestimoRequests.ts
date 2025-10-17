// Importa as configurações do servidor (como a URL base da API)
import { SERVER_CFG } from "../appConfig";
import EmprestimoDTO from "../interfaces/EmprestimoInterface";

/**
 * Classe responsável por fazer as requisições da entidade Empréstimo.
 * Com essa classe, conseguimos listar, cadastrar, atualizar e remover empréstimos no sistema.
 */
class EmprestimoRequests {

    private serverURL: string;                  // Variável para o endereço do servidor
    private routeListaEmprestimos: string;      // Variável para a rota de listagem de empréstimos
    private routeCadastraEmprestimo: string;    // Variável para a rota de cadastro de empréstimo
    private routeAtualizaEmprestimo: string;    // Variável para a rota de atualiação de emprestimo
    private routeRemoveEmprestimo: string;      // Variável para a rota de remoção do empréstimo

    /**
     * O construtor é executado automaticamente quando a classe é instanciada.
     * Ele define as rotas e configurações iniciais, com base na configuração do servidor.
     */
    constructor() {
        this.serverURL = SERVER_CFG.SERVER_URL;               // Endereço do servidor web
        this.routeListaEmprestimos = SERVER_CFG.ENDPOINT_LISTAR_EMPRESTIMOS;    // Rota para buscar todos os empréstimos
        this.routeCadastraEmprestimo = SERVER_CFG.ENDPOINT_CADASTRAR_EMPRESTIMO;    // Rota para cadastrar um novo empréstimo
        this.routeAtualizaEmprestimo = SERVER_CFG.ENDPOINT_ATUALIZAR_EMPRESTIMO;// Rota para atualizar um empréstimo existente
        this.routeRemoveEmprestimo = SERVER_CFG.ENDPOINT_REMOVER_EMPRESTIMO;    // Rota para remover um empréstimo
    }

    /**
     * Método assíncrono que faz uma requisição GET para a API buscando todos os empréstimos cadastrados.
     * @returns Um objeto JSON contendo a lista de empréstimos, ou null em caso de erro
     */
    async listarEmprestimos(): Promise<EmprestimoDTO | null> {
        const token = localStorage.getItem('token'); // recupera o token do localStorage
        try {
            // Envia a requisição para a rota de listagem de empréstimos
            const respostaAPI = await fetch(`${this.serverURL}${this.routeListaEmprestimos}`, {
                headers: {
                    'x-access-token': `${token}`
                }
            });

            // Verifica se a resposta foi bem-sucedida (status HTTP 200-299)
            if (respostaAPI.ok) {
                // Converte a resposta em JSON
                const listaDeEmprestimos: EmprestimoDTO = await respostaAPI.json();

                // Retorna a lista obtida
                return listaDeEmprestimos;
            }

            // retorna um valor nulo caso o servidor não envie a resposta
            return null;
        } catch (error) {
            // Exibe o erro no console, útil para depuração
            console.error(`Erro ao fazer a consulta de livros: ${error}`);

            // Retorna null em caso de falha
            return null;
        }
    }

    async consultarEmprestimo(idEmprestimo: number): Promise<EmprestimoDTO | null> {
        const token = localStorage.getItem('token'); 
        try {
            const respostaAPI = await fetch(`
                ${this.serverURL}${this.routeListaEmprestimos}?idEmprestimo=${idEmprestimo}`, {
                    headers: {
                        'x-access-token': `${token}`
                    }
                });
                
            if(respostaAPI.ok) {
                const emprestimo: EmprestimoDTO = await respostaAPI.json();
                return emprestimo;
            } else {
                throw new Error('Não foi possível consultar o emprestimo.');
            }
        } catch (error) {
             console.error(`Erro ao fazer a consulta do emprestimo. ${error}`);
             return null;
        }
    }

    async enviaFormularioEmprestimo(formData: object): Promise<boolean> {
        const token = localStorage.getItem("token");
        try {
            const respostaAPI = await fetch(`${this.serverURL}${this.routeCadastraEmprestimo}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                        'x-access-token': `${token}`
                    },
                    body: JSON.stringify(formData)
                }
            );

            if(!respostaAPI.ok) {
                throw new Error("Erro ao fazer a requisição com o servidor.");
            }

            return true;
        } catch (error) {
            console.error(`Erro ao enviar o formulário. ${error}`);
            return false;
        }
    }

    async removerEmprestimo(idEmprestimo: number): Promise<boolean> {
        const token = localStorage.getItem('token');
        try {
            const respostaAPI = await fetch(`${this.serverURL}${this.routeRemoveEmprestimo}?idEmprestimo=${idEmprestimo}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                    'x-access-token': `${token}`
                }
            });

            if(!respostaAPI.ok) {
                throw new Error('Erro ao fazer requisição no servidor');
            }

            return true;
        } catch (error) {
            console.error(`Erro ao fazer solicitação. ${error}`);
            return false;
        }
    }

    async enviarFormularioAtualizacaoEmprestimo(formEmprestimo: EmprestimoDTO): Promise<boolean> {
        const token = localStorage.getItem('token');

        try {
            const respostaAPI = await fetch(`${this.serverURL}${this.routeAtualizaEmprestimo}
                ?idEmprestimo=${formEmprestimo.idEmprestimo}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': `${token}`
                    },
                    body: JSON.stringify(formEmprestimo)
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

// Exporta a classe já instanciada, pronta para ser utilizada em outras partes do sistema
export default new EmprestimoRequests();