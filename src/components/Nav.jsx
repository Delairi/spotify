import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { auth } from "../Firebase";
import { useContext, useEffect, useState } from "react";
import { ContextLogin } from "./ContextLogin";


const Nav = ({logout}) => {

    const logged = useContext(ContextLogin)
    const provider = new GoogleAuthProvider();
    const Login = () => {
        signInWithPopup(auth, provider)
            .then((result) => {

            }).catch((error) => {
                console.log(error)
            });
    }

    


    return (
            <nav className='flex justify-end w-full sm:top-0 sm:right-5 sm:absolute p-2 text-white'>
                <ul>
                    {
                        logged ? <li className='cursor-pointer' onClick={() => logout()}>Logout</li> : <li className='cursor-pointer' onClick={() => Login()}>Login</li>

                    }
                </ul>
            </nav>
    )
}

export default Nav