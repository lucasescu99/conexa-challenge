import styles from './page.module.css';
import { CATEGORIES } from '../constants/categories';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <Image
          src="/starwarslogo.png"
          alt="Starconex"
          width={300}
          height={175}
          priority
        />
      </header>
      <section className={styles.categories}>
        {CATEGORIES.map((category) => (
          <Link
            href={`/category/${category.name}`}
            className={styles.category}
            key={category.name}
            style={{ backgroundColor: category.backgroundColor }}
          >
            <Image
              src={category.image}
              alt={category.name}
              width={250}
              height={250}
            />
            <h2>{category.name}</h2>
          </Link>
        ))}
      </section>
    </main>
  );
}
