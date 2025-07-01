import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

const LoginPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = () => {
        login({ id: 1, name: 'Rodrigo', role: 'admin' });
        navigate('/dashboard');
    };

    return (
        <div>
            <h1>Login</h1>
            <button onClick={handleLogin}>Iniciar como admin</button>
        </div>
    );
}
 
export default LoginPage;