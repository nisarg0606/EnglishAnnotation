proxy = 'http://3.87.187.229:5000';

async function checkLogin() {
    var email = localStorage.getItem('email');
    //let password = localStorage.getItem('password');
    //let isAdmin = localStorage.getItem('isAdmin');

    var body = document.getElementById("body");
    body.style.display = 'none';
    url = proxy + '/login'
    var token = localStorage.getItem("token");
    if (!token) {
        window.location.href = 'Login.html';
    } else {
        //
        if (localStorage.getItem('role') === "1") {
            body.style.display = 'block';
        } else {
            window.location.href = 'Login.html';
        }
        //localStorage.setItem('name', d.name);
    }
    document.getElementById("username").innerHTML = "Welcome, " + name;
    /*var response = await fetch(url, {
        method: 'post',
        body: JSON.stringify({
            'email': email,
            'password': password,
            'isadmin': isAdmin
        }),
        headers: {
            'Content-type': 'application/json'
        }
    })
    if (response.status === 200) {
        d = await response.json();
        localStorage.setItem('name', d.name);
        body.style.display = 'block';
        //localStorage.setItem('name', d.name);
        document.getElementById("username").innerHTML = "Welcome, " + d.name
    } else {
        //console.log(d)
        console.log('imin')

    }*/
}

function logout() {
    window.location.href = 'Login.html';
    localStorage.clear();
}