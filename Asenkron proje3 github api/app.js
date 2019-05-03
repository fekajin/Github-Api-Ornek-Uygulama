//https://api.github.com/users/mustafamuratcoskun

//elementleri seçme

const githubForm = document.getElementById("github-form");
const nameInput = document.getElementById("githubname");
const clearLastUsers = document.getElementById("clear-last-users");
const lastUsers = document.getElementById("last-users");
const github = new Github();
const ui = new UI();

eventListeners();

function eventListeners(){
    githubForm.addEventListener("submit",getData);
    clearLastUsers.addEventListener("click",clearAllSearched);
    document.addEventListener("DOMContentLoaded",getAllSearched);
}

function getData(e){
   let username = nameInput.value.trim();

   if(username === ""){
       alert("lütfen geçerli bir kullanıcı adı girin...");
   }
   else{
       github.getGithubData(username)
       .then(response => {
        if(response.user.message === "Not Found"){
           ui.showError(response.user.message);
        }
        else{
            ui.addSearchedUserToUI(username);
            Storage.addSearchedUserToStorage(username);
            ui.showUserInfo(response.user);
            ui.showUserRepos(response.repo);
        }
        })
       .catch(err=> ui.showError(err));
   }
    
   ui.clearInput();
    e.preventDefault();
}

function clearAllSearched(){

    if(confirm("Emin misiniz?")){
        Storage.clearAllSearchedUsersFromStorage();
        ui.clearAllSearchedFromUI();
    }
   
}

function getAllSearched(e){
 
    let users = Storage.getSearchedUsersFromStorage();
    let result = "";
    users.forEach(user => {
        result +=`<li class="list-group-item">${user}</li>`
    });

    lastUsers.innerHTML = result;
}