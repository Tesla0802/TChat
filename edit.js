const userArray = getArrayFromFirebase("User");
const displayUser = document.querySelector("#displayUser");
const nameInput = document.querySelector("#name");
const lastnameInput = document.querySelector("#lastname");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const submitButton = document.querySelector("#submitButton");
const userId = localStorage.getItem("userid");
const userFullName = document.querySelector(".name");
let currentUser = {};
setTimeout(() => {
  displayUser.innerHTML = "";
  document.querySelector(".after").style.display = "block";
  if (userId) {
    userArray.forEach((element) => {
      if (element.userid === userId) {
        currentUser = element;
        return;
      }
    });
    userFullName.innerHTML = `${currentUser.data.name} ${currentUser.data.last_name}`;
    userFullName.style.textTransform = "capitalize";
    userFullName.style.color = "red";
    nameInput.value = currentUser.data.name;
    lastnameInput.value = currentUser.data.last_name;
    emailInput.value = currentUser.data.email;
    passwordInput.value = currentUser.data.password;
  } else {
    localStorage.clear();
    location.href = "index.html";
  }
}, 2000);

submitButton.addEventListener("click", () => {
  let name = nameInput.value;
  let last_name = currentUser.data.last_name;
  let email = emailInput.value;
  let password = passwordInput.value;
  try {
    changeDataOnFirebaseByID("User", userId, {
      name: name,
      last_name: last_name,
      email: email,
      password: password,
    });
    firebase
      .database()
      .ref("Meesage")
      .on("child_added", function (snapshot) {
        if (snapshot.val().uploadUserID == userId) {
          let currentMessage = snapshot.val();
          currentMessage.name = name;
          changeDataOnFirebaseByID("Meesage", snapshot.key, currentMessage);
        }
      });
    displayAlert("მომხარებელი წარმატებით განახლდა", "Success", "success");
    setTimeout(() => {
      location.reload();
    }, 1000);
  } catch (err) {
    displayAlert("მოხდა გაუთვალისწინებელი შეცდომა", err, "error");
    setTimeout(() => {
      location.reload();
    }, 2000);
  }
});
