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
                        budder: {
                            new: [{
                                dataUrl: "https://cdn.apicart.dev/external/vyqhp5m7fb2rgrcpocn1rzezr6pzsg88/data/DM/DME0002.json",
                                pageUrl: "/papaya-sorbet/",
                            }],
                            shatter: {
                                dataUrl: "https://cdn.apicart.dev/external/vyqhp5m7fb2rgrcpocn1rzezr6pzsg88/data/DM/DME0001.json",
                                pageUrl: "/legendary-haze/",
                            },
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