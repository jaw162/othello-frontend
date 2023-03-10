import { useMemo } from "react";
import styled from "styled-components";
import { useBoard } from "../context/BoardContext";

const BoardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(9, 1fr);
  gap: 0.5rem;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.backgroundColor};
  padding: 5rem;
  max-width: 40rem;
  max-height: 40rem;
`;

const Tile = styled.div`
  // box-shadow: 0 0 3px 3px #559c88;
  border-radius: 5px;
  background-color: #228b22;
  position: relative;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ vacant }) => (vacant ? "cursor: pointer;" : null)}
`;

const Piece = styled.div`
  border-radius: 50%;
  background-color: ${({ colour }) => colour};
  position: absolute;
  height: 90%;
  width: 90%;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.color};
  row: 9/9;
  grid-column: 1/9;
  text-align: center;
  font-size: 3rem;
`;

export default function Board() {
  const { board, addPiece } = useBoard();

  const { boardDisplay } = useMemo(() => {
    const boardKeys = Object.keys(board);

    const boardDisplay = boardKeys.map((boardKey) => {
      const occupied = board[boardKey];

      if (occupied) {
        return (
          <Tile key={boardKey}>
            <Piece colour={occupied} />
          </Tile>
        );
      }
      return (
        <Tile
          vacant={true}
          onClick={() => addPiece(boardKey)}
          key={boardKey}
          id={boardKey}
        />
      );
    });

    return { boardDisplay };
  }, [board]);

  return (
    <BoardGrid>
      {boardDisplay}
      <Title>Othello</Title>
    </BoardGrid>
  );
}
