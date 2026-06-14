// ================= EXPERT MACHINE SAMPLE INVENTORY (50 COMPLETE ENTRIES) =================
const sampleProducts = [
    { id: 1, name: "Minimalist Structural Blazer", category: "Men", tags: ["trending", "new"], price: 12500, origPrice: 18000, rating: 5, reviews: 48, stock: "In Stock", img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80", desc: "Structured sharp shoulders crafting a pristine monochrome profile architecture." },
    { id: 2, name: "Avant-Garde Drape Dress", category: "Women", tags: ["trending", "best"], price: 14990, origPrice: 22000, rating: 5, reviews: 64, stock: "In Stock", img: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=80", desc: "Flowing visual weight metrics featuring lightweight luxury premium custom threading." },
    { id: 3, name: "Monolithic Leather Combat Boots", category: "Shoes", tags: ["trending", "flash"], price: 18500, origPrice: 25000, rating: 4, reviews: 39, stock: "In Stock", img: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=600&q=80", desc: "Thick density geometric platform base providing immense industrial durability factors." },
    { id: 4, name: "Architectural Trapeze Handbag", category: "Bags", tags: ["best", "deals"], price: 9990, origPrice: 15000, rating: 5, reviews: 112, stock: "In Stock", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80", desc: "Rigid form factor execution creating an instantly recognizable elite appearance asset." },
    { id: 5, name: "Stealth Titanium Chronograph", category: "Watches", tags: ["new", "deals"], price: 28000, origPrice: 35000, rating: 5, reviews: 18, stock: "In Stock", img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80", desc: "Matte complete black finish paired carefully with reliable quartz precision standard modules." },
    { id: 6, name: "Asymmetric Knit Wrap Vest", category: "Women", tags: ["new", "flash"], price: 5990, origPrice: 8500, rating: 4, reviews: 29, stock: "In Stock", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80", desc: "Layering component engineered with high airflow premium organic raw wool filaments." },
    { id: 7, name: "Tailored Linear Pleat Trousers", category: "Men", tags: ["best"], price: 7990, origPrice: 11000, rating: 4, reviews: 53, stock: "In Stock", img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80", desc: "Perfect vertical alignment creasing provides elongated spatial profile height parameters." },
    { id: 8, name: "Geometric Wide Acetate Eyewear", category: "Accessories", tags: ["trending"], price: 4500, origPrice: 6500, rating: 5, reviews: 87, stock: "In Stock", img: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=600&q=80", desc: "UV400 fortified block lenses ensconced within thick profile hand polished dark frames." },
    { id: 9, name: "Sculpted Matte Clay Face Complex", category: "Beauty", tags: ["new"], price: 3500, origPrice: 4990, rating: 4, reviews: 22, stock: "In Stock", img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80", desc: "Deep pore mineral configuration filtering impurities with luxury geometric skin balance." },
    { id: 10, name: "Aerodynamic Compression Parka", category: "Sportswear", tags: ["trending", "deals"], price: 11990, origPrice: 16500, rating: 5, reviews: 41, stock: "In Stock", img: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80", desc: "Weatherproof membrane deployment preventing external thermal drop anomalies." },
    // Generating remaining sequence of sample inventory to guarantee 50 fully structured items...
];

// Dynamically auto-generate products up to 50 items to ensure deep catalogs
const categoriesPool = ["Men", "Women", "Shoes", "Bags", "Accessories", "Watches", "Beauty", "Sportswear"];
const tagsPool = [["trending"], ["new"], ["best"], ["flash"], ["deals"], ["trending", "new"], ["best", "deals"]];
const imagePool = [
    "https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1509319117193-57bab727e09d?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80"
];

for (let i = 11; i <= 52; i++) {
    let cat = categoriesPool[i % categoriesPool.length];
    let priceBase = 1990 + ((i * 470) % 22000);
    sampleProducts.push({
        id: i,
        name: `Elite ${cat} Fragment Variant ${i}`,
        category: cat,
        tags: tagsPool[i % tagsPool.length],
        price: priceBase,
        origPrice: Math.floor(priceBase * 1.4),
        rating: 3 + (i % 3),
        reviews: 10 + (i * 3) % 250,
        stock: "In Stock",
        img: imagePool[i % imagePool.length],
        desc: `Premium structured generation architecture option ${i} offering exquisite monochrome profile presence.`
    });
}

// ================= GLOBAL STATE INFRASTRUCTURE ================= */
let cart = [];
let wishlist = [];
let activeCategoryFilter = "all";
let maxPriceFilter = 30000;
let ratingFilter = 0;
let currentShowcaseTab = "trending";
let currentSlideIndex = 0;
let activeProductDetailsId = null;

// ================= CORE APPARATUS INITIALIZATION ================= */
document.addEventListener("DOMContentLoaded", () => {
    // Hide Core System Loader
    setTimeout(() => {
        document.getElementById("loader").classList.add("hidden");
    }, 600);

    // Bind Header Event listeners
    setupHeaderInteractions();
    
    // Core Component Data Engines Populate
    renderHomeProductShowcase();
    renderShopCatalog();
    initHeroSlider();
    updateGlobalBadges();
});

// ================= NAVDRAWER MOBILE ACTIONS ================= */
function setupHeaderInteractions() {
    const menuToggle = document.getElementById("menuToggle");
    const closeMenu = document.getElementById("closeMenu");
    const navMenu = document.getElementById("navMenu");

    menuToggle.addEventListener("click", () => navMenu.classList.add("open"));
    closeMenu.addEventListener("click", () => navMenu.classList.remove("open"));
    
    // Close mobile nav drawer when links click
    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", () => navMenu.classList.remove("open"));
    });
}

// ================= CORE VIEW DEPLOYMENT METRICS (ROUTING) ================= */
function switchView(viewTargetId) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Toggle Section visibility active states
    document.querySelectorAll(".view-section").forEach(sec => {
        sec.classList.remove("active");
    });
    
    const targetElement = document.getElementById(`view-${viewTargetId}`);
    if (targetElement) {
        targetElement.classList.add("active");
    }

    // Toggle Header Link highlighting status
    document.querySelectorAll(".nav-link").forEach(link => {
        link.classList.remove("active");
    });

    // Handle view specific sub-load procedures
    if (viewTargetId === 'cart') {
        renderCartLayout();
    } else if (viewTargetId === 'wishlist') {
        renderWishlistLayout();
    } else if (viewTargetId === 'checkout') {
        renderCheckoutSummary();
    }
}

// ================= HERO AUTO SLIDING BANNER CAROUSEL ================= */
function initHeroSlider() {
    setInterval(() => {
        currentSlideIndex = (currentSlideIndex + 1) % 3;
        updateSliderUI();
    }, 6000);
}
function setSlide(index) {
    currentSlideIndex = index;
    updateSliderUI();
}
function updateSliderUI() {
    const slider = document.getElementById("heroSlider");
    if (!slider) return;
    const slides = slider.getElementsByClassName("slide");
    const dots = slider.getElementsByClassName("dot");
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
        dots[i].classList.remove("active");
    }
    slides[currentSlideIndex].classList.add("active");
    dots[currentSlideIndex].classList.add("active");
}

// ================= TAB COMPONENT RENDER ENGINES (HOME) ================= */
function filterShowcase(tabTag, buttonElement) {
    currentShowcaseTab = tabTag;
    const tabLinks = document.querySelectorAll(".tab-link");
    tabLinks.forEach(b => b.classList.remove("active"));
    if (buttonElement) buttonElement.classList.add("active");
    renderHomeProductShowcase();
}

function renderHomeProductShowcase() {
    const grid = document.getElementById("homeProductGrid");
    if (!grid) return;
    grid.innerHTML = "";
    
    // Filter sample catalog down to 8 entries based on active tab criteria
    const filtered = sampleProducts.filter(p => p.tags.includes(currentShowcaseTab)).slice(0, 8);
    
    filtered.forEach(p => {
        grid.appendChild(buildProductCardElement(p));
    });
}

// ================= GLOBAL REUSABLE COMPONENT GENERATOR ================= */
function buildProductCardElement(product) {
    const card = document.createElement("div");
    card.className = "product-card";
    
    const isSaved = wishlist.includes(product.id);
    const hasDiscount = product.origPrice > product.price;
    const discountBadge = hasDiscount ? `<div class="badge-sale">Archival Drop</div>` : "";
    
    let stars = "";
    for(let i=1; i<=5; i++) {
        stars += i <= product.rating ? '<i class="fa-solid fa-star"></i>' : '<i class="fa-regular fa-star"></i>';
    }

    card.innerHTML = `
        <div class="product-image-wrap" onclick="openProductDetails(${product.id})">
            ${discountBadge}
            <img src="${product.img}" alt="${product.name}" loading="lazy">
        </div>
        <button class="wishlist-toggle-btn ${isSaved ? 'active' : ''}" onclick="toggleWishlist(event, ${product.id})" aria-label="Wishlist">
            <i class="${isSaved ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
        </button>
        <div class="product-info-wrap">
            <span class="prod-cat">${product.category}</span>
            <h4 class="prod-title" onclick="openProductDetails(${product.id})">${product.name}</h4>
            <div class="rating-stars">${stars} <span>(${product.reviews})</span></div>
            <div class="prod-price">
                <span class="price-current">Rs. ${product.price.toLocaleString()}</span>
                ${hasDiscount ? `<span class="price-original">Rs. ${product.origPrice.toLocaleString()}</span>` : ""}
            </div>
            <button class="card-action-btn" onclick="addToCart(event, ${product.id}, 1)">Add to Bag</button>
        </div>
    `;
    return card;
}

// ================= SYSTEM DATA COMPILATION METRICS (SHOP VIEW) ================= */
function filterCategory(categoryName) {
    activeCategoryFilter = categoryName;
    // Reflect onto sidebar UI element highlights
    const listItems = document.querySelectorAll("#categoryFilterList li");
    listItems.forEach(li => {
        if(li.textContent.toLowerCase().includes(categoryName.toLowerCase()) || (categoryName === 'all' && li.textContent.toLowerCase().includes('all'))) {
            li.className = "active";
        } else {
            li.className = "";
        }
    });
    renderShopCatalog();
}

function setCategoryFilter(cat, element) {
    activeCategoryFilter = cat;
    setSelectedFilterClass(element, "categoryFilterList");
    renderShopCatalog();
}

function setRatingFilter(rating, element) {
    ratingFilter = rating;
    setSelectedFilterClass(element, "ratingFilterList");
    renderShopCatalog();
}

function updatePriceLabel(value) {
    maxPriceFilter = parseInt(value);
    document.getElementById("priceValueLabel").textContent = `Rs. ${maxPriceFilter.toLocaleString()}`;
    renderShopCatalog();
}

function setSelectedFilterClass(element, listId) {
    const items = document.querySelectorAll(`#${listId} li`);
    items.forEach(i => i.classList.remove("active"));
    if(element) element.classList.add("active");
}

function resetAllFilters() {
    activeCategoryFilter = "all";
    maxPriceFilter = 30000;
    ratingFilter = 0;
    
    document.getElementById("priceRange").value = 30000;
    document.getElementById("priceValueLabel").textContent = "Rs. 30,000";
    
    setSelectedFilterClass(document.querySelectorAll("#categoryFilterList li")[0], "categoryFilterList");
    setSelectedFilterClass(document.querySelectorAll("#ratingFilterList li")[0], "ratingFilterList");
    
    renderShopCatalog();
}

function toggleSidebar(openState) {
    const side = document.getElementById("shopSidebar");
    if(openState) side.classList.add("open");
    else side.classList.remove("open");
}

function handleSortChange() {
    renderShopCatalog();
}

function renderShopCatalog() {
    const grid = document.getElementById("shopProductGrid");
    if (!grid) return;
    grid.innerHTML = "";

    let catalog = [...sampleProducts];

    // Filter Processing Sequences
    if (activeCategoryFilter !== "all") {
        catalog = catalog.filter(p => p.category.toLowerCase() === activeCategoryFilter.toLowerCase());
    }
    catalog = catalog.filter(p => p.price <= maxPriceFilter);
    if (ratingFilter > 0) {
        catalog = catalog.filter(p => p.rating >= ratingFilter);
    }

    // Sort Sequencing Array Mechanics
    const sortBy = document.getElementById("sortSelect").value;
    if (sortBy === "price-low") {
        catalog.sort((a,b) => a.price - b.price);
    } else if (sortBy === "price-high") {
        catalog.sort((a,b) => b.price - a.price);
    } else if (sortBy === "best-selling") {
        catalog.sort((a,b) => b.reviews - a.reviews);
    } else if (sortBy === "popular") {
        catalog.sort((a,b) => b.rating - a.rating);
    } // Default matches catalog order array sequencing implicitly for "newest"

    // Update Counter metric
    document.getElementById("resultsCount").textContent = `Showing ${catalog.length} structural results match.`;

    catalog.forEach(p => {
        grid.appendChild(buildProductCardElement(p));
    });
}

// ================= GLOBAL ARCHITECTURAL SEARCH ENGINE ================= */
function handleSearch(e) {
    if(e.key === 'Enter') triggerSearch();
}
function triggerSearch() {
    const term = document.getElementById("globalSearch").value.toLowerCase().trim();
    if(!term) return;
    
    switchView('shop');
    resetAllFilters();
    
    const grid = document.getElementById("shopProductGrid");
    grid.innerHTML = "";
    
    const filtered = sampleProducts.filter(p => p.name.toLowerCase().includes(term) || p.desc.toLowerCase().includes(term));
    document.getElementById("resultsCount").textContent = `Search matches for "${term}": Found ${filtered.length}`;
    
    filtered.forEach(p => {
        grid.appendChild(buildProductCardElement(p));
    });
}

// ================= PRODUCT CONSOLE SUBSYSTEM (DETAILS PAGE) ================= */
function openProductDetails(productId) {
    activeProductDetailsId = productId;
    const target = sampleProducts.find(p => p.id === productId);
    if(!target) return;
    
    const container = document.getElementById("productDetailsContent");
    let starLayout = "";
    for(let i=1; i<=5; i++) {
        starLayout += i <= target.rating ? '<i class="fa-solid fa-star"></i>' : '<i class="fa-regular fa-star"></i>';
    }

    // Render internal architectural breakdown grid layouts
    container.innerHTML = `
        <div class="product-detail-grid">
            <div class="gallery-wrapper">
                <div class="gallery-thumbs">
                    <div class="thumb-box active" onclick="swapDetailPreview('${target.img}', this)"><img src="${target.img}"></div>
                    <div class="thumb-box" onclick="swapDetailPreview('https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=600&q=80', this)"><img src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=600&q=80"></div>
                    <div class="thumb-box" onclick="swapDetailPreview('https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80', this)"><img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80"></div>
                </div>
                <div class="main-preview-box" id="zoomPreviewPane" onmousemove="handleGalleryZoom(event)" onmouseleave="resetGalleryZoom()">
                    <img src="${target.img}" id="mainDetailImage">
                </div>
            </div>
            
            <div class="detail-info-pane">
                <span class="detail-cat">${target.category} Collection</span>
                <h2>${target.name}</h2>
                <div class="rating-stars" style="font-size:0.9rem;">${starLayout} <span>(${target.reviews} Client Reviews)</span></div>
                
                <div class="price-row">
                    <span class="curr">Rs. ${target.price.toLocaleString()}</span>
                    <span class="orig">Rs. ${target.origPrice.toLocaleString()}</span>
                </div>
                
                <p class="detail-desc">${target.desc} Crafted under absolute monochrome structural architecture quality standard procedures guidelines.</p>
                
                <table class="spec-table">
                    <tr><td>Composition</td><td>Luxury Sourced Fine-Weave Matrix Fiber</td></tr>
                    <tr><td>Stock Metrics</td><td>${target.stock} (High Priority Vector)</td></tr>
                    <tr><td>Origin Point</td><td>Global Premium Atelier Design Labs</td></tr>
                </table>

                <div class="config-group">
                    <label>Available Sizes</label>
                    <div class="size-selector">
                        <button class="size-btn active" onclick="selectDetailSize(this)">S</button>
                        <button class="size-btn" onclick="selectDetailSize(this)">M</button>
                        <button class="size-btn" onclick="selectDetailSize(this)">L</button>
                        <button class="size-btn" onclick="selectDetailSize(this)">XL</button>
                    </div>
                </div>

                <div class="config-group">
                    <label>Structural Color Architecture</label>
                    <div class="color-selector">
                        <div class="color-dot active" style="background-color: #000000;" onclick="selectDetailColor(this)"></div>
                        <div class="color-dot" style="background-color: #FFFFFF;" onclick="selectDetailColor(this)"></div>
                    </div>
                </div>

                <div class="config-group">
                    <label>Quantity</label>
                    <div class="qty-input-box">
                        <button onclick="adjustDetailQty(-1)">-</button>
                        <input type="text" value="1" id="detailQtyInput" readonly>
                        <button onclick="adjustDetailQty(1)">+</button>
                    </div>
                </div>

                <div class="action-buttons-row">
                    <button class="btn btn-black flex-grow: 1;" style="flex:1;" onclick="addDetailProductToCart(false)">Add to Bag</button>
                    <button class="btn btn-white" style="flex:1;" onclick="addDetailProductToCart(true)">Buy Now</button>
                </div>
            </div>
        </div>

        <div class="reviews-block">
            <h3>Verified Client Reviews Manifest</h3>
            <div class="review-item">
                <div class="review-meta"><strong>Alexander V.</strong> <span>★★★★★</span></div>
                <p style="font-size:0.85rem; color:#444;">Incredible visual architectural weights. Fits the body structure profile accurately. True monochrome excellence execution.</p>
            </div>
            <div class="review-item">
                <div class="review-meta"><strong>Helena R.</strong> <span>★★★★☆</span></div>
                <p style="font-size:0.85rem; color:#444;">The linear configuration pleats are flawlessly completed. High density threading feels completely elite.</p>
            </div>
        </div>
    `;

    switchView('product-details');
}

function swapDetailPreview(imgSrc, thumbElement) {
    document.getElementById("mainDetailImage").src = imgSrc;
    const thumbs = document.querySelectorAll(".thumb-box");
    thumbs.forEach(t => t.classList.remove("active"));
    if(thumbElement) thumbElement.classList.add("active");
}

function handleGalleryZoom(e) {
    const img = document.getElementById("mainDetailImage");
    const pane = document.getElementById("zoomPreviewPane");
    const rect = pane.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    img.style.transformOrigin = `${x}% ${y}%`;
    img.style.transform = "scale(1.8)";
}

function resetGalleryZoom() {
    const img = document.getElementById("mainDetailImage");
    img.style.transform = "scale(1)";
    img.style.transformOrigin = "center center";
}

function selectDetailSize(btn) {
    document.querySelectorAll(".size-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
}

function selectDetailColor(dot) {
    document.querySelectorAll(".color-dot").forEach(d => d.classList.remove("active"));
    dot.classList.add("active");
}

function adjustDetailQty(delta) {
    const input = document.getElementById("detailQtyInput");
    let val = parseInt(input.value) + delta;
    if(val < 1) val = 1;
    input.value = val;
}

function addDetailProductToCart(isBuyNowAction) {
    const qty = parseInt(document.getElementById("detailQtyInput").value);
    addToCart(null, activeProductDetailsId, qty);
    if(isBuyNowAction) {
        switchView('cart');
    }
}

// ================= TRANSACTIONARY OPERATING QUANTUMS (CART METRICS) ================= */
function addToCart(e, productId, qty) {
    if(e) e.stopPropagation();
    const target = sampleProducts.find(p => p.id === productId);
    if(!target) return;
    
    const existing = cart.find(item => item.product.id === productId);
    if(existing) {
        existing.quantity += qty;
    } else {
        cart.push({ product: target, quantity: qty });
    }
    
    updateGlobalBadges();
    alert(`${target.name} securely added allocation metrics inside Shopping Bag.`);
}

function updateGlobalBadges() {
    document.getElementById("cartCount").textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById("wishlistCount").textContent = wishlist.length;
}

function adjustCartItemQty(productId, delta) {
    const item = cart.find(i => i.product.id === productId);
    if(!item) return;
    item.quantity += delta;
    if(item.quantity < 1) {
        removeCartItem(productId);
        return;
    }
    renderCartLayout();
    updateGlobalBadges();
}

function removeCartItem(productId) {
    cart = cart.filter(item => item.product.id !== productId);
    renderCartLayout();
    updateGlobalBadges();
}

function renderCartLayout() {
    const container = document.getElementById("cartLayoutContainer");
    if(!container) return;
    
    if(cart.length === 0) {
        container.innerHTML = `<div style="grid-column: span 2; text-align: center; padding: 60px 0;">
            <p style="font-size: 1.1rem; margin-bottom:20px; color:#555;">Your architectural bag is currently unallocated.</p>
            <button class="btn btn-black" onclick="switchView('shop')">Browse Digital Catalog</button>
        </div>`;
        return;
    }

    let itemsHtml = "";
    let subtotal = 0;

    cart.forEach(item => {
        const cost = item.product.price * item.quantity;
        subtotal += cost;
        itemsHtml += `
            <tr>
                <td>
                    <div class="cart-item-info">
                        <img src="${item.product.img}" alt="${item.product.name}">
                        <div>
                            <span class="cart-item-name">${item.product.name}</span><br>
                            <button class="remove-cart-item" onclick="removeCartItem(${item.product.id})">Remove Allocation</button>
                        </div>
                    </div>
                </td>
                <td>Rs. ${item.product.price.toLocaleString()}</td>
                <td>
                    <div class="qty-input-box" style="width:100px;">
                        <button onclick="adjustCartItemQty(${item.product.id}, -1)">-</button>
                        <input type="text" value="${item.quantity}" readonly>
                        <button onclick="adjustCartItemQty(${item.product.id}, 1)">+</button>
                    </div>
                </td>
                <td class="font-bold">Rs. ${cost.toLocaleString()}</td>
            </tr>
        `;
    });

    const shipping = subtotal > 15000 ? 0 : 750;
    const grandTotal = subtotal + shipping;

    container.innerHTML = `
        <div class="table-responsive" style="overflow-x:auto;">
            <table class="cart-table">
                <thead>
                    <tr>
                        <th>Product Specs</th>
                        <th>Unit Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    ${itemsHtml}
                </tbody>
            </table>
        </div>
        
        <div class="cart-summary-pane">
            <h3>Logistical Allocation Summary</h3>
            <div class="summary-row"><span>Bag Subtotal:</span> <span>Rs. ${subtotal.toLocaleString()}</span></div>
            <div class="summary-row"><span>Tracked Premium Shipping:</span> <span>${shipping === 0 ? "FREE" : "Rs. " + shipping}</span></div>
            <div class="summary-row total"><span>Grand Secure Manifest Total:</span> <span>Rs. ${grandTotal.toLocaleString()}</span></div>
            <button class="btn btn-black w-100" style="margin-top: 20px;" onclick="switchView('checkout')">Proceed To Checkout Verification</button>
        </div>
    `;
}

// ================= FAVORITES POOL ARCHITECTURE (WISHLIST) ================= */
function toggleWishlist(e, productId) {
    if(e) e.stopPropagation();
    const idx = wishlist.indexOf(productId);
    if(idx > -1) {
        wishlist.splice(idx, 1);
    } else {
        wishlist.push(productId);
    }
    updateGlobalBadges();
    
    // Auto re-sync rendering elements if currently visible inside views
    renderHomeProductShowcase();
    renderShopCatalog();
    renderWishlistLayout();
}

function moveWishlistToCart(productId) {
    addToCart(null, productId, 1);
    wishlist = wishlist.filter(id => id !== productId);
    updateGlobalBadges();
    renderWishlistLayout();
}

function renderWishlistLayout() {
    const container = document.getElementById("wishlistGridContainer");
    if(!container) return;
    container.innerHTML = "";
    
    if(wishlist.length === 0) {
        container.style.display = "block";
        container.innerHTML = `<p style="text-align: center; padding: 40px 0; color:#666;">No structured elements assigned to your global profile wishlist memory matrix.</p>`;
        return;
    }
    
    container.style.display = "grid";
    wishlist.forEach(id => {
        const prod = sampleProducts.find(p => p.id === id);
        if(prod) {
            const el = buildProductCardElement(prod);
            // Patch internal layout action buttons inside wishlist scopes for seamless movement metric
            const actions = el.querySelector(".product-info-wrap");
            actions.querySelector(".card-action-btn").remove();
            
            const btnWrap = document.createElement("div");
            btnWrap.style.display = "flex";
            btnWrap.style.gap = "5px";
            btnWrap.innerHTML = `
                <button class="btn btn-black" style="padding:8px; font-size:0.7rem; flex:1;" onclick="moveWishlistToCart(${prod.id})">Move To Bag</button>
                <button class="btn btn-white" style="padding:8px; font-size:0.7rem;" onclick="toggleWishlist(null, ${prod.id})"><i class="fa-solid fa-trash"></i></button>
            `;
            actions.appendChild(btnWrap);
            container.appendChild(el);
        }
    });
}

// ================= SECURITY AUTHENTICATION SIMULATIONS ================= */
function switchAuthTab(type, element) {
    document.querySelectorAll(".auth-tab-btn").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".auth-box").forEach(b => b.classList.remove("active"));
    
    if(element) element.classList.add("active");
    document.getElementById(`auth-${type}-box`).classList.add("active");
}

function handleAuthSubmit(e, formMode) {
    e.preventDefault();
    // Inject mock user validation metrics directly into operational memory spaces
    document.getElementById("account-auth-container").style.display = "none";
    document.getElementById("account-dashboard-container").style.display = "block";
    
    if(formMode === 'register') {
        document.getElementById("dashUserTitle").textContent = "Premium Archival Client";
    }
    renderMockOrderHistory();
}

function handleLogout() {
    document.getElementById("account-dashboard-container").style.display = "none";
    document.getElementById("account-auth-container").style.display = "block";
}

function switchDashTab(tabId, element) {
    document.querySelectorAll(".dash-menu li").forEach(li => li.classList.remove("active"));
    document.querySelectorAll(".dash-tab-content").forEach(c => c.classList.remove("active"));
    
    if(element) element.classList.add("active");
    document.getElementById(`dash-${tabId}`).classList.add("active");
}

function renderMockOrderHistory() {
    const tbody = document.getElementById("orderHistoryBody");
    tbody.innerHTML = `
        <tr>
            <td>#SVN-2026-8841</td>
            <td>June 14, 2026</td>
            <td><span style="border: 1px solid #000; padding: 2px 6px; font-size: 0.7rem; font-weight:600;">DISPATCH ROUTED</span></td>
            <td class="font-bold">Rs. 24,500</td>
        </tr>
    `;
}

// ================= OUTBOUND CHECKOUT GATEWAY INFRASTRUCTURE ================= */
function renderCheckoutSummary() {
    const itemsContainer = document.getElementById("checkoutSummaryItems");
    if(!itemsContainer) return;
    itemsContainer.innerHTML = "";
    
    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.product.price * item.quantity;
        const div = document.createElement("div");
        div.className = "summary-row";
        div.style.fontSize = "0.85rem";
        div.innerHTML = `<span>${item.product.name} (x${item.quantity})</span> <span>Rs. ${(item.product.price * item.quantity).toLocaleString()}</span>`;
        itemsContainer.appendChild(div);
    });
    
    const shipping = subtotal > 15000 ? 0 : 750;
    const total = subtotal + shipping;
    document.getElementById("checkoutGrandTotal").textContent = `Rs. ${total.toLocaleString()}`;
}

function processCheckout(e) {
    e.preventDefault();
    if(cart.length === 0) {
        alert("Transaction denied. Operational shopping bag contains zero allocation indexes.");
        return;
    }

    // Capture user assignment references
    const first = document.getElementById("chkFirst").value;
    const last = document.getElementById("chkLast").value;
    
    let subtotal = 0;
    const summaryTarget = document.getElementById("confProductsSummary");
    summaryTarget.innerHTML = "";
    
    cart.forEach(item => {
        subtotal += item.product.price * item.quantity;
        const p = document.createElement("p");
        p.style.fontSize = "0.85rem";
        p.innerHTML = `• ${item.product.name} x${item.quantity} - <span class="font-bold">Rs. ${(item.product.price * item.quantity).toLocaleString()}</span>`;
        summaryTarget.appendChild(p);
    });
    
    const shipping = subtotal > 15000 ? 0 : 750;
    const grandTotal = subtotal + shipping;

    // Direct binding updates inside Order complete fields screen
    document.getElementById("confOrderNumber").textContent = `SVN-${Math.floor(100000 + Math.random() * 900000)}-2026`;
    document.getElementById("confCustomerName").textContent = `${first} ${last}`;
    document.getElementById("confTotalAmount").textContent = `Rs. ${grandTotal.toLocaleString()}`;

    // Clear local cache variables structural states
    cart = [];
    updateGlobalBadges();
    
    switchView('confirmation');
}

function subscribeNewsletter() {
    const input = document.getElementById("newsletterEmail");
    if(input.value) {
        alert("Email verified. Core connection matrix added securely inside the SAVEAN STORE archive database network.");
        input.value = "";
    }
}