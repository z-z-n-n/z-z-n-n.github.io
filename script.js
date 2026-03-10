const prodCont = document.getElementById("products");

function updateCartCount() {
    const badge = document.getElementById("cart-count");
    if (!badge) return;
    var currentBasket = localStorage.getItem("purcasheBasket");
    var basketArray = currentBasket ? JSON.parse(currentBasket) : [];
    badge.textContent = basketArray.length;
}

document.addEventListener('DOMContentLoaded', () => {
    for (let i = 0; i < termekek.length; i++) {
        var currentProduct = termekek[i];
        var card = Product(currentProduct.id, currentProduct.nev, currentProduct.img, currentProduct.ar);
        card.classList.add('fade-in-card');
        card.classList.add('delay-' + ((i % 4) + 1));
        prodCont.appendChild(card);
    }
    updateCartCount();
});

function Product(id, name, img, price) {
    var prodDiv = document.createElement("div");
    prodDiv.dataset.id = id;
    prodDiv.classList.add("col-12", "col-sm-6", "col-lg-4");
    prodDiv.classList.add("d-flex", "align-items-stretch", "justify-content-center");
    prodDiv.classList.add("customCard");

    var innerDiv = document.createElement("div");
    innerDiv.classList.add("card", "h-100", "w-100");

    var imgWrapper = document.createElement("div");
    imgWrapper.classList.add("img-wrapper");

    var prodImg = document.createElement("img");
    prodImg.classList.add("card-img-top");
    prodImg.src = img;
    prodImg.alt = name;
    prodImg.loading = "lazy";

    imgWrapper.appendChild(prodImg);

    var cardBody = document.createElement("div");
    cardBody.classList.add("card-body", "d-flex", "flex-column");

    var prodTitle = document.createElement("h5");
    prodTitle.textContent = name;
    prodTitle.classList.add("card-title");

    var prodPrice = document.createElement("div");
    prodPrice.classList.add("card-price");
    prodPrice.textContent = price ? price.toLocaleString('hu-HU') + " Ft" : "";

    var addBtn = document.createElement("button");
    addBtn.className = "btn btn-primary mt-auto";
    addBtn.innerHTML = '<i class="fa-solid fa-cart-plus"></i> Kosárba';
    addBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        handleProductClick(id);
        addBtn.innerHTML = '<i class="fa-solid fa-check"></i> Hozzáadva!';
        addBtn.style.pointerEvents = 'none';
        setTimeout(() => {
            addBtn.innerHTML = '<i class="fa-solid fa-cart-plus"></i> Kosárba';
            addBtn.style.pointerEvents = '';
        }, 800);
    });

    prodDiv.appendChild(innerDiv);
    innerDiv.appendChild(imgWrapper);
    innerDiv.appendChild(cardBody);
    cardBody.appendChild(prodTitle);
    cardBody.appendChild(prodPrice);
    cardBody.appendChild(addBtn);

    return prodDiv;
}

function handleProductClick(productId) {
    var currentBasket = localStorage.getItem("purcasheBasket");
    var basketArray = currentBasket ? JSON.parse(currentBasket) : [];

    basketArray.push(productId);
    localStorage.setItem("purcasheBasket", JSON.stringify(basketArray));
    updateCartCount();
}