proxy = 'https://englishannotation.el.r.appspot.com';

async function checkLogin() {
    var name_ = localStorage.getItem('name');
    //let password = ('password');
    //let isAdmin = localStorage.getItem('isAdmin');

    var body = document.getElementById("body");
    body.style.display = 'none';
    url = proxy + '/login'
    var token = localStorage.getItem("token");
    if (!token) {
        window.location.href = 'Login.html';
    } else {
        //
        body.style.display = 'block';
        displayTweetForAnnotate();
    }
    document.getElementById("username").innerHTML = "Welcome, " + name_;
}

async function tfdisplayTweetForAnnotate(tweet_id_) {
  // console.log("third and fourth annotator")
  var name = localStorage.getItem('name')
  localStorage.setItem('main_tweet_id_',tweet_id_);
    
        if (tweet_id_ === undefined){
          tab_1=`<h1>Please select tweet from assigned tweet</h1>`
          document.getElementById("main_tweet_comments").innerHTML = tab_1;
        }
        else{
          const response = await fetch(proxy + '/users/assigned-tweets?thirdAnnotator=false', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                "Authorization": 'Bearer '+localStorage.getItem("token")
            }
    
        })
        if (response.status === 200) {
            var data = await response.json();
            const total_tweet =data.data.tweets.length
            tab_1 = ``
            var i=data.data.tweets.map((o) => o.tweet_id).indexOf(tweet_id_)
            // console.log(tweet_id_)
            // console.log(i)
            // console.log(data.data.tweets[i].tweet_id)
			      // console.log(data.data.tweets[i].tweet_id in data.data.tweets[i].finalAnnotation)
            if ((data.data.tweets[i].tweet_id in data.data.tweets[i].finalAnnotation)===true ){
              if (data.data.tweets[i].finalAnnotation[data.data.tweets[i].tweet_id] === "HOF") {
                        innerhtml = `<h4><span class="badge badge-danger">HOF</span></h4>`
              } else {
                        innerhtml = `<h4><span class="badge badge-success">NOT</span></h4>`
              }
                    tab_1 += `<li class="list-group-item d-flex justify-content-between align-items-center input-group-prepend list-group-item-primary list-group affix my-3 sticky-top">
                <span class="w-90" id="main_tweet">${data.data.tweets[i].tweet}</span><div class="btn-group" data-toggle="buttons">` + innerhtml + `</div></li>`
         
            }
            for (comm_key in data.data.tweets[i].comments) {
              // console.log(data.data.tweets[i]);
                if ((data.data.tweets[i].comments[comm_key].tweet_id in data.data.tweets[i].conflictedTweets)===true && (data.data.tweets[i].comments[comm_key].tweet_id in data.data.tweets[i].finalAnnotation)===false){
                  // console.log("Remove conflict")

                  if ((data.data.tweets[i].comments[comm_key].tweet_id in data.data.tweets[i].annotations)===true){
				
                    if (data.data.tweets[i].annotations[data.data.tweets[i].comments[comm_key].tweet_id].hasOwnProperty(name)===true){
                      // console.log(data.data.tweets[i].annotations[data.data.tweets[i].comments[comm_key].tweet_id][name])
                      if (data.data.tweets[i].annotations[data.data.tweets[i].comments[comm_key].tweet_id][name] === "SHOF") {
                        innerhtml = `<i class="mr-3 fa fa-check" aria-hidden="true"></i><label class="btn btn-danger form-check-label mr-3">
                        <input class="form-check-input" onchange="addLabel(this.name,this.value)" type="radio" name="${data.data.tweets[i].comments[comm_key].tweet_id}" value="SHOF" checked>
                        SHOF
                      </label>
                        <label class="btn btn-danger form-check-label mr-3">
                        <input class="form-check-input" onchange="addLabel(this.name,this.value)" type="radio" name="${data.data.tweets[i].comments[comm_key].tweet_id}" value="CHOF" >
                        CHOF
                      </label>
                          <label class="btn btn-success form-check-label">
                        <input class="form-check-input" onchange="addLabel(this.name,this.value)" type="radio" name="${data.data.tweets[i].comments[comm_key].tweet_id}" value="NONE"> NONE
                      </label>`
                    } else if (data.data.tweets[i].annotations[data.data.tweets[i].comments[comm_key].tweet_id][name] === "CHOF") {
                      innerhtml = `<i class="mr-3 fa fa-check" aria-hidden="true"></i><label class="btn btn-danger form-check-label mr-3">
                        <input class="form-check-input" onchange="addLabel(this.name,this.value)" type="radio" name="${data.data.tweets[i].comments[comm_key].tweet_id}" value="SHOF" >
                        SHOF
                      </label>
                        <label class="btn btn-danger form-check-label mr-3">
                        <input class="form-check-input" onchange="addLabel(this.name,this.value)" type="radio" name="${data.data.tweets[i].comments[comm_key].tweet_id}" value="CHOF" checked>
                        CHOF
                      </label>
                          <label class="btn btn-success form-check-label">
                        <input class="form-check-input" onchange="addLabel(this.name,this.value)" type="radio" name="${data.data.tweets[i].comments[comm_key].tweet_id}" value="NONE"> NONE
                      </label>`
                    }
                      else{
                        innerhtml = `<i class="mr-3 fa fa-check" aria-hidden="true"></i>
                        <label class="btn btn-danger form-check-label mr-3">
                        <input class="form-check-input" onchange="addLabel(this.name,this.value)" type="radio" name="${data.data.tweets[i].comments[comm_key].tweet_id}" value="SHOF">
                        SHOF
                      </label>
                        <label class="btn btn-danger form-check-label mr-3">
                        <input class="form-check-input" onchange="addLabel(this.name,this.value)" type="radio" name="${data.data.tweets[i].comments[comm_key].tweet_id}" value="CHOF">
                        CHOF
                      </label>
                          <label class="btn btn-success form-check-label">
                        <input class="form-check-input" onchange="addLabel(this.name,this.value)" type="radio" name="${data.data.tweets[i].comments[comm_key].tweet_id}" value="NONE" checked> NONE
                      </label>`
                    }
                    tab_1 += `<li class="list-group-item d-flex justify-content-between align-items-center input-group-prepend list-group-item-success">
                    <span class="w-90" id="main_tweet" >${data.data.tweets[i].comments[comm_key].tweet}</span><div class="btn-group" data-toggle="buttons">` + innerhtml + `</div></li> `
                  }
                  else{
                  tab_1 += `<li class="list-group-item d-flex justify-content-between align-items-center input-group-prepend list-group-item-success">
            <span class="w-90" id="main_tweet" >${data.data.tweets[i].comments[comm_key].tweet}</span>
            <div class="btn-group" data-toggle="buttons">
            <label class="btn btn-danger form-check-label mr-3">
                  <input class="form-check-input" onchange="addLabel(this.name,this.value)" type="radio" name="${data.data.tweets[i].comments[comm_key].tweet_id}" value="SHOF">
                  SHOF
                </label>    
            <label class="btn btn-danger form-check-label mr-3">
              <input class="form-check-input" onchange="addLabel(this.name,this.value)" type="radio" name="${data.data.tweets[i].comments[comm_key].tweet_id}" value="CHOF">
              CHOF
            </label>
                <label class="btn btn-success form-check-label">
              <input class="form-check-input" onchange="addLabel(this.name,this.value)" type="radio" name="${data.data.tweets[i].comments[comm_key].tweet_id}" value="NONE"> NONE
            </label>
            </div>
         </li>`}
                    
                } 
                
                }
            }

          }
        }
        document.getElementById("main_tweet_comments").innerHTML = tab_1;
}

