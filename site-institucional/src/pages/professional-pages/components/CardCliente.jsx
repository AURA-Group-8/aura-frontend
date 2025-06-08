export default function CardCliente({ name, phone, birthDate }) {
  // Formatar data para dd/mm/yyyy
  const formatarData = (dataISO) => {
    if (!dataISO) return "";
    const data = new Date(dataISO);
    const dia = data.getDate().toString().padStart(2, "0");
    const mes = (data.getMonth() + 1).toString().padStart(2, "0");
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  return (
    <div className="flex flex-col w-210 ml-20 mt-10 h-60 ">
      <div className="bg-[#982546] rounded-t-2xl p-2 w-full flex flex-row justify-between items-center text-white text-lg font-bold">
        <span>{name}</span>
      </div>

      <div className="bg-[#982546b9] rounded-b-2xl p-2 w-full text-white flex flex-row justify-between items-center">
        <div className="flex flex-col justify-between">
          <span>Telefone: {phone}</span>
          <span>Data de Nascimento: {formatarData(birthDate)}</span>
        </div>

        <textarea
          className="bg-[#81253fd8] rounded-2xl w-80 h-20 p-2"
          placeholder="Adicione uma observação"
        />
      </div>
    </div>
  );
}