import { JSX } from "react";
import Cabecalho from "../../../components/Cabecalho/Cabecalho";
import Rodape from "../../../components/Rodape/Rodape";
import UpdateLivro from "../../../components/Formularios/UpdateLivro/UpdateLivro";
import { useParams } from "react-router-dom";


function PAtualizacaoLivro(): JSX.Element {
    const { idLivro } = useParams<{ idLivro: string }>();

    return (
        <div className="pagina-grid">
            <Cabecalho />
            <UpdateLivro idLivro={Number(idLivro)} />
            <Rodape />
        </div>
    );
}

export default PAtualizacaoLivro;   