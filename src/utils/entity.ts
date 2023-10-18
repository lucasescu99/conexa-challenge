export const getEntity = async (entity: string, page: number = 1) => {
  const response = await fetch(`${process.env.API_URL}/${entity}?page=${page}`);
  const data = await response.json();

  return data;
};
