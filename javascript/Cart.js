var beerList = new Array(0);
var total = 0;

function addProduct(name, price) 
{
	var flag = 0;
	var index = 0;
	for( var i = 0; i<beerList.length;i++ )
	{
		if (name == beerList[i]) 
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
		priceVal1=priceVal1+5;
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
	    	cell1.innerHTML = "Beer"+name;
	    	cell2.innerHTML = 1;
	    	cell3.innerHTML = price;
	    	beerList.push(name);
	}
				
	total+=Number(price);
	document.getElementById("totalPrice").innerHTML="Total: $"+total;
}

function deleteProduct(name, price) 
{
	for( var i = 0; i<beerList.length;i++ )
	{
		if (name == beerList[i])
		{
		var numVal = document.getElementById("cartcontent").rows[beerList.length-i].cells[1].innerHTML;
		var priceVal = document.getElementById("cartcontent").rows[beerList.length-i].cells[2].innerHTML;
      			var numVal1 = Number(numVal);
      			var priceVal1= Number(priceVal);
			if(numVal1>1)
			{
		      		numVal1--;
		      		priceVal1=priceVal1-5;
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

    var name = Number(data[4]);
    addProduct(name, 5);
    // ev.target.appendChild(document.getElementById(data));
 
}