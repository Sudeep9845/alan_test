import NewsCard from "../NewsCard/NewsCard";
import { Grid, Grow, Typography } from "@mui/material"; // from MUI
import PropTypes from "prop-types";
import { useStyles } from "./styles.jsx";
const NewsCards = ({ articles, activeArticle }) => {
  const classes = useStyles(); // Created hook by NewsCards/style.jsx
  //main page instructions/guide cards
  const infoCards = [
    {
      color: "#00838f",
      title: "News by Country ",
      text: "Give me the latest news from 'Country Name'",
    },
    {
      color: "#1565c0",
      title: "News by Categories",
      info: "Business, Entertainment, General, Health, Science, Sports, Technology",
      text: "Give me the latest Technology news",
    },
    {
      color: "#4527a0",
      title: "News by Terms",
      info: "Bitcoin, PlayStation 5, Smartphones, Donald Trump...",
      text: "What's up with PlayStation 5",
    },
    {
      color: "#283593",
      title: "News by Sources",
      info: "CNN, Wired, BBC News, Time, IGN, Buzzfeed, ABC News...",
      text: "Give me the news from CNN",
    },
  ];
  if (!articles || !articles.length) {
    return (
      <>
        <Grow in>
          <Grid
            className={classes.container}
            container
            alignItems="stretch"
            spacing={3}
          >
            {/* Fix: Added return statement */}
            {infoCards.map((infoCard) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                className={classes.infoCard}
                key={infoCard.title} // Added key prop
              >
                <div
                  className={classes.card}
                  style={{ backgroundColor: infoCard.color }}
                >
                  <Typography variant="h5">{infoCard.title}</Typography>
                  {/* Conditional rendering for displaying title */}
                  {infoCard.info && (
                    <Typography variant="h6" component="h6">
                      <strong>{infoCard.title.split(" ")[2]}</strong>: <br />
                      {infoCard.info}
                    </Typography>
                  )}
                  <Typography variant="h6">
                    Try saying:
                    <br /> <i>{infoCard.text}</i>
                  </Typography>
                </div>
              </Grid>
            ))}
          </Grid>
        </Grow>
      </>
    );
  }
  //If arcticles are not found or not fetched then return null else retrun the Grid of NewsCards
  return (
    <Grow in>
      <Grid
        container
        className={classes.container}
        alignItems={"stretch"}
        spacing={3}
      >
        {articles.map((article, i) => (
          <Grid
            item
            xs={12} //displays 1 cards / row
            sm={6} //displays 2 cards / row
            md={4} // displays 3 cards / row
            lg={3} // displays 4 cards / row
            style={{ display: "flex" }}
            key={i}
          >
            <NewsCard article={article} activeArticle={activeArticle} i={i} />
          </Grid>
        ))}
      </Grid>
    </Grow>
  );
};

NewsCards.propTypes = {
  articles: PropTypes.array,
  activeArticle: PropTypes.number.isRequired,
};

export default NewsCards;
