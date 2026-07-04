import React, {useEffect, useState} from "react";
import {type Dispatch, type SetStateAction} from "react";
import { allCards, emptyCard } from "../../library/all-cards";
import CardBack from "../../assets/images/card-frames/card-back.png"
import './card-selection.css'
import type { Card } from "../../types/types";
import { HeldCard } from "../held-card";
import { CardTemplate } from "../card";

interface SelectionProps {
    setPlayerHand: Dispatch<SetStateAction<Card[]>>;
    start: () => void;
}

export const CardSelection: React.FC<SelectionProps> = ({setPlayerHand, start}) => {
    
    const library: Card[] = allCards;

    // const partialCollection: Card[] = playerCollection;

    // const arrangeCollection = () => {
    //     const clct = [];

    //     for (let i = 0; i < playerCollection.length; i++) {
    //         const selfCardArray = [];
    //     }
    // }
    
    const [collection, setCollection] = useState<Card[]>(library)
    const [hand, setHand] = useState<Card[]>([])
    const [preview, setPreview] = useState<Card|null>()
    const [checkStart, setCheckStart] = useState<boolean>(false);
    
    useEffect(()=>{ 
        if (hand.length < 5) return;

        setCheckStart(true);
    },[hand])

    const confirmStart = () => {
        setPlayerHand(hand)
            
        start();
    }

    const confirmCancel = () => {
        setHand([]);
        setCollection(library);
        setCheckStart(false);
    }

    const handleSelect = (index: any) => {
        if (hand.length === 5) return;

        const selection = [...collection];

        const card = selection[index];

        console.log(card)

        if (card.id === 0) return;

        const newHand = [...hand];

        newHand.push(card);

        selection.splice(index, 1, emptyCard);

        setCollection(selection);

        console.log(selection);
        
        console.log(newHand);

        setHand(newHand);
    }

    return (
        <div className="select-screen">
            {checkStart && 
                <div className="start-window">
                    <div className="start-text">
                        Begin game?
                    </div>
                    <div className="start-options">
                        <div className="start-text" onClick={confirmStart}>
                            Yes
                        </div>
                        <div className="start-text" onClick={confirmCancel}>
                            No
                        </div>
                    </div>
                </div>
            }
            <div className="grid-container">
                <div className="select-grid">
                {
                    collection.map((card, index) => (
                        <div key={index} className={card.id === 0 ? "empty" : "select-cell"} onClick={() => handleSelect(index)} onMouseOver={() => setPreview(card)} onMouseOut={() => setPreview(null)}>
                            {/* {index+1} */}
                            <img className="icons" src={card.id > 0 ? card.icon : card.cardImg} />
                        </div>
                    )
                )}
                </div>
            </div>
            <div className="select-preview">
                    <div className="player-stats">
                        <div className="outcomes">
                            <div className="outcome-name">WIN</div>
                            <div className="outcome-name">LOSE</div>
                            <div className="outcome-name">DRAW</div>
                        </div>
                        <div className="counts">
                            <div className="outcome-count">0</div>
                            <div className="outcome-count">0</div>
                            <div className="outcome-count">0</div>
                        </div>
                    </div>
                    <div className="preview-container">
                        <div className="card-back" style={{backgroundImage: `url(${CardBack})`}}></div>
                        {preview && preview.id !== 0 &&
                            <div className="previewed-card">
                                <CardTemplate card={preview} flipped={false} autoTip={true}/>
                            </div>
                        }
                    </div>
            </div>
            <div className="select-hand">
                <div className="hand-cards">
                    <div className="containem">
                        {
                            hand.map((card, index) => (
                                <HeldCard index={index} card={card} click={() => {}}/>
                            ))
                        }
                    </div>
                </div>
                <div className="hand-count"><div>{`${hand.length}/5`}</div></div>
            </div>
        </div>
    )
}