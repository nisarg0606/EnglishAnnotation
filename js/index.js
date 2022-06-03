proxy = 'https://englishannotation.el.r.appspot.com';

async function checkLogin() {
    var name = localStorage.getItem('name');
    //let password = localStorage.getItem('password');
    //let isAdmin = localStorage.getItem('isAdmin');

    var body = document.getElementById("body");
    body.style.display = 'none';
    url = proxy + '/login'
    var token = localStorage.getItem("token");
    console.log(token)
    if (!token) {
        window.location.href = 'Login.html';
    } else {
        //
        body.style.display = 'block';
        displayTweetForAnnotate();
    }
}

async function displayTweetForAnnotate() {
    //document.getElementById("submitlabels").style.display = 'block';
    var name = localStorage.getItem('name')
    const response = await fetch(proxy + '/users/assigned-tweets?thirdAnnotator=false', {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            "Authorization": 'Bearer '+localStorage.getItem("token")
        }

    })
    if (response.status === 200) {
        var data = await response.json();
        // console.log(data)
        const total_tweet =data.data.tweets.length
        // console.log(datas)
        tab_1 = ``
        for (let i=0;i<total_tweet;i++){
            console.log(i,data.data.tweets[i].tweet_id)
			console.log(data.data.tweets[i].tweet_id in data.data.tweets[i].annotations)
      if (data.data.tweets[i].assignedTo.slice(0,2).includes(name)){
			if ((data.data.tweets[i].tweet_id in data.data.tweets[i].annotations)===true ){
				
				console.log(data.data.tweets[i].annotations[data.data.tweets[i].tweet_id])
                if (data.data.tweets[i].annotations[data.data.tweets[i].tweet_id].hasOwnProperty(name)===true){
                  console.log(data.data.tweets[i].annotations[data.data.tweets[i].tweet_id][name])
                  if (data.data.tweets[i].annotations[data.data.tweets[i].tweet_id][name] === "HOF" ) {
                    // || data.data.tweets[i].annotations[data.data.tweets[i].tweet_id][name] === "CHOF" 
                    innerhtml = `<i class="mr-3 fa fa-check" aria-hidden="true"></i><label class="btn btn-danger form-check-label mr-3">
                    <input class="form-check-input" onchange="addLabel(this.name,this.name,this.value)" type="radio" name="${data.data.tweets[i].tweet_id }" value="HOF" checked>
                    HOF
                  </label>
                      <label class="btn btn-success form-check-label">
                    <input class="form-check-input" onchange="addLabel(this.name,this.name,this.value)" type="radio" name="${data.data.tweets[i].tweet_id }" value="NONE"> NONE
                  </label>`
                  tab_1 += `<li class="list-group-item d-flex justify-content-between align-items-center input-group-prepend list-group-item-primary">
            <span class="w-90" id="main_tweet" >${data.data.tweets[i].tweet}</span><div class="btn-group" data-toggle="buttons">` + innerhtml + `</div></li> `
                } else if (data.data.tweets[i].annotations[data.data.tweets[i].tweet_id][name] === "NONE" ) {
                  // || data.data.tweets[i].annotations[data.data.tweets[i].tweet_id][name] === "NOT"  
                    innerhtml = `<i class="mr-3 fa fa-check" aria-hidden="true"></i><label class="btn btn-danger form-check-label mr-3">
                    <input class="form-check-input" onchange="addLabel(this.name,this.name,this.value)" type="radio" name="${data.data.tweets[i].tweet_id }" value="HOF">
                    HOF
                  </label>
                      <label class="btn btn-success form-check-label">
                    <input class="form-check-input" onchange="addLabel(this.name,this.name,this.value)" type="radio" name="${data.data.tweets[i].tweet_id }" value="NONE" checked> NONE
                  </label>`
                  tab_1 += `<li class="list-group-item d-flex justify-content-between align-items-center input-group-prepend list-group-item-primary">
            <span class="w-90" id="main_tweet">${data.data.tweets[i].tweet}</span><div class="btn-group" data-toggle="buttons">` + innerhtml + `</div></li> `
                }
                
            }
            else{
              tab_1 += `<li class="list-group-item d-flex justify-content-between align-items-center input-group-prepend list-group-item-primary">
            <span class="w-90" id="main_tweet" >${data.data.tweets[i].tweet}</span>
            <div class="btn-group" data-toggle="buttons">
                <label class="btn btn-danger form-check-label mr-3">
              <input class="form-check-input" onchange="addLabel(this.name,this.name,this.value)" type="radio" name="${data.data.tweets[i].tweet_id }" value="HOF">
              HOF
            </label>
                <label class="btn btn-success form-check-label">
              <input class="form-check-input" onchange="addLabel(this.name,this.name,this.value)" type="radio" name="${data.data.tweets[i].tweet_id}" value="NONE"> NONE
            </label>
            </div>
         </li>`
            }

           }
            else {
                tab_1 += `<li class="list-group-item d-flex justify-content-between align-items-center input-group-prepend list-group-item-primary">
            <span class="w-90" id="main_tweet" >${data.data.tweets[i].tweet}</span>
            <div class="btn-group" data-toggle="buttons">
                <label class="btn btn-danger form-check-label mr-3">
              <input class="form-check-input" onchange="addLabel(this.name,this.name,this.value)" type="radio" name="${data.data.tweets[i].tweet_id }" value="HOF">
              HOF
            </label>
                <label class="btn btn-success form-check-label">
              <input class="form-check-input" onchange="addLabel(this.name,this.name,this.value)" type="radio" name="${data.data.tweets[i].tweet_id}" value="NONE"> NONE
            </label>
            </div>
         </li>`
            }
           
                
            }
            
            if(data.data.tweets[i].assignedTo.slice(2,3).includes(name)){ 
              console.log("3rd annotator",data.data.tweets[i].tweet)
              
              if (((data.data.tweets[i].tweet_id in data.data.tweets[i].conflictedTweets)===true) && ((data.data.tweets[i].tweet_id in data.data.tweets[i].finalAnnotation)===false)){
                tab_1+=`<br/><h1 align="center">Third Annotator</h1>`  
                if ((data.data.tweets[i].tweet_id in data.data.tweets[i].annotations)===true ){
				
                  console.log(data.data.tweets[i].annotations[data.data.tweets[i].tweet_id])
                          if (data.data.tweets[i].annotations[data.data.tweets[i].tweet_id].hasOwnProperty(name)===true){
                            console.log(data.data.tweets[i].annotations[data.data.tweets[i].tweet_id][name])
                            if (data.data.tweets[i].annotations[data.data.tweets[i].tweet_id][name] === "HOF" ) {
                              // || data.data.tweets[i].annotations[data.data.tweets[i].tweet_id][name] === "CHOF" 
                              innerhtml = `<i class="mr-3 fa fa-check" aria-hidden="true"></i><label class="btn btn-danger form-check-label mr-3">
                              <input class="form-check-input" onchange="addLabel(this.name,this.name,this.value)" type="radio" name="${data.data.tweets[i].tweet_id }" value="HOF" checked>
                              HOF
                            </label>
                                <label class="btn btn-success form-check-label">
                              <input class="form-check-input" onchange="addLabel(this.name,this.name,this.value)" type="radio" name="${data.data.tweets[i].tweet_id }" value="NONE"> NONE
                            </label>`
                            tab_1 += `<li class="list-group-item d-flex justify-content-between align-items-center input-group-prepend list-group-item-primary">
                      <span class="w-90" id="main_tweet" >${data.data.tweets[i].tweet}</span><div class="btn-group" data-toggle="buttons">` + innerhtml + `</div></li> `
                          } else if (data.data.tweets[i].annotations[data.data.tweets[i].tweet_id][name] === "NONE" ) {
                            // || data.data.tweets[i].annotations[data.data.tweets[i].tweet_id][name] === "NOT"  
                              innerhtml = `<i class="mr-3 fa fa-check" aria-hidden="true"></i><label class="btn btn-danger form-check-label mr-3">
                              <input class="form-check-input" onchange="addLabel(this.name,this.name,this.value)" type="radio" name="${data.data.tweets[i].tweet_id }" value="HOF">
                              HOF
                            </label>
                                <label class="btn btn-success form-check-label">
                              <input class="form-check-input" onchange="addLabel(this.name,this.name,this.value)" type="radio" name="${data.data.tweets[i].tweet_id }" value="NONE" checked> NONE
                            </label>`
                            tab_1 += `<li class="list-group-item d-flex justify-content-between align-items-center input-group-prepend list-group-item-primary">
                      <span class="w-90" id="main_tweet">${data.data.tweets[i].tweet}</span><div class="btn-group" data-toggle="buttons">` + innerhtml + `</div></li> `
                          }
                          
                      }
                      else{
                        tab_1 += `<li class="list-group-item d-flex justify-content-between align-items-center input-group-prepend list-group-item-primary">
                      <span class="w-90" id="main_tweet" >${data.data.tweets[i].tweet}</span>
                      <div class="btn-group" data-toggle="buttons">
                          <label class="btn btn-danger form-check-label mr-3">
                        <input class="form-check-input" onchange="addLabel(this.name,this.name,this.value)" type="radio" name="${data.data.tweets[i].tweet_id }" value="HOF">
                        HOF
                      </label>
                          <label class="btn btn-success form-check-label">
                        <input class="form-check-input" onchange="addLabel(this.name,this.name,this.value)" type="radio" name="${data.data.tweets[i].tweet_id}" value="NONE"> NONE
                      </label>
                      </div>
                   </li>`
                      }
          
                     }
                      else {
                          tab_1 += `<li class="list-group-item d-flex justify-content-between align-items-center input-group-prepend list-group-item-primary">
                      <span class="w-90" id="main_tweet" >${data.data.tweets[i].tweet}</span>
                      <div class="btn-group" data-toggle="buttons">
                          <label class="btn btn-danger form-check-label mr-3">
                        <input class="form-check-input" onchange="addLabel(this.name,this.name,this.value)" type="radio" name="${data.data.tweets[i].tweet_id }" value="HOF">
                        HOF
                      </label>
                          <label class="btn btn-success form-check-label">
                        <input class="form-check-input" onchange="addLabel(this.name,this.name,this.value)" type="radio" name="${data.data.tweets[i].tweet_id}" value="NONE"> NONE
                      </label>
                      </div>
                   </li>`
                      }
              }
            }
            document.getElementById('top_tweet').innerHTML = tab_1;
         }
        // if(data.data.tweets[i].tweet_id in data.data.tweets[i].assignedTo.slice(2).includes(name)){
          

        // }}
    }
        // document.getElementById('top_tweet').innerHTML = tab_1;

       
            
}

