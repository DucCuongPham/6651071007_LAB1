
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("shop-products");
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const keyword = (params.get("q") || "").toLowerCase();
  const initialCategory = params.get("category");

  document.querySelectorAll('input[name="category"]').forEach(input => {
    input.checked = input.value === initialCategory;
  });

  const priceMatches = (product, range) => {
    if (range === "under10") return product.price < 10000000;
    if (range === "10to20") {
      return product.price >= 10000000 &&
             product.price <= 20000000;
    }
    if (range === "over20") return product.price > 20000000;
    return true;
  };

  function render() {
    const selectedCategories = [
      ...document.querySelectorAll('input[name="category"]:checked')
    ].map(input => input.value);

    const selectedPrice =
      document.querySelector('input[name="price"]:checked')?.value || "";

    const sort = document.getElementById("sort-products").value;

    let result = PRODUCTS.filter(product => {
      const matchesKeyword =
        (product.name + " " + product.brand)
          .toLowerCase()
          .includes(keyword);

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);

      return matchesKeyword &&
             matchesCategory &&
             priceMatches(product, selectedPrice);
    });

    if (sort === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name, "vi"));
    }

    document.getElementById("result-count").textContent =
      `${result.length} sản phẩm`;

    container.innerHTML = result.length
      ? result.map(renderProductCard).join("")
      : "<p>Không tìm thấy sản phẩm phù hợp.</p>";
  }

  document.querySelectorAll(
    'input[name="category"], input[name="price"]'
  ).forEach(input => input.addEventListener("change", render));

  document.getElementById("sort-products")
    .addEventListener("change", render);

  document.getElementById("clear-filters")
    .addEventListener("click", () => {
      document.querySelectorAll(
        'input[name="category"], input[name="price"]'
      ).forEach(input => input.checked = false);

      render();
    });

  render();
});
