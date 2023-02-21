 
 const elForm = document.querySelector(".js-form");
 const elInp = document.querySelector(".js-name"); 
 const elSelcetWeak = document.querySelector(".js-select-weaknesses");
 const elInpTypes = document.querySelector(".js-types"); 
 const elInpWeightMin = document.querySelector(".js-poke-weight-min");
 const elInpWeightMax = document.querySelector(".js-poke-weight-max"); 
 const elSelectWeight = document.querySelector(".js-selct-weight");
 const elList = document.querySelector(".js-list");
 const sortName = document.querySelector(".js-name-sort"); 
 const elTemple = document.querySelector(".js-templet").content;
 const elFragment = document.createDocumentFragment();
   

  //--------Pocemonsni aylanamiz weaknesses nomli arryni ham aylanib bo'sh arryga push qilib olamiz-// 

  const arryWeaknesses = []; 

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
//------Arryga yig'lgan elementlarni selktga joylashtrdik-------- 

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
// ------------------------------------------- 


  //--------------------------------render pocemons start---------------
   const renderPoce = function(poke){ 

     elList.innerHTML = "";

      poke.forEach(item =>{
     
  let newItem = elTemple.cloneNode(true);
  
  newItem.querySelector(".item-title").textContent = item.name;
  newItem.querySelector(".itim-nambr").textContent = item.id;
  newItem.querySelector(".item-img").src = item.img;
  newItem.querySelector(".item-img").alt = item.name;
  newItem.querySelector(".item-text").textContent = item.weight;
  newItem.querySelector(".item-candy_count").textContent = item.candy_count;
  newItem.querySelector(".item-weaknesses").textContent = item.weaknesses.join(", ");

 elFragment.appendChild(newItem);
 
         });

       elList.appendChild(elFragment); 
   };
  
  // ------------------------------Forim addEventListener start-----------

 elForm.addEventListener("submit", function(evt){ 
  
  evt.preventDefault();

   //-----------------------------------sort wight------------------ 


   const arryWeight = []; 

     if(elSelectWeight.value == "fat-thin"){ 


    const fat = pokemons.sort((d, c) =>{ 
 
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

      arryWeight .push(fat);


     } 

    if(elSelectWeight.value == "thin-fat"){ 

    const thin = pokemons.sort((t, g) => { 

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

    arryWeight.push(thin);
    };

   
    //-------------------------------------filter name stert--------------------
     
    const inpNameValue = elInp.value.trim();

    const regexName = new RegExp(inpNameValue, "gi");
 
       const nameFiltir = pokemons.filter(item => { 
 
           const nameRegex =  String(item.name).match(regexName) && (elSelcetWeak.value == "all" || item.weaknesses.includes(elSelcetWeak.value)) && (elInpWeightMin.value == "" || item.candy_count >= elInpWeightMin.value) &&  (elInpWeightMax.value == "" || item.candy_count <= elInpWeightMax.value);
             
         
           return nameRegex;
       }); 
 
       if(nameFiltir.length > 0){ 
 
         renderPoce(nameFiltir)
       }else{ 
 
         elList.innerHTML = "Movie not fount"
       };
    
  //----------------------------------------sort name start----------------------------
     const sortNameArry = [];
     
     if(sortName.value == "Aa-Zz"){ 
      
      const aName = pokemons.sort((a, b) =>{ 
     
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

      sortNameArry.push(aName);

     }  
     if(sortName.value == "Zz-Aa"){ 

        const zName = pokemons.sort((x, l) =>{ 

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
        sortNameArry.push(zName);
     };
    
    }); 

        
        renderWeak() 
        renderArryWeaknesses()
        renderPoce(pokemons); 


        // 1. name property bo'yicha search qilish. 
        // 2. weaknesses arrayini ichidagi filter.
        // 3. candy_count orqali filter qilish. min to max
        // 4. name propertysi orqali sort qilish A-Z , Z-A va weight property orqali sort qilish ya'ni ozg'indan semizga , semizdan ozg'inga.
        // 5. Style muhim, responsive bo'lishi ham shart. 
        // 6. Bookmark function bo'lishi shart.