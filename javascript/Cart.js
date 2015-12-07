var beerList = new Array(0);
var total = 0;
var tempID = new Array(0);
var tempPrice = new Array(0);
var tempName;

var nameList = new Array(0);
var priceList = new Array(0);
var idList = new Array(0);
var actionListID =new Array(0);
var actionListPrice = new Array(0);
var actionListName = new Array(0);

var dragList1 = ["Black Tower", "Brooklyn", "Chilcas", "Dr L", "Hoegaarden", "Paulaner"];
var dragList2 = [35, 25, 50, 85, 20, 25];

// var orderList = new Array(0);
// var orderPoint = 0;
// var unredo = false;

function Order(action, id, price)
{
	this.action = action;
	this.id = id;
	this.price = price;
}

function addProduct(id, price, dragOn) 
{
	var flag = 0;
	var index = 0;
	var name;
	var order1 = new Order('add', id, price); 
	// alert(typeof name);
	// alert(typeof price);
	// alert(typeof Number(name));
	for( var i = 0; i<beerList.length;i++ )
	{
		if (id == beerList[i]) 
		{
		          	flag=1;
		 	index = i;
		}
	}

	if(flag == 1)
	{	
	var numVal = document.getElementById("cartcontent").rows[beerList.length-index].cells[1].innerHTML;
	var priceVal = document.getElementById("cartcontent").rows[beerList.length-index].cells[2].innerHTML;
		var numVal1 = Number(numVal);
		var priceVal1= Number(priceVal);
		numVal1++;
		priceVal1=priceVal1+price;
	document.getElementById("cartcontent").rows[beerList.length-index].cells[1].innerHTML = numVal1;
	document.getElementById("cartcontent").rows[beerList.length-index].cells[2].innerHTML = priceVal1;
	}

	else
	{
	    	var table = document.getElementById("cartcontent");
	    	var row = table.insertRow(1);
	    	var cell1 = row.insertCell(0);
	    	var cell2 = row.insertCell(1);
	    	var cell3 = row.insertCell(2);
	    	if(dragOn == 0)
	    	{
			for( var i = 0; i<idList.length;i++ )
			{
				if (id == idList[i]) 
				{
				          name = nameList[i];
				}
			}
			cell1.innerHTML = name;
	    	}
		else
		{
			cell1.innerHTML = id;
			// if( unredo == false )
			// {
			// orderList.push(order1);
			// orderPoint++;
			// 	unredo = false;
			// }
		}
	 	
	    	cell2.innerHTML = 1;
	    	cell3.innerHTML = price;
	    	beerList.push(id);
			actionListID.push(id);
		actionListPrice.push(price);
	}
	//actionListID.append(id);
	//actionListPrice.append(price);
	total+=Number(price);
	document.getElementById("totalPrice").innerHTML="Total: $"+total;
}

function deleteProduct(id, price) 
{
	// var order1 = new Order('delete', id, price); 

	for( var i = 0; i<beerList.length;i++ )
	{
		if (id == beerList[i])
		{
		var numVal = document.getElementById("cartcontent").rows[beerList.length-i].cells[1].innerHTML;
		var priceVal = document.getElementById("cartcontent").rows[beerList.length-i].cells[2].innerHTML;
      			var numVal1 = Number(numVal);
      			var priceVal1= Number(priceVal);
			if(numVal1>1)
			{
		      		numVal1--;
		      		priceVal1=priceVal1-price;
			document.getElementById("cartcontent").rows[beerList.length-i].cells[1].innerHTML = numVal1;
		          	document.getElementById("cartcontent").rows[beerList.length-i].cells[2].innerHTML = priceVal1;
				total-=Number(price);
			document.getElementById("totalPrice").innerHTML="Total: $"+total;
				break;
			}
			else
			{
          				document.getElementById("cartcontent").deleteRow(beerList.length-i);
          				beerList.splice(i, 1);
          				total-=Number(price);
				document.getElementById("totalPrice").innerHTML="Total: $"+total;
          				break;
			}
		}
	}
	// if(dragOn == 1)
	// {
	// 		orderList.push(order1);
	// 		orderPoint++;
	// }		
}

function allowDrop(ev) 
{
    ev.preventDefault();
}

function drag(ev) 
{
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) 
{
    ev.preventDefault();
 
    var data = ev.dataTransfer.getData("text");
    // alert(data);
    var n = Number(data[4]);

    addProduct(dragList1[n-1], dragList2[n-1], 1);
    // ev.target.appendChild(document.getElementById(data));
 
}

function makeList(name, price, id )
{
	nameList.push(name);
	priceList.push(price);
	idList.push(id);
	// alert(name);
}

 function undo()
 {
console.log("undo pressed");
console.log(actionListID.length)
 	// var price;
 	if( actionListID.length >0 )
 	{
 		tempID.push(actionListID[actionListID.length-1]);
		console.log(tempID);
 		tempPrice.push(actionListPrice[actionListPrice.length-1]);
 		deleteProduct(actionListID[actionListID.length -1], actionListPrice[actionListPrice.length-1]);
		actionListID.splice(actionListID.length-1, 1);
		actionListPrice.splice(actionListPrice.length-1, 1);

 	}
	
 }

 function redo()
 {
	 console.log("redo pressed");

	 if(tempID.length >0){

		 addProduct(tempID[0],tempPrice[0] , 1);
		 tempID.splice(0,1);
		 tempPrice.splice(0,1);

	 }

 }