import React from 'react';
import * as Forms from '../comps/forms'
import * as styles from './pages_styles.module.css'
import { NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import clsx from 'clsx';

const LandingPage = () => {
  return (
    <>
      <div>
        
        <NavLink to='/login'>
          <button  className={clsx(styles.link, 'btn btn-outline-success')}>
            {'Log in'}
          </button>
        </NavLink>

        <NavLink to='/signup'>
          <button className={clsx(styles.link, 'btn btn-outline-success')}>
            {'Sign up'}
          </button>
        </NavLink> 

      </div>
    </>  
  )
}

export default LandingPage