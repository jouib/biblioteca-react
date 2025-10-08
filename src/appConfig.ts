const API_SERVER_URL = import.meta.env.VITE_API_SERVER_URL;
//const API_SERVER_PORT = import.meta.env.VITE_API_SERVER_PORT;

/**
 * Configuração de todas as rotas da interface web
 * Todas os endereços das páginas devem ser inseridas em APP_ROUTES
 * Essas rotas serão refenciadas no componente AppRoutes que está no arquivo routes.tsx
 * e em qualquer página que tenha um link que faça o direcionamento para outra página ou componente
 */
export const APP_ROUTES = {
    ROUTE_HOME: '/',
    ROUTE_LOGIN: '/login',

    ROUTE_LISTAGEM_ALUNOS: '/alunos',
    ROUTE_LISTAGEM_EMPRESTIMOS: '/emprestimos',
    ROUTE_LISTAGEM_LIVROS: '/livros',

    ROUTE_CADASTRO_ALUNO: '/cadastro/aluno',
    ROUTE_CADASTRO_LIVRO: '/cadastro/livro',
    ROUTE_CADASTRO_EMPRESTIMO: '/cadastro/emprestimo',

    ROUTE_ATUALIZACAO_ALUNO: '/atualizar/aluno',
    ROUTE_ATUALIZACAO_LIVRO: '/atualizar/livro',
    ROUTE_ATUALIZACAO_EMPRESTIMO: '/atualizar/emprestimo',
}

/**
 * Configurações referente ao servidor da API
 * Todas as configurações referentes aos servidor web devem ser inseridas em SERVER_CFG
 * Todos os endereços configurados aqui são referentes as configurações do servidor web (backend)
 * Qualquer alteração nos endpoints, no endereço do servidor ou porta que forem feitas lá deve ser replicada aqui
 */
export const SERVER_CFG = {
    // endereço do servidor da API
    SERVER_URL: `${API_SERVER_URL}`,
    
    // endpoints de aluno
    ENDPOINT_LISTAR_ALUNOS: '/lista/alunos',
    ENDPOINT_CADASTRAR_ALUNO: '/novo/aluno',
    ENDPOINT_ATUALIZAR_ALUNO: '/atualiza/aluno',
    ENDPOINT_REMOVER_ALUNO: '/remove/aluno',

    // endpoints de livro
    ENDPOINT_LISTAR_LIVROS: '/lista/livros',
    ENDPOINT_CADASTRAR_LIVRO: '/novo/livro',
    ENDPOINT_ATUALIZAR_LIVRO: '/atualiza/livro',
    ENDPOINT_REMOVER_LIVRO: '/remove/livro',

    // endpoints de emprestimo
    ENDPOINT_LISTAR_EMPRESTIMOS: '/lista/emprestimos',
    ENDPOINT_CADASTRAR_EMPRESTIMO: '/novo/emprestimo',
    ENDPOINT_ATUALIZAR_EMPRESTIMO: '/atualiza/emprestimo',
    ENDPOINT_REMOVER_EMPRESTIMO: '/remove/emprestimo',

    // endpoint de login
    ENDPOINT_AUTH_LOGIN: '/login'
}

/** ENUMERAÇÃO DOS STATUS DE EMPRESTIMO */

export const STATUS_EMPRESTIMO = {
    STATUs_EM_ANDAMENTO: 'Em andamento',
    STATUS_CONCLUIDO: 'Concluído',
    STATUS_ATRASADO: 'Atrasado'
}