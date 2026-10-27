
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("featured-products");
  if (!container) return;

  const featured = PRODUCTS.filter(product => product.featured);

  container.innerHTML = featured
    .map(renderProductCard)
    .join("");
});
