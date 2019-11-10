/****************************** Initialization ******************************/
Apicart.setDevEnv();

const utils = Apicart.Utils;
const eventDispatcher = utils.EventDispatcher

const store = new Apicart.Store({
	token: '9mCu3DlBCa4REI?Q7kKly!Rw6!_FvD8K_dgPXe1b20?r6!sPTQMyCpq_ADt!jXOD',
});



/****************************** Add item to cart button ******************************/
utils.Dom.on('click', '.add-item-to-cart', async (event) => {
	const cart = await store.getCart();
	cart.addItem(event.target.getAttribute('data-item-url'));
});



/****************************** Cart dropdown button ******************************/
const cartDropdownButtonQuantity = document.querySelector('.cart-dropdown__button-quantity');
const initCartDropdownButtonQuantity = async () => {
	if (store.hasCart()) {
		cartDropdownButtonQuantity.innerHTML = await (await store.getCart()).getTotalPrice();
	}
}

initCartDropdownButtonQuantity();

eventDispatcher.addListener(
	'cartDropdownButtonQuantity',
	store.eventDispatcherEvents.cart.UPDATED,
	(cartEntity) => {
		cartDropdownButtonQuantity.innerHTML = cartEntity.getTotalPrice();
	}
);



/****************************** Cart updated modal ******************************/
eventDispatcher.addListener(
	'cartUpdatedModal',
	[store.eventDispatcherEvents.cart.ITEM_ADDED, store.eventDispatcherEvents.cart.ITEM_UPDATED],
	(cartItemEntity) => {
		Swal.fire({
			title: 'Cart updated!',
			html: 'Item <strong>' + cartItemEntity.getItem().getName() + '</strong> was successfully added into the cart',
			icon: 'success',
			confirmButtonText: 'Continue shopping'
		});
	}
);


/****************************** Order recapitulation ******************************/


/****************************** Payment methods list ******************************/
const initPaymentMethodsList = async () => {
	const selectElement = document.querySelector('#payment-methods');
	const paymentMethods = await store.getPaymentMethods();
	console.log(paymentMethods);
	utils.Loops.forEach(paymentMethods, (paymentMethod) => {
		const optionElement = document.createElement('option');
		optionElement.setAttribute('value', paymentMethod.getId());
		optionElement.innerHTML = paymentMethod.getName();
		selectElement.appendChild(optionElement);
	});
}

initPaymentMethodsList();

/****************************** Shipping methods list ******************************/
const initShippingMethodsList = async () => {
	const selectElement = document.querySelector('#shipping-methods');
	const shippingMethods = await store.getShippingMethods();
	console.log(shippingMethods);
	utils.Loops.forEach(shippingMethods, (paymentMethod) => {
		const optionElement = document.createElement('option');
		optionElement.setAttribute('value', paymentMethod.getId());
		optionElement.innerHTML = paymentMethod.getName();
		selectElement.appendChild(optionElement);
	});
}
initShippingMethodsList();


/****************************** Form parameters ******************************/
utils.Dom.on('change', '.add-parameter-to-cart', async (event) => {
	const cart = await store.getCart()
	const parameterKeyPath = event.target.getAttribute('data-parameter-key');
	cart.addParameter(parameterKeyPath, event.target.value);
});


/****************************** Finish order ******************************/
utils.Dom.on('click', '.finish-cart', () => {
	const cart = await store.getCart();
	cart.finish();
});

eventDispatcher.addListener('finishCartModal', store.eventDispatcherEvents.cart.FINISH, () => {
	Swal.fire({
		title: 'Order sent!',
		html: 'Your order have been successfully finished.<br>Page will be refreshed.',
		icon: 'success'
	});
});
