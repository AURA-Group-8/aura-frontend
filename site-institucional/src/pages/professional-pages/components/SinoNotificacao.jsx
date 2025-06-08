import { useNavigate } from "react-router-dom";

export default function SinoNotificacao() {
    const navigate = useNavigate();
    return (
        <div className="w-full flex flex-row justify-end">
            <img className="h-8 m-2 cursor-pointer" 
            src="/assets/Doorbell.png" 
            alt="" 
            onClick={() => navigate("/pages/professional-pages/SinoNotificacao")}/>
        </div>
    );
}