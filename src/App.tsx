import { useEffect, useState } from 'react'
import './App.css'
import { type Card, type CellMap } from './types/types';
import Cactuar from './assets/images/card-sprites/tile023.png'
import Tonberry from './assets/images/card-sprites/tile045.png'
import Hecteyes from './assets/images/card-sprites/tile037.png'
import Goblin from './assets/images/card-sprites/tile000.png'
import Chocobo from './assets/images/card-sprites/tile088.png'
import BlockOne from './assets/images/card-frames/block-tile-1.png'
import BlockTwo from './assets/images/card-frames/block-tile-2.png'
import special from "./assets/images/select-icons/hmm.png"
import { CardSelection } from './component/card selection/card-selection';
import { CardTemplate } from './component/card';

// const rows: string[] = ["A","B","C","D"];
// const cols: string[] = ["1","2","3","4"];

const WallOne: Card = {
  id: 0,
  cardName: "Wall",
  power: 0,
  atkType: "X",
  pDef: 0,
  mDef: 0,
  cardImg: BlockOne,
  atkDirections: {
    NW: false, 
    N: false, 
    NE: false, 
    E: false, 
    SE: false, 
    S: false, 
    SW: false, 
    W: false
  },
  player: "block",
  icon: special
}

const WallTwo: Card = {
  id: 0,
  cardName: "Wall",
  power: 0,
  atkType: "X",
  pDef: 0,
  mDef: 0,
  cardImg: BlockTwo,
  atkDirections: {
    NW: false, 
    N: false, 
    NE: false, 
    E: false, 
    SE: false, 
    S: false, 
    SW: false, 
    W: false
  },
  player: "block",
  icon: special
}

const handWithCardObjects: Card[] = [
  {
    id: 1,
    cardName: "Cactuar",
    power: 0x2,
    atkType: "P",
    pDef: 0xB,
    mDef: 0x1,
    cardImg: Cactuar,
    atkDirections: {
      NW: false, 
      N: false, 
      NE: true, 
      E: true, 
      SE: true, 
      S: true, 
      SW: false, 
      W: false
    },
    player: "p1",
    icon: special
  },
  {
    id: 2,
    cardName: "Tonberry",
    power: 0x2,
    atkType: "X",
    pDef: 0x3,
    mDef: 0xA,
    cardImg: Tonberry,
    atkDirections: {
      NW: true, 
      N: false, 
      NE: true, 
      E: false, 
      SE: false, 
      S: true, 
      SW: false, 
      W: true
    },
    player: "p1",
    icon: special
  },
  {
    id: 3,
    cardName: "Hecteyes",
    power: 0x4,
    atkType: "A",
    pDef: 0x0,
    mDef: 0x4,
    cardImg: Hecteyes,
    atkDirections: {
      NW: false, 
      N: true,
      NE: false, 
      E: false, 
      SE: true, 
      S: false, 
      SW: true, 
      W: false
    },
    player: "p1",
    icon: special
  },
  {
    id: 4,
    cardName: "Goblin",
    power: 0x0,
    atkType: "P",
    pDef: 0x0,
    mDef: 0x0,
    cardImg: Goblin,
    atkDirections: {
      NW: true, 
      N: true,
      NE: true, 
      E: true, 
      SE: true, 
      S: true, 
      SW: true, 
      W: true
    },
    player: "p1",
    icon: special
  },
  {
    id: 5,
    cardName: "Chocobo",
    power: 0x1,
    atkType: "P",
    pDef: 0x3,
    mDef: 0x1,
    cardImg: Chocobo,
    atkDirections: {
      NW: true, 
      N: false,
      NE: true, 
      E: true, 
      SE: true, 
      S: false, 
      SW: true, 
      W: false
    },
    player: "p1",
    icon: special
  },
]

