import React from 'react';
import styles from './featured.module.css';
import Image from 'next/image';

const Featured = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        what is <b>ether</b> //
        {/* "ethernet" -christine */}
      </h1>
      <h2 className={styles.description}>
        {/*how we personally interpret the concept of ether is based on our lived
        experiences
        a feeling of longing for ..?
        washing over like waves 
        */}
        to me, the word{' '}
        <b>
          <i>ether</i>
        </b>{' '}
        describes a state of mind — a stream of emotions or feelings — a sense
        of floating. it resembles the word ethereal — dreamy, nostalgic, yet
        leaning neither positive nor negative. words alone cannot explain
        (something something images music)
      </h2>
      <div className={styles.post}>
        <div className={styles.imgContainer}>
          <Image
            src="/images/ether.jpg"
            alt=""
            fill
            className={styles.image}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className={styles.textContainer}>
          <h1 className={styles.postTitle}>a moment in time</h1>
          <p className={styles.postDesc}>somethingsomething film photography</p>
          <button className={styles.button}>Read More</button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
