function Section_3() {
    return (
        <>
            <div className="h-full flex flex-col justify-center items-center gap-10">
                <h1 className="text-center font-bold text-2xl ">
                    <span className="text-[#982546]">Benefícios</span> para você
                </h1>

                <div className="flex flex-row items-center justify-center gap-10">
                    <ul className="text-[#982546] font-bold flex flex-col gap-5">
                        <li className="flex items-center gap-2">
                            <img src="/assets/check.png" alt="" className="h-6" />
                            Agendamentos simplificados
                        </li>
                        <li className="flex items-center gap-2">
                            <img src="/assets/check.png" alt="" className="h-6" />
                            Gestão eficiente
                        </li>
                        <li className="flex items-center gap-2">
                            <img src="/assets/check.png" alt="" className="h-6" />
                            Maior visibilidade
                        </li>
                        <li className="flex items-center gap-2">
                            <img src="/assets/check.png" alt="" className="h-6" />
                            Redução de faltas
                        </li>
                        <li className="flex items-center gap-2">
                            <img src="/assets/check.png" alt="" className="h-6" />
                            Experiência Premium
                        </li>
                    </ul>

                    <img src="/assets/celular.png" alt="" className="h-96 " />
                </div>

            </div>
        </>
    )

}
export default Section_3