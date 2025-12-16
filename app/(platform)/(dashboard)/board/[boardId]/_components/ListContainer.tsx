'use client';

import { ListWithCards } from '@/types';
import ListForm from './ListForm';
import { useEffect, useState } from 'react';
import { useAction } from '@/hooks/use-action';
import { updateListOrder } from '@/actions/update-list-order';
import { updateCardOrder } from '@/actions/update-card-order';
import ListItem from './ListItem';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { toast } from 'sonner';

interface ListContainerProps {
  data: ListWithCards[];
  boardId: string;
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

function ListContainer({ data, boardId }: ListContainerProps) {
  const [orderedData, setOrderedData] = useState(data);

  const{execute:executeUpdateListOrder}=useAction(updateListOrder, {
    onSuccess: () => {
      toast.success('List order updated');
    },
    onError: (error) => {
      toast.error(error);
    },
  })

   const { execute: executeUpdateCardOrder } = useAction(updateCardOrder, {
     onSuccess: () => {
       toast.success('Card order updated');
     },
     onError: (error) => {
       toast.error(error);
     },
   });

  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  const onDragEnd = (result: any) => {
    const { destination, source, type } = result;
    if (!destination) {
      return;
    }
    //if dropped in the same place
    if(destination.droppableId===source.droppableId&&
      destination.index===source.index){
      return;
    }
    //user moves a list 
    if (type === 'list') {
      const items = reorder(
        orderedData,
        source.index,
        destination.index
      ).map((item, index) => ({ ...item, order: index }));
      setOrderedData(items);
      executeUpdateListOrder({items, boardId});
    };

    //user moves a card
    if (type === 'card') {
      let newOrderedData = [...orderedData];
      //source and destination lists
      const sourceList= newOrderedData.find(list => list.id === source.droppableId);
      const destList= newOrderedData.find(list => list.id === destination.droppableId);
      if(!sourceList||!destList) return;
      //check if cards exist in the sourceList
      if(!sourceList.cards){
        sourceList.cards=[];
      }
      //check if cards exist in the destList
      if(!destList.cards){
        destList.cards=[];
      }
      //move the card in the same list
      if(source.droppableId===destination.droppableId){
        const reorderedCards = reorder(
          sourceList.cards,
          source.index,
          destination.index
        );
        reorderedCards.forEach((card, index) => {
          card.order = index;
        });
        sourceList.cards = reorderedCards;
        setOrderedData(newOrderedData);
        executeUpdateCardOrder({boardId,items:reorderedCards, });
        //user moves card to a different list
      }else{
        //remove card from source list
        const [movedCard] = sourceList.cards.splice(source.index, 1);
        //assaign the new listId to the moved card
        movedCard.listId =destination.droppableId;
        //insert the card into the destination list
        destList.cards.splice(destination.index, 0, movedCard);
        sourceList.cards.forEach((card, index) => {
          card.order = index;
        });
        //update the order of cards in the destination list
        destList.cards.forEach((card, index) => {
          card.order = index;
        });
        setOrderedData(newOrderedData);
        executeUpdateCardOrder({
          boardId,
          items:destList.cards, 
        });
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" direction="horizontal" type="list">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex gap-x-3 h-full"
          >
            {orderedData.map((list, index) => {
              return <ListItem key={list.id} index={index} data={list} />;
            })}
            {provided.placeholder}
            <ListForm />
            <div className="flex-shrink-0 w-1" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
}


export default ListContainer;