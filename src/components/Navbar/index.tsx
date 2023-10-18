import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './navbar.module.css';
import { CATEGORIES } from '@/constants/categories';

interface INavbarProps {
  selectedEntity: string;
}

const Navbar = ({ selectedEntity }: INavbarProps) => {
  return (
    <nav className={styles.container}>
      <Link href="/">
        <Image
          src="/starwarslogo.png"
          alt="Starconex"
          width={100}
          height={50}
          priority
        />
      </Link>
      <section className={styles.categories}>
        {CATEGORIES.map((category) => (
          <Link
            href={`/category/${category.name}`}
            className={`${styles.category} ${
              selectedEntity === category.name ? styles.selected : ''
            }`}
            key={category.name}
          >
            <Image
              src={category.image}
              alt={category.name}
              width={30}
              height={30}
            />
            <h2>{category.name}</h2>
          </Link>
        ))}
      </section>
    </nav>
  );
};

export default Navbar;
