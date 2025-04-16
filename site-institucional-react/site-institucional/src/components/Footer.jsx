function Footer() {

    return (
        <>
            <div className="h-full flex flex-col justify-center items-center gap-15">

                <div className="flex w-full justify-around items-center">
                    <div className="flex flex-col w-2xs text-center gap-8 ">
                        <ul className=" text-[#FFF3DC] flex flex-col gap-3 ">
                            <li className="flex flex-row items-center gap-5"><img src="src/assets/Email.png" className="h-10" alt="" />Contatos1234@auraSA.com</li>
                            <li className="flex flex-row items-center gap-5"><img src="src/assets/Phone Squared.png" className="h-10" alt="" />(xx)xxxxx-xxxx</li>
                        </ul>
                    </div>

                    <div className="flex flex-col items-center gap-10">
                        <h1 className="text-center font-bold text-2xl text-[#FFF3DC]">
                            Contatos
                        </h1>
                        <img src="src/assets/logo-aura-claro.png" alt="" className="h-48" />
                    </div>

                    <div>
                        <ul className=" text-[#FFF3DC] flex flex-col gap-3 ">
                            <li className="flex flex-row items-center gap-5"><img src="src/assets/Instagram.png" className="h-10" alt="" />AURA_ofc</li>
                            <li className="flex flex-row items-center gap-5"><img src="src/assets/X.png" className="h-10" alt="" />ofc_AURA</li>
                            <li className="flex flex-row items-center gap-5"><img src="src/assets/Facebook.png" className="h-10" alt="" />AURA_aura</li>
                        </ul>

                    </div>


                </div>


            </div>
        </>
    )

}

export default Footer