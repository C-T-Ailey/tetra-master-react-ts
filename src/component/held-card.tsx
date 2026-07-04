import React, { useState } from "react";
import { type Card } from "../types/types";
import './card.css'
import Arrow from '../assets/images/corner-arrow.png'
import PlayerBg from '../assets/images/card-frames/player-bg.png'
import PlayerFrame from '../assets/images/card-frames/player-frame.png'

interface HeldCardProps {
    index: number,
    card: Card,
    click: (card: Card) => void,
}

export const HeldCard: React.FC<HeldCardProps> = ({ index, card, click }) => {

    const [tooltipVisible, setTooltipVisible] = useState(false);

    const { cardName, cardImg, power, atkType, pDef, mDef, atkDirections } = card

    const staggeredHand = {zIndex: `${index * 10}`, top: index === 0 ? "0" : `-${index * 6}rem`, left: index === 0 ? "0" : `-${index * 1}rem`}
    const alignedHand = {zIndex: `${index * 10}`, top: index === 0 ? "0" : `-${index * 6}rem`}

    console.log(staggeredHand);

    return (
        <div className="held-card-container" style={alignedHand}>
            <div key={index} className='card' onClick={() => click(card)} onMouseOver={() => setTooltipVisible(true)} onMouseOut={() => setTooltipVisible(false)}>
                
                <img className='card-bg' src={PlayerBg} />
            
                <img className='card-image' src={cardImg}  />
            
                <img className='card-frame' src={PlayerFrame} />
                
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

        </div>
    )
}
