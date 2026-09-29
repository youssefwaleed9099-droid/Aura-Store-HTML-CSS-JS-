// Constants
const CART_KEY = "aura-cart";

const FREE_SHIPPING_THRESHOLD = 150;

const TOAST_DURATION = 4000;

// Utility functions
function formatPrice(amount) {
  return "$" + amount.toFixed(2);
}

function findProduct(id) {
  return products.find((product) => product.id === id);
}

function getCart() {
  let cartItem = localStorage.getItem(CART_KEY);

  if (cartItem !== null) {
    return JSON.parse(cartItem);
  } else {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// Cart functions
function addToCart(productId, quantity = 1) {
  const cart = getCart();

  const inCart = cart.find((product) => product.id === productId);
  if (inCart) {
    inCart.quantity += quantity;
  } else {
    cart.push({
      id: productId,
      quantity: quantity,
    });
  }

  saveCart(cart);
  updateCartCounter();
  showToast(productId, "add");
}

function removeFromCart(productId) {
  const cart = getCart();
  const newCart = cart.filter((item) => item.id !== productId);
  saveCart(newCart);
  updateCartCounter();
  showToast(productId, "remove");
}

function updateQuantity(productId, newQuantity) {
  const cart = getCart();
  const product = cart.find((item) => item.id === productId);

  if (newQuantity <= 0) {
    const newCart = cart.filter((item) => item.id !== productId);

    saveCart(newCart);
  } else {
    product.quantity = newQuantity;

    saveCart(cart);
  }

  updateCartCounter();
}

function getCartCount() {
  const cart = getCart();
  const quantitySum = cart.reduce(
    (totalQuantity, quantityItem) => totalQuantity + quantityItem.quantity,
    0,
  );
  return quantitySum;
}

function getCartTotal() {
  const cart = getCart();

  let total = 0;

  for (let i = 0; i <= cart.length; i++) {
    const item = cart[i];

    const product = findProduct(item.productId);

    if (product) {
      total += product.currentPrice * quantity;
    }
  }

  const uiTotal = document.querySelector("[data-cart-total]");

  if (!uiTotal) return;
  uiTotal.textContent = total;
}

// UI functions
function updateCartCounter() {
  const counter = document.querySelector("[data-cart-count]");

  if (!counter) return;

  const cart = getCart();

  const totalItems = cart.reduce((total, item) => total + item.quantity);

  counter.textContent = totalItems;
}

function showToast({
  message,
  label = "",
  icon = "✓",
  actionText,
  onAction,
  duration = TOAST_DURATION,
} = {}) {
  if (!message) {
    console.warn("[showToast] message is required");
    return () => {};
  }

  const container = document.querySelector("[data-toast-container]");
  if (!container) {
    console.warn("[showToast] toast container not found");
    return () => {};
  }

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.setAttribute("role", "status");
  toast.setAttribute("aria-live", "polite");

  const iconEl = document.createElement("span");
  iconEl.className = "toast-icon";
  iconEl.textContent = icon;

  const contentEl = document.createElement("div");
  contentEl.className = "toast-content";

  if (label) {
    const labelEl = document.createElement("span");
    labelEl.className = "toast-label";
    labelEl.textContent = label;
    contentEl.appendChild(labelEl);
  }

  const messageEl = document.createElement("span");
  messageEl.className = "toast-message";
  messageEl.textContent = message;
  contentEl.appendChild(messageEl);

  toast.append(iconEl, contentEl);

  let actionButton = null;
  if (actionText && typeof onAction === "function") {
    actionButton = document.createElement("button");
    actionButton.type = "button";
    actionButton.className = "toast-action";
    actionButton.textContent = actionText;
    toast.appendChild(actionButton);
  }

  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.className = "toast-close";
  closeButton.setAttribute("aria-label", "Close");
  closeButton.textContent = "×";
  toast.appendChild(closeButton);

  let isRemoved = false;
  let timeoutId = null;

  const removeToast = () => {
    if (isRemoved) return;
    isRemoved = true;

    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = null;

    actionButton?.removeEventListener("click", handleAction);
    closeButton.removeEventListener("click", removeToast);

    toast.classList.add("is-leaving");

    const fallback = setTimeout(() => toast.remove(), 400);

    toast.addEventListener(
      "transitionend",
      () => {
        clearTimeout(fallback);
        toast.remove();
      },
      { once: true },
    );
  };

  const handleAction = () => {
    try {
      onAction();
    } catch (err) {
      console.error("[showToast] onAction threw:", err);
    } finally {
      removeToast();
    }
  };

  if (actionButton) actionButton.addEventListener("click", handleAction);
  closeButton.addEventListener("click", removeToast);

  container.appendChild(toast);

  if (duration > 0) {
    timeoutId = setTimeout(removeToast, duration);
  }

  return removeToast;
}

function openSearchModal() {
  const modal = document.querySelector("[data-search-modal]");
  modal.classList.add("is-open");

  document.body.style.overflow = "hidden";
}

function closeSearchModal() {
  const modal = document.querySelector("[data-search-modal]");
  modal.classList.remove("is-open");

  document.body.style.overflow = "";
}

function openFilmModal() {
  const modal = document.querySelector("[data-film-modal]");
  modal.classList.add("is-open");

  const searchInput = document.querySelector("[data-search-input]");

  searchInput.value = "";
  searchInput.focus();

  document.body.style.overflow = "hidden";
}

function closeFilmModal() {
  const modal = document.querySelector("[data-film-modal]");
  modal.classList.remove("is-open");

  document.body.style.overflow = "";
}

function handleSearch(query) {
  const cleanQuery = query.trim().toLowerCase();

  if (cleanQuery.length <= 2) {
    const resultsContainer = document.querySelector("[data-search-results]");
    if (resultsContainer) {
      resultsContainer.textContent = "Enter a valid value";
    }
    return;
  }

  const matchProducts = products.filter((product) => {
    return (
      product.name.toLowerCase().includes(cleanQuery) ||
      product.subcategory.toLowerCase().includes(cleanQuery)
    );
  });

  const resultsContainer = document.querySelector("[data-search-results]");
  if (!resultsContainer) return;

  resultsContainer.innerHTML = "";

  if (matchProducts.length === 0) {
    resultsContainer.textContent = "product not found";
    return;
  }

  matchProducts.forEach((product) => {
    const item = document.createElement("div");
    item.className = "filter-results";
    item.textContent = product.name;
    resultsContainer.appendChild(item);
  });
}

// Init functions
function initCartCounter() {
  const pageLoading = document.addEventListener(
    "DOMContentLoaded",
    updateCartCounter,
  );
  return pageLoading;
}

function initSearchModal() {
  const searchOpen = document.querySelectorAll("[data-search-open]");

  searchOpen.forEach((item) => {
    item.addEventListener("click", openSearchModal);
  });

  const searchClose = document.querySelectorAll("[data-search-close]");

  searchClose.forEach((item) => {
    item.addEventListener("click", closeSearchModal);
  });

  document.addEventListener("keydown", initGlobalKeyboard);
}

function initFilmModal() {
  const filmOpen = document.querySelectorAll("[data-open-film]");
  filmOpen.forEach((film) => film.addEventListener("click", openFilmModal));

  const closeFilm = document.querySelectorAll("[data-film-close]");
  closeFilm.forEach((film) => film.addEventListener("click", closeFilmModal));

  document.addEventListener("keydown", initGlobalKeyboard);
}

function initAddToCartButtons() {
  const cartButtons = document.querySelectorAll("[data-add-to-cart]");
  cartButtons.forEach((btn) =>
    btn.addEventListener("click", () => {
      const productCard = btn.closest("[data-product-id]");
      const productId = Number(productCard.getAttribute("data-product-id"));
      addToCart(productId);
      btn.textContent = '✔ Added'
    }),
  );
}

function initGlobalKeyboard() {
  document.addEventListener("keydown", (e) => {
    closeFilmModal();
    closeSearchModal;

    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      openFilmModal();
      openSearchModal();
    }
  });
}

// Event Listener
function init() {
  initCartCounter();
  initSearchModal();
  initFilmModal();
  initAddToCartButtons();
  initGlobalKeyboard();
}
