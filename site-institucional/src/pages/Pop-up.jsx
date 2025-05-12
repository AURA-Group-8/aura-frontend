    export default function Alerta({mensagem, imagem}) {
    return (

        <>
            <div className="w-full h-full flex justify-center fixed z-50 items-center">
                <div className="bg-[#ffff] flex flex-col py-10 px-20 justify-center gap-2 items-center rounded-2xl border border-[#982546]">

                    <img src={imagem} alt="" className="h-15"/>

                    <h1>{mensagem}</h1>
                    
                </div>
            </div>
        </>
    )
}