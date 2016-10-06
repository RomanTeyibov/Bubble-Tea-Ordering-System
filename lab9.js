/*jslint
    white: true
*/
var teaField = document.getElementById("teaSelection");
var toppingField = document.getElementById("toppingsSelection");
var milkField = document.getElementById("milkSelection");
var list = document.getElementById("list");
var costOutput = document.getElementById("totalCost");
var totalPrice = 0;
var teaPrice = 0;
var toppingPrice = 0;
var milkPrice = 0;
var toppings = [];
var table = document.getElementById("order");
var orderList = [];
var orderTotalPrice = 0;
var toppingsString;

//A constructor for the drinks
function BBTDrink(teaType, toppingsList, milkOption)
{
    "use strict";
    this.teaType = teaType;
    this.toppingsList = toppingsList.slice();
    this.milkOption = milkOption;
}

//This function calculates the total cost of one drink.
function calculateCost(tea)
{
    "use strict";
    if(tea.teaType === "black")
    {
        teaPrice = 2.50;
    }
    else if(tea.teaType === "green")
    {
        teaPrice = 3.00;
    }
    else if(tea.teaType === "red")
    {
        teaPrice = 3.50;
    }
    
    if(tea.toppingsList.indexOf("Grass Jelly") !== -1)
    {
        toppingPrice += 0.50;
    }
    if(tea.toppingsList.indexOf("Pearls") !== -1)
    {
        toppingPrice += 0.50;
    }
    if(tea.toppingsList.indexOf("Coconut") !== -1)
    {
        toppingPrice += 0.75;
    }
    if(tea.toppingsList.indexOf("Mango Stars") !== -1)
    {
        toppingPrice += 1.00;
    }
    
    if(tea.milkOption === "yes")
    {
        milkPrice = 1.00;
    }
    else if(tea.milkOption === "no")
    {
        milkPrice = 0.00;
    }
    totalPrice = teaPrice + toppingPrice + milkPrice;
    toppingPrice = 0;
    return totalPrice;
}

//This function creates the order table
function drawTheTable()
{
    "use strict";
    var i;
    var j;
    var k;
    toppings = [];
    toppingsString = "";
    table.innerHTML = "<tr><th>#</th><th>Tea</th><th>Milk</th><th>Toppings</th><th>Cost</th></tr>";
    for(i = 0; i < orderList.length; i += 1)
    {
        for(k = 0; k < orderList[i].toppingsList.length; k += 1)
        {
            toppingsString += orderList[i].toppingsList[k] + " ";
        }
        table.innerHTML += "<tr><td>Drink " + (i + 1) + "</td><td>" + orderList[i].teaType + "</td>" +
            "<td>" + orderList[i].milkOption + "</td>" + "<td>" + toppingsString + "</td>" +
            "<td>$" + calculateCost(orderList[i]) + "</td></tr>";
        toppingsString = "";
    }
    for(j = 0; j < orderList.length; j += 1)
    {
        orderTotalPrice += calculateCost(orderList[j]);
    }
    table.innerHTML += "<tr><td></td><td></td><td>Total</td><td></td><td>$" + orderTotalPrice + "</td></tr>";
    orderTotalPrice = 0;
    list.innerHTML = "";
}

//This function creates a new object from BBTDrink constructor
//And pushes it to the orderList array
function newTea()
{
    "use strict";
    orderList.push(new BBTDrink(teaField.value, toppings, milkField.value));
    drawTheTable();
}

//This function removes the last drink from the orderList array
function removeTea()
{
    "use strict";
    if(orderList.length > 0)
    {
        orderList.pop();
        drawTheTable();
    }
}

//This function empties the orderList array and erases the table
function reset()
{
    "use strict";
    orderList = [];
    table.innerHTML = "";
}


//This function adds a topping if it's not in the array yet
//And displays what toppings are in the array on the screen
function addTopping()
{
    "use strict";
    var i;
    if(toppings.indexOf(toppingField.value) === -1)
    {
        toppings.push(toppingField.value);
        list.innerHTML = "";
        for(i = 0; i < toppings.length; i += 1)
        {
            list.innerHTML += "<li>" + toppings[i] + "</li>";
        }
    }
}

//This function removes the last topping
//And displays what toppings are in the array on the screen
function removeTopping()
{
    "use strict";
    var i;
    if(toppings.length > 0)
    {
        toppings.pop();
        list.innerHTML = "";
        for(i = 0; i < toppings.length; i += 1)
        {
            list.innerHTML += "<li>" + toppings[i] + "</li>";
        } 
    }   
}