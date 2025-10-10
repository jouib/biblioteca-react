// Importa hooks e tipos do React
import { JSX, useEffect, useState } from 'react';

// Importa os componentes da biblioteca PrimeReact
import { DataTable } from 'primereact/datatable'; // Tabela responsiva com recursos como paginação e ordenação
import { Column } from 'primereact/column'; // Representa uma coluna da tabela

// Importa o serviço responsável pelas requisições relacionadas a livros
import LivroRequests from '../../../fetch/LivroRequests';

// Importa o arquivo CSS com estilos específicos para este componente
import estilo from './TabelaLivro.module.css';
import LivroDTO from '../../../interfaces/LivroInterface';

import { APP_ROUTES } from '../../../appConfig';

// Declara o componente funcional TabelaLivro
function TabelaLivro(): JSX.Element {
    // Hook useState para armazenar a lista de livros
    const [livros, setLivros] = useState<LivroDTO[]>([]);

    // Hook useEffect para buscar os livros na primeira renderização do componente
    useEffect(() => {
        const fetchLivros = async () => {   // função para fazer a consulta de livros
            try {
                const listaDeLivros = await LivroRequests.listarLivros(); // Chamada assíncrona à API
                setLivros(Array.isArray(listaDeLivros) ? listaDeLivros : []); // Atualiza o estado apenas se o retorno for um array
            } catch (error) {
                console.error(`Erro ao buscar livros: ${error}`); // Exibe erro no console se a requisição falhar
            }
        }

        fetchLivros(); // Executa a função de busca
    }, []); // Array vazio garante que será executado apenas uma vez (montagem do componente)


     const deletar = async (livro: LivroDTO) => {
        const confirmar = window.confirm(`Tem certeza que deseja deletar o livro ${livro.titulo}?`);

        if(confirmar && typeof livro.idLivro === 'number') {
            const removido = await LivroRequests.removerLivro(livro.idLivro);
            if(removido) {
                window.location.reload(); //atualiza a página
            } else {
                alert('Erro ao deletar o livro.');
            }
        } else if (confirmar){
            alert('ID do livro inválido.');
        }
    }

    return (
        <main>
            {/* Título da tabela com classe personalizada */}
            <h1 className={estilo['header-tabela-livro']}>Lista de Livros</h1>

            <a
                href={APP_ROUTES.ROUTE_CADASTRO_LIVRO}
                className={estilo['anc-pag-cadastro']}
            >
                CADASTRAR LIVRO
            </a>

            {/* Componente DataTable da PrimeReact, responsável por exibir os dados em forma de tabela */}
            <DataTable
                value={livros} // Fonte de dados da tabela
                paginator // Ativa paginação
                rows={5} // Mostra 10 registros por página por padrão
                rowsPerPageOptions={[5, 10, 25, 50]} // Opções que o usuário pode escolher
                tableStyle={{ minWidth: '50rem' }} // Define um estilo mínimo para a tabela
                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink" // Layout dos controles de paginação
                currentPageReportTemplate="{first} de {last} total {totalRecords}" // Texto que exibe o status da paginação
                className={estilo['data-table']} // Classe CSS personalizada
            >
                {/* Colunas que representam os atributos de cada livro */}
                <Column field="titulo" header="Titulo" headerStyle={{ backgroundColor: 'var(--cor-primaria)', color: 'var(--font-color)' }} style={{ width: '20%', color: 'var(--font-color)' }} />
                <Column field="autor" header="Autor" headerStyle={{ backgroundColor: 'var(--cor-primaria)', color: 'var(--font-color)' }} style={{ width: '20%', color: 'var(--font-color)' }} />
                <Column field="editora" header="Editora" headerStyle={{ backgroundColor: 'var(--cor-primaria)', color: 'var(--font-color)' }} style={{ width: '15%', color: 'var(--font-color)' }} />
                <Column field="isbn" header="ISBN" headerStyle={{ backgroundColor: 'var(--cor-primaria)', color: 'var(--font-color)' }} style={{ width: '10%', color: 'var(--font-color)' }} />

                {/* Coluna que exibe o valor de aquisição formatado como moeda brasileira */}
                <Column
                    field="valorAquisicao"
                    header="Valor de Aquisição"
                    headerStyle={{ backgroundColor: 'var(--cor-primaria)', color: 'var(--font-color)' }}
                    style={{ width: '10%', color: 'var(--font-color)' }}
                    body={(rowData) => {
                        const valor = Number(rowData.valorAquisicao); // Converte o valor para número
                        return valor.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                        }); // Formata como moeda brasileira
                    }}
                />

                <Column 
                    field="idLivro"
                    header="Ação"
                    headerStyle={{ backgroundColor: 'var(--cor-primaria)', color: 'var(--font-color)' }}
                    style={{ width: '15%', color: 'var(--font-color)' }}
                    body= {(rowData) => (
                        <>
                            <button 
                            style={{ width: '100%' }}
                            onClick={() => deletar(rowData)}
                            >Deletar</button>

                            <button 
                            style={{ width: '100%' }}
                            onClick={() => window.location.href = `/atualizar/livro/${rowData.idLivro}` }
                            >Atualizar</button>
                        </>
                    )}
                />
            </DataTable>
        </main>
    );
}

// Exporta o componente para ser utilizado em outros arquivos
export default TabelaLivro;
