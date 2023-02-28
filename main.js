 
 const elForm = document.querySelector(".js-form");
 const elInp = document.querySelector(".js-name"); 
 const elSelcetWeak = document.querySelector(".js-select-weaknesses");
 const elInpTypes = document.querySelector(".js-types"); 
 const elInpWeightMin = document.querySelector(".js-poke-weight-min");
 const elInpWeightMax = document.querySelector(".js-poke-weight-max"); 
 const elSelectWeight = document.querySelector(".js-selct-weight");
 const elList = document.querySelector(".js-list");
 const sortName = document.querySelector(".js-name-sort");  
 const bookMarkList = document.querySelector(".bookmarl-list");

  

  //--------Pocemonsni aylanamiz weaknesses nomli arryni ham aylanib bo'sh arryga push qilib olamiz-----------// 

  const arryWeaknesses = []; 
  
  //---------------Bookmark arry---------------
  const bookArry = [];

   function renderWeak(){ 

       pokemons.forEach(item => { 

        item.weaknesses.forEach(text => { 

            if(!arryWeaknesses.includes(text)){ 

              arryWeaknesses.push(text);

            }
        });

       }); 
       
       arryWeaknesses.sort() 
   };
//------Arryga yig'lgan elementlarni selktga joylashtrdik------------------------------------------------/////

   function renderArryWeaknesses(){ 
     
    const weakFragment = document.createDocumentFragment();

    arryWeaknesses.forEach(item => { 

       const weakOption = document.createElement("option");
       weakOption.textContent = item;
       weakOption.value = item; 

       weakFragment.appendChild(weakOption);
    }); 

    elSelcetWeak.appendChild(weakFragment);
   };
