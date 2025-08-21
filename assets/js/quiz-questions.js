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
    options: [".getElementById()", ".getElementsByClassName()", ".selectElement()", ".querySelector()"],
    answer: ".getElementById()",
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
  {
  question: "Which CSS property controls the stacking order of elements?",
  options: [
    "z-index",
    "position",
    "display",
    "order",
  ],
  answer: "z-index",
  explanation: "The z-index property determines which elements appear in front when they overlap. Higher values stack above lower ones.",
},
{
  question: "Which HTML tag is used to define a table row?",
  options: [
    "<tr>",
    "<td>",
    "<th>",
    "<row>",
  ],
  answer: "<tr>",
  explanation: "<tr> defines a table row, while <td> and <th> define cells within that row.",
},
{
  question: "What does the '===' operator do in JavaScript?",
  options: [
    "Checks for strict equality (value and type)",
    "Assigns a value",
    "Compares only values",
    "Checks if a variable is defined",
  ],
  answer: "Checks for strict equality (value and type)",
  explanation: "The '===' operator ensures both value and type match, unlike '==' which allows type coercion.",
},
{
  question: "Which CSS unit is relative to the root element's font size?",
  options: [
    "rem",
    "em",
    "px",
    "%",
  ],
  answer: "rem",
  explanation: "rem stands for 'root em' and scales based on the root element's font size, making it predictable across components.",
},
{
  question: "Which method adds an item to the end of a JavaScript array?",
  options: [
    "push()",
    "pop()",
    "shift()",
    "unshift()",
  ],
  answer: "push()",
  explanation: "push() appends an item to the end of an array, modifying the original array.",
},
{
  question: "What does the 'defer' attribute do in a script tag?",
  options: [
    "Delays execution until HTML is parsed",
    "Runs the script immediately",
    "Blocks rendering until script loads",
    "Ignores the script",
  ],
  answer: "Delays execution until HTML is parsed",
  explanation: "defer ensures the script runs after the document is fully parsed, improving load performance.",
},
{
  question: "Which HTML tag is used to embed JavaScript code?",
  options: [
    "<script>",
    "<js>",
    "<javascript>",
    "<code>",
  ],
  answer: "<script>",
  explanation: "<script> is the standard tag for embedding or linking JavaScript in HTML documents.",
},
{
  question: "Which CSS property sets the space between lines of text?",
  options: [
    "line-height",
    "letter-spacing",
    "word-spacing",
    "text-indent",
  ],
  answer: "line-height",
  explanation: "line-height controls vertical spacing between lines, improving readability and layout flow.",
},
{
  question: "What does 'event.preventDefault()' do in JavaScript?",
  options: [
    "Stops the default browser behavior",
    "Deletes the event",
    "Triggers the event again",
    "Logs the event to console",
  ],
  answer: "Stops the default browser behavior",
  explanation: "preventDefault() is used to stop actions like form submission or link navigation from occurring.",
},
{
  question: "Which HTML attribute is used to link a CSS file?",
  options: [
    "href",
    "src",
    "style",
    "link",
  ],
  answer: "href",
  explanation: "href specifies the path to the CSS file in a <link> tag, enabling external styling.",
},
{
  question: "Which JavaScript method selects the first matching element?",
  options: [
    ".querySelector()",
    ".getElementsByClassName()",
    ".getElementById()",
    ".querySelectorAll()",
  ],
  answer: ".querySelector()",
  explanation: "querySelector() returns the first element that matches a CSS selector, offering flexible targeting.",
},
{
  question: "Which CSS property makes an element a flex container?",
  options: [
    "display: flex",
    "position: relative",
    "float: left",
    "flex-direction: row",
  ],
  answer: "display: flex",
  explanation: "Setting display to flex enables Flexbox layout, allowing flexible alignment and spacing of child elements.",
},
{
  question: "What does the 'const' keyword do in JavaScript?",
  options: [
    "Declares a block-scoped constant",
    "Creates a global variable",
    "Declares a function",
    "Defines a class",
  ],
  answer: "Declares a block-scoped constant",
  explanation: "const creates a variable whose value can't be reassigned, and is scoped to its block.",
},
{
  question: "Which HTML tag is used to define a navigation section?",
  options: [
    "<nav>",
    "<menu>",
    "<section>",
    "<aside>",
  ],
  answer: "<nav>",
  explanation: "<nav> semantically represents a block of navigation links, improving accessibility and structure.",
},
{
  question: "Which CSS property controls the visibility of an element?",
  options: [
    "visibility",
    "display",
    "opacity",
    "z-index",
  ],
  answer: "visibility",
  explanation: "visibility can be set to 'hidden' to hide an element without removing its space in the layout.",
},
{
  question: "What is the purpose of the 'addEventListener' method in JavaScript?",
  options: [
    "Attaches a handler to an event",
    "Creates a new event",
    "Stops event propagation",
    "Removes an element",
  ],
  answer: "Attaches a handler to an event",
  explanation: "addEventListener lets you respond to user interactions like clicks, keypresses, or form submissions.",
}
];