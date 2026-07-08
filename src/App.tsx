import { useEffect, useState } from 'react'
import './App.css'
import { type Arrows, type Card, type CellMap } from './types/types';
import { CardSelection } from './component/card selection/card-selection';
import { CardTemplate } from './component/card';
import { WallOne, WallTwo, debugEnemyHand, handWithCardObjects } from './library/all-cards';
import CardBack from "./assets/images/card-frames/card-back.png"
import Divider from "./assets/images/counter-divider.png";
import { getRandomInt, coinFlip } from './helpers/helpers';

const rows: string[] = ["A","B","C","D"];
const cols: string[] = ["1","2","3","4"];

const checkSquare = (cell: string, colBy: number, rowBy: number,) => {
  const cellRow = cell.split("")[0];
  const cellCol = cell.split("")[1];
  const colIndex = cols.indexOf(cellCol);
  const rowIndex = rows.indexOf(cellRow);
  const foundCol = cols[colIndex + colBy];
  const foundRow = rows[rowIndex + rowBy];
  
  if (!foundCol || !foundRow) return false;
  else return [foundRow, foundCol].join("");
}

// Row = Y, col = X

const checkAllSquares = (cell: string) => {
  const adjacent = {
    NW: checkSquare(cell, -1, -1), //NW
    N: checkSquare(cell, 0, -1), //N
    NE: checkSquare(cell, 1, -1), //NE
    E: checkSquare(cell, 1, 0), //E
    SE: checkSquare(cell, 1, 1), //SE
    S: checkSquare(cell, 0, 1), //S
    SW: checkSquare(cell, -1, 1), //SW
    W: checkSquare(cell, -1, 0), //W
  };

  console.log(`Cells adjacent to ${cell}:`, adjacent)
  return adjacent;
}


