function getBasket() {
    var currentBasket = localStorage.getItem("purcasheBasket");
    return currentBasket ? JSON.parse(currentBasket) : [];
}

function saveBasket(arr) {
    localStorage.setItem("purcasheBasket", JSON.stringify(arr));
}

function updateCartCount() {
    const badge = document.getElementById("cart-count");
    if (!badge) return;
    var basketArray = getBasket();
    badge.textContent = basketArray.length;
}

function computeTotals(basket) {
    var counts = {};
    basket.forEach(id => {
        counts[id] = (counts[id] || 0) + 1;
    });
    return counts;
}

function renderCart() {
    const container = document.getElementById("cart-items");
    container.innerHTML = "";
    var basket = getBasket();

    if (basket.length === 0) {
        container.innerHTML = '<div class="col-12"><p class="cart-empty-msg">A kosár üres.</p></div>';
        document.getElementById("cart-total").textContent = "Összesen: 0 Ft";
        return;
    }

    var counts = computeTotals(basket);
    var totalPrice = 0;

    Object.keys(counts).forEach((id) => {
        var qty = counts[id];
        var prod = termekek.find(p => p.id == id);
        if (!prod) return;

        var linePrice = (prod.ar || 0) * qty;
        totalPrice += linePrice;

        var col = document.createElement("div");
        col.className = "col-12 mb-3";

        var card = document.createElement("div");
        card.className = "card p-3 d-flex flex-row align-items-center";

        var img = document.createElement("img");
        img.src = prod.img;
        img.alt = prod.nev;
        img.className = "img-thumbnail";
        img.style.width = "80px";
        img.style.height = "80px";
        img.style.objectFit = "cover";

        var info = document.createElement("div");
        info.className = "ms-3 flex-grow-1";

        var nameEl = document.createElement("h5");
        nameEl.className = "cart-item-name";
        nameEl.textContent = prod.nev;

        var priceEl = document.createElement("div");
        priceEl.className = "cart-item-price";
        priceEl.textContent = (prod.ar || 0).toLocaleString('hu-HU') + " Ft / db";

        var group = document.createElement("div");
        group.className = "input-group input-group-sm w-auto mt-2";
        group.style.display = "flex";
        group.style.alignItems = "center";

        var btnDec = document.createElement("button");
        btnDec.className = "btn btn-outline-secondary btn-decrease";
        btnDec.textContent = "-";

        var inputQty = document.createElement("input");
        inputQty.className = "form-control text-center qty";
        inputQty.value = qty;
        inputQty.readOnly = true;
        inputQty.style.maxWidth = "50px";

        var btnInc = document.createElement("button");
        btnInc.className = "btn btn-outline-secondary btn-increase";
        btnInc.textContent = "+";

        group.append(btnDec, inputQty, btnInc);

        var lineTotalEl = document.createElement("div");
        lineTotalEl.className = "cart-item-total";
        lineTotalEl.textContent = linePrice.toLocaleString('hu-HU') + " Ft";

        info.append(nameEl, priceEl, group);

        card.append(img, info, lineTotalEl);
        col.appendChild(card);
        container.appendChild(col);

        btnInc.addEventListener('click', () => {
            basket.push(parseInt(id));
            saveBasket(basket);
            qty++;
            inputQty.value = qty;
            linePrice = (prod.ar || 0) * qty;
            lineTotalEl.textContent = linePrice.toLocaleString('hu-HU') + " Ft";
            totalPrice = recalcTotal();
            document.getElementById("cart-total").textContent = "Összesen: " + totalPrice.toLocaleString('hu-HU') + " Ft";
            updateCartCount();
        });
        btnDec.addEventListener('click', () => {
            var idx = basket.indexOf(parseInt(id));
            if (idx !== -1) {
                basket.splice(idx, 1);
                saveBasket(basket);
                qty--;
                if (qty <= 0) {
                    col.remove();
                    basket = getBasket();
                    if (basket.length === 0) {
                        container.innerHTML = '<div class="col-12"><p class="cart-empty-msg">A kosár üres.</p></div>';
                        document.getElementById("cart-total").textContent = "Összesen: 0 Ft";
                    } else {
                        totalPrice = recalcTotal();
                        document.getElementById("cart-total").textContent = "Összesen: " + totalPrice.toLocaleString('hu-HU') + " Ft";
                    }
                } else {
                    inputQty.value = qty;
                    linePrice = (prod.ar || 0) * qty;
                    lineTotalEl.textContent = linePrice.toLocaleString('hu-HU') + " Ft";
                    totalPrice = recalcTotal();
                    document.getElementById("cart-total").textContent = "Összesen: " + totalPrice.toLocaleString('hu-HU') + " Ft";
                }
                updateCartCount();
            }
        });

    });

    document.getElementById("cart-total").textContent = "Összesen: " + totalPrice.toLocaleString('hu-HU') + " Ft";
}

function recalcTotal() {
    var basket = getBasket();
    var counts = computeTotals(basket);
    var total = 0;
    Object.keys(counts).forEach(id => {
        var prod = termekek.find(p => p.id == id);
        if (prod) total += (prod.ar || 0) * counts[id];
    });
    return total;
}

var clearBtn;
document.addEventListener('DOMContentLoaded', () => {
    clearBtn = document.getElementById("clear-cart");
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            localStorage.removeItem("purcasheBasket");
            renderCart();
            updateCartCount();
        });
    }
    renderCart();
    updateCartCount();
});
