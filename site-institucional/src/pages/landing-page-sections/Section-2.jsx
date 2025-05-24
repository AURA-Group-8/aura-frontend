function Section_2() {
    return (
        <>
            <div className="h-full flex flex-col justify-center items-center gap-15">
                <h1 className="text-center font-bold text-2xl ">
                    Somos a <span className="text-[#982546]">AURA</span>
                </h1>

                <div className="flex flex-row justify-around gap-20">
                    <img src="/assets/pincel-2.png" className="max-h-70" alt="" />
                    <img src="/assets/logo-escuro-vertical.png" className="max-h-50" alt="" />
                    <img src="/assets/pincel-1.png" className="max-h-70" alt="" />
                </div>

                <span className="text-center max-w-200">A Aura é uma empresa de tecnologia dedicada a criar soluções para o setor de beleza.
                    Pensando na praticidade e experiência dos clientes, desenvolvemos um sistema de agendamento
                    exclusivo para designers de sobrancelhas, conectando profissionais a quem busca serviços de qualidade.</span>
            </div>
        </>
    )
}
export default Section_2