"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";
interface IStudentData {
  email: string;
  usia: number;
}

const DataFormPage = () => {
  let count = 0;
  // useRef : untuk mengakses informasi detail suatu element seperti DOM
  const inputEmailRef = useRef<HTMLInputElement>(null);
  const inputUsiaRef = useRef<HTMLInputElement>(null);

  // useState: mengelola data didalam komponen,
  //           dimana ketika data berubah maka akan terjadi re-render component
  const [countState, setCountState] = useState<number>(0); //
  const [angkaA, setAngkaA] = useState<number | null>(null);
  const [angkaB, setAngkaB] = useState<number | null>(null);
  const [hasilHitung, setHasilHitung] = useState<number | null>(null);
  // state for store data student
  const [students, setStudents] = useState<IStudentData[]>([]);

  const onBtIncrement = () => {
    // count++;
    // console.log(count);
    setCountState(countState + 1);
  };

  const handleAngkaA = (e: any) => {
    setAngkaA(parseInt(e.target.value));
  };

  const onBtHitung = () => {
    if (angkaA && angkaB) {
      setHasilHitung(angkaA + angkaB);
    } else {
      alert("Input data pada form dengan benar");
    }
  };

  //   fn for submit data student
  const onBtSubmitStudent = () => {
    //
    if (inputEmailRef.current && inputUsiaRef.current) {
      const temp = [...students]; // menyalin isi array data state students sebelumnya ke penampung sementara
      temp.push({
        email: inputEmailRef.current.value,
        usia: parseInt(inputUsiaRef.current.value),
      });
      setStudents(temp);
    }
  };

  console.log("ISI DATA STUDENT", students);

  const cetakData = () => {
    const toElement = students.map((value: IStudentData, index: number) => {
      return (
        <div key={`${index}-${value.email}`}>
          <span>{index + 1}</span>
          <span>{value.email}</span>
          <span>{value.usia}</span>
        </div>
      );
    });
    return toElement;
  };

  return (
    <div className="text-center">
      <h1 className="text-3xl">Data Form</h1>
      <h3 className="text-xl font-bold">From variable : {count}</h3>
      <h3 className="text-xl font-bold">From useState : {countState}</h3>
      <Button type="button" onClick={onBtIncrement}>
        Increment
      </Button>
      <hr className="my-10" />
      <h2>Kalkulator</h2>
      <div>
        <label htmlFor="angkaA">Angka A</label>
        <Input
          type="number"
          id="angkaA"
          placeholder="Masukkan angka pertama"
          onChange={handleAngkaA}
        />
      </div>
      <div>
        <label htmlFor="angkaB">Angka B</label>
        <Input
          type="number"
          id="angkaB"
          placeholder="Masukkan angka kedua"
          onChange={(e: any) => {
            setAngkaB(parseInt(e.target.value));
          }}
        />
      </div>
      <Button type="button" onClick={onBtHitung}>
        Hitung
      </Button>
      <h2 className="text-4xl font-bold">{hasilHitung}</h2>
      <hr className="my-10" />
      <h2>Student List</h2>
      <div className="w-56 m-auto flex gap-2 items-center">
        <label>Email</label>
        <Input id="email" type="email" ref={inputEmailRef} />
      </div>
      <div className="w-56 m-auto flex gap-2 items-center">
        <label>Usia</label>
        <Input id="usia" type="number" ref={inputUsiaRef} />
      </div>
      <Button type="button" onClick={onBtSubmitStudent}>
        Submit
      </Button>
      <div id="cetak-data">{cetakData()}</div>
    </div>
  );
};

export default DataFormPage;
