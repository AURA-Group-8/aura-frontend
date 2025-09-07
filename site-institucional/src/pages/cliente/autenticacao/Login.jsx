import FormularioLogin from '../componentes/FormularioLogin';
import Header from '../componentes/HeaderLogin';

export default function Login() {
    return (
        <>


            <div className="min-h-screen flex flex-col justify-between">
                <Header caminho={"/"} />
                <FormularioLogin />
            </div>
        </>
    );
}