proxy = 'https://englishannotation.el.r.appspot.com';

async function show_tweets_index() {
    const url = proxy + '/story/list';
    const response = await fetch(url, {
	  method: 'GET',
        headers: {
            'Content-type': 'application/json',
		    "Authorization": 'Bearer '+localStorage.getItem("token")
           }
    });
    filter_list_options = `<option value="" selected hidden>Sort By: Story</option><option value="">All</option>`
    if (response.status === 200) {
        var data = await response.json();
        stories = data.data;
        console.log(data)
        for (key in stories) {
            filter_list_options += `<option value="${stories[key].title}">${stories[key].title}</option>`
        }
    } else if (response.status === 401) {
        window.location.href = 'login.html'
    }
    document.getElementById("filter_story_list").innerHTML = filter_list_options;

    story_name = document.getElementById('filter_story_list').value
    url1 = proxy + '/tweets/list';
    const responce = await fetch(url1, {
        	method: 'POST',
            headers: {
			'Content-type': 'application/json',
		    "Authorization": 'Bearer '+localStorage.getItem("token")
            },
            body: JSON.stringify({ "story": `${story_name}` })
	})
	
	const users = await fetch(proxy+'/users/list', {
        	method: 'GET',
            headers: {
			'Content-type': 'application/json',
		    "Authorization": 'Bearer '+localStorage.getItem("token")
            }
	})
	
	user_ = await users.json();
    user=user_.data
    data = await responce.json();
    console.log(user)
    // var token=localStorage.getItem("token")
    // console.log(token)
    if (responce.status === 200) {
        tweet_data = data.data;
        console.log(tweet_data)
        //console.log(users);
        //console.log(tweet_data)
        let tab = '';
        for (key in tweet_data) {
            form_id = 'form_' + tweet_data[key].tweet_id;
            tab += `<form id="${form_id}"><tr>
            <th scope="row" class="align-middle">${tweet_data[key].story}</th>
            <td class="align-middle">${tweet_data[key].tweet_id}</td>
            <td class="w-50" class="align-middle">${tweet_data[key].tweet}</td>`
            assigned_to = tweet_data[key].assignedTo;
            list_for_select = []
            for (usr in user) {
                if (!(assigned_to.includes(user[usr].name))) {
                    list_for_select.push({ 'name': user[usr].name});
                }
            }
            //console.log(list_for_select);
            count = 0;
            for (u in assigned_to) {
                if (tweet_data[key].annotatedBy.includes(assigned_to[u])) {
                    tab += `<td class="align-middle text-success"><i class="fas fa-check-circle mr-1"></i>${assigned_to[u]}</td>`
                } else {
                    tab += `<td class="align-middle text-danger"><i class="fas fa-clock mr-1"></i>${assigned_to[u]}</td>`
                }
                count += 1;
            }
            select_options = '';
            for (k in list_for_select) {
                select_options += `<option value="${list_for_select[k].name}">${list_for_select[k].name}</option>`
            }

            if (assigned_to.length < 4) {
                while (count < 4) {
                    tab += `<td class="align-middle"><select form="${form_id}" class="form-select" name="${count}" aria-label="Default select example">
                    <option selected hidden>Select User</option>${select_options}</select></td>`
                    count += 1
                }
                tab += `<td class="align-middle"><button type="submit" class="btn btn-outline-primary" id="${tweet_data[key].tweet_id}" onclick="assign_users(this.id)">ASSIGN</button></td></tr></form>`
            } else {
                tab += `<td class="align-middle"></td></tr></form>`
            }


        }
        document.getElementById('tweet_data_body').innerHTML = tab;
    } else {
        document.getElementById('tweet_data_body').innerHTML = `<h1 class="mt-5">No Tweets Found</h1>`;
    }

}

