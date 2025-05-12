import FormsContact from "../FormsContact"

function Section_4() {
    return (
        <>
            <div className="h-full flex flex-col justify-center items-center gap-15">

                <h1 className="text-center font-bold text-2xl text-[#FFF3DC] ">
                    Fale conosco
                </h1>

                <div className="flex flex-row w-full justify-around">
                    <div className="flex flex-col w-2xs text-center gap-8 ">
                        <h1 className="text-[#cdcdcd] text-6xl tracking-widest">AURA</h1>
                        <span className="text-[#FFF3DC]">Entre contato conosco para nos fornecer feedbacks, esclarecer
                            dúvidas sobre funcionalidades ou para relatar qualquer tipo de problema!</span>
                    </div>

                    <FormsContact />
                </div>


            </div>
        </>
    )

}
export default Section_4