function logout() {
    localStorage.clear();
    window.location.href = 'Login.html';
}


async function addLabel(id,tid, label) {
    console.log(id + ' ' + label)
    var details={
      "main_tweet_id": id,
      "tweet_id": tid,
      "label": label
    };
    $.ajax({
        type: 'POST',
        url: proxy + '/tweets/submit',
        headers: {
            'Authorization': 'Bearer '+localStorage.getItem("token"),
            'Content-type': 'application/json'
        },
        dataType: 'json',
        data: JSON.stringify(details),
        async: true,
        success: function(response) {
            myparent = $('[name=' + tid + ']').parent().parent();
            //console.log("----",myparent)
            if (label === "HOF") {
                innerhtml = `<i class="mr-3 fa fa-check" aria-hidden="true"></i> <label class="btn btn-danger form-check-label mr-3">
            <input class="form-check-input" onchange="addLabel(this.name,this.name,this.value)" type="radio" name="${tid}" value="HOF" checked>
            HOF
          </label>
              <label class="btn btn-success form-check-label">
            <input class="form-check-input" onchange="addLabel(this.name,this.name,this.value)" type="radio" name="${tid}" value="NONE"> NONE
          </label>`
            } else {
                innerhtml = `<i class="mr-3 fa fa-check" aria-hidden="true"></i> <label class="btn btn-danger form-check-label mr-3">
            <input class="form-check-input" onchange="addLabel(this.name,this.name,this.value)" type="radio" name="${tid}" value="HOF">
            HOF
          </label>
              <label class="btn btn-success form-check-label">
            <input class="form-check-input" onchange="addLabel(this.name,this.name,this.value)" type="radio" name="${tid}" value="NONE" checked> NONE
          </label>`
            }
            myparent.html(innerhtml)
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert('error');
        }
    });
}  
