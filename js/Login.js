proxy = 'https://englishannotation.el.r.appspot.com';

async function performLogin() {
    //preventDefault()
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
	// console.log(email,password);
    var response = await fetch(proxy+'/login',{
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
			'withCredentials':true
        },
		body: JSON.stringify({
            'email':email,
            'password':password
        })
    })

    if (response.status === 200) {
        var data = await response.json()
        var token = data.data.token
		var role = data.data.user.role
		var name = data.data.user.name
        localStorage.setItem("token", token)
        localStorage.setItem('email', email)
        // localStorage.setItem('password', password);
        localStorage.setItem('role', role);
        localStorage.setItem('name', name);
        if (role===1) {
             window.location.href = 'Admin.html';
         } else {
             window.location.href = 'index.html';
         }
    } else if (response.status === 404) {
        Swal.fire({
            title: 'User with this email does not exist.',
            icon: 'error',
        })
    } else if (response.status === 400) {
        Swal.fire({
            title: 'Incorrect password or Username',
            icon: 'error',
        })
    } else {
        Swal.fire({
            title: 'Internal server error, please try again later',
            icon: 'error',
        })
    }
}
