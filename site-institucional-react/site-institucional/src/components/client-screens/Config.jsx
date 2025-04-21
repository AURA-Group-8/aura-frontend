import NavbarCli from "./Navbar-cli";
import FormsConfig from "../Forms-config";

export default function ConfigCli() {

    return (
        <>
            <div className="h-full w-full bg-[#FFF3DC] flex justify-center ">

                <NavbarCli />

                <div className="h-full flex justify-center items-center">
                    <FormsConfig />
                </div>

            </div>
        </>
    )

}