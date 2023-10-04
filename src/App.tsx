import { useState, useEffect, useCallback, useMemo } from "react";
import Counter from "./components/Counter";
import Headig from "./components/Headig";
import { Section } from "./components/Section";
import List from "./components/List";
import "./index.css";
function App() {
  interface User {
    id: number;
    userName: string;
  }

  type fibFunc = (n: number) => number;

  const fib: fibFunc = (n: number) => {
    if (n < 2) return n;
    return fib(n - 1) + fib(n - 2);
  };

  const myNum: number = 23;

  const [count, setCount] = useState<number>(1);
  const [user, setUser] = useState<User[] | null>(null);

  useEffect(() => {
    console.log("amount");
    console.log(user);
    return () => console.log("unamount");
  }, []);

  const addTwo = useCallback((): void => setCount((prev) => prev + 1), []);

  let result = useMemo<number>(() => fib(myNum), [myNum]);

  return (
    <>
      <Headig title={"Ahmed Abdrabou"} />
      <Section title="my subTitle">This is My Section</Section>
      <Counter>{(num: number) => <>Current Count is {num}</>}</Counter>
      <button onClick={addTwo}>Add</button>
      <List
        items={["coffee", "Tacos", "code", "TS", "Play tennis", "Player"]}
        render={(item: string) => <span className="gold bold">{item}</span>}
      />
      <h2>{result}</h2>
    </>
  );
}

export default App;
