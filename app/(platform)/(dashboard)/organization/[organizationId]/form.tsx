'use client';
import { useAction } from "@/hooks/use-action";
import { createBoard } from "@/actions/create-board";
import { FormInput } from "@/components/form/FormInput";
import { FormSubmit } from "@/components/form/FormSubmit";

function Form() {
  const{execute,fieldErrors}= useAction(createBoard,{
    onSuccess(data) {
      console.log('Success!', data);
    },
    onError(error) {
      console.error('Error:', error);
    }
  });

  const onSubmit=(formData:FormData)=>{
    const title=formData.get('title') as string;
    execute({title});
  }
  return (
	<form action={onSubmit}>
    <div className="flex flex-col space-y-2">
      <FormInput
        label="Board Title"
        id="title"
        errors={fieldErrors}
        />
    </div>
    <FormSubmit>Save</FormSubmit>
  </form>
  )
}

export default Form