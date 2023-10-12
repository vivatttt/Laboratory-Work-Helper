# laboratory-work-helper
<p align="center">
      <img src="https://i.ibb.co/D8fyVMJ/image.png" width="170">
</p>

<p align="center">
   <img src="https://img.shields.io/badge/html-purple" alt="language">
   <img src="https://img.shields.io/badge/js-yellow" alt="language">
   <img src="https://img.shields.io/badge/css-blue" alt="language">
      
</p>

## About
This program is created in order to make life easier for students. It solves template laboratory work in physics - when you receive certain values (for given values) during the experiment, process them somehow and construct a graph in order to define a dependence betwwen given and received values
### Start page <br>
<p align="">
      <img src="https://i.ibb.co/x3brVQd/image.png" alt = "start page" width="1200">
</p>

### After processing the information <br>
<p align="">
      <img src="https://i.ibb.co/XZTnRm4/image.png", alt = "main interface", width="1200">
</p>

### Example of input data and outcome <br>

<p align="">
      <img src="https://i.ibb.co/s98kt8q/image.png" alt="example of outcome" width="900">
</p>
<p align="">
      <img src="https://i.ibb.co/WvYmvPJ/image.png" alt="example of outcome" width="900">
</p>
<p align="">
      <img src="https://i.ibb.co/fSJ1t1F/image.png" alt="example of outcome" width="900">
</p>

## Manual
First of all, you need to understand that this program does not have a large range of settings and solves only a clearly defined task:
>To obtain experimentally any values (for already set data), process them according to the formula and determine the dependence (plot) of the obtained value from the initially set one.
For example, for initially specified time intervals (5, 10, 15, 20 seconds), you experimentally find the path traveled by the body (3.12, 7, 12.901, 15.8 meters), substitute it into the velocity formula (you can also use constants) and plot (by points) how the velocity changed for different time intervals

Since the program uses the library Math.JS , you can enter a formula of any ([almost](https://mathjs.org/docs/expressions/parsing.html)) kind.

So let's start in order - 
1. Enter constants if it is necessary.
2. Enter values, that given in your task. You can do it as sequence as **1 2 3 4** or a range as **[1, 4, 1]** ([start, finish, step]).
3. Enter values, that you received during the experiment.
4. Enter your formula. In that field you can use any variable, that you entered before. It is necessary to enter at least one variable (Given or Experimental value).

The number of rows and columns of the table will be generated automatically, according to the entered data, points will be plotted on the graph, which will help (approximately) determine the dependence between the given values and the values obtained after processing.

## Documentation

## Libraries
First and the only library, that used in that project is [Math.Js](https://mathjs.org/)
You can also connect it to your project by adding the string below into your *head* tag in html.
```java script
<script src=https://cdnjs.cloudflare.com/ajax/libs/mathjs/3.3.0/math.min.js></script>
```

#### Methods

