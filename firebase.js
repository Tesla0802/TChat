/*
    firebaseConfig - პროექტთან დასაკავშრებლად ვიღებთ firebase -ს 
    დაგენერირებულ ობიექტს რომელიც დააკავშრებს ჩვენს კოდს პროექტთან
*/

const firebaseConfig = {
  apiKey: "AIzaSyCvMqf0p3SFGbOGpSKC-psmmidS9YcQhqg",
  authDomain: "jp-ws-21.firebaseapp.com",
  databaseURL: "https://jp-ws-21-default-rtdb.firebaseio.com",
  projectId: "jp-ws-21",
  storageBucket: "jp-ws-21.appspot.com",
  messagingSenderId: "173302842797",
  appId: "1:173302842797:web:64d09af35debea372e4d24",
  measurementId: "G-TLY1TRMNMJ",
};

/*
    შემდგომი ფუნქცია უბრალოდ აკავშირებს კოდს და პროექტს ერთმანეთთან
*/

firebase.initializeApp(firebaseConfig);

/*
    randomID() - შექმნის უნიკალურ რანდომ ID
*/

function randomID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    let r = (Math.random() * 16) | 0;
    let v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/*
    generateFirebaseItem(ID, value) - ფუნქცია დააგენერირებს ერთ ობიექტს რომელშიც იქნება მოთავსებული
    userid - ობიექტის იდ და data - იგივე მონაცემები
*/

function generateFirebaseItem(ID, value) {
  return {
    userid: ID,
    data: value,
  };
}

/*
    addElementInFirebase(REF, data) - ფუნქცია დაამატებს ფაირბეისის პროექტში ელემენეტს
    REF - წარმოადგენს , მისამართს სად ემატება (მაგ : "User/")
    data - მონაცემი რაც უნდა დაემატოს
*/

function addElementInFirebase(REF, data) {
  firebase
    .database()
    .ref(REF + randomID())
    .set(data);
}

/*
    getArrayFromFirebase(REF) - დააბრუნბს მასივს უშუალოდ ფაირბეისიდან
    REF - მისამართზე რა ელემენტებიც არის სრულიად მასივში მოათავსებს და დააბრუნბს
*/

function getArrayFromFirebase(REF) {
  let tempArray = [];
  firebase
    .database()
    .ref(REF)
    .on("value", (response) => {
      response.forEach((element) => {
        tempArray.push(generateFirebaseItem(element.key, element.val()));
      });
    });
  return tempArray;
}

/*
    removeRefFromFirebase(REF) - ფუნქცია მთლიანად წაშლის მონაცემების ხაზს
    REF - მისამართი რაც უნდა წაიშალოს 
*/

function removeRefFromFirebase(REF) {
  firebase.database().ref(`${REF}`).remove();
}

/*
    removeElementFromFirebase(REF) - ფუნქცია წაშლის კონკრეტულ ელემენტს
    REF - მისამართი საიდანაც უნდა წაიშალოს
    ID - კონკრეტული ელემენტის ID
*/

function removeElementFromFirebase(REF, id) {
  firebase.database().ref(`${REF}/${id}`).remove();
}

/*
    getElementFromFirebaseByID(REF,id) - კონკრეტულად ელემენტის დაბრუნბა ფაირბეისიდან
    REF - მისამართი საიდანაც უნდა ამოიღოს
    ID - კონკრეტული ელემენტის ID
*/

function getElementFromFirebaseByID(REF, id) {
  const tempArray = getArrayFromFirebase(REF);
  let temp = {};
  tempArray.forEach((element) => {
    if (element.userid === id) {
      temp = element;
    }
  });
  return temp;
}

/*
    changeDataOnFirebaseByID(REF,ID,data) - კონკრეტული ელემენტის განახლება
    REF - მისამართი საიდანაც უნდა ამოიღოს
    ID - კონკრეტული ელემენტის ID
    Data - რა ინფორმაციითაც უნდა განახლდეს
*/

function changeDataOnFirebaseByID(REF, ID, data) {
  firebase
    .database()
    .ref(REF + "/" + ID)
    .set(data);
}
