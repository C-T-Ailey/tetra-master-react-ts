import React, { useState } from "react";
import type { Card } from "../types/types";
import Arrow from '../assets/images/corner-arrow.png'
import PlayerBg from '../assets/images/card-frames/player-bg.png'
import PlayerFrame from '../assets/images/card-frames/player-frame.png'
import EnemyBg from '../assets/images/card-frames/enemy-bg.png'
// import EnemyFrame from '../assets/images/card-frames/enemy-frame.png'
// import Block1 from '../assets/images/card-frames/block-tile-1.png'
import Block2 from '../assets/images/card-frames/block-tile-2.png'

interface CardTemplateProps {
    card: Card,
    flipped?: boolean,
    autoTip?: boolean,
    index?: number,
    click?: any,
}

export const CardTemplate: React.FC<CardTemplateProps> = ({ card, flipped=false, autoTip=false, index, click }) => {
    
    const [tooltipVisible, setTooltipVisible] = useState(autoTip);

    const {id, cardName, power, atkType, pDef, mDef, cardImg, atkDirections, player} = card;

    console.log(flipped, index, click, id);

    const isP1 = player === "p1"

    const isWall = player === "block";

    const playerOrGrid = () => {
        if (isWall) return Block2;

        if (isP1) return PlayerBg;

        else return EnemyBg;
    }

    // const handleTooltip = () => {
    //     if (isWall) return;

    //     setTooltipVisible(!tooltipVisible)
    // }

    return  (<div className="held-card-container">
    <div className='card' onMouseOver={ !isWall ? () => setTooltipVisible(true) : () => {}} onMouseOut={ !isWall ? () => setTooltipVisible(false) : () => {}}>
        
        <img className='card-bg' src={playerOrGrid()} />
    
        <img style={{display: !isWall ? "" : "none"}} className='card-image' src={cardImg}  />
    
        <img style={{display: !isWall ? "" : "none"}} className='card-frame' src={PlayerFrame} />
        
        <div className='card-arrows'>
        <div className='arrow-row row-top'>
            {[atkDirections.NW, atkDirections.N, atkDirections.NE].map((arrow, index) => 
            <div className='arrow-container top'>
                <img style={{display: arrow ? "" : "none"}} className={`arrow arrow-${index}`} src={Arrow} alt="arrow"/>
            </div>
            )}
        </div>
        <div className='arrow-row row-middle'>
            {[atkDirections.W, atkDirections.E].map((arrow, index) => 
            <div className='arrow-container middle'>
                <img style={{display: arrow ? "" : "none"}} className={`arrow arrow-${index}`} src={Arrow} alt="arrow"/>
            </div>
            )}
        </div>
        <div className='arrow-row row-bottom'>
            {[atkDirections.SW, atkDirections.S, atkDirections.SE].map((arrow, index) => 
                <div className='arrow-container bottom'>
                <img style={{display: arrow ? "" : "none"}} className={`arrow arrow-${index}`} src={Arrow} alt="arrow"/>
                </div>
            )}
        </div>
        <div className='stats' style={{display: !isWall ? "" : "none"}}>
            {
            [power.toString(16).toUpperCase(), 
            atkType, 
            pDef.toString(16).toUpperCase(), 
            mDef.toString(16).toUpperCase()]
            .join("")
            }
        </div>
        </div>
    </div>
    <div className="tooltip-container">
        <div style={{display: tooltipVisible ? "" : "none"}} className='tooltip'>
            <div>
                {cardName}
            </div>
            <div>
                AtkPwr: {power}
            </div>
            <div>
                AtkType: {atkType}
            </div>
            <div>
                PhysDef: {pDef}

            </div>
            <div>
                MagDef: {mDef}
            </div>
        </div>
    </div>

</div>)
}