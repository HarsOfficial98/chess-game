import React, { useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
// import { initialBoardState } from './boardUtils';

const ChessGame = () => {

  const initialBoardState = [
    ['r','n','b','q','k','b','n','r'],
    ['p','p','p','p','p','p','p','p'],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['P','P','P','P','P','P','P','P'],
    ['R','N','B','Q','K','B','N','R']
  ];
  const [board, setBoard] = useState(initialBoardState);

  const [game, setGame] = useState(new Chess());

  const safeGameMutate = (modify) => {
    setGame((g) => {
      const update = new Chess(g.fen());
      modify(update);
      return update;
    });
  };

  const onDrop = (sourceSquare, targetSquare) => {
    const gameCopy = new Chess();
    gameCopy.load(game.fen());
  
    let move = null;
    try {
      move = gameCopy.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q", // always promote to queen
      });
    } catch (error) {
      alert('Invalid move: ${sourceSquare} to ${targetSquare}');
      return false;
    }
  
    if (move === null) {
      alert('Invalid move: ${sourceSquare} to ${targetSquare}');
      return false;
    }
  
    setGame(gameCopy);
    setBoard(gameCopy.fen());
    return true;
  };

  return (
    <div>
      <Chessboard
        position={game.fen()}
        onPieceDrop={onDrop}
        boardWidth={400}
      />
    </div>
  );
};

export default ChessGame;