export default function CardAgendamento(props) {

    return (
        <>
            <div className="flex flex-row mt-10 gap-10 w-full ">
                <div className="flex flex-col justify-center w-full h-40">
                    <div className="bg-[#982546] w-96 h-20 rounded-t-2xl flex  items-center p-2 shadow-md shadow-[#4e1b29]">
                        <p className="font-bold text-white text-lg">{props.name}</p>
                    </div>
                    <div className="bg-[#982546d1] w-96 h-96 rounded-b-2xl">
                        <div className="flex flex-col p-2 w-full text-white text-lg">
                            <p>{props.service}</p>
                            <div className="flex flex-row justify-between w-full ">
                                <p>{props.date} - {props.time}</p>

                                <p className="font-bold text-3xl text-[#F0A8BC]">{props.value}</p>
                            </div>
                        </div>

                        <div className="w-full p-2 text-white text-lg">
                            <span>Pagamento: </span>
                            <select name="" id="" className="outline-none">
                                <option value="" className="font-bold text-emerald-600">Pago</option>
                                <option value="" className="font-bold text-amber-500">Pendente</option>
                            </select>
                        </div>

                        <div className="flex flex-row justify-between w-full p-2">
                            <button className="bg-[#FFF3DC] p-2 rounded-2xl text-[#982546] cursor-ponter">Marcar como feito</button>
                            <button className="p-2 rounded-2xl  border border-[#FFF3DC] text-[#FFF3DC] cursor-ponter">Cancelar atendimento</button>
                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}