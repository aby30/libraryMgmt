import Head from 'next/head';
import Link from 'next/link';
import Button from '../../components/button';

import styles from './styles.module.scss';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>City online Library</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Online Library
        </h1>

        <p className={styles.description}>
            Click below to get started
        </p>
        <div>
           <Link href="/listing">
             <a>
                <Button type="primary" size="large">Browse Library</Button>
             </a>
          </Link>
        </div>
      </div>
    </div>
  )
}
