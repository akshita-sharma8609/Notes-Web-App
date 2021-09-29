showNotes()

//adding notes to the local storage
let addbtn = document.getElementById("add_btn")
addbtn.addEventListener("click", function (e) {
    let addtext = document.getElementById("addtext")
    let addtitle = document.getElementById("titleText")
    let notes = localStorage.getItem("notes")
    if (notes == null) {
        notes_object = []
    }
    else {
        notes_object = JSON.parse(notes)
    }
    let myobj = {
        title: addtitle.value,
        text: addtext.value
    }
    notes_object.push(myobj)
    localStorage.setItem("notes", JSON.stringify(notes_object))
    addtext.value = ""
    addtitle.value = ""
    showNotes()
})

//function to show notes
function showNotes() {
    let notes = localStorage.getItem("notes")
    if (notes == null) {
        notes_object = []
    }
    else {
        notes_object = JSON.parse(notes)
    }
    let html = ""
    notes_object.forEach(function (element, index) {
        html += ` <div class=" noteCard card mx-3 my-2 " style="width: 18rem; ">
        <div class="card-body">
          <h5 class="card-title">${element.title}</h5>
          <p class="card-text">${element.text}</p>
          <button class="btn btn-danger" id=${index} onclick="delnote(this.id)">Delete Note</button>
        </div>
      </div>`
        let mynotes = document.getElementById("mynotes")

    });
    if (notes_object.length != 0) {
        mynotes.innerHTML = html
    }
    else {
        mynotes.innerHTML = `<center><strong>NOTHING TO SHOW :( </strong></center>`
    }
}

//functions to delete notes
function delnote(index) {
    let notes = localStorage.getItem("notes")
    if (notes == null) {
        notes_object = []
    }
    else {
        notes_object = JSON.parse(notes)
    }
    notes_object.splice(index, 1)
    localStorage.setItem("notes", JSON.stringify(notes_object))
    showNotes()
}


let searchbtn = document.getElementById("searchBtn")
searchbtn.addEventListener("click", searchNotes)
let searchtext = document.getElementById("searchText")
searchtext.addEventListener("input", searchNotes)

//function to search for notes
function searchNotes() {
    let inpSearchValue = searchtext.value.toLowerCase()
    let notecard = document.getElementsByClassName("noteCard")
    Array.from(notecard).forEach(function (element) {
        let cardText = element.getElementsByTagName("p")[0].innerText.toLowerCase()
        let cardtitle = element.getElementsByTagName("h5")[0].innerText.toLowerCase()
        if (cardText.includes(inpSearchValue) || cardtitle.includes(inpSearchValue)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
}