async function displayTweetForAnnotate(tweet_id_) {
    //document.getElementById("submitlabels").style.display = 'block';
    var name = localStorage.getItem('name')
    localStorage.setItem('main_tweet_id_',tweet_id_);
    
        // for (let i=0;i<total_tweet;i++){
        if (tweet_id_ === undefined){
          tab_1=`<h1>Please select tweet from assigned tweet</h1>`
          document.getElementById("main_tweet_comments").innerHTML = tab_1;
        }
        else{
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
            // for(let i=0;i<total_tweet;i++){
            //   if (data.data.tweets[i].tweet_id in data.data.tweets[i].finalAnnotation){
            //     continue
            //   }else{
            //     Swal.fire({
            //       icon: 'info',
            //       title: 'Annotation',
            //       text: 'Complete Main Tweet annotations',
            //       footer: '<a href="./index.html">Head back to Main Tweet</a>'
            //     })
            //   }
            // }
            tab_1 = ``
         var i=data.data.tweets.map((o) => o.tweet_id).indexOf(tweet_id_)
      //       console.log(tweet_id_)
      //       console.log(i)
      //       console.log(data.data.tweets[i].tweet_id)
			// console.log(data.data.tweets[i].tweet_id in data.data.tweets[i].finalAnnotation)
      // if (data.data.tweets[i].assignedTo.slice(0,2).includes(name)){
			if ((data.data.tweets[i].tweet_id in data.data.tweets[i].finalAnnotation)===true ){
				
				// console.log(data.data.tweets[i].finalAnnotation[data.data.tweets[i].tweet_id])
				if (data.data.tweets[i].finalAnnotation[data.data.tweets[i].tweet_id] === "HOF") {
                    innerhtml = `<h4><span class="badge badge-danger">HOF</span></h4>`
               } else {
					innerhtml = `<h4><span class="badge badge-success">NOT</span></h4>`
                }
                tab_1 += `<li class="list-group-item d-flex justify-content-between align-items-center input-group-prepend list-group-item-primary list-group affix my-3 sticky-top">
            <span class="w-90" id="main_tweet">${data.data.tweets[i].tweet}</span><div class="btn-group" data-toggle="buttons">` + innerhtml + `</div></li>`
             
            for (comm_key in data.data.tweets[i].comments) {
              // console.log(data.data.tweets[i]);
                if ((data.data.tweets[i].comments[comm_key].tweet_id in data.data.tweets[i].annotations)===true){
				
                    if (data.data.tweets[i].annotations[data.data.tweets[i].comments[comm_key].tweet_id].hasOwnProperty(name)===true){
                      // console.log(data.data.tweets[i].annotations[data.data.tweets[i].comments[comm_key].tweet_id][name])
                      if (data.data.tweets[i].annotations[data.data.tweets[i].comments[comm_key].tweet_id][name] === "SHOF") {
                        innerhtml = `<i class="mr-3 fa fa-check" aria-hidden="true"></i><label class="btn btn-danger form-check-label mr-3">
                        <input class="form-check-input" onchange="addLabel(this.name,this.value)" type="radio" name="${data.data.tweets[i].comments[comm_key].tweet_id}" value="SHOF" checked>
                        SHOF
                      </label>
                        <label class="btn btn-danger form-check-label mr-3">
                        <input class="form-check-input" onchange="addLabel(this.name,this.value)" type="radio" name="${data.data.tweets[i].comments[comm_key].tweet_id}" value="CHOF" >
                        CHOF
                      </label>
                          <label class="btn btn-success form-check-label">
                        <input class="form-check-input" onchange="addLabel(this.name,this.value)" type="radio" name="${data.data.tweets[i].comments[comm_key].tweet_id}" value="NONE"> NONE
                      </label>`
                    } else if (data.data.tweets[i].annotations[data.data.tweets[i].comments[comm_key].tweet_id][name] === "CHOF") {
                      innerhtml = `<i class="mr-3 fa fa-check" aria-hidden="true"></i><label class="btn btn-danger form-check-label mr-3">
                        <input class="form-check-input" onchange="addLabel(this.name,this.value)" type="radio" name="${data.data.tweets[i].comments[comm_key].tweet_id}" value="SHOF" >
                        SHOF
                      </label>
                        <label class="btn btn-danger form-check-label mr-3">
                        <input class="form-check-input" onchange="addLabel(this.name,this.value)" type="radio" name="${data.data.tweets[i].comments[comm_key].tweet_id}" value="CHOF" checked>
                        CHOF
                      </label>
                          <label class="btn btn-success form-check-label">
                        <input class="form-check-input" onchange="addLabel(this.name,this.value)" type="radio" name="${data.data.tweets[i].comments[comm_key].tweet_id}" value="NONE"> NONE
                      </label>`
                    }
                      else{
                        innerhtml = `<i class="mr-3 fa fa-check" aria-hidden="true"></i>
                        <label class="btn btn-danger form-check-label mr-3">
                        <input class="form-check-input" onchange="addLabel(this.name,this.value)" type="radio" name="${data.data.tweets[i].comments[comm_key].tweet_id}" value="SHOF">
                        SHOF
                      </label>
                        <label class="btn btn-danger form-check-label mr-3">
                        <input class="form-check-input" onchange="addLabel(this.name,this.value)" type="radio" name="${data.data.tweets[i].comments[comm_key].tweet_id}" value="CHOF">
                        CHOF
                      </label>
                          <label class="btn btn-success form-check-label">
                        <input class="form-check-input" onchange="addLabel(this.name,this.value)" type="radio" name="${data.data.tweets[i].comments[comm_key].tweet_id}" value="NONE" checked> NONE
                      </label>`
                    }
                    tab_1 += `<li class="list-group-item d-flex justify-content-between align-items-center input-group-prepend list-group-item-success">
                    <span class="w-90" id="main_tweet" >${data.data.tweets[i].comments[comm_key].tweet}</span><div class="btn-group" data-toggle="buttons">` + innerhtml + `</div></li> `
                  }
                  else{
                  tab_1 += `<li class="list-group-item d-flex justify-content-between align-items-center input-group-prepend list-group-item-success">
            <span class="w-90" id="main_tweet" >${data.data.tweets[i].comments[comm_key].tweet}</span>
            <div class="btn-group" data-toggle="buttons">
            <label class="btn btn-danger form-check-label mr-3">
                  <input class="form-check-input" onchange="addLabel(this.name,this.value)" type="radio" name="${data.data.tweets[i].comments[comm_key].tweet_id}" value="SHOF">
                  SHOF
                </label>    
            <label class="btn btn-danger form-check-label mr-3">
              <input class="form-check-input" onchange="addLabel(this.name,this.value)" type="radio" name="${data.data.tweets[i].comments[comm_key].tweet_id}" value="CHOF">
              CHOF
            </label>
                <label class="btn btn-success form-check-label">
              <input class="form-check-input" onchange="addLabel(this.name,this.value)" type="radio" name="${data.data.tweets[i].comments[comm_key].tweet_id}" value="NONE"> NONE
            </label>
            </div>
         </li>`}
                    
                } 
                else {
                    tab_1 += `<li class="list-group-item d-flex justify-content-between align-items-center input-group-prepend list-group-item-success">
                <span class="w-90" id="main_tweet" >${data.data.tweets[i].comments[comm_key].tweet}</span>
                <div class="btn-group" data-toggle="buttons">
                <label class="btn btn-danger form-check-label mr-3">
                  <input class="form-check-input" onchange="addLabel(this.name,this.value)" type="radio" name="${data.data.tweets[i].comments[comm_key].tweet_id}" value="SHOF">
                  SHOF
                </label>
                    <label class="btn btn-danger form-check-label mr-3">
                  <input class="form-check-input" onchange="addLabel(this.name,this.value)" type="radio" name="${data.data.tweets[i].comments[comm_key].tweet_id}" value="CHOF">
                  CHOF
                </label>
                    <label class="btn btn-success form-check-label">
                  <input class="form-check-input" onchange="addLabel(this.name,this.value)" type="radio" name="${data.data.tweets[i].comments[comm_key].tweet_id}" value="NONE"> NONE
                </label>
                </div>
             </li>`
                }        

         }
         
        }}
        
        tab_1+=`<br/>`
        
    }
         document.getElementById("main_tweet_comments").innerHTML = tab_1;
}
// }
// }
        // document.getElementById('top_tweet').innerHTML = tab_1;

