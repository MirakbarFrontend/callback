const list2 = document.getElementById('list2');

function randomGradient() {
	const colors = [
		['#FFDEE9', '#B5FFFC'],
		['#D4FC79', '#96E6A1'],
		['#84FAB0', '#8FD3F4'],
		['#FEB692', '#EA5455'],
		['#FAD0C4', '#FFD1FF'],
		['#A18CD1', '#FBC2EB'],
		['#FDC830', '#F37335'],
		['#00B4DB', '#0083B0'],
	];
	const choice = colors[Math.floor(Math.random() * colors.length)];
	return `linear-gradient(135deg, ${choice[0]}, ${choice[1]})`;
}

function xhr(url) {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.open('GET', url);

		xhr.onload = function () {
			if (xhr.readyState === 4 && xhr.status === 200) {
				const data = JSON.parse(xhr.responseText);
				resolve(data);
			} else {
				reject('Error fetching data');
			}
		};

		xhr.onerror = function () {
			reject('Network error occurred');
		};

		xhr.send();
	});
}

const cartTitle = document.querySelector('.cart-title');

// Savat container (yashirin)
const cartContainer = document.createElement('div');
cartContainer.classList.add('cart-container');
cartContainer.style.display = 'none';
cartTitle.after(cartContainer);

let cartItems = [];

cartTitle.addEventListener('click', () => {
	cartContainer.style.display = cartContainer.style.display === 'none' ? 'block' : 'none';
});

function renderCart() {
	cartContainer.innerHTML = '';
	cartItems.forEach(item => cartContainer.appendChild(item));
}

//  FETCH PRODUCTS
xhr('https://fakestoreapi.com/products')
	.then(data => {
		data.forEach(item => {
			const li = document.createElement('li');
			const btn = document.createElement('button');
			btn.textContent = 'Buy Now';
			btn.classList.add('product-btn');

			li.innerHTML = `
				<div class="products">
					<img src="${item.image}" alt="${item.title}" class="products__image"/>
					<span class="products__id">#${item.id}</span>
					<h2 class="products__title">${item.title}</h2>
					<p class="products__description">${item.description}</p>
					<p class="products__price">$${item.price}</p>
					<p class="products__category">${item.category}</p>
					<p class="products__rating">
						⭐ <span>${item.rating.rate}</span> | <span>${item.rating.count} reviews</span>
					</p>
				</div>
			`;

			const productDiv = li.querySelector('.products');
			productDiv.appendChild(btn);
			productDiv.style.background = randomGradient();

			btn.addEventListener('click', () => {
				const clonedProduct = productDiv.cloneNode(true);
				const clonedBtn = clonedProduct.querySelector('.product-btn');
				if (clonedBtn) clonedBtn.remove();

				cartItems.push(clonedProduct);
				cartTitle.textContent = `Savat (${cartItems.length})`;

				renderCart();
			});

			list2.appendChild(li);
		});
	})
	.catch(error => {
		console.log(error);
	});

// xhr('https://jsonplaceholder.typicode.com/todos', (data, error) => {
// 	const li = document.createElement('li');
// 	data.forEach(item => {
// 		li.innerHTML += `
//             <div class="${item.completed ? 'completedTrue' : 'completedFalse'}">
//                 <h1>${item.id}</h1>
//                 <h1>${item.title}</h1>
//             </div>
//         `;
// 	});
// 	list.appendChild(li);
// });