function App() {
  
  
  const mapObj: CellMap = {
    "A1": false, "A2": false, "A3": false, "A4": false,
    "B1": false, "B2": false, "B3": false, "B4": false,
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
  
  const [countLock, setCountLock] = useState(false);

  // generating block cells
  useEffect(()=>{

    if (countLock) return;

    // empty cell is the items of cellMap paired in arrays, filtered to only those whose index 1 is false
    const cloneMap = structuredClone(cellMap);
    const cellKeys = Object.keys(cellMap); //♣
    let countdown = getRandomInt(1, 6);
    while (countdown > 0) {
      const randomKey = cellKeys[getRandomInt(0, cellKeys.length-1)];

      const wallType = getRandomInt(1, 2)
      const cellKey = randomKey as keyof CellMap;
      cloneMap[cellKey] = wallType > 1 ? WallOne : WallTwo; 
      
      countdown -= 1;
    }

    setCellMap(cloneMap);
    setCountLock(true);

  },[])

  useEffect(()=>{
    if (!cardSelect) {
      const coinToss = coinFlip();
      if (coinToss) {
        setPlayerTurn("p1")
      } else {
        setPlayerTurn("p2")
      };

      setGameBegin(true);
    }
  },[cardSelect]);

  useEffect(()=>{
    if (gameBegin) {
      setTimeout(()=>{
        setHideCoin(true)
      }, 3000)
    }
  },[gameBegin]);
  
  useEffect(()=>{
    if (playerHand.length === 0 && oppHand.length === 0) return setGameOver(true);

    if (gameBegin) {
      if (playerTurn === "p1") {
      } else {
        setTimeout(()=>{
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

  const clashWinner = (atk: Card, def: Card) => {
    console.log(`Clash between ${atk.cardName} and ${def.cardName}`)
    if (atk.atkType === "P") {
      if (def.pDef > atk.power) {
        return "def"
      } else {
        return "atk"
      };
    };

    if (atk.atkType === "M") {
      if (def.mDef > atk.power) {
        return "def"
      } else {
        return "atk"
      };
    };

    if (atk.atkType === "X") {
      // if attacker's power is greater than the lowest between defender's mdef and pdef
      if (atk.power >= Math.min(def.mDef, def.pDef)) {
        return "atk"
      } else {
        return "def"
      }
    }
    
    if (atk.atkType === "A") {
      // if attacker's power is greater than the lowest between defender's mdef, pdef and power
      if (atk.power >= Math.min(def.mDef, def.pDef, def.power)) {
        return "atk"
      } else {
        return "def"
      }
    }
  }

  const cardPlaced = (attacker: Card, cMap: CellMap, cell: string) => {
    // the cellmap
    const map = structuredClone(cMap);

    const attackerInMap = map[cell as keyof CellMap];

    if (!attackerInMap) return;

    // the attacking directions of attacker
    const {atkDirections} = attacker
    // all squares adjacent to the placed card
    const adjacent = checkAllSquares(cell);

    //keys for cells adjacent to placed card [compDir, cellAtDir] filtered by whether the cell exists and attacking card has arrows in those dirs
    const adjacentDirections = Object.entries(adjacent).filter(entry => !!entry[1] && atkDirections[entry[0] as keyof Arrows])
    // console.log("directions", attacker.cardName, "will attack if placed here:",adjacentDirections)
    
    // for each cell,
    // if it's populated, set its player to that of the card being played
    adjacentDirections.forEach(adjCell => {
      // index 1 of mapKey, as a key of CellMap
      const mapKey = adjCell[1] as keyof CellMap;

      // the item (if any) contained at mapKey's coordinates
      const defender = map[mapKey]

      // if there's a defending card there and it's not a wall
      if (defender && defender.cardName !== "Wall" && defender.player !== attacker.player) {
        console.log(defender.cardName, "will be attacked")
        // all squares adjacent to defender
        const adjacentToDefender = checkAllSquares(mapKey);

        // values of adjacent cells, filtered by non-boolean values which include the originally-placed card's cell
        const defendingAgainst: [keyof Arrows, keyof CellMap][] = Object.entries(adjacentToDefender).filter((val): val is [keyof Arrows, keyof CellMap] => {return typeof val[1] === "string" && val.includes(cell)})
        // console.log("Defender",defender.cardName,"will defend this a way",defAdjacentDirections)
        // console.log(defender.cardName, "can clash with", attacker.cardName, defendingAgainst);

        const defendingDirection = defendingAgainst[0][0] as keyof Arrows;

        const canDefend = Object.entries(defender.atkDirections).filter((val): val is [keyof Arrows, boolean] => {return val[0] === defendingDirection && val[1] === true});
        
        // console.log(defender.cardName, "can defend against", attacker.cardName, ":", canDefend)

        if (canDefend.length > 0) {
          if (attacker.player === defender.player) {
            console.log(attacker.cardName, "has same owner as", defender.cardName);
          } else if (clashWinner(attacker, defender) === "def") {
            console.log(defender.cardName, "wins");
            attackerInMap.player = defender.player;
          } else if (clashWinner(attacker, defender) === "atk"){
            console.log(attacker.cardName, "wins");
            defender.player = attacker.player;
          } 
        } else {
          defender.player = attacker.player;
        }

      }
    })
    setCellMap(map)
  }

  const p2Turn = () => {
    const cloneMap = structuredClone(cellMap);
    const cloneOppHand = structuredClone(oppHand);
    const opponentSelectedCard = oppHand[getRandomInt(0, oppHand.length-1)];
    // setOppSelectedCard(opponentSelectedCard);
    const emptyCells = Object.entries(cellMap).filter((cell) => cell[1] === false);
    const randomCell = emptyCells[getRandomInt(0, emptyCells.length-1)];
    // console.log("Opponent is placing their card in cell", randomCell);
    const cellKey = randomCell[0] as keyof CellMap;
    cloneMap[cellKey] = opponentSelectedCard;
    const cardIndex = cloneOppHand.findIndex(card => card.id === opponentSelectedCard.id);
    const playedCard = cloneOppHand.splice(cardIndex, 1);
    setOppHand(cloneOppHand);
    setCellMap(cloneMap);
    cardPlaced(playedCard[0], cloneMap, cellKey);
  }

  const handlePlacement = (cell: string) => {
    const cellKey = cell as keyof CellMap;
    
    const cloneMap = structuredClone(cellMap);
    const cloneHand = structuredClone(playerHand);

    if (selectedCard && !!cloneMap[cellKey]) {
      console.log(`Cell ${cell} is occupied`)
    } else if (selectedCard) {
      // console.log(`Cell is open and you can place ${selectedCard.cardName} here.`);
      // console.log(`Placing ${selectedCard.cardName} in cell ${cell}.`);
      cloneMap[cellKey] = selectedCard;
      const cardIndex = cloneHand.findIndex(card => card.id === selectedCard.id);
      cloneHand.splice(cardIndex, 1);
      setPlayerHand(cloneHand);
      setCellMap(cloneMap);
      setSelectedCard(null);
      setPlayerTurn("p2");
      cardPlaced(selectedCard, cloneMap, cellKey)
      // console.log(cloneMap);
    } else {
      // if no selectedCard,
      // log the card occupying the cell
      console.log(cloneMap[cellKey])
    }
  }

  const displayCellContents = (cell: string) => {
    const cellKey = cell as keyof CellMap;
    
    return cellMap[cellKey] === false ? <></> : 
      // <GridCard card={cellMap[cellKey]}/>
      <CardTemplate card={cellMap[cellKey]}/>
    ;
  }

  if (cardSelect) {
    return (
        <CardSelection setPlayerHand={setPlayerHand} start={() => setCardSelect(false)}/>
    )
  }

    const playerCardCount = (player: string) => {
      const count = Object.values(cellMap).filter((card: Card) => card.player === player).length;
      return count;
    }

    const gameEndMessage = () => {
      if (playerCardCount("p1") === 10) {
        return "bloody hell perfect game m8"
      } else if (playerCardCount("p2") === 10) {
        return "bloody hell m8 u got rinsed"
      } else if (playerCardCount("p1") > playerCardCount("p2")) {
        return "blimey u bloody won innit"
      } else if (playerCardCount("p1") < playerCardCount("p2")) {
        return "u bloody lost innit"
      } else {
        return "bloody tie innit"
      }
    }
     
    return (
      <div id="playmat">
      <div style={{display: gameOver ? "flex" : "none"}} className='game-over-container'>
        <div className='game-over'>
          {gameEndMessage()}
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
            <div onClick={playerTurn === "p1" ? () => selectCard(card) : ()=>console.log("Not your turn, buddy")}>
              <CardTemplate index={index} card={card}/>
            </div>
          )) }
        </div>
      </div>
  )
}

export default App
