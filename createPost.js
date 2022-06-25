const title = document.querySelector("#title");
const text = document.querySelector("#text");
const image = document.querySelector("#image");
const button = document.querySelector("#button");

button.addEventListener("click", () => {
  let titleValue = title.value;
  let textValue = text.value;
  if (titleValue == "" || textValue == "") {
    return;
  }
  let imgSrc = "";
  try {
    const reader = new FileReader();
    reader.readAsDataURL(image.files[0]);
    reader.onload = () => {
      imgSrc = reader.result;
      addElementInFirebase("Post/", {
        title: titleValue,
        text: textValue,
        imgSrc: imgSrc,
        uploadTime: new Date().toLocaleString(),
      });
    };
  } catch (err) {
    imgSrc =
      "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png";
    addElementInFirebase("Post/", {
      title: titleValue,
      text: textValue,
      imgSrc: imgSrc,
      uploadTime: new Date().toLocaleString(),
    });
  }
  displayAlert("წარმატებული ოპერაცია", "პოსტი წარმატებით დაემატა", "success");
  title.value = "";
  text.value = "";
  setTimeout(() => {
    location.href = "index.html";
  }, 1500);
});
