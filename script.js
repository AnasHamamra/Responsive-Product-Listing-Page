const products = [
  {
    id: 1,
    title: "Smartphone",
    price: "$299",
    category: "Electronics",
    image: "./assets/imgs/images.jpeg",
    description: "A powerful smartphone with long battery life.",
    discount: "20%",
  },
  {
    id: 2,
    title: "T-Shirt",
    price: "$19",
    category: "Clothing",
    image: "./assets/imgs/download.jpeg",
    description: "Comfortable cotton T-shirt available in all sizes.",
  },
  {
    id: 3,
    title: "Laptop",
    price: "$899",
    category: "Electronics",
    image: "./assets/imgs/download (1).jpeg",
    description: "Lightweight laptop for work and play.",
  },
  {
    id: 4,
    title: "Running Shoes",
    price: "$59",
    category: "Clothing",
    image: "./assets/imgs/images (1).jpeg",
    description: "High performance running shoes.",
  },
  {
    id: 5,
    title: "Headphones",
    price: "$79",
    category: "Electronics",
    image: "./assets/imgs/headphones.jpeg",
    description: "Noise-cancelling wireless headphones with deep bass.",
  },
  {
    id: 6,
    title: "Backpack",
    price: "$45",
    category: "Accessories",
    image: "./assets/imgs/backpack.jpeg",
    description: "Durable and lightweight backpack with multiple compartments.",
  },
  {
    id: 7,
    title: "Smartwatch",
    price: "$199",
    category: "Electronics",
    image: "./assets/imgs/smartwatch.jpeg",
    description:
      "Track your fitness and notifications with this stylish smartwatch.",
    discount: "15%",
  },
  {
    id: 8,
    title: "Sunglasses",
    price: "$25",
    category: "Accessories",
    image: "./assets/imgs/sunglasses.jpeg",
    description: "UV-protected sunglasses with modern design.",
  },
  {
    id: 9,
    title: "Gaming Mouse",
    price: "$49",
    category: "Electronics",
    image: "./assets/imgs/mouse.jpeg",
    description: "High-precision gaming mouse with customizable DPI settings.",
  },
  {
    id: 10,
    title: "Jacket",
    price: "$89",
    category: "Clothing",
    image: "./assets/imgs/jacket.jpeg",
    description: "Warm and stylish winter jacket made of waterproof material.",
  },
];

let isListView = false;
let showFavoritesOnly = false;
let selectedCategory = null;

function getFavorites() {
  return JSON.parse(localStorage.getItem("favorites")) || [];
}

