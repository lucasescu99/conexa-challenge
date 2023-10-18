'use client';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './list.module.css';
import useEntity from '@/hooks/useEntity';
import Image from 'next/image';
import _ from 'lodash';
import { useModalStore } from '@/store/zustand';
import ItemModal from '../ItemModal';
import { useDebounce } from 'react-use';

interface IListProps {
  selectedEntity: string;
  apiUrl: string;
}

const List = ({ selectedEntity, apiUrl }: IListProps) => {
  const [items, setItems] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');

  const { toggleModal } = useModalStore();

  const { response, isLoading, error } = useEntity(
    selectedEntity,
    page,
    apiUrl,
  );

  const handleLoadMore = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  useDebounce(
    () => {
      if (search) {
        const newItems = items.filter(
          (item) =>
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.title.toLowerCase().includes(search.toLowerCase()),
        );
        setItems(newItems);
      } else {
        setItems((prev) =>
          _.uniqWith([...prev, ...response.results], _.isEqual),
        );
      }
    },
    400,
    [search],
  );

  useEffect(() => {
    if (response && !error) {
      setItems((prev) => _.uniqWith([...prev, ...response.results], _.isEqual));
    }
  }, [error, response]);

  if (error) {
    return (
      <div>
        Something went wrong <code>{JSON.stringify(error)}</code>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <ItemModal apiUrl={apiUrl} />
      <div className={styles.header}>
        <h1>{selectedEntity}</h1>
        <div className={styles.formGroupField}>
          <input
            type="input"
            className={styles.formField}
            placeholder="Name"
            name="name"
            id="name"
            required
            onChange={(e) => setSearch(e.target.value)}
          />
          <label htmlFor="name" className={styles.formLabel}>
            Name
          </label>
        </div>
      </div>
      <div className={styles.items}>
        {items.map((item: any) => (
          <div className={styles.item} key={item.title || item.name}>
            <h2>{item.title || item.name}</h2>
            <Image
              src="/info.jpg"
              width={40}
              height={40}
              alt="info button"
              className={styles.infoImg}
              onClick={() =>
                toggleModal(true, selectedEntity, item.title || item.name)
              }
            />
          </div>
        ))}
      </div>
      {isLoading && (
        <Image
          className={styles.loading}
          width={100}
          height={100}
          src="/loader.gif"
          alt="Loading"
        />
      )}
      {response.next ? (
        <button
          className={styles.loadMoreBtn}
          onClick={handleLoadMore}
          disabled={isLoading}
        >
          Load more
        </button>
      ) : null}
    </div>
  );
};

export default List;
