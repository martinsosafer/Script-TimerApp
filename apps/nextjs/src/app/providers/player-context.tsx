import type { Dispatch, ReactNode } from "react";
import { createContext, useContext, useReducer } from "react";

// Define types
interface PlayerState {
  currentSongId: string | null;
}

interface PlayerAction {
  type: "SET_CURRENT_SONG";
  payload: string;
}

interface PlayerContextProps {
  state: PlayerState;
  dispatch: Dispatch<PlayerAction>;
}

// Initial state
const initialState: PlayerState = {
  currentSongId: null,
};

// Reducer function
const playerReducer = (
  state: PlayerState,
  action: PlayerAction,
): PlayerState => {
  switch (action.type) {
    case "SET_CURRENT_SONG":
      return { ...state, currentSongId: action.payload };
    default:
      return state;
  }
};

// Create context
const PlayerContext = createContext<PlayerContextProps | undefined>(undefined);

// Create a provider component
interface PlayerProviderProps {
  children: ReactNode;
}

const PlayerProvider: React.FC<PlayerProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(playerReducer, initialState);

  return (
    <PlayerContext.Provider value={{ state, dispatch }}>
      {children}
    </PlayerContext.Provider>
  );
};

// Create a custom hook for using the context
const usePlayer = (): PlayerContextProps => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
};

export { PlayerProvider, usePlayer };
