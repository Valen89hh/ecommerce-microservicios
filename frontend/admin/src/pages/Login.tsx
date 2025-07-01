import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
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