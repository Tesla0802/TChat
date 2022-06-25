const input = document.querySelector("input");
const button = document.querySelector(".send");
const curerntUserID = localStorage.getItem("userid");
const displayAreaChat = document.querySelector("#displayAreaChat");
button.addEventListener("click", () => {
  let text = input.value;
  if (text === "") {
    return;
  }
  addElementInFirebase("Meesage/", {
    text: text,
    uploadUserID: curerntUserID,
    uploadTime: new Date().toLocaleString(),
  });
  input.value = "";
});

const userArray = getArrayFromFirebase("User");
const currentMessages = [];
let i = 0;
// setInterval(() => {
//   let showedMessage = false;
//   const messageArray = getArrayFromFirebase("Meesage");
//   messageArray.forEach((element) => {
//     console.log(i);
//     if (i !== 0) {
//       currentMessages.push(element);
//     }
//     i++;
//     currentMessages.forEach((data) => {
//       if (data.data.text == element.data.text) {
//         showedMessage = true;
//         return;
//       }
//     });
//     if (showedMessage) {
//       return;
//     }

//     if (element.data.uploadedUserId == curerntUserID) {
//       displayAreaChat.innerHTML += `
//         <div class="block">
//         <div class="message">
//           <aside class="message-top my-message">
//             <i class="fa-solid fa-circle-user"></i> <span>${element.data.uploadUserID}</span>
//           </aside>
//           <aside class="message-bottom">${element.data.text}</aside>
//         </div>
//       </div>
//         `;
//     } else {
//       displayAreaChat.innerHTML += `
//         <div class="block">
//         <div class="message">
//           <aside class="message-top">
//             <i class="fa-solid fa-circle-user"></i> <span>${element.data.uploadUserID}</span>
//           </aside>
//           <aside class="message-bottom">${element.data.text}</aside>
//         </div>
//       </div>
//         `;
//     }
//   });
// }, 1000);
