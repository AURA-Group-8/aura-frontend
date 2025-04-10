import { useState } from "react"

export default function FormularioCadastro() {
    const [nomeCompleto, setNomeCompleto] = useState("");
    const [email, setEmail] = useState("");
    const [dataNasc, setDataNasc]  = useState("");
    const [telefone, setTelefone] = useState("");

    const [senha, setSenha] = useState("");
    return (
        <>
            <div className="flex items-center justify-center h-screen bg-[#FFF2DC] relative">
                <div className="absolute inset-0 bg-[url('/imgs/background-wave.png')] bg-cover bg-center opacity-65 z-0"></div>

                <div className="bg-[#982546] w-[40vw] rounded-xl p-8 flex flex-col items-center text-white shadow-lg font-bold z-10">

                    <div className="w-[40vw] bg-[#982546] text-[#FFF2DC] font-bold flex justify-beetween items-center mb-8 gap-x-16 hover:border-[#341C1C]">
                        <img className="h-12 ml-8" src="/imgs/LOGO.png" alt="" />   <h1 className="text-2xl">Crie sua conta</h1>
                    </div>

                    <form className="w-full flex flex-col gap-[0.5vh] text-xs text-[#FFF2DC]" method="POST">
                        <label htmlFor="Campo">Nome Completo:</label>
                        <input  type="text" className="p-2 rounded-xl w-full bg-white text-black border border-[#341C1C] hover:border-[#FFF2DC] mb-4" />

                        <label htmlFor="Campo">Email:</label>
                        <input type="text" className="p-2 rounded-xl w-full bg-white text-black border border-[#341C1C] hover:border-[#FFF2DC] mb-4" />

                        <label htmlFor="Campo">Data de Nascimento (Opcional):</label>
                        <input type="date" className="p-2 rounded-xl w-full bg-white text-black border border-[#341C1C] hover:border-[#FFF2DC] mb-4" />

                        <label htmlFor="Campo">Telefone:</label>
                        <input type="text" className="p-2 rounded-xl w-full bg-white text-black border border-[#341C1C] hover:border-[#FFF2DC] mb-4" />

                        <div className="flex gap-4 w-full">
                            <div className="flex flex-col w-1/2 gap-[0.5vh]">
                                <label htmlFor="senha">Senha:</label>
                                <input id="senha" type="password" className="p-2 rounded-xl w-full bg-white text-black border border-[#341C1C] hover:border-[#FFF2DC] " />
                            </div>
                            <div className="flex flex-col w-1/2 gap-[0.5vh]" >
                                <label htmlFor="confirmarSenha">Confirmar senha:</label>
                                <input id="confirmarSenha" type="password" className="p-2 rounded-xl w-full bg-white text-black border border-[#341C1C] hover:border-[#FFF2DC] " />
                            </div>
                            </div>

                            <button type="submit" className="mt-4 w-52 text-[#FFF3DC] bg-[#680E28] border border-[#FFF3DC] rounded px-4 py-2 hover:border-[#341C1C] hover:bg-[#FFF3DC] hover:text-[#341C1C] transition hover:cursor-pointer self-center">
                                Cadastrar
                            </button>
                        
                    </form>

                    <p className="text-xs mt-4">Já possui conta? <a href="#" className="underline">Login</a></p>
                </div>
            </div>

        </>
    )
}