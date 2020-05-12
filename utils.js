
//logic to search only if the user stops for a second while typing the search input
 //at first the as the user presses a key event is generated but "timeoutId is not defined " so it will pass to
 //the next line then settimmout will run a new timeoutId is generated while the request is postponed to be run after
 //1 sec later,now if the user doesnt stop and press the key again ,,,event is generated again and this time 
 //timeoutid is defined so the if statement runs,,and clears the previous timout and then passes to the next line
 //and new timeout id is generated but now if this time the users wait befor typing the next keypress then the fetchData function runs


 //let timeoutId;
 //const onInput = (event)=>{
  //   if(timeoutId){
  //       clearTimeout(timeoutId);
  //   }
  //timeoutId =   setTimeout(()=>{
  //    fetchData(event.target.value);
 // },1000);
    
//}

//this type of functionality is called DEBOUNCING..which means waiting for some time to pass after the last event to actually 
//do something..
//Debounce helper function that gives us the same functionality..but reusable
const debounce = (func,delay= 1000)=>{
    let timeoutId
    //passing the arguments of the func function with the help of apply method ..just memoris trhe syntax
    return(...args)=>{
           if(timeoutId){
            clearTimeout(timeoutId);
           }
           timeoutId = setTimeout(() => {
              func.apply(null,args); 
           }, delay);
    };
};