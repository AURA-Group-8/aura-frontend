function Section_3() {
    return (
        <>
            <div className="h-full flex flex-col gap-10 text-xl md:text-2xl mt-50 md:mt-20 xl:mt-40 ">
                <h1 className="text-center font-bold text-2xl xl:text-5xl mt-10 md:mt-0 text-[#241313]">
                    <span className="text-[#982546]">Benefícios</span> para você
                </h1>

                <div className="flex flex-wrap items-center justify-center xl:text-3xl md:mt-20 ">
                    <ul className="text-[#982546] font-bold columns-1 md:columns-2 xl:gap-20 text-xl md:text-2xl space-y-5 md:space-y-12 p-5 md:p-0">
                        <li className="flex items-center bg-[#982546] text-[#FFF3DC] p-4 md:p-6 rounded-2xl gap-5">
                            <img src="/assets/check.png" alt="" className="h-10 bg-[#FFF3DC] rounded-4xl" />
                            Agendamentos simplificados
                        </li>
                        <li className="flex items-center border-4 border-[#982546] text-[#982546] p-4 md:p-6 rounded-2xl gap-5">
                            <img src="/assets/check.png" alt="" className="h-10 bg-[#FFF3DC] rounded-4xl border-4 border-[#982546]" />
                            Gestão eficiente
                        </li>
                        <li className="flex items-center border-4 border-[#982546] text-[#982546] p-4 md:p-6 rounded-2xl gap-5">
                            <img src="/assets/check.png" alt="" className="h-10 bg-[#FFF3DC] rounded-4xl border-4 border-[#982546]" />
                            Maior visibilidade
                        </li>
                        <li className="flex items-center bg-[#982546] text-[#FFF3DC] p-4 md:p-6 rounded-2xl gap-5">
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