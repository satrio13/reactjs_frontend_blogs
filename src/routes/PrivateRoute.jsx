import { Navigate } from 'react-router-dom';

function isTokenExpired(token)
{
    if(!token) return true;

    // Ambil bagian payload token (setelah tanda titik pertama dan kedua)
    const payload = token.split('.')[1];

    // Dekode dari base64Url ke JSON
    const decodedPayload = JSON.parse(atob(payload));

    // Ambil waktu kadaluarsa (exp) dari payload
    const exp = decodedPayload.exp;

    // Bandingkan waktu kadaluarsa dengan waktu saat ini
    if(!exp) return true; // Jika tidak ada 'exp' maka anggap token expired

    // Waktu kadaluarsa dalam detik, konversi ke milidetik
    const expirationTime = exp * 1000;
    const currentTime = Date.now(); // Waktu saat ini dalam milidetik

    return expirationTime < currentTime; // Jika waktu kadaluarsa lebih kecil dari waktu sekarang, token sudah expired
}

function PrivateRoute({ element })
{
    const token = localStorage.getItem('token'); // Mengambil token dari localStorage

    // Jika token tidak ada atau sudah kadaluarsa, arahkan ke halaman login
    if(!token || isTokenExpired(token))
    {   
        localStorage.removeItem("token");
        return <Navigate to="/" />
    }

    // Jika token valid, tampilkan elemen yang diminta
    return element;
}

export default PrivateRoute;