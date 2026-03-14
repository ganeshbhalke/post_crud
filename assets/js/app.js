const cl =console.log;

const postForm=document.getElementById('postForm')
const title=document.getElementById('title')
const body=document.getElementById('body')
const userId=document.getElementById('userId')
const addpostBtn=document.getElementById('addpostBtn')
const updatepostBtn=document.getElementById('updatepostBtn')
const postContainer=document.getElementById('postContainer')
const spinner=document.getElementById('spinner')

function snakBar(msg,icon){
    Swal.fire({
        text:msg,
        icon:icon,
        timer:1500
    })
}

let Base_URL="https://jsonplaceholder.typicode.com";

let POST_URL=`${Base_URL}/posts`;
let postArr;

const createPostCards=(arr)=>{
    let result="";
    for(let i=arr.length-1; i>=0; i--){
        result +=`
         <div class="col-md-4 mb-4" id="${arr[i].id}"> 
             <div class="card h-100">
                <div class="card-header">
                    <h3>${arr[i].title}</h3>
                </div>
                <div class="card-body">
                    <p>${arr[i].body}</p>
                </div>
                <div class="card-footer d-flex justify-content-between">
                    <button class="btn btn-primary btn-sm" onclick="onEdit(this)">EDIT</button>
                    <button class="btn btn-danger btn-sm" onclick="onRemove(this)">REMOVE</button>
                </div>
            </div>
        </div>
        `
        postContainer.innerHTML=result;

    }
}

fetchBlogs()

function fetchBlogs(){

    spinner.classList.remove("d-none")

    let xhr = new XMLHttpRequest();

    xhr.open("GET",POST_URL,true);

    xhr.send()

    xhr.onload =function (){
        if(xhr.status >=200 && xhr.status < 300){
           postArr =JSON.parse(xhr.response);

           createPostCards(postArr)
           spinner.classList.add("d-none")

    }else{
        cl("somthing went wrong !!")
        spinner.classList.add("d-none");


    }
}
}



function onEdit(ele){
    let EDIT_ID=ele.closest('.col-md-4').id;
    localStorage.setItem('EDIT_ID',EDIT_ID)

    let EDIT_URL=`${Base_URL}/posts/${EDIT_ID}`;
    spinner.classList.remove("d-none")

    let xhr = new XMLHttpRequest();

    xhr.open("GET",EDIT_URL,true);
    xhr.send(null)

     xhr.onload =function (){
        if(xhr.status >=200 && xhr.status < 300){
           let POST_OBJ =JSON.parse(xhr.response);
           title.value=POST_OBJ.title;
           body.value=POST_OBJ.body;
           userId.value=POST_OBJ.userId;

           updatepostBtn.classList.remove("d-none")
           addpostBtn.classList.add("d-none")
           spinner.classList.add("d-none")

    }
}
    

}

function onUpdate(){
    let UPDATE_ID=localStorage.getItem('EDIT_ID')

    let UPDATE_OBJ={
        title:title.value,
        body:body.value,
        userId:userId.value,
        id:UPDATE_ID
    }

    let UPDATE_URL=`${Base_URL}/posts/${UPDATE_ID}`;

    let xhr=new XMLHttpRequest();

    xhr.open("PATCH",UPDATE_URL,true);

    xhr.send(JSON.stringify(UPDATE_OBJ))

    xhr.onload =function (){
        if(xhr.status >=200 && xhr.status < 299){
            let res=JSON.parse(xhr.response)

            postForm.reset() 


            let col=document.getElementById(UPDATE_ID)
            let h3=col.querySelector('.card-header h3');
            let p=col.querySelector('.card-body p');

            h3.innerText=UPDATE_OBJ.title
            p.innerText=UPDATE_OBJ.body

            updatepostBtn.classList.add("d-none")
            addpostBtn.classList.remove("d-none")

            spinner.classList.add("d-none")
            snakBar(`The New Post With Id ${UPDATE_ID} is Updated Successfully!!`, 'success')
        }else{
            spinner.classList.add("d-none")
        }
    }
}

