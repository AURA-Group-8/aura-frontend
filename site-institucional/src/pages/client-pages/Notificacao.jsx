import React from "react";
import NavbarCli from "./components/Navbar";


const Notificacao = () => {
  return ( 
  <><NavbarCli/>
    <div className="min-h-screen bg-[#fef3e2] p-6">
     

      <h1 className="text-center text-2xl font-bold text-[#7c1d34] mb-6">Notificações</h1>

      <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#3b2a29] scrollbar-track-[#e7cfc6]">
        <div className="bg-[#9e837c] text-white rounded-lg p-6">
          <p className="mb-2">
            Soubemos que realizou seu primeiro atendimento! Nos dê o seu feedback, para podermos melhorar sua experiência e mantê-lo conosco!
          </p>
          <div className="flex justify-between items-center">
            <span className="text-sm">09/03/25 – 12:30</span>
            <button className="flex items-center bg-white text-black px-4 py-1 rounded-md hover:bg-gray-200">
              Avaliar
            </button>
          </div>
        </div>

        <div className="bg-[#9e837c] text-white rounded-lg p-6">
          <p className="mb-2">Amanda Farias realizou um agendamento</p>
          <span className="text-sm">09/03/25 – 12:30</span>
        </div>

        <div className="bg-[#9e837c] text-white rounded-lg p-6">
          <p className="mb-2">
            Roberta Solza das quantas cancelou o agendamento<br />
            Motivo: aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
          </p>
          <span className="text-sm">09/03/25 – 12:30</span>
        </div>
      </div>
    </div></>
    
  );
};

export default Notificacao;
