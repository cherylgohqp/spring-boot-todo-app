export type Subtask = {
    id: string;
    details?: string;
    completed: boolean;
    createdDate?: string;
    updatedDate?: string;
  } & CreateSubtask;
  
  export type CreateSubtask = {
    name: string;
    details?: string;
  };