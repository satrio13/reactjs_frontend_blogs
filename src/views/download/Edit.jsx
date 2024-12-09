import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../../api';
import Navbar from '../Navbar';
import Swal from 'sweetalert2';

function DownloadEdit()
{
    const [file, setFile] = useState('');
    const [name, setName] = useState('');
    const [currentFile, setCurrentFile] = useState('');
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [validation, setValidation] = useState([]);
    
    const navigate = useNavigate();

    const { id } = useParams();
    const token = localStorage.getItem('token');

    const fetchDetailDownload = async () => 
    {   
        try
        {     
            const response = await api.get(`/api/download/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setName(response.data.data.name);
            setCurrentFile(response.data.data.file);
        }catch(error)
        {
            console.error('Error:', error);
            navigate('/404');
        }finally 
        {
            setLoading(false); 
        }
    }

    useEffect(() => 
    {
        fetchDetailDownload();
    }, []);

    const updateDownload = async (e) => 
    {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData();

        formData.append('file', file);
        formData.append('name', name);
        formData.append('_method', 'PUT');

        try
        {
            const response = await api.post(`/api/download/${id}`, formData,
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
                if(error.response.status == 404)
                {
                    Swal.fire('Error!','Data tidak ditemukan' ,'error');
                }else
                {
                    Swal.fire('Error!','Data gagal diupdate, terjadi kesalahan ' + error.response.status + ' ' +error.response.statusText ,'error');
                }
            }
        }finally
        {
            setIsSubmitting(false);
        }
    }

    return (
        <>
            <Navbar/>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h3 className="text-center mb-2">HALAMAN EDIT DOWNLOAD</h3>
                        <div className="card border-0 rounded shadow">
                            <div className="card-body">
                                {
                                    loading ? 
                                    (
                                        <div className="text-center">
                                            <div className="spinner-border text-primary" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        </div>
                                    ) : 
                                    (
                                        <form onSubmit={updateDownload}>                            
                                            <div className="mb-3">                                
                                                <label className="form-label fw-bold">File</label>
                                                <input type="file" onChange={(e) => setFile(e.target.files[0])} className="form-control"/>
                                                <small className="text-danger">*) File maximal 1MB (format: jpeg, jpg, png, pdf, doc, docx, xls, xlsx)</small>
                                                <br/>
                                                <small>File Sekarang: <a href={`http://localhost:8000/download/${currentFile}`} target="_blank">{currentFile}</a></small>
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
                                                <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="File Name"/>
                                                {
                                                    validation.name && 
                                                    (
                                                        <div className="alert alert-danger alert-sm-custom mt-2">
                                                            {validation.name[0]}
                                                        </div>
                                                    )
                                                }
                                            </div>
                                            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                                { isSubmitting ? (
                                                    <div className="spinner-border spinner-border-sm" role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                    </div>
                                                ) : (
                                                    'Update'
                                                )}
                                            </button>
                                            <Link to="/download" className="btn btn-danger float-end">Back</Link>
                                        </form>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DownloadEdit;