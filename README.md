# Mientropy
A minesweeper clone where I can explore using entropy and probability to solve minesweeper!

## Goals
Most of what I'm doing has been inspired by [this online clone of minesweeper](https://minesweeper.online/), and [this paper on using entropy to calculate the likelihood of mine locations, written by Mike Sheppard](https://minesweepergame.com/math/a-simple-minesweeper-algorithm-2023.pdf). 

The ideal final result would be a fully functional minesweeper game with easy, intermediate, hard, and an auto solver that shows probabilities as it makes it's automated click decisions. The math outlined in the paper absolutely melts my mind. I never took statistics in high-school, so this type of work (while enticing) always comes with a steep learning curve. That said, I hope mostly to understand the math well enough to give an *elevator pitch* on how it works, and understand the algorithm well enough to implement it.

This is a **no AI allowed project**. I'm actively learning and regularly advocate for the use of AI as a developer, but with projects like these, it's fun to prompt Grok and ChatGPT **only** for written explainations, **without** providing code. I don't just want to lanch a minesweeper app. I want to understand it, both functionally and intrinsically. 

## Accomplishments
05/03/25: Huston, we have lift off! The gameplay is around 80% implemented, with working mine counts, random mine placement, and basic point and click controls. It's not fully interactive, but it's enough to play a full game.

05/02/25: So far...? I've taken lots of pretty screenshots and folded them into a table, all wrapped in a Next.js SPA project :)


## Installation
This is a standard nuxt project, so setup is pretty straitforward.
```
# Clone and Install the Application
git clone https://github.com/NicholasStine/mientropy.git
cd mientropy
npm install

# Start the Application
npm run dev
# or
npm start
```


## Updates

### 05/03/25
And that's the game! Today was a sprint to get the gameplay mechanics working. That included initializing a game grid of any size with any number of mines, randomly distributing mines, calculating the number of nearby mines for each tile, and the point and click controls, with a recursive function to reveal nearby blank cells when you click on a large blank area.

**Game Initialization:** given a number of rows, columns, and mines, the init function first selects the tbody element and appends all tr and td tags in an embedded for loop. Not very efficient, but I haven't run into the need to optimize yet, so onwards and upwards. 

**Randomly Distributed Mines:** This proved to be quite rudimentary, dear Watson. We build a flat, 1D list of (i,j) indicies while initializing the grid in the previous step. From this list, we can choose a random set of tiles to place bombs, while maintaining control over the number of bombs placed.
```
const bombs = indicies.sort((a, b) => 0.5 - Math.random()).slice(0,MINE_COUNT)
for (const [i, j] of bombs) {
    // @ts-ignore
    const td = tiles[COLUMNS * i + j].isBomb = true
}
```
This first randomizes the original list of indicies, and slices it down to just the first n elements, where n is the total number of mines. These random sets are then stepped through to set .isBomb = true for each affected tile.

**Nearby Mine Counts:** I take a similar brute force approach to counting mines as I did to placing them. I for loop through all tiles, and if it's a bomb, it's -1, otherwise it's the count of all valid neighbors where .isBomb = true.
```
for (const tile of tiles) {
    const { isBomb, tileI: i, tileJ: j } = tile
    const nearby = isBomb ? -1 : countNearby(i, j)
    tile.nearby = nearby
}
```

With both the mine placement and mine count algorithms in place, we finally have a working game board!

![Random Dist With Nearby Counts](/public/random-dist-with-nearby-counts.png)

*First successfull game board*

**Point and Click Controls:** So far, the point and click controls are limited to remove the gray tile from the grid square, and reveal the number, mine, or blank square underneath. There's no feedback yet, nor is there support for right click to set flag. One big accomplishment was the implementation of a recursive flood reveal algorithm to reveal more than just one tile per click. The flood reveal algo works as follows:

0. Get the tile using the current i and j indicies
1. Quit if out of bounds, already revealed, or if it's a mine
2. Reveal the tile
3. Quit if it's not a blank tile
4. Recurse for all valid neighbors (all nearby, in-bounds cells)

The addition of this recursive reveal function makes for a **huge** leap in how finished the game feels. It was actually the finishing piece to being able to play a full game, although not being able to place flags made it unnecessarily challenging, so that's definitely a priority for the next sprint!

In the simplest case, a user clicks on one blank square, and all neighboring numbers are revealed.

![Flood Reveal](/public/flood-reveal.png)

*Flood reveal example.*

### 05/02/25

Today was all about collecting assets. The 1-7 images, the red and gray bomb and flag images, and the unknown and blank tile screenshots. The css is set up so that the tile height and width can be set in a single td.tile selector, and the images will auto scale according to the td.tile selector height and width. You may also note that there are gray and red 

![minesweeper assets collected as of 05-02-2025](/public/asset-test-grid.png)

*Assets collected thus far.*

Each asset screenshot starts at the top left corner, and only includes the top and left dark gray borders. Assorting these images in a grid naturally fill in the inside borders, but the outside borders are broken with just the screenshots. Not to fear, this is an easy fix. I just wrapped the entire grid in a grid-wrapper class, with a bottom and right padding of _x_ pixels. This _x_ pixel padding value has to be manually set to get the bottom and right borders to match the inside borders.

![exploded](/public/123-exploded.png) ![no border](/public/123-no-border.png) ![finished](/public/123-finished.png)

*Tile assortment and grid padding for inside and outside borders.*

As shown here from left to right, you can see in the exploded view how each tile contains the top and right left borders, and how combining them (pictured center) creates the inside borders, but looks weird on the bottom and right edges. This is solved in the third, rightmost image with the a div wrapped around the table with the same background and bottom/right padding as the border width from the tile images. Et Viola! Easy breezy tiles, without messing with any crazy border offsets or pixel calculations. It just works.