import { Routes, Route } from "react-router-dom";
import {
  Register,
  Login,
  Home,
  PostIndex,
  PostCreate,
  PostEdit,
  DownloadIndex,
  DownloadCreate,
  DownloadEdit,
  NotFound,
} from "../views/Index";
import PrivateRoute from "./PrivateRoute";

function Index() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<PrivateRoute element={<Home />} />} />
      <Route path="/posts" element={<PrivateRoute element={<PostIndex />} />} />
      <Route
        path="/posts/create"
        element={<PrivateRoute element={<PostCreate />} />}
      />
      <Route
        path="/posts/edit/:id"
        element={<PrivateRoute element={<PostEdit />} />}
      />
      <Route
        path="/download"
        element={<PrivateRoute element={<DownloadIndex />} />}
      />
      <Route
        path="/download/create"
        element={<PrivateRoute element={<DownloadCreate />} />}
      />
      <Route
        path="/download/edit/:id"
        element={<PrivateRoute element={<DownloadEdit />} />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Index;
