const createConnection = require("../src/dbConnection");
const Movie = require("../models/movie");
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { styled } from "@mui/material/styles";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

const CustomCard = styled(Card)(() => ({
  maxWidth: 380,
  margin: 15,
  display: "inline-block",
}));

const Description = styled(Typography)(() => ({
  letterSpacing: 2,
  color: "black",
  marginTop: 10,
  marginBottom: 15,
}));

export default function Movies({ movies }) {
  return (
    <div
      sx={{
        width: "90%",
        margin: "auto",
      }}
    >
      {movies
        ? movies.map((movie) => (
            <CustomCard key={movie._id}>
              <CardMedia
                sx={{ height: 500 }}
                image={process.env.NEXT_PUBLIC_IMAGE_HOST + movie.poster}
                title={movie.title}
              />
              <CardContent>
                <Link href={"/movie/"+movie._id} color="inherit" style={{ textDecoration: "none" }}>
                  <Typography variant="h5">{movie.title}</Typography>
                </Link>
                <Description variant="body1">
                  {movie.summary.slice(0, 200)+"..."}
                </Description>
              </CardContent>
            </CustomCard>
          ))
        : ""}
    </div>
  );
}

export async function getStaticProps() {
  await createConnection();
  const movies = await Movie.find();
  return {
    props: {
      movies: JSON.parse(JSON.stringify(movies)),
    },
    revalidate: 3600, //in seconds
  };
}
