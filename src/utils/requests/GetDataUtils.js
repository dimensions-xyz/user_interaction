import AsyncStorage from '@react-native-async-storage/async-storage'
import NetworkUtils from '../NetworkUtils'

export async function getPosts(pageCurrent) {

    // Kullanıcı ve postları birbirine indexlerken böyle bir yol izledim.
    // Eğer daha mantıklı bir yolu varsa bana da söylerseniz öğrenmiş olurum :)
    // (path kısmında userid den kullanıcı adı çekmek mümksünse bana söyler misiniz?)

    let users = ""
    let post = ""

    const isConnected = await NetworkUtils.isNetworkAvailable()

    if (isConnected) {

        // Getting Persons
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


        // Getting Posts
        await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10&_page=' + pageCurrent, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json; charset=UTF-8'
            }
        }).then((response) => response.text())
            .then((result) => {
                post = JSON.parse(result)

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

        // Getting Current User Infos
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

    await AsyncStorage.getItem("userid").then(value => {
        userid = value
    });

    const isConnected = await NetworkUtils.isNetworkAvailable()

    if (isConnected) {
        // Getting Todo List
        await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userid}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json; charset=UTF-8'
            }
        }).then((response) => response.text())
            .then((result) => {
                todos = JSON.parse(result)
            });
    }

    return { todos, isConnected }
}

export async function getAlbums() {

    let userid = ""
    let albums = ""

    const isConnected = await NetworkUtils.isNetworkAvailable()

    if (isConnected) {
        await AsyncStorage.getItem("userid").then(value => {
            userid = value
        });

        // Getting Albums
        await fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userid}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json; charset=UTF-8'
            }
        }).then((response) => response.text())
            .then((result) => {
                albums = JSON.parse(result)
            });
    }

    return { albums, isConnected }
}