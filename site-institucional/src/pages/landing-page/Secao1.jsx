import { useNavigate } from "react-router-dom"

function Section_1() {

    const navigate = useNavigate();

    return (
        <>
            <div className="h-full flex flex-col p-10 md:p-20  gap-5 justify-around md:flex-row">
                <div className="flex flex-col justify-center items-start gap-5">
                    <h1 className="text-[#FFF3DC] text-4xl font-bold md:text-6xl"><i>Bem-vindo!</i></h1>
                    <span className="text-[#FFF3DC] text-xl w-80 md:w-auto xl:text-2xl">
                        Buscando facilidade no agendamento de atendimentos <br/> estéticos ou organização na gestão do seu negócio?
                        
                    </span>

                    <span className="text-[#FFF3DC] font-medium text-xl xl:text-2xl">
                        Você está no lugar certo! Crie sua conta e aproveite nossos serviços.
                    </span>
                   
                    <button onClick={() => navigate("/pages/client-pages/Cadastro")} className="xl:text-xl bg-[#982546] text-[#FFF3DC] text-xl font-medium py-2 px-5 rounded-xl cursor-pointer hover:bg-[#d8d3af] transition duration-300">
                        Criar conta
                    </button>
                </div>
                <div className="justify-center items-center hidden md:flex">
                    <img src="/assets/logo-aura-claro.png" className="max-h-100" alt="Logo AURA" />
                </div>

                

            </div>
        </>
    )
}

export default Section_1