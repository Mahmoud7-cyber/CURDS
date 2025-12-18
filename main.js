// ===== Get Elements =====
const title = document.getElementById("title");
const price = document.getElementById("price");
const taxes = document.getElementById("taxes");
const ads = document.getElementById("ads");
const discount = document.getElementById("discount");
const total = document.getElementById("total");
const count = document.getElementById("count");
const category = document.getElementById("category");
const submit = document.getElementById("submit");
const searchInput = document.getElementById("search");

let mood = "create";
let tmp;
let searchMood = "title";

// ===== Get Total =====
function getTotal() {
    if (price.value !== "") {
        const result =
            (+price.value || 0) +
            (+taxes.value || 0) +
            (+ads.value || 0) -
            (+discount.value || 0);

        total.textContent = result;
        total.style.background = "#040";
    } else {
        total.textContent = "";
        total.style.background = "#a00d02";
    }
}

// ===== Local Storage =====
let dataPro = localStorage.product
    ? JSON.parse(localStorage.product)
    : [];

// ===== Create / Update =====
submit.onclick = function () {
    const newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.textContent,
        count: count.value,
        category: category.value.toLowerCase(),
    };

    if (!title.value || !price.value || !category.value || newPro.count > 100) {
        return;
    }

    if (mood === "create") {
        if (+newPro.count > 1) {
            for (let i = 0; i < newPro.count; i++) {
                dataPro.push(newPro);
            }
        } else {
            dataPro.push(newPro);
        }
    } else {
        dataPro[tmp] = newPro;
        mood = "create";
        submit.textContent = "Create";
        count.style.display = "block";
    }

    localStorage.setItem("product", JSON.stringify(dataPro));
    clearData();
    showData();
};

// ===== Clear Inputs =====
function clearData() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.textContent = "";
    count.value = "";
    category.value = "";
}

// ===== Show Data =====
function showData() {
    let table = "";

    dataPro.forEach((pro, i) => {
        table += `
        <tr>
            <td>${i + 1}</td>
            <td>${pro.title}</td>
            <td>${pro.price}</td>
            <td>${pro.taxes}</td>
            <td>${pro.ads}</td>
            <td>${pro.discount}</td>
            <td>${pro.total}</td>
            <td>${pro.category}</td>
            <td><button onclick="updateData(${i})">Update</button></td>
            <td><button onclick="deleteData(${i})">Delete</button></td>
        </tr>`;
    });

    document.getElementById("tableBody").innerHTML = table;

    const deleteAllDiv = document.getElementById("deletall");
    deleteAllDiv.innerHTML =
        dataPro.length > 0
            ? `<button onclick="deleteAll()">Delete All (${dataPro.length})</button>`
            : "";
}
showData();

// ===== Delete =====
function deleteData(i) {
    dataPro.splice(i, 1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}

// ===== Delete All =====
function deleteAll() {
    localStorage.clear();
    dataPro = [];
    showData();
}

// ===== Update =====
function updateData(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    category.value = dataPro[i].category;

    getTotal();
    count.style.display = "none";
    submit.textContent = "Update";
    mood = "update";
    tmp = i;

    scrollTo({ top: 0, behavior: "smooth" });
}

// ===== Search =====
function getseaechmood(id) {
    searchMood = id === "searchtitle" ? "title" : "category";
    searchInput.placeholder =
        searchMood === "title"
            ? "Search By Title"
            : "Search By Category";

    searchInput.value = "";
    searchInput.focus();
    showData();
}

function search(value) {
    value = value.toLowerCase();
    let table = "";

    dataPro.forEach((pro, i) => {
        if (
            (searchMood === "title" && pro.title.includes(value)) ||
            (searchMood === "category" && pro.category.includes(value))
        ) {
            table += `
            <tr>
                <td>${i + 1}</td>
                <td>${pro.title}</td>
                <td>${pro.price}</td>
                <td>${pro.taxes}</td>
                <td>${pro.ads}</td>
                <td>${pro.discount}</td>
                <td>${pro.total}</td>
                <td>${pro.category}</td>
                <td><button onclick="updateData(${i})">Update</button></td>
                <td><button onclick="deleteData(${i})">Delete</button></td>
            </tr>`;
        }
    });

    document.getElementById("tableBody").innerHTML = table;
}

