import React from "react";
import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useSession } from "next-auth/react";
import CustomButton from "./Button";
import Box from "@mui/material/Box";

const HomeLayout = styled("section")(() => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
}));

const backgroundImage =
  "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L2stMjExLWV5ZS1hZS0wNTQ0NC5qcGc.jpg";

const Background = styled(Box)({
	backgroundImage: `url(${backgroundImage})`,
	backgroundPosition: "center",
	position: "absolute",
  left: 0,
  right: 0,
  top: -480,
  bottom: 0,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  zIndex: -2,
})

export default function Home() {
  const { data: session, status } = useSession();
  return (
    <HomeLayout>
      <Container
        sx={{
          mb: 52,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography align="center" variant="h2" marked="center">
          Discover movies and TV series
        </Typography>
        {!session && status !== "loading" && (
					<>
					 <Typography
            color="inherit"
            align="center"
            variant="h5"
            sx={{ mb: 4, mt: { sx: 4, sm: 10 } }}
          >
            You do not seem to be logged in.
          </Typography>
					<CustomButton variant="contained" size="large" component="a" href="/auth" sx={{ minWidth: 200, backgroundColor: "#6c584c" }}>Login</CustomButton>
					</>
        )}
				<Box
          sx={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundColor: "common.black",
            opacity: 0.5,
            zIndex: -1,
          }}
        />
				<Background/>
      </Container>
    </HomeLayout>
  );
}
