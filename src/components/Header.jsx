import { Link } from 'react-router-dom';
import Auth from '../context/Auth';
import { logout } from '../services/AuthApi';
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';


const Header = () => {
    const { isAuthenticated, setIsAuthenticated } = useContext(Auth);
    const handleLogout = () => {
        logout()
        setIsAuthenticated(false)
    }

    const data = useSelector((state) => state.data);

    function searchProducts() {
        try {
            axios
                .post(data.api + 'companies/' + data.company.id + '/products/search')
                .then(search => search.data)
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <header className="header_home">
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="main_nav fixed-top">
                    <div className="logo-compagny">
                        <Link className="navbar-brand" to={'/'}><img src={data.company.logo} width='3%' alt='logo compagny' />{data.company.name}</Link>
                    </div>
                    <div className="container-fluid">
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                            {/* <!-- navbar slide left --> */}
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item active">
                                    <Link to={'/'} className="nav-link" aria-current="page">Home</Link>
                                </li>
                                <li className="nav-item active">
                                    <Link to={'/product'} className="nav-link" aria-current="page">Product</Link>
                                </li>
                                <li className="nav-item active">
                                    <Link to={'/detail-collection'} className="nav-link" aria-current="page">Blogs</Link>
                                </li>
                            </ul>
                            <div className="research_nav">
                                <form className="d-flex" style={{ width: '150%' }}>
                                    <input className="form-control me-2" type="search" placeholder="Search..." aria-label="Search" />
                                    <button className="btn btn-warning" type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
                                </form>
                            </div>
                            {/* <!-- navbar slide right --> */}
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item active">
                                    <Link to={'/cart'} className="nav-link" aria-current="page"><i className="fa-solid fa-cart-shopping"></i></Link>
                                </li>
                                {(!isAuthenticated && (
                                    <>
                                        <li className="nav-item active">
                                            <Link to={'#'} className="nav-link" data-bs-toggle="modal" data-bs-target="#modalCreateEvents" tabindex="-1" aria-disabled="true"><i className="fa-solid fa-registered" title='Register'></i></Link>
                                        </li>
                                        <li className="nav-item active">
                                            <Link to={'#'} className="nav-link" data-bs-toggle="modal" data-bs-target="#modalLogin" tabindex="-1" aria-disabled="true"><i className="fa-solid fa-user" title='Login'></i></Link>
                                        </li>
                                    </>
                                )) || ((
                                    <>
                                        <li className="nav-item active">
                                            <button onClick={handleLogout} className="btn nav-link" ariacurrent="page"><i class="fa-solid fa-power-off" title='Log Out'></i></button>
                                        </li>
                                    </>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header