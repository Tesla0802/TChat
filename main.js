function displayAlert(title, text, icon) {
  Swal.fire({
    icon: icon,
    text: text,
    title: title,
  });
}

if (localStorage.getItem("userid")) {
  let url = location.href.split("/")[3];
  if (url === "login.html" || url === "register.html") {
    location.href = "index.html";
  }
  document.querySelectorAll(".clear").forEach((element) => {
    element.remove();
  });
  const notVissible = document.querySelectorAll(".not-vissible");
  notVissible.forEach((element) => {
    element.style.display = "inline-block";
  });
  const logOut = document.querySelector(".logout");
  logOut.addEventListener("click", () => {
    localStorage.clear();
    location.reload();
  });
}

if (!localStorage.getItem("userid")) {
  if (location.href.split("/")[3] === "livechat.html") {
    location.href = "index.html";
  }
}
