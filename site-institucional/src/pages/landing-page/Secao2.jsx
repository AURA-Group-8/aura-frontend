import React, { useState, useEffect } from 'react';

function Section_2() {

    const [imagemAtual, setImagemAtual] = useState(0);

    const imagens = [
        { id: 1, src: '/assets/pincel-1.png', alt: 'Imagem 1' },
        { id: 2, src: '/assets/pincel-2.png', alt: 'Imagem 2' }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setImagemAtual((img) => (img + 1) === imagens.length ? 0 : img + 1);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div className="h-full flex flex-col md:justify-center items-center">
                <div className="flex flex-col justify-center items-center gap-5 xl:mt-30 text-center font-bold text-3xl text-[#241313]">
                    <h1 className='text-2xl font-bold xl:text-5xl md:mt-5 xl:mt-15'>
                        Somos a <span className="text-[#982546] "><i>AURA</i></span>
                    </h1>
                    <h2 className="text-xl text-[#3f2c1d] xl:text-4xl mt-5"><i>"Facilidade para clientes, organização para profissionais"</i></h2>
                </div>

                <div className="flex flex-col md:flex-row justify-around items-center md:gap-30 xl:gap-40 p-15">
                    <span className="text-center md:w-90 xl:w-150 xl:text-2xl xl:leading-12 leading-10 text-xl text-[#241313]">
                        A Aura é uma empresa de tecnologia dedicada a criar soluções para o setor de beleza.
                        Pensando na praticidade e experiência dos clientes e profissionais, desenvolvemos um sistema de agendamento,
                        conectando profissionais a quem busca serviços de qualidade.
                    </span>

                    <div className="w-80 overflow-hidden relative">
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{
                                transform: `translateX(-${imagemAtual * 100}%)`
                            }}
                        >
                            {imagens.map((imagem) => (
                                <div key={imagem.id} className="h-80 w-80 p-10 flex-shrink-0 xl:h-100 md:p-0">
                                    <img
                                        src={imagem.src}
                                        alt={imagem.alt}
                                        className="w-full h-full"
                                    />   
                                </div>
                            ))}
                        </div>
                    </div>
                </div>


            </div>
        </>
    )
}
export default Section_2