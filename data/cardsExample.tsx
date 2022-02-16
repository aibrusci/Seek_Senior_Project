const Images = [
    { image: require("../assets/banners/food-banner1.jpg") },
    { image: require("../assets/banners/food-banner2.jpg") },
    { image: require("../assets/banners/food-banner3.jpg") },
    { image: require("../assets/banners/food-banner4.jpg") },
];

export const markers = [
    {
        id: 1,
        title: "COYA Taco Night",
        date: "Tuesday Nights 5-9pm",
        image: Images[0].image,
        savedIcon: false,
        description: "best tacos ever",
        filterCategories: [
            "Family Friendly",
            "All Ages",
            "Peruvian",
            "Food",
            "Deal"
        ],
        coordinate:{
            latitude: 35.2787,
            longitude: -120.6588,
        }
    },
    {
        id: 2,
        title: "Libertine Comedy Night",
        date: "Wednesday Nights 5-9pm",
        image: Images[1].image,
        savedIcon: true,
        description: "get crunckkkkk",
        filterCategories: ["Food", "Comedy", "Night Life", "Downtown"],
        coordinate: {
            latitude: 35.277694,
            longitude: -120.663137,
        }
    },
    {
        id: 3,
        title: "Woodstock's Trivia Night",
        date: "Monday Nights 9-11pm",
        image: Images[2].image,
        savedIcon: true,
        description: "pizza is yummy",
        filterCategories: [
            "Family Friendly",
            "All Ages",
            "Trivia",
            "Night Life",
            "Downtown"
        ],
        coordinate: {
            latitude: 35.2813,
            longitude: -120.6607,
        }
    },
];

export const mapStandardStyle= [
    {
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
];