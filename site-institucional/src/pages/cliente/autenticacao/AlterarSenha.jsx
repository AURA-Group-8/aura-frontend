import Header from "../componentes/HeaderLogin";
import FormularioAlterarSenha from "../../componentes/FormularioAlterarSenha";

export default function AlterarSenha() {

    return (

        <>
        
            <div className="h-full w-full bg-[#FFF3DC] flex flex-col justify-center ">

            <Header caminho={"/cliente/esqueci-senha"} />

            <FormularioAlterarSenha/>

            </div>
        </>
    );

} 