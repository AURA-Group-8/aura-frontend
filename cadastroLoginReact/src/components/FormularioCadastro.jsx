import { useState } from "react"

export default function FormularioCadastro() {
    const [nomeCompleto, setNomeCompleto] = useState("");
    const [email, setEmail] = useState("");
    const [dataNasc, setDataNasc] = useState("");
    const [telefone, setTelefone] = useState("");
    const [senha, setSenha] = useState("");

    const cadastrar = (e) => {
        e.preventDefault(); // evita recarregar a página

        const temMaiuscula = /[A-Z]/.test(senha);
        const temNumero = /[0-9]/.test(senha);
        const temEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(senha);

        if (nomeCompleto.trim() === "" || telefone.trim() === "" || email.trim() === "" || senha.trim() === "") {
            alert("Não pode haver campo obrigatório vazio");
            return;
        }
        if (nomeCompleto.trim().length < 2) {
            alert("Nome completo deve ter mais de 2 caracteres");
            return;
        }
        if (telefone.trim().length != 11) {
            alert("Telefone deve ter 11 dígitos (com DDD)");
            return;
        }
        if (senha.trim().length < 6) {
            alert("Senha deve ter mais de 6 caracteres");
            return;
        }
        if (!(temNumero && temMaiuscula && temEspecial)) {
            alert("❌ A senha deve conter ao menos: uma letra maiúscula, um número e um caractere especial.");
            return;
        }

        alert("✅ Cadastro realizado com sucesso!");
    }

    return (
        <div className="flex items-center justify-center h-screen bg-[#FFF2DC] relative">
            <div className="absolute inset-0 bg-[url('/imgs/background-wave.png')] bg-cover bg-center opacity-65 z-0"></div>

            <div className="bg-[#982546] w-[40vw] rounded-xl p-8 flex flex-col items-center text-white shadow-lg font-bold z-10">
                <div className="w-[40vw] bg-[#982546] text-[#FFF2DC] font-bold flex justify-between items-center mb-8 gap-x-16 hover:border-[#341C1C]">
                    <img className="h-12 ml-8" src="/imgs/LOGO.png" alt="" />
                    <h1 className="text-2xl">Crie sua conta</h1>
                </div>

                <form onSubmit={cadastrar} className="w-full flex flex-col gap-[0.5vh] text-xs text-[#FFF2DC]" method="POST">
                    <label>Nome Completo:
                        <input type="text" onChange={e => setNomeCompleto(e.target.value)} className="p-2 rounded-xl w-full bg-white text-black border border-[#341C1C] hover:border-[#FFF2DC] mb-4" />
                    </label>

                    <label>Email:
                        <input type="text" onChange={e => setEmail(e.target.value)} className="p-2 rounded-xl w-full bg-white text-black border border-[#341C1C] hover:border-[#FFF2DC] mb-4" />
                    </label>

                    <label>Data de Nascimento (Opcional):
                        <input type="date" onChange={e => setDataNasc(e.target.value)} className="p-2 rounded-xl w-full bg-white text-black border border-[#341C1C] hover:border-[#FFF2DC] mb-4" />
                    </label>

                    <label>Telefone:
                        <input type="text" onChange={e => setTelefone(e.target.value)} className="p-2 rounded-xl w-full bg-white text-black border border-[#341C1C] hover:border-[#FFF2DC] mb-4" />
                    </label>

                    <div className="flex gap-4 w-full">
                        <div className="flex flex-col w-1/2 gap-[0.5vh]">
                            <label>Senha:
                                <input type="password" onChange={e => setSenha(e.target.value)} className="p-2 rounded-xl w-full bg-white text-black border border-[#341C1C] hover:border-[#FFF2DC] " />
                            </label>
                        </div>

                        <div className="flex flex-col w-1/2 gap-[0.5vh]" >
                            <label>Confirmar senha:
                                <input id="confirmarSenha" type="password" className="p-2 rounded-xl w-full bg-white text-black border border-[#341C1C] hover:border-[#FFF2DC] " />
                            </label>
                        </div>
                    </div>

                    <button type="submit" className="mt-4 w-52 text-[#FFF3DC] bg-[#680E28] border border-[#FFF3DC] rounded-xl px-4 py-2 hover:border-[#341C1C] hover:bg-[#FFF3DC] hover:text-[#341C1C] transition hover:cursor-pointer self-center">
                        Cadastrar
                    </button>
                </form>

                <p className="text-xs mt-4">Já possui conta? <a href="#" className="underline">Login</a></p>
            </div>
        </div>
    );
}
