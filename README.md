# Tetra Master: React Edition

A browser-based adaptation of the Final Fantasy IX CCG minigame "Tetra Master".

## Rules

- The player will select five cards from their collection.
- At present, the player has access to one of each card, and attack directions will be randomly assigned to each selected card upon starting the match. This will be changed to a collection limited to cards won in matches in a future version.
- Each card has a stat code made up of four characters: Attack (Atk), Type, Physical Defense (PDef), and Magic Defense (MDef).
  - Atk, PDef and MDef will be a hexadecimal value between 0-F, running from 0-9 and then A-F, where A-F is equivalent to 10-15.
  - The second digit will be one of four alphabetical characters:
    - "P" represents Physical. When clashing (explained below), an attacking P-type card will compare its Atk to the defending card's PDef.
    - "M" represents Magic. When clashing, an attacking M-type card will compare its Atk to the defender's MDef.
    - "X" represents Flexible. When clashing, an attacking X-type card will compare its Atk to whichever of the defender's PDef or MDef is lower.
    - "A" represents Assault. "A" is similar to "X", except an attacking A-type will factor the defender's Atk into which stat is lower.
- Upon starting the game, a coin toss will determine who starts. The blue sword denotes Player 1, while the orange shield denotes Player 2.
- The board grid will be pre-populated with between 1-6 Block cards. These cards are inert and cannot be interacted with, instead imposing limitations on placement.
- When a player places a card, surrounding cells will be checked for opponent-controlled cards. If the placed card has attack arrows pointing to one or more such cards, it will attack.
- If a card being attacked does not have an attack arrow pointing at the attacking card, its ownership will be changed to that of the attacking player.
- if it *does* have a corresponding attack arrow, it is considered as defending. In this instance, a **Clash** begins.
  - When a Clash is initiated, the winner is determined by the stat evaluations outlined above. If the defender wins the comparison, the attacker changes ownership to the defending player, and vice versa.
  - (**Feature not yet implemented**) When a card changes ownership after a Clash, all cards which A) are adjacent to the defeated card's attack arrows and B) do not share its new ownership will also change ownership to that of the player who won the Clash. This is called a **Chain**.
- Players continue to place cards until both of their hands are empty. The winner is determined by which player has claimed ownership of the most cards, shown on the counter in the bottom-left corner.
- (**Feature not yet implemented**) After the game finishes, the winner will select a card from whichever of their opponent's cards they managed to claim. If a player finishes a game with all cards under their ownership, it will be registered as a **Perfect**, and they wil claim their opponent's entire hand. In both cases, won cards will be added to the player's collection.

## Implemented Features
- Card Selection works as intended, derived from the provided collection object.
  - At present, the collection comprises a single copy of each card, but an incomplete collection with multiple copies of cards can be swapped in at the developer's discretion.
- Selected cards are assigned a random number of attack arrows (between 0-8) upon game start. 
- Block card population upon game start working as intended.
- Placement, score tracking, instant claiming and Clashes work as intended, albeit without stylistic flair.

## To Do
- Tutorial, because people who have been playing this game for decades don't understand how it works. New players don't stand a chance without it.
- Undoing selections on the Card Selection screen.
- Chaining after a Clash.
- Results screen and card gain/loss for winning and losing players.
- Collection storage, so that cards won or lost are reflected in the player's collection.
- Permanent assignment of fixed attack arrows, instead of random assignment on game start.
- Animations and delays for more satisfying feedback.
- Sounds and music.