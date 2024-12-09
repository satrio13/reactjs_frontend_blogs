import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

function Navbar()
{
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const logoutHandler = async () => 
    {
        try
        {   
            setLoading(true);
            await api.post('/api/logout', {}, 
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            localStorage.removeItem("token");
            navigate('/');
        }catch(error)
        {
            console.error('Error:', error);
        }finally
        {
            setLoading(false);
        }
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
                <div className="container">
                    <Link to="/" className="text-white text-decoration-none me-2">HOME</Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                        >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="/posts" className="nav-link active" aria-current="page">POSTS</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/download" className="nav-link active" aria-current="page">DOWNLOAD</Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0" role="search">
                            <button type="button" className="btn btn-success me-2">{ localStorage.getItem('name') }</button>
                            <button onClick={logoutHandler} className="btn btn-danger" disabled={loading}>
                                { loading ? (
                                    <div className="spinner-border spinner-border-sm" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                ) : (
                                    'LOGOUT'
                                )}
                            </button>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;