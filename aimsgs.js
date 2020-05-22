 
//AI messaging strings - needs to be very large    
function AIMessaging() {
    if(reminder == false) {
    if($('.lastmsg p:contains("how are you"),.lastmsg p:contains("how you doing")').length > 0){ msgid = 1 }
    else if($('.lastmsg p:contains("your day")').length > 0){ msgid = 2 }
    else if($('.lastmsg p:contains("what are you doing")').length > 0){ msgid = 3 }
    else if($('.lastmsg p:contains("old are you"), .lastmsg p:contains("your age")').length > 0){ msgid = 4 }
    else if($('.lastmsg p:contains("your name")').length > 0){ msgid = 5 }
    else if($('.lastmsg p:contains("hey")').length > 0){ msgid = 6 }
    else if($('.lastmsg p:contains("favorite movie")').length > 0){ msgid = 7;}
    else if($('.lastmsg p:contains("whats up")').length > 0){ msgid = 8 }
    else if($('.lastmsg p:contains("chilling")').length > 0){ msgid = 9 }
    else if($('.lastmsg p:contains("thanks"),.lastmsg p:contains("thank you"),.lastmsg p:contains("thx")').length > 0){ msgid = 10 }
    else if($('.lastmsg p:contains("why")').length > 0){ msgid = 11 }
    else if($('.lastmsg p:contains("fuck"),.lastmsg p:contains("shit"),.lastmsg p:contains("asshole"),.lastmsg p:contains("bitch"),.lastmsg p:contains("cock")').length > 0){ msgid = 12 } 
    else if($('.lastmsg p:contains("nothing much")').length > 0){ msgid = 13 }
    else if($('.lastmsg p:contains("hey octacore"),.lastmsg p:contains("hi octacore")').length > 0){ msgid = 14 }
    else if($('.lastmsg p:contains("and you"),.lastmsg p:contains("im good and you")').length > 0){ msgid = 15 }
    else if($('.lastmsg p:contains("i\'m good"),.lastmsg p:contains("im good")').length > 0){ msgid = 16 }
    else if($('.lastmsg p:contains("cool")').length > 0){ msgid = 17 }
    else if($('.lastmsg p:contains("you up to")').length > 0){ msgid = 18 }
    else if($('.lastmsg p:contains("change my profile picture"),.lastmsg p:contains("change my profile image"),.lastmsg p:contains("change my profile pic"),.lastmsg p:contains("change my account picture"),.lastmsg p:contains("change my account image")').length > 0){ msgid = 19 }
    else if($('.lastmsg p:contains("wassup")').length > 0){ msgid = 20 }
    else if($('.lastmsg p:contains("very nice")').length > 0){ msgid = 21 }
    //weather queries
    else if($('.lastmsg p:contains("weather")').length > 0){ 
        if(typeof localStorage.weathercity == 'undefined' || typeof localStorage.weathercity == null) {
            if(typeof localStorage.weatherscale == 'undefined' || typeof localStorage.weatherscale == null) {
            contgen.append($('<div class="msg msgleft addweatherdiv"><img src="images/logo.png"/><p>Here\'s the weather today.</p><p class="addweather"></p></div>'));
        $('.contgen .msg:last-child .addweather').load('https://api.openweathermap.org/data/2.5/weather?q=montreal&mode=html&units=metric&appid=4a5344b7f84ba5c5c620525315413734');
        }
        else {
            contgen.append($('<div class="msg msgleft addweatherdiv"><img src="images/logo.png"/><p>Here\'s the weather today.</p><p class="addweather"></p></div>'));
        $('.contgen .msg:last-child .addweather').load('https://api.openweathermap.org/data/2.5/weather?q=montreal&mode=html&'+localStorage.weatherscale+'&appid=4a5344b7f84ba5c5c620525315413734');
        }     
        }
        else {
            if(typeof localStorage.weatherscale == 'undefined' || typeof localStorage.weatherscale == null) {
            contgen.append($('<div class="msg msgleft addweatherdiv"><img src="images/logo.png"/><p>Here\'s the weather today.</p><p class="addweather"></p></div>'));
        $('.contgen .msg:last-child .addweather').load('https://api.openweathermap.org/data/2.5/weather?q='+localStorage.weathercity+'&mode=html&appid=4a5344b7f84ba5c5c620525315413734');
        }
        else {
            contgen.append($('<div class="msg msgleft addweatherdiv"><img src="images/logo.png"/><p>Here\'s the weather today.</p><p class="addweather"></p></div>'));
        $('.contgen .msg:last-child .addweather').load('https://api.openweathermap.org/data/2.5/weather?q='+localStorage.weathercity+'&mode=html&'+localStorage.weatherscale+'&appid=4a5344b7f84ba5c5c620525315413734');
        }    
        } 
        msgid = -1;
        localStorage.chatcont = contgen;
    }  
    //time query
    else if($('.lastmsg p:contains("time is it")').length > 0){ 
        contgen.append($('<div class="msg msgleft"><img src="images/logo.png"/><p>The current time is '+displayTime(new Date)+'</p></div>'));
        msgid = -1;
    }
    //todo query
    else if($('.lastmsg p:contains("reminder"),.lastmsg p:contains("todo")').length > 0) {
        msgid = -1;
        contgen.append($('<div class="msg msgleft"><img src="images/logo.png"/><p>Hey '+localStorage.firstname+', what would you like me to add in your reminders?</p></div>'));
        reminder = true;
    }
    else if($('.lastmsg p:contains("darkmode")').length > 0) {
        msgid = -1;
        setTimeout(function() {cmdark.trigger('click')},600);
        if(darkmode.find('input').prop("checked") == true) {
            contgen.append($('<div class="msg msgleft"><img src="images/logo.png"/><p>Deactivating Darkmode...</p></div>'));
        }
        else {
            contgen.append($('<div class="msg msgleft"><img src="images/logo.png"/><p>Activating Darkmode...</p></div>'));
        }
    }  
    else if($('.lastmsg p:contains("send picture"),.lastmsg p:contains("send pic")').length > 0) {
        var randnum = (Math.floor(Math.random() * 9) + 0);
        contgen.append($('<div class="clockcont msg clockleft"><img src="images/logo.png"/><p>Enjoy this picture</p><div class="upimgleft" style="background-image:url(https:/\/picsum.photos\/100'+randnum+'\/100'+randnum+')"></div></div>'));   
        msgid = -1;
    }
    else if($('.lastmsg p:contains("alarm")').length > 0) {
        var hours = date.getHours();
        var ampm = hours >= 12 ? 'pm' : 'am';
        var addtohours ='';var addtomins='';
        if(date.getHours() >= 1 && date.getHours() <=9){addtohours='0'}
        if(date.getMinutes() <=9){addtomins='0'}
        contgen.append($('<div class="msg msgleft"><img src="images/logo.png"/><p>When would you like to me to set your alarm for? <br><input class="timepicker" type="time" value="'+addtohours+date.getHours()+':'+addtomins+date.getMinutes()+'"><small class="setalarm">Set Alarm<small></p></div>'));
        msgid = -1;      
    }    
    else if($('.lastmsg p:contains("music")').length > 0) {
        contgen.append($('<div class="msg msgleft"><img src="images/logo.png"/><p>Let me play you some music</p><audio id="gensong" controls autoplay><source src="images/mc.mp3" type="audio/mpeg"></audio></div>'));
        msgid = -1;
    }    
    //either if nonsense or not learned string
    else { 
        if(msgid == -1) {}//say nothing if asking for tools (weather,time etc)
        else if(msgid2 == 0){ //after user has said nonsense, ask what's new
            msgid = 0;
            msgid2 = 1;
        } 
        else if(msgid2 == 1){ //answer user nice thats great after answer 
            contgen.append($('<div class="msg msgleft"><img src="images/logo.png"/><p>Nice, that\'s great!</p></div>'));msgid=-1;
            setTimeout(function() {msgid2=0;msgid=0},3000);
        }
    }         
    } //if reminder = false (default)
    //if reminder is true
    else if(reminder == true) { //if user asks for reminder
        newtodo = $('.contgen').find('.lastmsg p').html();
        contgen.append($('<div class="msg msgleft"><img src="images/logo.png"/><p>Ok I\'ve just added "'+newtodo+'" in your reminders.</p></div>'));
        reminder = false;
        setremind = true;
    }
    //end of messages
    timer = 0;  
    if($('.msg').length <= 2 ){
        if(typeof localStorage.firstname == 'undefined' || typeof localStorage.firstname == null) { startmsg='Hello. '; }
        else {startmsg='Hey '+localStorage.firstname+'. ';}   
    } 
    else{startmsg='';}
    //if user hasn't set his name, send msg to update profile info
    if((typeof localStorage.firstname == 'undefined' || typeof localStorage.firstname == null) && firsttime == true) {
        contgen.append($('<div class="msg msgleft"><img src="images/logo.png"/><p>I see you haven\'t entered your name. You can update your account info in the settings above.</p></div>'));
        firsttime = false;
    }
    setTimeout(function() {
        turnid = 0;
        if(msgid != -1) {
            contgen.append($('<div class="msg msgleft"><img src="images/logo.png"/><p>'+startmsg+aimsgs[msgid]+'</p></div>'));
        }
        container.animate({scrollTop: container.prop('scrollHeight')});
        localStorage.chatcont = contgen.html();
        if(localStorage.darkmod == 1) {
            $('.msgleft p').css({'background':'#444','color':'#eee'});
        } 
    },500);       
            
}    
    

function displayTime(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

//fix :contains expression
jQuery.expr[':'].contains = function(a, i, m) {
  return jQuery(a).text().toUpperCase()
      .indexOf(m[3].toUpperCase()) >= 0;
};
 