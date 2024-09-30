const token = localStorage.getItem('token');
        const userId = 1; // Assuming a single user

        // Fetch products by category from API
        function filterProducts(category) {
            let url = 'https://fakestoreapi.com/products';
            if (category) {
                url = `https://fakestoreapi.com/products/category/${category}`;
            }

            fetch(url)
                .then(response => response.json())
                .then(products => {
                    const productsContainer = document.getElementById('products');
                    productsContainer.innerHTML = ''; // Clear existing products

                    products.forEach(product => {
                        const productDiv = document.createElement('div');
                        productDiv.className = 'product';
                        productDiv.innerHTML = `
                            <img src="${product.image}" alt="${product.title}">
                            <h3>${product.title}</h3>
                            <p>$${product.price}</p>
                            <button onclick="addToCart(${product.id}, '${product.title}', ${product.price})">Add to Cart</button>
                        `;
                        productsContainer.appendChild(productDiv);
                    });
                });
        }

        // Load all products on page load
        filterProducts('');

        // Function to add products to the cart (locally)
        function addToCart(productId, title, price) {
            alert('Producto agregado');
        }

        // Function to view the cart (fetches cart from API)
        function viewCart() {
            window.location.href = `cart.html?userId=${userId}`;
        }

        // Function to logout
        function logout() {
            localStorage.removeItem('token');
            window.location.href = 'login.html';
        }