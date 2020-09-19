Apicart
    .setDevEnv()
    .configure({
        store: new Apicart.Store({
            token: "cTlIn5?3ODMsXifEpUvbmuY_Moqbsj?5NrHOYInYiSdptTxdGVR_f8ExfWj9qLsL",
        }),
        payments: new Apicart.Payments({
            token: "Qsc5oKZix7Jdzpz8c0AkbqHNjlpMgW_naATAwJD4lNW6V0WyH!5cWcMhQiY1AHZI",
        }),
        vueComponents: {
            paymentMethodsList: {
                allowedMethods: ["cash", "bank-transfer"],
            },
            cartDropdown: {
                dropdownPosition: "right",
            },
            category: {
                products: {
                    list: {
                        clothes: {
                            new: [{
                                    dataUrl: "https://cdn.apicart.dev/external/wlhv1egho2u4p0e0nkne2mks7f9btigi/data/01/1.json",
                                    pageUrl: "/green-t-shirt/",
                                },
                                "https://cdn.apicart.dev/external/wlhv1egho2u4p0e0nkne2mks7f9btigi/data/02/2.json",
                                "https://cdn.apicart.dev/external/wlhv1egho2u4p0e0nkne2mks7f9btigi/data/03/3.json",
                                "https://cdn.apicart.dev/external/wlhv1egho2u4p0e0nkne2mks7f9btigi/data/04/4.json",
                            ],
                            discount: [
                                "https://cdn.apicart.dev/external/wlhv1egho2u4p0e0nkne2mks7f9btigi/data/04/4.json",
                                "https://cdn.apicart.dev/external/wlhv1egho2u4p0e0nkne2mks7f9btigi/data/03/3.json",
                                "https://cdn.apicart.dev/external/wlhv1egho2u4p0e0nkne2mks7f9btigi/data/02/2.json",
                                "https://cdn.apicart.dev/external/wlhv1egho2u4p0e0nkne2mks7f9btigi/data/01/1.json",
                            ],
                        },
                    },
                },
            },
        },
        vueComponentsTranslator: {
            localization: {
                en: {
                    categories: {
                        clothes: {
                            title: "The best extracts",
                            description: "Extracts",
                            menu: "T-shirts",
                            new: {
                                title: "New collection",
                                description: "T-shirts from our new collection.",
                                menu: "New collection",
                            },
                            discount: {
                                title: "Dave's Master Extracts",
                                description: "Clean and hig extracts",
                                menu: "Discount",
                            },
                        },
                    },
                },
            },
        },
    }).initVueBundle();