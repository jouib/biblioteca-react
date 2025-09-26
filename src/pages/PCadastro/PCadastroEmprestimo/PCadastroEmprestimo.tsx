import { JSX } from "react";
import Cabecalho from "../../../components/Cabecalho/Cabecalho";
import Rodape from "../../../components/Rodape/Rodape";
import FormEmprestimo from "../../../components/Formularios/FormEmprestimo/FormEmpreestimo";

function PCadastroEmprestimo(): JSX.Element {
    return (
        <div className="pagina-grid">
            {/* Renderiza o cabeçalho da página */}
            <Cabecalho />

            {/* Renderiza o formulário de login */}
            <FormEmprestimo />

            {/* Renderiza o rodapé da página */}
            <Rodape />
        </div>
    );

};


export default PCadastroEmprestimo;