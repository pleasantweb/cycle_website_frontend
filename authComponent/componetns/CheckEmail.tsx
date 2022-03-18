import React from 'react'
import styles from '../../styles/AuthStyle.module.scss'

const CheckEmail = () => {
  return (
    <div className={styles.checkemail}>
        <h1>Confirm your Email</h1>
        <p>We have sent you an email to activate your account.</p>
    </div>
  )
}

export default CheckEmail;