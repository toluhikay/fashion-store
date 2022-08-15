import React, {useState } from 'react'
import { signUserWithEmailPassword, createUserDocFromAuth, signInWithGooglePopup } from '../../utils/firebase/firebase.utils'
import FormInput from '../form-input/form-input.component'
import './sign-in-form.styles.scss'
import Button from '../button/button.component'

const defaultFormFields = {
    email: '',
    password:'',
}

const  SignInForm = ()=> {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { email, password} = formFields
    // console.log(formFields);

    const handleChange=(e)=>{
        const {name, value} = e.target;
        setFormFields({...formFields, [name]: value})
    }

    const clearFormFields=()=>{
        setFormFields(defaultFormFields)
    }
    const handleSubmit = async (e) =>{
        e.preventDefault()
       
        try{
            const response = await signUserWithEmailPassword(email, password)
            console.log(response);
            clearFormFields()
        }
        catch(err){
            switch(err.code){
                case 'auth/wrong-password':
                    alert('password does not match')
                    break
                case 'auth/user-not-found':
                    alert('no user with this email')
                    break
                default:
                    console.log('error trying to sign in');
            }
            
        }
    }

    const logInWithGoogle = async () =>{
        const {user} = await signInWithGooglePopup()
        return await createUserDocFromAuth(user)
      }
  return (
    <div className='sign-up-container'>
        <h2>Already have an account?</h2>
        <span>Sign in with your email and password</span>
        <form action="" onSubmit={handleSubmit}>
           

            <FormInput
                label='Email'
                type="email"
                 required
                 onChange={handleChange}
                 name='email'
                 value={ email }
            />

            <FormInput
                label='Password'
                type="password" 
                required
                onChange={handleChange}
                name='password'
                value={password}
            />

            <div className='buttons-container'>
                <Button type='submit'>Sign In</Button>
                <Button buttonType='google' type='button'  onClick={logInWithGoogle} >Google Login</Button>
            </div>
        </form>
    </div>
  )
}

export default SignInForm