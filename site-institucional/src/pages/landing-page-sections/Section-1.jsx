import { useNavigate } from "react-router-dom"

function Section_1() {

    const navigate = useNavigate();

    return (
        <>
            <div className="h-full flex flex-row p-20 gap-10 justify-around">
                <div className="flex flex-col justify-center items-start gap-5">
                    <h1 className="text-[#FFF3DC] text-6xl font-bold"><i>Bem-vindo!</i></h1>
                    <span className="text-[#FFF3DC] vw-accessible text-2xl">
                        Buscando facilidade no agendamento de atendimentos <br/> estéticos ou organização na gestão do seu negócio?
                        
                    </span>

                    <span className="text-[#FFF3DC] vw-accessible font-medium text-2xl">
                        Você está no lugar certo! Crie sua conta e aproveite nossos serviços.
                    </span>
                   
                    <button onClick={() => navigate("/pages/client-pages/Cadastro")} className="bg-[#982546] text-[#FFF3DC] text-2xl font-medium py-2 px-5 rounded-xl cursor-pointer hover:bg-[#d8d3af] transition duration-300">
                        Criar conta
                    </button>
                </div>
                <div className="flex justify-center items-center">
                    <img src="/assets/logo-aura-claro.png" className="max-h-100" alt="Logo AURA" />
                </div>

                

            </div>
        </>
    )
}

export default Section_1