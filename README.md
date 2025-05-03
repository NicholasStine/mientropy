# Mientropy
### A minesweeper clone where I can explore using entropy and probability to solve minesweeper!


## Goals
Most of what I'm doing has been inspired by [this online clone of minesweeper](https://minesweeper.online/), and [this paper on using entropy to calculate the likelihood of mine locations, written by Mike Sheppard](https://minesweepergame.com/math/a-simple-minesweeper-algorithm-2023.pdf).


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
05/02/25
Today was all about collecting assets. The 1-7 images, the red and gray bomb and flag images, and the unknown and blank tile screenshots. The css is set up so that the tile height and width can be set in a single td.tile selector, and the images will auto scale according to the td.tile selector height and width.

*Assets collected thus far*

![minesweeper assets collected as of 05-02-2025](/public/asset-test-grid.png)

Each asset screenshot starts at the top left corner, and only includes the top and left dark gray borders. Assorting these images in a grid naturally fill in the inside borders, but the outside borders are broken with just the screenshots. Not to fear, this is an easy fix. I just wrapped the entire grid in a grid-wrapper class, with a bottom and right padding of _x_ pixels. This _x_ pixel padding value has to be manually set to get the bottom and right borders to match the inside borders.

As shown below from left to right, you can see in the exploded view how each tile contains the top and right left borders, and how combining them (pictured center) creates the inside borders, but looks weird on the bottom and right edges. This is solved in the third, rightmost image with the a div wrapped around the table with the same background and bottom/right padding as the border width from the tile images. Et Viola! Easy breezy tiles, without messing with any crazy border offsets or pixel calculations. It just works.

*Tile assortment and grid padding for inside and outside borders.*

![](/public/123-exploded.png) ![](/public/123-no-border.png) ![](/public/123-finished.png)