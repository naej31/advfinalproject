document.querySelector('.checkout-btn').addEventListener('click', () => {
    if (cart.length === 0) {
        alert("Error: No items in your order. Please add products to your cart before proceeding to checkout.");
    } else {
        document.querySelector('#order').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        const cartModal = document.querySelector('.cart-modal');
        cartModal.classList.add('fade-out');

        setTimeout(() => {
            cartModal.classList.add('hidden');
        }, 500); 
    }
});

const cart = [];

document.querySelectorAll('.add-to-cart').forEach((btn, index) => {
    btn.addEventListener('click', () => {
        const productName = btn.parentElement.querySelector('h3').textContent;
        const productPrice = parseFloat(btn.parentElement.querySelector('.price').getAttribute('data-price'));

        const productIndex = cart.findIndex(item => item.name === productName);

        if (productIndex !== -1) {
            cart[productIndex].quantity++;
        } else {
            cart.push({
                name: productName,
                price: productPrice,
                quantity: 1
            });
        }

        updateCartDisplay();
    });
});

document.querySelector('.shop-btn').addEventListener('click', () => {
    document.querySelector('.cart-modal').classList.remove('hidden');
});

document.querySelector('.close-cart').addEventListener('click', () => {
    document.querySelector('.cart-modal').classList.add('hidden');
});

function updateCartDisplay() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalPriceElement = document.querySelector('.total-price');

    cartItemsContainer.innerHTML = '';

    let totalPrice = 0;

    cart.forEach((item, index) => {
        const cartItem = document.createElement('li');
        cartItem.innerHTML = `
            ${item.name} - $${item.price.toFixed(2)} x ${item.quantity}
            <button class="btn decrease" data-index="${index}">-</button>
            <button class="btn increase" data-index="${index}">+</button>
            <button class="btn remove" data-index="${index}">Remove</button>
        `;

        totalPrice += item.price * item.quantity;
        cartItemsContainer.appendChild(cartItem);
    });

    totalPriceElement.textContent = totalPrice.toFixed(2);

    document.querySelectorAll('.decrease').forEach(button => {
        button.addEventListener('click', () => {
            const index = button.getAttribute('data-index');
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
            } else {
                cart.splice(index, 1);
            }
            updateCartDisplay();
        });
    });

    document.querySelectorAll('.increase').forEach(button => {
        button.addEventListener('click', () => {
            const index = button.getAttribute('data-index');
            cart[index].quantity++;
            updateCartDisplay();
        });
    });

    document.querySelectorAll('.remove').forEach(button => {
        button.addEventListener('click', () => {
            const index = button.getAttribute('data-index');
            cart.splice(index, 1);
            updateCartDisplay();
        });
    });
}

document.querySelector('.checkout-btn').addEventListener('click', () => {
    if (cart.length === 0) {
        alert("Error: No items in your order. Please add products to your cart before proceeding to checkout.");
    } else {
        document.querySelector('#order').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        const cartModal = document.querySelector('.cart-modal');
        cartModal.classList.add('fade-out');

        setTimeout(() => {
            cartModal.classList.add('hidden');
        }, 500); 
    }
});
