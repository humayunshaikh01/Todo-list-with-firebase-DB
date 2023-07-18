// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSOphcYW8s9m2zSD41HJYhCgfP2jszVQo",
  authDomain: "application-cb6f0.firebaseapp.com",
  projectId: "application-cb6f0",
  storageBucket: "application-cb6f0.appspot.com",
  messagingSenderId: "503698928314",
  appId: "1:503698928314:web:9df65c5bab99d38c0e8883"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);



// console.log("app", app)
// console.log("db", db)


// var input = document.getElementById("todoInput");
// var ulParent = document.getElementById("ulParent");
// const addBtn = document.getElementById("addBtn");
// const collectedTodos = collection(db, "Todos");

// addBtn.addEventListener("click", addBtn)
// //  console.log(addBtn)
// window.addEventListener("load", getTodos)

// async function getTodos() {
//     try {
//         const arr = []
//         const querySnapshot = await getDocs(collectedTodos)
//         querySnapshot.forEach(function (doc) {
//             // console.log(doc.id, doc.data())
//             const todoValue = doc.data().todo
//             createUI(todoValue, doc.id)
//         });


//     } catch (error) {
//         console.log(error.message, "error")
//         alert(error.message)
//     }
// }


// async function addTodo(){
//     try {
//         if(!input.value ){
//             alert("Pehle Value daalo")
//             return
//         }

//         const data = {
//             todo: input.value
//         }

//         const docRef = await addDoc(collectedTodos, data);
//         console.log("Document written with ID: ", docRef.id);
//         input.value = ""
//     } catch (error) {
//         console.log("error", error.message)
//     }

// // var liElement = document.createElement("li")
// // liElement.className = "list-group-item bg-dark text-white d-flex align-items-center justify-content-between"

// // var liTxt = document.createTextNode(todoInput.value)
// // liElement.appendChild(liTxt)
// // console.log(liElement)

// // var div = document.createElement("div")
// // var editBtn = document.createElement("Button")
// // var deleteBtn = document.createElement("Button")
// // editBtn.innerHTML = "Edit"

// // editBtn.setAttribute("onclick" , "editTodo(this)")
// // deleteBtn.innerHTML = "Delete"

// // deleteBtn.setAttribute("onclick" ,"deleteTodo(this)")

// // editBtn.className ="btn btn-success"
// // deleteBtn.className = "btn btn-danger"

// // div.appendChild(editBtn)
// // div.appendChild(deleteBtn)

// // liElement.appendChild(div)

// // ulParent.appendChild(liElement)
// // // console.log(ulParent)

// // input.value = ""

// }


// function editTodo(el){
//     // console.log("editTodo()" , el.parentNode.parentNode.firstChild.nodeValue)
//     var li = el.parentNode.parentNode
//     // console.log(li)

//     var placeHolder = li.firstChild.nodeValue;
//     var editValue = prompt("Edit ToDo..." , placeHolder);
//     // console.log("Edit value",editValue)

//     li.firstChild.nodeValue = editValue;
// }



// function deleteTodo(elem){
//     elem.parentNode.parentNode.remove()

// }


// function createUI(todoValue, id) {

//     const todoUI = `
//     <li id=${id} class="list-group-item d-flex align-items-center justify-content-between">
//     ${todoValue}
//     <div>
//         <button class="btn btn-info" id="editBtn" >EDIT</button>
//         <button class="btn btn-danger" id="deleteBtn" >DEL</button>
//     </div>
//     </li>
// `
//     ulParent.innerHTML += todoUI

//     const editBtn = document.querySelector("#editBtn")
//     const deleteBtn = document.querySelector("#deleteBtn")

//     editBtn.addEventListener("click", editTodo)
//     deleteBtn.addEventListener("click", deleteTodo)

// }



var input = document.getElementById("todoInput")
var ulParent = document.getElementById("ulParent")
const addBtn = document.querySelector("#addBtn")
const todoCollection = collection(db, "todos")
const deleteAllBtn = document.getElementById("deleteAllBtn")

addBtn.addEventListener("click", addTodo)
window.addEventListener("load", getTodos)
deleteAllBtn.addEventListener("click", deleteAll)

async function getTodos() {
    try {
        const arr = []
        const querySnapshot = await getDocs(todoCollection)
        querySnapshot.forEach(function (doc) {
            const todoValue = doc.data().todo
            createUI(todoValue, doc.id)
            
        });

    } catch (error) {
        console.log(error.message, "error")
        alert(error.message)
    }
}

async function addTodo() {
    try {
        if (!input.value) {
            alert("Add items")
            return
        }
        const data = {
            todo: input.value
        }
        const docRef = await addDoc(todoCollection, data)
        console.log("Document written with ID: ", docRef.id);
        createUI(input.value, docRef.id)
        input.value = ""
    } catch (error) {
        console.log("error", error.message)
        alert(error.message)
    }
}

async function editTodo(el) {
    try {

        var li = el.target.parentNode.parentNode
        var placeHolder = li.firstChild.nodeValue
        var editValue = prompt("Edit Todo", placeHolder)
        // console.log(li.id, "id")
        const updateData = await updateDoc(doc(db, "todos", li.id), {
            todo: editValue
        })

        console.log("editValue", editValue)
        li.firstChild.nodeValue = editValue

    } catch (error) {
        console.log("error", error.message)
        alert(error.message)
    }
}



function deleteTodo(elem) {
    elem.target.parentNode.parentNode.remove()
}


function createUI(todoValue, id){

    const todoUI = `
    <li id=${id} class="list-group-item d-flex align-items-center justify-content-between">
    ${todoValue}
    <div>
        <button class="btn btn-success" id="editBtn">Edit</button>
        <button class="btn btn-danger" id="deleteBtn">Delet</button>
    </div>
    </li>
`
    ulParent.innerHTML += todoUI

    const editBtn = document.querySelector("#editBtn")
    const deleteBtn = document.querySelector("#deleteBtn")
    editBtn.addEventListener("click", editTodo)
    deleteBtn.addEventListener("click", deleteTodo)

}


function deleteAll(){
    ulParent.innerHTML = ""

}