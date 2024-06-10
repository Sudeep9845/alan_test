import { useEffect, useState } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import NewsCards from "./components/NewsCards/NewsCards";

const App = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(-1);
  // Function to convert words to numbers
  const wordsToNumbers = (word) => {
    const numberMap = {
      one: 1,
      two: 2,
      three: 3,
      four: 4,
      five: 5,
      six: 6,
      seven: 7,
      eight: 8,
      nine: 9,
      ten: 10,
      eleven: 11,
      twelve: 12,
      thirteen: 13,
      fourteen: 14,
      fifteen: 15,
      sixteen: 16,
      seventeen: 17,
      eighteen: 18,
      nineteen: 19,
      twenty: 20,
    };
    const lowerCaseWord = word.toLowerCase();
    return numberMap[lowerCaseWord] || parseInt(word, 10);
  };
  useEffect(() => {
    alanBtn({
      key: "68bcf7179ee08f8b48a11820568018032e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: ({ command, articles, number }) => {
        console.log(`Command received: ${command}`);
        console.log(`Articles: `, articles);
        console.log(`Number: `, number);
        if (command === "newHeadlines") {
          setNewsArticles(articles);
          setActiveArticle(-1);
        } else if (command === "highlight") {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        } else if (command === "open") {
          const parsedNumber = wordsToNumbers(number);
          if (isNaN(parsedNumber) || parsedNumber < 1 || parsedNumber > 20) {
            alanBtn().playText("Please try that again...");
            return;
          }

          const article = articles[parsedNumber - 1];
          if (!article) {
            alanBtn().playText("Article not found.");
            return;
          }
          window.open(article.url, "_blank");
          alanBtn().playText("Opening...");
        }
      },
    });
  }, []);

  return <NewsCards articles={newsArticles} activeArticle={activeArticle} />;
};

export default App;
