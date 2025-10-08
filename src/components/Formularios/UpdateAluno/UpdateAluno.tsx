import { JSX } from "react";

function UpdateAluno({ idAluno }: { idAluno: number }): JSX.Element {
    return (
        <>
        <p>{idAluno}</p>
        </>
    );
}

export default UpdateAluno;