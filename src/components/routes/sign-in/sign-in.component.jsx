import React, { Fragment, useEffect } from 'react'
import { signInWithGooglePopup, auth, signInWithGoogleRedirect, createUserDocFromAuth } from '../../../utils/firebase/firebase.utils'
import { getRedirectResult } from 'firebase/auth'

import SignUpForm from '../../sign-up-form/sign-up-form.component'

const SignIn = () => {
  useEffect(()=>{
      const redirectInfo = async ()=>{
      const response = await getRedirectResult(auth)
      console.log(response);
      if(response){
        const userDocRef = await createUserDocFromAuth(response.user)
      }
    }
    redirectInfo()
  },[])
  const logInWithGoogle = async () =>{
    const {user} = await signInWithGooglePopup()
    const userDocRef = await createUserDocFromAuth(user)
  }
  return (
    <Fragment>
      <div>
        Sign In Page
      </div>

      <button onClick={logInWithGoogle}>Log In With Google PopUp</button><br />
      <button onClick={signInWithGoogleRedirect}>Log In With Google Redirect</button>

      <SignUpForm/>
    </Fragment>
  )
}

export default SignIn