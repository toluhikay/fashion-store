import React, { Fragment } from 'react'
import { signInWithGooglePopup, createUserDocFromAuth } from '../../../utils/firebase/firebase.utils'

const SignIn = () => {

  const logInWithGoogle = async () =>{
    const {user} = await signInWithGooglePopup()
    const userDocRef = await createUserDocFromAuth(user)
  }
  return (
    <Fragment>
      <div>
        Sign In Page
      </div>

      <button onClick={logInWithGoogle}>Log In With Google PopUp</button>
    </Fragment>
  )
}

export default SignIn