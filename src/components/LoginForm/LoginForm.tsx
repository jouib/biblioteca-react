// Importa o tipo JSX do React para definir o tipo de retorno do componente
import { JSX, useState } from 'react';// Importa os estilos CSS específicos para o formulário de login
import estilo from './LoginForm.module.css';
import AuthRequests from '../../fetch/AuthRequests';

// Declara o componente funcional LoginForm que retorna um elemento JSX
function LoginForm(): JSX.Element {
    const [username, setUsername] = useState('');
    const [senha, setSenha] = useState('');

    interface LoginData {
        username: string;
        senha: string;
    }

    interface FormEvent {
        preventDefault: () => void;
    }

    /**
     * Envia o formulário à API invocando o método de login
     * @param e evento de envio do formulário
     */
    const handleSubmit = async (e: FormEvent): Promise<void> => {
        e.preventDefault();
        const login: LoginData = { username: username, senha: senha }
        
        // lógica para autenticação do usuário
        try {
            if(await AuthRequests.login(login)) {
                window.location.href = '/'; // redireciona para a página inicial
            }
        } catch (error) {
            // lança um erro
            console.error(`Erro ao tentar fazer login: ${error}`);
            alert('Erro ao fazer login, verifique se usuário e/ou senha estão corretos.');
        }
    };

    return (
        // Seção principal que contém o formulário de login, com classe de estilo personalizada
        <section className={estilo['form-section']}>
            
            {/* Título do formulário */}
            <h3>LOGIN</h3>
            
            {/* Início do formulário com classe de estilo personalizada */}
            <form action="submit" className={estilo['form-login']} onSubmit={handleSubmit}>

                {/* Campo de e-mail com rótulo */}
                <label>
                    Username
                    <input 
                        type="text" // Define o tipo do input como texto
                        placeholder='Informe o seu username' // Texto de dica para o usuário
                        className={estilo['input-email-login']} // Classe CSS personalizada
                        value={username}  // valor digitado no campo
                        onChange={(e) => setUsername(e.target.value)}  // atualiza o valor conforme usuário digita
                        required  // campo obrigatório
                    />    
                </label>

                {/* Campo de senha com rótulo */}
                <label>
                    Senha
                    <input 
                        type="password" // Define o tipo do input como senha
                        placeholder='Informe sua senha' // Texto de dica para o usuário
                        className={estilo['input-password-login']} // Classe CSS personalizada
                        value={senha}  // valor digitado no campo
                        onChange={(e) => setSenha(e.target.value)}  // atualiza o valor conforme usuário digita
                        required  // campo obrigatório
                    />    
                </label>

                {/* Botão de login */}
                <input 
                    type="submit" // Tipo botão (não envia o formulário por padrão)
                    value="Entrar" // Texto exibido no botão
                    className={estilo['input-button-login']} // Classe CSS personalizada
                />
            </form>
        </section>
    );
}

// Exporta o componente para ser utilizado em outros arquivos do projeto
export default LoginForm;