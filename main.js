 

 let elList = document.querySelector(".js-list"); 
 

  


 for (var item of pokemons) {
     
    var newItem = document.createElement("li");
    var newName = document.createElement("h3"); 
    var newIdy = document.createElement("span"); 
    var newImg = document.createElement("img");
    var newNum = document.createElement("span"); 
    var newType = document.createElement("p"); 

    newName.textContent = item.name; 
    newIdy.textContent = item.id;
    newImg.src = item.img;
    newType.textContent = item.type;
    newNum.textContent = item.num;
     

     
    newItem.classList.add("item");
    newName.classList.add("item-name");
    newIdy.classList.add("itim-id");
    newImg.classList.add("item-img");
    newNum.classList.add("item-num");
    newType.classList.add("item-type");
     

   newItem.append(newName, newIdy, newImg, newType, newNum);
   elList.appendChild(newItem);
   


 }