// -----------------------------------------------------------------------------------------------------------// 
   
    function sortPocemon(arry, sortPoce){ 


    //-----------------------------------sort wight-----------------------------------------------------------/// 

        if(sortPoce == "fat-thin"){ 


        arry.sort((d, c) =>{ 

      const eld = d.weight.toUpperCase();
      const elc = c.weight.toUpperCase();

     if(eld > elc){ 

      return 1;
     }else if(eld < elc){ 

      return -1;
     }else{ 

      return 0;
     }

           });


        } 

        if(sortPoce == "thin-fat"){ 

       arry.sort((t, g) => { 

    const elt = t.weight.toUpperCase();
    const elg = g.weight.toUpperCase();

    if(elt < elg){ 

      return 1;
    }else if(elt > elg){ 

      return -1;
    }else{ 

      return 0;
    }

  });

         };
       
  //----------------------------------------sort name start----------------------------------------------------//

          
         if(sortPoce == "Aa-Zz"){ 
      
          arry.sort((a, b) =>{ 
     
       const nameA = a.name.toUpperCase();
       const nameB = b.name.toUpperCase();
           
       if(nameA > nameB){ 

         return 1;
       }else if(nameA < nameB){ 
    
         return -1;
       }else{ 

        return 0;
       }

      });

         }  
         if(sortPoce == "Zz-Aa"){ 

        arry.sort((x, l) =>{ 

          const nameX = x.name.toUpperCase();
          const nameL = l.name.toUpperCase();

          if(nameX > nameL){ 

            return -1;
          }else if(nameX < nameL){ 

            return 1;
          }else{ 

            return 0;
          }

        });
     
         };
    };

  //--------------------------------render pocemons start-----------------------------------------------------//
   const renderPoce = function(poke, regex = ""){  

    const elTemple = document.querySelector(".js-templet").content;
    const elFragment = document.createDocumentFragment();

     elList.innerHTML = "";

      poke.forEach(item =>{
     
        let newItem = elTemple.cloneNode(true); 

       if(regex.source != "(?:)" && regex){ 

    newItem.querySelector(".item-title").innerHTML = item.name.replace(regex, `<mark class="text-bg-warning rounded-2">${ 
           
      regex.source.toLowerCase()

    }</mark>`);  

       }else{ 

    newItem.querySelector(".item-title").textContent = item.name; 
  }
  
  newItem.querySelector(".itim-nambr").textContent = item.id;
  newItem.querySelector(".item-img").src = item.img;
  newItem.querySelector(".item-img").alt = item.name;
  newItem.querySelector(".item-text").textContent = item.weight;
  newItem.querySelector(".item-candy_count").textContent = item.candy_count;
  newItem.querySelector(".item-weaknesses").textContent = item.weaknesses.join(", ");
  newItem.querySelector(".item-star").dataset.bookmarkId = item.name; 

  elFragment.appendChild(newItem);
 
      });

      elList.appendChild(elFragment); 
   };  


  //-------------------------------- reder addBokmark star--------------------------------------------------// 

   const renderBokmark = function(bookmark, node){  

    const elTemple = document.querySelector(".js-templet").content;
    const elFragment = document.createDocumentFragment();

     bookMarkList.innerHTML = "";

      bookmark.forEach((item, index) =>{
     
        let newItem = elTemple.cloneNode(true); 

       
  newItem.querySelector(".item-title").textContent = item.name; 
  newItem.querySelector(".itim-nambr").textContent = item.id;
  newItem.querySelector(".item-img").src = item.img;
  newItem.querySelector(".item-img").alt = item.name;
  newItem.querySelector(".item-text").textContent = item.weight;
  newItem.querySelector(".item-candy_count").textContent = item.candy_count;
  newItem.querySelector(".item-weaknesses").textContent = item.weaknesses.join(", ");    
  newItem.querySelector(".temp-butten-dalet").dataset.bookmarkId = index; 
  newItem.querySelector(".item-star").classList.add("d-none");    
  newItem.querySelector(".temp-butten-dalet").classList.remove("d-none");   

  elFragment.appendChild(newItem);
 
      });

      node.appendChild(elFragment); 
   }; 

                                        // Event Delegation

  //--------------------------------elList addEventListener star---------------------------------------------//

    elList.addEventListener("click", function(evt){ 

         if(evt.target.matches(".item-star")){ 

            const bookId = evt.target.dataset.bookmarkId;
            
            const addBookmark = pokemons.find(item => item.name === bookId);

              if(!bookArry.includes(addBookmark)){ 
                 
                   bookArry.push(addBookmark);

                   renderBokmark(bookArry, bookMarkList);
              }
             
         } 
         

    }); 
    //-----------------------------------bookmar list addEventListener-------------------------------------// 
    bookMarkList.addEventListener("click", function(evt){  

      if(evt.target.matches(".temp-butten-dalet")){ 
        
        const evtBookmark = evt.target.dataset.bookmarkId;

        bookArry.splice(evtBookmark, 1); 

        renderBokmark(bookArry, bookMarkList); 

      }
    });
    
  // ------------------------------Forim addEventListener start-------------------------------------------------//

    elForm.addEventListener("submit", function(evt){ 
  
  evt.preventDefault();

    //-------------------------------------filter name stert--------------------
     
    const inpNameValue = elInp.value.trim();

    const regexName = new RegExp(inpNameValue, "gi");
 
       const nameFiltir = pokemons.filter(item => { 
 
           const nameRegex =  String(item.name).match(regexName) && (elSelcetWeak.value == "all" || item.weaknesses.includes(elSelcetWeak.value)) && (elInpWeightMin.value == "" || item.candy_count >= elInpWeightMin.value) &&  (elInpWeightMax.value == "" || item.candy_count <= elInpWeightMax.value);
             
         
           return nameRegex;
       }); 
 
       if(nameFiltir.length > 0){ 
         
        sortPocemon(nameFiltir, sortName.value);
         renderPoce(nameFiltir, regexName);
       
       }else{ 
 
         elList.innerHTML = "Movie not fount"
       };
    
    }); 

        
        renderWeak(); 
        renderArryWeaknesses();
        renderPoce(pokemons); 
        