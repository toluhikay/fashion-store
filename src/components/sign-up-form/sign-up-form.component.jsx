import React, {useState, useContext } from 'react'
import { createUserAuthWithEmailPassword, createUserDocFromAuth } from '../../utils/firebase/firebase.utils'
import FormInput from '../form-input/form-input.component'
import './sign-up-form.styles.scss'
import Button from '../button/button.component'
import { UserContext } from '../../context/user.context'

const defaultFormFields = {
    displayName : '',
    email: '',
    password:'',
    confirmPassword: ''
}

const  SignUpForm = ()=> {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const {displayName, email, password, confirmPassword} = formFields
    // console.log(formFields);
    const {setCurrentUser} = useContext(UserContext)

    const handleChange=(e)=>{
        const {name, value} = e.target;
        setFormFields({...formFields, [name]: value})
    }
    const clearFormFields=()=>{
        setFormFields(defaultFormFields)
    }
    const handleSubmit = async (e) =>{
        e.preventDefault()
        if(password !== confirmPassword){
            alert('password does not match')
            return;
        }
        try{
            const {user} = await createUserAuthWithEmailPassword(email, password)
            // console.log(user);
            setCurrentUser(user)

            await createUserDocFromAuth(user, {displayName})
            clearFormFields()
        }
        catch(err){
            if(err.code  === 'auth/email-already-in-use'){
                alert('you cannot create two or more accounts with on email')
            }else{
                console.log('error creating user credentials', err);
            }
            clearFormFields()
        }
    }
  return (
    <div className='sign-up-container'>
        <h2>Don't have an account? Sign up Below</h2>
        <span>Sign up with your email and password</span>
        <form action="" onSubmit={handleSubmit}>
            <FormInput 
                label='Display Name'
                type="text" 
                required
                onChange={handleChange}
                name='displayName'
                value={displayName}
            />

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

            <FormInput
                type="password" 
                label='Confirm Password'
                onChange={handleChange}
                required
                name='confirmPassword'
                value={confirmPassword}
            />
            <Button type='submit'>Sign Up</Button>
        </form>
    </div>
  )
}

export default SignUpForm