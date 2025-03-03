import { apiCall } from "@/utils/apiHelper";
import * as React from "react";

interface IDetailTodoProps {
  params: { id: string };
}

interface ITodo {
  objectId: string;
  task: string;
  isDone: boolean;
}

const getTaskDetail = async (id: string) => {
  try {
    const query = encodeURIComponent(`objectId='${id}'`);
    const res = await apiCall.get(`/todos?where=${query}`);

    return res.data[0];
  } catch (error) {
    console.log(error);
  }
};

const DetailTodo: React.FunctionComponent<IDetailTodoProps> = async (props) => {
  const task: ITodo = await getTaskDetail(props.params.id);
  console.log(task);

  return (
    <div>
      <h1>Detail Todo {task.objectId} </h1>
    </div>
  );
};

export default DetailTodo;
