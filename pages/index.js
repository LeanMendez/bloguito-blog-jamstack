import Head from "next/head";
import Link from "next/link";

import styles from "../styles/Home.module.css";
import {getAllFilesMetadata} from "../lib/mdx";

export default function Home({posts}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Bloguito</title>
        <meta content="Generated by create next app" name="description" />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Bloguito</h1>

        <div className={styles.grid}>
          {posts.map((post) => (
            <Link key={post.slug} className={styles.card} href={`/${post.slug}`}>
              <h2>{post.title} &rarr;</h2>
              <p>{post.date}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const posts = await getAllFilesMetadata();

  // eslint-disable-next-line no-console
  console.log(posts);

  return {
    props: {posts},
  };
}
