/**
 * SAVEAN STORE - CORE SYSTEM MASTER ENGINE DATA ENGINE ARCHITECTURE
 * Pure Vanilla JavaScript Framework for Micro-State Manipulation & Dynamic Content Rendering
 */

// Global Master Application Memory State Manifest
const AppState = {
    products: [],
    cart: [],
    wishlist: [],
    activeUser: null,
    currentViewedProduct: null,
    activeView: 'home-view',
    activeFilters: {
        category: 'all',
        maxPrice: 30000,
        minRating: 0
    },
    activeSort: 'newest'
};

// Internal Mock Storage Management Engine
const StorageEngine = {
    initLocalState() {
        if(localStorage.getItem('savean_cart_cache')) {
            AppState.cart = JSON.parse(localStorage.getItem('savean_cart_cache'));
        }
        if(localStorage.getItem('savean_wish_cache')) {
            AppState.wishlist = JSON.parse(localStorage.getItem('savean_wish_cache'));
        }
        if(localStorage.getItem('savean_session_user')) {
            AppState.activeUser = JSON.parse(localStorage.getItem('savean_session_user'));
        }
    },
    syncCart() {
        localStorage.setItem('savean_cart_cache', JSON.stringify(AppState.cart));
        DOMUpdates.updateGlobalBadges();
    },
    syncWish() {
        localStorage.setItem('savean_wish_cache', JSON.stringify(AppState.wishlist));
        DOMUpdates.updateGlobalBadges();
    },
    syncSession(user) {
        AppState.activeUser = user;
        if(user) {
            localStorage.setItem('savean_session_user', JSON.stringify(user));
        } else {
            localStorage.removeItem('savean_session_user');
        }
    }
};

// 50 Sample Curated Fashion Products Generation Pipeline Module
function executeProductGenerationPipeline() {
    const categories = ["Men's Fashion", "Women's Fashion", "Shoes", "Bags", "Accessories", "Watches", "Beauty", "Sportswear"];
    const tags = ["Flash Sale", "Featured", "New Arrivals", "Best Sellers", "Today's Deals", "Trending"];
    const adjectives = ["Premium Architectural", "Minimalist Structured", "Avant-Garde", "Luxury Tailored", "Classic Monochrome", "Sovereign Essential", "Urban Asymmetric", "Formal Elite"];
    const types = {
        "Men's Fashion": ["Trench Coat", "Oversized Blazer", "Poplin Shirt", "Pleated Trousers", "Raw Denim Jacket"],
        "Women's Fashion": ["Asymmetric Dress", "Cropped Wool Top", "Tailored Jumpsuit", "Minimalist Slip Dress", "Knit Cardigan"],
        "Shoes": ["Leather Chelsea Boots", "Monolith Sneakers", "Minimal Derby Shoes", "Square Toe Mules", "Technical High Tops"],
        "Bags": ["Geometric Tote Bag", "Leather Crossbody Sack", "Structured Briefcase", "Minimalist Backpack", "Micro Belt Bag"],
        "Accessories": ["Silk Scarf Block", "Bespoke Leather Belt", "Acetate Sunglasses", "Silver Signet Ring", "Monochrome Leather Gloves"],
        "Watches": ["Chrono Matte Black Watch", "Minimalist Silver Dial", "Automatic Bauhaus Watch", "Skeletal Titanium Timepiece", "Luxury Steel Dress Watch"],
        "Beauty": ["Matte Lip Extrait", "Mineral Facial Mud", "Noir Eau De Parfum", "Hydrating Botanical Serum", "Volcanic Ash Body Scrub"],
        "Sportswear": ["Compression Training Tops", "Minimalist Track Pant", "Unisex Performance Hoodie", "Technical Windbreaker", "Aerated Athletic Shorts"]
    };

    let idCounter = 1;
    categories.forEach((cat) => {
        const itemTypes = types[cat];
        itemTypes.forEach((typeStr, idx) => {
            adjectives.forEach((adj, aIdx) => {
                if (idCounter > 50) return;
                
                // Deterministic algorithmic parameters generation
                const basePrice = 2000 + (idCounter * 450);
                const discountAmount = (idCounter % 3 === 0) ? Math.floor(basePrice * 0.25) : 0;
                const salePrice = basePrice - discountAmount;
                const reviewCount = 12 + (idCounter * 7);
                const baseRating = 4.0 + ((idCounter % 11) * 0.1);
                const finalRating = baseRating > 5 ? 5.0 : parseFloat(baseRating.toFixed(1));
                
                // Assign a pool of specific tag distributions
                const itemTags = [tags[idCounter % tags.length]];
                if(discountAmount > 0) itemTags.push("Flash Sale");
                if(idCounter % 5 === 0) itemTags.push("Featured");

                AppState.products.push({
                    id: `SVN-PRD-${1000 + idCounter}`,
                    name: `${adj} ${typeStr}`,
                    category: cat,
                    description: `An exquisite curation displaying structural superiority and refined alignment. This ${cat.toLowerCase()} masterpiece embodies the design ethos of SAVEAN STORE with precision processing techniques. Durable, monochrome framework built to withstand temporal trends.`,
                    rating: finalRating,
                    reviewsCount: reviewCount,
                    originalPrice: basePrice,
                    discountPrice: salePrice,
                    stockStatus: (idCounter % 13 === 0) ? "OUT OF STOCK" : "IN STOCK",
                    tags: itemTags,
                    sku: `SKU-2026-${8899 + idCounter}`,
                    colors: ["#000000", "#FFFFFF"],
                    sizes: cat === "Shoes" ? ["40", "41", "42", "43"] : (cat === "Accessories" || cat === "Beauty" || cat === "Watches" ? ["O/S"] : ["S", "M", "L", "XL"])
                });
                idCounter++;
            });
        });
    });
}

