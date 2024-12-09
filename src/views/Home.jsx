import Navbar from "./Navbar";

function Home() 
{
    return (
        <>
            <Navbar/>
            <div className="p-5 mb-4 bg-light rounded-3">
                <div className="container-fluid py-5">
                    <h1 className="display-5 fw-bold">REACT (VITE) + LARAVEL 8</h1>
                    <p className="col-md-8 fs-4">CRUD dengan React dan Laravel 8</p>
                </div>
            </div>
        </>
    )
}

export default Home;