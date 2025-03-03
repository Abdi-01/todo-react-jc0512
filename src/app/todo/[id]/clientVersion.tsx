"use client";
import { apiCall } from "@/utils/apiHelper";
import * as React from "react";

interface IDetailTodoProps {
  params: Promise<{ id: string }>;
}

interface ITodo {
  objectId: string;
  task: string;
  isDone: boolean;
}

const DetailTodo: React.FunctionComponent<IDetailTodoProps> = (props) => {
  const [task, setTask] = React.useState<ITodo | null>(null);
  const getTaskDetail = async () => {
    try {
      // get data from props.params
      const taskId = await props.params;
      const query = encodeURIComponent(`objectId='${taskId.id}'`);
      const res = await apiCall.get(`/todos?where=${query}`);

      console.log(res.data);
      setTask(res.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getTaskDetail();
  }, []);

  return (
    <div>
      <h1>Detail Todo {task?.objectId}</h1>
    </div>
  );
};

export default DetailTodo;
