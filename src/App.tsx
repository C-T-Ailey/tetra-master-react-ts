import { useEffect, useState } from 'react'
import './App.css'
import { type Card, type CellMap } from './types/types';
import { CardSelection } from './component/card selection/card-selection';
import { CardTemplate } from './component/card';
import { WallOne, WallTwo, debugEnemyHand, handWithCardObjects } from './library/all-cards';
import CardBack from "./assets/images/card-frames/card-back.png"
import Divider from "./assets/images/counter-divider.png";
import { getRandomInt, coinFlip } from './helpers/helpers';

// const rows: string[] = ["A","B","C","D"];
// const cols: string[] = ["1","2","3","4"];

// const checkSquare = (cell: string, colBy: number, rowBy: number,) => {
//   const cellRow = cell.split("")[0];
//   const cellCol = cell.split("")[1];
//   const colIndex = cols.indexOf(cellCol);
//   const rowIndex = rows.indexOf(cellRow);
//   const foundCol = cols[colIndex + colBy];
//   const foundRow = rows[rowIndex + rowBy];
  
//   if (!foundCol || !foundRow) return false;
//   else return [foundRow, foundCol].join("");
// }

// Row = Y, col = X

// const checkAllSquares = (cell: string) => {
//   const adjacent = {
//     NW: checkSquare(cell, -1, -1), //NW
//     N: checkSquare(cell, 0, -1), //N
//     NE: checkSquare(cell, 1, -1), //NE
//     E: checkSquare(cell, 1, 0), //E
//     SE: checkSquare(cell, 1, 1), //SE
//     S: checkSquare(cell, 0, 1), //S
//     SW: checkSquare(cell, -1, 1), //SW
//     W: checkSquare(cell, -1, 0), //W
//   };

//   console.log(`Cells adjacent to ${cell}:`, adjacent)
// }


