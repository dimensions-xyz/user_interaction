import AsyncStorage from '@react-native-async-storage/async-storage';
import NetworkUtils from '../NetworkUtils';

export async function getPosts(pageCurrent) {

    let users = ""
    let post = ""

    const isConnected = await NetworkUtils.isNetworkAvailable()

    if (isConnected) {

        // Kullanıcı bilgilerini getirir
        await fetch('https://jsonplaceholder.typicode.com/users', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json; charset=UTF-8'
            }
        }).then((response) => response.text())
            .then((result) => {
                users = JSON.parse(result)
            })

        // Post bilgilerini sayfalayarak getirir.
        await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10&_page=' + pageCurrent, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json; charset=UTF-8'
            }
        }).then((response) => response.text())
            .then((result) => {
                post = JSON.parse(result)

                //Postların userIdlerini indexleme
                for (let i = 0; i < post.length; i++) {
                    for (let j = 0; j < users.length; j++) {
                        if (post[i].userId === users[j].id) {
                            post[i].name = users[j].name
                        }
                    }
                }

            });

    }

    return { post, isConnected }
}

export async function getUser(userid) {

    let user = ""
    const isConnected = await NetworkUtils.isNetworkAvailable()

    if (isConnected) {

        // Kullanıcı verisini getirir
        await fetch(`https://jsonplaceholder.typicode.com/users?id=${userid}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json; charset=UTF-8'
            }
        }).then((response) => response.text())
            .then((result) => {
                user = JSON.parse(result)
            });

    }

    return { user, isConnected }
}

export async function getTodos() {

    let userid = ""
    let todos = ""
    let queue = 0

    await AsyncStorage.getItem("userid").then(value => {
        userid = value
    });

    const isConnected = await NetworkUtils.isNetworkAvailable()

    if (isConnected) {

        // Kullanıcının yapılacaklar listesini getirir
        await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userid}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json; charset=UTF-8'
            }
        }).then((response) => response.text())
            .then((result) => {
                todos = JSON.parse(result)

                // Listeleri numaralama
                for (let i = 0; i < todos.length; i++) {
                    queue++
                    todos[i].queue = queue
                }

            });

    }

    return { todos, isConnected, queue }
}

export async function getAlbums() {

    let userid = ""
    let albums = ""
    let queue = 0

    const isConnected = await NetworkUtils.isNetworkAvailable()

    if (isConnected) {

        await AsyncStorage.getItem("userid").then(value => {
            userid = value
        });

        // Kullanıcı albümlerini getirir
        await fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userid}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json; charset=UTF-8'
            }
        }).then((response) => response.text())
            .then((result) => {
                albums = JSON.parse(result)

                // Listeleri numaralama
                for (let i = 0; i < albums.length; i++) {
                    queue++
                    albums[i].queue = queue
                }

            });
    }

    return { albums, isConnected }
}

export async function getPhotos(page, albumid) {

    let photos = ""
    const isConnected = await NetworkUtils.isNetworkAvailable()

    if (isConnected) {

        // Geçerli albümün fotoğraflarını sayfalayarak getirir.
        await fetch(`https://jsonplaceholder.typicode.com/photos?_limit=10&_page=${page}&albumId=${albumid}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json; charset=UTF-8'
            }
        }).then((response) => response.text())
            .then((result) => {
                photos = JSON.parse(result)

            });
    }

    return { photos, isConnected }
}

export async function getComments(postId) {

    let comments = ""
    const isConnected = await NetworkUtils.isNetworkAvailable()

    if (isConnected) {

        // Geçerli postun yorumlarını getirir
        await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json; charset=UTF-8'
            }
        }).then((response) => response.text())
            .then((result) => {
                comments = JSON.parse(result)

            });
    }

    return { comments, isConnected }
}
