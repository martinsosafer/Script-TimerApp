import type { Dispatch, ReactNode } from "react";
import { createContext, useContext, useReducer } from "react";

// Define a type for the voice object
interface Voice {
  // Define the properties of the voice object
  // Adjust these based on the actual properties of your currentVoice object
  id: string;
  name: number;
  // Add more properties as needed
}

// Define types
interface PlayerState {
  currentVoice: Voice | null;
  speech: string | null; // New property for speech
  audio: string | null; // New property for audio
  similarity: number; // New property for similarity
  stability: number; // New property for stability
}

interface PlayerAction {
  type:
    | "SET_CURRENT_VOICE"
    | "SET_SPEECH"
    | "SET_AUDIO"
    | "SET_STABILITY"
    | "SET_SIMILARITY"; // Added action type for speech
  payload: string | number;
}

interface PlayerContextProps {
  state: PlayerState;
  dispatch: Dispatch<PlayerAction>;
}

// Initial state
const initialState: PlayerState = {
  currentVoice: null,
  speech: null,
  audio: null,
  similarity: 0.8,
  stability: 0.5,
};

// Reducer function
const playerReducer = (
  state: PlayerState,
  action: PlayerAction,
): PlayerState => {
  switch (action.type) {
    case "SET_CURRENT_VOICE":
      return { ...state, currentVoice: action.payload as unknown as Voice };
    case "SET_SPEECH":
      return { ...state, speech: action.payload as unknown as string };
    case "SET_AUDIO":
      return { ...state, audio: action.payload as unknown as string };
    case "SET_SIMILARITY":
      return { ...state, similarity: action.payload as unknown as number };
    case "SET_STABILITY":
      return { ...state, stability: action.payload as unknown as number };
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