function onRemove(ele){

    Swal.fire({
        title:`Are you sure you want to Remove this card and With Id`,
        showCancelButton:true,
        confirmButtonText:'Remove'
    }).then(result =>{
        cl(result)
        if(result.isConfirmed){
    let REMOVE_ID=ele.closest('.col-md-4').id
    let REMOVE_URL=`${Base_URL}/posts/${REMOVE_ID}`

    spinner.classList.remove("d-none")


    let xhr=new XMLHttpRequest();

    xhr.open("DELETE",REMOVE_URL,true);

    xhr.send()
    xhr.onload=function(){
       if(xhr.status >=200 && xhr.status < 299){
        
        ele.closest('.col-md-4').remove()
        snakBar(`The Post With Id ${REMOVE_ID} is Removed Successfully !!!`,'success')
        spinner.classList.add("d-none")
    }else{
        snakBar(`Somthing went wrong!!`);

        spinner.classList.add('d-none')
    }
    
        }
    }
    
})
}

function onSubEve(eve){
    eve.preventDefault()

    let POST_OBJ={
        title:title.value,
        body:body.value,
        userId:userId.value
    }

    spinner.classList.remove("d-none")

    let xhr = new XMLHttpRequest();

    xhr.open("POST",POST_URL,true);
    xhr.send(JSON.stringify(POST_OBJ));

    xhr.onload = function (){
        if(xhr.status >=200 && xhr.status < 300){
            let res=JSON.parse(xhr.response);
            let col=document.createElement('div')
            col.className=`col-md-4`
            col.id=res.id;
            col.innerHTML=`
            <div class="card h-100">
                <div class="card-header">
                    <h3>${POST_OBJ.title}</h3>
                </div>
                <div class="card-body">
                    <p>${POST_OBJ.body}</p>
                </div>
                <div class="card-footer d-flex justify-content-between">
                    <button class="btn btn-primary btn-sm" onclick="onEdit(this)">EDIT</button>
                    <button class="btn btn-danger btn-sm" onclick="onRemove(this)">REMOVE</button>
                </div>
            </div>
            `;
            postContainer.prepend(col);
            snackBar("post Created Successfully!!!", "success")
            spinner.classList.add("d-none")
        }else{
            cl("somthing went worng!!")
            snackBar.classList.add("d-none")
        }
    }

}


postForm.addEventListener("submit",onSubEve)
updatepostBtn.addEventListener("click",onUpdate)


//=============================================2nd Time ===========================================================//

// const cl =console.log;

// const cardForm=document.getElementById('cardForm')
// const title=document.getElementById('title')
// const body=document.getElementById('body')
// const userId=document.getElementById('userId')
// const addpostBtn=document.getElementById('addpostBtn')
// const updatepostBtn=document.getElementById('updatepostBtn')
// const cardContainer=document.getElementById('cardContainer')
// const spinner=document.getElementById('spinner')

// function snakBar(msg,icon){
//     Swal.fire({
//         text:msg,
//         icon:icon,
//         timer:1500
//     })
// }

// let Base_URL="https://jsonplaceholder.typicode.com";

// let POST_URL=`${Base_URL}/posts`;
// let postArr;

// const createPostCards=(arr)=>{
//     let result="";
//     for(let i=arr.length-1; i>=0; i--){
//         result +=`
//          <div class="col-md-4 mb-4" id="${arr[i].id}"> 
//              <div class="card h-100">
//                 <div class="card-header">
//                     <h3>${arr[i].title}</h3>
//                 </div>
//                 <div class="card-body">
//                     <p>${arr[i].body}</p>
//                 </div>
//                 <div class="card-footer d-flex justify-content-between">
//                     <button class="btn btn-primary btn-sm" onclick="onEdit(this)">EDIT</button>
//                     <button class="btn btn-danger btn-sm" onclick="onRemove(this)">REMOVE</button>
//                 </div>
//             </div>
//         </div>
//         `
//         cardContainer.innerHTML=result;

//     }
// }

// fetchBlogs()

// function fetchBlogs(){

//     spinner.classList.remove("d-none")

//     let xhr = new XMLHttpRequest();

