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
                console.log("ID " +res[i].item_ID + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "QTY: " + res[i].stock_quanity);
                console.log("-----------------------------------------------------------------------------")
            };
        };

    });
};


function addInventory(){
    console.log('>>>>>>Adding to Inventory<<<<<<');
  
    connection.query('SELECT * FROM Products', function(err, res){
    if(err) throw err;
    var itemArray = [];
    //pushes each item into an itemArray
    for(var i=0; i<res.length; i++){
      itemArray.push(res[i].product_name);
    }
  
    inquirer.prompt([{
      type: "list",
      name: "product",
      choices: itemArray,
      message: "Which item would you like to add inventory?"
    }, {
      type: "input",
      name: "qty",
      message: "How much would you like to add?",
      validate: function(value){
        if(isNaN(value) === false){return true;}
        else{return false;}
      }
      }]).then(function(ans){
        var currentQty;
        for(var i=0; i<res.length; i++){
          if(res[i].product_name === ans.product){
            currentQty = res[i].stock_quanity;
          }
        }
        connection.query('UPDATE Products SET ? WHERE ?', [
          {stock_quanity: currentQty + parseInt(ans.qty)},
          {product_name: ans.product}
          ], function(err, res){
            if(err) throw err;
            console.log('The quantity was updated.');
            list();
          });
        })
    });
  }
  
  //allows manager to add a completely new product to store
  function newProduct(){
    inquirer
    .prompt([
      {
        type: "input",
        name: "product_name",
        message: "Enter the name of product to add??"
      },
      {
        type: "input",
        name: "department_name",
        message: "Enter the department of product to add??"
      },
      {
        type: "input",
        name: "price",
        message: "Enter the price of product to add??"
      },
      {
        type: "input",
        name: "stock_quantity",
        message: "Enter the quantity of product to add??"
      }
    ])
    .then(function(answer) {
      if (isNaN(answer.price) || isNaN(answer.stock_quanity)) {
        console.log("Invalid Input");
        if (isNaN(answer.price)) console.log("Invalid Price");
        if (isNaN(answer.stock_quanity)) console.log("Invalid Quantity");
        list();
      } else {
        var newrow = {
          product_name: answer.product_name,
          department_name: answer.department_name,
          price: answer.price,
          stock_quanity: answer.stock_quanity
        };
        var sql = "insert into products set ?";
        connection.query(sql, newrow, function(err, res) {
          if (err) throw err;
          list();
        });
      }
    });
}
    
  list();























