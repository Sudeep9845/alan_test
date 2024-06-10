import { useState, useEffect, createRef } from "react";
import {
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { useStyles } from "./styles";
import classNames from "classnames";
const NewsCard = ({
  article: { description, publishedAt, source, url, title, urlToImage },
  i,
  activeArticle,
}) => {
  const classes = useStyles();
  const [elRefs, setElRefs] = useState([]);
  const scrollToRef = (ref) => window.scroll(0, ref.current.offsetTop - 50);

  useEffect(() => {
    setElRefs((refs) =>
      Array(20)
        .fill()
        .map((_, j) => refs[j] || createRef())
    );
  }, []);
  useEffect(() => {
    if (i === activeArticle && elRefs[activeArticle]) {
      scrollToRef(elRefs[activeArticle]);
    }
  }, [i, activeArticle, elRefs]);
  return (
    <>
      <Card
        ref={elRefs[i]}
        className={classNames(
          classes.card,
          activeArticle === i ? classes.activeCard : null
        )}
      >
        <CardActionArea href={url} target="_blank">
          <CardMedia
            className={classes.media}
            image={
              urlToImage ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4OI7KPqly_K4UMZifsX3lWiWtiIFMH-CICQ&s"
            }
          />
          <div className={classes.details}>
            <Typography variant="body2" color="textSecondary" component="h2">
              {new Date(publishedAt).toDateString()}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="h2">
              {source.name}
            </Typography>
          </div>
          <Typography className={classes.title} gutterBottom variant="h5">
            {title && title.length >= 10
              ? title
              : "Sorry!! News is deleted or removed from the author or source."}
          </Typography>
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {description && description.length >= 10
                ? description
                : "Sorry!! Description is not found"}
            </Typography>
          </CardContent>

          <CardActions className={classes.cardActions}>
            <Button size="small" color="primary">
              Learn More
            </Button>
            <Typography variant="h5" color="textSecondary">
              {i + 1}
            </Typography>
          </CardActions>
        </CardActionArea>
      </Card>
    </>
  );
};

NewsCard.propTypes = {
  article: PropTypes.object,
  i: PropTypes.number,
  activeArticle: PropTypes.number.isRequired,
};

export default NewsCard;
