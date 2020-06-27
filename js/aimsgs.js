//AI strings    
aimsgs = ["I'm sorry, i don't understand what you mean.<br>Tell me what\'s new with you?","I'm fine and you?", "It was nice, how was yours?","I'm thinking of a way to invade your planet, and you?","I was born yesterday but i'm pretty smart ;)","My name is Octacore","What's up?","I like The Terminator! What's yours?","Nothing much, you?","Cool, enjoy your chilling","You\'re welcome buddy","I have my reasons","Thats not a nice word","Cool dude","Hey man, how you doing!","I'm good, thanks for asking","That's good man","Nice","Nothing much, i'm just relaxing","Click on the image at the top right corner, then click on the big profile image in the drop down. let me know if you need more help \:)","Wazzaap!","Yeah, it is.","Yo my dude! wassup?!","Sweet!","SWEET, what does yours say?!","SAWEEEEET, DUDE PLEASE WHAT DOES YOURS SAY??!"];
//questions    
aiquest = ["So what are you doing now?","What do you do in life?","What is your favorite movie?"]; 


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
    else if($('.lastmsg p:contains("and you"),.lastmsg p:contains("im good and you"),.lastmsg p:contains("good you")').length > 0){ msgid = 15 }
    else if($('.lastmsg p:contains("i\'m good"),.lastmsg p:contains("im good")').length > 0){ msgid = 16 }
    else if($('.lastmsg p:contains("cool")').length > 0){ msgid = 17 }
    else if($('.lastmsg p:contains("you up to")').length > 0){ msgid = 18 }
    else if($('.lastmsg p:contains("change my profile picture"),.lastmsg p:contains("change my profile image"),.lastmsg p:contains("change my profile pic"),.lastmsg p:contains("change my account picture"),.lastmsg p:contains("change my account image")').length > 0){ msgid = 19 }
    else if($('.lastmsg p:contains("wassup")').length > 0){ msgid = 20 }
    else if($('.lastmsg p:contains("very nice")').length > 0){ msgid = 21 }
    else if($('.lastmsg p:contains("yo dude")').length > 0){ msgid = 22 } 
    else if($('.lastmsg p:contains("dude")').length > 0){ if(dude==0){msgid = 23;dude++}else if(dude==1) {msgid = 24;dude++}else if(dude>=2) {msgid = 25} }     
    //weather queries
    else if($('.lastmsg p:contains("weather")').length > 0){ 
        if(typeof localStorage.weathercity == 'undefined' || typeof localStorage.weathercity == null) {
            if(typeof localStorage.weatherscale == 'undefined' || typeof localStorage.weatherscale == null) {
            contgen.append($('<div class="msg msgleft addweatherdiv"><img src="images/logo.png"/><small>'+digitalclock.html()+'</small></div>'));
        $('.contgen .msg:last-child .addweather').load('https://api.openweathermap.org/data/2.5/weather?q=montreal&mode=html&units=metric&appid=4a5344b7f84ba5c5c620525315413734'); 
        }
        else {
            contgen.append($('<div class="msg msgleft addweatherdiv"><img src="images/logo.png"/><p>Here\'s the weather today.</p><p class="addweather"></p><small>'+digitalclock.html()+'</small></div>'));
        $('.contgen .msg:last-child .addweather').load('https://api.openweathermap.org/data/2.5/weather?q=montreal&mode=html&'+localStorage.weatherscale+'&appid=4a5344b7f84ba5c5c620525315413734');
        }     
        }
        else {
            if(typeof localStorage.weatherscale == 'undefined' || typeof localStorage.weatherscale == null) {
            contgen.append($('<div class="msg msgleft addweatherdiv"><img src="images/logo.png"/><p>Here\'s the weather today.</p><p class="addweather"></p><small>'+digitalclock.html()+'</small></div>'));
        $('.contgen .msg:last-child .addweather').load('https://api.openweathermap.org/data/2.5/weather?q='+localStorage.weathercity+'&mode=html&appid=4a5344b7f84ba5c5c620525315413734');
        }
        else {
            contgen.append($('<div class="msg msgleft addweatherdiv"><img src="images/logo.png"/><p>Here\'s the weather today.</p><p class="addweather"></p><small>'+digitalclock.html()+'</small></div>'));
        $('.contgen .msg:last-child .addweather').load('https://api.openweathermap.org/data/2.5/weather?q='+localStorage.weathercity+'&mode=html&'+localStorage.weatherscale+'&appid=4a5344b7f84ba5c5c620525315413734');
        }    
        } 
        msgid = -1;
        localStorage.chatcont = contgen;
    }  
    //time query
    else if($('.lastmsg p:contains("time is it")').length > 0){ 
        var aimsg = '<p>The current time is '+displayTime(new Date)+'</p>';
        aiSendMsg(aimsg);
        msgid = -1;
    }	
    //todo query
    else if($('.lastmsg p:contains("reminder"),.lastmsg p:contains("todo")').length > 0)     {
        msgid = -1;
        var aimsg = '<p>Hey '+localStorage.firstname+', what would you like me to add in your reminders?</p>';
        aiSendMsg(aimsg);
        reminder = true;
    }
    else if($('.lastmsg p:contains("darkmode")').length > 0) {
        msgid = -1;
        setTimeout(function() {cmdark.trigger('click')},600);
        if(darkmode.find('input').prop("checked") == true) {
            var aimsg = '<p>Deactivating Darkmode...</p>';
            aiSendMsg(aimsg);
        }
        else {
            var aimsg = '<p>Activating Darkmode...</p>';
            aiSendMsg(aimsg);
        }
    }    
    else if($('.lastmsg p:contains("send a picture"),.lastmsg p:contains("send pic")').length > 0) {
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
        var aimsg = '<p>When would you like to me to set your alarm for? <br><input class="timepicker" type="time" value="'+addtohours+date.getHours()+':'+addtomins+date.getMinutes()+'"><i class="setalarm">Set Alarm</i></p>';
        aiSendMsg(aimsg);
        msgid = -1;        
    }       
    else if($('.lastmsg p:contains("music")').length > 0) {
        var aimsg = '<p>Let me play you some music</p><iframe class="soundcloud" width="300" height="100" scrolling="yes" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1058634487&color=%231596ff&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe><div class="soundcloudinfo" style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/avialemusic" title="Aviale" target="_blank" style="color: #cccccc; text-decoration: none;">Aviale</a> · <a href="https://soundcloud.com/avialemusic/sets/octacore-music" title="Octacore Music" target="_blank" style="color: #cccccc; text-decoration: none;">Octacore Music</a></div>';
        aiSendMsg(aimsg);
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
            aimsg = '<p>Nice, that\'s great!</p>';
            aiSendMsg(aimsg);
            msgid=-1;
            setTimeout(function() {msgid2=0;msgid=0},3000);
        }
    }            
    } //if reminder = false (default)
    //if reminder is true
    else if(reminder == true) { //if user asks for reminder
        newtodo = $('.contgen').find('.lastmsg p').html();
        var aimsg = '<p>Ok I\'ve just added "'+newtodo+'" in your reminders.</p>';
        aiSendMsg(aimsg);
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
        var aimsg = '<p>I see you haven\'t entered your name. You can update your account info in the settings above.</p>';
        aiSendMsg(aimsg);
        firsttime = false;
    }
    setTimeout(function() {
        turnid = 0;
        if(msgid != -1) {
            var aimsg = '<p>'+startmsg+aimsgs[msgid]+'</p>'; 
            aiSendMsg(aimsg); 
        }
        container.animate({scrollTop: container.prop('scrollHeight')});
        localStorage.chatcont = contgen.html();
        if(localStorage.darkmod == 1) {
            $('.msgleft p').css({'background':'#444','color':'#eee'});
        } 
    },500);       
            
}       
     
//display time func 
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

 

//ai sending msgs function - everytime AI sends msg, it calls this function and sends the message as parameters    
function aiSendMsg(aimsg) {
    if(typeof localStorage.logo == 'undefined' || typeof localStorage.logo == null)     contgen.append($('<div class="msg msgleft"><img src="images/logo.png"/>'+aimsg+'<small>'+digitalclock.html()+'</small></div>'));  
    else 
        contgen.append($('<div class="msg msgleft"><img src="images/purplogo.png"/>'+aimsg+'<small>'+digitalclock.html()+'</small></div>'));
    container.animate({scrollTop: container.prop('scrollHeight')});
    localStorage.chatcont = contgen.html();
}  

  

       
 
  
 




