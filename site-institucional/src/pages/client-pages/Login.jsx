import FormularioLogin from './components/FormsLogin';
import Header from '../Header-login';

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