// Global UI Rendering Engine Module
const DOMUpdates = {
    initViews() {
        // Intercept all declared navigation gateways
        document.querySelectorAll('.nav-trigger').forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                const targetView = trigger.getAttribute('data-target');
                DOMUpdates.switchView(targetView);
                
                // Sync internal side actions if drawer triggered on mobile
                document.getElementById('mobile-drawer').classList.remove('open');
                document.getElementById('drawer-overlay').classList.remove('open');
            });
        });

        // Sticky sub elements configuration bindings
        document.querySelectorAll('.shop-now-btn').forEach(btn => {
            btn.addEventListener('click', () => DOMUpdates.switchView('shop-view'));
        });
    },

    switchView(viewId) {
        document.querySelectorAll('.view-section').forEach(sec => {
            sec.classList.remove('active');
        });
        const activeTarget = document.getElementById(viewId);
        if(activeTarget) {
            activeTarget.classList.add('active');
            AppState.activeView = viewId;
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Highlight Desktop Nav Markers
        document.querySelectorAll('.desktop-nav a').forEach(a => {
            if(a.getAttribute('data-target') === viewId) a.classList.add('active');
            else a.classList.remove('active');
        });

        // Trigger individual specific sub views data refreshes if targeted
        if(viewId === 'shop-view') DOMUpdates.renderShopCatalog();
        if(viewId === 'cart-view') DOMUpdates.renderCartView();
        if(viewId === 'wishlist-view') DOMUpdates.renderWishlistView();
        if(viewId === 'dashboard-view') DOMUpdates.evaluateDashboardAuthState();
    },

    updateGlobalBadges() {
        document.getElementById('cart-count').innerText = AppState.cart.reduce((acc, item) => acc + item.quantity, 0);
        document.getElementById('wishlist-count').innerText = AppState.wishlist.length;
    },

    generateStarsString(ratingNum) {
        const solidStars = Math.floor(ratingNum);
        let starStr = '';
        for(let i=0; i<5; i++) {
            if(i < solidStars) starStr += '★';
            else starStr += '☆';
        }
        return `${starStr} (${ratingNum})`;
    },

    generateProductCardHTML(p) {
        const priceHTML = p.originalPrice !== p.discountPrice 
            ? `<span class="p-price-current">Rs. ${p.discountPrice.toLocaleString()}</span><span class="p-price-original">Rs. ${p.originalPrice.toLocaleString()}</span>`
            : `<span class="p-price-current">Rs. ${p.originalPrice.toLocaleString()}</span>`;

        const tagHTML = p.originalPrice !== p.discountPrice ? `<div class="product-tag-sale">SALE</div>` : '';
        const wishActiveChar = AppState.wishlist.some(w => w.id === p.id) ? '★' : '&#9825;';

        return `
            <div class="product-card" data-pid="${p.id}">
                <div class="product-card-img-wrapper" onclick="DOMUpdates.launchProductDetails('${p.id}')">
                    ${tagHTML}
                    <button class="wishlist-tag-btn" data-pid="${p.id}" onclick="event.stopPropagation(); DOMUpdates.toggleWishlistEvent('${p.id}')">${wishActiveChar}</button>
                    <div class="product-card-img-placeholder">${p.category.substring(0,2).toUpperCase()}</div>
                </div>
                <div class="product-card-info">
                    <span class="p-category">${p.category}</span>
                    <h3 class="p-title" onclick="DOMUpdates.launchProductDetails('${p.id}')">${p.name}</h3>
                    <div class="stars-rating-row">${DOMUpdates.generateStarsString(p.rating)} [${p.reviewsCount} Reviews]</div>
                    <div class="p-pricing-block">
                        ${priceHTML}
                    </div>
                </div>
                <div class="product-card-actions">
                    <button onclick="DOMUpdates.quickAddToCart('${p.id}')">ADD TO BAG</button>
                    <button onclick="DOMUpdates.launchProductDetails('${p.id}')">VIEW DETAILS</button>
                </div>
            </div>
        `;
    },

    renderHomeShowcases() {
        const flashContainer = document.getElementById('flash-sale-container');
        const featuredContainer = document.getElementById('featured-container');
        const newArrContainer = document.getElementById('new-arrivals-container');
        const dealsContainer = document.getElementById('deals-container');
        const trendingContainer = document.getElementById('trending-container');
        const bestContainer = document.getElementById('bestsellers-container');

        // Filter operations extracted cleanly for specific structural home views slots
        const flashProducts = AppState.products.filter(p => p.tags.includes("Flash Sale")).slice(0, 4);
        const featuredProducts = AppState.products.filter(p => p.tags.includes("Featured")).slice(0, 4);
        const newProducts = AppState.products.filter(p => p.tags.includes("New Arrivals")).slice(0, 4);
        const dealsProducts = AppState.products.filter(p => p.tags.includes("Today's Deals")).slice(0, 4);
        const trendingProducts = AppState.products.filter(p => p.tags.includes("Trending")).slice(0, 4);
        const bestProducts = AppState.products.filter(p => p.tags.includes("Best Sellers")).slice(0, 4);

        flashContainer.innerHTML = flashProducts.map(p => DOMUpdates.generateProductCardHTML(p)).join('');
        featuredContainer.innerHTML = featuredProducts.map(p => DOMUpdates.generateProductCardHTML(p)).join('');
        newArrContainer.innerHTML = newProducts.map(p => DOMUpdates.generateProductCardHTML(p)).join('');
        dealsContainer.innerHTML = dealsProducts.map(p => DOMUpdates.generateProductCardHTML(p)).join('');
        trendingContainer.innerHTML = trendingProducts.map(p => DOMUpdates.generateProductCardHTML(p)).join('');
        bestContainer.innerHTML = bestProducts.map(p => DOMUpdates.generateProductCardHTML(p)).join('');
    },

    renderShopCatalog() {
        const grid = document.getElementById('shop-catalog-grid');
        
        // Execute dynamic cascading filtration workflows
        let filtered = AppState.products.filter(p => {
            const catMatch = AppState.activeFilters.category === 'all' || p.category === AppState.activeFilters.category;
            const finalPrice = p.discountPrice;
            const priceMatch = finalPrice <= AppState.activeFilters.maxPrice;
            const ratingMatch = p.rating >= AppState.activeFilters.minRating;
            return catMatch && priceMatch && ratingMatch;
        });

        // Execute processing sort algorithm arrays manipulation
        if(AppState.activeSort === 'low-high') {
            filtered.sort((a,b) => a.discountPrice - b.discountPrice);
        } else if(AppState.activeSort === 'high-low') {
            filtered.sort((a,b) => b.discountPrice - a.discountPrice);
        } else if(AppState.activeSort === 'best-selling') {
            filtered.sort((a,b) => b.reviewsCount - a.reviewsCount);
        } else if(AppState.activeSort === 'popular') {
            filtered.sort((a,b) => b.rating - a.rating);
        }

        document.getElementById('catalog-count').innerText = filtered.length;
        if(filtered.length === 0) {
            grid.innerHTML = `<div style="grid-column: 1/-1; padding: 4rem 1rem; text-align:center;">
                <blockquote class="mono-quote">No premium items fit your parameters. Modify search metric settings.</blockquote>
            </div>`;
        } else {
            grid.innerHTML = filtered.map(p => DOMUpdates.generateProductCardHTML(p)).join('');
        }
    },

    launchProductDetails(pid) {
        const p = AppState.products.find(item => item.id === pid);
        if(!p) return;
        AppState.currentViewedProduct = p;
        
        const root = document.getElementById('dynamic-details-root');
        const priceHTML = p.originalPrice !== p.discountPrice 
            ? `<span class="curr-price">Rs. ${p.discountPrice.toLocaleString()}</span><span class="orig-price">Rs. ${p.originalPrice.toLocaleString()}</span>`
            : `<span class="curr-price">Rs. ${p.originalPrice.toLocaleString()}</span>`;

        const sizeButtons = p.sizes.map((s, idx) => `
            <button class="size-option-btn ${idx===0?'active':''}" onclick="DOMUpdates.selectSizeEvent(this, '${s}')">${s}</button>
        `).join('');

        const colorCircles = p.colors.map((c, idx) => `
            <div class="color-option-circle ${idx===0?'active':''}" style="background-color: ${c};" onclick="DOMUpdates.selectColorEvent(this, '${c}')"></div>
        `).join('');

        // Preload implicit dynamic metadata references for sizes and chosen targets
        p._selectedSize = p.sizes[0];
        p._selectedColor = p.colors[0];
        p._selectedQty = 1;

        // Extract pseudo related inventory mapping lists
        const relatedHTML = AppState.products.filter(item => item.category === p.category && item.id !== p.id).slice(0, 4);

        root.innerHTML = `
            <div class="gallery-pane">
                <div class="main-zoom-viewport" id="zoom-viewport" onmousemove="DOMUpdates.handleZoomEffect(event)" onmouseleave="DOMUpdates.resetZoomEffect(event)">
                    <span class="placeholder-icon">${p.category.substring(0,2).toUpperCase()}</span>
                </div>
                <div class="gallery-strip-thumbnails">
                    <div class="thumb-box active">VIEW A</div>
                    <div class="thumb-box">VIEW B</div>
                    <div class="thumb-box">FABRIC</div>
                </div>
            </div>
            <div class="details-info-pane">
                <span class="details-meta-cat">${p.category}</span>
                <h1>${p.name}</h1>
                <div class="stars-rating-row" style="font-size: 1rem;">${DOMUpdates.generateStarsString(p.rating)} | ${p.reviewsCount} Curated Customer Reviews</div>
                <hr class="mono-hr">
                
                <div class="details-price-row">
                    ${priceHTML}
                </div>

                <div class="stock-indicator-badge">
                    <span class="badge-default" style="background:${p.stockStatus==='IN STOCK'?'#000000':'#666666'};">${p.stockStatus}</span>
                </div>

                <p class="mb-4">${p.description}</p>

                <div class="selector-title">SELECT METRIC SIZE</div>
                <div class="sizes-wrapper">${sizeButtons}</div>

                <div class="selector-title">SELECT MATERIAL CHROMA</div>
                <div class="colors-wrapper">${colorCircles}</div>

                <div class="selector-title">QUANTITY SELECTION BLOCK</div>
                <div class="quantity-control-block">
                    <button onclick="DOMUpdates.adjustDetailsQty(-1)">-</button>
                    <span id="details-qty-val">1</span>
                    <button onclick="DOMUpdates.adjustDetailsQty(1)">+</button>
                </div>

                <div class="actions-buy-row">
                    <button class="btn btn-black" onclick="DOMUpdates.addCurrentToCart()">ADD TO SHOPPING BAG</button>
                    <button class="btn btn-white" onclick="DOMUpdates.buyNowCurrent()">BUY NOW DIRECT</button>
                </div>

                <div class="selector-title">SPECIFICATIONS INTEGRATION ARCHIVE</div>
                <table class="specs-table">
                    <tr><td>Identification SKU</td><td>${p.sku}</td></tr>
                    <tr><td>Structural Origin</td><td>Premium Handcrafted Asset Line</td></tr>
                    <tr><td>Care Instructions</td><td>Dry Clean Protocol Only / Monochrome Preservation</td></tr>
                </table>

                <div class="reviews-tab-panel">
                    <h3>SYSTEM CUSTOMER VERIFICATIONS</h3>
                    <div class="single-review-log">
                        <div class="review-meta"><span>A. Luxury Reviewer</span><span>★★★★★</span></div>
                        <p class="text-muted">Incredible cut. The structural geometric balance is impeccable. Worth every single Rs.</p>
                    </div>
                    <div class="single-review-log">
                        <div class="review-meta"><span>M. Minimalist Designer</span><span style="letter-spacing:1px;">★★★★☆</span></div>
                        <p class="text-muted">Clean seams, exceptional packaging layout. Captures the architectural design paradigm flawlessly.</p>
                    </div>
                </div>
            </div>
            
            <div style="grid-column: 1/-1; margin-top: 4rem;">
                <h2 class="section-title">RELATED LUXURY OBJECTS</h2>
                <div class="product-grid">${relatedHTML.map(r => DOMUpdates.generateProductCardHTML(r)).join('')}</div>
            </div>
        `;

        DOMUpdates.switchView('product-details-view');
    },

    handleZoomEffect(e) {
        const vp = e.currentTarget;
        // Simple elegant responsive non-framework zooming emulation simulation layout transformation matrices
        vp.style.transform = "scale(1.03)";
        vp.style.transition = "transform 0.1s";
        vp.style.backgroundColor = "#EAEAEA";
    },

    resetZoomEffect(e) {
        const vp = e.currentTarget;
        vp.style.transform = "scale(1)";
        vp.style.backgroundColor = "#F5F5F5";
    },

    selectSizeEvent(btn, size) {
        const parent = btn.parentElement;
        parent.querySelectorAll('.size-option-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        AppState.currentViewedProduct._selectedSize = size;
    },

    selectColorEvent(circle, color) {
        const parent = circle.parentElement;
        parent.querySelectorAll('.color-option-circle').forEach(c => c.classList.remove('active'));
        circle.classList.add('active');
        AppState.currentViewedProduct._selectedColor = color;
    },

    adjustDetailsQty(val) {
        let curr = AppState.currentViewedProduct._selectedQty || 1;
        curr += val;
        if(curr < 1) curr = 1;
        AppState.currentViewedProduct._selectedQty = curr;
        document.getElementById('details-qty-val').innerText = curr;
    },

    quickAddToCart(pid) {
        const p = AppState.products.find(item => item.id === pid);
        if(!p) return;
        
        const existing = AppState.cart.find(item => item.id === pid && item.size === p.sizes[0]);
        if(existing) {
            existing.quantity += 1;
        } else {
            AppState.cart.push({
                id: p.id,
                name: p.name,
                category: p.category,
                price: p.discountPrice,
                size: p.sizes[0],
                color: p.colors[0],
                quantity: 1
            });
        }
        StorageEngine.syncCart();
        alert(`${p.name} successfully appended to shopping bag.`);
    },

    addCurrentToCart() {
        const p = AppState.currentViewedProduct;
        if(!p) return;

        const existing = AppState.cart.find(item => item.id === p.id && item.size === p._selectedSize && item.color === p._selectedColor);
        if(existing) {
            existing.quantity += p._selectedQty;
        } else {
            AppState.cart.push({
                id: p.id,
                name: p.name,
                category: p.category,
                price: p.discountPrice,
                size: p._selectedSize,
                color: p._selectedColor,
                quantity: p._selectedQty
            });
        }
        StorageEngine.syncCart();
        alert(`Acquisition configuration appended safely to order bag.`);
    },

    buyNowCurrent() {
        DOMUpdates.addCurrentToCart();
        DOMUpdates.switchView('cart-view');
    },

    toggleWishlistEvent(pid) {
        const idx = AppState.wishlist.findIndex(w => w.id === pid);
        if(idx > -1) {
            AppState.wishlist.splice(idx, 1);
            alert(`Item extracted from custom wishlist portfolio.`);
        } else {
            const p = AppState.products.find(item => item.id === pid);
            AppState.wishlist.push(p);
            alert(`Item logged into wishlist index parameters.`);
        }
        StorageEngine.syncWish();
        
        // Dynamic cascading refresh based on location triggers
        if(AppState.activeView === 'wishlist-view') DOMUpdates.renderWishlistView();
        if(AppState.activeView === 'shop-view') DOMUpdates.renderShopCatalog();
        if(AppState.activeView === 'home-view') DOMUpdates.renderHomeShowcases();
    },

    renderCartView() {
        const container = document.getElementById('cart-items-container');
        if(AppState.cart.length === 0) {
            container.innerHTML = `<blockquote class="mono-quote">Your active shopping bag layout contains no logged objects. Visit global shop.</blockquote>`;
            DOMUpdates.evaluateCartTotals(0);
            return;
        }

        let totalAccumulator = 0;
        container.innerHTML = AppState.cart.map((item, idx) => {
            const rowTotal = item.price * item.quantity;
            totalAccumulator += rowTotal;
            return `
                <div class="cart-row-item">
                    <div class="cart-item-thumb-placeholder">${item.category.substring(0,2).toUpperCase()}</div>
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <div class="cart-item-meta-metrics">SIZE: ${item.size} | COLOR: ${item.color}</div>
                        <div class="form-group" style="width:70px; margin-bottom:0;">
                            <input type="number" value="${item.quantity}" min="1" onchange="DOMUpdates.mutateCartQty(${idx}, this.value)">
                        </div>
                        <button class="cart-item-removal-trigger" onclick="DOMUpdates.removeCartItem(${idx})">EXTRACT ITEM</button>
                    </div>
                    <div class="cart-item-pricing-zone">
                        <div class="text-muted">Unit: Rs. ${item.price.toLocaleString()}</div>
                        <div class="sub-calc">Rs. ${rowTotal.toLocaleString()}</div>
                    </div>
                </div>
            `;
        }).join('');

        DOMUpdates.evaluateCartTotals(totalAccumulator);
    },

    mutateCartQty(idx, val) {
        const parsed = parseInt(val);
        if(isNaN(parsed) || parsed < 1) return;
        AppState.cart[idx].quantity = parsed;
        StorageEngine.syncCart();
        DOMUpdates.renderCartView();
    },

    removeCartItem(idx) {
        AppState.cart.splice(idx, 1);
        StorageEngine.syncCart();
        DOMUpdates.renderCartView();
    },

    evaluateCartTotals(subtotal) {
        // Business Logic for currency operations framework Rs.
        const shipping = (subtotal > 10000 || subtotal === 0) ? 0 : 450;
        const discount = subtotal > 20000 ? Math.floor(subtotal * 0.1) : 0;
        const grand = subtotal + shipping - discount;

        document.getElementById('summary-subtotal').innerText = `Rs. ${subtotal.toLocaleString()}`;
        document.getElementById('summary-shipping').innerText = `Rs. ${shipping.toLocaleString()}`;
        document.getElementById('summary-discount').innerText = `- Rs. ${discount.toLocaleString()}`;
        document.getElementById('summary-grand-total').innerText = `Rs. ${grand.toLocaleString()}`;
        
        // Cache variables silently onto checkout mirror bindings
        AppState._subtotal = subtotal;
        AppState._shipping = shipping;
        AppState._discount = discount;
        AppState._grand = grand;
    },

    renderWishlistView() {
        const container = document.getElementById('wishlist-items-container');
        if(AppState.wishlist.length === 0) {
            container.innerHTML = `<div style="grid-column:1/-1;"><blockquote class="mono-quote">Your wishlist index portfolio is transparently vacant.</blockquote></div>`;
            return;
        }
        container.innerHTML = AppState.wishlist.map(p => DOMUpdates.generateProductCardHTML(p)).join('');
    },

    evaluateDashboardAuthState() {
        const authBlock = document.getElementById('auth-subsystem-container');
        const dashBlock = document.getElementById('true-dashboard-container');

        if(AppState.activeUser) {
            authBlock.classList.add('hidden');
            dashBlock.classList.remove('hidden');
            
            // Set data properties variables values inside the view
            document.getElementById('dash-user-name').innerText = `${AppState.activeUser.firstName} ${AppState.activeUser.lastName}`;
            document.getElementById('dash-stat-wishes').innerText = AppState.wishlist.length;
            
            // Populate fallback historical order values logs tracking
            const tbody = document.getElementById('dash-orders-tbody');
            tbody.innerHTML = `
                <tr>
                    <td>#SS-99384</td>
                    <td>2026-04-12</td>
                    <td>Direct Asset Balance</td>
                    <td>Rs. 14,950</td>
                    <td><span class="badge-default">ARCHIVED CONTEXT</span></td>
                </tr>
            `;
        } else {
            authBlock.classList.remove('hidden');
            dashBlock.classList.add('hidden');
        }
    },

    initializeCheckoutMiniView() {
        const listContainer = document.getElementById('checkout-mini-list');
        listContainer.innerHTML = AppState.cart.map(item => `
            <div class="mini-loop-row">
                <span><strong>${item.name}</strong> (x${item.quantity}) [Size ${item.size}]</span>
                <span>Rs. ${(item.price * item.quantity).toLocaleString()}</span>
            </div>
        `).join('');

        document.getElementById('chk-summary-count').innerText = `${AppState.cart.reduce((a,c)=>a+c.quantity,0)} Target Objects`;
        document.getElementById('chk-summary-subtotal').innerText = `Rs. ${AppState._subtotal.toLocaleString()}`;
        document.getElementById('chk-summary-shipping').innerText = `Rs. ${AppState._shipping.toLocaleString()}`;
        document.getElementById('chk-summary-discount').innerText = `- Rs. ${AppState._discount.toLocaleString()}`;
        document.getElementById('chk-summary-grand-total').innerText = `Rs. ${AppState._grand.toLocaleString()}`;
    }
};

// Application Global Form Handling Event Bindings & Listeners
function setupCoreInteractionListeners() {
    // Mobile Navigation Drawer Functional Events Switches
    const drawer = document.getElementById('mobile-drawer');
    const overlay = document.getElementById('drawer-overlay');
    
    document.querySelector('.mobile-menu-toggle').addEventListener('click', () => {
        drawer.classList.add('open');
        overlay.classList.add('open');
    });

    document.getElementById('close-drawer').addEventListener('click', () => {
        drawer.classList.remove('open');
        overlay.classList.remove('open');
    });

    overlay.addEventListener('click', () => {
        drawer.classList.remove('open');
        overlay.classList.remove('open');
    });

    // Global Interactive Shop Sidebar Controls Handling Filters
    document.querySelectorAll('#category-filter-list li').forEach(li => {
        li.addEventListener('click', () => {
            document.querySelectorAll('#category-filter-list li').forEach(l => l.classList.remove('active'));
            li.classList.add('active');
            AppState.activeFilters.category = li.getAttribute('data-value');
            DOMUpdates.renderShopCatalog();
        });
    });

    // Category Card clicks mapping onto shop filters seamlessly
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', () => {
            const cat = card.getAttribute('data-category');
            AppState.activeFilters.category = cat;
            
            // Set explicit state on sidebar elements list
            document.querySelectorAll('#category-filter-list li').forEach(li => {
                if(li.getAttribute('data-value') === cat) li.classList.add('active');
                else li.classList.remove('active');
            });

            DOMUpdates.switchView('shop-view');
        });
    });

    const priceRangeInput = document.getElementById('price-range');
    if(priceRangeInput) {
        priceRangeInput.addEventListener('input', (e) => {
            const val = parseInt(e.target.value);
            document.getElementById('price-range-val').innerText = `Rs. ${val.toLocaleString()}`;
            AppState.activeFilters.maxPrice = val;
            DOMUpdates.renderShopCatalog();
        });
    }

    const ratingSelect = document.getElementById('rating-filter');
    if(ratingSelect) {
        ratingSelect.addEventListener('change', (e) => {
            AppState.activeFilters.minRating = parseFloat(e.target.value);
            DOMUpdates.renderShopCatalog();
        });
    }

    const sortSelect = document.getElementById('shop-sort');
    if(sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            AppState.activeSort = e.target.value;
            DOMUpdates.renderShopCatalog();
        });
    }

    // Global Intercept Search Parameters Bar Control Logic
    document.getElementById('search-btn').addEventListener('click', executeSearchPipeline);
    document.getElementById('global-search').addEventListener('keyup', (e) => {
        if(e.key === 'Enter') executeSearchPipeline();
    });

    function executeSearchPipeline() {
        const query = document.getElementById('global-search').value.toLowerCase().trim();
        if(query === '') return;
        
        // Redirect seamlessly into shop catalog forced filtered views
        AppState.activeFilters.category = 'all';
        document.querySelectorAll('#category-filter-list li').forEach(l => l.classList.remove('active'));
        document.querySelectorAll('#category-filter-list li')[0].classList.add('active');

        DOMUpdates.switchView('shop-view');
        
        // Filter elements in place overriding base catalog
        const grid = document.getElementById('shop-catalog-grid');
        const matches = AppState.products.filter(p => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query));
        
        document.getElementById('catalog-count').innerText = matches.length;
        if(matches.length === 0) {
            grid.innerHTML = `<div style="grid-column: 1/-1; padding: 4rem; text-align:center;"><blockquote class="mono-quote">No curated items match search parameters "${query}".</blockquote></div>`;
        } else {
            grid.innerHTML = matches.map(p => DOMUpdates.generateProductCardHTML(p)).join('');
        }
    }

    // Checkout Pipeline Redirect Routing Interceptor
    document.getElementById('proceed-to-checkout-btn').addEventListener('click', () => {
        if(AppState.cart.length === 0) {
            alert("Your active shopping bag must contain structural targets to invoke verification systems.");
            return;
        }
        DOMUpdates.initializeCheckoutMiniView();
        DOMUpdates.switchView('checkout-view');
    });

    // Auth Form Panel Switching Architecture Subsystems
    document.querySelectorAll('.auth-tab-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.auth-tab-toggle').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.auth-pane').forEach(p => p.classList.remove('active'));
            
            btn.classList.add('active');
            document.getElementById(btn.getAttribute('data-auth-form')).classList.add('active');
        });
    });

    document.getElementById('trigger-forgot-pwd').addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('.auth-pane').forEach(p => p.classList.remove('active'));
        document.getElementById('forgot-pane').classList.add('active');
    });

    document.getElementById('return-login-pane').addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('.auth-pane').forEach(p => p.classList.remove('active'));
        document.getElementById('login-pane').classList.add('active');
    });

    // Authentication Submission Framework Emulations
    document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const inputEmail = e.target.querySelector('input[type="email"]').value;
        const fallbackName = inputEmail.split('@')[0].toUpperCase();
        
        StorageEngine.syncSession({
            firstName: fallbackName,
            lastName: "STORE MEMBER",
            email: inputEmail
        });
        
        alert("Identity authenticated successfully.");
        DOMUpdates.evaluateDashboardAuthState();
    });

    document.getElementById('register-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const f = e.target.querySelectorAll('input');
        StorageEngine.syncSession({
            firstName: f[0].value,
            lastName: f[1].value,
            email: f[2].value
        });
        alert("Secure User profile initialization completely committed.");
        DOMUpdates.evaluateDashboardAuthState();
    });

    document.getElementById('forgot-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert("Token transmission complete. Review access folders within 15 minutes processing loops.");
    });

    document.getElementById('dash-logout-trigger').addEventListener('click', () => {
        StorageEngine.syncSession(null);
        alert("Session terminated securely.");
        DOMUpdates.evaluateDashboardAuthState();
    });

    // Dashboard Internal Local Panel View Sub-Toggles Swapping
    document.querySelectorAll('.dash-menu-links li').forEach(li => {
        if(li.id === 'dash-logout-trigger') return;
        li.addEventListener('click', () => {
            document.querySelectorAll('.dash-menu-links li').forEach(l => l.classList.remove('active'));
            document.querySelectorAll('.dash-sub-pane').forEach(p => p.classList.remove('active'));
            
            li.classList.add('active');
            document.getElementById(li.getAttribute('data-dash-pane')).classList.add('active');
        });
    });

    document.getElementById('dash-settings-form').addEventListener('submit', (e) => {
        e.preventDefault();
        if(AppState.activeUser) {
            AppState.activeUser.firstName = document.getElementById('setting-fname').value;
            AppState.activeUser.lastName = document.getElementById('setting-lname').value;
            StorageEngine.syncSession(AppState.activeUser);
            alert("Database parameters successfully adjusted.");
            DOMUpdates.evaluateDashboardAuthState();
        }
    });

    // Final Order Execution Structural Manifest Processing Engine Block
    document.getElementById('checkout-form-structure').addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Extract field validation inputs values vectors
        const fName = document.getElementById('chk-first-name').value;
        const lName = document.getElementById('chk-last-name').value;
        const phone = document.getElementById('chk-phone').value;
        const email = document.getElementById('chk-email').value;
        const addr = document.getElementById('chk-address').value;
        const city = document.getElementById('chk-city').value;
        
        const method = document.querySelector('input[name="payment_method"]:checked').value;

        // Generate Confirmation Output Mapping Data Structures
        document.getElementById('conf-order-id').innerText = `SS-2026-${Math.floor(10000000 + Math.random() * 90000000)}`;
        document.getElementById('conf-customer-name').innerText = `${fName} ${lName}`;
        document.getElementById('conf-customer-contact').innerText = `${email} | Cell Terminal: ${phone}`;
        document.getElementById('conf-customer-address').innerText = `${addr}, ${city}, Region Matrix Destination`;
        document.getElementById('conf-grand-total').innerText = `Rs. ${AppState._grand.toLocaleString()}`;

        // Populate descriptive internal line summaries array values mapping
        const summaryList = document.getElementById('conf-products-summary-list');
        summaryList.innerHTML = AppState.cart.map(item => `
            <p style="font-size:0.85rem; margin-bottom: 0.25rem;">• ${item.name} (Size ${item.size}) x${item.quantity} -> Sub: Rs. ${(item.price * item.quantity).toLocaleString()}</p>
        `).join('');

        // Wipe localized processing state vectors clean upon final operational execution success loops
        AppState.cart = [];
        StorageEngine.syncCart();

        DOMUpdates.switchView('order-confirmation-view');
    });

    // Intercept static instructional system documentation nodes dialog flows
    document.querySelectorAll('.footer-static-trigger').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const nodeType = trigger.getAttribute('data-static');
            alert(`[System Notice Architecture Logs] Displaying central global guidelines profile manifest node segment for parameter: ${nodeType.toUpperCase()}. All enforcement models strictly run monochrome standard operational practices.`);
        });
    });
}

