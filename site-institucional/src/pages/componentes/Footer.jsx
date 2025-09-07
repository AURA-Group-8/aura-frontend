import { useNavigate } from "react-router-dom"

function Footer() {

    const navigate = useNavigate;

    return (


        <>
            <div className=" bg-[#1E0F0F] h-full flex flex-col justify-center items-center gap-15 ">

                <h1 className="text-center font-bold text-2xl xl:text-5xl text-[#FFF3DC] mt-10">
                    Contatos
                </h1>

                <div className="w-full flex flex-col gap-2 md:gap-2 md:flex-row justify-evenly p-5">

                    <div className="flex flex-col text-[#FFF3DC] w-70 text-xl xl:text-2xl">
                        <ul className="space-y-4">
                            <li className="flex flex-row items-center gap-2"><img src="/assets/Email-icon.png" alt="" className="h-10 " /><a href="">contatoaura@gmail.com</a></li>
                            <li className="flex flex-row items-center gap-2"><img src="/assets/Phone-icon.png" alt="" className="h-10 " />(11) 98950-9942</li>
                        </ul>
                    </div>

                    <div className="hidden md:flex">
                        <img src="/assets/logo-aura-claro.png " alt="" className="h-40 " />
                    </div>

                    <div className="flex flex-col text-[#FFF3DC] w-60 text-xl ">
                        <ul className="space-y-4">
                            <li className="flex flex-row items-center gap-2"><img src="/assets/Instagram-icon.png" alt="" className="h-10 " /><a href="">AURA_ofc</a></li>
                            <li className="flex flex-row items-center gap-2"><img src="/assets/X-icon.png" alt="" className="h-10 " /><a href="">ofc_AURA</a></li>
                            <li className="flex flex-row items-center gap-2"><img src="/assets/Facebook-icon.png" alt="" className="h-10 " /><a href="">AURA_aura</a></li>
                        </ul>
                    </div>
                </div>

                <p className="text-[#b1afab]">&copy;AURA</p>
            </div>
        </>
    )

}

export default Footer