//     xhr.open("GET",POST_URL,true);

//     xhr.send()

//     xhr.onload =function (){
//         if(xhr.status >=200 && xhr.status < 300){
//            postArr =JSON.parse(xhr.response);

//            createPostCards(postArr)
//            spinner.classList.add("d-none")

//     }else{
//         cl("somthing went wrong !!")
//         spinner.classList.add("d-none");


//     }
// }
// }

// function onEdit(ele){
//     let EDIT_ID=ele.closest('.col-md-4').id;
//     localStorage.setItem('EDIT_ID',EDIT_ID)

//     let EDIT_URL=`${Base_URL}/posts/${EDIT_ID}`;
//     spinner.classList.remove("d-none")

//     let xhr = new XMLHttpRequest();

//     xhr.open("GET",EDIT_URL,true);
//     xhr.send(null)

//      xhr.onload =function (){
//         if(xhr.status >=200 && xhr.status < 300){
//            let POST_OBJ =JSON.parse(xhr.response);
//            title.value=POST_OBJ.title;
//            body.value=POST_OBJ.body;
//            userId.value=POST_OBJ.userId;

//            updatepostBtn.classList.remove("d-none")
//            addpostBtn.classList.add("d-none")
//            spinner.classList.add("d-none")

//     }
// }
    

// }

// function onUpdate(){
//     let UPDATE_ID=localStorage.getItem('EDIT_ID')

//     let UPDATE_OBJ={
//         title:title.value,
//         body:body.value,
//         userId:userId.value,
//         id:UPDATE_ID
//     }

//     let UPDATE_URL=`${Base_URL}/posts/${UPDATE_ID}`;

//     let xhr=new XMLHttpRequest();

//     xhr.open("PATCH",UPDATE_URL,true);

//     xhr.send(JSON.stringify(UPDATE_OBJ))

//     xhr.onload =function (){
//         if(xhr.status >=200 && xhr.status < 299){
//             let res=JSON.parse(xhr.response)

//             cardForm.reset() 


//             let col=document.getElementById(UPDATE_ID)
//             let h3=col.querySelector('.card-header h3');
//             let p=col.querySelector('.card-body p');

//             h3.innerText=UPDATE_OBJ.title
//             p.innerText=UPDATE_OBJ.body

//             updatepostBtn.classList.add("d-none")
//             addpostBtn.classList.remove("d-none")

//             spinner.classList.add("d-none")
//             snakBar(`The New Post With Id ${UPDATE_ID} is Updated Successfully!!`, 'success')
//         }else{
//             spinner.classList.add("d-none")
//         }
//     }
// }

// function onRemove(ele){

//     Swal.fire({
//         title:`Are you sure you want to Remove this card and With Id`,
//         showCancelButton:true,
//         confirmButtonText:'Remove'
//     }).then(result =>{
//         cl(result)
//         if(result.isConfirmed){
//     let REMOVE_ID=ele.closest('.col-md-4').id
//     let REMOVE_URL=`${Base_URL}/posts/${REMOVE_ID}`

//     spinner.classList.remove("d-none")


//     let xhr=new XMLHttpRequest();

//     xhr.open("DELETE",REMOVE_URL,true);

//     xhr.send()
//     xhr.onload=function(){
//        if(xhr.status >=200 && xhr.status < 299){
        
//         ele.closest('.col-md-4').remove()
//         snakBar(`The Post With Id ${REMOVE_ID} is Removed Successfully !!!`,'success')
//         spinner.classList.add("d-none")
//     }else{
//         snakBar(`Somthing went wrong!!`);

//         spinner.classList.add('d-none')
//     }
    
//         }
//     }
    
// })
// }


// function onSubEve(eve){
//     eve.preventDefault()

//     let POST_OBJ={
//         title:title.value,
//         body:body.value,
//         userId:userId.value
//     }

//     spinner.classList.remove("d-none")

//     let xhr = new XMLHttpRequest();

//     xhr.open("POST",POST_URL,true);
//     xhr.send(JSON.stringify(POST_OBJ));

