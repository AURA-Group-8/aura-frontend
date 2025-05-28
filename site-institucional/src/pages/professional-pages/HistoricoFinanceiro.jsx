import NavbarPro from "./Navbar"

export default function HistoricoFinanceiro() {

    return (
        <>
            <NavbarPro caminho={"/pages/professional-pages/MeusServicos"} />
            <div className="w-full h-screen bg-[#FFF3DC] flex flex-col items-center justify-center">
                <h1 className="text-[#982546] font-bold text-2xl ">Adicionar serviço</h1>

                <div className="w-200 h-90 flex flex-col mt-10 overflow-y-auto">
                    <div className="flex flex-row justify-around">
                        <div className="flex flex-col items-center">
                            <h1 className="text-[#982546] font-bold text-2xl ">Janeiro</h1>
                            <div className="bg-[#362323df] w-60 p-2 rounded-2xl mt-5 flex flex-col text-[#FFF3DC]">
                                <span className="text-2xl font-bold mb-2">R$ 0,00</span>
                                <span>Total de atendimentos: 0</span>
                                <span>Total de cancelamentos: 0</span>

                            </div>
                        </div>

                        
                    </div>
                </div>
            </div>
        </>
    )
} 