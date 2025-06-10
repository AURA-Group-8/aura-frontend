import { useNavigate } from "react-router-dom"

function Section_1() {

    const navigate = useNavigate();

    return (
        <>
            <div className="h-full flex flex-col justify-center items-center gap-10">
                <img src="/assets/Bem-Vindo.png" alt="" className="h-20" />
                <span className="text-white text-xl text-center">Facilidade para clientes, organização para profissionais!</span>
                <button onClick={() => navigate("/pages/client-pages/Cadastro")} className="bg-[#982546] border border-[#FFF3DC] text-[#FFF3DC] w-30 h-8 rounded-xl cursor-pointer">
                    Criar conta
                </button>
            </div>
        </>
    )
}

export default Section_1