import './navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/logo-white.png'
import api from '../../constants/api'
function NavBar() {
    const navigate = useNavigate();
    function Logout() {
        localStorage.removeItem("user")
        localStorage.removeItem("admin")
        api.defaults.headers.common["Authorization"] = ""
        navigate("/")
    }


    return <nav className="navbar fixed-top navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/appointments">
                <img src={logo} alt="Logo" className='navbar-logo' />
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link active" to="/appointments">Agendamentos</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" to="/doctors">Médicos</Link>
                    </li>
                </ul>
                <ul className="navbar-nav ">
                    <li className='nav-item'>
                        <div className="btn-group">
                            <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).name : localStorage.getItem("admin") ? JSON.parse(localStorage.getItem("admin")).name : "Login"}
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end">
                                <li><Link className="dropdown-item" href="#">Meu Perfil</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><button className="dropdown-item" onClick={Logout}>Desconectar</button></li>
                            </ul>
                        </div>


                    </li>
                </ul>
            </div>

        </div>
    </nav>
}

export default NavBar