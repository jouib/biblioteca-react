import { JSX } from "react";

function UpdateLivro({ idLivro }: { idLivro: number }): JSX.Element {
    return (
        <>
        <p>{idLivro}</p>
        </>
    );
}
export default UpdateLivro;