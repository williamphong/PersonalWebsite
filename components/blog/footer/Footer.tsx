import React from 'react';
import styles from './footer.module.css';
//import Image from 'next/image';
import { svg } from '@/lib/data';

export const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.social}>
        <ul className="ml-1 mt-8 flex items-center" aria-label="Social media">
          {svg.map((img, index) => (
            <li key={index} className="mr-5 shrink-0 text-xs">
              <a
                className="block hover:text-slate-200"
                href={img.link}
                target="blank"
                title={img.name}
              >
                <span className="sr-only">{img.name}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox={img.viewbox}
                  fill="currentColor"
                  className="h-6 w-6"
                  aria-hidden="true"
                >
                  <path d={img.path}></path>
                </svg>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.info}>
        {/*
        <div className={styles.logo}>
          <Image src="/favicon.ico" alt="waphong blog" width={30} height={30} />
          <h1 className={styles.logoText}>william phong</h1>
        </div>
        */}
        <p className={styles.desc}>william phong</p>
      </div>
      <div className={styles.links}></div>
    </div>
  );
};

export default Footer;
