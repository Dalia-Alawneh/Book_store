let inputs=document.getElementsByClassName('input');
let add = document.getElementById('add');
let clear = document.getElementById('clear');
let data = document.getElementById('data');
let bookName = document.getElementById('bookName');
let pages = document.getElementById('pages');
let price = document.getElementById('price');
let auther = document.getElementById('auther');
let error= document.getElementsByClassName('error');
let search = document.getElementById('search');
let books=[];
if(localStorage.getItem('books')){
    books=JSON.parse(localStorage.getItem('books'));
    displayBook()
}else{
    books=[];
}
function addBook(){
    let book={
        bName: bookName.value,
        bAuther: auther.value,
        bPages:pages.value,
        bPrice:price.value
    }
    if(validateBookName()==true && validateAuther()==true && validatePages()==true && validatePrice()==true){
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
        clearAll();
        displayBook();
    }
    
}

function displayBook(){
    
    let result ='';
    for(let index=0;index<books.length;index++){
        result+=
        `<tr>
            <td>${index+1}</td>
            <td>${books[index].bName}</td>
            <td>${books[index].bAuther}</td>
            <td>${books[index].bPages}</td>
            <td>${books[index].bPrice}$</td>
            <td><button onclick="deleteBook(${index})" id="trash" class="btn btn-danger"><i class="bi bi-trash text-white "></i></button></td>
            <td><button onclick="editBook(${index})" id="edit" class="btn btn-primary"><i class="bi bi-pencil-square text-white"></i></button></td>
            
        </tr>`
        
    }
    data.innerHTML=result;
}
clear.addEventListener('click',clearAll);
function clearAll(){
    for(let i=0 ;i<inputs.length;i++)
        inputs[i].value='';
}

function deleteBook(id){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
            
            books.splice(id,1);
            localStorage.setItem('books',JSON.stringify(books));
            displayBook();
            }else{
                displayBook();
            }
        })
    
}
let indx=0;
function editBook(id){
    bookName.value=books[id].bName;
    auther.value=books[id].bAuther;
    pages.value=books[id].bPages;
    price.value=books[id].bPrice;
    indx=id;
    add.value='Update';
    add.setAttribute('onclick','update()')
    
}
function update(){
    
    if(validateBookName()==true && validateAuther()==true && validatePages()==true && validatePrice()==true){
        let newBook={
            newName:bookName.value,
            newAuther:auther.value,
            newPages:pages.value,
            newPrice:price.value
        }
        
        clearAll();
        add.value='Add Book';
    books[indx].bName=newBook.newName;
    books[indx].bAuther=newBook.newAuther;
    books[indx].bPages=newBook.newPages;
    books[indx].bPrice=newBook.newPrice;
    localStorage.setItem('books',JSON.stringify(books));
    //books.splice(indx,1,newBook);
    displayBook();
    Swal.fire({
        
        icon: 'success',
        title: 'Your work has been updated!',
        showConfirmButton: false,
        timer: 1500
    })
    add.setAttribute('onclick','addBook()')
}
    
}

function validateBookName(){
    let nameRegex=/^[A-Z][a-z0-9]/;
    if(!nameRegex.test(bookName.value)){
        error[0].style.display='flex';
        return false;
    }else{
        error[0].style.display='none';
        return true;;
    }
}
bookName.addEventListener('blur',validateBookName);
function validateAuther(){
    let autherRegex=/^[A-Z][a-z0-9]/;
    if(!autherRegex.test(auther.value)){
        error[1].style.display='flex';
        return false;
    }else{
        error[1].style.display='none';
        return true;
    }
}
auther.addEventListener('blur',validateAuther);

function validatePages(){
    let pageRegex=/^[0-9]{2,10}$/;
    if(!pageRegex.test(pages.value)){
        error[2].style.display='flex';
        return false;
    }else{
        error[2].style.display='none';
        return true;
    }
}

pages.addEventListener('blur',validatePages);


function validatePrice(){
    let priceRegex=/^[0-9]{2,10}$/;
    if(!priceRegex.test(price.value)){
        error[3].style.display='flex';
        return false;
    }else{
        error[3].style.display='none';
        return true;
    }
}

price.addEventListener('blur',validatePrice);


search.addEventListener('keyup', ()=>{
    let searchKey= search.value;
    let result=``;
    for(let index=0;index<books.length;index++){

        if(books[index].bName.toLowerCase().includes(searchKey.toLowerCase())){
            result+=
            `<tr>
                <td>${index+1}</td>
                <td>${books[index].bName}</td>
                <td>${books[index].bAuther}</td>
                <td>${books[index].bPages}</td>
                <td>${books[index].bPrice}$</td>
                <td><button onclick="deleteBook(${index})" id="trash" class="btn btn-danger"><i class="bi bi-trash text-white "></i></button></td>
                <td><button onclick="editBook(${index})" id="edit" class="btn btn-primary"><i class="bi bi-pencil-square text-white"></i></button></td>
                
            </tr>`
        }
        data.innerHTML=result;
    }
    
})
