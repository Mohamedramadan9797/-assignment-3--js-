const nameInput = document.getElementById("Name");

const urlInput = document.getElementById("Url");

const addBtn = document.getElementById("addBtn");
const tablebody = document.getElementById("tablebody");

let BookMarks = [];

let mainIndex = 0;

if (localStorage.getItem("bookmarks") == null) {
  BookMarks = [];
} else {
  BookMarks = JSON.parse(localStorage.getItem("bookmarks"));
  displayBlock(BookMarks);
}

let nameRegex = /^[A-Za-z_]{1,}$/;
function isNameValid() {
  if (nameRegex.test(nameInput.value)) {
    return true;
  } else {
    return false;
  }
}

let urlRegex = /^(http:\/\/)?[A-za-z0-9_\.]{1,}\.[a-z]{3}$/;
function isUrlValid() {
  if (urlRegex.test(urlInput.value)) {
    return true;
  } else {
    return false;
  }
}

nameInput.onkeyup = function () {
  if (isUrlValid() && isNameValid()) {
    addBtn.removeAttribute("disabled");
  } else {
    addBtn.disabled = "true"
  }
};

urlInput.onkeyup = function () {
  if (isUrlValid() && isNameValid()) {
    console.log("tmam");
    addBtn.removeAttribute("disabled");
  } else {
    addBtn.disabled = "true"
  }
};

addBtn.addEventListener("click", function () {
  if (addBtn.innerHTML == "update") {
    addBtn.innerHTML = "Submit";
    let BookMark = {
      name: nameInput.value,
      URL: urlInput.value,
    };
    BookMarks.splice(mainIndex, 1, BookMark);
  } else {
    let BookMark = {
      name: nameInput.value,
      URL: urlInput.value,
    };
    BookMarks.push(BookMark);
  }

  // console.log(BookMarks);
  localStorage.setItem("bookmarks", JSON.stringify(BookMarks));
  displayBlock(BookMarks);

  clearData(BookMarks);
});

function displayBlock(anyArray) {
  let marks = ``;
  for (i = 0; i < anyArray.length; i++) {
    marks += `
     <tr>
        <td>${anyArray[i].name}</td>
        <td> <button class="btn btn-primary" onclick='visitBook(${i})' >visit</button></td> 
        <td> <button onclick='updateBook(${i})' class="btn btn-info">update</button></td> 
        <td> <button onclick='deleteBook(${i} )' class="btn btn-danger">Delete</button></td>
     </tr>
     
    
     `;
  }

  tablebody.innerHTML = marks;
}

function visitBook(index) {
  let text = BookMarks[index].URL;
  console.log(text);

  window.location.href = `https://${text}`;
}

function deleteBook(index) {
  BookMarks.splice(index, 1);
  localStorage.setItem("bookmarks", JSON.stringify(BookMarks));
  displayBlock(BookMarks);
}

function clearData() {
  
  nameInput.value = "";
  urlInput.value = "";
}

function updateBook(index) {
  nameInput.value = BookMarks[index].name;
  urlInput.value = BookMarks[index].URL;
  addBtn.innerHTML = "update";
  mainIndex = index;
}

function search(term) {
  let wantedBook = [];
  for (i = 0; i < BookMarks.length; i++) {
    if (BookMarks[i].name.toLowerCase().includes(term)) {
      wantedBook.push(BookMarks[i]);
    }
  }
  displayBlock(wantedBook);
}
