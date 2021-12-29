window.onload = function () {
    console.log("window onload...");
    
    let window_size =  window.innerWidth;
    let burger_element = document.getElementById("burger");
    let menu = document.getElementById("menu");

    /** @type {boolean} */
    let burger_flag = false;
    /** @param {boolean} flag */
    function update_burger(flag){
        if (flag){
            menu.style.display = "flex"
        }else{
            menu.style.display = "none"
        }
        burger_flag = flag;
    }
    
    burger_element.onclick = function(){
        //console.log("clic");
        let new_flag = !burger_flag;
        update_burger(new_flag)
    }

    window.onresize = function(){
        //console.log("new size",window.innerWidth);
        let new_size = window.innerWidth;
        if (window_size <= 576 && new_size > 576)
        {
            update_burger(true);
            //console.log("burger -> large")
        }
        else if(window_size >= 576 && new_size < 576)
        {
            update_burger(false);
            //console.log("large -> burger")
        }
        window_size = new_size;
    }
  }