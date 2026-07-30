/* ==========================================================================
   CHIC! MVP APPLICATION STATE, ROUTER & BUSINESS LOGIC
   Handles SPA routes, LocalStorage persistence, seed data, interactive simulator,
   customizable stores, chat simulator, and toast notification system.
   ========================================================================== */

// --- Dynamic Vector SVG Clothes Generator (Data URL) ---
function generateClothingSVG(category, color1, color2) {
    let svgContent = '';
    const defs = `
        <defs>
            <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="${color1}" />
                <stop offset="100%" stop-color="${color2}" />
            </linearGradient>
        </defs>
    `;

    switch (category) {
        case 'Camisas':
            svgContent = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 120">
                    ${defs}
                    <rect width="100" height="120" fill="#121a2e" opacity="0.1"/>
                    <path d="M 30,20 L 40,28 L 50,20 L 60,28 L 70,20 L 92,38 L 80,58 L 75,53 L 75,100 L 25,100 L 25,53 L 20,58 L 8,38 Z" fill="url(#g)" stroke="rgba(255,255,255,0.15)" stroke-width="1.5"/>
                    <circle cx="50" cy="45" r="2.5" fill="rgba(255,255,255,0.3)"/>
                    <circle cx="50" cy="60" r="2.5" fill="rgba(255,255,255,0.3)"/>
                    <circle cx="50" cy="75" r="2.5" fill="rgba(255,255,255,0.3)"/>
                </svg>
            `;
            break;
        case 'Vestidos':
            svgContent = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 120">
                    ${defs}
                    <rect width="100" height="120" fill="#121a2e" opacity="0.1"/>
                    <path d="M 35,20 C 45,26 55,26 65,20 L 72,35 L 62,45 L 80,105 L 20,105 L 38,45 L 28,35 Z" fill="url(#g)" stroke="rgba(255,255,255,0.15)" stroke-width="1.5"/>
                    <line x1="20" y1="105" x2="80" y2="105" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
                </svg>
            `;
            break;
        case 'Casacos':
            svgContent = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 120">
                    ${defs}
                    <rect width="100" height="120" fill="#121a2e" opacity="0.1"/>
                    <path d="M 25,20 L 50,30 L 75,20 L 92,42 L 80,62 L 75,57 L 75,100 L 25,100 L 25,57 L 20,62 L 8,42 Z" fill="url(#g)" stroke="rgba(255,255,255,0.15)" stroke-width="1.5"/>
                    <path d="M 50,30 L 50,100" stroke="rgba(255,255,255,0.25)" stroke-width="2" stroke-dasharray="2,3"/>
                    <rect x="30" y="45" width="12" height="14" rx="2" fill="rgba(0,0,0,0.15)"/>
                    <rect x="58" y="45" width="12" height="14" rx="2" fill="rgba(0,0,0,0.15)"/>
                </svg>
            `;
            break;
        case 'Calças':
            svgContent = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 120">
                    ${defs}
                    <rect width="100" height="120" fill="#121a2e" opacity="0.1"/>
                    <path d="M 30,15 L 70,15 L 76,105 L 56,105 L 50,55 L 44,105 L 24,105 Z" fill="url(#g)" stroke="rgba(255,255,255,0.15)" stroke-width="1.5"/>
                    <line x1="30" y1="24" x2="70" y2="24" stroke="rgba(0,0,0,0.2)" stroke-width="2"/>
                </svg>
            `;
            break;
        case 'Calçados':
            svgContent = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 120">
                    ${defs}
                    <rect width="100" height="120" fill="#121a2e" opacity="0.1"/>
                    <path d="M 18,72 L 44,72 C 48,58 58,54 78,68 L 78,86 C 78,91 74,96 68,96 L 18,96 C 13,96 13,72 18,72 Z" fill="url(#g)" stroke="rgba(255,255,255,0.15)" stroke-width="1.5"/>
                    <path d="M 18,90 L 78,90" stroke="rgba(0,0,0,0.3)" stroke-width="3"/>
                    <line x1="32" y1="78" x2="38" y2="84" stroke="rgba(255,255,255,0.4)" stroke-width="1.5"/>
                    <line x1="42" y1="78" x2="48" y2="84" stroke="rgba(255,255,255,0.4)" stroke-width="1.5"/>
                </svg>
            `;
            break;
        case 'Acessórios':
        default:
            svgContent = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 120">
                    ${defs}
                    <rect width="100" height="120" fill="#121a2e" opacity="0.1"/>
                    <rect x="25" y="45" width="50" height="40" rx="8" fill="url(#g)" stroke="rgba(255,255,255,0.15)" stroke-width="1.5"/>
                    <path d="M 35,45 C 35,28 65,28 65,45" fill="none" stroke="url(#g)" stroke-width="4"/>
                    <path d="M 45,65 L 55,65" stroke="rgba(0,0,0,0.2)" stroke-width="2"/>
                </svg>
            `;
            break;
    }
    
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svgContent.trim());
}

// --- Seed Data para Inicialização ---
const seedUsers = [
    { id: 'usr-1', name: 'Alice Brechó', email: 'alice@chic.com', password: 'password', bio: 'Moda vintage dos anos 90 e Y2K. Todas as peças higienizadas e prontas para reuso!', bannerColor: 'gradient-gold' },
    { id: 'usr-2', name: 'Eco Chic Co.', email: 'eco@chic.com', password: 'password', bio: 'Incentivando a economia circular e a sustentabilidade no dia-a-dia. Doando e vendendo!', bannerColor: 'gradient-emerald' },
    { id: 'usr-3', name: 'Bruno Guarda-Roupa', email: 'bruno@chic.com', password: 'password', bio: 'Desapegando do que não serve mais. Roupas masculinas e unissex.', bannerColor: 'gradient-navy' }
];

