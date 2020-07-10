const form = [{
        name: "birthCert",
        question: "Do you have an original or certified copy of your birth certificate?",
        type: "boolean",
    },
    {
        name: "birthCertUS",
        question: "Is your birth certificate from the US?",
        if: {
            birthCert: true,
        },
        type: "boolean",
    },
    {
        name: "docsState1",
        question: "In which state or territory are you applying for State ID?",
        if: {
            birthCert: true,
            birthCertUS: true,
        },
        type: "state",
        answer: "AL"
    },
    {
        name: "typeID",
        question: "What type(s) of valid, unexpired ID do you own?",
        if: {
            birthCert: true,
            birthCertUS: true,
        },
        choices: [{
                name: "socialSec",
                text: "Social Security Card",
                answer: false,
            },
            {
                name: "stateID",
                text: "State ID",
                answer: false,
            },
            {
                name: "militaryID",
                text: "Military ID",
                answer: false,
            },
            {
                name: "tribalMembership",
                text: "Tribal Membership Card",
                answer: false,
            },
            {
                name: "passport",
                text: "US Passport",
                answer: false,
            },
            // https://docs.google.com/document/d/1iwiAVH2zas8tmHbAMjXaKpXvFKgBa7RxhEl7l1zplP4/edit
        ],
        type: "list",
        submit: 0,
    },
    {
        name: "birthCertDocs",
        question: "Do you have documentation authorizing you to be in the US?",
        if: {
            birthCert: true,
            birthCertUS: false,
        },
        type: "boolean",
    },
    {
        name: "docsState",
        question: "In which state or territory are you applying for State ID?",
        if: {
            birthCert: true,
            birthCertUS: false,
            birthCertDocs: true,
        },
        type: "state",
        answer: "AL",
        submit: 1,
    },
    {
        name: "docsCountry",
        question: "What is your country of origin?",
        if: {
            birthCert: true,
            birthCertUS: false,
            birthCertDocs: false,
        },
        type: "country",
        submit: 2,
    },
    {
        name: "bornUS",
        question: "Were you born in the US or a US territory, born abroad to US parents, or were born abroad and adopted by US parents?",
        if: {
            birthCert: false,
        },
        type: "boolean",
    },
    {
        name: "bornState",
        question: "Which state were you born in?",
        if: {
            birthCert: false,
            bornUS: true,
        },
        type: "state",
        answer: "AL",
        submit: 3,
    },
    {
        name: "bornCountry",
        question: "What is your country of origin?",
        if: {
            birthCert: false,
            bornUS: false,
        },
        type: "country",
        answer: "United States",
        submit: 4,
    },
]