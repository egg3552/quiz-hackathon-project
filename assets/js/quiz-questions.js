// Questions added as an object array
const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "Home Tool Markup Language",
      "Hyperlinks and Text Markup Language",
      "Hyper Tool Markup Language",
    ],
    answer: "Hyper Text Markup Language",
    explanation: "It's the standard language used to create and structure content on the web. “HyperText” refers to the clickable links that connect web pages, and “Markup Language” means it uses tags to define elements like headings, paragraphs, images, and links. It's not a programming language - it's a structural one.",
  },
  {
    question: "Which CSS property is used to change the text color?",
    options: ["text-color", "color", "font-color", "text-style"],
    answer: "color",
    explanation: "The color property specifically targets the foreground text color of an element.",
  },
  {
    question: "Which JavaScript method is used to select an element by its ID?",
    options: ["getElementById()", "getElementsByClassName()", "selectElement()", "querySelector()"],
    answer: "getElementById()",
    explanation: "This method retrieves the first element in the DOM with the specified id attribute. It's fast, direct, and commonly used when you know the exact ID of the element you want to manipulate.",
  },
  {
    question: "What is the purpose of the <meta> tag in HTML?",
    options: [
      "Adds styling rules to the page",
      "Embeds external JavaScript files",
      "Displays content directly to the user",
      "Provides metadata about the HTML document",
    ],
    answer: "Provides metadata about the HTML document",
    explanation: "It's used for things like setting character encoding, defining viewport settings for responsive design, and offering descriptions for SEO. Though invisible to users, it's essential for performance, accessibility, and discoverability.",
  },
];