const seedProducts = [
    {
        id: 'prod-1',
        title: 'Jaqueta Bomber Vintage Y2K',
        description: 'Jaqueta bomber vintage super conservada, tecido encorpado com forro interno macio. Ideal para o inverno e dias frios. Pouquíssimo usada.',
        category: 'Casacos',
        size: 'G',
        type: 'venda',
        price: 180.00,
        image: generateClothingSVG('Casacos', '#4f46e5', '#3730a3'),
        sellerId: 'usr-1',
        sellerName: 'Alice Brechó',
        createdAt: '2026-07-28T14:30:00.000Z'
    },
    {
        id: 'prod-2',
        title: 'Vestido Floral de Algodão',
        description: 'Vestido leve floral 100% algodão orgânico, perfeito para o verão ou dias ensolarados. Alças reguláveis e caimento perfeito.',
        category: 'Vestidos',
        size: 'M',
        type: 'venda',
        price: 85.00,
        image: generateClothingSVG('Vestidos', '#10b981', '#059669'),
        sellerId: 'usr-1',
        sellerName: 'Alice Brechó',
        createdAt: '2026-07-29T10:00:00.000Z'
    },
    {
        id: 'prod-3',
        title: 'Calça Jeans Slim Fit Unissex',
        description: 'Estou doando essa calça jeans slim fit pois não serve mais em mim. O zíper está funcionando perfeitamente, sem rasgos.',
        category: 'Calças',
        size: 'P',
        type: 'doacao',
        price: 0,
        image: generateClothingSVG('Calças', '#2563eb', '#1d4ed8'),
        sellerId: 'usr-2',
        sellerName: 'Eco Chic Co.',
        createdAt: '2026-07-27T08:15:00.000Z'
    },
    {
        id: 'prod-4',
        title: 'Camiseta Básica de Algodão Egípcio',
        description: 'Camiseta de ótima qualidade na cor marrom terra. Super confortável e versátil.',
        category: 'Camisas',
        size: 'M',
        type: 'venda',
        price: 49.90,
        image: generateClothingSVG('Camisas', '#d97706', '#b45309'),
        sellerId: 'usr-3',
        sellerName: 'Bruno Guarda-Roupa',
        createdAt: '2026-07-29T16:45:00.000Z'
    },
    {
        id: 'prod-5',
        title: 'Tênis Running Casual',
        description: 'Tênis super confortável para corridas diárias ou uso casual. Leves marcas de uso na sola, mas excelente estado geral.',
        category: 'Calçados',
        size: 'GG', // Representa tamanho 42 no mock
        type: 'venda',
        price: 120.00,
        image: generateClothingSVG('Calçados', '#ec4899', '#db2777'),
        sellerId: 'usr-3',
        sellerName: 'Bruno Guarda-Roupa',
        createdAt: '2026-07-26T12:00:00.000Z'
    },
    {
        id: 'prod-6',
        title: 'Óculos de Sol Vintage Redondo',
        description: 'Lindo óculos de sol com armação dourada retrô. Sem arranhões nas lentes.',
        category: 'Acessórios',
        size: 'PP', // tamanho único
        type: 'doacao',
        price: 0,
        image: generateClothingSVG('Acessórios', '#8b5cf6', '#6d28d9'),
        sellerId: 'usr-2',
        sellerName: 'Eco Chic Co.',
        createdAt: '2026-07-29T20:10:00.000Z'
    }
];

const seedChats = [
    {
        id: 'chat-1',
        productId: 'prod-3',
        productTitle: 'Calça Jeans Slim Fit Unissex',
        productPrice: 'Doação',
        productImg: generateClothingSVG('Calças', '#2563eb', '#1d4ed8'),
        partnerId: 'usr-2',
        partnerName: 'Eco Chic Co.',
        messages: [
            { senderId: 'usr-2', text: 'Olá! A calça jeans ainda está disponível para doação.', timestamp: '2026-07-29T11:00:00.000Z' },
            { senderId: 'usr-guest', text: 'Olá, tenho interesse! Onde posso retirar?', timestamp: '2026-07-29T11:05:00.000Z' },
            { senderId: 'usr-2', text: 'Estou na zona sul, perto da estação de metrô. Podemos combinar amanhã à tarde.', timestamp: '2026-07-29T11:07:00.000Z' }
        ]
    }
];

// --- App State Controller ---
class ChicApp {
    constructor() {
        this.initDatabase();
        this.cacheDOM();
        this.bindEvents();
        this.initRouter();
        this.renderAuthUI();
        this.applySavedTheme();
        this.hideAppLoader();
    }

    initDatabase() {
        // Inicializar banco local
        if (!localStorage.getItem('chic_users')) {
            localStorage.setItem('chic_users', JSON.stringify(seedUsers));
        }
        if (!localStorage.getItem('chic_products')) {
            localStorage.setItem('chic_products', JSON.stringify(seedProducts));
        }
        if (!localStorage.getItem('chic_chats')) {
            localStorage.setItem('chic_chats', JSON.stringify(seedChats));
        }

        this.users = JSON.parse(localStorage.getItem('chic_users'));
        this.products = JSON.parse(localStorage.getItem('chic_products'));
        this.chats = JSON.parse(localStorage.getItem('chic_chats'));

        // Usuário Atual Logado
        const savedUser = localStorage.getItem('chic_current_user');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
        } else {
            // Conta convidado padrão para demonstração
            this.currentUser = {
                id: 'usr-guest',
                name: 'Seu Perfil Chic',
                email: 'seuemail@chic.com',
                bio: 'Meu brechó sustentável na Chic! Economize, doe e compre com estilo.',
                bannerColor: 'gradient-gold'
            };
            localStorage.setItem('chic_current_user', JSON.stringify(this.currentUser));
            // Adicionar usuário guest na lista geral se não existir
            if (!this.users.some(u => u.id === 'usr-guest')) {
                this.users.push(this.currentUser);
                localStorage.setItem('chic_users', JSON.stringify(this.users));
            }
        }

        // Favoritos (ID array)
        this.favorites = JSON.parse(localStorage.getItem(`chic_favs_${this.currentUser.id}`)) || [];

