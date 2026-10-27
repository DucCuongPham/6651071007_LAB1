
function getCart() {
  try {
    return JSON.parse(localStorage.getItem("techzone-cart")) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem("techzone-cart", JSON.stringify(cart));
  updateCartCount();
}

function addToCart(productId) {
  const product = getProductById(productId);
  if (!product) return;

  const cart = getCart();
  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      quantity: 1
    });
  }

  saveCart(cart);
  alert("Đã thêm sản phẩm vào giỏ hàng!");
}

function updateCartCount() {
  const count = getCart().reduce(
    (total, item) => total + item.quantity,
    0
  );

  document.querySelectorAll(".cart-count").forEach(element => {
    element.textContent = count;
  });
}

document.addEventListener("click", event => {
  const button = event.target.closest(".add-to-cart");
  if (!button) return;

  addToCart(button.dataset.id);
});

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();

  const footer = document.getElementById("site-footer");

  if (footer) {
    footer.innerHTML = `
      <div class="container">
        <h2>Kyan Tech Shop</h2>
        <p>Điện thoại, laptop và phụ kiện công nghệ.</p>
        <p>Email: kyantechshop@gmail.com</p>
        <p>© 2026 Kyan Tech Shop - Điện thoại và máy tính.</p>
      </div>
    `;
  }

  const searchForm = document.getElementById("search-form");

  if (searchForm) {
    searchForm.addEventListener("submit", event => {
      event.preventDefault();

      const input = document.getElementById("search-input");
      const keyword = input.value.trim();

      window.location.href =
        "shop.html?q=" + encodeURIComponent(keyword);
    });
  }
});
