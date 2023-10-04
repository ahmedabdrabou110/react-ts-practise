import {
  ChangeEvent,
  ReactElement,
  createContext,
  useReducer,
  useContext,
} from "react";

type StateProps = {
  count: number;
  text: string;
};

const initialState: StateProps = {
  count: 0,
  text: "",
};

const enum REDUCER_ACTION_TYPE {
  INCREMENT,
  DECREMENT,
  NEW_INPUT,
}

type reducerActionType = {
  type: REDUCER_ACTION_TYPE;
  payload?: string;
};

const reducer = (
  state: typeof initialState,
  action: reducerActionType
): typeof initialState => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.INCREMENT:
      return { ...state, count: state.count + 1 };
    case REDUCER_ACTION_TYPE.DECREMENT:
      return { ...state, count: state.count - 1 };
    case REDUCER_ACTION_TYPE.NEW_INPUT:
      return { ...state, text: action.payload ?? "" };
    default:
      throw new Error(`Unknown action ${action.type}`);
  }
};

const useCounterContext = (initialState: StateProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const increment = () => dispatch({ type: REDUCER_ACTION_TYPE.INCREMENT });
  const decrement = () => dispatch({ type: REDUCER_ACTION_TYPE.DECREMENT });
  const handleTextChange = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch({
      type: REDUCER_ACTION_TYPE.NEW_INPUT,
      payload: e.target.value,
    });
  };
  return { state, increment, decrement, handleTextChange };
};

type useCounterContextType = ReturnType<typeof useCounterContext>;

const initContextState: useCounterContextType = {
  state: initialState,
  increment: () => {},
  decrement: () => {},
  handleTextChange: (e: ChangeEvent<HTMLInputElement>) => {},
};

export const CounterContext =
  createContext<useCounterContextType>(initContextState);

type ChildrenType = {
  children?: ReactElement | undefined;
};

export const CounterProvider = ({
  children,
  ...initialState
}: ChildrenType & StateProps) => {
  return (
    <CounterContext.Provider value={useCounterContext(initialState)}>
      {children}
    </CounterContext.Provider>
  );
};

type useCounterHookType = {
  count: number;
  increment: () => void;
  decrement: () => void;
};

export const useCounter = (): useCounterHookType => {
  const {
    state: { count },
    increment,
    decrement,
  } = useContext(CounterContext);
  return { count, increment, decrement };
};

type useCounterTextType = {
  text: string;
  handleTextChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const useCounterText = (): useCounterTextType => {
  const {
    state: { text },
    handleTextChange,
  } = useContext(CounterContext);
  return { text, handleTextChange };
};
