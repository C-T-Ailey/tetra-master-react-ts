import React from "react";
import { type Card } from "../types/types";
import './grid-card.css'
import Arrow from '../assets/images/corner-arrow.png'
import PlayerBg from '../assets/images/card-frames/player-bg.png'
import PlayerFrame from '../assets/images/card-frames/player-frame.png'
import EnemyBg from '../assets/images/card-frames/enemy-bg.png'

interface GridCardProps {
    card: Card,
}

export const GridCard: React.FC<GridCardProps> = ({ card }) => {

    const { cardImg, power, atkType, pDef, mDef, atkDirections, player } = card

    const isWall = player === "block";

    const calcCardBg = () => {
        if (isWall) return cardImg;

        if (player === "p1") {
            return PlayerBg;
        } else {
            return EnemyBg;
        };
    }

    return (
        <div className='grid-card'>
            
            <img className='grid-card-bg' src={calcCardBg()} />
        
            <img style={{display: !isWall ? "" : "none"}} className='grid-card-image' src={cardImg}  />
        
            <img style={{display: !isWall ? "" : "none"}} className='grid-card-frame' src={PlayerFrame} />
            
            <div className='grid-card-arrows'>
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
            <div style={{display: !isWall ? "" : "none"}} className='stats'>
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
    )
}
