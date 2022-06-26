const searchInput = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#search");
const displayPost = document.querySelector("#displayPost");
const postArray = getArrayFromFirebase("Post");
const displayAfter = document.querySelector(".displayAfter");
let logic = true;
if (localStorage.getItem("userid")) {
  let url = location.href.split("/")[3];
  if (url === "login.html" || url === "register.html") {
    location.href = "index.html";
  }
  document.querySelector(".collapse").style.justifyContent = "space-between";
  setTimeout(() => {
    displayPost.innerHTML = "";
    displayPost.style.display = "flex";
    postArray.forEach((element) => {
      displayData(displayPost, element.data, element.userid);
    });
  }, 2000);
}

searchBtn.addEventListener("click", () => {
  let searchResult = searchInput.value;
  if (logic) {
    searchBtn.innerHTML = `<i class="fa-solid fa-magnifying-glass-minus "></i>`;
    displayPost.style.display = "none";
    let post = [];
    let found = false;
    postArray.forEach((element) => {
      if (element.data.title == searchResult) {
        found = true;
        post.push(element);
      }
    });
    if (found) {
      displayAfter.style.display = "flex";
      post.forEach((element) => {
        displayData(displayAfter, element.data, element.userid);
      });
    } else {
      displayPost.style.display = "flex";
      searchBtn.innerHTML = `<i class="fa-solid fa-magnifying-glass"></i>`;
      displayAlert(
        "ვერ მოიძებნა",
        "ქარდი რომელსაც ეძებთ არ არსებობს",
        "question"
      );
    }
  } else {
    displayAfter.style.display = "none";
    displayAfter.innerHTML = "";
    searchBtn.innerHTML = `<i class="fa-solid fa-magnifying-glass"></i>`;
    displayPost.style.display = "flex";
  }
  logic = !logic;
  searchInput.value = "";
});

function displayData(displayElement, element, key) {
  displayElement.innerHTML += `
  <div class="card" style="width: 20rem;">
  <img src="${element.imgSrc}" class="card-img-top" alt="photo">
  <div class="card-body">
    <h5 class="card-title">${element.title}</h5>
    <p class="card-text">${element.text}</p>
    <p class="card-text">Upload Time : ${element.uploadTime}</p>
    <button class="btn btn-danger hideOnSearch" onclick="deletePost('${key}')">Delete</button>
  </div>
</div>
  `;
}

function deletePost(key) {
  removeElementFromFirebase("Post", key);
  location.reload();
}