// Hero Carousel Automated Structural Transits Animation Drivers Engine Loop
function initializeHeroAutoslideEngine() {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    let currentIndex = 0;
    let timer = null;

    function transitionToSlide(idx) {
        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));
        
        slides[idx].classList.add('active');
        dots[idx].classList.add('active');
        currentIndex = idx;
    }

    function launchTimerLoop() {
        timer = setInterval(() => {
            let next = currentIndex + 1;
            if(next >= slides.length) next = 0;
            transitionToSlide(next);
        }, 5000); // 5000ms metric standard system velocity parameters
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(timer);
            transitionToSlide(index);
            launchTimerLoop();
        });
    });

    launchTimerLoop();
}

// System Micro Event Queue Bootstrap Orchestrator Initialization Routine
document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize local cache memories pipelines vectors mappings
    StorageEngine.initLocalState();

    // 2. Hydrate centralized inventory tracking matrix configurations
    executeProductGenerationPipeline();

    // 3. Setup structural DOM view controls and global state interfaces bindings listeners
    DOMUpdates.initViews();
    setupCoreInteractionListeners();

    // 4. Render homepage segments blocks components
    DOMUpdates.renderHomeShowcases();
    DOMUpdates.updateGlobalBadges();

    // 5. Fire ancillary automation systems layers
    initializeHeroAutoslideEngine();

    // 6. Extinguish preloader system animations smoothly
    const preloader = document.getElementById('preloader');
    if(preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
        }, 600);
    }
});