        // Filtros Ativos
        this.activeFilters = {
            type: 'all',
            category: 'all',
            size: '',
            maxPrice: 500,
            search: ''
        };
    }

    cacheDOM() {
        // Loader & Theme
        this.appLoader = document.getElementById('app-loader');
        this.themeToggle = document.getElementById('theme-toggle');
        this.sunIcon = document.getElementById('sun-icon');
        this.moonIcon = document.getElementById('moon-icon');

        // Navigation
        this.navLogo = document.getElementById('nav-logo');
        this.navBtns = document.querySelectorAll('.nav-btn');
        this.mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        this.mobileSidebar = document.getElementById('mobile-sidebar');
        this.mobileSidebarClose = document.getElementById('mobile-sidebar-close');
        this.sidebarLinks = document.querySelectorAll('.sidebar-link');

        // Views
        this.views = document.querySelectorAll('.spa-view');

        // Home View elements
        this.recentGrid = document.getElementById('recent-products-grid');

        // Explore View elements
        this.exploreGrid = document.getElementById('explore-products-grid');
        this.btnResetSearchFilters = document.getElementById('btn-reset-search-filters');
        this.noResults = document.getElementById('no-results');
        this.resultsCount = document.getElementById('results-count');
        this.searchInput = document.getElementById('search-input');
        this.sortSelect = document.getElementById('sort-select');
        this.btnClearFilters = document.getElementById('btn-clear-filters');
        this.filterCategory = document.getElementById('filter-category');
        this.filterMaxPrice = document.getElementById('filter-max-price');
        this.priceSliderValue = document.getElementById('price-slider-value');
        this.priceFilterWrapper = document.getElementById('price-filter-wrapper');
        this.mobileFilterTrigger = document.getElementById('mobile-filter-trigger');
        this.filterSidebar = document.querySelector('.filter-sidebar');

        // Detail View elements
        this.detailContainer = document.getElementById('product-detail-container');
        this.btnBackProduct = document.getElementById('btn-back-product');

        // Publish Form
        this.publishForm = document.getElementById('publish-form');
        this.publishImageInput = document.getElementById('publish-image-input');
        this.imageDropzone = document.getElementById('image-dropzone');
        this.dropzonePlaceholder = document.getElementById('dropzone-placeholder');
        this.dropzonePreview = document.getElementById('dropzone-preview');
        this.uploadedImagePreview = document.getElementById('uploaded-image-preview');
        this.btnRemoveImage = document.getElementById('btn-remove-image');
        this.typeSaleRadio = document.getElementById('type-sale');
        this.typeDonationRadio = document.getElementById('type-donation');
        this.publishPriceGroup = document.getElementById('publish-price-group');
        this.publishPrice = document.getElementById('publish-price');

        // Favorites View
        this.favoritesGrid = document.getElementById('favorites-products-grid');
        this.noFavorites = document.getElementById('no-favorites');

        // Chat elements
        this.conversationsList = document.getElementById('conversations-list');
        this.chatActiveState = document.getElementById('chat-active-state');
        this.chatEmptyState = document.getElementById('chat-empty-state');
        this.chatPartnerAvatar = document.getElementById('chat-partner-avatar');
        this.chatPartnerName = document.getElementById('chat-partner-name');
        this.chatMessagesBox = document.getElementById('chat-messages-box');
        this.chatInputForm = document.getElementById('chat-input-form');
        this.chatMessageInput = document.getElementById('chat-message-input');
        this.chatProductLink = document.getElementById('chat-product-link');
        this.chatProductImg = document.getElementById('chat-product-img');
        this.chatProductTitle = document.getElementById('chat-product-title');
        this.chatProductPrice = document.getElementById('chat-product-price');
        this.chatMobileBack = document.getElementById('chat-mobile-back');
        this.chatLayout = document.querySelector('.chat-layout');

        // Store / Profile
        this.storeBanner = document.getElementById('store-banner');
        this.storeProfileAvatar = document.getElementById('store-profile-avatar');
        this.storeNameDisplay = document.getElementById('store-name-display');
        this.storeBioDisplay = document.getElementById('store-bio-display');
        this.btnEditStore = document.getElementById('btn-edit-store');
        this.storeProductsGrid = document.getElementById('store-products-grid');
        this.storeEmptyCatalog = document.getElementById('store-empty-catalog');
        
        // Store Stats & Impact Dashboard
        this.statTotalItems = document.getElementById('stat-total-items');
        this.statDonations = document.getElementById('stat-donations');
        this.storeCarbonSaved = document.getElementById('store-carbon-saved');
        this.storeTabs = document.querySelectorAll('.store-tab');
        this.storeTabPanes = document.querySelectorAll('.store-tab-pane');

        // Modals
        this.editStoreModal = document.getElementById('edit-store-modal');
        this.editStoreForm = document.getElementById('edit-store-form');
        this.editStoreName = document.getElementById('edit-store-name');
        this.editStoreBio = document.getElementById('edit-store-bio');
        this.btnCloseEditStore = document.getElementById('btn-close-edit-store');
        this.btnCancelEditStore = document.getElementById('btn-cancel-edit-store');

        // Auth Modal
        this.authModal = document.getElementById('auth-modal');
        this.authTrigger = document.getElementById('auth-trigger');
        this.userProfileSummary = document.getElementById('user-profile-summary');
        this.userAvatar = document.getElementById('user-avatar');
        this.userNameDisplay = document.getElementById('user-name-display');
        this.btnLogout = document.getElementById('btn-logout');
        this.btnCloseAuth = document.getElementById('btn-close-auth');
        this.loginForm = document.getElementById('login-form');
        this.registerForm = document.getElementById('register-form');
        this.btnSwitchRegister = document.getElementById('btn-switch-register');
        this.btnSwitchLogin = document.getElementById('btn-switch-login');
        this.authModalTitle = document.getElementById('auth-modal-title');
    }

    bindEvents() {
        // Theme Toggle
        this.themeToggle.addEventListener('click', () => this.toggleTheme());

        // Header Navigation Click Event
        this.navBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const targetView = e.currentTarget.getAttribute('data-view');
                this.navigate(targetView);
            });
        });

        // Mobile Sidebar Trigger
        this.mobileMenuToggle.addEventListener('click', () => {
            this.mobileSidebar.classList.add('active');
        });
        this.mobileSidebarClose.addEventListener('click', () => {
            this.mobileSidebar.classList.remove('active');
        });
        this.sidebarLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const targetView = e.currentTarget.getAttribute('data-view');
                this.mobileSidebar.classList.remove('active');
                this.navigate(targetView);
            });
        });

        // CTA Links navigating to other views (Home buttons, etc.)
        document.addEventListener('click', (e) => {
            const targetBtn = e.target.closest('[data-target-view]');
            if (targetBtn) {
                const view = targetBtn.getAttribute('data-target-view');
                this.navigate(view);
            }
        });

        // Explore Filter Toggle Buttons (Venda / Doação)
        document.querySelectorAll('[data-filter-type]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('[data-filter-type]').forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');
                this.activeFilters.type = e.currentTarget.getAttribute('data-filter-type');
                
                // Hide/show price slider wrapper based on "Doação" filter
                if (this.activeFilters.type === 'donation') {
                    this.priceFilterWrapper.style.display = 'none';
                } else {
                    this.priceFilterWrapper.style.display = 'block';
                }

                this.renderExplore();
            });
        });

        // Category Filter
        this.filterCategory.addEventListener('change', (e) => {
            this.activeFilters.category = e.target.value;
            this.renderExplore();
        });

        // Size Filter
        document.querySelectorAll('.size-btn-filter').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const wasActive = e.currentTarget.classList.contains('active');
                document.querySelectorAll('.size-btn-filter').forEach(b => b.classList.remove('active'));
                
                if (wasActive) {
                    this.activeFilters.size = '';
                } else {
                    e.currentTarget.classList.add('active');
                    this.activeFilters.size = e.currentTarget.getAttribute('data-size');
                }
                this.renderExplore();
            });
        });

        // Price Filter Range
        this.filterMaxPrice.addEventListener('input', (e) => {
            const val = parseInt(e.target.value);
            this.activeFilters.maxPrice = val;
            this.priceSliderValue.textContent = val >= 500 ? 'R$ 500+' : `R$ ${val}`;
            this.renderExplore();
        });

        // Text Search
        this.searchInput.addEventListener('input', (e) => {
            this.activeFilters.search = e.target.value;
            this.renderExplore();
        });

        // Clear Filters Buttons
        this.btnClearFilters.addEventListener('click', () => this.resetFilters());
        this.btnResetSearchFilters.addEventListener('click', () => this.resetFilters());

        // Sort Select Explore Page
        this.sortSelect.addEventListener('change', () => this.renderExplore());

        // Mobile Filter Pane Toggle
        this.mobileFilterTrigger.addEventListener('click', () => {
            const isHidden = getComputedStyle(this.filterSidebar).display === 'none';
            if (isHidden) {
                this.filterSidebar.style.display = 'block';
                this.mobileFilterTrigger.innerHTML = `Fechar Filtros`;
            } else {
                this.filterSidebar.style.display = 'none';
                this.mobileFilterTrigger.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
                    Filtrar
                `;
            }
        });

        // Product Detail Back Action
        this.btnBackProduct.addEventListener('click', () => {
            // Return to Explore by default, or Home
            this.navigate('explore');
        });

        // Edit Store Modal Actions
        this.btnEditStore.addEventListener('click', () => this.openEditStoreModal());
        this.btnCloseEditStore.addEventListener('click', () => this.closeEditStoreModal());
        this.btnCancelEditStore.addEventListener('click', () => this.closeEditStoreModal());
        this.editStoreForm.addEventListener('submit', (e) => this.handleSaveStore(e));

        // Color Swatches in Store Modal
        document.querySelectorAll('.color-swatch').forEach(swatch => {
            swatch.addEventListener('click', (e) => {
                document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
                e.currentTarget.classList.add('active');
            });
        });

        // Auth Modal Actions
        this.authTrigger.addEventListener('click', () => this.openAuthModal());
        this.btnCloseAuth.addEventListener('click', () => this.closeAuthModal());
        this.btnSwitchRegister.addEventListener('click', () => this.toggleAuthForms(true));
        this.btnSwitchLogin.addEventListener('click', () => this.toggleAuthForms(false));
        this.loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        this.registerForm.addEventListener('submit', (e) => this.handleRegister(e));
        this.btnLogout.addEventListener('click', () => this.handleLogout());

        // Publish Form Upload Preview
        this.publishImageInput.addEventListener('change', (e) => this.handleImageSelect(e));
        this.btnRemoveImage.addEventListener('click', () => this.removeSelectedImage());

        // Handle Sale / Donation toggle inside Publish Form
        const handleTypeChange = () => {
            if (this.typeDonationRadio.checked) {
                this.publishPriceGroup.style.opacity = '0.4';
                this.publishPrice.disabled = true;
                this.publishPrice.value = '0';
                this.publishPrice.required = false;
            } else {
                this.publishPriceGroup.style.opacity = '1';
                this.publishPrice.disabled = false;
                this.publishPrice.value = '';
                this.publishPrice.required = true;
            }
        };
        this.typeSaleRadio.addEventListener('change', handleTypeChange);
        this.typeDonationRadio.addEventListener('change', handleTypeChange);

        // Submit Publish Form
        this.publishForm.addEventListener('submit', (e) => this.handlePublishSubmit(e));

        // Favorite Toggle globally
        document.addEventListener('click', (e) => {
            const favBtn = e.target.closest('.product-fav-btn');
            if (favBtn) {
                e.stopPropagation();
                const prodId = favBtn.getAttribute('data-product-id');
                this.toggleFavorite(prodId, favBtn);
            }
        });

        // Product Card Clicking
        document.addEventListener('click', (e) => {
            const card = e.target.closest('.product-card');
            if (card && !e.target.closest('.product-fav-btn')) {
                const prodId = card.getAttribute('data-product-id');
                this.viewProductDetails(prodId);
            }
        });

        // Store tab navigation
        this.storeTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.storeTabs.forEach(t => t.classList.remove('active'));
                this.storeTabPanes.forEach(p => p.classList.remove('active'));
                
                e.currentTarget.classList.add('active');
                const paneId = `store-tab-${e.currentTarget.getAttribute('data-tab')}-content`;
                document.getElementById(paneId).classList.add('active');
            });
        });

        // Dynamic Chat message submit
        this.chatInputForm.addEventListener('submit', (e) => this.handleSendMessage(e));
        this.chatMobileBack.addEventListener('click', () => {
            this.chatLayout.classList.remove('chat-open-mobile');
        });
    }

    initRouter() {
        const handleHashChange = () => {
            const hash = window.location.hash.substring(1);
            if (!hash) {
                this.navigate('home', false);
                return;
            }

            if (hash.startsWith('product-detail?id=')) {
                const id = hash.split('?id=')[1];
                this.viewProductDetails(id, false);
            } else {
                this.navigate(hash, false);
            }
        };

        window.addEventListener('hashchange', handleHashChange);
        // Run once on load
        handleHashChange();
    }

    // --- Core SPA View Navigation Router ---
    navigate(viewId, updateHash = true) {
        // Enforce Login validation on restricted pages
        const restrictedViews = ['publish', 'chat', 'favorites'];
        if (restrictedViews.includes(viewId) && this.currentUser.id === 'usr-guest') {
            this.showToast('Crie uma conta gratuita para desfrutar desta aba!', 'info');
            this.openAuthModal();
            return;
        }

        // Update Navbar Links
        this.navBtns.forEach(btn => {
            if (btn.getAttribute('data-view') === viewId) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        this.sidebarLinks.forEach(link => {
            if (link.getAttribute('data-view') === viewId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Toggle SPA View visibility
        this.views.forEach(view => {
            if (view.id === `view-${viewId}`) {
                view.classList.add('active');
            } else {
                view.classList.remove('active');
            }
        });

        // Trigger view rendering logic
        if (viewId === 'home') {
            this.renderHome();
        } else if (viewId === 'explore') {
            this.renderExplore();
        } else if (viewId === 'favorites') {
            this.renderFavorites();
        } else if (viewId === 'chat') {
            this.renderChatList();
        } else if (viewId === 'store') {
            this.renderStore();
        }

        // Scroll back to top on navigation
        window.scrollTo({ top: 0, behavior: 'instant' });

        if (updateHash) {
            window.location.hash = viewId;
        }
    }

    // --- Loading Spinner Logic ---
    hideAppLoader() {
        setTimeout(() => {
            this.appLoader.classList.add('fade-out');
        }, 800);
    }

    // --- Toast Alert Notifications System ---
    showToast(message, type = 'info') {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        // Dynamic Icons for Toasts
        let iconSvg = '';
        if (type === 'success') {
            iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
        } else if (type === 'error') {
            iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
        } else {
            iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
        }

        toast.innerHTML = `${iconSvg} <span>${message}</span>`;
        container.appendChild(toast);

        // Remove from DOM when animation completes
        setTimeout(() => {
            toast.remove();
        }, 3300);
    }

    // --- Theme Switcher Logic (Dark & Light) ---
    applySavedTheme() {
        const darkTheme = localStorage.getItem('chic_dark_theme') !== 'false';
        if (darkTheme) {
            document.body.classList.add('dark-theme');
            document.body.classList.remove('light-theme');
            this.sunIcon.style.display = 'none';
            this.moonIcon.style.display = 'block';
        } else {
            document.body.classList.add('light-theme');
            document.body.classList.remove('dark-theme');
            this.sunIcon.style.display = 'block';
            this.moonIcon.style.display = 'none';
        }
    }

    toggleTheme() {
        const isDark = document.body.classList.contains('dark-theme');
        if (isDark) {
            document.body.classList.replace('dark-theme', 'light-theme');
            localStorage.setItem('chic_dark_theme', 'false');
        } else {
            document.body.classList.replace('light-theme', 'dark-theme');
            localStorage.setItem('chic_dark_theme', 'true');
        }
        this.applySavedTheme();
        this.showToast('Tema alterado com sucesso!', 'info');
    }

    // --- Authentication System Logic ---
    openAuthModal() {
        this.authModal.style.display = 'flex';
        this.toggleAuthForms(false); // Default to login form
    }

    closeAuthModal() {
        this.authModal.style.display = 'none';
    }

    toggleAuthForms(showRegister) {
        if (showRegister) {
            this.loginForm.style.display = 'none';
            this.registerForm.style.display = 'block';
            this.authModalTitle.textContent = 'Criar Conta Chic!';
        } else {
            this.loginForm.style.display = 'block';
            this.registerForm.style.display = 'none';
            this.authModalTitle.textContent = 'Entrar na Chic!';
        }
    }

    renderAuthUI() {
        if (this.currentUser.id !== 'usr-guest') {
            this.authTrigger.style.display = 'none';
            this.userProfileSummary.style.display = 'flex';
            this.userAvatar.textContent = this.currentUser.name.charAt(0).toUpperCase();
            this.userNameDisplay.textContent = this.currentUser.name;
        } else {
            this.authTrigger.style.display = 'block';
            this.userProfileSummary.style.display = 'none';
        }
    }

    handleLogin(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const pass = document.getElementById('login-password').value;

        const user = this.users.find(u => u.email === email && u.password === pass);

        if (user) {
            this.currentUser = user;
            localStorage.setItem('chic_current_user', JSON.stringify(user));
            // Update favorites context
            this.favorites = JSON.parse(localStorage.getItem(`chic_favs_${user.id}`)) || [];
            
            this.renderAuthUI();
            this.closeAuthModal();
            this.showToast(`Bem-vindo de volta, ${user.name}!`, 'success');
            this.navigate('home');
        } else {
            this.showToast('Credenciais inválidas. Verifique seu login.', 'error');
        }
    }

    handleRegister(e) {
        e.preventDefault();
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const pass = document.getElementById('register-password').value;

        if (this.users.some(u => u.email === email)) {
            this.showToast('Este e-mail já está sendo utilizado.', 'error');
            return;
        }

        const newUser = {
            id: 'usr-' + Date.now(),
            name: name,
            email: email,
            password: pass,
            bio: 'Sou novo por aqui! Criei minha loja Chic para incentivar a moda circular.',
            bannerColor: 'gradient-gold'
        };

        this.users.push(newUser);
        localStorage.setItem('chic_users', JSON.stringify(this.users));

        this.currentUser = newUser;
        localStorage.setItem('chic_current_user', JSON.stringify(newUser));
        this.favorites = [];

        this.renderAuthUI();
        this.closeAuthModal();
        this.showToast('Conta criada com sucesso!', 'success');
        this.navigate('store');
    }

    handleLogout() {
        this.currentUser = {
            id: 'usr-guest',
            name: 'Seu Perfil Chic',
            email: 'seuemail@chic.com',
            bio: 'Meu brechó sustentável na Chic! Economize, doe e compre com estilo.',
            bannerColor: 'gradient-gold'
        };
        localStorage.setItem('chic_current_user', JSON.stringify(this.currentUser));
        this.favorites = [];

        this.renderAuthUI();
        this.showToast('Sessão encerrada com sucesso.', 'info');
        this.navigate('home');
    }

    // --- Product rendering utilities ---
    createProductCardHTML(p) {
        const isFav = this.favorites.includes(p.id);
        const priceText = p.type === 'doacao' 
            ? '<span class="product-card-price free">Doação</span>' 
            : `<span class="product-card-price">R$ ${p.price.toFixed(2).replace('.', ',')}</span>`;

        const badgeClass = p.type === 'doacao' ? 'badge-success' : 'badge-gold';
        const badgeLabel = p.type === 'doacao' ? 'Doação' : 'Venda';

        return `
            <div class="product-card" data-product-id="${p.id}">
                <div class="product-card-img-wrapper">
                    <img src="${p.image}" alt="${p.title}" loading="lazy">
                    <div class="product-badge-overlay">
                        <span class="badge ${badgeClass}">${badgeLabel}</span>
                    </div>
                    <button class="product-fav-btn ${isFav ? 'active' : ''}" data-product-id="${p.id}" aria-label="Favoritar">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                    </button>
                </div>
                <div class="product-card-body">
                    <span class="product-card-category">${p.category}</span>
                    <h3 class="product-card-title">${p.title}</h3>
                    <div class="product-card-footer">
                        ${priceText}
                        <span class="product-card-size">${p.size}</span>
                    </div>
                </div>
            </div>
        `;
    }

    // --- HOME VIEW RENDER ---
    renderHome() {
        // Obter os 4 desapegos mais recentes
        const sorted = [...this.products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        const recent = sorted.slice(0, 4);

        if (recent.length === 0) {
            this.recentGrid.innerHTML = '<p class="col-span-full text-center text-muted">Nenhuma peça publicada ainda.</p>';
            return;
        }

        this.recentGrid.innerHTML = recent.map(p => this.createProductCardHTML(p)).join('');
    }

    // --- EXPLORE VIEW RENDER ---
    renderExplore() {
        let filtered = [...this.products];

        // 1. Filtro Tipo (Venda / Doação)
        if (this.activeFilters.type !== 'all') {
            filtered = filtered.filter(p => p.type === this.activeFilters.type);
        }

        // 2. Filtro Categoria
        if (this.activeFilters.category !== 'all') {
            filtered = filtered.filter(p => p.category === this.activeFilters.category);
        }

        // 3. Filtro Tamanho
        if (this.activeFilters.size !== '') {
            filtered = filtered.filter(p => p.size === this.activeFilters.size);
        }

        // 4. Filtro Preço Máximo (Apenas se for oferta de Venda)
        if (this.activeFilters.type !== 'donation') {
            filtered = filtered.filter(p => p.type === 'doacao' || p.price <= this.activeFilters.maxPrice);
        }

        // 5. Filtro de Busca Textual
        if (this.activeFilters.search.trim() !== '') {
            const query = this.activeFilters.search.toLowerCase();
            filtered = filtered.filter(p => 
                p.title.toLowerCase().includes(query) || 
                p.description.toLowerCase().includes(query)
            );
        }

        // Ordenação
        const sort = this.sortSelect.value;
        if (sort === 'newest') {
            filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } else if (sort === 'price-asc') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sort === 'price-desc') {
            filtered.sort((a, b) => b.price - a.price);
        }

        // Renderização
        this.resultsCount.textContent = `${filtered.length} ${filtered.length === 1 ? 'peça encontrada' : 'peças encontradas'}`;

        if (filtered.length === 0) {
            this.exploreGrid.style.display = 'none';
            this.noResults.style.display = 'flex';
        } else {
            this.exploreGrid.style.display = 'grid';
            this.noResults.style.display = 'none';
            this.exploreGrid.innerHTML = filtered.map(p => this.createProductCardHTML(p)).join('');
        }
    }

    resetFilters() {
        this.activeFilters = {
            type: 'all',
            category: 'all',
            size: '',
            maxPrice: 500,
            search: ''
        };

        // Reset sidebar DOM element values
        this.searchInput.value = '';
        this.filterCategory.value = 'all';
        this.filterMaxPrice.value = 500;
        this.priceSliderValue.textContent = 'R$ 500+';
        this.priceFilterWrapper.style.display = 'block';

        // Clear active buttons
        document.querySelectorAll('[data-filter-type]').forEach(b => {
            if (b.getAttribute('data-filter-type') === 'all') b.classList.add('active');
            else b.classList.remove('active');
        });
        document.querySelectorAll('.size-btn-filter').forEach(b => b.classList.remove('active'));

        this.renderExplore();
        this.showToast('Filtros limpos.', 'info');
    }

    // --- VIEW DETALHE DO PRODUTO ---
    viewProductDetails(id, pushHash = true) {
        const p = this.products.find(item => item.id === id);
        if (!p) {
            this.showToast('Ops! Produto não encontrado.', 'error');
            this.navigate('explore');
            return;
        }

        this.views.forEach(view => view.classList.remove('active'));
        document.getElementById('view-product-detail').classList.add('active');

        // Formatação preço/doação
        const priceLabel = p.type === 'doacao' 
            ? '<span class="product-detail-price donation">Doação Gratuita</span>' 
            : `<span class="product-detail-price">R$ ${p.price.toFixed(2).replace('.', ',')}</span>`;

        const isFav = this.favorites.includes(p.id);
        const detailHTML = `
            <div class="product-detail-image-pane">
                <img src="${p.image}" alt="${p.title}">
            </div>
            <div class="product-detail-info-pane">
                <div class="product-detail-meta">
                    <span class="badge ${p.type === 'doacao' ? 'badge-success' : 'badge-gold'}">${p.type}</span>
                    <span class="badge badge-blue">${p.category}</span>
                </div>

                <div class="product-detail-title-price">
                    <h1>${p.title}</h1>
                    ${priceLabel}
                </div>

                <div class="product-specs-card">
                    <div class="spec-item">
                        <span class="spec-label">Tamanho</span>
                        <span class="spec-value">${p.size}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Estado</span>
                        <span class="spec-value">Excelente</span>
                    </div>
                </div>

                <div class="product-detail-description">
                    <h3>Descrição do item</h3>
                    <p>${p.description}</p>
                </div>

                <!-- Perfil do Anunciante -->
                <div class="seller-profile-card">
                    <div class="seller-avatar-info">
                        <span class="avatar-circle avatar-sm">${p.sellerName.charAt(0).toUpperCase()}</span>
                        <div>
                            <span class="seller-name">${p.sellerName}</span>
                            <span class="seller-reputation">Vendedor comunitário ★ 4.9</span>
                        </div>
                    </div>
                </div>

                <div class="product-detail-actions">
                    <button class="btn btn-primary btn-lg" id="btn-contact-seller" data-seller-id="${p.sellerId}" data-product-id="${p.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                        Falar com o anunciante
                    </button>
                    <button class="btn btn-outline btn-lg product-fav-btn ${isFav ? 'active' : ''}" data-product-id="${p.id}" style="padding:0; width:60px;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                    </button>
                </div>
            </div>
        `;

        this.detailContainer.innerHTML = detailHTML;

        // Bind contact button
        document.getElementById('btn-contact-seller').addEventListener('click', (e) => {
            const sellerId = e.currentTarget.getAttribute('data-seller-id');
            const prodId = e.currentTarget.getAttribute('data-product-id');
            this.initiateChatChannel(sellerId, prodId);
        });

        if (pushHash) {
            window.location.hash = `product-detail?id=${p.id}`;
        }
    }

    // --- FAVORITES LOGIC ---
    toggleFavorite(prodId, btnNode) {
        if (this.currentUser.id === 'usr-guest') {
            this.showToast('Faça login ou registre-se para favoritar peças!', 'info');
            this.openAuthModal();
            return;
        }

        const idx = this.favorites.indexOf(prodId);
        if (idx !== -1) {
            // Remove
            this.favorites.splice(idx, 1);
            if (btnNode) {
                btnNode.classList.remove('active');
                const svg = btnNode.querySelector('svg');
                svg.setAttribute('fill', 'none');
            }
            this.showToast('Removido dos favoritos.');
        } else {
            // Add
            this.favorites.push(prodId);
            if (btnNode) {
                btnNode.classList.add('active');
                const svg = btnNode.querySelector('svg');
                svg.setAttribute('fill', 'currentColor');
            }
            this.showToast('Adicionado aos favoritos!', 'success');
        }

        localStorage.setItem(`chic_favs_${this.currentUser.id}`, JSON.stringify(this.favorites));

        // Re-render views if current active
        const activeView = Array.from(this.views).find(v => v.classList.contains('active'));
        if (activeView && activeView.id === 'view-favorites') {
            this.renderFavorites();
        }
    }

    renderFavorites() {
        if (this.favorites.length === 0) {
            this.favoritesGrid.style.display = 'none';
            this.noFavorites.style.display = 'flex';
            return;
        }

        this.favoritesGrid.style.display = 'grid';
        this.noFavorites.style.display = 'none';

        const favItems = this.products.filter(p => this.favorites.includes(p.id));
        this.favoritesGrid.innerHTML = favItems.map(p => this.createProductCardHTML(p)).join('');
    }

    // --- PUBLISH DESAPEGO FORM LOGIC ---
    handleImageSelect(e) {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 2 * 1024 * 1024) {
            this.showToast('A imagem excede o tamanho limite de 2MB.', 'error');
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            this.uploadedImagePreview.src = event.target.result;
            this.dropzonePlaceholder.style.display = 'none';
            this.dropzonePreview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }

    removeSelectedImage() {
        this.publishImageInput.value = '';
        this.uploadedImagePreview.src = '#';
        this.dropzonePlaceholder.style.display = 'flex';
        this.dropzonePreview.style.display = 'none';
    }

    handlePublishSubmit(e) {
        e.preventDefault();
        
        if (this.currentUser.id === 'usr-guest') {
            this.showToast('Inicie uma sessão para publicar seus desapegos!', 'info');
            this.openAuthModal();
            return;
        }

        const title = document.getElementById('publish-title').value;
        const category = document.getElementById('publish-category').value;
        const description = document.getElementById('publish-description').value;
        const size = document.getElementById('publish-size').value;
        const type = document.querySelector('input[name="publish-type"]:checked').value;
        
        let price = 0;
        if (type === 'venda') {
            price = parseFloat(this.publishPrice.value);
            if (isNaN(price) || price < 0) {
                this.showToast('Insira um preço válido para venda.', 'error');
                return;
            }
        }

        // Imagem (Usa preview se carregada, caso contrário gera uma ilustração de roupa dinâmica!)
        let imgURI = this.uploadedImagePreview.getAttribute('src');
        if (imgURI === '#' || !imgURI) {
            // Gerar ilustração linda e dinâmica automaticamente baseado na categoria e no gradiente de cores da loja!
            let col1 = '#e0a96d';
            let col2 = '#b58950';
            if (this.currentUser.bannerColor === 'gradient-emerald') { col1 = '#10b981'; col2 = '#047857'; }
            else if (this.currentUser.bannerColor === 'gradient-purple') { col1 = '#8b5cf6'; col2 = '#5b21b6'; }
            else if (this.currentUser.bannerColor === 'gradient-navy') { col1 = '#3b82f6'; col2 = '#1d4ed8'; }
            
            imgURI = generateClothingSVG(category, col1, col2);
        }

        const newProd = {
            id: 'prod-' + Date.now(),
            title: title,
            description: description,
            category: category,
            size: size,
            type: type,
            price: price,
            image: imgURI,
            sellerId: this.currentUser.id,
            sellerName: this.currentUser.name,
            createdAt: new Date().toISOString()
        };

        this.products.unshift(newProd);
        localStorage.setItem('chic_products', JSON.stringify(this.products));

        this.showToast('Peça cadastrada com sucesso na sua loja!', 'success');
        
        // Reset form
        this.publishForm.reset();
        this.removeSelectedImage();
        this.publishPriceGroup.style.opacity = '1';
        this.publishPrice.disabled = false;

        // Redirect to store catalog
        this.navigate('store');
    }

    // --- LOJA / VENDEDOR SECTION LOGIC ---
    renderStore() {
        // Customização visual da loja com base nos dados do usuário logado
        this.storeBanner.className = `store-header-banner ${this.currentUser.bannerColor || 'gradient-gold'}`;
        this.storeProfileAvatar.textContent = this.currentUser.name.charAt(0).toUpperCase();
        this.storeNameDisplay.textContent = this.currentUser.name;
        this.storeBioDisplay.textContent = this.currentUser.bio || 'Sem bio descrita ainda.';

        // Filtrar peças do usuário atual
        const myItems = this.products.filter(p => p.sellerId === this.currentUser.id);
        this.statTotalItems.textContent = myItems.length;

        const myDonations = myItems.filter(p => p.type === 'doacao');
        this.statDonations.textContent = myDonations.length;

        // Cálculo de pegada ecológica fictícia (circular)
        // 20 kg de CO₂ economizados por peça de roupa reciclada na média
        const carbonQty = myItems.length * 20;
        this.storeCarbonSaved.textContent = `${carbonQty}`;

        if (myItems.length === 0) {
            this.storeProductsGrid.style.display = 'none';
            this.storeEmptyCatalog.style.display = 'flex';
        } else {
            this.storeProductsGrid.style.display = 'grid';
            this.storeEmptyCatalog.style.display = 'none';
            this.storeProductsGrid.innerHTML = myItems.map(p => this.createProductCardHTML(p)).join('');
        }
    }

    openEditStoreModal() {
        this.editStoreName.value = this.currentUser.name;
        this.editStoreBio.value = this.currentUser.bio || '';
        
        // Active swatch selection in UI
        const currentBanner = this.currentUser.bannerColor || 'gradient-gold';
        document.querySelectorAll('.color-swatch').forEach(s => {
            if (s.getAttribute('data-color') === currentBanner) {
                s.classList.add('active');
            } else {
                s.classList.remove('active');
            }
        });

        this.editStoreModal.style.display = 'flex';
    }

    closeEditStoreModal() {
        this.editStoreModal.style.display = 'none';
    }

    handleSaveStore(e) {
        e.preventDefault();
        
        const newName = this.editStoreName.value;
        const newBio = this.editStoreBio.value;
        const activeSwatch = document.querySelector('.color-swatch.active');
        const newBanner = activeSwatch ? activeSwatch.getAttribute('data-color') : 'gradient-gold';

        // Update local object
        this.currentUser.name = newName;
        this.currentUser.bio = newBio;
        this.currentUser.bannerColor = newBanner;
        localStorage.setItem('chic_current_user', JSON.stringify(this.currentUser));

        // Update in global users registry
        const uIdx = this.users.findIndex(u => u.id === this.currentUser.id);
        if (uIdx !== -1) {
            this.users[uIdx].name = newName;
            this.users[uIdx].bio = newBio;
            this.users[uIdx].bannerColor = newBanner;
            localStorage.setItem('chic_users', JSON.stringify(this.users));
        }

        // Update matching seller labels on user items
        this.products.forEach(p => {
            if (p.sellerId === this.currentUser.id) {
                p.sellerName = newName;
            }
        });
        localStorage.setItem('chic_products', JSON.stringify(this.products));

        this.renderAuthUI();
        this.renderStore();
        this.closeEditStoreModal();
        this.showToast('Configurações da loja salvas com sucesso!', 'success');
    }

    // --- CHAT INTERATIVO SIMULADO ---
    initiateChatChannel(sellerId, productId) {
        if (this.currentUser.id === 'usr-guest') {
            this.showToast('Crie uma conta para falar com vendedores!', 'info');
            this.openAuthModal();
            return;
        }

        if (sellerId === this.currentUser.id) {
            this.showToast('Esta peça já faz parte do seu catálogo!', 'info');
            return;
        }

        const prod = this.products.find(p => p.id === productId);
        const seller = this.users.find(u => u.id === sellerId) || { name: 'Vendedor Chic!' };

        // Procura se canal entre os dois já existe no localStorage
        let activeChat = this.chats.find(c => c.productId === productId && c.partnerId === sellerId);
        
        if (!activeChat) {
            // Criar novo chat
            activeChat = {
                id: 'chat-' + Date.now(),
                productId: productId,
                productTitle: prod.title,
                productPrice: prod.type === 'doacao' ? 'Doação' : `R$ ${prod.price.toFixed(2)}`,
                productImg: prod.image,
                partnerId: sellerId,
                partnerName: seller.name,
                messages: [
                    { senderId: sellerId, text: `Olá! Fico feliz que tenha gostado do anúncio "${prod.title}". Como posso te ajudar?`, timestamp: new Date().toISOString() }
                ]
            };
            this.chats.unshift(activeChat);
            localStorage.setItem('chic_chats', JSON.stringify(this.chats));
        }

        this.navigate('chat');
        this.openConversation(activeChat.id);
    }

    renderChatList() {
        if (this.chats.length === 0) {
            this.conversationsList.innerHTML = '<p class="text-center text-muted mt-6 text-sm">Sem mensagens recebidas ou enviadas.</p>';
            this.chatActiveState.style.display = 'none';
            this.chatEmptyState.style.display = 'flex';
            return;
        }

        this.conversationsList.innerHTML = this.chats.map(c => {
            const lastMsg = c.messages[c.messages.length - 1];
            const timeStr = lastMsg ? new Date(lastMsg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
            const lastMsgText = lastMsg ? lastMsg.text : 'Sem mensagens';

            return `
                <div class="conversation-item" data-chat-id="${c.id}" id="item-${c.id}">
                    <span class="avatar-circle avatar-sm">${c.partnerName.charAt(0).toUpperCase()}</span>
                    <div class="conversation-meta-info">
                        <div class="conversation-meta-title-time">
                            <h4>${c.partnerName}</h4>
                            <span class="conversation-time">${timeStr}</span>
                        </div>
                        <p class="conversation-last-msg">${lastMsgText}</p>
                    </div>
                </div>
            `;
        }).join('');

        // Bind events on list items
        document.querySelectorAll('.conversation-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const chatId = e.currentTarget.getAttribute('data-chat-id');
                this.openConversation(chatId);
            });
        });

        // If mobile, manage layout
        this.chatMobileBack.style.display = window.innerWidth <= 768 ? 'inline-flex' : 'none';
    }

    openConversation(chatId) {
        this.activeChatId = chatId;
        const chat = this.chats.find(c => c.id === chatId);
        if (!chat) return;

        // Toggle Visual Active class
        document.querySelectorAll('.conversation-item').forEach(i => i.classList.remove('active'));
        const activeItem = document.getElementById(`item-${chatId}`);
        if (activeItem) activeItem.classList.add('active');

        // Toggle chat empty state to main box
        this.chatActiveState.style.display = 'flex';
        this.chatEmptyState.style.display = 'none';

        // Render Conversation Header
        this.chatPartnerAvatar.textContent = chat.partnerName.charAt(0).toUpperCase();
        this.chatPartnerName.textContent = chat.partnerName;

        // Link Mini Card Product
        this.chatProductImg.src = chat.productImg;
        this.chatProductTitle.textContent = chat.productTitle;
        this.chatProductPrice.textContent = chat.productPrice;
        this.chatProductLink.onclick = () => this.viewProductDetails(chat.productId);

        // Render Message History
        this.renderMessageHistory(chat.messages);

        // Mobile responsiveness layout check
        if (window.innerWidth <= 768) {
            this.chatLayout.classList.add('chat-open-mobile');
        }
    }

    renderMessageHistory(messages) {
        this.chatMessagesBox.innerHTML = messages.map(m => {
            const isMe = m.senderId === this.currentUser.id;
            const timeStr = new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            return `
                <div class="chat-bubble ${isMe ? 'sent' : 'received'}">
                    <span>${m.text}</span>
                    <span class="chat-bubble-time">${timeStr}</span>
                </div>
            `;
        }).join('');

        // Scroll to bottom
        this.chatMessagesBox.scrollTop = this.chatMessagesBox.scrollHeight;
    }

    handleSendMessage(e) {
        e.preventDefault();
        const text = this.chatMessageInput.value.trim();
        if (text === '') return;

        const chat = this.chats.find(c => c.id === this.activeChatId);
        if (!chat) return;

        const myMsg = {
            senderId: this.currentUser.id,
            text: text,
            timestamp: new Date().toISOString()
        };

        chat.messages.push(myMsg);
        localStorage.setItem('chic_chats', JSON.stringify(this.chats));

        this.chatMessageInput.value = '';
        this.renderMessageHistory(chat.messages);
        this.renderChatList(); // update sidebar

        // Simulator: Schedule a mock response after 1.5 seconds to showcase interactive MVP!
        this.simulateVendedorResponse(chat);
    }

    simulateVendedorResponse(chat) {
        const answers = [
            `Olá! Sim, a peça está disponível. Podemos combinar a retirada na estação de metrô mais próxima?`,
            `Oi! O tamanho dela veste super bem. Tem interesse em dar uma olhada nela ao vivo antes?`,
            `Com certeza! Faço envios via transportadora se for melhor para você. Posso calcular o valor?`,
            `Perfeito! A embalagem ecológica já está pronta para envio. Quando gostaria de concluir?`
        ];
        
        const randomAnswer = answers[Math.floor(Math.random() * answers.length)];

        setTimeout(() => {
            // Verify if still in the same chat
            if (this.activeChatId !== chat.id) return;

            const responseMsg = {
                senderId: chat.partnerId,
                text: randomAnswer,
                timestamp: new Date().toISOString()
            };

            chat.messages.push(responseMsg);
            localStorage.setItem('chic_chats', JSON.stringify(this.chats));

            this.renderMessageHistory(chat.messages);
            this.renderChatList(); // refresh sidebar list
            
            // Subtle sound click simulation (optional UI wow effect)
            this.showToast(`Mensagem recebida de ${chat.partnerName}`, 'info');
        }, 1500);
    }
}

// --- App Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    window.app = new ChicApp();
});
