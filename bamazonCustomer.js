var mysql = require('mysql');
var inquirer = require("inquirer");


var connection = mysql.createConnection({
	host:"localhost",
	port:3306,
	user:"root",
	password:"",
	database:"bamazon"
});

connection.connect(function(err){
	if(err)throw err;
	console.log("connected as id " + connection.threadId);
});


function displayItem(){
    var query = "select * FROM products";
    connection.query(query, function(err, res) {
        if (err) throw err;

        for(var i = 0;i < res.length;i++) {
        console.log("ID " +res[i].item_ID + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "QTY: " + res[i].stock_quanity);
        console.log("-----------------------------------------------------------------------------")
        
        }
        itemPrompt()
    });
    
}



function itemPrompt(){
    inquirer.prompt([
        {
            name: "ID",
            type: "input",
            message:"Please enter Item ID you like to purhcase.",
            filter:Number
        },
        {
            name:"Quantity",
            type:"input",
            message:"How many items do you wish to purchase?",
            filter:Number
        },
    ]).then(function(answers){
        var idInput = answers.ID;
        var quantityInput = answers.Quantity;
        checkStore(idInput,quantityInput);
});
};

function checkStore(id,quantity){
    connection.query('Select * FROM products WHERE ?',{item_ID:id}, function(err,res) {
    // connection.query("Select * FROM products WHERE item_ID = " + id, function(err, res) {
        if (err) throw err;
        // if(id !== res[0].item_ID) {
        //     console.log("Sorry, we couldnt find your item. Please search again")
        //     itemPrompt()
        // } 
        if(quantity <= res[0].stock_quanity || id !== res[0].item_ID) {
            console.log("Your items are in stock!")
            console.log("Thank you for purchasing! your total is: " + res[0].price * quantity)
            
            updatedStock = res[0].stock_quanity - quantity;
             var query = ("UPDATE products SET ? Where ?")
            connection.query(query, [{
                stock_quanity:updatedStock
            },{
                item_ID:id
            }]);
            displayItem();
            // connection.query("UPDATE products SET stock_quanity = stock_quanity - " + quantity + "WHERE item_ID = " + id);
        } else{
            console.log("Insufficient quantity! or we couldnt find your item. Check the ID! ")
            itemPrompt()
        };
})//connection.query 
}//function 


displayItem();