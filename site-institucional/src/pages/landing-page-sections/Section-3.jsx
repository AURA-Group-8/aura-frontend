function Section_3() {
    return (
        <>
            <div className="h-full flex flex-col justify-center gap-10">
                <h1 className="text-center font-bold text-3xl text-[#241313]">
                    <span className="text-[#982546] text-3xl">Benefícios</span> para você
                </h1>

                <div className="flex flex-wrap items-center justify-center mt-10">
                    <ul className="text-[#982546] font-bold columns-2 gap-10 text-2xl space-y-6">
                        <li className="flex items-center bg-[#982546] text-[#FFF3DC] p-6 rounded-2xl gap-5">
                            <img src="/assets/check.png" alt="" className="h-10 bg-[#FFF3DC] rounded-4xl" />
                            Agendamentos simplificados
                        </li>
                        <li className="flex items-center border-4 border-[#982546] text-[#982546] p-6 rounded-2xl gap-5">
                            <img src="/assets/check.png" alt="" className="h-10 bg-[#FFF3DC] rounded-4xl border-4 border-[#982546]" />
                            Gestão eficiente
                        </li>
                        <li className="flex items-center border-4 border-[#982546] text-[#982546] p-6 rounded-2xl gap-5">
                            <img src="/assets/check.png" alt="" className="h-10 bg-[#FFF3DC] rounded-4xl border-4 border-[#982546]" />
                            Maior visibilidade
                        </li>
                        <li className="flex items-center bg-[#982546] text-[#FFF3DC] p-6 rounded-2xl gap-5">
                            <img src="/assets/check.png" alt="" className="h-10 bg-[#FFF3DC] rounded-4xl" />
                            Redução de faltas
                        </li>
                    </ul>

                    
                </div>

            </div>
        </>
    )

}
export default Section_3