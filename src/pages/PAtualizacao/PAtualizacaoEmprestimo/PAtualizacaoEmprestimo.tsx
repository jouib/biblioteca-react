import { JSX } from "react";
import Cabecalho from "../../../components/Cabecalho/Cabecalho";
import Rodape from "../../../components/Rodape/Rodape";
import UpdateEmprestimo from "../../../components/Formularios/UpdateEmprestimo/UpdateEmprestimo";
import { useParams } from "react-router-dom";


function PAtualizacaoEmprestimo(): JSX.Element {
    const { idEmprestimo } = useParams();

    return (
        <div className="pagina-grid">
            <Cabecalho />
            <UpdateEmprestimo idEmprestimo={Number(idEmprestimo)} />
            <Rodape />
        </div>
    );
}

export default PAtualizacaoEmprestimo;   