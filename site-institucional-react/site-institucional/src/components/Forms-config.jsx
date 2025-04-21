export default function FormsConfig() {
    return (

        <>
            <div className="w-100 h-full border border-[#982546] p-5 rounded-2xl pt-10">
                <form action="#" method="get" className="flex flex-col text-[#362323] gap-2 pt-20">

                    <label for="nome">E-mail:</label>
                    <input type="email" id="nome" name="nome" className="bg-[#b1b1b1] p-2 rounded-xl" disabled />

                    <label for="nome">E-mail:</label>
                    <input type="email" id="nome" name="nome" className="bg-[#b1b1b1] p-2 rounded-xl" disabled />

                    <label for="telefone">Telefone:</label>
                    <input type="tel" id="telefone" name="telefone" className="bg-[#b1b1b1] p-2 rounded-xl" disabled />

                    <label for="nome">Senha:</label>

                    <div className="flex flex-row justify-between">
                        <input type="email" id="nome" name="nome" className="bg-[#b1b1b1] p-2 w-50 rounded-xl" disabled />
                        <button className="bg-[#982546] border border-[#FFF3DC] text-[#FFF3DC] rounded-xl py-2 px-6 ">Alterar senha</button>
                    </div>

                    <div className="flex flex-row justify-between pt-10">
                        <button type="submit" className="bg-[#982546] border border-[#FFF3DC] text-[#FFF3DC] rounded-xl py-2 px-6 self-end">Enviar</button>
                        <button className="text-[#982546]">Deletar conta</button>
                    </div>
                </form>
            </div>
        </>
    );
}
