const listElm = document.querySelector("#list");
const apiUrl = "https://randomuser.me/api/?";

const userCountElm = document.querySelector("#user-count");

let globalUser = []
const displayUser = (args = globalUser) => {

  let str = "";

  args.map(usr => {
      str += `

      <div class="card">
      <div class="card__platform">
        <div class="card__image">
        <img src="${usr.picture.large}"/>
        </div>
        <div class="card__info">
          <div class="card__info__label">
            <h2>${usr.name.first} ${usr.name.last}</h2>
          </div>
          <div class="card__info__details">
            <ul class="list">
              <li><i class="fa-solid fa-mobile"></i>${usr.phone}<span></span></li>
              <li><i class="fa-solid fa-envelope"></i>${usr.email}<span></span></li>
              <li><i class="fa-solid fa-calendar-days"></i>${usr.dob.age}<span></span></li>
              <li><i class="fa-solid fa-city"></i>${usr.location.city}<span></span></li>
              <li><i class="fa-solid fa-globe"></i>${usr.location.country}<span></span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
      `});
      userCountElm.innerHTML = args.length;
      listElm.innerHTML =str;
}


const fetchUser = (params = "results=20") => {
  fetch(apiUrl + params)
  .then(response => response.json())
  .then(data => {
    globalUser = data.results;
    displayUser();
  });
  
 
};
fetchUser();

const handleOnechange = e => {
  const params = "results=20&gender=" + e.value;
  fetchUser(params)
}

//make search working
 const handleOnSearch = () => {
   const searchStr = document.getElementById("search").value;
   const filteredUser = globalUser.filter((item) => {
     const userName = `${item?.name?.first} ${item?.name?.last}`
     if(userName.toLowerCase().includes(searchStr.toLowerCase())){
       return item;
     }
   })
   displayUser(filteredUser);
   
 }