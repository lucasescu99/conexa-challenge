import Navbar from '@/components/Navbar';
import React from 'react';
import styles from './entity.module.css';
import { Metadata } from 'next';
import List from '@/components/List';

type TParams = {
  entity: string;
};

interface IEntityProps {
  params: TParams;
}

const API_URL = process.env.API_URL as string;

export async function generateMetadata({
  params,
}: {
  params: TParams;
}): Promise<Metadata> {
  const { entity } = params;
  const label = entity[0].toUpperCase() + entity.slice(1);
  return {
    title: `${label} | Starconex`,
  };
}

export default async function Entity({ params }: IEntityProps) {
  const { entity } = params;

  return (
    <div className={styles.container}>
      <Navbar selectedEntity={entity} />
      <List selectedEntity={entity} apiUrl={API_URL} />
    </div>
  );
}
