//List of bugs:
//1. last message preview in contactbox not correct - update: only good on reload
//2. sending images keeps image in textarea (so sends all uploaded imgs twice)
//3. weather causes reloading issues - file not found
//4. find a way to turn off darkmode when it turns on automatically at night

$(document).ready(function() { 
      
//var declarations    
var app = $('.app');
var nav = $('nav');    
var sendbtn = $('.sendbtn');
var messenger = $('.messenger');    
contgen = $('.contgen');    
var msgright = $('.msgright');    
var message = '';    
var savedchats = $('.savedchats');  
var settings = $('.settings');    
turnid = 0; 
msgid = 0;    
msgid2 = 0;     
var typeanimate = $('.typeanimate');    
var typeanimbox = $('.typeanimbox');  
container = $('.container');      
timer = 1; 
var timeelapsed = false; 
var bonusicon = $('.bonusicon');   
startmsg = '';    
var chatapp = $('.chatapp');    
var msgapp = $('.msgapp');    
var homeapp = $('.homeapp'); 
var logo = $('.logo');    
var messengerapp = $('.messengerapp');    
var apps = $('.apps');    
var octacoremsg = $('.octacoremsg');    
var latestmsg = $('.latestmsg');
var contactbox = $('.contactbox'); 
var clearchat = $('.clearchat'); 
var setclick = 0;     
darkmode = $('.darkmode');    
var settingsbox = $('.settingsbox'); 
var optbox = $('.optbox'); 
var poweroff = $('.poweroff');    
var closedapp = $('.closedapp');          
var account = $('.account');  
var dlchat = $('.dlchat');   
var secretbtn = $('.secretbtn input'); 
var secretapi = $('.secretapi'); 
var optclick = $('.optclick');    
var closenotif = $('.closenotif');    
var notifdiv = $('.notifdiv');  
var notifinject = $('.notifinject');    
var notifbtn = $('.notifbtn');    
var notifs = $('.notifs');    
var fullnamefill = $('.fullnamefill');    
var firstnamefill = $('.firstnamefill');    
firsttime = true;   
date = new Date(); 
var thetime = date.getHours();      
var viewnotifs = $('.viewnotifs');     
var weathercity = $('.weathercity');
var profileinfo = $('.profileinfo');
var adminbtn = $('.adminbtn');    
var digitalclock = $('.digital-clock');    
var notifclock = $('.notifclock');    
var notifdate = $('.notifdate'); 
var notifdash = $('.notifdash');
reminder = false; 
var todos = $('.todos');    
setremind = false;    
cmhome = $('.cmhome');  
cmreload = $('.cmreload');  
cmdark = $('.cmdark');     
cmnotif = $('.cmnotif');  
alarms = $('.alarms');     
var mobtools = $('.mobtools');   
var mobtoolsbtn = $('.mobtoolsbtn');    
    
    
    
//at start of launch (before user sets a prof img)
if(typeof localStorage.profpic == 'undefined' || typeof localStorage.profpic == null) { //if localstorage doesn't exist
    $('.tempcont img,.account img').attr('src','images/prof.png'); 
    $('.profpic').css('background-image','url(images/prof.png)'); 
}
else { //if localstorage exists
    //set default profile pic    
    $('.tempcont img,.account img,.msgright img').attr('src',localStorage.profpic); 
    $('.profpic').css('background-image','url('+localStorage.profpic+')');
    $('.changeprofpic span i').html('Change Profile Picture');
}    
     
//when we click on Messaging system app in home screen      
msgapp.on('click', function() {
    homeapp.fadeOut(200);
    setTimeout(function() {
        messengerapp.fadeIn(200);
        container.animate({scrollTop: container.prop('scrollHeight')});
    },100);  
});       
//when click on logo go back to home    
logo.on('click', function() {
    apps.fadeOut(200);
    settingsbox.css('top','-100%'); 
    setclick = 0; //settings.css('color',''); 
    setTimeout(function() {
        homeapp.fadeIn(200);
    },100);
    //latestmsg.html(lastleftmsg); 
});  
//when click on Octacore's contactbox    
octacoremsg.on('click', function() {
    apps.not(chatapp).fadeOut(200);
    setTimeout(function() {
        chatapp.fadeIn(200);
        container.animate({scrollTop: container.prop('scrollHeight')});
    },100);
});      
          
      
//AI strings    
aimsgs = ["I'm sorry, i don't understand what you mean.<br>Tell me what\'s new with you?","I'm fine and you?", "It was nice, how was yours?","I'm thinking of a way to invade your planet, and you?","I was born yesterday but i'm pretty smart ;)","My name is Octacore","What's up?","I like The Terminator! What's yours?","Nothing much, you?","Cool, enjoy your chilling","You\'re welcome buddy","I have my reasons","Thats not a nice word","Cool dude","Hey man, how you doing!","I'm good, thanks for asking","That's good man","Nice","Nothing much, i'm just relaxing","Click on the image at the top right corner, then click on the big profile image in the drop down. let me know if you need more help \:)","Wazzaap!","Yeah, it is."];
//questions    
aiquest = ["So what are you doing now?","What do you do in life?","What is your favorite movie?"];     
           
//always scroll to bottom of chat window on load   
container.animate({scrollTop: container.prop('scrollHeight')+999999});     
      
//detect enter key pressed to send message    
messenger.keyup(function(event) {
    if (event.keyCode === 13) {
        sendbtn.click();  
    }   
});    
             
//when user clicks on the main sendbtn    
sendbtn.on('click', function() {
    if (!($.trim($('.messenger').val()) === "")) {
        message = messenger.val();
        if(typeof localStorage.profpic == 'undefined') {
            contgen.append($('<div class="msg msgright lastmsg"><img src="images/prof.png"/><p>'+message+'</p></div>'));
        }  
        else {
            contgen.append($('<div class="msg msgright lastmsg"><img src="'+localStorage.profpic+'"/><p>'+message+'</p></div>'));
        }
        container.animate({scrollTop: container.prop('scrollHeight')});
        messenger.val(''); 
        $('.lastmsg').not('.lastmsg:last-child').removeClass('lastmsg');
        turnid = 1; 
        //AI messaging
        if(turnid == 1) {
            AIMessaging(); 
            if(setremind == true) {
                notifmsg = $('<p>You have a new reminder: '+newtodo+'</p>')
                setTimeout(function() {dropNotif(notifmsg)},1500);
                setremind = false;
                //add reminder to reminder section (below date and time)
                todos.prepend($('<p><i class="fas fa-calendar-check todocalen"></i>New reminder: '+newtodo+' <i class="fas fa-times todoclear"></i></p>'));
                $('.noreminds').remove();
                localStorage.todos = todos.html();
            }   
        } 
    }  
    //save chat to local storage
    localStorage.chatcont = contgen.html(); 
});    
  
     
//load saved chats    
savedchats.prepend(localStorage.chatcont);         
      
//settings btn click action        
account.on('click', function() {
    if(setclick == 0) { //settings is open
        settingsbox.css('top','0');
        $(this).css('color','var(--color)');
        nav.find('h4').css('color','var(--color)');
        setclick = 1;
    }
    else { //settings is closed
        settingsbox.css('top','-100%');
        $(this).css('color','#333');
        nav.find('h4').css('color','');
        setclick = 0;
    }
});   
//download chat on btn click
dlchat.on('click', function() {
    contgen.find('img').detach();
    //download chat 
    dlChat(fileName, 'downchat','text/html');
    //actual btn change
    $(this).find('a').html('Downloaded <i class="fas fa-check"></i>');
    var thisvar = $(this);
    setTimeout(function() { thisvar.html('Download Chat') },2000)
})    
//download function of chat
function dlChat(filename, elId, mimeType) {
    var elHtml = document.getElementById(elId).innerHTML;
    var link = document.createElement('a');
    mimeType = mimeType || 'text/plain';
    link.setAttribute('download', filename);
    link.setAttribute('href', 'data:' + mimeType  +  ';charset=utf-8,' + encodeURIComponent(elHtml));
    link.click(); 
    //location.reload();
}
var fileName = 'OctaCore_Chat.html';    
//clear chat on btn click   
clearchat.on('click', function() {
    contgen.html('');
    localStorage.chatcont = '';
    $(this).html('Cleared <i class="fas fa-check"></i>');
    var thisvar = $(this);
    setTimeout(function() { thisvar.html('Clear Chat') },1500)
    notifmsg = $('<p>Your chat has been cleared</p>');
    dropNotif(notifmsg);
});        
poweroff.on('click', function() { 
    app.css({'width':'150px','height':'150px','margin-top':'150px'});
    apps.fadeOut(200);
    closedapp.fadeIn(200);
    closedapp.html($('<img src="images/logo.png"/>'));
    setTimeout(function() { $('.closedapp img').css('opacity','1') },350);
    
    closedapp.on('click', function() {
        $(this).fadeOut(200);
        apps.fadeIn(200);
        setTimeout(function() { app.css({'width':'700px','height':'100vh','margin-top':'auto'}); },200);
    }); 
});        
            
 
    
//if initreply is turned on, start init reply of AI    
$('.initreply').on('click', function() {
    if($(this).prop("checked") == true) {
        timeelapsed = true;
    } 
});       
//initiate message from AI if user doesn't chat after 15 seconds  
setInterval(function() {
    timer += 1;
    if(timer > 10 && timeelapsed == true) {
        setTimeout(function() { 
            var randnum = (Math.floor(Math.random() * 2) + 0);
            contgen.append($('<div class="msg msgleft"><img src="images/logo.png"/><p>'+aiquest[randnum]+'</p></div>'));
            container.animate({scrollTop: container.prop('scrollHeight')});
            localStorage.chatcont = contgen.html();
        },5000);
        timeelapsed = false;
        timer = -99999999;
    }
       
}, 1000);  
  
        
//bonusicon click (heart by default) - sends a heart 
bonusicon.on('click', function() {
    var bonusclass = $(this).attr('class');
    if(typeof localStorage.profpic == 'undefined' || typeof localStorage.profpic == null) {
        $('<div class="bonusdiv"><img src="images/prof.png"/><i class="'+bonusclass+' sendbonus"></i></div>').appendTo(contgen);
        $('.bonusdiv .sendbonus').removeClass('bonusicon');
    }
    else {
        $('<div class="bonusdiv"><img src="'+localStorage.profpic+'"/><i class="'+bonusclass+' sendbonus"></i></div>').appendTo(contgen);
    }
    container.animate({scrollTop: container.prop('scrollHeight')});
    setTimeout(function() {
        //AI answering your sent reaction - answer varies on icon
        if(bonusicon.hasClass('fa-heart')) {
            contgen.append($('<div class="msg msgleft"><img src="images/logo.png"/><p>That\'s very sweet of you :)</p></div>'));
        }
        else if (bonusicon.hasClass('fa-laugh-squint')) {
            contgen.append($('<div class="msg msgleft"><img src="images/logo.png"/><p>What\'s so funny?</p></div>'));
        }
        else if (bonusicon.hasClass('fa-paw')) {
            contgen.append($('<div class="msg msgleft"><img src="images/logo.png"/><p>Raaawwwr!</p></div>'));
        }
        else if (bonusicon.hasClass('fa-dragon')) {
            contgen.append($('<div class="msg msgleft"><img src="images/logo.png"/><p>woah, does it breathe fire?</p></div>'));
        }
        else if (bonusicon.hasClass('fa-dog')) {
            contgen.append($('<div class="msg msgleft"><img src="images/logo.png"/><p>Woof woof!</p></div>'));
        }
        else if (bonusicon.hasClass('fa-cat')) {
            contgen.append($('<div class="msg msgleft"><img src="images/logo.png"/><p>Miaaaww</p></div>'));
        }
        else if (bonusicon.hasClass('fa-music')) {
            contgen.append($('<div class="msg msgleft"><img src="images/logo.png"/><p>Let me play you some music</p><audio id="gensong" controls><source src="images/mc.mp3" type="audio/mpeg"></audio></div>'));
        }
         
        container.animate({scrollTop: container.prop('scrollHeight')});
        if(localStorage.darkmod == 1) {
            $('.msgleft p').css({'background':'#444','color':'#eee'});
        }
        localStorage.chatcont = contgen.html();
    },500);
});       
         
     
//image uploader
document.getElementById('getval').addEventListener('change', readURL, true);
function readURL(){
    var file = document.getElementById("getval").files[0];
    var reader = new FileReader();
    $('.messengerbox .imginsert').append($('<div class="clock"></div>'));
    $('.typebox').css('height','300px');
    reader.onloadend = function(){
        $('.clock').css('background-image','url('+reader.result+')'); 
        sendbtn.on('click', function() {
            if(typeof localStorage.profpic == 'undefined' || typeof localStorage.profpic == null) {
                contgen.append($('<div class="clockcont msg"><img src="images/prof.png"/><div class="upimgright" style="background-image:url('+reader.result+')"></div></div>'));    
            }
            else {
                contgen.append($('<div class="clockcont msg"><img src="'+localStorage.profpic+'"/><div class="upimgright" style="background-image:url('+reader.result+')"></div></div>'));
            }
            $('.imginsert').html(''); 
            $('.typebox').css('height','120px');
            container.animate({scrollTop: container.prop('scrollHeight')});
               
            //AI answering with an image also
            setTimeout(function() {
                var randnum = (Math.floor(Math.random() * 9) + 0);
                contgen.append($('<div class="clockcont msg clockleft"><img src="images/logo.png"/><p>Nice image, here\'s one too</p><div class="upimgleft" style="background-image:url(https:/\/picsum.photos\/100'+randnum+'\/100'+randnum+')"></div></div>'));
                container.animate({scrollTop: container.prop('scrollHeight')});
                localStorage.chatcont = contgen.html(); 
            },1000);
            
    });   
    }  
    if(file){
        reader.readAsDataURL(file);
    }
}      
/*    
//calculate lastmsg of AI to append in chat preview - uncomment when bug is fixed   
var lastleftmsg = $('.msg p:last-child').text();    
var lastmsgarray = lastleftmsg.split("\n");  
lastleftmsg = lastmsgarray[lastmsgarray.length-1];  
latestmsg.html(lastleftmsg);     
*/      
     
//topbar search function
$('#contactsearch').on("keyup", function() {
var value = $(this).val().toLowerCase();
contactbox.filter(function() {
    if($(this).find('h6').text().toLowerCase().indexOf(value) < 0) {
        $(this).fadeOut(300);
    }
    else if($(this).find('h6').text().toLowerCase().indexOf(value) > -1) {
        $(this).fadeIn(300);   
    }
});
});     
        
//settings optbox actions     
optclick.on('click', function() {    
    if($(this).hasClass('closedopt')) {
    $(this).addClass('openopt').removeClass('closedopt').css('height','250px'); optclick.not(this).addClass('closedopt').removeClass('openopt').css('height','30px');    
    }  
    else if($(this).hasClass('openopt')) {
     $(this).addClass('closedopt').removeClass('openopt').css('height','30px');
    }
}); 

//change bg color on click of color btns    
$('.colors div').on('click', function() {
    notifmsg = $('<p>The chat background color has been set.</p>');
    dropNotif(notifmsg);
});
$('.color0').on('click', function() {
    chatapp.css({'background':'#fafafa','background-size':'100% 100%'});
    localStorage.chatbg = '#fafafa';
    localStorage.chatbg2 = '100% 100%';
});     
$('.color1').on('click', function() {
    chatapp.css({'background':'linear-gradient(180deg, rgba(251,240,4,1) 0%, rgba(42,205,0,1) 100%)','background-size':'100% 150%'});
    localStorage.chatbg = 'linear-gradient(180deg, rgba(251,240,4,1) 0%, rgba(42,205,0,1) 100%)';
    localStorage.chatbg2 = '100% 150%';
}); 
$('.color2').on('click', function() {
    chatapp.css({'background':'linear-gradient(180deg, rgba(4,188,251,1) 0%, rgba(144,0,255,1) 100%)','background-size':'100% 150%'});
    localStorage.chatbg = 'linear-gradient(180deg, rgba(4,188,251,1) 0%, rgba(144,0,255,1) 100%)';
    localStorage.chatbg2 = '100% 150%';
}); 
$('.color3').on('click', function() {
    chatapp.css({'background':'linear-gradient(180deg, rgba(4,188,251,1) 0%, rgba(0,255,196,1) 100%)','background-size':'100% 150%'});
    localStorage.chatbg = 'linear-gradient(180deg, rgba(4,188,251,1) 0%, rgba(0,255,196,1) 100%)';
    localStorage.chatbg2 = '100% 150%';
}); 
$('.color4').on('click', function() {
    chatapp.css({'background':'linear-gradient(180deg, rgba(251,4,121,1) 0%, rgba(255,235,0,1) 100%)','background-size':'100% 150%'});
    localStorage.chatbg = 'linear-gradient(180deg, rgba(251,4,121,1) 0%, rgba(255,235,0,1) 100%)';
    localStorage.chatbg2 = '100% 150%';
}); 
$('.color5').on('click', function() {
    chatapp.css({'background':'linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)','background-size':'100% 150%'});
    localStorage.chatbg = 'linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)';
    localStorage.chatbg2 = '100% 150%';
});     
//load chatapp bg from localstorage
chatapp.css({'background':localStorage.chatbg,'background-size':localStorage.chatbg2});      

//change theme color on click of color btns 
$('.tcolors').find('div').on('click', function() {
    var colorarr = $(this).css('background').split(') ');
    $(':root').css('--color',colorarr[0]); 
    localStorage.themecolor = colorarr[0]; 
});
//load themecolor from localstorage
$(':root').css('--color',localStorage.themecolor);    
   
      
      
//change profile pic 
$('.profpic').on('click', function() {
    $('.changeprofpic').fadeIn(200);
});   
$('.closepic').on('click', function() {
    $('.changeprofpic').fadeOut(200);
});      
     
//change profile image    
$('.profchange').on('change', function() {
    var file = document.getElementById("profchange").files[0];
    var reader = new FileReader(); 
    reader.onloadend = function(){
        $('.account img').attr('src',reader.result);   
        localStorage.profpic = reader.result; 
        $('.changeprofpic').fadeOut(300);
        $('.profpic').css('background-image','url('+localStorage.profpic+')');
        $('.tempcont img,.account img,.msgright img').attr('src',localStorage.profpic);
        $('.profpic').css('background-image','url('+localStorage.profpic+')');
        contgen.append($('<div class="msg msgleft"><img src="images/logo.png"/><p>Nice picture!</p></div>'));
        container.animate({scrollTop: container.prop('scrollHeight')});
    }       
    $('.changeprofpic span i').html('Change Profile Picture');
    if(file){
        reader.readAsDataURL(file);
    }
    notifmsg = $('<p>Your profile picture has been saved.</p>');
    dropNotif(notifmsg);
}); 
   
//dark mode action       
darkmode.find('input').on('click', function() {
    if($(this).prop("checked") == true) {
        darkMode();
    }  
    else {
        undarkMode();
    } 
});      
//dark mode function (for localstorage)
function darkMode() {
    $('nav, .homeapp, .messengerapp, .settingsbox, .container,.typebox,.closedapp').css('background','var(--dark)'); 
    $('h4,h6,p,.options span,i').css('color','#ccc');
    $('.msgleft p').css({'background':'#444','color':'#eee'});
    $('.appbox h4').css('color','#333');
    $('.msgright p').css('color','#fff');
    localStorage.darkmod = 1; 
    localStorage.darkcheck = 1;
}     
function undarkMode() {
    $('nav, .homeapp, .messengerapp, .settingsbox, .container,.typebox,.closedapp').css('background',''); 
    $('h4,h6,p,.options span,i').css('color','');
    $('.msgleft p').css({'background':'','color':''});
    $('.appbox h4').css('color','');
    $('.msgright p').css('color','');
    localStorage.darkmod = 0;
    localStorage.darkcheck = 0;
}    
if(localStorage.darkmod == 1) { darkMode() } 
if(localStorage.darkcheck == 1) { $('.darkmode input').prop("checked", true);}   if($('.darkmode input').prop("checked") == true) {    
    darkMode();
}
//trigger darkmode if time is between 12am and 6am and if use didn't turn it off during that time    
if(thetime >= 0 && thetime < 6) {
    $('.darkmode input').prop( "checked", true );
    darkMode();
}   
     
        
//Secret API 
secretbtn.on('click', function() {
    if(secretbtn.prop("checked") == true) {
        notifmsg = $('<p>Secret interface activated. Close settings to view.</p>');
        dropNotif(notifmsg);
        apps.fadeOut(200);
        setTimeout(function() {secretapi.fadeIn(300)},300);
    } 
    else {
        notifmsg = $('<p>Secret interface deactivated.</p>');
        dropNotif(notifmsg);
        secretapi.fadeOut(300);
        setTimeout(function() {apps.fadeIn(200)},300);
    }
});   
          
   
    
     
//reactions adding (settings)
$('.reactions i').on('click', function() {
    $('.reactions small').html('Reaction added');
    setTimeout(function() {$('.reactions small').html('Add a reaction to your chat');},1500);
    var iconclass = $(this).attr('class');
    //any icon clicked will send its class name to the bonusicon in chatapp
    bonusicon.attr('class',iconclass+' bonusicon');
    $('.activereact').attr('class',iconclass+' opticon activereact');
    localStorage.react = bonusicon.attr('class');
    $('.activereact').removeClass('fa-heart');
    //show notif on change
    notifmsg = $('<p>Reaction has been set in your chats</p>');
    dropNotif(notifmsg);
    localStorage.remheart = 'fa-heart';
    localStorage.reactsettings = iconclass;
});      
$('.bonusicon').attr('class',localStorage.react); 
$('.activereact').removeClass('bonusicon '+localStorage.remheart).addClass(localStorage.reactsettings);           
      
//clear all account settings
$('.clearall').on('click', function() {
    localStorage.clear();
    $(this).html('App Cleared <i class="fas fa-check"></i>');
    setTimeout(function() {location.reload()},500);
});    
   
         
//profile name click
$('.profile h4').on('click', function() {
    $('.profile small').fadeIn(200).css('display','block');
    $('.profile p').css('margin-top','15px');
    setTimeout(function() {$('.profile small').fadeOut(300);$('.profile p').css('margin-top','0')},2000);
});    
    
//save profile info changes 
$('.saveprofile').on('click', function() {
    localStorage.profname = $('.profname').val();
    var namearr = $('.profname').val().split(" ");
    localStorage.firstname = namearr[0];
    localStorage.profplace = $('.profplace').val();
    localStorage.profjob = $('.profjob').val();
    localStorage.profemail = $('.profemail').val();
    $(this).html('Changes Saved!');
    setTimeout(function() {$('.saveprofile').html('Save Changes')},1500);
    fullnamefill.html(localStorage.profname);  
    firstnamefill.html(localStorage.firstname);
    $('.tempcont h6').html(localStorage.profplace);
    $('.profname').val(localStorage.profname);
    $('.profplace').val(localStorage.profplace);    
    $('.profjob').val(localStorage.profjob); 
    $('.profemail').val(localStorage.profemail);
    var notifmsg = $('<p>Hi '+localStorage.firstname+', your profile information has been successfully updated</p>');
    dropNotif(notifmsg);
});     
//set profile info in appropriate places from localstorage vars
if(typeof localStorage.profname == 'undefined' || typeof localStorage.profname == null) {    
    fullnamefill.html('Your Name'); 
    firstnamefill.html('');
    $('.profname').attr('placeholder','Enter your name');
}
else {
    fullnamefill.html(localStorage.profname); 
    firstnamefill.html(localStorage.firstname);
    $('.profname').val(localStorage.profname);
}    
if(typeof localStorage.profplace == 'undefined' || typeof localStorage.profplace == null) {     
    $('.tempcont h6').html('Your location');
    $('.profplace').attr('placeholder','Enter a country');
}     
else {  
    $('.tempcont h6').html(localStorage.profplace);
    $('.profplace').val(localStorage.profplace);
}    
if(typeof localStorage.profjob == 'undefined' || typeof localStorage.profjob == null) {     
    $('.profjob').attr('placeholder','Enter a skill or job');
}  
else {
    $('.profjob').val(localStorage.profjob);
}    
if(typeof localStorage.profemail == 'undefined' || typeof localStorage.profemail == null) {     
    $('.profemail').attr('placeholder','Enter an email');
}  
else {
    $('.profemail').val(localStorage.profemail);
}         
//clear info btn
$('.clearprofile').on('click', function() {
    $('.profileinfo input').val('');
});    
         
//global notification drop down function - all actions call this function
//and individually inject their own notif text as a param var
function dropNotif(notifmsg) {
    notifdiv.css({'top':'0'});  
    notifinject.prepend(notifmsg);
    $('.notifinject p:first-child').append($('<small>'+displayTime(date)+'</small><i class="fas fa-times"></i>'));
    setTimeout(function() { notifdiv.css({'top':'-140px'}) },4000);
    //play notif sound
    $('#notifaudio').get(0).play();
    $('.notifs').animate({scrollTop: $('.notifs').prop('scrollHeight')-9999});
    localStorage.notifs = notifinject.html();
    notifbtn.css('color',localStorage.themecolor);
    notifdash.fadeOut(0);
}        
    
//Notifications actions
notifs.on('click', function() {
    notifdiv.css({'top':'0','height':'90%'});
});     
closenotif.on('click', function() {
    notifdiv.css({'top':'-140px','height':'120px'});
    notifdash.fadeOut(); 
});   
notifdash.on('click', function() {
    notifdiv.css({'top':'0','height':'90%'});
});    
//notifiction btn 
notifbtn.on('click', function() {
    notifdiv.css({'top':'0','height':'90%'});
    notifbtn.css('color','#aaa');
    notifdash.fadeIn();
});    
notifdiv.on('click', function() {
    notifbtn.css('color','#aaa');
    notifdash.fadeIn();
});    
   
//save notifications to localstorage    
notifinject.html(localStorage.notifs);
     
//display time function
function displayTime(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var addtohours = '';
    if(hours <= 9){addtohours='0'}     
    var strTime = addtohours+hours + ':' + minutes + ' ' + ampm;
    return strTime;
}
//send msg during afternoon (4pm)     
if (thetime >= 16 && thetime < 17) {
    var notifmsg = $('<p>Good afternoon '+localStorage.firstname+', Here\'s the latest evening news <a href="https://www.bbc.com/news/world">Click here</a></p>'); 
    dropNotif(notifmsg);
}  
//send msg in morning (11am)    
if ((thetime >= 11 && thetime < 12) && (localStorage.morning == 'undefined' || localStorage.morning == '')) {
    contgen.append($('<p>Good morning '+localStorage.firstname+', here\'s what\'s new this morning, <a href="https://www.bbc.com/news/world">Click here</a><br>The weather right now:  <span class="addweather"></span></p>'));
    var notifmsg = $('<p>Good morning '+localStorage.firstname+', here\'s what\'s new this morning, <a href="https://www.bbc.com/news/world">Click here</a><br>The weather right now:  <span class="addweather"></span></p>'); 
    dropNotif(notifmsg);
    localStorage.morning = '';
}         
$('.notifs .addweather').load('https://api.openweathermap.org/data/2.5/weather?q=montreal&mode=html&appid=4a5344b7f84ba5c5c620525315413734');    
//display evening messages    
if(thetime >= 21 && thetime < 22) {
    contgen.append($('<div class="msg msgleft"><img src="images/logo.png"/><p>Good evening '+localStorage.firstname+', it is '+displayTime(date)+'. Here\'s the latest movies on netflix. Enjoy! <a href="https://www.whats-on-netflix.com/whats-new/">Latest movies</a></p></div>'));
    container.animate({scrollTop: container.prop('scrollHeight')});
    notifmsg = $('<p>Good evening '+localStorage.firstname+', it is '+displayTime(date)+'. Here\'s the latest movies on netflix. Enjoy! <a href="https://www.whats-on-netflix.com/whats-new/">Latest movies</a></p>');
    dropNotif(notifmsg);
}   
//display late time messages
if (thetime >= 3 && thetime < 5) {  
    contgen.append($('<div class="msg msgleft"><img src="images/logo.png"/><p>It\'s getting late, let\'s call it a night?</p></div>'));
    container.animate({scrollTop: container.prop('scrollHeight')});
    notifmsg = $('<p>It\'s getting late, let\'s call it a night?</p>');
    dropNotif(notifmsg); 
}
 
//clear notifs btn
$('.clearnotifs,.clearallnotifs').on('click', function() {
    localStorage.notifs = '';
    $(this).html('Cleared!');
    setTimeout(function() {$('.clearnotifs').html('Clear Notifications');$('.clearallnotifs').html('Clear All');},1500);
    notifinject.html('');
    notifbtn.css('color','#aaa');
});    
//view all notifs btn
viewnotifs.on('click', function() {
    notifdiv.css({'top':'0','height':'90%'});
});    
      
$(document).on('click','.notifinject i', function() {
    $(this).parent().css({'left':'-50px','opacity':'0'});
    var notifitem = $(this);
    setTimeout(function() {notifitem.parent().remove();localStorage.notifs = notifinject.html();},400);
});     
      
//get weather city of user (in settings)  
 weathercity.on('change', function() {
      localStorage.weathercity = weathercity.val();
      weathercity.val(localStorage.weathercity);
      var notifmsg = $('<p>Your city for the weather has been set.</p>');
      dropNotif(notifmsg);
 });
weathercity.val(localStorage.weathercity);    
$('.tempcel').on('change', function() {
    localStorage.weatherscale = 'units=metric';
})     
$('.tempfahr').on('change', function() {
    localStorage.weatherscale = 'units=imperial';
});     
        
    
//admind mode actions
adminbtn.on('change', function() {
    if(adminbtn.prop("checked") == true) {    
        $('.admininput').css({'visibility':'visible','left':'0'});
    }
    else {
        $('.admininput').css({'visibility':'hidden','left':'30px'});
    }
    $('.adminbtn').prop('checked', false);
});  
$('.admininput').on('keyup', function() {
    if($(this).val() == 'bittex') {
        var notifmsg = $('<p>Admin mode has been activated!</p>');
        $('.setdivadmin').find('small').fadeOut(400);
        $('.adminbtn').prop('checked', true);
        dropNotif(notifmsg);
        setAdmin();
    }
    else {
        $('.adminbtn').prop('checked', false);
        $('.setdivadmin').find('small').fadeIn(400);
    }
});
     
//set admin info and privileges
function setAdmin() {
    $('.fullnamefill').html('Uriel Bitton');    
    $('.placefill').html('Montreal, Canada');     
    $('.profname').val('Uriel Bitton'); 
    $('.profplace').val('Montreal, Canada');     
    $('.profjob').val('App Developer');     
    $('.profemail').val('urielas@hotmail.com');
    //save to localstorage
    localStorage.profname = $('.profname').val();
    var namearr = $('.profname').val().split(" ");
    localStorage.firstname = namearr[0];
    localStorage.profplace = $('.profplace').val();
    localStorage.profjob = $('.profjob').val();
    localStorage.profemail = $('.profemail').val();
    localStorage.weathercity = 'Montreal';
    weathercity.val(localStorage.weathercity);
    //change automatically profile picture for admin   
    localStorage.profpic = 'images/uriel.jpg';
    $('.profpic').css('background-image','url('+localStorage.profpic+')');
    $('.tempcont img,.account img,.msgright img').attr('src',localStorage.profpic);
    $('.profpic').css('background-image','url('+localStorage.profpic+')');
    contgen.append($('<div class="msg msgleft"><img src="images/logo.png"/><p>Nice picture admin!</p></div>'));
    container.animate({scrollTop: container.prop('scrollHeight')});       
    $('.changeprofpic span i').html('Change Profile Picture');
}    
    
//set color picker color to theme color
$('.colorpicker').on('change', function() {
    $(':root').css('--color',$(this).val());
    localStorage.themecolor = $(this).val();
});  
if(typeof localStorage.themecolor == 'undefined' || typeof localStorage.themecolor == null) {
    $('.colorpicker').attr('value','#ff3b30'); 
}    
   
gradcolor1 = '';
gradcolor2 = '';    
//set gradient background chatapp 
$('.gradpicker1').on('change', function() {
    gradcolor1 = $(this).val();
});  
$('.gradpicker2').on('change', function() {
    gradcolor2 = $(this).val();
});      
$('.applygrad').on('click', function() {
    chatapp.css('background','linear-gradient(180deg, '+gradcolor1+' 0%, '+gradcolor2+' 100%)');
    notifmsg = $('<p>The gradient background color was successfully set.</p>')
    dropNotif(notifmsg);
});    
    
         
//notifbtn light up color if at least 1 notif exists, gray when 0
if(notifinject.find('p').length > 0) {
    notifbtn.css('color',$(':root').css('--color'));
}    
else {
    notifbtn.css('color','#aaa');
}  
  
    
//live clock functions
function clockUpdate(){
    var t=new Date;
    function e(t){
        return t<10?"0"+t:t
    }
    var c,o=e((c=t.getHours())>12?c-12:0==c?12:c),a=e(t.getMinutes()),l=e(t.getSeconds());
    var ampm = '';                       
    if(t.getHours()>=12&&t.getHours()<=23){ampm='pm'}else{ampm='am'}                        
    $("nav .digital-clock").text(o+":"+a+' '+ampm);
    $(".notifdash").find('.digital-clock').text(o+":"+a+':'+l+' '+ampm);
}
clockUpdate(),setInterval(clockUpdate,1e3);
    
    
//display date in notifdash
const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];    
notifdate.html('<span>'+monthNames[date.getMonth()]+'</span> '+date.getUTCDate()+' '+date.getFullYear());    

    
//clean lastmsg class of saved chats
$('.lastmsg').removeClass('lastmsg');    
   
//load todos from localstorage
if(typeof localStorage.todos == 'undefined' || typeof localStorage.todos == null) {
    todos.html('<p class="noreminds">You have no reminders</p>'); 
}
else {
    $('.noreminds').remove();
    todos.html(localStorage.todos); 
}    
//or if all reminders have been cleared - append the empty reminders msg
if(todos.find('p').length < 1){
    todos.html('<p class="noreminds">You have no reminders</p>');
}    
//clear individual reminders on btn click
$(document).on('click','.todoclear', function() {
    $(this).parent().css('opacity','0');
    var thisreminder = $(this);
    setTimeout(function() {
        thisreminder.parent().remove();
        if(todos.find('p').length < 1){
            todos.html('<p class="noreminds">You have no reminders</p>');
            localStorage.todos = todos.html();
        }
    },1000);
});
//clear individual alarms on btn click
$(document).on('click','.alarmclear', function() {
    $(this).parent().css('opacity','0');
    var thisalarm = $(this);
    setTimeout(function() {
        thisalarm.parent().remove();
        if(alarms.find('p').length < 1){
            alarms.html('<p class="noalarms">You have no alarms set</p>');
            localStorage.alarms = alarms.html();
        }
    },1000); 
});     
    
//load alarms from localstorage
if(typeof localStorage.alarms == 'undefined' || typeof localStorage.alarms == null) {
    alarms.html('<p class="noalarms">You have no alarms set</p>'); 
}
else {
    $('.noalarms').remove();
    alarms.html(localStorage.alarms); 
}    
//or if all alarms have been cleared - append the empty alarms msg
if(alarms.find('p').length < 1){
    alarms.html('<p class="noalarms">You have no alarms set</p>');
} 
//clear alarms on load
$('.timepicker').parents('.msg').remove();    
    
/*   
//right mouse click actions on all desired surfaces 
var contextmenu = document.querySelector(".contextmenu");
var menuOption = document.querySelector(".cmoption");
let menuVisible = false;
const toggleMenu = command => {
  contextmenu.style.display = command === "show" ? "block" : "none";
  menuVisible = !menuVisible;
};
const setPosition = ({ top, left }) => {
  contextmenu.style.left = `${left}px`;
  contextmenu.style.top = `${top}px`;
  toggleMenu("show");
};
window.addEventListener("click", e => {
  if (menuVisible) toggleMenu("hide");
});
window.addEventListener("contextmenu", e => {
  e.preventDefault();
  const origin = {
    left: e.pageX,
    top: e.pageY
  }; 
  setPosition(origin);
  return false;
}); 
*/ 
     
//cmdark click btn
cmhome.on('click', function() {
    apps.fadeOut(200);
    homeapp.fadeIn(300);
});    
cmdark.on('click', function() {
    if(darkmode.find('input').prop("checked") == true) {
        undarkMode();
        darkmode.find('input').prop('checked',false);
    }
    else {
        darkMode();
        darkmode.find('input').prop('checked',true);
    }
});    
cmreload.on('click', function() {
    location.reload();
});    
cmnotif.on('click', function() {
    
});    
     
//set alarm time     
$(document).on('change','.timepicker', function() {
    justtime = $('.timepicker').val();
})   
//set alarm btn    
$(document).on('click','.setalarm', function() {
    justtime = $('.timepicker').val(); 
    $('.setalarm').removeClass('setalarm').addClass('oldalarm').html('Alarm set'); 
    justtime = justtime.split("T").pop();
    notifmsg = $('<p>You have a new alarm for '+justtime+'<span class="dismiss">dismiss</span></p>');
    setTimeout(function() {dropNotif(notifmsg)},1500);
    //add alarm to alarm section 
    alarms.html($('<p><i class="material-icons alarmicon">&#xe190;</i>New alarm: <span class="alarmtime">'+justtime+'</span> <i class="fas fa-times alarmclear"></i></p>'));
    $('.noalarms').remove();
    setTimeout(function() {contgen.append($('<div class="msg msgleft"><img src="images/logo.png"/><p>Ok I\'ve just added a new alarm for '+justtime+'</p></div>'));container.animate({scrollTop: container.prop('scrollHeight')});},500); 
    localStorage.alarms = alarms.html();
});  
     
//set off alarm if alarm set matches current time
$(document).one('click', '.app', function() {    
    if(date.getHours()+':'+date.getMinutes() === $('.alarmtime').html()) {
        $('#alarmaudio').get(0).play();
        notifmsg = $('<p><i class="material-icons ringing">&#xe190;</i>Your alarm  is ringing<span class="dismiss">dismiss</span></p>');
        dropNotif(notifmsg);
    }         
});           
    
$(document).on('click','.dismiss', function() {
    $('#alarmaudio').get(0).pause();
    localStorage.alarms = '';
    $('.alarmtime').remove(); 
    $('.alarms').html('');
    $('.dismiss').parent().remove();
    localStorage.notifs = notifs.html();
    alarms.html('<p class="noalarms">You have no alarms set</p>');
});           
           
       
//mobtools actions - show/hide on mobtoolbtn click  
var toolsclick = false;    
mobtoolsbtn.on('click', function() {
    if(toolsclick == false){
        mobtools.css('display','block');
        setTimeout(function(){mobtools.css({'opacity':'1','left':'0'})},100)
        $(this).css('transform','rotate(180deg)');
        toolsclick = true;
    }
    else { 
        mobtools.css({'left':'-20px','opacity':'0'});
        setTimeout(function(){mobtools.css('display','none')},200)
        $(this).css('transform','rotate(0deg)');
        toolsclick = false;
    }
});       
      
     
    
    
    
//has to be last line    
//make all links external
$('a').not('#dllink').attr('target','_blank');     
    
});