import React, {useEffect} from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import classes from "./Appbar.module.css";
import { useDispatch } from "react-redux";
import { setDetails } from "../store/userDetailsSlice";

export default function AppBar() {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    if(status=="authenticated") {
      dispatch(setDetails(session.user))
    }
  }, [status])

  const logoutHandler = () => {
    signOut({ callbackUrl: "/" });
  };
  return (
    <header className={classes.header}>
      <Link href="/">
        <a>
          <div className={classes.title}>Movie Review App </div>
        </a>
      </Link>
      <nav>
        <ul>
          {!session && status !== "loading" && (
            <li>
              <Link href="/auth">Login</Link>
            </li>
          )}
          {session && (
            <li>
              <Link href="/movies">Movies</Link>
            </li>
          )}
          {session && (
            <li>
              <Link href="/profile">Profile</Link>
            </li>
          )}
          {session && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
