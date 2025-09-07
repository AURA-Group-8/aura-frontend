
import { useNavigate } from 'react-router-dom';

export default function NavbarCli({caminho}) {

    const navigate = useNavigate("");

    return (

        <>

            <div className="bg-[#FFF3DC] w-full h-15 flex flex-row justify-between items-center p-2 fixed shadow-2xs">
                <div>
                    <img src="/assets/Back.png" alt="" className="h-10 cursor-pointer" onClick={() => navigate(caminho)} />
                </div>

                <div className="flex flex-row items-center gap-5">
                    <img src="/assets/user.png" alt="" className="h-8 cursor-pointer " onClick={() => navigate("/cliente/configuracoes")} />
                    <img src="/assets/Doorbell.png" alt="" className="h-8 cursor-pointer" onClick={() => navigate("/cliente/notificacoes")}  />
                </div>
            </div>
        </>
    )
}