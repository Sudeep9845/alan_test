// // {Name: Basic_example_for_AI_assistant}
// // {Description: Learn how to create a dialog script with voice/text commands and text corpus for question answering}

// // Use this sample to create your own voice/text commands
// intent("hello world", (p) => {
//   p.play("(hello|hi there)");
// });

// // Give your AI assistant some knowledge about the world
// /*corpus(`
//     Hello, I'm Alan.
//     This is a demo application.
//     You can learn how to teach Alan useful skills.
//     I can teach you how to write Alan Scripts.
//     I can help you. I can do a lot of things. I can answer questions. I can do tasks.
//     But they should be relevant to this application.
//     I can help with this application.
//     I'm Alan. I'm a virtual assistant. I'm here to help you with applications.
//     This is a demo script. It shows how to use Alan.
//     You can create dialogs and teach me.
//     For example: I can help navigate this application.
// `);

// intent('Start Event',p=> {
//     p.play({command:'testCommand'});
// })*/
// // News by Search Source
// const API_KEY = "26bd84bbabe54e03bdd03c0b655c1b3d";
// let savedArticles = [];

// intent("Give me (the|) news from $(source* (.*))", (p) => {
//   let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}`;

//   if (p.source.value) {
//     NEWS_API_URL = `${NEWS_API_URL}&sources=${p.source.value
//       .toLowerCase()
//       .split(" ")
//       .join("-")}`;
//   }

//   const options = { url: NEWS_API_URL, headers: { "User-Agent": "request" } };

//   api.request(options, (error, response, body) => {
//     if (error) {
//       console.error("Error fetching news:", error);
//       p.play(
//         "Sorry, there was an error fetching the news. Please try again later."
//       );
//       return;
//     }

//     const { articles } = JSON.parse(body);

//     if (!articles || articles.length === 0) {
//       p.play(
//         "Sorry, there are no news articles available for the specified source."
//       );
//       return;
//     }

//     savedArticles = articles;
//     p.play({ command: "newHeadlines", articles });
//     p.play(`Here are the latest news from ${p.source.value}.`);

//     p.play("Would you like me to read the headlines?");
//     p.then(confirmation);
//   });
// });

// //By Term
// intent("what's up with $(term* (.*))", (p) => {
//   let NEWS_API_URL = `https://newsapi.org/v2/everything?apiKey=${API_KEY}`;

//   if (p.term.value) {
//     NEWS_API_URL = `${NEWS_API_URL}&q=${p.term.value}`;
//   }

//   const options = { url: NEWS_API_URL, headers: { "User-Agent": "request" } };

//   api.request(options, (error, response, body) => {
//     if (error) {
//       console.error("Error fetching news:", error);
//       p.play(
//         "Sorry, there was an error fetching the news. Please try again later."
//       );
//       return;
//     }

//     const { articles } = JSON.parse(body);

//     if (!articles || articles.length === 0) {
//       p.play("Sorry, please try searching for something else.");
//       return;
//     }

//     savedArticles = articles;
//     p.play({ command: "newHeadlines", articles });
//     p.play(`Here are the (latest|recent) news articles on ${p.term.value}.`);

//     p.play("Would you like me to read the headlines?");
//     p.then(confirmation);
//   });
// });

// // News by categories
// const CATEGORIES = [
//   "business",
//   "entertainment",
//   "general",
//   "health",
//   "science",
//   "sports",
//   "technology",
// ];

// const CATEGORIES_INTENT = CATEGORIES.map(
//   (category) => `${category}~${category}`
// ).join("|");

// // Intent for fetching news by category or generally
// intent(
//   `(show|what is|tell me|what's|what are|what're|read|give me)
//         (the|)
//         (recent|latest|)
//         $(N news|headlines)
//         (in|about|on|)
//         $(C~ ${CATEGORIES_INTENT})?`,
//   `(read|show|get|bring me|give me)
//         (the|)
//         (recent|latest)
//         $(C~ ${CATEGORIES_INTENT})?
//         $(N news|headlines)?`,
//   (p) => {
//     let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=us`;

//     // Check if a category is provided
//     if (p.C && p.C.value) {
//       NEWS_API_URL = `${NEWS_API_URL}&category=${p.C.value}`;
//     }

//     const options = { url: NEWS_API_URL, headers: { "User-Agent": "request" } };

//     api.request(options, (error, response, body) => {
//       if (error) {
//         console.error("Error fetching news:", error);
//         p.play(
//           "Sorry, there was an error fetching the news. Please try again later."
//         );
//         return;
//       }

//       const { articles } = JSON.parse(body);

