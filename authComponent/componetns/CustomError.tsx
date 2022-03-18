import React from 'react'
import styles from '../../styles/AuthStyle.module.scss'

const CustomError = () => {
  return (
    <div className={styles.error_page}>
        <div className={styles.heading}>
            <h1><span>404</span>  ERROR</h1>
        </div>
    </div>
  )
}

export default CustomError