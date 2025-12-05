// ==========================
// Next-circuit E-COMMERCE 
// ==========================

// API Configuration
const API_URL = '/api';
let authToken = localStorage.getItem('authToken');
let currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : null;

// Fallback to mock data if offline
const MOCK_PRODUCTS = [
            // Smartphones
            {
                id: 1,
                name: 'iPhone 15 Pro Max 256GB',
                brand: 'Apple',
                description: 'Titanium design, A17 Pro chip, Pro camera system with 5x Telephoto.',
                price: 1199.99,
                originalPrice: 1299.99,
                image: 'iphone 15.jpg',
                rating: 4.9,
                stock: 12,
                category: 'smartphones',
                isBestSeller: true,
                discount: 8
            },
            {
                id: 2,
                name: 'Samsung Galaxy S24 Ultra',
                brand: 'Samsung',
                description: '6.8" Dynamic AMOLED, Snapdragon 8 Gen 3, 200MP camera, S Pen included.',
                price: 1099.99,
                originalPrice: 1199.99,
                image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=300&fit=crop',
                rating: 4.8,
                stock: 8,
                category: 'smartphones',
                isBestSeller: true,
                discount: 8
            },
            {
                id: 3,
                name: 'OnePlus 12 256GB',
                brand: 'OnePlus',
                description: 'Snapdragon 8 Gen 3, 100W fast charging, 50MP triple camera system.',
                price: 799.99,
                image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&h=300&fit=crop',
                rating: 4.7,
                stock: 15,
                category: 'smartphones',
                discount: 0
            },
            // Laptops
            {
                id: 4,
                name: 'MacBook Pro 16" M3 Max',
                brand: 'Apple',
                description: 'M3 Max chip, 36GB RAM, 1TB SSD, Liquid Retina XDR display.',
                price: 3499.99,
                originalPrice: 3699.99,
                image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=300&fit=crop',
                rating: 4.9,
                stock: 5,
                category: 'laptops',
                isBestSeller: true,
                discount: 5
            },
            {
                id: 5,
                name: 'Dell XPS 15 OLED',
                brand: 'Dell',
                description: 'Intel i7-13700H, RTX 4060, 32GB RAM, 1TB SSD, 15.6" OLED display.',
                price: 1899.99,
                originalPrice: 2199.99,
                image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop',
                rating: 4.6,
                stock: 7,
                category: 'laptops',
                discount: 14
            },
            {
                id: 6,
                name: 'ASUS ROG Zephyrus G16',
                brand: 'ASUS',
                description: 'Intel i9-13900H, RTX 4070, 16GB RAM, 1TB SSD, 165Hz display.',
                price: 1799.99,
                image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=300&fit=crop',
                rating: 4.7,
                stock: 10,
                category: 'laptops',
                discount: 0
            },
            // Gaming
            {
                id: 7,
                name: 'PlayStation 5 Console', 
                brand: 'Sony',
                description: '4K gaming, 120fps support, ray tracing, 825GB SSD, DualSense controller.',
                price: 499.99,
                originalPrice: 549.99,
                image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&h=300&fit=crop',
                rating: 4.8,
                stock: 20,
                category: 'gaming',
                isBestSeller: true,
                discount: 9
            },
            {
                id: 8,
                name: 'Xbox Series X',
                brand: 'Microsoft',
                description: '4K gaming at 120fps, 1TB SSD, backward compatible, Game Pass ready.',
                price: 499.99,
                image: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=400&h=300&fit=crop',
                rating: 4.7,
                stock: 18,
                category: 'gaming',
                discount: 0
            },
            {
                id: 9,
                name: 'Nintendo Switch OLED',
                brand: 'Nintendo',
                description: '7" OLED screen, 64GB storage, enhanced audio, dock included.',
                price: 349.99,
                originalPrice: 379.99,
                image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
                rating: 4.6,
                stock: 25,
                category: 'gaming',
                discount: 8
            },
            // Audio
            {
                id: 10,
                name: 'Sony WH-1000XM5 Headphones',
                brand: 'Sony',
                description: 'Industry-leading noise cancellation, 30-hour battery, premium sound.',
                price: 399.99,
                originalPrice: 449.99,
                image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
                rating: 4.9,
                stock: 15,
                category: 'audio',
                isBestSeller: true,
                discount: 11
            },
            {
                id: 11,
                name: 'AirPods Pro (2nd Gen)',
                brand: 'Apple',
                description: 'Active Noise Cancellation, Spatial Audio, MagSafe charging case.',
                price: 249.99,
                image: 'airbuds pro2.jpg',
                rating: 4.8,
                stock: 30,
                category: 'audio',
                discount: 0
            },
            {
                id: 12,
                name: 'JBL Charge 5 Bluetooth Speaker',
                brand: 'JBL',
                description: '20-hour playtime, IP67 waterproof, PartyBoost, powerful bass.',
                price: 179.99,
                originalPrice: 199.99,
                image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop',
                rating: 4.7,
                stock: 22,
                category: 'audio',
                discount: 10
            },
            // Smart Home
            {
                id: 13,
                name: 'Amazon Echo Dot (5th Gen)',
                brand: 'Amazon',
                description: 'Smart speaker with Alexa, improved audio, temperature sensor.',
                price: 49.99,
                originalPrice: 59.99,
                image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400&h=300&fit=crop',
                rating: 4.5,
                stock: 40,
                category: 'smart-home',
                discount: 17
            },
            {
                id: 14,
                name: 'Google Nest Hub Max',
                brand: 'Google',
                description: '10" smart display, Google Assistant, Nest Cam built-in.',
                price: 229.99,
                image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
                rating: 4.6,
                stock: 12,
                category: 'smart-home',
                discount: 0
            },
            // Accessories
            {
                id: 15,
                name: 'Samsung 980 PRO 2TB SSD',
                brand: 'Samsung',
                description: 'NVMe M.2, PCIe 4.0, read speeds up to 7,000 MB/s.',
                price: 199.99,
                originalPrice: 249.99,
                image: 'samsung ssd.jpg',
                rating: 4.8,
                stock: 35,
                category: 'accessories',
                discount: 20
            },
            {
                id: 16,
                name: 'Logitech MX Master 3S Mouse',
                brand: 'Logitech',
                description: 'Wireless, ergonomic design, 70-day battery, Darkfield tracking.',
                price: 99.99,
                image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=300&fit=crop',
                rating: 4.9,
                stock: 28,
                category: 'accessories',
                isBestSeller: true,
                discount: 0
            },
            {
                id: 17,
                name: 'Keychron K8 Pro Keyboard',
                brand: 'Keychron',
                description: 'Mechanical, wireless, RGB backlight, Mac/Windows compatible.',
                price: 119.99,
                originalPrice: 139.99,
                image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=300&fit=crop',
                rating: 4.7,
                stock: 20,
                category: 'accessories',
                discount: 14
            },
            // TVs
            {
                id: 18,
                name: 'Samsung 65" QLED 4K TV',
                brand: 'Samsung',
                description: 'Quantum HDR, Smart TV, Alexa built-in, 120Hz refresh rate.',
                price: 1299.99,
                originalPrice: 1599.99,
                image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop',
                rating: 4.7,
                stock: 8,
                category: 'tvs',
                discount: 19
            },
            {
                id: 19,
                name: 'LG 55" OLED C3 Series',
                brand: 'LG',
                description: '4K OLED, α9 AI Processor, Dolby Vision IQ, webOS 23.',
                price: 1399.99,
                originalPrice: 1699.99,
                image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400&h=300&fit=crop',
                rating: 4.9,
                stock: 6,
                category: 'tvs',
                isBestSeller: true,
                discount: 18
            },
            {
                id: 20,
                name: 'Sony 75" BRAVIA XR A95L',
                brand: 'Sony',
                description: 'QD-OLED, Cognitive Processor XR, Google TV, Acoustic Surface Audio.',
                price: 2999.99,
                image: 'sony bravia.jpg',
                rating: 4.8,
                stock: 3,
                category: 'tvs',
                discount: 0
            }
        ];

        // Categories
        const CATEGORIES = [
            { id: 'all', name: 'All Products', icon: 'grid' },
            { id: 'smartphones', name: 'Smartphones', icon: 'smartphone' },
            { id: 'laptops', name: 'Laptops', icon: 'laptop' },
            { id: 'gaming', name: 'Gaming', icon: 'gamepad-2' },
            { id: 'audio', name: 'Audio', icon: 'headphones' },
            { id: 'smart-home', name: 'Smart Home', icon: 'home' },
            { id: 'accessories', name: 'Accessories', icon: 'cable' },
            { id: 'tvs', name: 'TVs & Displays', icon: 'tv' }
        ];

        // --- 2. GLOBAL STATE ---
        let cart = []; // Array of { productId, quantity }
        let currentCategory = 'all'; // Current selected category
        let searchQuery = ''; // Current search query

        // --- 3. UTILITY FUNCTIONS ---

        /**
         * Finds a product by ID from the mock data.
         * @param {number} id The product ID.
         * @returns {Object|null} The product object or null if not found.
         */
        const getProductById = (id) => MOCK_PRODUCTS.find(p => p.id === id) || null;
        
        // Make getProductById and MOCK_PRODUCTS accessible globally for checkout page
        window.getProductById = getProductById;
        window.MOCK_PRODUCTS = MOCK_PRODUCTS;

        /**
         * Shows a transient notification/toast message.
         * @param {string} message The text to display.
         * @param {string} type The type (e.g., 'success', 'error', 'info').
         */
        const showNotification = (message, type = 'info') => {
            const area = document.getElementById('notification-area');
            
            // Check if notification area exists
            if (!area) {
                console.error('Notification area not found');
                return;
            }
            
            // Notification colors updated for dark theme
            const colorClass = {
                success: 'bg-green-600 border-green-800',
                error: 'bg-red-600 border-red-800',
                info: 'bg-neon-cyan text-dark-navy border-neon-cyan' // Info uses the accent color for prominence
            }[type] || 'bg-gray-700 border-gray-500';

            const iconName = {
                success: 'check-circle',
                error: 'alert-triangle',
                info: 'info'
            }[type] || 'message-circle';
            
            // Adjust text color for the 'info' type to be dark
            const textColor = type === 'info' ? 'text-dark-navy' : 'text-white';

            const toast = document.createElement('div');
            toast.className = `p-4 rounded-lg ${textColor} shadow-xl border-l-4 transition-all duration-300 opacity-0 transform translate-x-full ${colorClass} flex items-center min-w-[300px] max-w-[400px]`;
            toast.style.transition = 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out';
            toast.innerHTML = `
                <i data-lucide="${iconName}" class="w-5 h-5 mr-3 flex-shrink-0"></i>
                <span>${message}</span>
            `;

            // Add to DOM first
            area.appendChild(toast);
            lucide.createIcons(); // Re-render icons

            // Show notification with animation after a brief delay
            requestAnimationFrame(() => {
                setTimeout(() => {
                    toast.classList.remove('opacity-0', 'translate-x-full');
                    toast.classList.add('opacity-100', 'translate-x-0');
                }, 10);
            });

            // Hide and remove after exactly 5 seconds (5000ms)
            const hideTimeout = setTimeout(() => {
                // Start fade out animation
                toast.classList.remove('opacity-100', 'translate-x-0');
                toast.classList.add('opacity-0', 'translate-x-full');
                
                // Force removal after transition completes (guaranteed removal)
                const removeTimeout = setTimeout(() => {
                    if (toast && toast.parentNode) {
                        toast.remove();
                    }
                }, 350); // After transition duration (300ms) + small buffer
                
                // Also listen for transitionend as a backup (in case transition completes faster)
                const transitionHandler = () => {
                    clearTimeout(removeTimeout);
                    if (toast && toast.parentNode) {
                        toast.remove();
                    }
                };
                toast.addEventListener('transitionend', transitionHandler, { once: true });
                
                // Fallback: if transitionend never fires, remove anyway after 400ms
                setTimeout(() => {
                    toast.removeEventListener('transitionend', transitionHandler);
                    if (toast && toast.parentNode) {
                        toast.remove();
                    }
                }, 400);
            }, 5000); // 5 seconds maximum display time
        };

        // --- 4. RENDERING FUNCTIONS ---

        /**
         * Renders the HTML for a single product card.
         * @param {Object} product The product data.
         * @returns {string} HTML string for the product card.
         */
        const renderProductCard = (product) => {
            const discountBadge = product.discount > 0 ? `
                <div class="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md z-10">
                    -${product.discount}%
                </div>
            ` : '';
            
            const bestSellerBadge = product.isBestSeller ? `
                <div class="absolute top-2 right-2 bg-yellow-500 text-dark-navy text-xs font-bold px-2 py-1 rounded-md z-10 flex items-center">
                    <i data-lucide="award" class="w-3 h-3 mr-1"></i>
                    Best Seller
                </div>
            ` : '';

            const priceDisplay = product.originalPrice ? `
                <div class="flex items-center gap-2 mb-1">
                    <span class="text-2xl font-extrabold text-neon-cyan">$${product.price.toFixed(2)}</span>
                    <span class="text-sm text-gray-500 line-through">$${product.originalPrice.toFixed(2)}</span>
                </div>
            ` : `
                <span class="text-2xl font-extrabold text-neon-cyan mb-1">$${product.price.toFixed(2)}</span>
            `;

            return `
                <div class="bg-card-bg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col transform hover:scale-[1.02] border border-card-bg hover:border-neon-cyan/50 group">
                    <div class="relative overflow-hidden h-48">
                        ${discountBadge}
                        ${bestSellerBadge}
                        <img src="${product.image}"
                             onerror="this.onerror=null; this.src='https://placehold.co/400x300/1A2E40/00FFFF?text=Image+Missing';"
                             alt="${product.name}"
                             class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
                    </div>
                    <div class="p-5 flex flex-col flex-grow">
                        ${product.brand ? `<p class="text-xs text-gray-500 mb-1 uppercase tracking-wide">${product.brand}</p>` : ''}
                        <h3 class="text-lg font-semibold text-gray-100 mb-2 line-clamp-2 min-h-[3rem]">${product.name}</h3>
                        <p class="text-sm text-gray-400 mb-3 flex-grow line-clamp-2">${product.description}</p>
                        <div class="flex items-center gap-1 mb-3">
                            <div class="flex items-center text-yellow-400">
                                <i data-lucide="star" class="w-4 h-4 fill-yellow-400"></i>
                                <span class="text-sm font-medium ml-1">${product.rating}</span>
                            </div>
                            <span class="text-gray-600">|</span>
                            <span class="text-xs text-gray-500">${product.stock} in stock</span>
                        </div>
                        <div class="mb-4">
                            ${priceDisplay}
                        </div>
                        <button onclick="addToCart(${product.id})"
                                class="w-full py-2.5 bg-neon-cyan text-dark-navy font-bold rounded-lg hover:bg-neon-accent transition duration-200 disabled:bg-gray-700 disabled:text-gray-400 shadow-md flex items-center justify-center">
                            <i data-lucide="shopping-bag" class="w-4 h-4 mr-2"></i>
                            ${product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                    </div>
                </div>
            `;
        };

        /**
         * Filters products based on category and search query.
         * @returns {Array} Filtered products array.
         */
        const getFilteredProducts = () => {
            let filtered = MOCK_PRODUCTS;

            // Filter by category
            if (currentCategory !== 'all') {
                filtered = filtered.filter(p => p.category === currentCategory);
            }

            // Filter by search query
            if (searchQuery.trim()) {
                const query = searchQuery.toLowerCase();
                filtered = filtered.filter(p => 
                    p.name.toLowerCase().includes(query) ||
                    p.description.toLowerCase().includes(query) ||
                    (p.brand && p.brand.toLowerCase().includes(query))
                );
            }

            return filtered;
        };

        /**
         * Renders all product cards to the grid.
         */
        const renderProducts = () => {
            const grid = document.getElementById('product-grid');
            const filtered = getFilteredProducts();
            const countDisplay = document.getElementById('product-count');
            const titleDisplay = document.getElementById('products-section-title');
            
            // Update product count
            if (countDisplay) {
                countDisplay.textContent = filtered.length;
            }
            
            // Update section title
            if (titleDisplay) {
                if (currentCategory === 'all') {
                    titleDisplay.textContent = 'All Products';
                } else {
                    const category = CATEGORIES.find(c => c.id === currentCategory);
                    titleDisplay.textContent = category ? category.name : 'Products';
                }
            }
            
            if (filtered.length === 0) {
                grid.innerHTML = `
                    <div class="col-span-full text-center py-16">
                        <i data-lucide="search-x" class="w-16 h-16 mx-auto mb-4 text-gray-600"></i>
                        <p class="text-xl font-semibold text-gray-400 mb-2">No products found</p>
                        <p class="text-sm text-gray-500">Try adjusting your filters or search query</p>
                    </div>
                `;
            } else {
                grid.innerHTML = filtered.map(renderProductCard).join('');
            }
            
            lucide.createIcons(); // Renders the Lucide icons
        };

        /**
         * Renders category navigation.
         */
        const renderCategories = () => {
            const container = document.getElementById('category-nav');
            if (!container) return;
            
            container.innerHTML = CATEGORIES.map(cat => `
                <button onclick="filterByCategory('${cat.id}')" 
                        class="category-btn flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                            currentCategory === cat.id 
                                ? 'bg-neon-cyan text-dark-navy font-semibold' 
                                : 'bg-card-bg text-gray-300 hover:bg-card-bg/80 hover:text-neon-cyan'
                        }">
                    <i data-lucide="${cat.icon}" class="w-4 h-4"></i>
                    <span>${cat.name}</span>
                </button>
            `).join('');
            
            lucide.createIcons();
        };

        /**
         * Filters products by category.
         * @param {string} categoryId The category ID to filter by.
         */
        window.filterByCategory = (categoryId) => {
            currentCategory = categoryId;
            renderCategories();
            renderProducts();
        };

        /**
         * Handles search functionality.
         */
        window.handleSearch = () => {
            const searchInput = document.getElementById('search-input');
            if (searchInput) {
                searchQuery = searchInput.value;
                renderProducts();
            }
        };

        /**
         * Renders the cart items and updates the total.
         */
        const renderCart = () => {
            const container = document.getElementById('cart-items-container');
            const totalDisplay = document.getElementById('cart-total');
            const cartCountDisplay = document.getElementById('cart-count');

            let total = 0;
            let totalItems = 0;

            if (cart.length === 0) {
                container.innerHTML = `
                    <div class="text-center py-10 text-gray-500">
                        <i data-lucide="package" class="w-12 h-12 mx-auto mb-3 text-gray-600"></i>
                        <p class="font-semibold text-gray-400">Your cart is empty.</p>
                        <p class="text-sm">Start adding some amazing tech products!</p>
                    </div>
                `;
            } else {
                container.innerHTML = cart.map(item => {
                    const product = getProductById(item.productId);
                    if (!product) return '';

                    const subtotal = product.price * item.quantity;
                    total += subtotal;
                    totalItems += item.quantity;

                    return `
                        <div class="flex items-center bg-dark-navy p-3 rounded-lg shadow-xl border border-card-bg">
                            <img src="${product.image}" alt="${product.name}" class="w-16 h-16 object-cover rounded-md mr-4">
                            <div class="flex-grow">
                                <p class="font-semibold text-gray-100 truncate">${product.name}</p>
                                <p class="text-sm text-gray-400">$${product.price.toFixed(2)} x ${item.quantity}</p>
                            </div>
                            <div class="flex items-center space-x-2 ml-4">
                                <button onclick="updateCartQuantity(${product.id}, -1)" class="p-1 text-neon-cyan bg-card-bg border border-neon-cyan/50 rounded-full hover:bg-dark-navy transition">
                                    <i data-lucide="minus" class="w-4 h-4"></i>
                                </button>
                                <span class="font-bold w-4 text-center text-gray-100">${item.quantity}</span>
                                <button onclick="updateCartQuantity(${product.id}, 1)" class="p-1 text-neon-cyan bg-card-bg border border-neon-cyan/50 rounded-full hover:bg-dark-navy transition">
                                    <i data-lucide="plus" class="w-4 h-4"></i>
                                </button>
                                <button onclick="removeFromCart(${product.id})" class="p-1 text-red-500 hover:text-red-300 transition ml-2">
                                    <i data-lucide="trash-2" class="w-5 h-5"></i>
                                </button>
                            </div>
                        </div>
                    `;
                }).join('');
            }

            totalDisplay.textContent = `$${total.toFixed(2)}`;
            cartCountDisplay.textContent = totalItems;

            if (totalItems > 0) {
                cartCountDisplay.classList.remove('scale-0', 'opacity-0');
                cartCountDisplay.classList.add('scale-100', 'opacity-100');
            } else {
                cartCountDisplay.classList.remove('scale-100', 'opacity-100');
                cartCountDisplay.classList.add('scale-0', 'opacity-0');
            }

            lucide.createIcons();
        };

        // --- 5. CART MANAGEMENT LOGIC ---

        /**
         * Simulates placing an order.
         */
        window.placeOrder = () => {
            if (cart.length === 0) {
                showNotification('Your cart is empty. Please add items before checking out.', 'error');
                return;
            }

            // Save cart to sessionStorage for checkout page
            sessionStorage.setItem('checkoutCart', JSON.stringify(cart));
            
            // Close the cart sidebar
            toggleCart();
            
            // Redirect to checkout page
            window.location.href = 'checkout.html';
        };

        /**
         * Adds a product to the cart or increments its quantity.
         * @param {number} productId The ID of the product to add.
         */
        window.addToCart = (productId) => {
            const product = getProductById(productId);
            if (!product) return showNotification('Product not found.', 'error');

            const existingItem = cart.find(item => item.productId === productId);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ productId, quantity: 1 });
            }

            showNotification(`${product.name} added to cart!`, 'success');
            renderCart();
        };

        /**
         * Updates the quantity of an item in the cart.
         * @param {number} productId The ID of the product.
         * @param {number} change The amount to change the quantity by (+1 or -1).
         */
        window.updateCartQuantity = (productId, change) => {
    // 1. Find the INDEX of the item in the cart array
    const itemIndex = cart.findIndex(item => item.productId === productId);

    // 2. Check if the item was found (findIndex returns -1 if not found)
    if (itemIndex > -1) {
        // 3. Get a reference to the actual item object using the index
        const item = cart[itemIndex];
        item.quantity += change;

        if (item.quantity <= 0) {
            // If quantity reaches zero or less, remove it using the index
            cart.splice(itemIndex, 1);
            showNotification(`Item removed from cart.`, 'info');
        } else {
            // Assuming getProductById works and returns an object with a 'name'
            const productName = getProductById(productId) ? getProductById(productId).name : 'Item';
        }
        // 4. Re-render the cart display
        renderCart(); 
    }

    // If itemIndex is -1, the item wasn't in the cart, so the function exits.
};

        /**
         * Removes a product completely from the cart.
         * @param {number} productId The ID of the product to remove.
         */
        window.removeFromCart = (productId) => {
            const initialLength = cart.length;
            cart = cart.filter(item => item.productId !== productId);

            if (cart.length < initialLength) {
                showNotification(`${getProductById(productId).name} removed from cart.`, 'success');
                renderCart();
            }
        };

        // --- 6. EVENT LISTENERS AND INITIALIZATION ---

        const cartSidebar = document.getElementById('cart-sidebar');
        const cartToggleButton = document.getElementById('cart-toggle-button');
        const closeCartButton = document.getElementById('close-cart-button');

        /**
         * Toggles the visibility of the cart sidebar.
         */
        const toggleCart = () => {
            if (cartSidebar.classList.contains('translate-x-full')) {
                cartSidebar.classList.remove('translate-x-full');
            } else {
                cartSidebar.classList.add('translate-x-full');
            }
        };

        // Event listeners
        cartToggleButton.addEventListener('click', toggleCart);
        closeCartButton.addEventListener('click', toggleCart);

        // Close cart when clicking outside (on the body/overlay, simulating a backdrop)
        document.body.addEventListener('click', (event) => {
            const isCartOpen = !cartSidebar.classList.contains('translate-x-full');
            if (isCartOpen &&
                !cartSidebar.contains(event.target) &&
                !cartToggleButton.contains(event.target)) {
                toggleCart();
            }
        });

        /**
         * Gets best seller products.
         * @returns {Array} Best seller products.
         */
        const getBestSellers = () => {
            return MOCK_PRODUCTS.filter(p => p.isBestSeller).slice(0, 4);
        };

        /**
         * Gets products with discounts.
         * @returns {Array} Products with discounts.
         */
        const getDeals = () => {
            return MOCK_PRODUCTS.filter(p => p.discount > 0)
                .sort((a, b) => b.discount - a.discount)
                .slice(0, 4);
        };

        /**
         * Renders best sellers section.
         */
        const renderBestSellers = () => {
            const container = document.getElementById('best-sellers-grid');
            if (!container) return;
            
            const bestSellers = getBestSellers();
            container.innerHTML = bestSellers.map(renderProductCard).join('');
            lucide.createIcons();
        };

        /**
         * Renders deals section.
         */
        const renderDeals = () => {
            const container = document.getElementById('deals-grid');
            if (!container) return;
            
            const deals = getDeals();
            container.innerHTML = deals.map(renderProductCard).join('');
            lucide.createIcons();
        };

        // Initialize the app when the DOM is fully loaded
        window.onload = () => {
            console.log("Next-circuit initialized.");
            
            // Check if order was just completed
            const lastOrder = sessionStorage.getItem('lastOrder');
            if (lastOrder) {
                try {
                    const orderData = JSON.parse(lastOrder);
                    const orderMessage = `Your order #${orderData.orderId} has been placed successfully! Thank you for shopping with Next-circuit.`;
                    showNotification(orderMessage, 'success');
                    
                    // Clear the order data
                    sessionStorage.removeItem('lastOrder');
                    
                    // Clear the cart since order was completed
                    cart = [];
                } catch (e) {
                    console.error('Error parsing order data:', e);
                }
            }
            
            renderCategories();
            renderProducts();
            renderBestSellers();
            renderDeals();
            renderCart(); // Initialize cart display
        };
