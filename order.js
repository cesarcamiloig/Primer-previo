// Obtener el ID del carrito desde los parámetros de la URL
const urlParams = new URLSearchParams(window.location.search);
const cartId = urlParams.get('cartId');

// Obtener los detalles del carrito seleccionado
fetch(`https://fakestoreapi.com/carts/${cartId}`)
    .then(response => response.json())
    .then(cart => {
        const orderItems = document.getElementById('order-items');
        const fechaInput = document.getElementById('fecha');
        const pedidoInput = document.getElementById('pedido');
        let totalAmount = 0;

        // Setear la fecha y el número de pedido
        const cartDate = new Date(cart.date).toLocaleDateString();
        fechaInput.value = cartDate;
        pedidoInput.value = cart.id;

        // Crear fila de productos
        cart.products.forEach(item => {
            fetch(`https://fakestoreapi.com/products/${item.productId}`)
                .then(response => response.json())
                .then(product => {
                    const subtotal = item.quantity * product.price;
                    totalAmount += subtotal;

                    const productRow = `
                        <tr>
                            <td>${product.title}</td>
                            <td>${item.quantity}</td>
                            <td>$${product.price.toFixed(2)}</td>
                            <td>$${subtotal.toFixed(2)}</td>
                        </tr>`;
                    orderItems.innerHTML += productRow;
                    document.getElementById('total-amount').textContent = `Total: $${totalAmount.toFixed(2)}`;
                });
        });
    })
    .catch(error => {
        console.error('Error al obtener los detalles del carrito:', error);
        document.getElementById('order-items').innerHTML = '<tr><td colspan="4">Error cargando los detalles del carrito. Intente nuevamente más tarde.</td></tr>';
    });

// Funciones para botones (no funcionales, solo de interfaz)
function actualizarPedido() {
    alert("Pedido actualizado (solo interfaz).");
}

function confirmarPedido() {
    alert("Pedido confirmado (solo interfaz).");
}

function seguirComprando() {
    window.location.href = 'products.html';
}

function goBackToCart() {
    window.location.href = 'cart.html';
}

function logout() {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
}