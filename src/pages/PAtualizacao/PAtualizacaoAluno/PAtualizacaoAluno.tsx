import { JSX } from "react";
import Cabecalho from "../../../components/Cabecalho/Cabecalho";
import Rodape from "../../../components/Rodape/Rodape";
import UpdateAluno from "../../../components/Formularios/UpdateAluno/UpdateAluno";
import { useParams } from "react-router-dom";


function PAtualizacaoAluno(): JSX.Element {
    const { idAluno } = useParams();

    return (
        <div className="pagina-grid">
            <Cabecalho />
            <UpdateAluno idAluno={Number(idAluno)} />
            <Rodape />
        </div>
    );
}

export default PAtualizacaoAluno;   