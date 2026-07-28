import { useReducer } from "react";
import EventForm from "./components/EventForm";
import SummaryCard from "./components/SummaryCard";
import type { RegistrationData } from "./components/interface/types";

type State = {
  submittedData: RegistrationData | null;
};

type Action =
  | { type: "SUBMIT"; payload: RegistrationData }
  | { type: "RESET" };

const initialState: State = {
  submittedData: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SUBMIT":
      return {
        ...state,
        submittedData: action.payload,
      };

    case "RESET":
      return {
        ...state,
        submittedData: null,
      };

    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div
      style={{
        maxWidth: 700,
        margin: "40px auto",
      }}
    >
      <EventForm dispatch={dispatch} />

      {state.submittedData && (
        <SummaryCard registration={state.submittedData} />
      )}
    </div>
  );
}

export default App;