async function assign_users(id) {
    var formElements = document.getElementById("form_" + id).elements;
    userList = []
    for (var i = 0; i < formElements.length; i++) {
        if (formElements[i].type != "submit") //we dont want to include the submit-buttom
            userList.push(formElements[i].value);
    }
    let filtered_userList = filtered = userList.filter(function(str) { return !str.includes('Select User'); });
    userSet = new Set(filtered_userList)

    

    if (filtered_userList.length === userSet.size) {
        if (filtered_userList.length === 1) {
        console.log(userSet)
        console.log(filtered_userList)
        fetch(proxy + '/tweets/assign', {
            method: 'post',
            body: JSON.stringify({ 'tweet_id': id, 'name': filtered_userList[0],"thirdAnnotator": false }),
            headers: {
                'Content-type': 'application/json',
                "Authorization": 'Bearer '+localStorage.getItem("token")
            }
        
        }).then(responce => {
            if (responce.status === 200) {
                Swal.fire({
                    title: 'Tweet Assigned Successfully!',
                    icon: 'success',
                    timer: 2000
                })
                show_tweets_index();
            } else if (responce.status === 500) {
                Swal.fire({
                    title: 'Please enter single user at a time',
                    icon: 'error',
                    timer: 4000
                })
            }else{
                window.location.href = 'Login.html';
            }
        })}else{
            alert('Please enter single user at a time')
            show_tweets_index();
        }
    } else {
        alert('cannot be same')
    }
}
        

// }


///// show stories

async function showStories() {
    const url = proxy + '/story/list';
    const response = await fetch(url, {
	  method: 'GET',
        headers: {
                'Content-type': 'application/json',
		    "Authorization": 'Bearer '+localStorage.getItem("token")
           }
    });
    tab = '';
    filter_list_options = `<select class="col-3 form-select form-select-lg"><option value="" selected>Sort By: Story</option>`
    if (response.status === 200) {
        var data = await response.json();
        stories = data.data;
            //console.log(counts)
            //console.log(stories)
        for (i in stories) {
            story_name = stories[i].title
                //console.log(counts[story_name])
                //console.log(key)

            //console.log(stories[key]._id)
            tab += `<li class="list-group-item d-flex justify-content-between align-items-center">
            ${story_name}
            <span class="badge badge-primary badge-pill">${stories[i].count}</span></li>`

            ////////////////////////////////////
            filter_list_options += `<option value="${story_name}">${stories[i].title}</option>`
			
        }
        filter_list_options += `</select>`
    }
    document.getElementById("story_list").innerHTML = tab;
    document.getElementById("filter_story_list").innerHTML = filter_list_options;
}



//ADD story
async function add_story() {
    let story_name = document.getElementById('new_story_name').value;
    if (story_name.length > 0) {
        fetch(proxy + '/story/create', {
            method: 'POST',
            body: JSON.stringify({ 'title': story_name }),
            headers: {
                'Content-type': 'application/json',
		    "Authorization": 'Bearer '+localStorage.getItem("token")
            }
        }).then(response => {
            if (response.status === 201) {
                Swal.fire({
                    title: 'Story Added Successfully',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                })
                showStories();
                document.getElementById('new_story_name').value = '';
            } else if (response.status === 400) {
                Swal.fire({
                    title: 'Story with this title already exists',
                    icon: 'error'
                })
            } else {
                Swal.fire({
                    title: 'Internal Server Error!!!',
                    icon: 'error'
                })
            }
        })
    } else {
        alert('please enter story name')
    }
}


//////  ADD tweet

