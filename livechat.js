const input = document.querySelector("input");
const button = document.querySelector(".send");
const curerntUserID = localStorage.getItem("userid");
const displayAreaChat = document.querySelector("#displayAreaChat");
const deleteButton = document.querySelector(".delete-chat");
const down = document.querySelector(".down");
let currentUser = {};
let counter = 0;
firebase
  .database()
  .ref("User")
  .on("value", (response) => {
    response.forEach((element) => {
      if (element.key === curerntUserID) {
        currentUser = generateFirebaseItem(element.key, element.val());
      }
    });
  });
deleteButton.addEventListener("click", () => {
  Swal.fire({
    title: "დარწმუნებული ხართ?",
    text: "უკან ვერ დავაბრუნბთ ჩათს!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Deleted!", "ჩათი წაიშალა.", "success");
      removeRefFromFirebase("Meesage");
      location.reload();
    }
  });
});

document.querySelector("body").addEventListener("keypress", (event) => {
  if (event.keyCode === 13) {
    writeSms();
  }
});

button.addEventListener("click", () => {
  writeSms();
});

function writeSms() {
  let text = input.value;
  if (text === "") {
    return;
  }
  addElementInFirebase("Meesage/", {
    text: text,
    uploadUserID: curerntUserID,
    uploadTime: new Date().toLocaleString(),
    name: currentUser.data.name,
  });
  input.value = "";
}

firebase
  .database()
  .ref("Meesage")
  .on("child_added", function (snapshot) {
    if (snapshot.val().uploadUserID == curerntUserID) {
      displayAreaChat.innerHTML += `
      <div class="my-message-flex" id="message${counter}">
      <div class="block my-message">
        <div class="message">
          <aside class="message-top my-message">
            <i class="fa-solid fa-circle-user"></i>
            <span>${snapshot.val().name}</span>
          </aside>
          <aside class="message-bottom">
          ${snapshot.val().text}
          </aside>
        </div>
      </div>
    </div>`;
    } else {
      displayAreaChat.innerHTML += `
      <div class="friend-message" id="message${counter}">
              <div class="block">
                <div class="message">
                  <aside class="message-top">
                    <i class="fa-solid fa-circle-user"></i>
                    <span>${snapshot.val().name}</span>
                  </aside>
                  <aside class="message-bottom">
                  ${snapshot.val().text}
                  </aside>
                </div>
              </div>
            </div>`;
    }
    counter++;
    down.href = `#message${counter - 1}`;
    location.href = `#message${counter - 1}`;
  });
