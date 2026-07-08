import React, { useEffect, useState } from "react";
import './card.css';
import type { Card } from "../types/types";
import Arrow from '../assets/images/corner-arrow.png'
import PlayerBg from '../assets/images/card-frames/player-bg.png'
import PlayerFrame from '../assets/images/card-frames/player-frame.png'
import EnemyFrame from '../assets/images/card-frames/enemy-frame.png'
import EnemyBg from '../assets/images/card-frames/enemy-bg.png'

interface CardTemplateProps {
    card: Card,
    flipped?: boolean,
    autoTip?: boolean,
    index?: number,
    click?: any,
}

export const CardTemplate: React.FC<CardTemplateProps> = ({ card, flipped=false, autoTip=false, index, click }) => {
    
    
    const {id, cardName, power, atkType, pDef, mDef, cardImg, atkDirections, player} = card;
    
    if (flipped) {
        console.log(flipped, index, click, id);
    }

    const isP1 = player === "p1"
    
    const isWall = player === "block";
    
    const playerOrGrid = () => {
        if (isWall) return cardImg;
        
        if (isP1) return PlayerBg;
        
        else return EnemyBg;
    }
    
    const [tooltipVisible, setTooltipVisible] = useState(autoTip);

    const [background, setBackground] = useState(playerOrGrid());

    const [frame, setFrame] = useState(playerOrGrid());

    useEffect(()=>{
        if (isWall) return;
        setBackground(playerOrGrid);
        setFrame(isP1 ? PlayerFrame : EnemyFrame)
    },[player])

    // const handleTooltip = () => {
    //     if (isWall) return;

    //     setTooltipVisible(!tooltipVisible)
    // }

    if (isWall) return (
        <div className="card" style={{cursor: "auto"}}>
            <img className='card-bg' src={playerOrGrid()} />
        </div>
    )

    return  (<div className="held-card-container">
    <div className='card' onMouseOver={ () => setTooltipVisible(true)} onMouseOut={() => setTooltipVisible(false)}>
        
        <img className='card-bg' src={background} />
    
        <img className='card-image' src={cardImg} />
    
        <img className='card-frame' src={frame} />
        
        <div className='card-arrows'>
        <div className='arrow-row row-top'>
            {[atkDirections.NW, atkDirections.N, atkDirections.NE].map((arrow, index) => 
            <div key={index} className='arrow-container top'>
                <img style={{display: arrow ? "" : "none"}} className={`arrow arrow-${index}`} src={Arrow} alt="arrow"/>
            </div>
            )}
        </div>
        <div className='arrow-row row-middle'>
            {[atkDirections.W, atkDirections.E].map((arrow, index) => 
            <div key={index} className='arrow-container middle'>
                <img style={{display: arrow ? "" : "none"}} className={`arrow arrow-${index}`} src={Arrow} alt="arrow"/>
            </div>
            )}
        </div>
        <div className='arrow-row row-bottom'>
            {[atkDirections.SW, atkDirections.S, atkDirections.SE].map((arrow, index) => 
                <div key={index} className='arrow-container bottom'>
                <img style={{display: arrow ? "" : "none"}} className={`arrow arrow-${index}`} src={Arrow} alt="arrow"/>
                </div>
            )}
        </div>
        <div className='stats'>
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