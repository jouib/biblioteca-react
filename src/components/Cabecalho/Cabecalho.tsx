// Importa o tipo JSX do React para definir o tipo de retorno do componente
import { JSX, useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import AuthRequests from '../../fetch/AuthRequests';
import { SERVER_CFG } from '../../appConfig';

// Importa os estilos CSS específicos para o componente de cabeçalho
import estilo from './Cabecalho.module.css';

// Importa a imagem do logotipo da aplicação
import logotipo from '../../assets/logotipo.png';

// Importa as rotas da aplicação definidas no arquivo de configuração
import { APP_ROUTES } from '../../appConfig';

// Declara o componente funcional Cabecalho que retorna um elemento JSX
function Cabecalho(): JSX.Element {
    // estado para controlar a renderização condicional
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [imagemPerfil, setImagemPerfil] = useState('');

    useEffect(() => {
        const isAuth: boolean = localStorage.getItem('isAuth') === 'true'; // recupera o valor isAuth do localStorage e converte em um boolean
        const token: string | null = localStorage.getItem('token'); // recupera o valor do token do localStorage
        const imagem: string | null = localStorage.getItem('imagemPerfil');
        // verifica se isAuth é verdadeiro, se o token não é nulo e se o token não está expirado
        if (isAuth && token && AuthRequests.checkTokenExpiry()) {
            setIsAuthenticated(true); // define o estado para verdadeiro
            setImagemPerfil(imagem ? imagem : '');
        } else {
            setIsAuthenticated(false); // define o estado para falso
        }
    }, []);

    return (
        // Define o cabeçalho da aplicação com uma classe CSS personalizada
        <header className={estilo.cabecalho}>

            {/* Link para navegar até a ROUTE_HOME quando clicar na imagem */}
            <a href={APP_ROUTES.ROUTE_HOME} className={estilo.imgLogo}>
                {/* Logotipo da aplicação */}
                <img src={logotipo} alt="logotipo" />
            </a>

            {isAuthenticated ? (
                <>
                    {/* Link para navegar até a listagem de alunos */}
                    <a href={APP_ROUTES.ROUTE_LISTAGEM_ALUNOS}>Alunos</a>

                    {/* Link para navegar até a listagem de livros */}
                    <a href={APP_ROUTES.ROUTE_LISTAGEM_LIVROS}>Livros</a>

                    {/* Link para navegar até a listagem de empréstimos */}
                    <a href={APP_ROUTES.ROUTE_LISTAGEM_EMPRESTIMOS}>Empréstimos</a>

                    <img
                        src={ `${SERVER_CFG.SERVER_URL}/uploads/${imagemPerfil}` }
                        alt='Imagem de perfil'
                    />

                    {/* Link para navegar até a página de login */}
                    <Button
                        className='btn-sair-personalizado'
                        style={{
                            width: '10%',
                            height: '50%',
                            color: 'var(--cor-primaria)',
                            backgroundColor: '#fff',
                            marginRight: '2%',
                            textAlign: 'center',
                            fontWeight: 'bold',
                            fontSize: '1.2rem'
                        }}
                        label='Sair'
                        raised
                        onClick={() => { AuthRequests.removeToken() }}
                    />
                </>
            ) : (
                <>
                    {/* Link para navegar até a página de login */}
                    <a href={APP_ROUTES.ROUTE_LOGIN}>Login</a>
                </>
            )}
        </header>
    );
}

// Exporta o componente para ser utilizado em outros arquivos
export default Cabecalho;
