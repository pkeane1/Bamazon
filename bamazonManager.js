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


function viewProducts(){
    var query = "select * FROM products";
    connection.query(query, function(err, res) {
        if (err) throw err;

        for(var i = 0;i < res.length;i++) {
        console.log("ID " +res[i].item_ID + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "QTY: " + res[i].stock_quanity);
        console.log("-----------------------------------------------------------------------------")
        
        }
    });
}


function viewInventory(){
    console.log("-----Low Inventory-----");
    connection.query('SELECT * FROM Products', function(err, res){
        if(err) throw err;

        for(var i = 0; i<res.length;i++){
            if(res[i].stock_quanity <= 5){

}