import React, {useState, useRef} from 'react'
import Button from "@mui/material/Button";
import classes from "./AuthForm.module.css"
import { signIn } from "next-auth/react";
import { useRouter } from  "next/router";

export default function AuthForm() {
  const router = useRouter();
  const [formToggle, setFormToggle] = useState(true) //true renders login
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const dobRef = useRef();

  const formSubmitHandler = async (event) => {
    event.preventDefault()
    console.log(emailRef.current.value)
    const email = emailRef.current.value
    const password = passwordRef.current.value
    const firstName = firstNameRef.current?.value
    const lastName = lastNameRef.current?.value
    const dob = dobRef.current?.value
    if(formToggle) {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })
      console.log(result)
      if(!result.error) {
        router.push("/movies")
      }
    } else {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          firstName,
          lastName,
          dob
        }),
      })
      const data = await response.json();
      if(data.error) {
        window.alert("signup failed")
      } else {
        window.alert("signup successful")
        setFormToggle(true)
      }
    }
  };

  return (
    <section className={classes.section}>
      <h1>{formToggle? "Login":"Sign Up"}</h1>
      <form onSubmit={formSubmitHandler}> 
        {!formToggle ? (
          <div className={classes.formControl}>
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" placeholder="Enter First Name" required ref={firstNameRef} />
          </div>
        ) : null}
        {!formToggle ? (
          <div className={classes.formControl}>
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" placeholder="Enter Last Name" required ref={lastNameRef}/>
          </div>
        ) : null}
        {!formToggle ? (
          <div className={classes.formControl}>
             <label htmlFor="dob">Date of Birth</label>
             <input type="date" id="dob" required  ref={dobRef} />
          </div>
        ) : null}
        <div className={classes.formControl}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Enter your Email" required ref={emailRef} />
        </div>
        <div className={classes.formControl}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Enter your password" required ref={passwordRef}/>
        </div>
        <div className={classes.actions}>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#6c584c" }}
            type="submit"
          >
            {formToggle ? "Login" : "Create Account"}
          </Button>
          <button
            variant="contained"
            className={classes.toggle}
            sx={{ backgroundColor: "#6c584c" }}
            onClick={() => setFormToggle(!formToggle)}
          >
            {formToggle ? "Create a new account" : "Existing User ?"}
          </button>
      </div>
      </form>
    </section>
  )
}
