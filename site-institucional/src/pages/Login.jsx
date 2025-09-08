import FormularioLogin from './componentes/FormularioLogin';
import Header from './cliente/componentes/HeaderLogin';

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