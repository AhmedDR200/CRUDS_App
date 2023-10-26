let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mod = 'create';
let tmp;

// test
console.log(title,price,taxes,ads,discount,total,count,category,submit);

// get total
function getTotal(){
    if (price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value)
         - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040';
    }
    else{
        total.innerHTML = '';
        total.style.background = 'rgb(217, 7, 7)';
    }
}

// create product
let dataProduct;

if (localStorage.product != null){
    dataProduct = JSON.parse(localStorage.product)
}
else{
    dataProduct = [];
}

submit.onclick = function(){
    let newProduct = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase()
    }
    // validations
    if(title.value != '' 
    && price.value != ''
    && category.value != ''
    && newProduct.count < 100){

    //count
    if(mod == 'create'){
        if(newProduct.count > 1){
            for(let i = 0; i < newProduct.count; i++){
                dataProduct.push(newProduct);
            }
        }
        else{
            dataProduct.push(newProduct);
        }
    }
    else{
            dataProduct[tmp] = newProduct;
            mod = 'create';
            submit.innerHTML = 'Create';
            count.style.display = 'block';
        }
        clearData();
    }

    

    // save localstorage
    localStorage.setItem('product', JSON.stringify(dataProduct));

    showData()

    // test
    console.log(newProduct);
}

// clear inputs
function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = ''; 
}

// read
function showData(){
    getTotal();
    let table = '';
    for (i=0; i < dataProduct.length ; i++){
        table += `
        <td>${i+1}</td>
        <td>${dataProduct[i].title}</td>
        <td>${dataProduct[i].price}</td>
        <td>${dataProduct[i].taxes}</td>
        <td>${dataProduct[i].ads}</td>
        <td>${dataProduct[i].discount}</td>
        <td>${dataProduct[i].total}</td>
        <td>${dataProduct[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">Update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
        </tr>`;
    }

    document.getElementById('tbody').innerHTML = table;
    // delete all
    let btnDelete = document.getElementById('deleteAll')
    if(dataProduct.length > 0){
        btnDelete.innerHTML = `
        <button onclick="deleteAll()">Delete All (${dataProduct.length})</button>
        `
    }
    else{
        btnDelete.innerHTML = '';
    }
}
showData();

// delete
function deleteData(i) {
    // Ask for confirmation from the user
    if (window.confirm("Are you sure you want to delete this item?")) {
        // If the user confirms, delete the item
        dataProduct.splice(i, 1);
        localStorage.product = JSON.stringify(dataProduct);
        showData();
    }
}

// delete all function
function deleteAll() {
    // Ask for confirmation from the user
    if (window.confirm("Are you sure you want to delete all data?")) {
        // If the user confirms, clear localStorage and data array
        localStorage.clear();
        dataProduct.splice(0);
        showData();
    }
}

// update
function updateData(i){
    title.value = dataProduct[i].title;
    price.value = dataProduct[i].price;
    taxes.value = dataProduct[i].taxes;
    ads.value = dataProduct[i].ads;
    discount.value = dataProduct[i].discount;
    getTotal();
    count.style.display = 'none';
    category.value = dataProduct[i].category;
    submit.innerHTML = 'Update';
    mod = 'update'
    tmp = i;
    scroll({
        top: 0,
        behavior: "smooth"
    })
}

// search
let searchMood = 'title';

function getSearchMood(id)
{
    let search = document.getElementById('search');
    if(id == 'searchTitle'){
        searchMood = 'title';
        search.placeholder = 'Search By Title';
    }
    else{
        searchMood = 'category';
        search.placeholder = 'Search By Category';
    }
search.focus()
search.value = '';
showData();
}

function searchData(value) {
    let table = '';
    if (searchMood == 'title') {
        for (let i = 0; i < dataProduct.length; i++) {
            if (dataProduct[i].title.toLowerCase().includes(value.toLowerCase())) {
                table += getTableRow(dataProduct[i], i);
            }
        }
    } else if (searchMood == 'category') {
        for (let i = 0; i < dataProduct.length; i++) {
            if (dataProduct[i].category.toLowerCase().includes(value.toLowerCase())) {
                table += getTableRow(dataProduct[i], i);
            }
        }
    }

    document.getElementById('tbody').innerHTML = table;
}

function getTableRow(product, index) {
    return `
        <tr>
            <td>${index}</td>
            <td>${product.title}</td>
            <td>${product.price}</td>
            <td>${product.taxes}</td>
            <td>${product.ads}</td>
            <td>${product.discount}</td>
            <td>${product.total}</td>
            <td>${product.category}</td>
            <td><button onclick="updateData(${index})" id="update">Update</button></td>
            <td><button onclick="deleteData(${index})" id="delete">Delete</button></td>
        </tr>`;
}

// clean data
