import FormsContact from "../FormsContact"

function Section_4() {
    return (
        <>
            <div className="h-full flex flex-col justify-center items-center">
                <h1 className="text-center font-bold text-3xl text-[#FFF3DC]">
                    Fale conosco
                </h1>

                <div className="flex flex-row w-full justify-around items-center mt-10">
                    <div className="flex flex-col  text-center items-center gap-8">
                        <h1 className="text-[#cdcdcd] text-6xl tracking-widest">AURA</h1>
                        <span className="text-[#FFF3DC] text-2xl w-90">
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