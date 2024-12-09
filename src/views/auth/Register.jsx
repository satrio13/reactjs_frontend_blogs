import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../api';
import Swal from 'sweetalert2';

function Register()
{
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    const [validation, setValidation] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const registerHandler = async (e) => 
    {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();

        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('password_confirmation', passwordConfirmation);

        try
        {
            const response = await api.post('/api/register', formData);
        
            navigate('/');
            Swal.fire('Success!', response.data.message, 'success'); 
        }catch(error)  
        {
            setValidation(error.response.data);
        }finally 
        {
            setLoading(false); 
        }
    }

    return (
        <div className="container" style={{ marginTop: "120px" }}>
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="fw-bold">REGISTER</h4>
                            <hr/>
                            <form onSubmit={registerHandler}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">NAMA LENGKAP</label>
                                            <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Masukkan Nama Lengkap"/>
                                            {
                                                validation.name && 
                                                (
                                                    <div className="alert alert-danger alert-sm-custom mt-2">
                                                        {validation.name[0]}
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">ALAMAT EMAIL</label>
                                            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Masukkan Alamat Email"/>
                                            {
                                                validation.email && 
                                                (
                                                    <div className="alert alert-danger alert-sm-custom mt-2">
                                                        {validation.email[0]}
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">PASSWORD</label>
                                            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Masukkan Password"/>
                                            {
                                                validation.password && 
                                                (
                                                    <div className="alert alert-danger alert-sm-custom mt-2">
                                                        {validation.password[0]}
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">KONFIRMASI PASSWORD</label>
                                            <input type="password" className="form-control" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} placeholder="Masukkan Konfirmasi Password"/>
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary" disabled={loading}>
                                    { loading ? (
                                        <div className="spinner-border spinner-border-sm" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    ) : (
                                        'REGISTER'
                                    )}
                                </button>
                            </form>
                            <div className="mt-3">Kembali ke halaman login? <Link to="/" className="text-decoration-none">Login</Link></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;