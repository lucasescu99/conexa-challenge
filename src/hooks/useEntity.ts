import { IDefaultApiResponse } from '@/interfaces/response';
import { useState, useEffect } from 'react';

const useEntity = (entity: string, page: number, apiUrl: string) => {
  const [response, setResponse] = useState<IDefaultApiResponse<any>>({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${apiUrl}/${entity}?page=${page}`);
        const json = await res.json();
        if (!res.ok) throw new Error(json.detail);
        setResponse(json);
      } catch (error) {
        if (error instanceof Error) {
          setError(error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [apiUrl, entity, page, response.next]);

  return { response, isLoading, error };
};

export default useEntity;
