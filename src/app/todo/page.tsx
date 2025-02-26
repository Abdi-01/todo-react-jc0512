"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { apiCall } from "@/utils/apiHelper";

interface ITodo {
  id: number;
  task: string;
  isDone: boolean;
}

const TodoPage = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const inputTaskRef = useRef<HTMLInputElement>(null); // mengakses element input utk mendapatkan value
  const [filter, setFilter] = useState<string>("All");

  // useEffect : untuk menjalankan fungsi yang diinginkan secara otomatis ketika ada data state yang berubah dan ketika pertama kali component/page dirender
  // MODE 1 : useEffect akan menjalankan fungsi didalamnya setiap kali ada perubahan state/props
  useEffect(() => {
    // fungsi yang ingin dijalankan
    console.log("useEffect MODE 1 : berjalan tiap ada perubahan state");
  });

  // MODE 2 : useEffect akan menjalankan fungsi didalamnya hanya SEKALI ketika awal render
  useEffect(() => {
    // fungsi yang ingin dijalankan
    // Biasanya digunakan untuk menjalankan fungsi yang bertugas memanggil API atau fetchData pertama kali
    console.log("useEffect MODE 2 : berjalan hanya saat awal render");
    getTodos();
  }, []);

  // MODE 3 : useEffect akan menjalankan fungsi didalamnya hanya ketika state yang DITENTUKAN berubah
  useEffect(() => {
    // fungsi yang ingin dijalankan
    console.log(
      "useEffect MODE 3 : berjalan hanya saat state yang ditentukan berubah"
    );
  }, [filter]);

  const getTodos = () => {
    // - memanggil url api data todos
    apiCall
      .get("/todos")
      .then((response) => {
        // - setelah mendapat response, data disimpan kedalam state todos
        console.log(response.data);
        setTodos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onBtAdd = async () => {
    try {
      // - Pastikan input sudah diisi
      if (inputTaskRef.current && inputTaskRef.current?.value) {
        const response = await apiCall.post("/todos", {
          task: inputTaskRef.current.value,
          isDone: false,
        });

        getTodos();
      } else {
        alert("Form todo jangan sampai kosong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onBtDelete = (id: number) => {
    // - mencari index dari data yang dipilih berdasarkan parameter id
    const dataIdx = todos.findIndex((todo: ITodo) => {
      return todo.id === id;
    });
    // - kemudian menyalin data state todos ke variable temporary
    const temp: ITodo[] = [...todos];
    // - menghapus data berdasarkan index yang ditemukan
    temp.splice(dataIdx, 1);
    // - memperbarui data todos
    setTodos(temp);
  };

  const onBtIsDone = (id: number) => {
    const dataIdx = todos.findIndex((todo: ITodo) => todo.id === id);
    const temp = [...todos];
    temp[dataIdx].isDone = !temp[dataIdx].isDone;
    setTodos(temp);
  };

  const printTodo = () => {
    let data: ITodo[] = [...todos];
    if (filter === "done") {
      data = data.filter((todo: ITodo) => todo.isDone === true);
    } else if (filter === "not-yet") {
      data = data.filter((todo: ITodo) => todo.isDone === false);
    }
    return data.map((todo: ITodo, index: number) => {
      return (
        <li
          key={todo.id}
          className="flex items-center justify-between py-2 border-b last:border-none"
        >
          <div className="flex items-center space-x-4 cursor-pointer">
            <Checkbox
              checked={todo.isDone}
              className="rounded-full w-6 h-6 border-2 border-gray-400"
              onClick={() => onBtIsDone(todo.id)}
            />
            <span>{todo.task}</span>
          </div>
          <Button
            type="button"
            className="p-0 w-8 h-8 rounded-full"
            onClick={() => onBtDelete(todo.id)}
          >
            <Trash size={24} />
          </Button>
        </li>
      );
    });
  };

  return (
    <div>
      <div
        className="w-full h-48 bg-cover bg-center relative"
        style={{
          backgroundImage: "url('/light-bg.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500 to-transparent -z-40" />
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 flex justify-between w-[40rem]">
          <h1 className="text-4xl font-bold tracking-widest text-white">
            TODO
          </h1>
          <Button
            variant="ghost"
            size="icon"
            type="button"
            onClick={() => {
              if (localStorage.getItem("mode") === "light") {
                localStorage.setItem("mode", "dark");
              } else {
                localStorage.setItem("mode", "light");
              }
            }}
          >
            <Moon size={24} />
          </Button>
        </div>
      </div>

      <div className="w-[40rem] m-auto flex flex-col items-center">
        <Card className="w-full mt-[-50px] z-50 bg-white shadow-lg">
          <CardContent className="p-4 flex items-center justify-between">
            <Input
              type="text"
              placeholder="Create a new todo..."
              className="border-none shadow-none"
              ref={inputTaskRef}
            />
            <Button type="button" onClick={onBtAdd}>
              Add Task
            </Button>
          </CardContent>
        </Card>

        <Card className="w-full mt-4 shadow-lg">
          <CardContent className="p-5">
            <ul>{printTodo()}</ul>

            <div className="flex justify-between text-sm text-gray-500 mt-4">
              <span>
                {todos.filter((todo: ITodo) => todo.isDone === false).length}{" "}
                items left
              </span>
              <div className="space-x-3">
                <Button
                  variant="link"
                  type="button"
                  onClick={() => setFilter("all")}
                >
                  All
                </Button>
                <Button
                  variant="link"
                  type="button"
                  onClick={() => setFilter("done")}
                >
                  Done
                </Button>
                <Button
                  variant="link"
                  type="button"
                  onClick={() => setFilter("not-yet")}
                >
                  Not Yet
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TodoPage;
