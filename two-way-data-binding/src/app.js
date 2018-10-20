(function(_, gretting) {
  /* You don't know jquery! */
  //https://blog.garstasio.com/you-dont-need-jquery/
  console.log(gretting+" World!");
  console.log(_)
  var elements = document.querySelectorAll('[data-tw-bind]')
  console.log(typeof elements);
  //console.log(Array.prototype.slice.call(elements));
  var scope= {};
  
  elements.forEach(function(element, index) {
    console.group("Element "+index+" type: "+element.type)
    console.dir(element)
    //execute scope setter
    if(element.type === 'text'|| element.type === 'textarea'){
        var propToBind = element.getAttribute('data-tw-bind');
        console.log(propToBind)
        addScopeProp(propToBind);
        element.onkeyup = function(){
            scope[propToBind] = element.value;
        };
    };

    //bind prop to elements
    function addScopeProp(prop){
      //add property if needed
      if(!scope.hasOwnProperty(prop)){
        //value to populate with newvalue
        var value;
        Object.defineProperty(
          scope
          , prop
          , {
            set: function (newValue) {
              value = newValue;
              elements.forEach(function(element){
                //change value to binded elements
                if(element.getAttribute('data-tw-bind') === prop){
                  if(element.type && (element.type === 'text' || element.type === 'textarea')){
                    element.value = newValue;
                  } else if(!element.type){
                    element.innerHTML = newValue;
                  }
                }
              });
            }
            , get: function(){
              return value;
            }
            , enumerable: true
          }
        );
      }
    }
    console.groupEnd()
  });

  log = function() {
      Object.keys(scope).forEach(function(key){
          console.log(key + ': ' + scope[key]);
      });
  }

  _.changeNameByCode = function() {
      scope.name = 'change the name\'s value programatically';
  }

  changeSurnameByCode = function() {
      scope.surname = 'change the suername\'s value programatically';
  }
})(window,"hello");
