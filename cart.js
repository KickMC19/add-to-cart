let cartContainer = document.querySelector('.cart-items')
let totalDisplay = document.querySelector('.cart-total-price')
let checkoutBtn = document.querySelector('.btn-purchase')
let addButtons = document.querySelectorAll('.shop-item-button')

addButtons.forEach(btn => btn.addEventListener('click', handleAddToCart))
checkoutBtn.addEventListener('click', handleCheckout)

function handleAddToCart(e) {
    let product = e.currentTarget.closest('.shop-item')
    let name = product.querySelector('.shop-item-title').textContent
    let cost = product.querySelector('.shop-item-price').textContent
    let img = product.querySelector('.shop-item-image').src
    insertCartItem(name, cost, img)
    refreshCartTotals()
}

function insertCartItem(name, cost, img) {
    let existingTitles = [...cartContainer.querySelectorAll('.cart-item-title')]
    if (existingTitles.some(el => el.textContent === name)) {
        alert('This product is already in your cart!')
        return
    }
    let row = document.createElement('div')
    row.className = 'cart-row'
    row.innerHTML = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${img}" width="100" height="100">
            <span class="cart-item-title">${name}</span>
        </div>
        <span class="cart-price cart-column">${cost}</span>
        <div class="cart-quantity cart-column">
            <input type="number" class="cart-quantity-input" value="1" min="1">
            <button class="btn btn-remove" type="button">Remove</button>
        </div>
    `
    cartContainer.appendChild(row)
    row.querySelector('.btn-remove').addEventListener('click', removeItem)
    row.querySelector('.cart-quantity-input').addEventListener('input', updateQuantity)
}

function removeItem(e) {
    let row = e.currentTarget.closest('.cart-row')
    row.classList.add('fade-out')
    setTimeout(() => {
        row.remove()
        refreshCartTotals()
    }, 250)
}

function updateQuantity(e) {
    let input = e.currentTarget
    if (input.value <= 0 || isNaN(input.value)) input.value = 1
    refreshCartTotals()
}

function refreshCartTotals() {
    let rows = cartContainer.querySelectorAll('.cart-row')
    let total = 0
    let totalItems = 0
    rows.forEach(r => {
        let price = parseFloat(r.querySelector('.cart-price').textContent.replace('$', '')) || 0
        let qty = parseInt(r.querySelector('.cart-quantity-input').value) || 1
        total += price * qty
        totalItems += qty
    })
    totalDisplay.textContent = `$${total.toFixed(2)}`
    let quantityDisplay = document.querySelector('.cart-total-quantity')
    if (quantityDisplay)
        quantityDisplay.textContent = `${totalItems} item${totalItems !== 1 ? 's' : ''}`
}

function handleCheckout() {
    if (!cartContainer.children.length) {
        alert('Your cart is empty!')
        return
    }
    alert('Purchase complete! Thanks for shopping 🎉')
    cartContainer.innerHTML = ''
    refreshCartTotals()
}