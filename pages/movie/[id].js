/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { useSession } from "next-auth/react";
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";

const ReviewText = styled(Typography)(({ theme, size }) => ({
  borderRadius: 0,
  padding: theme.spacing(3, 1),
  fontSize: theme.typography.pxToRem(24),
}));

export default function MovieDetails() {
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [rating, setRating] = useState(null);
  const [userReview, setUserReview] = useState({ rating: 0, text: "" });

  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (router.isReady && status === "authenticated") {
      fetch(`http://localhost:3000/api/movie/${router.query.id}`)
        .then((resp) => resp.json())
        .then((data) => {
          setMovie(data);
        });
      fetch(`http://localhost:3000/api/movie/${router.query.id}/reviews`)
        .then((resp) => resp.json())
        .then((data) => setReviews(data));
    }
  }, [router.isReady, router.query.id, status]);

  useEffect(() => {
    if (reviews) {
      let averageRating = 0;
      reviews.forEach((review) => {
        averageRating += review.rating;
      });
      setRating(averageRating / reviews.length);
    }
  }, [reviews]);

  const updateReview = (event) => {
    if (event.type === "click") {
      setUserReview({ ...userReview, rating: event.target.value });
    } else {
      setUserReview({ ...userReview, text: event.target.value });
    }
  };

  const { username } = useSelector((state) => state.userDetails);

  const createReview = async () => {
    const response = await fetch(`/api/movie/${router.query.id}/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        rating: userReview.rating,
        review: userReview.text,
      }),
    });
    const data = await response.json();
    if (data) {
      fetch(`http://localhost:3000/api/movie/${router.query.id}/reviews`)
        .then((resp) => resp.json())
        .then((data) => setReviews(data));
    }
    setUserReview({ rating: 0, text: "" });
  };

  return (
    <div>
      <Box display="flex" justifyContent="flex-start" m={1} p={1}>
        <Box p={1}>
          <img
            sx={{
              maxWidth: 300,
              margin: 10,
              display: "inline-block",
            }}
            alt=""
            src={
              movie
                ? `${process.env.NEXT_PUBLIC_IMAGE_HOST}/${movie.poster}`
                : null
            }
          />
        </Box>
        <Box p={1}>
          <Typography variant="h2" gutterBottom>
            {movie ? movie.title : ""}
          </Typography>
          <Typography variant="h4" gutterBottom>
            Released: {movie ? movie.released.split("T")[0] : "NA"}
          </Typography>
          <Typography variant="h4">
            Overall Rating: {reviews ? Math.round(rating * 10) / 10 : ""}
          </Typography>
          <hr />
          <Typography variant="h4">Summary</Typography>
          <Typography>{movie ? movie.summary : ""}</Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="flex-start" m={1} p={1}>
        <Box p={1}>
          <Typography variant="h4">Cast:</Typography>
          <List>
            {movie
              ? movie.cast.map((actor) => (
                  <img
                    style={{
                      maxWidth: 120,
                      margin: 5,
                    }}
                    key={actor._id}
                    src={
                      actor
                        ? `${process.env.NEXT_PUBLIC_IMAGE_HOST}/${actor.image}`
                        : null
                    }
                    alt={actor.name}
                    title={actor.name}
                  />
                ))
              : ""}
          </List>
        </Box>
      </Box>
      <Box m={3.5}>
        <Typography
          sx={{
            fontSize: 30,
            marginLeft: 3,
          }}
        >
          Reviews:
        </Typography>
        <List>
          {reviews
            ? reviews.map((review) => (
                <ListItem key={review._id}>
                  <ReviewText>{review.username}</ReviewText>
                  <ReviewText>{review.review}</ReviewText>
                  <ReviewText>
                    <Rating readOnly value={parseInt(review.rating)} />
                  </ReviewText>
                </ListItem>
              ))
            : ""}
        </List>
      </Box>
      <Box sx={{ marginBottom: 20 }}>
        <Typography
          sx={{
            fontSize: 27,
            marginLeft: 6,
            marginBottom: 3,
          }}
        >
          Add your own Review:
        </Typography>
        <FormControl sx={{ marginLeft: 6, width: 500 }}>
          <InputLabel htmlFor="review">Review</InputLabel>
          <OutlinedInput
            id="review"
            label="Review"
            value={userReview.text}
            onChange={updateReview}
          />
        </FormControl>
        <br />
        <Rating
          button
          value={userReview.rating}
          onClick={updateReview}
          sx={{
            marginLeft: 5,
            marginTop: 2,
            marginRight: 5,
          }}
        />
        <Button
          onClick={createReview}
          sx={{
            fontWeight: "bolder",
            fontSize: 20,
            color: "#6c584c",
            backgroundColor: "#d6ccc2",
            borderRadius: 10,
          }}
        >
          Add Review
        </Button>
      </Box>
    </div>
  );
}
