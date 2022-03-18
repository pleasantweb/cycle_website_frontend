import React from 'react'
import FullLayout from '../../hoc/FullLayout';
import styles from '../../styles/Payment.module.scss'

const ErrorPage = () => {
  return (
    <section className={styles.error_page}>
       <h1>404</h1> <h2>Something went wrong</h2>
    </section>
  )
}

export default ErrorPage;
ErrorPage.getLayout = function getLayout(page:typeof ErrorPage){
    return <FullLayout>{page}</FullLayout>
}