import FormsContact from "../FormsContact"

function Section_4() {
    return (
        <>
            <div className="h-full flex flex-col justify-center items-center text-xl md:text-2xl ">
                <h1 className="text-center font-bold text-2xl text-[#FFF3DC] mt-20 md:mt-0 xl:text-5xl">
                    Fale conosco
                </h1>

                <div className="flex flex-col xl:justify-evenly md:flex-row w-full justify-around items-center">
                    <div className="flex flex-col  text-center items-center gap-8 ">
                        <h1 className="text-[#cdcdcd] text-6xl tracking-widest mt-12 md:mt-0">AURA</h1>
                        <span className="text-[#FFF3DC] text-xl xl:text-2xl w-80 md:w-90 xl:w-100">
                            Entre contato conosco para nos fornecer feedbacks, esclarecer
                            dúvidas sobre funcionalidades ou para relatar qualquer tipo de problema!
                        </span>
                    </div>

                    <FormsContact />
                </div>
            </div>
        </>
    )

}
export default Section_4