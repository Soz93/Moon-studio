// ===== Cart =====
const cartCount = document.getElementById('cart-count');
let cart = JSON.parse(localStorage.getItem('cart')) || [];
function updateCartCount(){ cartCount.textContent = cart.reduce((sum,i)=>sum+i.quantity,0);}
updateCartCount();

// ===== Add to Cart =====
document.querySelectorAll('.box').forEach(product=>{
    product.addEventListener('click', ()=>{
        const name = product.querySelector('h4').innerText.split('Price')[0].trim();
        const price = parseInt(product.querySelector('h4').innerText.match(/£\d+/)[0].replace('£',''));
        const existing = cart.find(i=>i.name===name);
        if(existing){ existing.quantity +=1;}
        else{ cart.push({name,price,quantity:1}); }
        localStorage.setItem('cart',JSON.stringify(cart));
        updateCartCount();
    });
});

// ===== Filters =====
document.querySelectorAll('.our-work ul li').forEach(btn=>{
    btn.addEventListener('click',()=>{
        document.querySelectorAll('.our-work ul li').forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        const category = btn.textContent.toLowerCase();
        document.querySelectorAll('.our-work .col-lg-3').forEach(box=>{
            box.style.display = (category==='all' || box.dataset.category===category) ? 'block':'none';
        });
    });
});

// ===== Cart Display =====
const summaryDiv = document.querySelector('.summary');
if(summaryDiv){
    function renderCart(){
        summaryDiv.innerHTML = '<h5 class="mb-3"><i class="fas fa-box"></i> Your Selection</h5>';
        let total=0;
        cart.forEach((item,i)=>{
            summaryDiv.innerHTML += `
            <div class="cart-item mb-3">
                <p>Product: <strong>${item.name}</strong></p>
                <p>Quantity: <strong>${item.quantity}</strong></p>
                <p>Price: <strong>£${item.price*item.quantity}</strong></p>
                <button class="btn btn-danger btn-sm remove-item" data-index="${i}">Remove</button>
            </div>`;
            total += item.price*item.quantity;
        });
        summaryDiv.innerHTML += `<p><strong>Total: £${total}</strong></p>`;
    }
    renderCart();
    summaryDiv.addEventListener('click', e=>{
        if(e.target.classList.contains('remove-item')){
            const idx = e.target.dataset.index;
            cart.splice(idx,1);
            localStorage.setItem('cart',JSON.stringify(cart));
            updateCartCount();
            renderCart();
        }
    });
}


const form = document.getElementById('newsletter-form');
const emailInput = document.getElementById('email-input');
const messageDiv = document.getElementById('form-message');

form.addEventListener('submit', function(e){
    e.preventDefault();
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(email === ''){
        messageDiv.textContent = 'Please enter your email.';
        messageDiv.style.color = 'red';
    } else if(!emailRegex.test(email)){
        messageDiv.textContent = 'Please enter a valid email address.';
        messageDiv.style.color = 'red';
    } else {
        // تخزين الايميل في localStorage
        let subscribers = JSON.parse(localStorage.getItem('subscribers')) || [];
        subscribers.push(email);
        localStorage.setItem('subscribers', JSON.stringify(subscribers));

        messageDiv.textContent = 'Thank you for subscribing!';
        messageDiv.style.color = 'green';
        emailInput.value = '';
    }
});

const orderForm = document.querySelector('form[name="order"]');

orderForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(orderForm);

    fetch('/', {
        method: 'POST',
        body: formData
    })
    .then(() => {
        alert('✅ Your order has been successfully submitted!');
        orderForm.reset();
    })
    .catch(error => alert('❌ There was a problem submitting your order.'));
});
