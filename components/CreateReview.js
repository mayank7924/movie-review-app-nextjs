import React from 'react'
import { makeStyles } from "@mui/styles";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Rating from "@mui/material/Rating";
import CustomButton from './Button.js'
import Typography from "@mui/material/Typography";

const useStyles = makeStyles((theme) => ({
    heading: {
      fontSize: 30,
      color: "white",
      margin: 15,
    },
    rating: {
      margin: "0px 0px 12px 10px",
    },
    reviewBox: {
      width: 500,
      fontSize: 20,
      width: "100%",
      padding: 15,
      borderRadius: 30,
      "&:focus": {
        outline: "none",
      },
    },
    postButton: {
      fontWeight: "bolder",
      fontSize: 20,
      color: "#6c584c",
      backgroundColor: "#d6ccc2",
      borderRadius: 10,
    },
  }))

export default function CreateReview() {
  const classes = useStyles()
  return (
    <div>
      <Typography className={classes.heading}>Post Review</Typography>
      <TextareaAutosize  className={classes.reviewBox}/>
      <Rating button value={4}  className={classes.rating} />
      <CustomButton className={classes.postButton}>Add your Review</CustomButton>
    </div>
  )
}
