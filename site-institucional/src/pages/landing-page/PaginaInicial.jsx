import Navbar from '../Navbar'
import Section_1 from './Secao1'
import Section_2 from './Secao2'
import Section_3 from './Secao3'
import Section_4 from './Secao4'
import Footer from '../Footer'
import '../../index.css'

export default function HomePage() {


    return (

        <>
            <div className="scroll-smooth bg-[#FFF3DC]">
                <header>
                    <Navbar />
                </header>

                <section className="relative bg-[url('/assets/background.png')] bg-center bg-cover h-160 w-full" id="inicio">
                    <Section_1 />
                    <div className="absolute bottom-5 left-0 w-full overflow-hidden leading-[0]">
                        <svg
                            className="relative block w-[calc(100%+1.3px)] h-[80px]"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 1440 320"
                            preserveAspectRatio="none"
                        >
                            <path
                                fill="#b49d71" 
                                d="M0,192L80,170.7C160,149,320,107,480,117.3C640,128,800,192,
                                960,208C1120,224,1280,192,1360,176L1440,160L1440,320L1360,
                                320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,
                                320,160,320,80,320L0,320Z"
                            />
                        </svg>
                    </div>

                    <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] ">
                        <svg
                            className="relative block w-[calc(100%+1.3px)] h-[100px] "
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 1440 320"
                            preserveAspectRatio="none"
                        >
                            <path
                                fill="#FFF3DC" 
                                d="M0,192L80,170.7C160,149,320,107,480,117.3C640,128,800,192,
                                960,208C1120,224,1280,192,1360,176L1440,160L1440,320L1360,
                                320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,
                                320,160,320,80,320L0,320Z"
                            />
                        </svg>

                        
                    </div>


                </section>

                <section className="bg-[#FFF3DC] bg-[url('/assets/wave-background.png')] bg-center bg-cover h-170 md:h-140 w-full" id="sobre">
                    <Section_2 />
                </section>

                <section className="bg-[#FFF3DC] h-140 w-full" id="para_voce">
                    <Section_3 />
                    <div className="absolute left-0 w-full overflow-hidden leading-[0] ">
                        <svg
                            className="relative block w-[calc(100%+1.3px)] h-[40px] rotate-180"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 1440 320"
                            preserveAspectRatio="none"
                        >
                            <path
                                fill="#FFF3DC" 
                                d="M0,192L80,170.7C160,149,320,107,480,117.3C640,128,800,192,
                                960,208C1120,224,1280,192,1360,176L1440,160L1440,320L1360,
                                320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,
                                320,160,320,80,320L0,320Z"
                            />
                        </svg>

                        
                    </div>
                </section>

                <section className="bg-[#241313] md:h-140 w-full" id="contato">
                    <Section_4 />
                </section>

                <section className="bg-[#1D0F0F] md:h-110 w-full " id="footer">
                    <Footer />
                </section>
            </div>
        </>
    )
}