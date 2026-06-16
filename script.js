/**
 * SAVEAN MOVIES - Core Engineering Client Application Script
 * Orchestrates Single Page Application (SPA) routing, UI hydration, State machines,
 * custom video player mechanics, search algorithms, and data structures.
 */

// Global Immutable/Mutable State Store
const STATE = {
    currentProfile: "Alex",
    currentPage: "home",
    myList: [1, 3],
    watchHistory: [2],
    searchFilter: { query: "", genre: "all", year: "all", rating: "all" },
    movies: [
        { id: 1, title: "Interstellar Horizon", type: "movie", category: "Sci-Fi", rating: "9.2", year: "2024", duration: "2h 49m", desc: "A team of explorers travel beyond this galaxy to discover whether mankind has a future among the stars.", banner: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80", poster: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80", trending: true, popular: true, topRated: true },
        { id: 2, title: "The Midnight Conjuring", type: "movie", category: "Horror", rating: "7.8", year: "2023", duration: "1h 52m", desc: "Paranormal investigators work to track down a dark presence terrfying a secluded farmhouse family.", banner: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=1200&q=80", poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=400&q=80", trending: true, popular: false, topRated: false },
        { id: 3, title: "Cyberpunk 2099", type: "series", category: "Sci-Fi", rating: "8.9", year: "2025", duration: "1 Season", desc: "In a dystopian metropolis controlled by tech conglomerates, a street merc mercenary seeks an unfindable cyber-implant.", banner: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80", poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80", trending: false, popular: true, topRated: true },
        { id: 4, title: "Chronicles of Olympus", type: "movie", category: "Action", rating: "8.5", year: "2024", duration: "2h 15m", desc: "The ancient mythological war is reignited in a modern metropolis as old deities walk among humans.", banner: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80", poster: "https://images.unsplash.com/photo-1533928298208-27ff66555d8d?auto=format&fit=crop&w=400&q=80", trending: false, popular: true, topRated: false },
        { id: 5, title: "The Stand-Up Trial", type: "movie", category: "Comedy", rating: "7.2", year: "2022", duration: "1h 38m", desc: "A washed-up comedian accidentally becomes the lead defense attorney in a global high profile corporate scandal.", banner: "https://images.unsplash.com/photo-1514306191717-452ec28c7814?auto=format&fit=crop&w=1200&q=80", poster: "https://images.unsplash.com/photo-1585647347483-22b66260dfff?auto=format&fit=crop&w=400&q=80", trending: true, popular: false, topRated: true }
    ],
    reviews: [
        { user: "MarcusV", rating: "10/10", text: "Absolute masterpiece. Visually arresting and emotionally deep." },
        { user: "Elena_K", rating: "8/10", text: "Incredible production value, though pacing drags slightly in act 2." }
    ]
};

// Application Global Inits
document.addEventListener("DOMContentLoaded", () => {
    initRouting();
    initGlobalUIElements();
    initCustomPlayerControls();
    renderPage("home"); // Init base layout mount
    showToast("Welcome back to SAVEAN MOVIES!");
});

/* ==========================================================================
   SPA ROUTING SYSTEM ENGINE
   ========================================================================== */
function initRouting() {
    // Intercept clicks on structural elements bound with data-page attributes
    document.body.addEventListener("click", (e) => {
        const target = e.target.closest("[data-page]");
        if (target) {
            e.preventDefault();
            const page = target.getAttribute("data-page");
            
            // Sync side nav states
            document.querySelectorAll(".nav-item").forEach(el => el.classList.remove("active"));
            const currentNavMatch = document.querySelector(`.nav-item[data-page="${page}"]`);
            if (currentNavMatch) currentNavMatch.classList.add("active");

            renderPage(page);
        }
    });

    // Device Responsive Hamburgers Toggle Linkage
    const sidebar = document.getElementById("sidebar");
    document.getElementById("sidebarToggle").addEventListener("click", () => {
        sidebar.classList.toggle("mobile-open");
    });
}

function renderPage(pageKey) {
    STATE.currentPage = pageKey;
    const container = document.getElementById("pageContent");
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Enforce layout view assembly matrix
    switch (pageKey) {
        case "home":
            container.innerHTML = generateHomeView();
            startHeroBannerLoop();
            break;
        case "movies":
            container.innerHTML = generateCatalogView("Movies Only Catalog", m => m.type === "movie");
            break;
        case "tv-shows":
            container.innerHTML = generateCatalogView("Premium TV Series", m => m.type === "series");
            break;
        case "trending":
            container.innerHTML = generateCatalogView("Fire & Trending Right Now", m => m.trending);
            break;
        case "my-list":
            container.innerHTML = generateCatalogView("Your Watchlist Backlog", m => STATE.myList.includes(m.id));
            break;
        case "history":
            container.innerHTML = generateCatalogView("Your Streaming Consumption History", m => STATE.watchHistory.includes(m.id));
            break;
        case "profile":
            container.innerHTML = generateProfileManagementView();
            break;
        case "subscription":
            container.innerHTML = generateSubscriptionPlansView();
            break;
        case "settings":
            container.innerHTML = generateSettingsView();
            break;
        case "admin":
            container.innerHTML = generateAdminDashboardView();
            break;
        case "login":
            container.innerHTML = generateAuthView(true);
            break;
        case "signup":
            container.innerHTML = generateAuthView(false);
            break;
        default:
            if (pageKey.startsWith("detail-")) {
                const id = parseInt(pageKey.split("-")[1]);
                container.innerHTML = generateMovieDetailsView(id);
            } else if (pageKey === "search-results") {
                container.innerHTML = generateSearchView();
            }
    }
}

/* ==========================================================================
   VIEW TEMPLATE COMPILERS (HYBRID DATA INJECTIONS)
   ========================================================================== */
function generateHomeView() {
    // Dynamic generation with multi-shelf support
    return `
        <div class="hero-banner" id="heroBannerFrame"></div>

        <section class="movie-shelf">
            <h3 class="shelf-title">Trending Now <i class="fa-solid fa-fire accent-text"></i></h3>
            <div class="shelf-cards-container">
                ${renderMovieCardsArray(STATE.movies.filter(m => m.trending))}
            </div>
        </section>

        <section class="movie-shelf">
            <h3 class="shelf-title">Popular on SAVEAN</h3>
            <div class="shelf-cards-container">
                ${renderMovieCardsArray(STATE.movies.filter(m => m.popular))}
            </div>
        </section>

        <section class="movie-shelf">
            <h3 class="shelf-title">Top Rated Masterpieces</h3>
            <div class="shelf-cards-container">
                ${renderMovieCardsArray(STATE.movies.filter(m => m.topRated))}
            </div>
        </section>

        <section class="movie-shelf">
            <h3 class="shelf-title">Sci-Fi Realism</h3>
            <div class="shelf-cards-container">
                ${renderMovieCardsArray(STATE.movies.filter(m => m.category === "Sci-Fi"))}
            </div>
        </section>
    `;
}

function generateCatalogView(title, filterFunction) {
    const matched = STATE.movies.filter(filterFunction);
    return `
        <h2 style="margin-bottom: 2rem; font-weight:800; font-size:2rem;">${title}</h2>
        <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap:2rem;">
            ${matched.length ? renderMovieCardsArray(matched) : '<p style="color:var(--text-muted)">No media assets cataloged in this matrix tier yet.</p>'}
        </div>
    `;
}

function renderMovieCardsArray(movieArray) {
    return movieArray.map(m => `
        <div class="movie-card" onclick="renderPage('detail-${m.id}')">
            <img src="${m.poster}" alt="${m.title}" loading="lazy">
            <div class="card-details-overlay">
                <h4 class="card-title">${m.title}</h4>
                <div class="card-meta">
                    <span>${m.year}</span>
                    <span class="rating-pill">${m.rating}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function generateMovieDetailsView(id) {
    const movie = STATE.movies.find(m => m.id === id);
    if (!movie) return `<p>Asset Not Found.</p>`;
    
    const isInList = STATE.myList.includes(movie.id);

    return `
        <div class="details-view-hero" style="background-image: linear-gradient(to bottom, rgba(5,17,31,0.2), var(--bg-deep-midnight)), url('${movie.banner}');">
            <div style="position:absolute; bottom:2rem; left:2rem; max-width:700px;">
                <span style="background:var(--accent-blue); padding:4px 12px; border-radius:20px; font-size:0.8rem; font-weight:700;">${movie.category}</span>
                <h1 style="font-size:3.5rem; font-weight:800; margin:1rem 0;">${movie.title}</h1>
                <div class="hero-meta">
                    <span>${movie.year}</span>
                    <span>${movie.duration}</span>
                    <span style="color:#FCD34D;"><i class="fa-solid fa-star"></i> ${movie.rating}</span>
                </div>
                <p style="margin-bottom:2rem; line-height:1.6; color:#D1D5DB;">${movie.desc}</p>
                <div class="hero-btns">
                    <button class="btn-primary" onclick="launchVideoPlayer('${movie.title}')"><i class="fa-solid fa-play"></i> Watch Now</button>
                    <button class="btn-secondary" onclick="toggleWatchlist(${movie.id})">
                        <i class="fa-solid ${isInList ? 'fa-check' : 'fa-plus'}"></i> ${isInList ? 'In Watchlist' : 'Add to List'}
                    </button>
                </div>
            </div>
        </div>

        <div class="details-split-layout">
            <div>
                <h3 style="font-size:1.4rem; margin-bottom:1rem;">Production Cinematic Trailer</h3>
                <div style="width:100%; height:300px; background:var(--bg-navy); border:1px solid var(--glass-border); border-radius:12px; display:grid; place-items:center;">
                    <button class="btn-secondary" onclick="launchVideoPlayer('${movie.title} [TRAILER]')"><i class="fa-solid fa-play"></i> Play Embedded Trailer Stream</button>
                </div>
            </div>
            <div>
                <h3 style="font-size:1.4rem; margin-bottom:1rem;">Top Billing Cast</h3>
                <div class="cast-grid">
                    <div class="cast-member">
                        <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80">
                        <div><strong>Christian Bale</strong><p style="font-size:0.8rem; color:var(--text-muted)">Lead Protagonist</p></div>
                    </div>
                    <div class="cast-member">
                        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80">
                        <div><strong>Jessica Chastain</strong><p style="font-size:0.8rem; color:var(--text-muted)">Commander</p></div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function generateSearchView() {
    return `
        <h2 style="margin-bottom:1.5rem;">Search Analytics Viewport</h2>
        <div style="display:flex; gap:1rem; margin-bottom:2.5rem; flex-wrap:wrap;">
            <select class="btn-secondary" id="filterGenre" onchange="applySearchFilters()">
                <option value="all">All Genres</option>
                <option value="Sci-Fi">Sci-Fi</option>
                <option value="Horror">Horror</option>
                <option value="Action">Action</option>
                <option value="Comedy">Comedy</option>
            </select>
            <select class="btn-secondary" id="filterYear" onchange="applySearchFilters()">
                <option value="all">All Release Years</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
            </select>
        </div>
        <div id="searchResultsGrid" style="display:grid; grid-template-columns:repeat(auto-fill,minmax(200px,1fr)); gap:2rem;">
            </div>
    `;
}

function generateProfileManagementView() {
    return `
        <h2 style="text-align:center; margin-bottom:3rem; font-size:2rem;">Who's Streaming on SAVEAN?</h2>
        <div style="display:flex; justify-content:center; gap:3rem; flex-wrap:wrap;">
            <div style="text-align:center; cursor:pointer;" onclick="selectProfile('Alex')">
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80" style="width:120px; height:120px; border-radius:50%; border:4px solid var(--accent-blue);">
                <h4 style="margin-top:1rem; font-size:1.2rem;">Alex</h4>
            </div>
            <div style="text-align:center; cursor:pointer;" onclick="selectProfile('Sarah')">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80" style="width:120px; height:120px; border-radius:50%; border:4px solid transparent;">
                <h4 style="margin-top:1rem; font-size:1.2rem; color:var(--text-muted)">Sarah</h4>
            </div>
        </div>
    `;
}

function generateSubscriptionPlansView() {
    return `
        <h2 style="text-align:center; font-size:2.2rem;">Select Your Tier Level</h2>
        <p style="text-align:center; color:var(--text-muted); margin-bottom:3rem;">Futuristic cinematic features unlocked immediately</p>
        <div class="plans-matrix">
            <div class="plan-card">
                <h3>Standard Plan</h3>
                <div class="plan-price">$9.99<span style="font-size:1rem">/mo</span></div>
                <ul class="plan-features"><li>1080p Standard Streaming</li><li>2 Active Pipelines</li><li>Ad-Supported Breaks</li></ul>
                <button class="btn-secondary" style="width:100%" onclick="showToast('Subscribed to Standard Tier')">Downgrade/Select</button>
            </div>
            <div class="plan-card premium-tier">
                <h3>SAVEAN Ultra Max</h3>
                <div class="plan-price">$19.99<span style="font-size:1rem">/mo</span></div>
                <ul class="plan-features"><li>4K HDR Quantum Streaming</li><li>Spatial Atmos Pipelines</li><li>Unlimited Offline Downloads</li><li>Zero Advertising Arrays</li></ul>
                <button class="btn-primary" style="width:100%" onclick="showToast('Subscribed to Ultra Max Tier')">Upgrade / Maintain Tier</button>
            </div>
        </div>
    `;
}

function generateSettingsView() {
    return `
        <h2 style="margin-bottom:2rem">Account Engine Configurations</h2>
        <div class="settings-section">
            <h3>Playback Profiles</h3>
            <div class="settings-row"><div><strong>Auto-Buffering Priority</strong><p style="font-size:0.85rem; color:var(--text-muted)">Force peak bitrate immediately</p></div><input type="checkbox" checked></div>
            <div class="settings-row"><div><strong>Atmos Dynamic Passthrough</strong><p style="font-size:0.85rem; color:var(--text-muted)">Bypass default operating hardware rendering</p></div><input type="checkbox"></div>
        </div>
        <div class="settings-section">
            <h3>Security Parameters</h3>
            <div class="settings-row"><button class="btn-secondary" onclick="showToast('Hardware Session Vector Cleared')">Kill Active Auxiliary Hardware Sessions</button></div>
        </div>
    `;
}

function generateAuthView(isLogin) {
    return `
        <div class="auth-wrapper">
            <h2>${isLogin ? 'Sign In' : 'Create Account'}</h2>
            <form onsubmit="handleAuthTransaction(event, ${isLogin})">
                <input type="email" placeholder="Email Pipeline Architecture" class="btn-secondary" style="border-radius:8px; padding:1rem;" required>
                <input type="password" placeholder="Cryptographic Access Pin" class="btn-secondary" style="border-radius:8px; padding:1rem;" required>
                <button type="submit" class="btn-primary" style="justify-content:center; padding:1rem;">${isLogin ? 'Unlock Account' : 'Initialize Profile Matrix'}</button>
            </form>
            <p style="text-align:center; margin-top:1.5rem; font-size:0.9rem; color:var(--text-muted)">
                ${isLogin ? 'New to SAVEAN? <a href="#" data-page="signup" style="color:var(--accent-blue)">Initialize Here</a>' : 'Possess access parameters? <a href="#" data-page="login" style="color:var(--accent-blue)">Log In Here</a>'}
            </p>
        </div>
    `;
}

/* ==========================================================================
   ADMINISTRATOR DASHBOARD GRAPHICS ENGINE
   ========================================================================== */
function generateAdminDashboardView() {
    return `
        <h2 style="margin-bottom:2rem;"><i class="fa-solid fa-lock-open accent-text"></i> Admin Operations Grid Panel</h2>
        <div class="admin-grid">
            <div class="stat-card"><i class="fa-solid fa-users stat-icon"></i><div><h3>14,892</h3><p style="color:var(--text-muted)">Active Sockets</p></div></div>
            <div class="stat-card"><i class="fa-solid fa-dollar-sign stat-icon"></i><div><h3>$42,105</h3><p style="color:var(--text-muted)">Monthly Vector Net</p></div></div>
            <div class="stat-card"><i class="fa-solid fa-server stat-icon"></i><div><h3>0.04ms</h3><p style="color:var(--text-muted)">Query Latency</p></div></div>
        </div>

        <div class="admin-split">
            <div>
                <h3>Inject New Movie Asset Vector</h3>
                <form class="crud-form" onsubmit="handleAdminInsert(event)">
                    <input type="text" id="adminTitle" placeholder="Movie Title Name" required>
                    <input type="text" id="adminCategory" placeholder="Genre Cluster Label" required>
                    <input type="text" id="adminRating" placeholder="Rating Matrix (e.g. 8.7)" required>
                    <input type="text" id="adminYear" placeholder="Release Year Vector" required>
                    <textarea id="adminDesc" placeholder="Text Descriptions Summary Matrix..." rows="3" required></textarea>
                    <button type="submit" class="btn-primary"><i class="fa-solid fa-plus"></i> Inject Into Production Mainframe</button>
                </form>
            </div>
            <div>
                <h3>Active Global Movie Mainframe Log</h3>
                <div style="background:var(--glass-bg); padding:1rem; border-radius:16px; border:1px solid var(--glass-border); max-height:350px; overflow-y:auto;" id="adminMovieTracker">
                    ${STATE.movies.map(m => `
                        <div style="display:flex; justify-content:between; align-items:center; padding:0.75rem 0; border-bottom:1px solid var(--glass-border);">
                            <div><strong>${m.title}</strong><p style="font-size:0.8rem; color:var(--text-muted)">${m.category} | ${m.year}</p></div>
                            <button class="btn-secondary" style="padding:0.4rem 0.8rem; font-size:0.8rem; margin-left:auto; background:rgba(239,68,68,0.2); color:#EF4444;" onclick="deleteMovieAssetVector(${m.id})">Wipe</button>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

function handleAdminInsert(e) {
    e.preventDefault();
    const newMovie = {
        id: STATE.movies.length + 1,
        title: document.getElementById("adminTitle").value,
        category: document.getElementById("adminCategory").value,
        rating: document.getElementById("adminRating").value,
        year: document.getElementById("adminYear").value,
        desc: document.getElementById("adminDesc").value,
        type: "movie",
        duration: "2h 10m",
        banner: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80",
        poster: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80",
        trending: true, popular: false, topRated: false
    };
    STATE.movies.push(newMovie);
    renderPage("admin");
    showToast(`Asset "${newMovie.title}" successfully compiled!`);
}

window.deleteMovieAssetVector = function(id) {
    STATE.movies = STATE.movies.filter(m => m.id !== id);
    renderPage("admin");
    showToast("Movie asset purged from local cluster.");
};

/* ==========================================================================
   GLOBAL SEARCH & SYSTEM UI INTEGRATION
   ========================================================================== */
function initGlobalUIElements() {
    // Interactive Dynamic Live Substring Search Engine
    const searchInput = document.getElementById("globalSearch");
    const suggestionBox = document.getElementById("searchSuggestions");

    searchInput.addEventListener("input", (e) => {
        const value = e.target.value.toLowerCase().trim();
        if (!value) { suggestionBox.style.display = "none"; return; }

        const matches = STATE.movies.filter(m => m.title.toLowerCase().includes(value) || m.category.toLowerCase().includes(value));
        if (matches.length > 0) {
            suggestionBox.innerHTML = matches.map(m => `<div class="suggestion-item" data-id="${m.id}">${m.title} <span style="font-size:0.75rem; color:var(--text-muted)">(${m.category})</span></div>`).join('');
            suggestionBox.style.display = "block";
        } else {
            suggestionBox.innerHTML = `<div class="suggestion-item">No records found matching vector</div>`;
            suggestionBox.style.display = "block";
        }
    });

    suggestionBox.addEventListener("click", (e) => {
        const item = e.target.closest(".suggestion-item");
        if (item && item.dataset.id) {
            suggestionBox.style.display = "none";
            searchInput.value = "";
            renderPage(`detail-${item.dataset.id}`);
        }
    });

    // Close overlays on exterior bounds click
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".search-wrapper")) suggestionBox.style.display = "none";
        if (!e.target.closest(".notification-dropdown")) document.getElementById("notiPanel").classList.remove("show");
        if (!e.target.closest(".profile-menu-wrapper")) document.getElementById("profilePanel").classList.remove("show");
    });

    // Toggle Dropdown panels UI
    document.getElementById("notiBtn").addEventListener("click", () => document.getElementById("notiPanel").classList.toggle("show"));
    document.getElementById("profileDropdownBtn").addEventListener("click", () => document.getElementById("profilePanel").classList.toggle("show"));

    // Micro Engine Profile Context Switcher
    document.querySelectorAll(".switch-profile-action").forEach(el => {
        el.addEventListener("click", (e) => {
            e.preventDefault();
            const prof = el.getAttribute("data-profile");
            STATE.currentProfile = prof;
            document.getElementById("navProfileName").innerText = prof;
            if (prof === "Sarah") {
                document.getElementById("navAvatar").src = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80";
            } else {
                document.getElementById("navAvatar").src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80";
            }
            showToast(`Switched pipeline context to: ${prof}`);
            renderPage("home");
        });
    });

    // Native Voice Recognition API Bridge Adaptation Loop
    const voiceBtn = document.getElementById("voiceSearchBtn");
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
        const recog = new SpeechRecognition();
        voiceBtn.addEventListener("click", () => {
            recog.start();
            showToast("Listening to audio pipeline input vector...");
        });
        recog.onresult = (event) => {
            const resultText = event.results[0][0].transcript;
            searchInput.value = resultText;
            searchInput.dispatchEvent(new Event('input'));
        };
    } else {
        voiceBtn.style.display = "none";
    }
}

