import { useNavigate } from "react-router-dom";
import MenuLateral from "./components/MenuLateral";
import CardCliente from "./components/CardCliente";
import { useState, useEffect } from "react";
import axios from "axios";

export default function MeusClientes() {
  const [clientes, setClientes] = useState([]);
  const [filtroNome, setFiltroNome] = useState("");
  const [clientesFiltrados, setClientesFiltrados] = useState([]);
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const listarUsuarios = async () => {
      try {
        const token = sessionStorage.getItem("authToken");

        const response = await axios.get(`${apiUrl}/usuarios`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Resposta da API:", response.data);

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
          <div className="w-full flex flex-row justify-end">
            <img
              className="h-8 m-2"
              src="/assets/Doorbell.png"
              alt="Sino de notificações"
            />
          </div>

          <h1 className="text-[#982546] font-bold text-2xl ml-20">Meus clientes</h1>

          <div className="flex flex-row w-210 justify-between ml-20 mt-10">
            <button
              className="p-2 bg-[#982546] rounded-2xl text-[#FFF3DC] cursor-pointer"
              onClick={() => navigate("/pages/professional-pages/Mensagem")}
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

          <div className="flex flex-col h-90 p-2 overflow-y-auto">
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
