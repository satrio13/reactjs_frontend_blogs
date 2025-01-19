import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [validation, setValidation] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/home");
    }
  }, []);

  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();

    formData.append("email", email);
    formData.append("password", password);

    try {
      const response = await api.post("/api/login", formData);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("name", response.data.user.name);
      navigate("/home");
    } catch (error) {
      setValidation(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h4 className="fw-bold">LOGIN</h4>
              <hr />
              {validation.message && (
                <div className="alert alert-danger">{validation.message}</div>
              )}
              <form onSubmit={loginHandler}>
                <div className="mb-3">
                  <label className="form-label">ALAMAT EMAIL</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Masukkan Alamat Email"
                  />
                  {validation.email && (
                    <div className="alert alert-danger alert-sm-custom mt-2">
                      {validation.email[0]}
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">PASSWORD</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan Password"
                  />
                  {validation.password && (
                    <div className="alert alert-danger alert-sm-custom mt-2">
                      {validation.password[0]}
                    </div>
                  )}
                </div>
                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? (
                      <div
                        className="spinner-border spinner-border-sm"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    ) : (
                      "LOGIN"
                    )}
                  </button>
                </div>
              </form>
              <div className="mt-3">
                Belum punya akun?{" "}
                <Link to="/register" className="text-decoration-none">
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
