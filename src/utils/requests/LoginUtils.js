import NetworkUtils from '../NetworkUtils';

export async function LoginRequest(username) {

    let status = ""

    const isConnected = await NetworkUtils.isNetworkAvailable()

    // Girilen kullanıcı adının verilerini getirir (Giriş sayfasında kullandım. Eğer veri 1den küçükse giriş yapılmayacak)
    await fetch(`https://jsonplaceholder.typicode.com/users?username=${username}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json; charset=UTF-8'
        }
    }).then((response) => response.text())
        .then((result) => { status = JSON.parse(result) })


    return { isConnected, status }
}