window.apicartConfig = window.apicartConfig || [];
function apicartConfigure(config){apicartConfig.push(config)}
apicartConfigure({
	token: "9mCu3DlBCa4REI?Q7kKly!Rw6!_FvD8K_dgPXe1b20?r6!sPTQMyCpq_ADt!jXOD",
	currencySymbol: '$',
	currencySymbolPositionLeft: true,
	currencySymbolWithSpace: false,
	cart: {
		apiUrl: 'https://store-api.apicart.dev'
	},
	customer: {
		apiUrl: 'https://store-api.apicart.dev'
	},
	order: {
		apiUrl: 'https://store-api.apicart.dev'
	},
	paymentMethods: {
		apiUrl: 'https://store-api.apicart.dev'
	},
	shippingMethods: {
		apiUrl: 'https://store-api.apicart.dev'
	},
	init: function () {
		var quantityManipulators = document.querySelectorAll('.quantity-manipulator');
		Utils.loops.forEach(quantityManipulators, function (key, quantityManipulator) {
			apicart.cartQuantityManipulator.render({
				el: quantityManipulator,
				itemUrl: quantityManipulator.getAttribute('data-item-url'),
				submitButton: 'Add to Cart'
			})
		});

		apicart.cartDropdown.render({
			el: '.cart-dropdown',
			showQuantityManipulator: true,
			removalButton: '<i class="fa fa-times-circle" data-apicart-cart-remove-item="%dataUrl%" role="button"></i>',
			toggleButton: '<i class="fa fa-shopping-cart fa-lg cursor-pointer"></i> <strong class="cart-dropdown-items-count">%itemsCount%</strong>',
			infoBlock: '<strong>%name%</strong>',
			footerBlocks: [
				function (itemsCount, itemsPrice) {
					return '<div class="text-left">Number of items: ' + itemsCount + '<br>Total price: '
								+ Brackets.getFilter('currency').call(null, itemsPrice);
							+ '</div>';
				},
				'<div class="text-right"><a href="/cart-overview.html" class="btn btn-danger">Finish Order<i class="fa fa-chevron-circle-right ml-1"></i></a></div>'
			]
		});

		Utils.eventDispatcher.addListener('item-added-popup', [apicart.cart.events.ITEM_ADDED, apicart.cart.events.ITEM_UPDATED], function (item) {
			var popup = $('#add-to-cart-modal');
			popup.find('.modal-title').html('Cart updated 🎉️');
			popup.find('.modal-body').html('<strong>' + item.name + '</strong> was successfully added into the cart!');
			popup.modal('show');
		});

		if (Utils.flashMessages.hasMessages()) {
			var messages = '';

			Utils.flashMessages.processMessages(function (content) {
				if (messages) {
					messages += '<br>';
				}

				messages += '<div class="text-center"><strong>' + content + '</strong></div>';
			});

			var popup = $('#flash-messages-modal');
			popup.find('.modal-body').html(messages);
			popup.modal('show');
		}
	}
});

window.redirectIfCartIsEmpty = function () {
	if ( ! apicart.cart.manager.getItemsCount()) {
		Utils.flashMessages.addMessage('Your cart is empty 😱!');
		window.location.href = '/';
	}
};