function logout() {
    localStorage.clear();
    window.location.href = 'Login.html';
}


async function addLabel(tid, label) {
  var id = localStorage.getItem('main_tweet_id_')
    // console.log(id + ' ' +tid+' '+ label)
    $.ajax({
        type: 'POST',
        url: proxy + '/tweets/submit',
        headers: {
            'Authorization': 'Bearer '+localStorage.getItem("token"),
            'Content-type': 'application/json'
        },
        data: JSON.stringify({
				"main_tweet_id": id,
				"tweet_id": tid,
				"label": label
			}),
        async: true,
        success: function(response) {
            myparent = $('[name=' + tid + ']').parent().parent();
            // console.log(myparent)
            if (label === "SHOF") {
              innerhtml = `<i class="mr-3 fa fa-check" aria-hidden="true"></i> <label class="btn btn-danger form-check-label mr-3">
          <input class="form-check-input" onchange="addLabel(this.name,this.value)" type="radio" name="${tid}" value="SHOF" checked>
          SHOF
        </label>
        <label class="btn btn-danger form-check-label mr-3">
          <input class="form-check-input" onchange="addLabel(this.name,this.value)" type="radio" name="${tid}" value="CHOF">
          CHOF
        </label>
            <label class="btn btn-success form-check-label">
          <input class="form-check-input" onchange="addLabel(this.name,this.value)" type="radio" name="${tid}" value="NONE"> NONE
        </label>`
          } else if (label === "CHOF"){
            innerhtml = `<i class="mr-3 fa fa-check" aria-hidden="true"></i> <label class="btn btn-danger form-check-label mr-3">
            <input class="form-check-input" onchange="addLabel(this.name,this.value)" type="radio" name="${tid}" value="SHOF" >
            SHOF
          </label>
          <label class="btn btn-danger form-check-label mr-3">
            <input class="form-check-input" onchange="addLabel(this.name,this.value)" type="radio" name="${tid}" value="CHOF" checked>
            CHOF
          </label>
              <label class="btn btn-success form-check-label">
            <input class="form-check-input" onchange="addLabel(this.name,this.value)" type="radio" name="${tid}" value="NONE"> NONE
          </label>`
          }
          else{
            innerhtml = `<i class="mr-3 fa fa-check" aria-hidden="true"></i> <label class="btn btn-danger form-check-label mr-3">
            <input class="form-check-input" onchange="addLabel(this.name,this.value)" type="radio" name="${tid}" value="SHOF" >
            SHOF
          </label>
          <label class="btn btn-danger form-check-label mr-3">
            <input class="form-check-input" onchange="addLabel(this.name,this.value)" type="radio" name="${tid}" value="CHOF" >
            CHOF
          </label>
              <label class="btn btn-success form-check-label">
            <input class="form-check-input" onchange="addLabel(this.name,this.value)" type="radio" name="${tid}" value="NONE" checked> NONE
          </label>`
          }
            myparent.html(innerhtml)
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert('error');
        }
    });
}  

