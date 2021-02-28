console.log('welcome');

showNotes();

// If user adds a note add it to the local storage.
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener('click',function(e){ //jab bhi ye button click hoga jiski is addBtn hai tab ye function fire kardo
                                            // e is event object in this function
    let addTxt = document.getElementById("addTxt"); // textarea wala element meri addtxt ke andar aa chuka hai
    let addTitle = document.getElementById("addTitle");
    let notes = localStorage.getItem("notes");// ab mai notes le lunga localstorage se    //kyuki ho sakta hai ki kuch notes ho hamari storage mei pehle se to mai kahunga ki notes name se jo bhi item hai vo mujhe dedo
    if(notes == null){// ho sakta hai ki ye notes null ho tab mai kahunga ki agar ye notes null hota hai tab notes ko arrray mei set kar do(empty)
        notesObj= [];
    }                                    
    else {
        notesObj = JSON.parse(notes);  // agar koi string milti hai to use parse kardo.
                                    // ab ho sakta hai ki notesObj ek array mil jaaye mujhe bahut saare notes ka, ho sakta hai ki vo 1 blank array ho
                                    // so, agar kuch array mila hai to mai us strinh ko parse karke vo array nikaal lunga.
    }
    let myObj = {
        title : addTitle.value,
        text : addTxt.value
    };
    notesObj.push(myObj); // ab mai notes ke andar addtxt ki value push kar dunga // means ki agar kisi ne bhi addbtn pe click kiya to notes ko mai update kar dunga
    localStorage.setItem("notes",JSON.stringify(notesObj)); // ab mai localstorage ko update karunga means jo notes hai usko json.stringify kardo 
    //string mei convert isliye kiya kyuki localstorage mei string mei hi store karna padta hai
    addTxt.value=""; // ab mai addtxt ki value ko blank karunga varna agar mai kuch likhunga to vo likha ka likha reh jaayega
    // console.log(notesObj);
    addTitle.value="";

    // title ko save karna hai local storage ki key mai notes ke saath
    showNotes();
})

// Function to show elements from local storage.
function showNotes() {
    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    //ab hamne us array ko localstorage se nikaalkar notesOnj mei daal rakha hai or inhe note mei orint karna hai(notesObj mei array hai or hame string print karna hai)
    let html="";
    notesObj.forEach(function(element, index) {
        html += ` 
        <div class="noteCard my-2  mx-2 card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${element.title} ${index+1}</h5>
                <p class="card-text">${element.text}</p>
            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
            </div>
      </div>  `;// is html string ke andar mai us element ko print kar dunga jisse jab bhi text ayega yo element vha pe aa jayega

    });
    let notesElm = document.getElementById('notes');
    if(notesObj.length !=  0){
        notesElm.innerHTML=html;
    }
    // agar koi note nahi hai to ye aisa lag raha hai ki error aa gaya hai kuch dikh  nahi raha hai
    // so agar  notesObj ki length 0 hai to
    else{
        notesElm.innerHTML=`Nothing to show!. Use 'Add a Note' section above to add notes`;
    }
}


// Function to delete a note.
// Ab mai yr kahunga ki ye jo delete note waala button hai usko agar koi bhi call karta hai to ye function call ho jaaye.
 
function deleteNote(index) { // isme mai ek array ki index dunga jo mai delete karna chaahata hu.
    console.log('I am Deleting.',index); 
    // ab mai local storage se notes utnaunga
    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesObj= [];
    }                                    
    else {
        notesObj = JSON.parse(notes);  
    }
    // ab notesobj mei mere saare notes aa chuke hai
    // ab delete karunga or set karunga vaapas se
    notesObj.splice(index,1); // splice pehla argument leta hai (start) , or doosra ki kitne element aap yha se delete karna chaahate hai  
    localStorage.setItem("notes",JSON.stringify(notesObj));
    showNotes();
}

let search = document.getElementById('searchTxt');
search.addEventListener('input',function(){
    let inputVal = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName('noteCard'); // sare notecard waale element mujhe de do.
    Array.from(noteCards).forEach(function(element){    // in cards pe .foreach loop chala do or ek function lelo or element is function ke andar aa jayega.
     //   now check for every notecard either the element matches search or not.
     // sabse pehle mai card ka content lekar aaunga
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        // console.log(cardTxt);
        if(cardTxt.includes(inputVal)){
            element.style.display = 'block';
        }else{
            element.style.display = 'none';
        }

     })
})
