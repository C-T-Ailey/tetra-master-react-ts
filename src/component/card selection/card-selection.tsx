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

    const range = (start: number, stop: number, step: number) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));
    
    // Function for mapping a provided array of cards (collection) to the emptyCollection array of arrays
    const arrangeCollection = (collection: Card[]) => {
        
        // an array of 100 arrays each containing a single "emptyCard" object, designating an empty collection square
        const emptyCollection = range(0, 99, 1).map(() => [emptyCard]);
        // const fullCollection = collection.map((card) => [card]);
        
        // array representing each copy of a particular card in the supplied collection, init. empty
        let cardsAtIndex = [];

        // for each item in the supplied collection,
        for (let i = 0; i < collection.length; i++) {

            // card at the current index (i) of the supplied collection
            const currentCard = collection[i];

            // the card at the next index of the supplied collection
            const nextCard = collection[i + 1];

            // push current card to the cardsAtIndex array
            cardsAtIndex.push(currentCard);
            
            // if the id of the next card in the array is greater than the current card's ID, it is not a duplicate of the current card
            if (nextCard?.id > currentCard?.id) {
                // take the empty collection and splice in the cardsAtIndex array at the relevant index
                // (that being equal to the current card's ID, minus one)
                emptyCollection.splice(currentCard.id - 1, 1, cardsAtIndex)

                // empty the cardsAtIndex array, ready for the next round of assignment
                cardsAtIndex = [];
            }
            
            // if there is no next card,
            if (!nextCard?.id) {
                // splice in the cardsAtIndex array at the relevant index and we're done with assignments
                emptyCollection.splice(currentCard.id - 1, 1, cardsAtIndex)
            }
        }

        // return the mutated emptyCollection, now properly populated
        return emptyCollection;
    }
    
    const [collection, setCollection] = useState<Card[][]>(arrangeCollection(allCards));
    const [hand, setHand] = useState<Card[]>([])
    const [preview, setPreview] = useState<Card[]>([emptyCard])
    const [previewIndex, setPreviewIndex] = useState(0);
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
        setCollection(arrangeCollection(allCards));
        setCheckStart(false);
    }
    
    const handleSelect = (index: any) => {
        if (hand.length === 5) return; // nothing if hand is full

        const selection = structuredClone(collection); // the player's entire collection

        const cardSet = selection[index]; // the set of all copies of a particular card
        
        if (cardSet[0].id === 0) return; // if the clicked card is an empty space, return out
        
        const newHand = structuredClone(hand); // newHand is defaulted to current hand
        
        console.log("card set preview index", cardSet[previewIndex]); // the currently previewed card from within the card set
        
        const selectedCard = cardSet.length > 1 ? selection[index].splice(previewIndex, 1) : selection[index].splice(previewIndex, 1, emptyCard);
        
        newHand.push(selectedCard[0]);
        
        if (previewIndex > cardSet.length - 1) {
            setPreviewIndex(previewIndex - 1);
        };

        setCollection(selection);

        setHand(newHand);
    }


    const handleCardScroll = (event: React.WheelEvent<HTMLDivElement>, card: Card[]) => {
        console.log("scrollin");
        if (event.deltaY > 0 && previewIndex > 0) {
            console.log("previous card", previewIndex - 1)
            setPreviewIndex(previewIndex - 1);
        }
        else if (event.deltaY < 0 && previewIndex < card.length - 1) {
            console.log("next card", previewIndex + 1)
            setPreviewIndex(previewIndex + 1);
        }
        else if (previewIndex === 0) {
            console.log("rollover to last")
            setPreviewIndex(card.length - 1);
        }
        else if (previewIndex === card.length - 1) {
            console.log("rollover to first")
            setPreviewIndex(0);
        }
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
                        <div key={index} className={card[0].id === 0 ? "empty" : "select-cell"} onMouseOver={() => setPreview(card)} onMouseOut={() => {setPreview([emptyCard]); setPreviewIndex(0)}} onWheel={(e) => handleCardScroll(e, card)} onClick={()=>handleSelect(index)}>
                            { card[0].id !== 0 &&
                            <span style={{display: card.length > 1 ? "" : "none"}} className="card-count">{card.length}</span>
                            }
                            <img className={`icons ${card.length > 1 && "has-multiple"}`} src={card[0].id > 0 ? card[0].icon : card[0].cardImg}/>
                        </div>
                    ))
                }
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
                    <div className="id-display">No.{preview && preview[0].id > 0 ? preview[0].id : "-"}</div>
                    <div className="preview-container">
                        <div className="card-back" style={{backgroundImage: `url(${CardBack})`}}></div>
                        {preview && preview[0].id !== 0 &&
                            <div className="previewed-card">
                                <CardTemplate card={preview[previewIndex]} flipped={false} autoTip={true}/>
                            </div>
                            
                        }
                    </div>
                    <div>{preview[0].id !== 0 ? `${previewIndex+1}/${preview.length}` : `-/-`}</div>
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