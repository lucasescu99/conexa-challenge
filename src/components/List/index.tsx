'use client';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './list.module.css';
import useEntity from '@/hooks/useEntity';
import Image from 'next/image';
import _ from 'lodash';
import { useModalStore } from '@/store/zustand';
import ItemModal from '../ItemModal';

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

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []);

  useEffect(() => {
    if (response && !error) {
      setItems((prev) => _.uniqWith([...prev, ...response.results], _.isEqual));
    }
  }, [error, response]);

  useEffect(() => {
    if (search) {
      const newItems = items.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()),
      );
      setItems(newItems);
    }
  }, [items, search]);

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
      <h1>{selectedEntity}</h1>
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
