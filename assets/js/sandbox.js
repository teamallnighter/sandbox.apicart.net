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
const cartDropdownWrapper = document.querySelector('.cart-dropdown__wrapper');
const generateDropdownTemplate = async () => {
	const price = store.hasCart() ? await (await store.getCart()).getTotalPrice() : 0;
	return utils.Strings.sprintf(document.querySelector('#cart-dropdown-template').innerHTML, {price: price});
};
const initCartDropdownButtonQuantity = async () => cartDropdownWrapper.innerHTML = await generateDropdownTemplate();

eventDispatcher.addListener(
	'cartDropdownButtonQuantity',
	store.eventDispatcherEvents.cart.UPDATED, async () => cartDropdownWrapper.innerHTML = await generateDropdownTemplate()
);

initCartDropdownButtonQuantity();



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
const recapitulationContent = document.querySelector('.recapitulation-content');
const initRecapitulation = async (cartEntity = null) => {
	if ( ! store.hasCart()) {
		recapitulationContent.innerHTML = document.querySelector('#recapitulation-empty-cart-template').innerHTML;
		return;
	}

	if (cartEntity === null) {
		cartEntity = await store.getCart();
	}

	let taxBase = 0;
	let vat = 0;
	let totalPrice = await cartEntity.getTotalPrice();
	let listItems = '';
	const cartItems = await cartEntity.getItems();

	utils.Loops.forEach(cartItems, (cartItem) => {
		const itemEntity = cartItem.getItem();
		const itemPrice = cartItem.getTotalPrice();
		const itemTaxRate = itemEntity.getTaxRate();
		const tax = (itemTaxRate / 100) * itemPrice;

		taxBase += itemPrice - tax;
		vat += tax;
		listItems += utils.Strings.sprintf(document.querySelector('#recapitulation-list-item-template').innerHTML, {
			name: itemEntity.getName(),
			price: parseFloat(itemPrice).toFixed(2),
			quantity: cartItem.getQuantity(),
			itemUrl: itemEntity.getDataUrl()
		});
	});

	recapitulationContent.innerHTML = utils.Strings.sprintf(
		document.querySelector('#recapitulation-list-template').innerHTML,
		{
			taxBase: parseFloat(taxBase).toFixed(2),
			vat: parseFloat(vat).toFixed(2),
			totalPrice: parseFloat(totalPrice).toFixed(2),
			listItems: listItems
		}
	);

}

eventDispatcher.addListener(
	'recapitulation', store.eventDispatcherEvents.cart.UPDATED, (cartEntity) => initRecapitulation(cartEntity)
);

initRecapitulation();



/****************************** Cart quantity form ******************************/
utils.Dom
	.on('click', '.cart-item-quantity-button--plus', async (event) => {
		const input = event.target.parentElement.querySelector('input');
		input.value = parseInt(input.value) + 1;
		utils.Dom.trigger('change', input);
	})
	.on('click', '.cart-item-quantity-button--minus', async (event) => {
		const input = event.target.parentElement.querySelector('input');
		input.value = parseInt(input.value) - 1;
		utils.Dom.trigger('change', input);
	})
	.on('change', '.cart-item-quantity-input', async (event) => {
		const cart = await store.getCart();
		const cartEntity = await cart.getEntity();
		const input = event.target;
		const itemUrl = input.getAttribute('data-item-url');
		const selectedItem = cartEntity.findItemByDataUrl(itemUrl);
		const selectedItemQuantity = selectedItem.getQuantity();
		const inputValue = parseInt(input.value);

		if (inputValue <= 0) {
			input.value = 0
		}

		if (inputValue > selectedItemQuantity) {
			cart.addItem(itemUrl, inputValue - selectedItemQuantity);

		} else if (inputValue < selectedItemQuantity) {
			cart.removeItem(itemUrl, selectedItemQuantity - inputValue);
		}
	});



/****************************** Payment methods list ******************************/
const initPaymentMethodsList = async () => {
	const selectElement = document.querySelector('#payment-methods');
	const paymentMethods = await store.getPaymentMethods();
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

	utils.Loops.forEach(shippingMethods, (paymentMethod) => {
		const optionElement = document.createElement('option');
		optionElement.setAttribute('value', paymentMethod.getId());
		optionElement.innerHTML = paymentMethod.getName();
		selectElement.appendChild(optionElement);
	});
}

initShippingMethodsList();



/****************************** Finish order ******************************/
utils.Dom.on('click', '.finish-cart', async (event) => {
	const cart = await store.getCart();
	let parameters = {}

	utils.Loops.forEach(document.querySelectorAll('[data-apicart-cart-parameter-key]'), (elementWithParameter) => {
		utils.Objects.assign(
			parameters,
			elementWithParameter.getAttribute('data-apicart-cart-parameter-key'),
			elementWithParameter.value
		);
	});

	await cart.addParameters(parameters);
	cart.finish();
	return false;
});

eventDispatcher.addListener('finishCartModal', store.eventDispatcherEvents.cart.FINISHED, () => {
	Swal.fire({
		title: 'Order sent!',
		html: 'Your order have been successfully finished. <br>You can create another one.',
		icon: 'success'
	});

	store.Storage.clearCustomer();
	window.scrollTo(0, 0);
});
