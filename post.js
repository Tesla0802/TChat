if (localStorage.getItem("userid")) {
  let url = location.href.split("/")[3];
  if (url === "login.html" || url === "register.html") {
    location.href = "index.html";
  }
  const postArray = getArrayFromFirebase("Post");
  const displayPost = document.querySelector("#displayPost");
  setTimeout(() => {
    displayPost.innerHTML = "";
    postArray.forEach((element) => {
      displayPost.innerHTML += `
          <div class="card" style="width: 20rem;">
          <img src="${element.data.imgSrc}" class="card-img-top" alt="photo">
          <div class="card-body">
            <h5 class="card-title">${element.data.title}</h5>
            <p class="card-text">${element.data.text}</p>
            <p class="card-text">Upload Time : ${element.data.uploadTime}</p>
          </div>
        </div>
        `;
    });
  }, 2000);
}
