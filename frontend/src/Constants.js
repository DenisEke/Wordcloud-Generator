const examples = [{
    url: "./examples/example_1.png",
    jobId: "Gjrmm6rg4DbJ3MR0Dsjw"
},
    {
        url: "./examples/example_2.png",
        jobId: "kzuuuCvfNd5yFkYWjeHC",
    }, {
        url: "./examples/example_3.png",
        jobId: "2fE3MV9GP06cHA64mi5K",
    }, {
        url: "./examples/example_4.png",
        jobId: "M9jYcwy8T1NGCyIwC64L",
    },
];

const both = {
    examples: examples,
    socialProof: [
        examples[0],
        examples[1],
        examples[2],
        examples[3],
    ],
    firebase: {
        apiKey: "AIzaSyB16BAJhBLF8Q8z6oikZ9rmnIiR61kaCSA",
        authDomain: "wordcloud-gen.firebaseapp.com",
        databaseURL: "https://wordcloud-gen.firebaseio.com",
        projectId: "wordcloud-gen",
        storageBucket: "wordcloud-gen.appspot.com",
        messagingSenderId: "309368046144",
        appId: "1:309368046144:web:99abdeec3c6f0bcdb695a5",
        measurementId: "G-QZDF0C26CS"
    }
};

const prod = {
    backendUrl: "https://wordcloud-gen.ew.r.appspot.com/",
    stripeKey: "pk_live_5UoNnbMt2GmOcQ2Xr7TaCMf000uNyVyiAr",
    ...both,
};
const dev = {
    backendUrl: "http://localhost:8080/",
    stripeKey: "pk_test_51GttgGAkdDBj9p5dtsPWEjrplKU238DhHF76EhbWpKdOj4hz3yadKJsSMGgRo3LVygKnaNogesSL4c91mIH3qaso00x3bbRe9v",
    ...both,
};

export const config = (process.env.NODE_ENV === "development") ? dev : prod;