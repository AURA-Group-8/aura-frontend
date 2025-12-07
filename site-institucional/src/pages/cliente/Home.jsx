import { useNavigate } from "react-router-dom";
import NavbarCli from "./componentes/Navbar";
import { useState } from "react";

export default function Home() {
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);

    const services = [
        {
            title: "Nanopigmentação",
            description: "Técnica de preenchimento de sobrancelhas com pigmentos naturais.",
            image: "/assets/Lash-extension.jpg",
        },
        {
            title: "Lashlifting",
            description: "Procedimento para curvar e levantar os cílios naturais.",
            image: "/assets/Brow-lamination.jpg",
        },
        {
            title: "Hydragloss",
            description: "Tratamento para hidratar e dar brilho aos lábios.",
            image: "/assets/Gloss-lips.jpg",
        },
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % services.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + services.length) % services.length);
    };

    return (
        <>
            <div className="w-full h-full bg-[#FFF3DC] font-sans">

                <NavbarCli caminho={"/login"} />


                <div className="bg-[url('/assets/bg-cli.png')] bg-center bg-no-repeat bg-cover h-[80vh] w-full text-[#FFF3DC] flex flex-col md:flex-row justify-around items-center pt-16 pb-16">
                    <h1 className="font-bold text-2xl md:text-4xl w-80 md:w-60 text-center mt-10 md:mt-0 leading-relaxed">
                        Seu agendamento com praticidade e agilidade!
                    </h1>

                    <div className="flex flex-col justify-center items-end gap-5">
                        <button
                            onClick={() => navigate("/cliente/meus-agendamentos")}
                            className="bg-[#982546] border mt-14 border-[#FFF3DC] text-[#FFF3DC] py-4 px-6 rounded-2xl font-bold cursor-pointer text-xl hover:bg-[#b36078] transition-transform transform hover:scale-105 shadow-lg"
                        >
                            Consultar Agendamentos
                        </button>
                        <button
                            onClick={() => navigate("/cliente/contato")}
                            className="cursor-pointer bg-[#FFF3DC] border mb-4 border-[#982546] text-[#982546] flex flex-row items-center py-2 px-6 rounded-2xl font-bold text-xl hover:bg-[#f1ecbd] transition-transform transform hover:scale-105 shadow-lg"
                        >
                            <span>Contato</span>
                            <img src="/assets/Help.png" alt="Ajuda" className="h-8 ml-2" />
                        </button>
                    </div>
                </div>

                <div
                    className="bg-[#FFF3DC] bg-[url('/assets/wave-background.png')] bg-center bg-cover p-10 w-full min-h-[95vh] flex flex-col justify-center items-center"
                >
                   
                    <h1 className="text-[#341C1C] font-bold text-3xl text-center mb-10">
                        Alguns dos serviços disponíveis
                    </h1>

                    <div className="relative w-full max-w-4xl overflow-hidden">
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{
                                transform: `translateX(-${currentSlide * 100}%)`,
                            }}
                        >
                            {services.map((service, index) => (
                                <div
                                    key={index}
                                    className="flex-shrink-0 w-full flex flex-col items-center"
                                    style={{ width: "100%" }}
                                >
                                    <div className="relative group flex flex-col w-full md:w-96 shadow-lg hover:shadow-xl transition-shadow">
                                        <div className="bg-[#982546] p-4 text-[#FFF3DC] font-bold rounded-tl-2xl rounded-tr-2xl text-center">
                                            {service.title}
                                        </div>
                                        <div className="relative overflow-hidden rounded-bl-2xl rounded-br-2xl">
                                            <img
                                                src={service.image}
                                                alt={service.title}
                                                className="h-64 md:h-72 w-full object-cover"
                                                onError={(e) => {
                                                    e.target.src = "https://via.placeholder.com/300";
                                                }}
                                            />
                                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <p className="text-[#FFF3DC] text-center px-4">
                                                    {service.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={prevSlide}
                            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#982546] text-[#FFF3DC] p-2 rounded-full shadow-lg hover:bg-[#b36078] transition"
                        >
                            &#8592;
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#982546] text-[#FFF3DC] p-2 rounded-full shadow-lg hover:bg-[#b36078] transition"
                        >
                            &#8594;
                        </button>
                    </div>

                     
                    <button
                        onClick={() => navigate("/cliente/agendar")}
                        className="cursor-pointer mt-12 bg-[#341C1C] text-[#FFF3DC] p-4 rounded-2xl self-center text-xl font-bold mb-10 hover:bg-[#452f2e] transition-transform transform hover:scale-105 shadow-lg"
                    >
                        Agendar atendimento
                    </button>

                </div>

                <footer className="bg-[#341C1C] text-[#FFF3DC] p-6 text-center">
                    <p>© 2025 AURA</p>
                    <div className="flex justify-center gap-4 mt-4">
                        <a href="#" className="hover:text-[#b36078]">Facebook</a>
                        <a href="#" className="hover:text-[#b36078]">Instagram</a>
                    </div>
                </footer>
            </div>
        </>
    );
}