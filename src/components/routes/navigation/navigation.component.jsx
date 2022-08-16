import React, {Fragment, useContext} from 'react'
import {Outlet, Link} from 'react-router-dom'
import { ReactComponent as CrownSvg } from '../../../assets/crown.svg'
import { UserContext } from '../../../context/user.context'
import './navigation.styles.scss'
import { signOutUser } from '../../../utils/firebase/firebase.utils'

const Navigation = () => {
    const {currentUser, setCurrentUser} = useContext(UserContext)
    // console.log(currentUser);

    const handleSignOut = async () =>{
        await signOutUser()
        setCurrentUser(null)
    }
  return (
    <Fragment>
        <div className='navigation'>
            <Link className='logo-container' to='/'>
                <CrownSvg />
            </Link>
            <div className="nav-links-container">
                <Link className='nav-link' to='/shop'>SHOP</Link>
                {
                    currentUser? (
                        <span className='nav-link' onClick={handleSignOut}>SIGN OUT</span>
                    ):(
                        <Link className='' to='/auth'>SIGN IN</Link>
                    )
                }
            </div>
        </div>
        <Outlet />
    </Fragment>
  )
}

export default Navigation