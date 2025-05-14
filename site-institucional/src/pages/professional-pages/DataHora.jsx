import NavbarPro from "./Navbar"

export default function DataHora() {
    return (
        <>
         <NavbarPro caminho={"/pages/professional-pages/Agendar"} />

            <div className="w-full h-screen bg-[#FFF3DC] flex flex-col justify-center items-center">
                <h1 className="text-[#982546] font-bold text-2xl">Data e Hora</h1>
                <div className="border-1 border-[#982546] bg-[#FFF3DC] w-150 h-100 rounded-2xl flex flex-row justify-center mt-5">
                    <div className="flex flex-col w-120">
                        <p className=" text-xl mt-2">Data</p>
                        <input type="date" className="bg-amber-50 p-2 rounded-2xl border-1 border-[#982546] w-full h-10 mt-2" />

                        <p className=" text-xl mt-2">Hora</p>
                        <input type="time" className="bg-amber-50 p-2 rounded-2xl border-1 border-[#982546] w-full h-10 mt-2" />

                        <div className="flex flex-row w-full justify-between mt-4">
                            <button className="border-1 border-[#982546] py-2 px-8 rounded-2xl text-[#982546] cursor-pointer">Cancelar</button>

                            <button className="bg-[#982546] py-2 px-4 rounded-2xl text-[#FFF3DC] flex flex-row gap-2 items-center cursor-pointer hover:bg-[#b36078]">Agendar<img src="/assets/Calendar.png" className="h-8" /></button>
                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}
