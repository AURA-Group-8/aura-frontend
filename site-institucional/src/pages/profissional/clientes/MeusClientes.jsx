import { useNavigate } from "react-router-dom";
import MenuLateral from "../componentes/MenuLateral";
import CardCliente from "../componentes/CardCliente";
import { useState, useEffect } from "react";
import SinoNotificacao from "../componentes/SinoNotificacao";
import axios from "axios";

export default function MeusClientes() {
  const [clientes, setClientes] = useState([]);
  const [filtroNome, setFiltroNome] = useState("");
  const [clientesFiltrados, setClientesFiltrados] = useState([]);
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_URL_V2;

  useEffect(() => {
    const listarUsuarios = async () => {
      try {
        const token = sessionStorage.getItem("authToken");

        const response = await axios.get(`${apiUrl}/usuarios`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setClientes(response.data || []);
        setClientesFiltrados(response.data || []);
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
      }
    };

    listarUsuarios();
  }, []);

  useEffect(() => {
    const filtro = filtroNome.toLowerCase();

    const filtrados = clientes.filter((cliente) =>
      cliente.username.toLowerCase().includes(filtro)
    );

    setClientesFiltrados(filtrados);
  }, [filtroNome, clientes]);

  return (
    <div className="w-full h-screen bg-[#FFF3DC]">
      <div className="h-full flex flex-row">
        <MenuLateral />

        <div className="flex flex-col w-full h-full items-center">
          <SinoNotificacao/>

          <h1 className="text-[#982546] font-bold text-2xl md:ml-20">Meus clientes</h1>

          <div className="flex flex-col-reverse gap-5 md:gap-0 md:flex-row xl:w-250 xl:text-lg md:w-210 justify-between  mt-10">
            <button
              className="p-2 bg-[#982546] rounded-2xl text-[#FFF3DC] cursor-pointer hover:bg-[#b36078] transition-colors"
              onClick={() => navigate("/profissional/mensagens")}
            >
              Enviar mensagem para todos
            </button>
            <input
              type="text"
              placeholder="Buscar cliente"
              className="p-2 bg-white rounded-2xl border border-[#982546]"
              value={filtroNome}
              onChange={(e) => setFiltroNome(e.target.value)}
            />
          </div>

          <div className="flex flex-col h-180 xl:h-full gap-5 p-2 overflow-y-auto mt-10">
            {clientesFiltrados.length > 0 ? (
              clientesFiltrados.map((usuario) => (
                <CardCliente
                  key={usuario.id}
                  id={usuario.id}
                  name={usuario.username}
                  email={usuario.email}
                  role={usuario.roleId}
                  phone={usuario.phone}
                  birthDate={usuario.dateOfBirth}
                />
              ))
            ) : (
              <p className="text-[#982546] mt-10">Nenhum usuário encontrado.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
