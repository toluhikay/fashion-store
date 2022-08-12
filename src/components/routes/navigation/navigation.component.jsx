import React, {Fragment} from 'react'
import {Outlet, Link} from 'react-router-dom'
import { ReactComponent as CrownSvg } from '../../../assets/crown.svg'
import './navigation.styles.scss'

const Navigation = () => {
  return (
    <Fragment>
        <div className='navigation'>
            <Link className='logo-container' to='/'>
                <CrownSvg />
            </Link>
            <div className="nav-links-container">
                <Link className='nav-link' to='/shop'>
                    SHOP
                </Link>
                <Link className='' to='/sign-in'>
                    SIGN IN
                </Link>
            </div>
        </div>
        <Outlet />
    </Fragment>
  )
}

export default Navigation