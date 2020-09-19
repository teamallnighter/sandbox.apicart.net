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
                        extracts: {
                            budder: [{
                                    dataUrl: "https://cdn.apicart.dev/external/vyqhp5m7fb2rgrcpocn1rzezr6pzsg88/data/DM/DME0002.json",
                                    pageUrl: "/papaya-sorbet/",
                                },
                                {
                                    dataUrl: "https://cdn.apicart.dev/external/vyqhp5m7fb2rgrcpocn1rzezr6pzsg88/data/DM/DME0003.json",
                                    pageUrl: "/mobey-dick/",
                                },
                            ],
                            shadder: [{
                                dataUrl: "https://cdn.apicart.dev/external/vyqhp5m7fb2rgrcpocn1rzezr6pzsg88/data/DM/DME0001.json",
                                pageUrl: "/legendary-haze/",
                            }],
                        },
                    },
                },
            },
        },
        vueComponentsTranslator: {
            localization: {
                en: {
                    categories: {
                        Extracts: {
                            title: "Extracts",
                            description: "All Extracts",
                            menu: "Extracts",
                            budder: {
                                title: "Budders",
                                description: "Kelowna's best budder",
                                menu: "Budder",
                            },
                            shadder: {
                                title: "Shadder",
                                description: "Kelownas best shadder",
                                menu: "Shadder",
                            },
                        },
                    },
                },
            },
        },
    }).initVueBundle();