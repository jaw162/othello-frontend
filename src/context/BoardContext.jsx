import {
  useEffect,
  useState,
  createContext,
  useContext,
  useMemo,
  useCallback,
} from "react";
import { initialState } from "../utils/board";
import calculateValidMoves from "../utils/calculateValidMoves";
import isGameOver from "../utils/isGameOver";

const BoardContext = createContext();

const useBoard = () => {
  const context = useContext(BoardContext);
  if (context === undefined) {
    throw new Error("useBoard must be used within a BoardContextProvider");
  }
  return context;
};

const BoardContextProvider = ({ children }) => {
  const [board, setBoard] = useState(initialState);
  const [whitesTurn, setWhitesTurn] = useState(true);

  const currentTurn = whitesTurn ? "white" : "black";

  const addPiece = useCallback(
    (id) => {
      const validPaths = calculateValidMoves({ id, currentTurn, board });

      if (!validPaths) return;

      validPaths.forEach((path) => {
        path.forEach((piece) => {
          const { key } = piece;

          setBoard((p) => ({ ...p, [key]: currentTurn }));
        });
      });

      setBoard((p) => ({ ...p, [id]: currentTurn }));
      setWhitesTurn(!whitesTurn);
    },
    [board, currentTurn, whitesTurn]
  );

  useEffect(() => {
    isGameOver({ currentTurn, board });
  }, [whitesTurn, board, currentTurn]);

  const value = useMemo(
    () => ({ board, setBoard, addPiece, whitesTurn }),
    [board, setBoard, addPiece, whitesTurn]
  );

  return (
    <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
  );
};

export { useBoard, BoardContextProvider };
