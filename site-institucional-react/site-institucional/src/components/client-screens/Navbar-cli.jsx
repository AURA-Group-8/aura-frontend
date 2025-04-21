
import { useNavigate } from 'react-router-dom';

export default function NavbarCli() {

    const navigate = useNavigate();

    return (

        <>

            <div className="bg-[#FFF3DC] w-full h-15 flex flex-row justify-between items-center p-2 fixed ">
                <div>
                    <img src="/assets/logo-escuro-horizontal.png" alt="" className="h-30" />
                </div>

                <div className="flex flex-row  ">
                    <img src="/assets/user.png" alt="" className="h-8 cursor-pointer " onClick={() => navigate("/components/client-screens/Config")} />
                    <img src="/assets/Doorbell.png" alt="" className="h-8" />
                </div>
            </div>
        </>
    )
}