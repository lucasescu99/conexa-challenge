'use client';
import { useModalStore } from '@/store/zustand';
import React, { useMemo } from 'react';
import styles from './itemModal.module.css';
import { useAsync } from 'react-use';
import Image from 'next/image';

const ItemModal = ({ apiUrl }: { apiUrl: string }) => {
  const { isOpen, entity, searchValue, toggleModal } = useModalStore();

  const { loading, error, value } = useAsync(async () => {
    if (!isOpen) return;
    const response = await fetch(`${apiUrl}/${entity}/${searchValue}`);
    const data = await response.json();

    if (data.results?.length) {
      return data.results[0];
    } else {
      throw new Error('No results found');
    }
  }, [isOpen]);

  const content = useMemo(() => {
    const result = [];
    for (const key in value) {
      if (key === 'name' || key === 'title') continue;
      if (Array.isArray(value[key])) continue;
      result.push({ key, value: value[key] });
    }
    return result;
  }, [value]);

  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} onClick={() => toggleModal(false, '', '')}>
      <section
        className={styles.container}
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src="/cross.png"
          width={20}
          height={20}
          alt="cross image"
          className={styles.closeImg}
          onClick={() => toggleModal(false, '', '')}
        />
        {error && <p>{error.message}</p>}
        {value && (
          <>
            <h2>
              {entity} | {value.name || value.title}
            </h2>
            <div className={styles.content}>
              {content.map((item) => (
                <div key={item.key} className={styles.contentField}>
                  <p>{item.key}</p>
                  <p>{item.value}</p>
                </div>
              ))}
            </div>
          </>
        )}
        {loading && (
          <Image
            src="/loader.gif"
            alt="Loading"
            width={100}
            height={100}
            className={styles.loader}
          />
        )}
      </section>
    </div>
  );
};

export default ItemModal;
