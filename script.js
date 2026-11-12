
/* ========================================
   MENU DE NAVIGATION
======================================== */

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("active");

        menuToggle.setAttribute("aria-expanded", isOpen);
        menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.textContent = "☰";
        });
    });

}


/* ========================================
   ASSISTANT VIRTUEL JN RÉFÉRENCEMENT
======================================== */

const chatbotToggle = document.getElementById("chatbot-toggle");
const chatbotWindow = document.getElementById("chatbot-window");
const chatbotClose = document.getElementById("chatbot-close");
const chatbotMessages = document.getElementById("chatbot-messages");
const chatbotQuestions = document.querySelectorAll(".chatbot-questions button");

const chatbotForm = document.getElementById("chatbot-form");
const chatbotInput = document.getElementById("chatbot-input");


/* OUVRIR ET FERMER L'ASSISTANT */

if (chatbotToggle && chatbotWindow) {
    chatbotToggle.addEventListener("click", () => {
        chatbotWindow.classList.toggle("active");
    });
}

if (chatbotClose && chatbotWindow) {
    chatbotClose.addEventListener("click", () => {
        chatbotWindow.classList.remove("active");
    });
}


/* RÉPONSES AUX QUESTIONS RAPIDES */

const chatbotAnswers = {

    services: "JN Référencement propose plusieurs solutions digitales : création de sites web, référencement naturel SEO, optimisation et amélioration des performances web. Notre objectif est de vous accompagner selon les besoins de votre activité.",

    devis: "Vous avez un projet en tête ? Présentez-nous votre besoin à travers notre formulaire de contact. Nous pourrons ainsi étudier votre demande et échanger avec vous.",

    seo: "Le SEO (référencement naturel) permet d'améliorer la visibilité d'un site sur les moteurs de recherche comme Google. Cela passe notamment par l'optimisation technique, les contenus et la structure du site.",

    contact: "Vous pouvez contacter JN Référencement à l'adresse suivante : joshnsiala@gmail.com ou utiliser notre formulaire de contact."
};


/* AFFICHER LES MESSAGES */

function addChatMessage(message, className) {

    if (!chatbotMessages) return;

    const messageElement = document.createElement("div");

    messageElement.className = className;
    messageElement.textContent = message;

    chatbotMessages.appendChild(messageElement);

    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}


/* NORMALISER LES QUESTIONS */

function normalizeQuestion(question) {

    return question
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[?!.,;:']/g, "")
        .trim();
}


/* VÉRIFIER LES MOTS-CLÉS */

function containsAny(text, keywords) {
    return keywords.some(keyword => text.includes(keyword));
}


/* COMPRENDRE LES QUESTIONS ÉCRITES */

function getChatbotResponse(question) {

    const text = normalizeQuestion(question);


    // 1. TARIFS ET DEVIS : PRIORITÉ

    if (containsAny(text, [
        "combien",
        "prix",
        "tarif",
        "coute",
        "cout",
        "cher",
        "chere",
        "budget",
        "devis",
        "facture",
        "payer",
        "paiement"
    ])) {

        return "Le tarif dépend de votre projet, du type de site souhaité et des fonctionnalités nécessaires. Contactez-nous pour nous présenter votre besoin et obtenir un devis adapté.";
    }


    // 2. SALUTATIONS

    if (containsAny(text, [
        "bonjour",
        "bonsoir",
        "salut",
        "hello",
        "coucou"
    ])) {

        return "Bonjour et bienvenue chez JN Référencement ! Comment pouvons-nous vous accompagner dans votre projet digital ?";
    }


    // 3. CONTACT

    if (containsAny(text, [
        "contact",
        "email",
        "adresse",
        "joindre",
        "telephone",
        "appeler"
    ])) {

        return chatbotAnswers.contact;
    }


    // 4. SEO ET RÉFÉRENCEMENT

    if (containsAny(text, [
        "seo",
        "referencement",
        "google",
        "visibilite",
        "moteur de recherche"
    ])) {

        return chatbotAnswers.seo;
    }


    // 5. CRÉATION DE SITE WEB

    if (containsAny(text, [
        "site web",
        "site internet",
        "creation de site",
        "developpement web",
        "creer un site"
    ])) {

        return "Nous accompagnons les entreprises dans la création de sites web adaptés à leurs besoins, avec une attention particulière portée à la présentation, à l'expérience utilisateur et à la visibilité sur Google.";
    }


    // 6. SERVICES

    if (containsAny(text, [
        "service",
        "proposez",
        "faites quoi",
        "activite",
        "prestation"
    ])) {

        return chatbotAnswers.services;
    }


    // 7. PRÉSENTATION DE L'AGENCE

    if (containsAny(text, [
        "qui etes vous",
        "votre agence",
        "jn referencement",
        "entreprise",
        "votre equipe"
    ])) {

        return "JN Référencement est une initiative spécialisée dans les solutions digitales. Nous accompagnons les entreprises dans leur présence en ligne, la création de sites web et l'amélioration de leur visibilité sur les moteurs de recherche.";
    }


    // 8. REMERCIEMENTS

    if (containsAny(text, [
        "merci",
        "super",
        "parfait"
    ])) {

        return "Avec plaisir ! JN Référencement reste à votre disposition pour vous accompagner dans votre projet digital.";
    }


    // 9. RÉPONSE PAR DÉFAUT

    return "Merci pour votre question. Je ne dispose pas encore d'une réponse précise à ce sujet. Vous pouvez nous contacter directement à joshnsiala@gmail.com afin que nous puissions mieux vous renseigner.";

}


/* TRAITER LES QUESTIONS RAPIDES */

chatbotQuestions.forEach(button => {

    button.addEventListener("click", () => {

        const question = button.dataset.question;
        const answer = chatbotAnswers[question];

        if (!answer) return;

        addChatMessage(button.textContent, "user-message");
        addChatMessage(answer, "bot-message");

    });

});


/* TRAITER LES QUESTIONS ÉCRITES */

if (chatbotForm && chatbotInput) {

    chatbotForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const question = chatbotInput.value.trim();

        if (question === "") return;

        addChatMessage(question, "user-message");

        const response = getChatbotResponse(question);

        addChatMessage(response, "bot-message");

        chatbotInput.value = "";

    });

}
