const createAutoComplete = ({root,renderOption,onOptionSelect,inputValue,fetchData})=>{

   
    root.innerHTML= `
    <label><b>Search <b></label>
    <input class= "input" />
    <div class="dropdown">
    <div class="dropdown-menu">
    <div class ="dropdwon-content results"></div>
    </div>
    </div>
    `
    
    //selecting the input 
     const input = root.querySelector('input');
     const dropdown = root.querySelector('.dropdown');
     const resultsWrapper = root.querySelector('.results');
     
    //now after using debounce function on onInput we have a version of onInput that can only be 
    //invoked if there is no keypress for sometime
    
    const onInput = async (event)=>{
      const items = await  fetchData(event.target.value);
    
      if(!items.length){
          dropdown.classList.remove('is-active');
      }
      //if we dont use async await keywords here ..there will be a problem because the fetchData function is a
      //async functiona as we have defined and it takes timeto process the info and pass it to us
      //so we need to await it here,and since we have awaited it we need to mark the whole function as an async function
      //if we dont do this then we only get a promise returned which is pending as the fetchData function is 
      //a async function
    
      //before searching again...clearing the previous results
      resultsWrapper.innerHTML = '';
     dropdown.classList.add('is-active');
      //CREATING THE RESULTS DISPLAY
      for(let item of items){
          const option = document.createElement('a');
         
          option.classList.add('dropdown-item');
          option.innerHTML = renderOption(item);
          //on clicking a single movie setting the value of the input
          //to the clicked movie and making a follow up request
          option.addEventListener('click',()=>{
              dropdown.classList.remove('is-active');
              input.value = inputValue(item);
              //calling the onMOvieSelect Function that returns details of the movie 
              //that was clicked
             onOptionSelect(item);
          })
          resultsWrapper.appendChild(option);
      }
    
    };
    
     input.addEventListener('input',debounce(onInput,1000));
    
     document.addEventListener('click',(event)=>{
         if(!root.contains(event.target)){
             dropdown.classList.remove('is-active');
         }
     });   


};