function toggleFavorite(id) {
  let favorites = getFavorites();
  if (favorites.includes(id)) {
    favorites = favorites.filter((favId) => favId != id);
  } else {
    favorites.push(id);
  }
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

function renderProducts() {
  document.querySelector("#toggleView i").className = isListView
    ? "fa-solid fa-grip"
    : "fa-solid fa-list";
  document.querySelector("#viewFavorites i").className = showFavoritesOnly
    ? "fa-solid fa-reply-all"
    : "fa-duotone fa-solid fa-heart";
  const container = $("#productContainer");
  container.empty();

  let favorites = getFavorites();
  const viewFav = document.getElementById("viewFavorites");
  if (favorites.length === 0) {
    viewFav.hidden = true;
  } else {
    viewFav.hidden = false;
  }

  const viewFav1 = document.getElementById("viewFavorites1");
  if (favorites.length === 0) {
    viewFav1.hidden = true;
  } else {
    viewFav1.hidden = false;
  }
  let filtered = showFavoritesOnly
    ? products.filter((p) => favorites.includes(p.id))
    : products;

  if (selectedCategory && selectedCategory !== "Discounts") {
    filtered = filtered.filter((p) => p.category === selectedCategory);
  }

  if (selectedCategory === "Discounts") {
    filtered = filtered.filter((p) => p.discount);
  }

  filtered.forEach((product) => {
    const isFavorited = favorites.includes(product.id);
    const cardCols = isListView
      ? "col-12"
      : "col-xxl-3 col-lg-4 col-md-6 col-sm-6";
    let priceValue = parseFloat(product.price.replace("$", ""));
    let discountValue = product.discount
      ? parseFloat(product.discount.replace("%", ""))
      : 0;
    let finalPrice = discountValue
      ? (priceValue - (priceValue * discountValue) / 100).toFixed(2)
      : priceValue;
    let priceHTML = discountValue
      ? `<p class="card-text">
       <span class="text-muted text-decoration-line-through me-2">${product.price}</span>
       <span class="text-danger fw-bold">$${finalPrice}</span>
     </p>`
      : `<p class="card-text text-muted">${product.price}</p>`;

    const productImage = `
    <div class="image-wrapper">
        <div class="position-relative">
          <img src="${product.image}" class="card-img-top img-fluid" alt="${
      product.title
    }">
          ${
            product.discount
              ? `<span class="badge bg-danger position-absolute top-0 start-0 m-2">${product.discount} OFF</span>`
              : ""
          }
        </div>
        </div>
      `;

    let cardContent;
    if (isListView) {
      cardContent = `
          <div class="${cardCols}">
            <div class="card p-2">
              <div class="row g-0 align-items-center">
                <div class="col-sm-12 col-md-4">
                  ${productImage}
                </div>
                <div class="col-12 col-md-8">
                  <div class="card-body">
                    <h5 class="card-title d-flex justify-content-between align-items-center">
                      ${product.title}
                      <span class="favorite-icon ${
                        isFavorited ? "favorited" : "notFavorited"
                      }" data-id="${product.id}">
                        <i class="fa-solid fa-heart"></i>
                      </span>
                    </h5>
                    ${priceHTML}
                    <span class="badge bg-primary category-badge">${
                      product.category
                    }</span>
                    <p class="mt-2">${product.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
    } else {
      cardContent = `
          <div class="${cardCols}">
            <div class="card">
              ${productImage}
              <div class="card-body">
                <h5 class="card-title d-flex justify-content-between align-items-center">
                  ${product.title}
                  <span class="favorite-icon ${
                    isFavorited ? "favorited" : "notFavorited"
                  }" data-id="${product.id}">
                    <i class="fa-solid fa-heart"></i>
                  </span>
                </h5>
                ${priceHTML}
                <span class="badge bg-primary category-badge">${
                  product.category
                }</span>
              </div>
            </div>
          </div>
        `;
    }
    container.append(cardContent);
  });
}

$(document).ready(function () {
  $(".category-link").on("click", function (e) {
    e.preventDefault();
    const category = $(this).data("category");
    $(".category-link").removeClass("active");
    $(this).addClass("active");
    showFavoritesOnly = false;
    if (category === "All") {
      selectedCategory = null;
    } else {
      selectedCategory = category;
    }

    renderProducts();
  });
  $(window).on('load resize', function () {
    const offcanvasElement = document.getElementById('mainNavbar');
    const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasElement);
  
    if (window.innerWidth >= 990 && offcanvasElement.classList.contains('show')) {
      if (offcanvasInstance) {
        offcanvasInstance.hide();
      } else {
        const newInstance = new bootstrap.Offcanvas(offcanvasElement);
        newInstance.hide();
      }
    }
  });
  
  
  renderProducts();

  $(document).on("click", ".favorite-icon", function () {
    const id = parseInt($(this).data("id"));
    toggleFavorite(id);
    let favorites = getFavorites();
    if (showFavoritesOnly === true && favorites.length === 0) {
      showFavoritesOnly = false;
    }
    renderProducts();
  });

  $("#toggleView").on("click", function () {
    isListView = !isListView;
    renderProducts();
  });

  $("#viewFavorites").on("click", function () {
    showFavoritesOnly = !showFavoritesOnly;
    renderProducts();
  });
  $("#viewFavorites1").on("click", function () {
    showFavoritesOnly = !showFavoritesOnly;
    renderProducts();
  });
});