//       if (!articles || articles.length === 0) {
//         p.play(
//           "Sorry, there are no news articles available for the specified category."
//         );
//         return;
//       }

//       savedArticles = articles;
//       p.play({ command: "newHeadlines", articles });

//       if (!p.C && !p.C.value) {
//         p.play(`Here are the (latest|recent) news articles.`);
//       } else {
//         p.play(`Here are the (latest|recent) news articles on ${p.C.value}.`);
//       }

//       p.play("Would you like me to read the headlines?");
//       p.then(confirmation);
//     });
//   }
// );

// //News by Country

// const countryMappings = {
//   //a
//   argentina: "ar",
//   australia: "au",
//   austria: "at",
//   //b
//   belgium: "be",
//   brazil: "br",
//   bulgaria: "bg",
//   //c
//   canada: "ca",
//   china: "cn",
//   colombia: "co",
//   cuba: "cu",
//   "czech republic": "cz",
//   //e
//   egypt: "eg",
//   //f
//   france: "fr",
//   //g
//   germany: "de",
//   greece: "gr",
//   //h
//   "hong kong": "hk",
//   hungary: "hu",
//   //i except india
//   indonesia: "id",
//   ireland: "ie",
//   israel: "il",
//   italy: "it",
//   //j
//   japan: "jp",
//   //l
//   latvia: "lv",
//   lithuania: "lt",
//   //m
//   malaysia: "my",
//   mexico: "mx",
//   morocco: "ma",
//   //n
//   netherlands: "nl",
//   newzealand: "nz",
//   nigeria: "ng",
//   norway: "no",
//   //p
//   philippines: "ph",
//   poland: "pl",
//   portugal: "pt",
//   //r
//   romania: "ro",
//   russia: "ru",
//   //s
//   "saudi arabia": "sa",
//   serbia: "rs",
//   singapore: "sg",
//   slovakia: "sk",
//   slovenia: "si",
//   "south africa": "za",
//   "south korea": "kr",
//   sweden: "se",
//   switzerland: "ch",
//   //t
//   taiwan: "tw",
//   thailand: "th",
//   turkey: "tr",
//   //u execpt usa
//   uae: "ae",
//   ukraine: "ua",
//   "united kingdom": "gb",
//   europe: "gb",
//   //v
//   venuzuela: "ve",
//   //usa
//   usa: "us",
//   us: "us",
//   america: "us",
//   "united states": "us",
//   "united states of america": "us",
//   //india
//   india: "in",
//   hindustan: "in",
//   hindusthan: "in",
//   bharath: "in",
//   barath: "in",
//   bharat: "in",

//   // Add more country mappings as needed
// };

// const countryNames = Object.keys(countryMappings).join("|"); // Creating regex pattern for country names

// intent(`Give me (the|) news from $(country* (${countryNames}))`, (p) => {
//   const countryName = p.country.value.toLowerCase(); // Convert to lower case
//   const countryCode = countryMappings[countryName];
//   if (!countryCode) {
//     p.play("Sorry, I couldn't recognize the country. Please try again.");
//     return;
//   }

//   let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}`;
//   NEWS_API_URL = `${NEWS_API_URL}&country=${countryCode}`;

//   const options = { url: NEWS_API_URL, headers: { "User-Agent": "request" } };

//   api.request(options, (error, response, body) => {
//     if (error) {
//       console.error("Error fetching news:", error);
//       p.play(
//         "Sorry, there was an error fetching the news. Please try again later."
//       );
//       return;
//     }

//     const { articles } = JSON.parse(body);

//     if (!articles || articles.length === 0) {
//       p.play(
//         "Sorry, there are no news articles available for the specified country."
//       );
//       return;
//     }

//     savedArticles = articles;
//     p.play({ command: "newHeadlines", articles });
//     p.play(`Here are the latest news from ${countryName}.`);

//     p.play("Would you like me to read the headlines?");
//     p.then(confirmation);
//   });
// });

// const confirmation = context(() => {
//   intent("yes", async (p) => {
//     let i;
//     for (i = 0; i < savedArticles.length; i++) {
//       p.play({ command: "highlight", articles: savedArticles[i] });
//       p.play(`${savedArticles[i].title}`);
//     }
//   });
//   intent("no", (p) => {
//     p.play("Sure, sounds good to me");
//   });
// });

// intent("(open|go to) (the|) (article|news) (number|) $(number* (.*)) ", (p) => {
//   if (p.number.value) {
//     p.play({
//       command: "open",
//       number: p.number.value,
//       articles: savedArticles,
//     });
//   }
// });

// intent("(go|) back", (p) => {
//   p.play("Sure, going back ");
//   p.play({ command: "newHeadlines", articles: {} });
// });
