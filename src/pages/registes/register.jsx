import "./register.css"
import logo from "../../assets/logo.png"
import image from "../../assets/fundo.png"
import { Link, useNavigate } from "react-router-dom"
import api from "../../constants/api"
import { useState } from "react"

function Register() {

    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const [message, setMessage] = useState("")
    async function HandleRegister() {

        try {
            setMessage("")
            if(password !== password2){
                setMessage("As senhas não coincidem.Tente novamente.")
                return
            }
            const response = await api.post("/admin/register", {
                name,
                email,
                password
            });

            if (response.data) {
                const user = {
                    name,
                    email,
                    token: response.data.token,
                    id: response.data.id_admin
                }
                localStorage.setItem("user", JSON.stringify(user))
                api.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`
                navigate("/appointments")
            } else {
                setMessage("Erro ao criar conta.Tente novamente mais tarde.")
            }


        } catch (error) {
            if (error.response?.data.error) {

                setMessage(error.response.data.error)
            } else {
                setMessage("Erro ao criar conta.Tente novamente mais tarde.")
            }
        }
    }

    return <div className="row">
        <div className="col-sm-5 d-flex justify-content-center align-items-center text-center">
            <form className="form-signin">
                <img src={logo} className="mb-4" />
                <h5 className="mb-4">Crie sua conta agora mesmo</h5>
                <h5 className="mb-4 text-secondary">Preencha os campos abaixo.</h5>
                <div className="mt-4">
                    <input type="text" placeholder="Nome" className="form-control" onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mt-2">
                    <input type="email" placeholder="E-mail" className="form-control" onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="mt-2">
                    <input type="password" placeholder="Senha" className="form-control" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="mt-2">
                    <input type="password" placeholder="Confirme a enha" className="form-control" onChange={(e) => setPassword2(e.target.value)} />
                </div>
                <div className="mt-3 mb-5">
                    <button className="btn btn-primary w-100" onClick={HandleRegister} type="button">Criar conta</button>
                </div>
                {
                    message.length > 0 &&
                    <div className="alert alert-danger" role="alert">
                        {message}
                    </div>
                }
                <div>
                    <span className="me-1">Já tenho uma conta.</span>
                    <Link to="/">Acessar agora</Link>
                </div>
            </form>
        </div>
        <div className="col-sm-7">
            <img src={image} className="background-login" />

        </div>
    </div>

}

export default Register