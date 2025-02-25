import * as React from "react";

interface IButtonProps {
  id: string;
  title: string;
  name?: string;
  type?: string;
}

const Button: React.FunctionComponent<IButtonProps> = (props) => {
  return (
    <button
      id={props.id}
      name={props?.name || props.id}
      className="bg-slate-300 p-2 rounded-md"
    >
      {props.title}
    </button>
  );
};

export default Button;
