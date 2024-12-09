import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';
import Navbar from '../Navbar';
import Swal from 'sweetalert2';

function PostIndex()
{
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');

    const fetchDataPosts = async () => 
    {
        try
        {   
            const response = await api.get('/api/posts', 
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setPosts(response.data.data);
        }catch(error)
        {
            console.error('Error fetching data:', error);
        }finally 
        {
            setLoading(false);
        }
    }

    useEffect(() => 
    {    
        fetchDataPosts();
    }, []);

    const deletePost = async (id) =>
    {   
        const result = await Swal.fire({
            title: 'Apakah anda yakin ingin menghapus data ini?',
            text: "Data yang sudah dihapus tidak dapat dikembalikan",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya',
            cancelButtonText: 'Batal',
            reverseButtons: true
        });

        if(result.isConfirmed)
        {
            try
            {
                const response = await api.delete(`/api/posts/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                fetchDataPosts();
                Swal.fire('Deleted!', response.data.message, 'success');                
            }catch(error) 
            {   
                if(error.response.status == 404)
                {
                    Swal.fire('Error!','Data tidak ditemukan' ,'error');
                }else
                {
                    Swal.fire('Error!','Data gagal dihapus, terjadi kesalahan ' + error.response.status + ' ' +error.response.statusText ,'error');
                }
            }
        }
    }

    return (
        <>
            <Navbar/>
            <div className="container mt-5 mb-5">
                <div className="row">
                    <div className="col-md-12">
                        <h3 className="text-center mb-2">HALAMAN POSTS</h3>
                        <Link to="/posts/create" className="btn btn-success mb-3">ADD NEW POST</Link>
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
                                        <table className="table table-bordered">
                                            <thead className="bg-dark text-white text-center">
                                                <tr>
                                                    <th scope="col" width="5%">No</th>
                                                    <th scope="col">Image</th>
                                                    <th scope="col">Title</th>
                                                    <th scope="col">Content</th>
                                                    <th scope="col" style={{ width: '15%' }}>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    posts.length > 0 ? 
                                                    (
                                                        posts.map((post, index) => 
                                                        (
                                                            <tr key={ index }>
                                                                <td className="text-center">{index + 1}</td>
                                                                <td className='text-center'>
                                                                    <img 
                                                                        src={`http://localhost:8000/img/${post.image}`} 
                                                                        alt={post.title} 
                                                                        width="150px" 
                                                                        className="rounded" 
                                                                    />
                                                                </td>
                                                                <td>{ post.title }</td>
                                                                <td>{ post.content }</td>
                                                                <td className="text-center">
                                                                    <Link to={`/posts/edit/${post.id}`} className="btn btn-sm btn-primary me-2">EDIT</Link>
                                                                    <button onClick={() => deletePost(post.id)} className="btn btn-sm btn-danger">DELETE</button>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    ) : 
                                                    (
                                                        <tr>
                                                            <td colSpan="5" className="text-center">
                                                                <div className="alert alert-danger">
                                                                    Data Belum Tersedia!
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                }
                                            </tbody>
                                        </table>
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

export default PostIndex;