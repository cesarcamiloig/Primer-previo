const userId = 1; // Cambia según el usuario autenticado

        // Obtener los carritos del usuario
        fetch(`https://fakestoreapi.com/carts/user/${userId}`)
            .then(response => response.json())
            .then(carts => {
                const cartListDiv = document.getElementById('cart-list');
                
                if (carts.length === 0) {
                    cartListDiv.innerHTML = '<p>No hay carritos para este usuario.</p>';
                    return;
                }

                // Crear tabla de carritos
                let cartTable = `<table>
                                    <tr>
                                        <th>Número</th>
                                        <th>Fecha Solicitud</th>
                                        <th>Acciones</th>
                                    </tr>`;

                carts.forEach(cart => {
                    const cartDate = new Date(cart.date).toLocaleDateString();
                    cartTable += `<tr>
                                    <td>${cart.id}</td>
                                    <td>${cartDate}</td>
                                    <td><a href="order.html?cartId=${cart.id}">Ver</a></td>
                                  </tr>`;
                });

                cartTable += `</table>`;
                cartListDiv.innerHTML = cartTable;
            })
            .catch(error => {
                console.error('Error al obtener carritos:', error);
                document.getElementById('cart-list').innerHTML = '<p>Error cargando los carritos. Intente nuevamente más tarde.</p>';
            });

        // Función para regresar a la página de productos
        function goBack() {
            window.location.href = 'products.html';
        }