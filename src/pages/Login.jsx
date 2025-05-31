import { useState } from "react";
import { users } from "../data/users-constat";
import { useNavigate } from "react-router-dom";
import { login } from "../utils/storage";

function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");
    // console.log(email)
    // console.log(senha)
    const navigate = useNavigate();
    
    function handleLogin() {
        // const userFound = users.filter(user => user.email === email);
        const userFound = users.find(user => user.email.toLowerCase() === email.toLowerCase().trim());
        console.log(userFound);
        // null
        // undefined
        // 0
        if(userFound) {
            const match = senha === userFound.senha
            if(match) {
                // Usuario autenticado
                setError("")
                login(JSON.stringify(userFound))
                navigate("/painel");
                return;
            }
            // Senha invalida
            setError("Senha invalida")
            return;
        }
        // Usuario não encontrado
        setError("Usuario não encontrado")
        return;
    }

    return(
        <div className="flex flex-grow shadow m-6 rounded-[12px] bg-slate-200 justify-center items-center">
            <div className="flex flex-col min-w-[398px] gap-3 p-6">
                <h3 className="text-center font-bold">Faça Login na sua conta</h3>
                <div className=" field flex flex-col w-[100%]">
                    <span>E-mail</span>
                    <input className="rounded-[8px] min-h-[25px] p-2" 
                    placeholder="Informe seu e-mail" type="email" name="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className=" field flex flex-col w-[100%]">
                    <span>Senha</span>
                    <input className="rounded-[8px] min-h-[25px] p-2" 
                    placeholder="Digite sua senha" type="password" name="senha" 
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}/>
                </div>
                <span>Esqueceu sua Senha?</span>
                <button 
                onClick={handleLogin}
                className="
                 text-white
                 hover:bg-color-second
                 bg-color-primary 
                 uppercase 
                 font-bold 
                 rounded-[8px] 
                 min-h-[40px]"
                 >Entrar</button>
                 <span className="text-red-error">{error}</span>
            </div>
        </div>
    )
}

export default Login;