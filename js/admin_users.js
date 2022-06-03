proxy = 'https://englishannotation.el.r.appspot.com';

async function add_user() {
    Swal.fire({
        title: 'Create User',
        html: `<input type="name" id="name" class="swal2-input" placeholder="username">
        <input type="email" id="Email" class="swal2-input" placeholder="Email">
        <input type="password" id="password" class="swal2-input" placeholder="Password"><br><br>
        <input type="checkbox" id="isadmin" class="mr-3" placeholder="admin access">admin access`,
        confirmButtonText: 'Create',
        focusConfirm: false,
        preConfirm: () => {
            const name = Swal.getPopup().querySelector('#name').value;
            const email = Swal.getPopup().querySelector('#Email').value;
            const password = Swal.getPopup().querySelector('#password').value;
            const role = (Swal.getPopup().querySelector('#isadmin').checked)? 1:2;
            //console.log(isadmin)
            return fetch(proxy + `/admin/add-user`, {
                    method: 'post',
                    body: JSON.stringify({ 'name': name, 'email': email, 'password': password, 'role': role }),
                    headers: {
                        'Content-type': 'application/json',
                        "Authorization": 'Bearer '+localStorage.getItem("token")
                    }

                })
                .then(response => {
                    //console.log(response)
                    if (response.status != 201) {
                        throw new Error(response.statusText)
                    }
                    return response.json()
                })
                .catch(error => {
                    Swal.showValidationMessage(
                        `Request failed: ${error} Please fill all the fields`
                    )
                })
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'User Created Successfully!',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false
            })
            display_users();
        }
    })
}


async function display_users() {
    // let loader = `<h4>
    //                 <tr>  
    //                 <td colspan="4"> 
    //                     <div class="d-flex justify-content-center">
    //                     <div class="spinner-border style="width: 20rem; height: 20rem;" role="status">
    //                         <span class="sr-only">Loading...</span>
    //                     </div>
    //                     </div>
    //                 </td>
    //                 </tr>
    //               </h4>`;
    // document.getElementById('user_table').innerHTML = loader;
    //console.log('in user function');
    url = proxy + '/users/list';
    const response = await fetch(url, {
        method: 'get',
        headers:{
            "Authorization": 'Bearer '+localStorage.getItem("token")
        }
    });
    if (response.status == 200) {
        var data = await response.json();
        data = data.data;
        let tab = ''

        // console.log(data)
        for (usr in data) {
            console.log(data[usr])
            if (data[usr].role === 1) {
                icon = '<i class="fas fa-user-cog mr-3"></i>'
            } else {
                icon = '<i class="fas fa-user mr-3"></i>'
            }
			var id=data[usr]._id;
            //icon = '<i class="fas fa-user-cog"></i>'
            tab += `<tr class="candidates-list">
            <td class="title">
                <div class="candidate-list-details">
                    <div class="candidate-list-info align-middle">
                        <div class="candidate-list-title">
                            <h5 class="mb-0 text-primary">${data[usr].name}</h5>
                        </div>
                        <div class="candidate-list-option">
                            <ul class="list-unstyled">
                                <li>${icon}</i>${data[usr].email}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </td>
            <td class="candidate-list-favourite-time text-center align-middle">
                <span class="candidate-list-time order-1"><h4>${[data[usr].assignedTweets]}</h4></span>
            </td>
            <td class="candidate-list-favourite-time text-center align-middle">
                <span class="candidate-list-time order-1"><h4>${data[usr].annotatedTweets}</h4></span>
            </td>
            <td class="align-middle">
                <div class="list-unstyled mb-0 d-flex justify-content-center">
                    <button href="#" class="btn btn-outline-info" data-toggle="modal" data-target="#assign_tweets" data-toggle="tooltip" data-placement="top" title="Tap to assign tweets to user" id="${data[usr]._id}" onclick="display_tweets_by_users(id)">View Report</button>
                </div>
            </td>
        </tr>`
        }
        document.getElementById("user_table").innerHTML = tab;
        //console.log('displaying');
    }
}

function annotate(res,id){
	for (i in res){
		if(i.tweet_id===id){
			return i.annotated
		}
	}
	
}


async function display_tweets_by_users(id) {
    loader=`    <h4>
                    <span class="align-middle">
                     <tr>  
                     <td colspan="4"> 
                         <div class="d-flex justify-content-center">
                         <div class="spinner-border" style="width: 10rem; height: 10rem;" role="status">
                             <span class="sr-only">Loading...</span>
                         </div>
                         </div>
                     </td>
                     </tr>
                    </span>
                   </h4>`
    document.getElementById("show_tweets_for_user").innerHTML = loader;
    url = proxy + '/users/report/' + id;
    let response = await fetch(url, {
        method: 'get',
        headers:{
            'Content-type': 'application/json',
            "Authorization": 'Bearer '+localStorage.getItem("token")
        }
    })
     if (response.status === 200) {
         var data = await response.json();
          data = data.data
         if (data.assgined.length === 0) {
             tab = `<h1 class="my-3">No Assigned Tweets.......!</h1>`
         } else {
             //console.log(data)
             tab = ``
			 for (key in data.tweets) {
                 tab += `<tr>
             <td class="align-middle">${data.tweets[key].story}</td>
             <td class="align-middle">${data.tweets[key].tweet_id}</td>
             <td class="align-middle">${data.tweets[key].tweet}</td>
             <td class="align-middle">
                 <div class=" container justify-content-center">`
                 if (annotate(data.assigned,data.tweets[key].tweet_id)===true) {
                     icon = `<i class="fas fa-check-circle mr-3 fa-2x">`
                 } else { icon = `<i class="fas fa-clock fa-2x"></i>` }
                 tab += icon
                 tab += `</i></div></td>
             
         </tr>`
             }

         }
         document.getElementById("show_tweets_for_user").innerHTML = tab;
     }

}