var mysql = require("mysql");
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
        
});
}

displayItem();