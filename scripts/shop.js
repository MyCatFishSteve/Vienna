'use strict';
/* Item List stores the names of all products on this page
 * 0 : Kerbal Space Program
 * 1 : Dead by Daylight
 * 2 : Friday the Thirteenth
 * 3 : Breath of the Wild
 */
var ItemList = []


/* ItemQuantity stores information about the current basket
 * "Kerbal Space Program"  : 5
 * "Dead by Daylight"      : 2
 * "Friday the Thirteenth" : 1
 * "Breath of the Wild"    : 0
 */
var ItemQuantity = []


/* Item Cost stores information about the product cost
 * "Kerbal Space Program"  : 29.99
 * "Dead by Daylight"      : 14.99
 * "Friday the Thirteenth" : 19.99
 * "Breath of the Wild"    : 59.99
 */
var ItemCost = []

var messagebox;

function PrintBasketToConsole() {
    // Loop through all found products and get their array data
    for(let i = 0; i < ItemList.length; i++) {
        let currentItemName = ItemList[i];
        let currentItemCost = ItemCost[currentItemName];
        let currentItemQuan = ItemQuantity[currentItemName];
        console.log("Item Name: " + currentItemName
                    + "\nItem Cost: " + currentItemCost
                    + "\nItem Quantity: " + currentItemQuan
                    + "\nItem Total: " + currentItemCost * currentItemQuan);
    }
}

function DisplayBasket() {
    var total = 0;
    messagebox.innerHTML = "";
    for(let i = 0; i < ItemList.length; i++) {
        let currentItemName = ItemList[i];
        let currentItemCost = ItemCost[currentItemName];
        let currentItemQuan = ItemQuantity[currentItemName];
        if(currentItemQuan > 0) {
            messagebox.innerHTML += "<h3>" + currentItemName + "</h3>";
            messagebox.innerHTML += "<p>Cost: £" + currentItemCost + "</p>";
            messagebox.innerHTML += "<p>Quantity: " + currentItemQuan + "</p>";
            messagebox.innerHTML += "<p>Sub-total: £" + Math.round((currentItemCost * currentItemQuan) * 100) / 100 + "</p>";
            total += currentItemCost * currentItemQuan;
        }
    }
    if(total === 0) {
        DisplayHelpMessage();
    } else {
        messagebox.innerHTML += "<h1>Total: £" + Math.round(total * 100) / 100 + "</h1>";
    }
}

function DisplayHelpMessage() {
    messagebox.innerHTML = "";
    if(Cookies.get("username") != undefined) {
        messagebox.innerHTML += "<h3>Welcome back, " + Cookies.get("username");
    }
    messagebox.innerHTML += "<h3>Left click to add item to your cart</h3>"
                         + "<h3>Right click to remove items from your cart</h3>";
}

$(document).ready(() => {
    // Get all product listings on the page
    let products = $(".product-listing");

    messagebox = $("#messagebox")[0];

    // Loop through all the products found
    for(var i = 0; i < products.length; i++) {

        // Set some easy access variables
        let productName = $(products[i]).attr("productname");
        let productCost = $(products[i]).attr("productcost");

        // Populate array with default values
        ItemList[i] = productName;
        ItemQuantity[productName] = 0;
        ItemCost[productName] = productCost;

        // Add event listeners to all products
        $(products[i]).on("click", (event) => {
            ItemQuantity[productName] += 1;
            DisplayBasket();
        });
        $(products[i]).on("contextmenu", (event) => {
            if(ItemQuantity[productName] > 0) {
                ItemQuantity[productName] -= 1;
                DisplayBasket();
            }
            return false;
        })
    }
    DisplayHelpMessage();
});