////// FIlter Tweets
async function filter_tweets() {
    //console.log('changed')
    loader=` <h4>
                <span class="align-middle">
                <tr>  
                <td colspan="7"> 
                    <div class="d-flex justify-content-center">
                    <div class="spinner-border" style="width: 10rem; height: 10rem;" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                    </div>
                </td>
                </tr>
                </span>
            </h4>`
    document.getElementById('tweet_data_body').innerHTML = loader;
    var story_name_ = document.getElementById("filter_story_list").value;
	console.log(document.getElementById("filter_story_list").value)
    url = proxy + '/tweets/list';
    const responce = await fetch(url, {
        	method: 'POST',
            headers: {
			'Content-type': 'application/json',
		    "Authorization": 'Bearer '+localStorage.getItem("token")
            },
            body: JSON.stringify({ "story": `${story_name_}` })
	})
    data = await responce.json();
    //console.log(data)
    const users = await fetch(proxy+'/users/list', {
        method: 'GET',
        headers: {
        'Content-type': 'application/json',
        "Authorization": 'Bearer '+localStorage.getItem("token")
        }
    })

    user_ = await users.json();
    user=user_.data
    if (responce.status === 200) {
        tweet_data = data.data;
        console.log(tweet_data)
        let tab = '';
        for (key in tweet_data) {
            form_id = 'form_' + tweet_data[key].tweet_id;
            tab += `<form id="${form_id}"><tr>
            <th scope="row" class="align-middle">${tweet_data[key].story}</th>
            <td class="align-middle">${tweet_data[key].tweet_id}</td>
            <td class="w-50" class="align-middle">${tweet_data[key].tweet}</td>`
            assigned_to = tweet_data[key].assignedTo;
            //console.log(assigned_to)
            list_for_select = []
            for (usr in user) {
                if (!(assigned_to.includes(user[usr].name))) {
                    list_for_select.push({ 'name': user[usr].name, 'id': user[usr]._id });
                }
            }
            //console.log(list_for_select);
            count = 0;
            for (u in assigned_to) {
                if (tweet_data[key].annotatedBy.includes(assigned_to[u])) {
                    tab += `<td class="align-middle text-success"><i class="fas fa-check-circle mr-1"></i>${assigned_to[u]}</td>`
                } else {
                    tab += `<td class="align-middle text-danger"><i class="fas fa-clock mr-1"></i>${assigned_to[u]}</td>`
                }
                count += 1;
            }
            select_options = '';
            for (k in list_for_select) {
                select_options += `<option value="${list_for_select[k].name}">${list_for_select[k].name}</option>`
            }

            if (assigned_to.length < 4) {
                while (count < 4) {
                    tab += `<td class="align-middle"><select form="${form_id}" class="form-select" name="${count}" aria-label="Default select example">
                    <option selected selected hidden>Select User</option>${select_options}</select></td>`
                    count += 1
                }
                tab += `<td class="align-middle"><button type="submit" class="btn btn-outline-primary" id="${tweet_data[key].tweet_id}" onclick="assign_users(this.id)">ASSIGN</button></td></tr></form>`
            } else {
                tab += `<td class="align-middle"></td></tr></form>`
            }


        }
        document.getElementById('tweet_data_body').innerHTML = tab;
    } else {
        document.getElementById('tweet_data_body').innerHTML = `<h1 class="mt-5">No Tweets Found</h1>`;
    }
        
}
	
	
async function add_tweets() {
    const url = proxy + '/story/list';
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
		    "Authorization": 'Bearer '+localStorage.getItem("token")
           }
    });
    if (response.status === 200) {
        var data = await response.json();
        stories = data.data;
        //console.log(stories)
        select_option = '<option value="" selected hidden>Select Story</option>'
        for (key in stories) {
            select_option += `<option value="${stories[key].title}">${stories[key].title}</option>`
        }
    } else if (response.status === 401) {
        window.location.href = 'login.html'
    } else {
        alert('network error')
    }
    let select_box_html = `<select id="story_name_for_tweet" class="swal2-input">${select_option}</select>`
    Swal.fire({
        title: 'Add Tweet File',
        html: `${select_box_html}<input type="file" id="file" class="swal2-input" placeholder="file" multiple>`,
        confirmButtonText: 'SUBMIT',
        focusConfirm: false,
        preConfirm: () => {
            var input = document.getElementById("file");
            var sel = document.getElementById("story_name_for_tweet")
            var opt = sel.options[sel.selectedIndex];
            let story_name = opt.value;
            if (input.files && input.files[0]) {
                const formData = new FormData();
                for (const file of input.files) {
                    formData.append('files', file)
                }
                //let myFile = input.files[0]
                //formData.append('file', myFile);
                formData.append('story', story_name);
                console.log(input.files)
                    //console.log(story_name)
                    
                return fetch(proxy + `/tweets/add`, {
                        method:'POST',
                        headers: {
                        'Authorization': `Bearer `+localStorage.getItem("token"),
                        },
                        body: formData
                    })
                    .then(response => {
                        //console.log(response)
                        if (response.status === 400) {
                            throw new Error(response.statusText)
                        }
                        return response.json()
                    })
                    .catch(error => {
                        Swal.showValidationMessage(
                            `Request failed: ${error} Story is mandatory and Upload proper files`
                        )
                    })
            }
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'tweet Added Successfully!',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false
            })
            show_tweets_index();
        }
    })
}
{/*
proxy = 'https://englishannotation.el.r.appspot.com';

async function show_tweets_index() {
    url = proxy + '/tweets/list';
    const response = await fetch(url, {
        headers: {
            "Authorization": 'Bearer '+localStorage.getItem("token")
        }
    });
    filter_list_options = `<option value="" selected hidden>Sort By: Story</option><option value="all">All</option>`
    if (response.status === 200) {
        var data = await response.json();
        stories = data['stories'];
        //console.log(stories)
        for (key in stories) {
            filter_list_options += `<option value="${stories[key]._id}">${stories[key]._id}</option>`
        }
    } else if (response.status === 401) {
        window.location.href = 'login.html'
    }
    document.getElementById("filter_story_list").innerHTML = filter_list_options;

    story_name = document.getElementById('')
    url = proxy + '/api/index'
    const responce = await fetch(url, {
        headers: {
            "Authorization": 'Bearer '+localStorage.getItem("token")
        }
    });
    data = await responce.json();
    //console.log(data)
    if (responce.status === 200) {
        tweet_data = data['tweet_data'];
        users = data['users'];
        //console.log(tweet_data)
        //console.log(users);
        //console.log(tweet_data)
        let tab = '';
        for (key in tweet_data) {
            form_id = 'form_' + tweet_data[key].tweet_id;
            tab += `<form id="${form_id}"><tr>
            <th scope="row" class="align-middle">${tweet_data[key].story}</th>
            <td class="align-middle">${tweet_data[key].tweet_id}</td>
            <td class="w-50" class="align-middle">${tweet_data[key].tweet}</td>`
            assigned_to = tweet_data[key].assigned_to;
            list_for_select = []
            for (usr in users) {
                if (!(assigned_to.includes(users[usr]._id))) {
                    list_for_select.push({ 'name': users[usr]._id });
                }
            }
            //console.log(list_for_select);
            count = 0;
            for (u in assigned_to) {
                if (tweet_data[key].annotated_by.includes(assigned_to[u])) {
                    tab += `<td class="align-middle text-success"><i class="fas fa-check-circle mr-1"></i>${assigned_to[u]}</td>`
                } else {
                    tab += `<td class="align-middle text-danger"><i class="fas fa-clock mr-1"></i>${assigned_to[u]}</td>`
                }
                count += 1;
            }
            select_options = '';
            for (k in list_for_select) {
                select_options += `<option value="${list_for_select[k].name}">${list_for_select[k].name}</option>`
            }

            if (assigned_to.length < 3) {
                while (count < 3) {
                    tab += `<td class="align-middle"><select form="${form_id}" class="form-select" name="${count}" aria-label="Default select example">
                    <option selected hidden>Select User</option>${select_options}</select></td>`
                    count += 1
                }
                tab += `<td class="align-middle"><button type="submit" class="btn btn-outline-primary" id="${tweet_data[key].tweet_id}" onclick="assign_users(this.id)">ASSIGN</button></td></tr></form>`
            } else {
                tab += `<td class="align-middle"></td></tr></form>`
            }


        }
        document.getElementById('tweet_data_body').innerHTML = tab;
    } else {
        document.getElementById('tweet_data_body').innerHTML = `<h1 class="mt-5">No Tweets Found</h1>`;
    }

}

async function assign_users(id) {
    var formElements = document.getElementById("form_" + id).elements;
    userList = []
    for (var i = 0; i < formElements.length; i++) {
        if (formElements[i].type != "submit") //we dont want to include the submit-buttom
            userList.push(formElements[i].value);
    }
    let filtered_userList = filtered = userList.filter(function(str) { return !str.includes('Select User'); });
    userSet = new Set(filtered_userList)
    if (filtered_userList.length === userSet.size) {
        fetch(proxy + '/api/index', {
            method: 'post',
            body: JSON.stringify({ 'tweet_id': id, 'users_assigned': filtered_userList }),
            headers: {
                'Content-type': 'application/json',
                "x-access-token": localStorage.getItem("token")
            }
        }).then(responce => {
            if (responce.status === 200) {
                Swal.fire({
                    title: 'Tweet Assigned Successfully!',
                    icon: 'success',
                    timer: 2000
                })
                show_tweets_index();
            } else if (responce.status === 401) {
                window.location.href = 'login.html';
            }
        })
    } else {
        alert('cannot be same')
    }

}


///// show stories

async function showStories() {
    const url = proxy + '/story/list';
    const response = await fetch(url, {
	  method: 'GET',
        headers: {
                'Content-type': 'application/json',
		    "Authorization": 'Bearer '+localStorage.getItem("token")
           }
    });
    tab = '';
    filter_list_options = `<select class="col-3 form-select form-select-lg"><option value="all" selected>Sort By: Story</option>`
    if (response.status === 200) {
        var data = await response.json();
        stories = data.data;
            //console.log(counts)
            //console.log(stories)
        for (i in stories) {
            story_name = stories[i].title
                //console.log(counts[story_name])
                //console.log(key)

            //console.log(stories[key]._id)
            tab += `<li class="list-group-item d-flex justify-content-between align-items-center">
            ${story_name}
            <span class="badge badge-primary badge-pill">${stories[i].count}</span></li>`

            ////////////////////////////////////
            filter_list_options += `<option value="${stories[i].title}">${stories[i].title}</option>`
        }
        filter_list_options += `</select>`
    }
    document.getElementById("story_list").innerHTML = tab;
    document.getElementById("filter_story_list").innerHTML = filter_list_options;
}



/// ADD story
async function add_story() {
    let story_name = document.getElementById('new_story_name').value;
    if (story_name.length > 0) {
        fetch(proxy + '/story/create', {
            method: 'POST',
            body: JSON.stringify({ 'title': story_name }),
            headers: {
                'Content-type': 'application/json',
		    "Authorization": 'Bearer '+localStorage.getItem("token")
            }
        }).then(response => {
            if (response.status === 201) {
                Swal.fire({
                    title: 'Story Added Successfully',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                })
                showStories();
                document.getElementById('new_story_name').value = '';
            } else if (response.status === 401) {
                window.location.href = 'login.html';
            } else if (response.status === 403) {
                Swal.fire({
                    title: '! Cannot add same story again !!!',
                    icon: 'warning'
                })
            } else if (response.status === 400) {
                Swal.fire({
                    title: 'Bad Request!!!',
                    icon: 'error'
                })
            } else {
                Swal.fire({
                    title: 'Internal Server Error!!!',
                    icon: 'error'
                })
            }
        })
    } else {
        alert('please enter story name')
    }
}


//////  ADD tweet


////// FIlter Tweets
async function filter_tweets() {
    //console.log('changed')
    var story_name = document.getElementById("filter_story_list").value;
    url = proxy + '/tweets/list';
    const responce = await fetch(url, {
        	method: 'POST',
            body: JSON.stringify({ 'story': story_name }),
            headers: {
		    "Authorization": 'Bearer '+localStorage.getItem("token")
            }
    });
    data = await responce.json();
    //console.log(data)
    if (responce.status === 200) {
        tweet_data = data.data;
        // users = data['users'];
        console.log(responce)
        //console.log(users);
        //console.log(tweet_data)
        let tab = '';
        for (key in tweet_data) {
            form_id = 'form_' + tweet_data[key].tweet_id;
            tab += `<form id="${form_id}"><tr>
            <th scope="row" class="align-middle">${tweet_data[key].story}</th>
            <td class="align-middle">${tweet_data[key].tweet_id}</td>
            <td class="w-50" class="align-middle">${tweet_data[key].tweet}</td>`
            assigned_to = tweet_data[key].assigned_to;
            //console.log(assigned_to)
            list_for_select = []
            for (usr in users) {
                if (!(assigned_to.includes(users[usr]._id))) {
                    list_for_select.push({ 'name': users[usr]._id, 'id': users[usr]._id });
                }
            }
            //console.log(list_for_select);
            count = 0;
            for (u in assigned_to) {
                if (tweet_data[key].annotated_by.includes(assigned_to[u])) {
                    tab += `<td class="align-middle text-success"><i class="fas fa-check-circle mr-1"></i>${assigned_to[u]}</td>`
                } else {
                    tab += `<td class="align-middle text-danger"><i class="fas fa-clock mr-1"></i>${assigned_to[u]}</td>`
                }
                count += 1;
            }
            select_options = '';
            for (k in list_for_select) {
                select_options += `<option value="${list_for_select[k].name}">${list_for_select[k].name}</option>`
            }

            if (assigned_to.length < 3) {
                while (count < 3) {
                    tab += `<td class="align-middle"><select form="${form_id}" class="form-select" name="${count}" aria-label="Default select example">
                    <option selected selected hidden>Select User</option>${select_options}</select></td>`
                    count += 1
                }
                tab += `<td class="align-middle"><button type="submit" class="btn btn-outline-primary" id="${tweet_data[key].tweet_id}" onclick="assign_users(this.id)">ASSIGN</button></td></tr></form>`
            } else {
                tab += `<td class="align-middle"></td></tr></form>`
            }


        }
        document.getElementById('tweet_data_body').innerHTML = tab;
    } else {
        document.getElementById('tweet_data_body').innerHTML = `<h1 class="mt-5">No Tweets Found</h1>`;
    }
}
*/}