/* ==========================================================================
   PRODUCTION CUSTOM PLAYER CONTROL CONTROLLER MECHANICS
   ========================================================================== */
function initCustomPlayerControls() {
    const video = document.getElementById("mainVideo");
    const modal = document.getElementById("videoPlayerModal");
    const playPauseBtn = document.getElementById("playPauseBtn");
    const progressArea = document.getElementById("progressArea");
    const currentProgress = document.querySelector(".current-progress");
    const bufferedProgress = document.querySelector(".buffered-progress");
    const volumeSlider = document.getElementById("volumeSlider");
    const muteBtn = document.getElementById("muteBtn");
    const fullscreenBtn = document.getElementById("fullscreenBtn");
    const currentTimeText = document.getElementById("currentTime");
    const durationTimeText = document.getElementById("durationTime");

    window.launchVideoPlayer = function(title) {
        document.getElementById("playerMovieTitle").innerText = title;
        modal.classList.add("active");
        video.play().catch(() => {});
        playPauseBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
        showToast(`Streaming tunnel opened: ${title}`);
        
        // Simulating intro sequence tracking logic flag
        const skipIntroBtn = document.getElementById("skipIntroBtn");
        skipIntroBtn.classList.remove("hidden");
        setTimeout(() => skipIntroBtn.classList.add("hidden"), 7000);
    };

    document.getElementById("closePlayerBtn").addEventListener("click", () => {
        video.pause();
        modal.classList.remove("active");
    });

    document.getElementById("skipIntroBtn").addEventListener("click", () => {
        video.currentTime = 30; // Fast skip forward 30 seconds
        document.getElementById("skipIntroBtn").classList.add("hidden");
        showToast("Intro stream bypassed.");
    });

    // Core Player state controls mechanics wrappers
    const togglePlay = () => {
        if (video.paused) { video.play(); playPauseBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`; }
        else { video.pause(); playPauseBtn.innerHTML = `<i class="fa-solid fa-play"></i>`; }
    };
    playPauseBtn.addEventListener("click", togglePlay);
    video.addEventListener("click", togglePlay);

    // Track Time and Update Scrubber Track
    video.addEventListener("timeupdate", () => {
        const percent = (video.currentTime / video.duration) * 100;
        currentProgress.style.width = `${percent}%`;
        currentTimeText.innerText = formatTimeLayout(video.currentTime);
        
        // Buffer metrics tracking logic
        if (video.buffered.length) {
            const bufPercent = (video.buffered.end(0) / video.duration) * 100;
            bufferedProgress.style.width = `${bufPercent}%`;
        }
    });

    video.addEventListener("loadedmetadata", () => {
        durationTimeText.innerText = formatTimeLayout(video.duration);
    });

    // Rewind / Fast Forward Control Links
    document.getElementById("rewindBtn").addEventListener("click", () => video.currentTime -= 10);
    document.getElementById("forwardBtn").addEventListener("click", () => video.currentTime += 10);

    // Audio mixing controls
    volumeSlider.addEventListener("input", (e) => {
        video.volume = e.target.value;
        video.muted = (video.volume === 0);
        muteBtn.innerHTML = video.muted ? `<i class="fa-solid fa-volume-xmark"></i>` : `<i class="fa-solid fa-volume-high"></i>`;
    });
    muteBtn.addEventListener("click", () => {
        video.muted = !video.muted;
        muteBtn.innerHTML = video.muted ? `<i class="fa-solid fa-volume-xmark"></i>` : `<i class="fa-solid fa-volume-high"></i>`;
    });

    // Advanced dynamic playback controls selector loops
    document.getElementById("speedBtn").addEventListener("click", (e) => {
        const currents = [1.0, 1.25, 1.5, 2.0];
        let idx = currents.indexOf(video.playbackRate);
        let nextIdx = (idx + 1) % currents.length;
        video.playbackRate = currents[nextIdx];
        e.target.innerText = `${video.playbackRate}x`;
    });

    document.getElementById("qualityBtn").addEventListener("click", (e) => {
        const options = ["4K", "1080p", "720p"];
        let nextOpt = options[(options.indexOf(e.target.innerText) + 1) % options.length];
        e.target.innerText = nextOpt;
        showToast(`Video channel rendering prioritized to ${nextOpt}`);
    });

    // Scrubbing calculation handler logic
    progressArea.addEventListener("click", (e) => {
        const bounds = progressArea.getBoundingClientRect();
        const clickX = e.clientX - bounds.left;
        video.currentTime = (clickX / bounds.width) * video.duration;
    });

    // Standard Fullscreen Layer Hook
    fullscreenBtn.addEventListener("click", () => {
        if (!document.fullscreenElement) document.getElementById("videoContainer").requestFullscreen();
        else document.exitFullscreen();
    });

    // Engineering global hotkey matrices listener rules mapping
    window.addEventListener("keydown", (e) => {
        if (!modal.classList.contains("active")) return;
        if (e.code === "Space") { e.preventDefault(); togglePlay(); }
        if (e.code === "ArrowLeft") video.currentTime -= 5;
        if (e.code === "ArrowRight") video.currentTime += 5;
        if (e.code === "Escape") { modal.classList.remove("active"); video.pause(); }
    });
}

/* ==========================================================================
   UTILITY HELPER ALGORITHMS
   ========================================================================== */
function formatTimeLayout(seconds) {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
}

window.toggleWatchlist = function(id) {
    const idx = STATE.myList.indexOf(id);
    if (idx > -1) { STATE.myList.splice(idx, 1); showToast("Asset purged from Your Watchlist."); }
    else { STATE.myList.push(id); showToast("Asset cached inside Your Watchlist."); }
    renderPage(`detail-${id}`);
};

window.showToast = function(message) {
    const box = document.getElementById("toastContainer");
    const el = document.createElement("div");
    el.className = "toast";
    el.innerText = message;
    box.appendChild(el);
    setTimeout(() => el.remove(), 4000);
};

// Continuous Hero Banner Carousel Interceptor Slider loop Engine
let heroIndex = 0;
let loopId = null;
function startHeroBannerLoop() {
    if (loopId) clearInterval(loopId);
    const bannerFrame = document.getElementById("heroBannerFrame");
    if (!bannerFrame) return;

    const renderHeroFrame = () => {
        const item = STATE.movies[heroIndex];
        bannerFrame.innerHTML = `
            <div class="hero-overlay">
                <span style="background:var(--accent-blue); padding:4px 12px; border-radius:20px; font-size:0.8rem; font-weight:700; width:fit-content; margin-bottom:1rem;">FEATURED HIT</span>
                <h1 class="hero-title">${item.title}</h1>
                <div class="hero-meta"><span>${item.year}</span><span>${item.duration}</span><span style="color:#FCD34D;"><i class="fa-solid fa-star"></i> ${item.rating}</span></div>
                <p class="hero-desc">${item.desc}</p>
                <div class="hero-btns">
                    <button class="btn-primary" onclick="launchVideoPlayer('${item.title}')"><i class="fa-solid fa-play"></i> Stream Now</button>
                    <button class="btn-secondary" onclick="renderPage('detail-${item.id}')"><i class="fa-solid fa-circle-info"></i> View Details</button>
                </div>
            </div>
        `;
        bannerFrame.style.backgroundImage = `url('${item.banner}')`;
        heroIndex = (heroIndex + 1) % STATE.movies.length;
    };

    renderHeroFrame();
    loopId = setInterval(renderHeroFrame, 7000); // Transitions seamlessly every 7 seconds
}

window.handleAuthTransaction = function(e, isLogin) {
    e.preventDefault();
    showToast(isLogin ? "Session token assigned successfully." : "Profile parameters committed to node.");
    renderPage("home");
};