import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../api';
import Navbar from '../Navbar';
import Swal from 'sweetalert2';

function PostCreate()
{
    const [image, setImage] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);

    const [validation, setValidation] = useState([]);

    const navigate = useNavigate();

    const handleFileChange = (e) => 
    {
        const file = e.target.files[0]; 
        
        setImage(file); 
        
        if(file) 
        {
            const reader = new FileReader();
            reader.onload = function (f)
            {
                const previewImage = document.getElementById('preview_gambar');
                previewImage.src = f.target.result;
            };
            reader.readAsDataURL(file); 
        }
    }

    const storePost = async (e) => 
    {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();

        formData.append('image', image);
        formData.append('title', title);
        formData.append('content', content);
        
        try
        {
            const token = localStorage.getItem('token');

            const response = await api.post('/api/posts', formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            navigate('/posts');
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
                        <h3 className="text-center mb-2">HALAMAN TAMBAH POSTS</h3>
                        <div className="card border-0 rounded shadow">
                            <div className="card-body">
                                <form onSubmit={storePost}>
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Image</label>
                                        <img className="img-responsive" id="preview_gambar" width="150px"/>
                                        <input type="file" accept="image/png, image/jpeg" onChange={handleFileChange} className="form-control"/>
                                        {
                                            validation.image && 
                                            (
                                                <div className="alert alert-danger alert-sm-custom mt-2">
                                                    {validation.image[0]}
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Title</label>
                                        <input type="text" className="form-control" onChange={(e) => setTitle(e.target.value)} maxLength="100" placeholder="Title Post"/>
                                        {
                                            validation.title && 
                                            (
                                                <div className="alert alert-danger alert-sm-custom mt-2">
                                                    {validation.title[0]}
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Content</label>
                                        <textarea className="form-control" onChange={(e) => setContent(e.target.value)} rows="5" placeholder="Content Post"></textarea>
                                        {
                                            validation.content && 
                                            (
                                                <div className="alert alert-danger alert-sm-custom mt-2">
                                                    {validation.content[0]}
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
                                    <Link to="/posts" className="btn btn-danger float-end">Back</Link>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PostCreate;