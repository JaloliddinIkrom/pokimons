 

 const elList = document.querySelector(".js-list"); 
 const elTemple = document.querySelector(".js-templet").content;
 const elFragment = document.createDocumentFragment();
  


 for (let item of pokemons) {
     
    let newItem = elTemple.cloneNode(true);
    
    newItem.querySelector(".item-title").textContent = item.name;
    newItem.querySelector(".itim-nambr").textContent = item.id;
    newItem.querySelector(".item-img").src = item.img;
    newItem.querySelector(".item-img").alt = item.name;
    newItem.querySelector(".item-text").textContent = item.type;
    newItem.querySelector(".item-typ").textContent = item.num;

    
   
   elFragment.appendChild(newItem);
   
 } 
 
 elList.appendChild(elFragment);





