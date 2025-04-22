import { useNavigate } from "react-router-dom";

export default function FormsConfig() {

    const navigate = useNavigate();

    return (

        <>
            <div className="w-150 h-screen rounded-2xl flex flex-col justify-center">

                <h1 className="self-center text-[#982546] font-bold text-2xl p-4">Configurações</h1>

                <form action="#" method="get" className="flex flex-col text-[#362323]  border border-[#982546] py-5 px-8 rounded-2xl gap-2 ">

                    <label for="nome">Nome:</label>
                    <input type="text" id="nome" name="nome" className="bg-[#b1b1b1] p-2 rounded-xl" disabled />

                    <label for="nome">E-mail:</label>
                    <input type="email" id="nome" name="nome" className="bg-[#b1b1b1] p-2 rounded-xl" disabled />

                    <label for="telefone">Telefone:</label>
                    <input type="tel" id="telefone" name="telefone" className="bg-[#b1b1b1] p-2 rounded-xl" disabled />

                    <label for="nome">Senha:</label>

                    <div className="flex flex-row gap-5">
                        <input type="password" id="nome" name="nome" className="bg-[#b1b1b1] p-2 w-50 rounded-xl" disabled />
                        <button className="bg-[#982546] border border-[#FFF3DC] text-[#FFF3DC] rounded-xl py-2 px-4 cursor-pointer" onClick={() => navigate("/components/AlterarSenha")}>Alterar senha</button>
                    </div>

                    <div className="flex flex-row justify-between gap-4 pt-5">
                        <button type="submit" className="bg-[#982546] border border-[#FFF3DC] text-[#FFF3DC] rounded-xl py-2 px-6 self-end cursor-pointer">Sair da conta</button>
                        <button className="text-[#982546] cursor-pointer">Deletar conta</button>
                    </div>
                </form>
            </div>
        </>
    );
}
