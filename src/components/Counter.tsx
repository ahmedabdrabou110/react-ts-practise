import { ReactNode } from "react";
import { useCounter, useCounterText } from "../context/CounterContext";

type CounterProps = {
  children: (num: number) => ReactNode;
};

const Counter = ({ children }: CounterProps) => {
  const { count, increment, decrement } = useCounter();
  const { text, handleTextChange } = useCounterText();
  return (
    <>
      <div>
        {children(count)}
        <div>
          <button onClick={increment}>+</button>
          <button onClick={decrement}>-</button>
        </div>
        <input type="text" onChange={handleTextChange} />
        <h2>{text}</h2>
      </div>
    </>
  );
};

export default Counter;
