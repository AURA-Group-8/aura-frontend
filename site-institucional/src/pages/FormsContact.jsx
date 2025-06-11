function FormsContact(){

    return(
        <>
            <form action="#" method="post" className="flex flex-col text-[#FFF3DC] gap-2">
                <label for="nome">E-mail:</label>
                <input type="email" id="nome" name="nome" className="bg-[#b1b1b1] h-8 rounded-xl" required/>

                <label for="telefone">Telefone:</label>
                <input type="tel" id="telefone" name="telefone" className="bg-[#b1b1b1] h-8 rounded-xl" required/>

                <label for="mensagem">Mensagem:</label>
                <textarea id="mensagem" name="mensagem" rows="4" cols="50" className="bg-[#b1b1b1] rounded-xl" required></textarea>

                <button type="submit" className="bg-[#982546] border border-[#FFF3DC] rounded-xl cursor-pointer w-30 h-8 self-end">Enviar</button>
            </form>
        </>
    )

}

export default FormsContact