import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../api';
import Navbar from '../Navbar';
import Swal from 'sweetalert2';

function DownloadCreate()
{
    const [file, setFile] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    const [validation, setValidation] = useState([]);

    const navigate = useNavigate();

    const storeDownload = async (e) => 
    {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();

        formData.append('file', file);
        formData.append('name', name);
        
        try
        {
            const token = localStorage.getItem('token');

            const response = await api.post('/api/download', formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            navigate('/download');
            Swal.fire('Success!', response.data.message, 'success'); 
        }catch(error) 
        {    
            setValidation(error.response.data);
            if(error.response && error.response.status !== 422)
            {
                Swal.fire('Error!','Data gagal disimpan, terjadi kesalahan ' + error.response.status + ' ' +error.response.statusText ,'error');
            }
        }finally
        {
            setLoading(false);
        }
    }

    return (
        <>
            <Navbar/>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h3 className="text-center mb-2">HALAMAN TAMBAH DOWNLOAD</h3>
                        <div className="card border-0 rounded shadow">
                            <div className="card-body">
                                <form onSubmit={storeDownload}>
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">File</label>
                                        <input type="file" onChange={(e) => setFile(e.target.files[0])} className="form-control"/>
                                        <small className="text-danger">*) File maximal 1MB (format: jpeg, jpg, png, pdf, doc, docx, xls, xlsx)</small>
                                        {
                                            validation.file && 
                                            (
                                                <div className="alert alert-danger alert-sm-custom mt-2">
                                                    {validation.file[0]}
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">File Name</label>
                                        <input type="text" className="form-control" onChange={(e) => setName(e.target.value)} maxLength="100" placeholder="File Name"/>
                                        {
                                            validation.name && 
                                            (
                                                <div className="alert alert-danger alert-sm-custom mt-2">
                                                    {validation.name[0]}
                                                </div>
                                            )
                                        }
                                    </div>
                                    <button type="submit" className="btn btn-primary" disabled={loading}>
                                        { loading ? (
                                            <div className="spinner-border spinner-border-sm" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        ) : (
                                            'Save'
                                        )}
                                    </button>
                                    <Link to="/download" className="btn btn-danger float-end">Back</Link>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DownloadCreate;