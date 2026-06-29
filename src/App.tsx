import { useState } from 'react'
import './App.css'
import Grid from './assets/images/grid.png';
import Arrow from './assets/images/corner-arrow.png'
import Cactuar from './assets/images/card-sprites/tile023.png'
import Tonberry from './assets/images/card-sprites/tile045.png'
import Hecteyes from './assets/images/card-sprites/tile037.png'
import Goblin from './assets/images/card-sprites/tile000.png'
import Chocobo from './assets/images/card-sprites/tile088.png'
import PlayerBg from './assets/images/card-frames/player-bg.png'
import PlayerFrame from './assets/images/card-frames/player-frame.png'

const rows: string[] = ["A","B","C","D"];
const cols: string[] = ["1","2","3","4"];

interface Arrows {
  NW: boolean, 
  N: boolean, 
  NE: boolean, 
  E: boolean, 
  SE: boolean, 
  S: boolean, 
  SW: boolean, 
  W: boolean
}

interface Card {
  cardName: string,
  power: number,
  atkType: "P" | "M" | "X" | "A",
  pDef: number,
  mDef: number,
  cardImg: string,
  atkDirections: Arrows;
}

const handWithCardObjects: Card[] = [
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
]

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
}

const cardInfo = (card: Card) => {
  console.log(`Card: ${card.cardName}.\nAttack power and type: ${card.power}${card.atkType}.\nPhysical def: ${card.pDef}.\nMagic def: ${card.mDef}.`)
}

const gridLabels: string[] = [
  "A1", "A2", "A3", "A4",
  "B1", "B2", "B3", "B4",
  "C1", "C2", "C3", "C4",
  "D1", "D2", "D3", "D4" 
];

function App() {

  return (
    <div id="playmat">
      <div id="cards-counter">
        <div id="cards-p2"></div>
        <div id="counter"></div>
      </div>
      <div id="battlegrid">
        {gridLabels.map((cell: string) => (
          <div key={cell} id={cell} className="grid-cell" onClick={() => checkAllSquares(cell)}>
            {cell}
          </div>
        )
        )}
      </div>
      <img className='grid' src={Grid}/>
      <div id="cards-p1">
        { handWithCardObjects.map((card, index) => (
          <div key={index} className='card' onClick={() => cardInfo(card)}>
            
            <img className='card-bg' src={PlayerBg} />
          
            <img className='card-image' src={card.cardImg}  />
          
            <img className='card-frame' src={PlayerFrame} />
            
            <div className='card-arrows'>
              <div className='arrow-row row-top'>
                {[card.atkDirections.NW, card.atkDirections.N, card.atkDirections.NE].map((arrow, index) => 
                  <div className='arrow-container top'>
                    <img style={{display: arrow ? "" : "none"}} className={`arrow arrow-${index}`} src={Arrow} alt="arrow"/>
                  </div>
                )}
              </div>
              <div className='arrow-row row-middle'>
                {[card.atkDirections.W, card.atkDirections.E].map((arrow, index) => 
                  <div className='arrow-container middle'>
                    <img style={{display: arrow ? "" : "none"}} className={`arrow arrow-${index}`} src={Arrow} alt="arrow"/>
                  </div>
                )}
              </div>
              <div className='arrow-row row-bottom'>
                {[card.atkDirections.SW, card.atkDirections.S, card.atkDirections.SE].map((arrow, index) => 
                    <div className='arrow-container bottom'>
                      <img style={{display: arrow ? "" : "none"}} className={`arrow arrow-${index}`} src={Arrow} alt="arrow"/>
                    </div>
                  )}
              </div>
              <div className='stats'>
                {
                  [card.power.toString(16).toUpperCase(), 
                  card.atkType, 
                  card.pDef.toString(16).toUpperCase(), 
                  card.mDef.toString(16).toUpperCase()]
                  .join("")
                  }
              </div>
            </div>
          </div>
        )) }
      </div>
    </div>
  )
}

export default App
