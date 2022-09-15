import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { signOut } from "next-auth/react";

export default function Profile() {
  
  const { username, email } = useSelector((state) => state.userDetails);
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();
	const [open, setOpen] = useState(false);
	const [message, setMessage] = useState("Password updated Successfully");
  const handleClose = () => {
    setOpen(false);
  };
	const submitHandler = async(event) => {
		event.preventDefault();
		const res = await fetch(`/api/user/${email}`, {
      method: "PATCH",
      body: JSON.stringify({
        oldPassword: oldPasswordRef.current.value,
        newPassword: newPasswordRef.current.value,
      }),
      headers: { "Content-type": "application/json" },
    });
		const data = await res.json();
		if(!data.error) {
			setOpen(true)
		} else {
			setMessage("Password updated Successfully")
			setTimeout(() => {
				setOpen(true)
			}, 1000)
		}
		signOut({callbackUrl: "/" })
	};
  return (
    <Stack
      component="form"
      sx={{
        margin: 10,
        width: 500,
      }}
      spacing={2}
      noValidate
      autoComplete="off"
      onSubmit={submitHandler}
    >
      <Typography variant="h4">Welcome {username}</Typography>
      <Typography variant="h5">Change your password</Typography>
      <Typography variant="subtitle2">
        New password should be 12 characters long with special characters
      </Typography>
      <FormControl sx={{ width: 500 }}>
        <InputLabel htmlFor="review">Old Password</InputLabel>
        <OutlinedInput
          id="oldPassword"
          label="Old Password"
          type="password"
          ref={oldPasswordRef}
        />
      </FormControl>
      <FormControl sx={{ width: 500 }}>
        <InputLabel htmlFor="review">New Password</InputLabel>
        <OutlinedInput
          id="newPassword"
          label="New Password"
          type="password"
          ref={newPasswordRef}
        />
      </FormControl>
      <Button size="large" type="submit">
        Change Password
      </Button>
			<Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogContent>
          <DialogContentText>
            {message}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Stack>
  );
}
