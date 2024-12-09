import { Routes, Route } from 'react-router-dom';
import Login from '../views/auth/Login';
import Register from '../views/auth/Register';
import Home from '../views/Home';
import PostIndex from '../views/posts/Index';
import PostCreate from '../views/posts/Create';
import PostEdit from '../views/posts/Edit';
import DownloadIndex from '../views/download/Index';
import DownloadCreate from '../views/download/Create';
import DownloadEdit from '../views/download/Edit';
import NotFound from '../views/404';
import PrivateRoute from './PrivateRoute';

function Index() 
{
    return (
        <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/home" element={<Home/>} />
            <Route path="/posts" element={<PrivateRoute element={<PostIndex/>} />} />
            <Route path="/posts/create" element={<PrivateRoute element={<PostCreate/>} />} />
            <Route path="/posts/edit/:id" element={<PrivateRoute element={<PostEdit/>} />} />
            <Route path="/download" element={<PrivateRoute element={<DownloadIndex/>} />} />
            <Route path="/download/create" element={<PrivateRoute element={<DownloadCreate/>} />} />
            <Route path="/download/edit/:id" element={<PrivateRoute element={<DownloadEdit/>} />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default Index;