//     xhr.onload = function (){
//         if(xhr.status >=200 && xhr.status < 300){
//             let res=JSON.parse(xhr.response);
//             let col=document.createElement('div')
//             col.className=`col-md-4`
//             col.id=res.id;
//             col.innerHTML=`
//             <div class="card h-100">
//                 <div class="card-header">
//                     <h3>${POST_OBJ.title}</h3>
//                 </div>
//                 <div class="card-body">
//                     <p>${POST_OBJ.body}</p>
//                 </div>
//                 <div class="card-footer d-flex justify-content-between">
//                     <button class="btn btn-primary btn-sm" onclick="onEdit(this)">EDIT</button>
//                     <button class="btn btn-danger btn-sm" onclick="onRemove(this)">REMOVE</button>
//                 </div>
//             </div>
//             `;
//             cardContainer.prepend(col);
//             snackBar("post Created Successfully!!!", "success")
//             spinner.classList.add("d-none")
//         }else{
//             cl("somthing went worng!!")
//             snackBar.classList.add("d-none")
//         }
//     }

// }


// cardForm.addEventListener("submit",onSubEve)
// updatepostBtn.addEventListener("click",onUpdate)

//=============================================3rd Time=======================================//

// const cl =console.log;

// const postForm=document.getElementById('postForm')
// const title=document.getElementById('title')
// const body=document.getElementById('body')
// const userId=document.getElementById('userId')
// const addpostBtn=document.getElementById('addpostBtn')
// const updatepostBtn=document.getElementById('updatepostBtn')
// const postcardContainer=document.getElementById('postcardContainer')
// const spinner=document.getElementById('spinner')

// function snakBar(msg,icon){
//     Swal.fire({
//         text:msg,
//         icon:icon,
//         timer:1500
//     })
// }

// let Base_URL="https://jsonplaceholder.typicode.com";

// let POST_URL=`${Base_URL}/posts`;
// let postArr;

// const createPostCards=(arr)=>{
//     let result="";
//     for(let i=arr.length-1; i>=0; i--){
//         result +=`
//          <div class="col-md-4 mb-4" id="${arr[i].id}"> 
//              <div class="card h-100">
//                 <div class="card-header">
//                     <h3>${arr[i].title}</h3>
//                 </div>
//                 <div class="card-body">
//                     <p>${arr[i].body}</p>
//                 </div>
//                 <div class="card-footer d-flex justify-content-between">
//                     <button class="btn btn-primary btn-sm" onclick="onEdit(this)">EDIT</button>
//                     <button class="btn btn-danger btn-sm" onclick="onRemove(this)">REMOVE</button>
//                 </div>
//             </div>
//         </div>
//         `
//         postcardContainer.innerHTML=result;

//     }
// }

// fetchBlogs()

// function fetchBlogs(){

//     spinner.classList.remove("d-none")

//     let xhr = new XMLHttpRequest();

//     xhr.open("GET",POST_URL,true);

//     xhr.send()

//     xhr.onload =function (){
//         if(xhr.status >=200 && xhr.status < 300){
//            postArr =JSON.parse(xhr.response);

//            createPostCards(postArr)
//            spinner.classList.add("d-none")

//     }else{
//         cl("somthing went wrong !!")
//         spinner.classList.add("d-none");


//     }
// }
// }

// function onEdit(ele){
//     let EDIT_ID=ele.closest('.col-md-4').id;
//     localStorage.setItem('EDIT_ID',EDIT_ID)

//     let EDIT_URL=`${Base_URL}/posts/${EDIT_ID}`;
//     spinner.classList.remove("d-none")

//     let xhr = new XMLHttpRequest();

//     xhr.open("GET",EDIT_URL,true);
//     xhr.send(null)

//      xhr.onload =function (){
//         if(xhr.status >=200 && xhr.status < 300){
//            let POST_OBJ =JSON.parse(xhr.response);
//            title.value=POST_OBJ.title;
//            body.value=POST_OBJ.body;
//            userId.value=POST_OBJ.userId;

//            updatepostBtn.classList.remove("d-none")
//            addpostBtn.classList.add("d-none")
//            spinner.classList.add("d-none")

