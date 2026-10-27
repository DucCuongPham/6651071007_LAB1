
const PRODUCTS = [
  {
    id: 1,
    name: "iPhone 16 128GB",
    category: "phone",
    brand: "Apple",
    price: 19990000,
    oldPrice: 22990000,
    image: "Images/Products/iphone-16.webp",
    featured: true,
    description: "Điện thoại màn hình sắc nét, hiệu năng mạnh mẽ."
  },
  {
    id: 2,
    name: "Samsung Galaxy S25",
    category: "phone",
    brand: "Samsung",
    price: 18990000,
    oldPrice: 20990000,
    image: "Images/Products/samsung-s25.webp",
    featured: true,
    description: "Điện thoại Android cao cấp."
  },
  {
    id: 3,
    name: "MacBook Air M4",
    category: "laptop",
    brand: "Apple",
    price: 25990000,
    oldPrice: 27990000,
    image: "Images/Products/macbook-air.webp",
    featured: true,
    description: "Laptop mỏng nhẹ phục vụ học tập và làm việc."
  },
  {
    id: 4,
    name: "ASUS TUF Gaming",
    category: "laptop",
    brand: "ASUS",
    price: 22990000,
    oldPrice: 24990000,
    image: "Images/Products/asus-tuf.webp",
    featured: true,
    description: "Laptop dành cho học tập và chơi game."
  },
  {
    id: 5,
    name: "iPad Air",
    category: "tablet",
    brand: "Apple",
    price: 14990000,
    oldPrice: 15990000,
    image: "Images/Products/ipad-air.webp",
    featured: false,
    description: "Máy tính bảng phục vụ học tập và giải trí."
  },
  {
    id: 6,
    name: "Tai nghe Bluetooth",
    category: "accessory",
    brand: "Sony",
    price: 1990000,
    oldPrice: 2490000,
    image: "Images/Products/headphones.webp",
    featured: false,
    description: "Tai nghe không dây tiện lợi."
  }
];

function formatPrice(price) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND"
  }).format(price);
}

function getProductById(id) {
  return PRODUCTS.find(product => product.id === Number(id));
}

function renderProductCard(product) {
  return `
    <article class="product-card">
      <a href="shop-details.html?id=${product.id}">
        <img
          src="${product.image}"
          alt="${product.name}"
          loading="lazy"
          onerror="this.onerror=null;this.src='images/no-image.png'"
        >
        <h3>${product.name}</h3>
      </a>

      <p class="product-price">${formatPrice(product.price)}</p>

      <p class="old-price">
        <del>${formatPrice(product.oldPrice)}</del>
      </p>

      <button type="button"
              class="add-to-cart"
              data-id="${product.id}">
        Thêm vào giỏ
      </button>
    </article>
  `;
}