function App() {
  
  
  const mapObj: CellMap = {
    "A1": false, "A2": false, "A3": WallTwo, "A4": false,
    "B1": false, "B2": false, "B3": false, "B4": WallOne,
    "C1": false, "C2": false, "C3": false, "C4": false,
    "D1": false, "D2": false, "D3": false, "D4": false 
  };
  
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  // const [oppSelectedCard, setOppSelectedCard] = useState<Card | null>(null);
  
  const [cellMap, setCellMap] = useState<CellMap>(mapObj);
  const [playerHand, setPlayerHand] = useState<Card[]>(handWithCardObjects);
  const [oppHand, setOppHand] = useState<Card[]>(debugEnemyHand);
  const [playerTurn, setPlayerTurn] = useState<"p1" | "p2" | null>(null);
  const [cardSelect, setCardSelect] = useState(true);
  const [gameBegin, setGameBegin] = useState(false);
  const [hideCoin, setHideCoin] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  useEffect(()=>{
    if (!cardSelect) {
      const coinToss = coinFlip();
      if (coinToss) {
        console.log("P1 goes first")
        setPlayerTurn("p1")
      } else {
        console.log("P2 goes first")
        setPlayerTurn("p2")
      };

      setGameBegin(true);
    }
  },[cardSelect]);

  useEffect(()=>{
    if (gameBegin) {
      setTimeout(()=>{
        console.log("Heyoooo");
        setHideCoin(true)
      }, 3000)
    }
  },[gameBegin]);
  
  useEffect(()=>{
    if (playerHand.length === 0 && oppHand.length === 0) return setGameOver(true);

    if (gameBegin) {
      if (playerTurn === "p1") {
        console.log("Now it is your turn.")
      } else {
        setTimeout(()=>{
          console.log("It is player 2's turn and they are doing something utterly devastating");
          p2Turn();
          setPlayerTurn("p1");
        }, 2000)
      }
    }
  },[playerTurn]);

  useEffect(()=> {
    console.log(selectedCard);
  },[selectedCard])
  
  const selectCard = (card: Card) => {
    setSelectedCard(card);
  }

  const p2Turn = () => {
    const cloneMap = structuredClone(cellMap);
    const cloneOppHand = structuredClone(oppHand);
    const opponentSelectedCard = oppHand[getRandomInt(0, oppHand.length-1)];
    // setOppSelectedCard(opponentSelectedCard);
    const emptyCells = Object.entries(cellMap).filter((cell) => cell[1] === false);
    const randomCell = emptyCells[getRandomInt(0, emptyCells.length-1)];
    console.log("Opponent is placing their card in cell", randomCell);
    const cellKey = randomCell[0] as keyof CellMap;
    cloneMap[cellKey] = opponentSelectedCard;
    const cardIndex = cloneOppHand.findIndex(card => card.id === opponentSelectedCard.id);
    cloneOppHand.splice(cardIndex, 1);
    setOppHand(cloneOppHand);
    setCellMap(cloneMap);
  }

  const handlePlacement = (cell: string) => {
    const cellKey = cell as keyof CellMap;
    
    const cloneMap = structuredClone(cellMap);
    const cloneHand = structuredClone(playerHand);

    if (selectedCard && !!cloneMap[cellKey]) {
      console.log(`Cell ${cell} is occupied`)
    } else if (selectedCard) {
      console.log(`Cell is open and you can place ${selectedCard.cardName} here.`);
      console.log(`Placing ${selectedCard.cardName} in cell ${cell}.`);
      cloneMap[cellKey] = selectedCard;
      const cardIndex = cloneHand.findIndex(card => card.id === selectedCard.id);
      cloneHand.splice(cardIndex, 1);
      setPlayerHand(cloneHand);
      setCellMap(cloneMap);
      setSelectedCard(null);
      setPlayerTurn("p2");
      console.log(cloneMap);
    } else {
      // if no selectedCard,
      // log the card occupying the cell
      console.log(cloneMap[cellKey])
    }
  }

  const displayCellContents = (cell: string) => {
    const cellKey = cell as keyof CellMap;

    console.log(cellMap[cellKey]); 
    
    return cellMap[cellKey] === false ? <></> : 
      // <GridCard card={cellMap[cellKey]}/>
      <CardTemplate card={cellMap[cellKey]}/>
    ;
  }
    
  const coinFlip = () => {
    return Math.random() < 0.5;
  }

  if (cardSelect) {
    return (
        <CardSelection setPlayerHand={setPlayerHand} start={() => setCardSelect(false)}/>
    )
  }

    const playerCardCount = (player: string) => {
      const count = Object.values(cellMap).filter((card: Card) => card.player === player).length;
      console.log(count);
      return count;
    }
    
    return (
      <div id="playmat">
      <div style={{display: gameOver ? "flex" : "none"}} className='game-over-container'>
        <div className='game-over'>
          game bloody over innit
        </div>
      </div>
      <div className='coin-toss'>
        <div id="coin" className={hideCoin ? "none" : ""}>
          <div id="coin-result" className={playerTurn === "p1" ? "heads-result" : "tails-results"}></div>
        </div>
      </div>
      <div id="cards-counter">
      <div id="cards-p2">
        <div className='p2-cards-container'>
          { oppHand.map((card: Card, index) => (
            <div id={`p2-${card.id}`} className="card-back" style={{backgroundImage: `url(${CardBack})`, zIndex: `${index * 10}`, top: index === 0 ? "0" : `${index * 3}rem`}} onClick={() => playerCardCount("p1")}></div>
            ))}
        </div>
      </div>
      <div id="counter">
        <div className='counter-flex'>
          {/* {`${playerCardCount("p2")}/${playerCardCount("p1")}`} */}
          <div className='p2-count'>{`${playerCardCount("p2")}`}</div>
          <img className='divider' src={Divider} />
          <div className='p1-count'>{`${playerCardCount("p1")}`}</div>
        </div>
      </div>
      </div>
      <div className='grid-container'>
      <div id="battlegrid">
        {Object.keys(cellMap).map((cell: string) => (
            <div key={cell} id={cell} className="grid-cell" onClick={() => handlePlacement(cell)}>
              {displayCellContents(cell)}
            </div>
          )
          )}
      </div>
      </div>
        <div id="cards-p1">
          { playerHand.map((card: Card, index) => (
            <div onClick={playerTurn === "p1" ? () => selectCard(card) : ()=>console.log("Not your turn, guy")}>
              <CardTemplate index={index} card={card}/>
            </div>
          )) }
        </div>
      </div>
  )
}

export default App
