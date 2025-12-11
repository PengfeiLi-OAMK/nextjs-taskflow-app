'use client';

import { ListWithCards } from '@/types';
import ListForm from './ListForm';
import { useEffect, useState } from 'react';
import { set } from 'lodash';

interface ListContainerProps {
  data: ListWithCards[];
  boardId: string;
}

function ListContainer({ data, boardId }: ListContainerProps) {
  const [orderedData, setOrderedData] = useState(data);
  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  return (
    <ol>
      <ListForm />
      <div className="flex-shrink-0 w-1" />
    </ol>
  );
}

export default ListContainer;
