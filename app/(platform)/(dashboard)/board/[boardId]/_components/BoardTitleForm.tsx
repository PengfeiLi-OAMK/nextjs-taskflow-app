'use client';

import { ElementRef, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Board } from "@prisma/client";
import { FormInput } from '@/components/form/FormInput';
import { useAction } from '@/hooks/use-action';
import { updateBoard } from '@/actions/update-board';
import { toast } from 'sonner';
interface BoardTitleFormProps {
  data: Board;
}


function BoardTitleForm({data}:BoardTitleFormProps) {
	const {execute}=useAction(updateBoard,{
		onSuccess:(data)=>{
			toast.success(`Board"${data.title}" updated successfully`);
			setTitle(data.title);
			disableEditing();
		}
	})
     const [isEditing, setIsEditing] = useState(false);
	 const[title,setTitle]=useState(data.title);
	 const formRef=useRef<ElementRef<'form'>>(null);
	 const inputRef=useRef<ElementRef<'input'>>(null);
	 const disableEditing=()=>{
		 setIsEditing(false);
	 }
	 const enableEditing=()=>{
		 setIsEditing(true);
		 setTimeout(()=>{
			inputRef.current?.focus();
			inputRef.current?.select();
		 });
	 }

	 const onSubmit=(formData:FormData)=>{
		const title=formData.get('title') as string;
		execute({title,id:data.id});
	 };
	 const onBlur=()=>{
		formRef.current?.requestSubmit();
	 };

	 if(isEditing){
		return (
      <form
        action={onSubmit}
        ref={formRef}
        className="flex items-center gap-x-2"
      >
        <FormInput
          ref={inputRef}
          id="title"
          onBlur={onBlur}
          defaultValue={title}
          className="text-lg font-bold px-[7px] py-1 h-7 bg-transparen focus-visible:outline-none focus-visible:ring-transparent border-none"
        />
      </form>
    );
	 };

	return (
		<Button
			onClick={enableEditing}
			variant="transparent"
			className="font-bold text-lg h-auto w-auto p-1 px-2"
		>
			{title}
		</Button>
    )
}

export default BoardTitleForm