//     }
// }
    

// }

// function onUpdate(){
//     let UPDATE_ID=localStorage.getItem('EDIT_ID')

//     let UPDATE_OBJ={
//         title:title.value,
//         body:body.value,
//         userId:userId.value,
//         id:UPDATE_ID
//     }

//     let UPDATE_URL=`${Base_URL}/posts/${UPDATE_ID}`;

//     let xhr=new XMLHttpRequest();

//     xhr.open("PATCH",UPDATE_URL,true);

//     xhr.send(JSON.stringify(UPDATE_OBJ))

//     xhr.onload =function (){
//         if(xhr.status >=200 && xhr.status < 299){
//             let res=JSON.parse(xhr.response)

//             postForm.reset() 


//             let col=document.getElementById(UPDATE_ID)
//             let h3=col.querySelector('.card-header h3');
//             let p=col.querySelector('.card-body p');

//             h3.innerText=UPDATE_OBJ.title
//             p.innerText=UPDATE_OBJ.body

//             updatepostBtn.classList.add("d-none")
//             addpostBtn.classList.remove("d-none")

//             spinner.classList.add("d-none")
//             snakBar(`The New Post With Id ${UPDATE_ID} is Updated Successfully!!`, 'success')
//         }else{
//             spinner.classList.add("d-none")
//         }
//     }
// }

// function onRemove(ele){

//     Swal.fire({
//         title:`Are you sure you want to Remove this card and With Id`,
//         showCancelButton:true,
//         confirmButtonText:'Remove'
//     }).then(result =>{
//         cl(result)
//         if(result.isConfirmed){
//     let REMOVE_ID=ele.closest('.col-md-4').id
//     let REMOVE_URL=`${Base_URL}/posts/${REMOVE_ID}`

//     spinner.classList.remove("d-none")


//     let xhr=new XMLHttpRequest();

//     xhr.open("DELETE",REMOVE_URL,true);

//     xhr.send()
//     xhr.onload=function(){
//        if(xhr.status >=200 && xhr.status < 299){
        
//         ele.closest('.col-md-4').remove()
//         snakBar(`The Post With Id ${REMOVE_ID} is Removed Successfully !!!`,'success')
//         spinner.classList.add("d-none")
//     }else{
//         snakBar(`Somthing went wrong!!`);

//         spinner.classList.add('d-none')
//     }
    
//         }
//     }
    
// })
// }


// function onSubEve(eve){
//     eve.preventDefault()

//     let POST_OBJ={
//         title:title.value,
//         body:body.value,
//         userId:userId.value
//     }

//     spinner.classList.remove("d-none")

//     let xhr = new XMLHttpRequest();

//     xhr.open("POST",POST_URL,true);
//     xhr.send(JSON.stringify(POST_OBJ));

//     xhr.onload = function (){
//         if(xhr.status >=200 && xhr.status < 300){
//             let res=JSON.parse(xhr.response);
//             let col=document.createElement('div')
//             col.className=`col-md-4`
//             col.id=res.id;
//             col.innerHTML=`
//             <div class="card h-100">
//                 <div class="card-header">
//                     <h3>${POST_OBJ.title}</h3>
//                 </div>
//                 <div class="card-body">
//                     <p>${POST_OBJ.body}</p>
//                 </div>
//                 <div class="card-footer d-flex justify-content-between">
//                     <button class="btn btn-primary btn-sm" onclick="onEdit(this)">EDIT</button>
//                     <button class="btn btn-danger btn-sm" onclick="onRemove(this)">REMOVE</button>
//                 </div>
//             </div>
//             `;
//             postcardContainer.prepend(col);
//             snackBar("post Created Successfully!!!", "success")
//             spinner.classList.add("d-none")
//         }else{
//             cl("somthing went worng!!")
//             snackBar.classList.add("d-none")
//         }
//     }

// }


// postForm.addEventListener("submit",onSubEve)
// updatepostBtn.addEventListener("click",onUpdate)


//=====================================================4th Time===================================================//
// const cl =console.log;

