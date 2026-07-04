export interface Arrows {
    NW: boolean, 
    N: boolean, 
    NE: boolean, 
    E: boolean, 
    SE: boolean, 
    S: boolean, 
    SW: boolean, 
    W: boolean
  }
  
export interface Card {
    id: number,
    cardName: string,
    power: number,
    atkType: "P" | "M" | "X" | "A",
    pDef: number,
    mDef: number,
    cardImg: string,
    atkDirections: Arrows;
    player: "p1" | "p2" | "block";
    icon: string,
}

export interface CellMap {
    A1: Card | false;
    A2: Card | false;
    A3: Card | false;
    A4: Card | false;
    B1: Card | false;
    B2: Card | false;
    B3: Card | false;
    B4: Card | false;
    C1: Card | false;
    C2: Card | false;
    C3: Card | false;
    C4: Card | false;
    D1: Card | false;
    D2: Card | false;
    D3: Card | false;
    D4: Card | false;
}