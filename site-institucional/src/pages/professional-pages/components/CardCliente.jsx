export default function CardCliente(props) {
    return (
        <>
            <div className="flex flex-col w-210  ml-20 mt-10 h-60 overflow-y-auto ">
                <div className="bg-[#982546] rounded-t-2xl p-2 w-full flex flex-row justify-between items-center text-white text-lg font-bold">
                    <span>{props.name}</span>
                </div>

                <div className="bg-[#982546b9] rounded-b-2xl p-2 w-full text-white flex flex-row justify-between items-center">

                    <div className="flex flex-col justify-between ">
                        <span>Telefone: {props.phone}</span>
                        <span>Data de Nascimento: {props.birthDate}</span>
                    </div>

                    <textarea name="" id="" className="bg-[#81253fd8] rounded-2xl w-80 h-20 p-2" placeholder="Adicione uma observação"></textarea>

                </div>
            </div>
        </>
    )
}