// const debugEnemyHand: Card[] = [
//   {
//     id: 1,
//     cardName: "Cactuar",
//     power: 0x2,
//     atkType: "P",
//     pDef: 0xB,
//     mDef: 0x1,
//     cardImg: Cactuar,
//     atkDirections: {
//       NW: false, 
//       N: false, 
//       NE: true, 
//       E: true, 
//       SE: true, 
//       S: true, 
//       SW: false, 
//       W: false
//     },
//     player: "p2",
//     icon: special
//   },
//   {
//     id: 2,
//     cardName: "Tonberry",
//     power: 0x2,
//     atkType: "X",
//     pDef: 0x3,
//     mDef: 0xA,
//     cardImg: Tonberry,
//     atkDirections: {
//       NW: true, 
//       N: false, 
//       NE: true, 
//       E: false, 
//       SE: false, 
//       S: true, 
//       SW: false, 
//       W: true
//     },
//     player: "p2",
//     icon: special
//   },
//   {
//     id: 3,
//     cardName: "Hecteyes",
//     power: 0x4,
//     atkType: "A",
//     pDef: 0x0,
//     mDef: 0x4,
//     cardImg: Hecteyes,
//     atkDirections: {
//       NW: false, 
//       N: true,
//       NE: false, 
//       E: false, 
//       SE: true, 
//       S: false, 
//       SW: true, 
//       W: false
//     },
//     player: "p2",
//     icon: special
//   },
//   {
//     id: 4,
//     cardName: "Goblin",
//     power: 0x0,
//     atkType: "P",
//     pDef: 0x0,
//     mDef: 0x0,
//     cardImg: Goblin,
//     atkDirections: {
//       NW: true, 
//       N: true,
//       NE: true, 
//       E: true, 
//       SE: true, 
//       S: true, 
//       SW: true, 
//       W: true
//     },
//     player: "p2",
//     icon: special
//   },
//   {
//     id: 5,
//     cardName: "Chocobo",
//     power: 0x1,
//     atkType: "P",
//     pDef: 0x3,
//     mDef: 0x1,
//     cardImg: Chocobo,
//     atkDirections: {
//       NW: true, 
//       N: false,
//       NE: true, 
//       E: true, 
//       SE: true, 
//       S: false, 
//       SW: true, 
//       W: false
//     },
//     player: "p2",
//     icon: special
//   },
// ]

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

// const whoseTurnIsItAnyway = () => {}

function App() {

  const mapObj: CellMap = {
    "A1": false, "A2": false, "A3": WallTwo, "A4": false,
    "B1": false, "B2": false, "B3": false, "B4": WallOne,
    "C1": false, "C2": false, "C3": false, "C4": false,
    "D1": false, "D2": false, "D3": false, "D4": false 
  };

  const [selectedCard, setSelectedCard] = useState<Card | null>(null);

  const [cellMap, setCellMap] = useState<CellMap>(mapObj)
  const [playerHand, setPlayerHand] = useState<Card[]>(handWithCardObjects)
  const [playerTurn, setPlayerTurn] = useState<string>()

  const [cardSelect, setCardSelect] = useState(true);

  useEffect(()=>{
    coinFlip() ?
      setPlayerTurn("p1")
    :
      setPlayerTurn("p2")
  },[])

  useEffect(()=> {
    console.log(selectedCard);
  },[selectedCard])
  
  
  const selectCard = (card: Card) => {
    setSelectedCard(card);
  }

  const handlePlacement = (cell: string) => {
    const cellKey = cell as keyof CellMap;
    
    const cloneMap = {...cellMap};
    const cloneHand = [...playerHand];

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

  return (
      <div id="playmat">
      <div className='coin-toss'>
        <div id="coin">
          <div id="coin-result" className={playerTurn === "p1" ? "heads-result" : "tails-results"}></div>
        </div>
      </div>
      <div id="cards-counter">
      <div id="cards-p2"></div>
      <div id="counter">
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
            <div onClick={() => selectCard(card)}>
              <CardTemplate index={index} card={card}/>
            </div>
          )) }
        </div>
      </div>
  )
}

export default App
