
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("product-detail");
  const params = new URLSearchParams(location.search);
  const product = getProductById(params.get("id"));

  if (!product) {
    container.innerHTML = "<p>Không tìm thấy sản phẩm.</p>";
    return;
  }

  container.innerHTML = `
    <div class="product-detail-layout">
      <img src="${product.image}"
           alt="${product.name}"
           class="detail-image">

      <div>
        <h1>${product.name}</h1>
        <p>Thương hiệu: ${product.brand}</p>
        <h2 class="product-price">${formatPrice(product.price)}</h2>
        <p>${product.description}</p>

        <button type="button"
                class="add-to-cart"
                data-id="${product.id}">
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  `;

  const image = container.querySelector("img");
  image.addEventListener("error", () => {
    image.src = "images/no-image.png";
  }, { once: true });
});
