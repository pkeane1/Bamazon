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


function list(){
    inquirer.prompt([{
      type: "list",
      name: "startprompt",
      message: "What would you like to do?",
      choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product",]
    }]).then(function(ans){
        switch(ans.startprompt){
            case "View Products for Sale": viewProducts()
            break;
            case "View Low Inventory": viewInventory()
            break;
            case  "Add to Inventory": addInventory()
            break;
            case "Add New Product": newProduct()
            break;
        };
    });
};
list()
