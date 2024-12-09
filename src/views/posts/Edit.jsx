import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../../api';
import Navbar from '../Navbar';
import Swal from 'sweetalert2';

function PostEdit()
{
    const [image, setImage] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const [validation, setValidation] = useState([]);
    const [currentImage, setCurrentImage] = useState('');
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    const { id } = useParams();
    const token = localStorage.getItem('token');

    const fetchDetailPost = async () => 
    {   
        try
        {     
            const response = await api.get(`/api/posts/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setTitle(response.data.data.title);
            setContent(response.data.data.content);
            setCurrentImage(response.data.data.image);
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
        fetchDetailPost();
    }, []);

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

    const updatePost = async (e) => 
    {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData();

        formData.append('image', image);
        formData.append('title', title);
        formData.append('content', content);
        formData.append('_method', 'PUT');

        try
        {
            const response = await api.post(`/api/posts/${id}`, formData,
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
                        <h3 className="text-center mb-2">HALAMAN EDIT POSTS</h3>
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
                                        <form onSubmit={updatePost}>                            
                                            <div className="mb-3">
                                                <label className="form-label fw-bold">Image</label>
                                                <img className="img-responsive" id="preview_gambar" width="150px" src={currentImage ? `http://localhost:8000/img/${currentImage}` : ''}/>
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
                                                <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title Post"/>
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
                                                <textarea className="form-control" value={content} onChange={(e) => setContent(e.target.value)} rows="5" placeholder="Content Post"></textarea>
                                                {
                                                    validation.content && 
                                                    (
                                                        <div className="alert alert-danger alert-sm-custom mt-2">
                                                            {validation.content[0]}
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
                                            <Link to="/posts" className="btn btn-danger float-end">Back</Link>
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

export default PostEdit;