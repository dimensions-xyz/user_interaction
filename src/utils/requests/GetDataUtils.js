import NetworkUtils from '../NetworkUtils'

export async function getPosts(pageCurrent) {

    // Kullanıcı ve postları birbirine indexlerken böyle bir yol izledim.
    // Eğer daha optimize bir yolu varsa bana da söylerseniz öğrenmiş olurum :)

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
        })

    return { user }
}