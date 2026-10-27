
document.addEventListener("DOMContentLoaded", renderCart);

function renderCart() {
  const container = document.getElementById("cart-items");
  const cart = getCart();

  if (cart.length === 0) {
    container.innerHTML = "<p>Giỏ hàng đang trống.</p>";
    updateTotals(0);
    return;
  }

  container.innerHTML = cart.map(item => {
    const product = getProductById(item.id);
    if (!product) return "";

    return `
      <div class="cart-row">
        <img src="${product.image}" alt="${product.name}"
             width="80" onerror="this.style.display='none'">

        <div>
          <h3>${product.name}</h3>
          <p>${formatPrice(product.price)}</p>
        </div>

        <input type="number" min="1" max="99"
               value="${item.quantity}"
               data-quantity="${product.id}"
               aria-label="Số lượng ${product.name}">

        <strong>${formatPrice(product.price * item.quantity)}</strong>

        <button type="button" data-remove="${product.id}">
          Xóa
        </button>
      </div>
    `;
  }).join("");

  const subtotal = cart.reduce((total, item) => {
    const product = getProductById(item.id);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);

  updateTotals(subtotal);
}

function updateTotals(subtotal) {
  const shipping = subtotal === 0 || subtotal >= 5000000
    ? 0 : 30000;

  document.getElementById("cart-subtotal").textContent =
    formatPrice(subtotal);

  document.getElementById("shipping-fee").textContent =
    formatPrice(shipping);

  document.getElementById("cart-total").textContent =
    formatPrice(subtotal + shipping);
}

document.addEventListener("change", event => {
  const input = event.target.closest("[data-quantity]");
  if (!input) return;

  const id = Number(input.dataset.quantity);
  const quantity = Math.max(
    1, Math.min(99, Number(input.value) || 1)
  );

  const cart = getCart();
  const item = cart.find(item => item.id === id);

  if (item) {
    item.quantity = quantity;
    saveCart(cart);
    renderCart();
  }
});

document.addEventListener("click", event => {
  const button = event.target.closest("[data-remove]");
  if (!button) return;

  const id = Number(button.dataset.remove);
  const cart = getCart().filter(item => item.id !== id);

  saveCart(cart);
  renderCart();
});
