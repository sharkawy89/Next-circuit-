// FRONTEND INTEGRATION GUIDE
// Add this to your index.js or create a new api-client.js file

const API_URL = 'http://localhost:5000/api';
let authToken = localStorage.getItem('authToken');

// ===== Authentication API =====

// Register new user
async function registerUser(name, email, password) {
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name,
                email,
                password,
                confirmPassword: password
            })
        });
        
        const data = await response.json();
        if (response.ok) {
            authToken = data.token;
            localStorage.setItem('authToken', authToken);
        }
        return data;
    } catch (error) {
        console.error('Registration error:', error);
        return { error: 'Registration failed' };
    }
}

// Login user
async function loginUser(email, password) {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        if (response.ok) {
            authToken = data.token;
            localStorage.setItem('authToken', authToken);
        }
        return data;
    } catch (error) {
        console.error('Login error:', error);
        return { error: 'Login failed' };
    }
}

// Logout user
function logoutUser() {
    authToken = null;
    localStorage.removeItem('authToken');
}

// ===== Products API =====

// Get all products with optional filters
async function getProducts(filters = {}) {
    try {
        let url = `${API_URL}/products`;
        const params = new URLSearchParams();
        
        if (filters.category) params.append('category', filters.category);
        if (filters.minPrice) params.append('minPrice', filters.minPrice);
        if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
        if (filters.search) params.append('search', filters.search);
        
        if (params.toString()) {
            url += '?' + params.toString();
        }
        
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

// Get single product
async function getProduct(productId) {
    try {
        const response = await fetch(`${API_URL}/products/${productId}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
}

// ===== Cart API =====

// Get user cart
async function getCart() {
    try {
        const response = await fetch(`${API_URL}/cart`, {
            headers: { 'Authorization': `Bearer ${authToken}` }
        });
        return await response.json();
    } catch (error) {
        console.error('Error fetching cart:', error);
        return null;
    }
}

// Add item to cart
async function addToCart(productId, quantity = 1) {
    try {
        const response = await fetch(`${API_URL}/cart/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({ productId, quantity })
        });
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error adding to cart:', error);
        return { error: 'Failed to add to cart' };
    }
}

// Remove item from cart
async function removeFromCart(productId) {
    try {
        const response = await fetch(`${API_URL}/cart/remove`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({ productId })
        });
        
        return await response.json();
    } catch (error) {
        console.error('Error removing from cart:', error);
        return { error: 'Failed to remove from cart' };
    }
}

// Update cart item quantity
async function updateCartItem(productId, quantity) {
    try {
        const response = await fetch(`${API_URL}/cart/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({ productId, quantity })
        });
        
        return await response.json();
    } catch (error) {
        console.error('Error updating cart:', error);
        return { error: 'Failed to update cart' };
    }
}

// Clear entire cart
async function clearCart() {
    try {
        const response = await fetch(`${API_URL}/cart/clear`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${authToken}` }
        });
        
        return await response.json();
    } catch (error) {
        console.error('Error clearing cart:', error);
        return { error: 'Failed to clear cart' };
    }
}

// ===== Orders API =====

// Create order
async function createOrder(shippingAddress, paymentMethod = 'credit_card') {
    try {
        const response = await fetch(`${API_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({
                shippingAddress,
                paymentMethod
            })
        });
        
        return await response.json();
    } catch (error) {
        console.error('Error creating order:', error);
        return { error: 'Failed to create order' };
    }
}

// Get user orders
async function getUserOrders() {
    try {
        const response = await fetch(`${API_URL}/orders`, {
            headers: { 'Authorization': `Bearer ${authToken}` }
        });
        return await response.json();
    } catch (error) {
        console.error('Error fetching orders:', error);
        return [];
    }
}

// Get order details
async function getOrderDetails(orderId) {
    try {
        const response = await fetch(`${API_URL}/orders/${orderId}`, {
            headers: { 'Authorization': `Bearer ${authToken}` }
        });
        return await response.json();
    } catch (error) {
        console.error('Error fetching order:', error);
        return null;
    }
}

// Cancel order
async function cancelOrder(orderId) {
    try {
        const response = await fetch(`${API_URL}/orders/${orderId}/cancel`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${authToken}` }
        });
        
        return await response.json();
    } catch (error) {
        console.error('Error cancelling order:', error);
        return { error: 'Failed to cancel order' };
    }
}

// ===== User Profile API =====

// Get user profile
async function getUserProfile() {
    try {
        const response = await fetch(`${API_URL}/users/profile`, {
            headers: { 'Authorization': `Bearer ${authToken}` }
        });
        return await response.json();
    } catch (error) {
        console.error('Error fetching profile:', error);
        return null;
    }
}

// Update user profile
async function updateUserProfile(name, phone, address) {
    try {
        const response = await fetch(`${API_URL}/users/profile`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({ name, phone, address })
        });
        
        return await response.json();
    } catch (error) {
        console.error('Error updating profile:', error);
        return { error: 'Failed to update profile' };
    }
}

// ===== USAGE EXAMPLES =====

/*
// Register
registerUser('John Doe', 'john@example.com', 'password123')
    .then(data => console.log(data));

// Login
loginUser('john@example.com', 'password123')
    .then(data => console.log(data));

// Get products
getProducts({ category: 'smartphones', minPrice: 500, maxPrice: 1500 })
    .then(products => console.log(products));

// Add to cart
addToCart('productId123', 1)
    .then(data => console.log(data));

// Create order
createOrder({
    street: '123 Main St',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'USA'
})
.then(data => console.log(data));

// Logout
logoutUser();
*/