async function display_tweets_by_user() {
  let name = localStorage.getItem('name');
  const response = await fetch(proxy + '/users/assigned-tweets?thirdAnnotator=false', {
    method: 'GET',
    headers: {
        'Content-type': 'application/json',
        "Authorization": 'Bearer '+localStorage.getItem("token")
    }

})
  if (response.status === 200) {
      var data = await response.json();
      const total_tweet =data.data.tweets.length
          // console.log(data)
      if (total_tweet=== 0) {
          tab = `<h1 class="my-3">No Assigned Tweets.......!</h1>`
      } else {
          //console.log(data)
           var Comment_activating_flag=true
          for(let i=0;i<total_tweet;i++){
              if(data.data.tweets[i].tweet_id in data.data.tweets[i].finalAnnotation){
                continue
              }
              else{
                Comment_activating_flag=false
                break
              }
          }

          if(Comment_activating_flag===true){
            
          tab = ``
          for (let i=0;i<total_tweet;i++) {
            if (data.data.tweets[i].assignedTo.slice(0,2).includes(name)){
            if ((data.data.tweets[i].tweet_id in data.data.tweets[i].finalAnnotation)===true){
                  tab += `<tr>
          <td class="align-middle">${data.data.tweets[i].story}</td>
          <td class="align-middle">${data.data.tweets[i].tweet_id}</td>
          <td class="align-middle">${data.data.tweets[i].tweet}</td>
          <td class="align-middle">
              <div class=" container justify-content-center">`

      //             if (data.data.tweets[i].annotations[data.data.tweets[i].tweet_id].includes(name)) {
      //                 icon = `<i class="fas fa-check-circle mr-3 fa-2x">`
      //                 btn = `</i></div></td>
      //     <td class="align-middle"><button class="btn btn-info" id="${data.data.tweets[i].tweet_id}" onclick="displayTweetForAnnotate(this.id)" data-dismiss="modal">View</button></td>
      // </tr>`
      //             } else {
                      icon = `<i class="fas fa-clock fa-2x"></i>`

                      btn = `</i></div></td>
                  <td class="align-middle"><button class="btn btn-info" id="${data.data.tweets[i].tweet_id}" onclick="displayTweetForAnnotate(this.id)" data-dismiss="modal">Annotate</button></td>
              </tr>`
                  // }
                  tab += icon
                  tab += btn
              }
            }  }

            tab+=`<tr><td colspan="5"><h2 align="center">Third Annotation</h2></td></tr>`
            for (let i=0;i<total_tweet;i++) {
            if (data.data.tweets[i].assignedTo.slice(2,3).includes(name)){

              // var flag=true;
              // for(let j=0;j<data.data.tweets[i].comments.length;j++){
              //   if (data.data.tweets[i].comments[j].tweet_id in data.data.tweets[i].annotations){
              //     if(Object.keys(data.data.tweets[i].annotations[data.data.tweets[i].comments[j].tweet_id]).length===2){
              //     continue
              //     }else{
              //       flag=false
              //       break
              //     }
              //   }
              // }
              // console.log(flag)
              // if (flag===true){
              for(let j=0;j<data.data.tweets[i].comments.length;j++){
                
                if (((data.data.tweets[i].comments[j].tweet_id in data.data.tweets[i].conflictedTweets)===true) && ((data.data.tweets[i].comments.tweet_id in data.data.tweets[i].finalAnnotation)===false)){
                  tab += `<tr>
                  <td class="align-middle">${data.data.tweets[i].story}</td>
                  <td class="align-middle">${data.data.tweets[i].tweet_id}</td>
                  <td class="align-middle">${data.data.tweets[i].tweet}</td>
                  <td class="align-middle">
                    <div class=" container justify-content-center">`
                    icon = `<i class="fas fa-clock fa-2x"></i>`

                  btn = `</i></div></td>
                  <td class="align-middle"><button class="btn btn-info" id="${data.data.tweets[i].tweet_id}" onclick="tfdisplayTweetForAnnotate(this.id)" data-dismiss="modal">Annotate</button></td>
                  </tr>`
                  // }
                  tab += icon
                  tab += btn
                  break
                }

              }
            // }
            }}
            tab+=`<tr><td colspan="5"><h2 align="center">Fourth Annotation</h2></td></tr>`
            for (let i=0;i<total_tweet;i++) {
            if (data.data.tweets[i].assignedTo.slice(3,4).includes(name)){
              // var flag=true;
              // for(let j=0;j<data.data.tweets[i].comments.length;j++){
              //   if (data.data.tweets[i].comments[j].tweet_id in data.data.tweets[i].annotations ){
              //     if(Object.keys((data.data.tweets[i].annotations[data.data.tweets[i].comments[j].tweet_id])).length===3){
              //     continue
              //   }
              //   }else{
              //     flag=false
              //     break
              //   }
              // }

              // if(flag===true){
              
              for(let j=0;j<data.data.tweets[i].comments.length;j++){
                if(data.data.tweets[i].comments[j].tweet_id in data.data.tweets[i].annotations){
                if(Object.keys(data.data.tweets[i].annotations[data.data.tweets[i].comments[j].tweet_id]).length===3){
                if (((data.data.tweets[i].comments[j].tweet_id in data.data.tweets[i].conflictedTweets)===true) && ((data.data.tweets[i].comments[j].tweet_id in data.data.tweets[i].finalAnnotation)===false)){
                  tab += `<tr>
                  <td class="align-middle">${data.data.tweets[i].story}</td>
                  <td class="align-middle">${data.data.tweets[i].tweet_id}</td>
                  <td class="align-middle">${data.data.tweets[i].tweet}</td>
                  <td class="align-middle">
                    <div class=" container justify-content-center">`
                    icon = `<i class="fas fa-clock fa-2x"></i>`

                  btn = `</i></div></td>
                  <td class="align-middle"><button class="btn btn-info" id="${data.data.tweets[i].tweet_id}" onclick="tfdisplayTweetForAnnotate(this.id)" data-dismiss="modal">Annotate</button></td>
                  </tr>`
                  // }
                  tab += icon
                  tab += btn
                  break
                }

              }}}
            // }
            }}
      }else{
          tab=`<h2>Please complete Main tweet annotations</h2>`
      }
    }
      document.getElementById("show_tweets_for_user").innerHTML = tab;
      $('tweets_by_user').modal('show');
  } else if (response.status == 401) {
      window.location.href = 'login.html';
  }

}