// const postForm=document.getElementById('postForm')
// const title=document.getElementById('title')
// const body=document.getElementById('body')
// const userId=document.getElementById('userId')
// const addpostBtn=document.getElementById('addpostBtn')
// const updatepostBtn=document.getElementById('updatepostBtn')
// const postContainer=document.getElementById('postContainer')
// const spinner=document.getElementById('spinner')

// function snakBar(msg,icon){
//     Swal.fire({
//         text:msg,
//         icon:icon,
//         timer:1500
//     })
// }

// let Base_URL="https://jsonplaceholder.typicode.com";

// let POST_URL=`${Base_URL}/posts`;
// let postArr;

// const createPostCards=(arr)=>{
//     let result="";
//     for(let i=arr.length-1; i>=0; i--){
//         result +=`
//          <div class="col-md-4 mb-4" id="${arr[i].id}"> 
//              <div class="card h-100">
//                 <div class="card-header">
//                     <h3>${arr[i].title}</h3>
//                 </div>
//                 <div class="card-body">
//                     <p>${arr[i].body}</p>
//                 </div>
//                 <div class="card-footer d-flex justify-content-between">
//                     <button class="btn btn-primary btn-sm" onclick="onEdit(this)">EDIT</button>
//                     <button class="btn btn-danger btn-sm" onclick="onRemove(this)">REMOVE</button>
//                 </div>
//             </div>
//         </div>
//         `
//         postContainer.innerHTML=result;

//     }
// }

// fetchBlogs()

// function fetchBlogs(){

//     spinner.classList.remove("d-none")

//     let xhr = new XMLHttpRequest();

//     xhr.open("GET",POST_URL,true);

//     xhr.send()

//     xhr.onload =function (){
//         if(xhr.status >=200 && xhr.status < 300){
//            postArr =JSON.parse(xhr.response);

//            createPostCards(postArr)
//            spinner.classList.add("d-none")

//     }else{
//         cl("somthing went wrong !!")
//         spinner.classList.add("d-none");


//     }
// }
// }


//==============================================5th Times ===================================================
// const cl =console.log;

// const postForm=document.getElementById('postForm')
// const title=document.getElementById('title')
// const body=document.getElementById('body')
// const userId=document.getElementById('userId')
// const addpostBtn=document.getElementById('addpostBtn')
// const updatepostBtn=document.getElementById('updatepostBtn')
// const postContainer=document.getElementById('postContainer')
// const spinner=document.getElementById('spinner')

// function snakBar(msg,icon){
//     Swal.fire({
//         text:msg,
//         icon:icon,
//         timer:1500
//     })
// }

// let Base_URL="https://jsonplaceholder.typicode.com";

// let POST_URL=`${Base_URL}/posts`;
// let postArr;

// const createPostCards=(arr)=>{
//     let result="";
//     for(let i=arr.length-1; i>=0; i--){
//         result +=`
//          <div class="col-md-4 mb-4" id="${arr[i].id}"> 
//              <div class="card h-100">
//                 <div class="card-header">
//                     <h3>${arr[i].title}</h3>
//                 </div>
//                 <div class="card-body">
//                     <p>${arr[i].body}</p>
//                 </div>
//                 <div class="card-footer d-flex justify-content-between">
//                     <button class="btn btn-primary btn-sm" onclick="onEdit(this)">EDIT</button>
//                     <button class="btn btn-danger btn-sm" onclick="onRemove(this)">REMOVE</button>
//                 </div>
//             </div>
//         </div>
//         `
//         postContainer.innerHTML=result;

//     }
// }

// fetchBlogs()

// function fetchBlogs(){

//     spinner.classList.remove("d-none")

//     let xhr = new XMLHttpRequest();

//     xhr.open("GET",POST_URL,true);

//     xhr.send()

//     xhr.onload =function (){
//         if(xhr.status >=200 && xhr.status < 300){
//            postArr =JSON.parse(xhr.response);

//            createPostCards(postArr)
//            spinner.classList.add("d-none")

//     }else{
//         cl("somthing went wrong !!")
//         spinner.classList.add("d-none");


//     }
// }
// }














