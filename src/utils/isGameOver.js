import calculateValidMoves from "./calculateValidMoves";

export default function isGameOver({ currentTurn, board }) {
  const keys = Object.keys(board);

  const allEmptySpaces = keys.reduce((acc, curr) => {
    if (!board[curr]) return [...acc, curr];
    return acc;
  }, []);

  let noMovesLeft = true;

  for (const key of allEmptySpaces) {
    const validPath = calculateValidMoves({ id: key, currentTurn, board });
    if (validPath) {
      noMovesLeft = false;
      break;
    }
  }

  if (noMovesLeft) {
    const filledSpaces = keys.filter((key) => !!board[key]);

    const count = filledSpaces.reduce((acc, curr) => {
      const colour = board[curr];
      return acc[colour]
        ? { ...acc, [colour]: acc[colour] + 1 }
        : { ...acc, [colour]: 1 };
    }, {});

    return count["black"] > count["white"]
      ? console.log("Black wins!")
      : console.log("White wins!");
  }
}
