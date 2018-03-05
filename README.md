# Mandatory Excercise

This is the mandatory exercise of Data Visualization Module. If you want to see the result, click here.

The files included are:

- `data.js` : a file with the data products to visualizate. Each product must contain a name, a number of sales and a color to visualizate.

- `styles.css` : a file with the styles to the page. I only add a class with the font-size, font-family and a padding for the legend.

- `index.html` : is the html file that load every file.

- `main.js` : I refactorized almost all the code to ES6, included arrow functions.

## main.js

The goals of this exercise are the following:

- **Adding space between columns** : This goal may be resoluted with many ways. I add *.padding(0.1)* function to the X scale at the *setupXScale()* function. This function add a padding between each bar.

- **Adding colors to each bar** : On the *appendChartBars()* function, I add a call for style function. This function add a style property to each bar in the chart. In this case add a fill property that add color to each bar with the color specified.

- **Adding a legend** : I created a function called *appendLegend()*. In this function, a SVG is created and moved to a specified position. Inside of this SVG, squares with a color depends of the data are posicionated and a text next to each squares that indicate the name of each product.

-  **Showing the chart vertically** : I change the parameters vertically and horizontally.

Additionally, I included an animation that show a growing bar effect with a 0.5 seconds of delay. The attributes *y* and *height* are changed after the delay to performance the animation.