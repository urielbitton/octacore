
 
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
var weathercityy = $('.weathercityy');
var profileinfo = $('.profileinfo');
var adminbtn = $('.adminbtn');    
digitalclock = $('.digital-clock');    
var notifclock = $('.notifclock');    
var notifdate = $('.notifdate'); 
var notifdash = $('.notifdash');
reminder = false; 
var todos = $('.todos');    
setremind = false;    
var cmhome = $('.cmhome');  
var cmreload = $('.cmreload');  
cmdark = $('.cmdark');     
var cmnotif = $('.cmnotif'); 
var cmsettings = $('.cmsettings');   
alarms = $('.alarms');     
var mobtools = $('.mobtools');   
var mobtoolsbtn = $('.mobtoolsbtn');    
var notifsound = $('.notifsound');    
var getval = $('#getval');    
var emojipicker = $('.emojipicker');    
var typebox = $('.typebox');    
var reactions = $('.reactions');    
var emojidiv = $('.emojidiv');    
var emojiclick = false;    
var toolsbox = $('.toolsbox');     
var calcdiv = $('.calcdiv');    
var appwindow = $('.appwindow');    
firstmsg = true;     
dude = 0;     
var suggestbtn = $('.suggestbtn');    
var chatback = $('.chatback');    
var chattools = $('.chattools');    
var tempcont = $('.tempcont');    
var suggestdiv = $('.suggestdiv');    
var chatinfo = $('.chatinfo');      
var firstalarm=true,firstmorn=true,firstnoon=true,firsteven=true,firstlate=true; 
var startify = $('.startify');
var heyoctacore = $('.heyoctacore');    
var heymsg = $('.heymsg');    
var startifyapp = $('.startifyapp');      
var startdaybtn = $('.startdaybtn');    
var startday = $('.startday');    
   
     
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
      
//remove profile pic
$('.removeprofpic').on('click', function() {
    $('.profpic').attr('style','background-image:url(images/prof.png)');
    $('.changeprofpic').fadeOut();
    localStorage.profpic = 'images/prof.png';
    $('.profpic').css('background-image','url('+localStorage.profpic+')');
    $('.account, .tempcont,.msgright').find('img').attr('src',localStorage.profpic);
});     
    
//when we click on Messaging system app in home screen      
msgapp.on('click', function() { 
    homeapp.fadeOut(200);
    $('.chatinfo').css('top','-100vh');
    setTimeout(function() {
        messengerapp.fadeIn(200);
        container.animate({scrollTop: container.prop('scrollHeight')});
    },100);  
});         
//when click on logo go back to home    
logo.on('click', function() {
    $('.apps,.startify').fadeOut(200);
    settingsbox.css('top','-100%'); 
    $('.recspage').fadeOut();
    setclick = 0;
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
    if(firsttime == true) {
        var aimsg = '<p>Welcome to OctaCore messaging app. What can I do for you?</p>';
        aiSendMsg(aimsg);
        firsttime = false;
        localStorage.firsttime = firsttime;
    } 
});    
if(typeof localStorage.firsttime == 'undefined' || typeof localStorage.firsttime == null) {
    firsttime = true;
}  
else {
    firsttime = localStorage.firsttime;
}    
    
//quadflow msg
$('.quadflowmsg').on('click', function() {
    homeapp.fadeOut();
    apps.fadeOut(); 
    $('.quadflowapp').fadeIn();
});      
           
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
        var mymsg = '<p>'+message+'</p>';
        meSendMsg(mymsg);
        messenger.val(''); 
        $('.closetypebox').css('opacity','0');
        $('.lastmsg').not('.lastmsg:last-child').removeClass('lastmsg');
        turnid = 1; 
        typebox.css('height','');
        emojiclick = 0, suggestclick = 0;
        emojidiv.fadeOut();suggestdiv.fadeOut();
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
    closedapp.fadeIn(200);
    closedapp.html($('<img src="images/logo.png"/>'));
    $('.settingsbox, nav, .appbox,.apps').fadeOut();
    setTimeout(function() { $('.closedapp img').css('opacity','1') },350);
    closedapp.addClass('offanimation');
    
    closedapp.on('click', function() {
        $(this).fadeOut(200);
        $('.settingsbox, nav, .appbox,.apps').fadeIn();
        setTimeout(function() { app.css({'width':'700px','height':'100vh','margin-top':'auto'}); },200);
        closedapp.removeClass('offanimation');
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
        $('<div class="bonusdiv"><img src="images/prof.png"/><i class="'+bonusclass+' sendbonus"></i><small>'+displayTime(date)+'</small></div>').appendTo(contgen);
        $('.bonusdiv .sendbonus').removeClass('bonusicon');
    }
    else {
        $('<div class="bonusdiv"><img src="'+localStorage.profpic+'"/><i class="'+bonusclass+' sendbonus"></i><small>'+displayTime(date)+'</small></div>').appendTo(contgen);
    }
    container.animate({scrollTop: container.prop('scrollHeight')});
    setTimeout(function() {
        //AI answering your sent reaction - answer varies on icon
        if(bonusicon.hasClass('fa-heart')) {
            var aimsg = '<p>That\'s very sweet of you :)</p>';
            aiSendMsg(aimsg); 
        }
        else if (bonusicon.hasClass('fa-laugh-squint')) {
            var aimsg = '<p>What\'s so funny?</p>';
            aiSendMsg(aimsg);
        }
        else if (bonusicon.hasClass('fa-paw')) {
            var aimsg = '<p>Raawwwr!</p>';
            aiSendMsg(aimsg);
        }
        else if (bonusicon.hasClass('fa-dragon')) {
            var aimsg = '<p>woah, does it breathe fire?</p>';
            aiSendMsg(aimsg);
        }
        else if (bonusicon.hasClass('fa-dog')) {
            var aimsg = '<p>Woof woof!</p>';
            aiSendMsg(aimsg);
        }
        else if (bonusicon.hasClass('fa-cat')) {
            var aimsg = '<p>Miaaaww</p>'
            aiSendMsg(aimsg);
        } 
        else if (bonusicon.hasClass('fa-music')) {
            var aimsg = '<p>Let me play you some music</p><iframe class="soundcloud" width="300" height="100" scrolling="yes" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1058634487&color=%231596ff&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe><div class="soundcloudinfo" style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/avialemusic" title="Aviale" target="_blank" style="color: #cccccc; text-decoration: none;">Aviale</a> · <a href="https://soundcloud.com/avialemusic/sets/octacore-music" title="Octacore Music" target="_blank" style="color: #cccccc; text-decoration: none;">Octacore Music</a></div>';
            aiSendMsg(aimsg);
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
    $('.closetypebox').css('opacity','1');
    reader.onloadend = function(){
        $('.clock').css('background-image','url('+reader.result+')'); 
        sendbtn.one('click', function() {
            if(typeof localStorage.profpic == 'undefined' || typeof localStorage.profpic == null) {
                contgen.append($('<div class="clockcont msg"><img src="images/prof.png"/><div class="upimgright" style="background-image:url('+reader.result+')"></div></div>'));    
            }
            else {
                contgen.append($('<div class="clockcont msg"><img src="'+localStorage.profpic+'"/><div class="upimgright" style="background-image:url('+reader.result+')"></div></div>'));
            }
            $('.imginsert').html(''); 
            $('.typebox').css('height','120px');
            $('.closetypebox').css('opacity','0');
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
    else {
        reader.readAsDataURL(null);
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
$('.colorsbg div').on('click', function() {
    notifmsg = $('<p>The chat background color has been set.</p>');
    dropNotif(notifmsg);
});
$('.tcolors div').on('click', function() {
    notifmsg = $('<p>The theme color has been set.</p>');
    dropNotif(notifmsg);
    $('.personaltheme').css('background',localStorage.themecolor);
    
});    
$('.chatimgbg div').on('click', function() {
    notifmsg = $('<p>The chat picture background has been set.</p>');
    dropNotif(notifmsg);
});    
     
//chat bg colors options    
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
if(typeof localStorage.chatbg == 'undefined' || typeof localStorage.chatbg == null) {}   
else {
    chatapp.css({'background':localStorage.chatbg,'background-size':localStorage.chatbg2}); 
}      
     
 
//change theme color on click of color btns 
$('.tcolors').find('div').on('click', function() {
    var colorarr = $(this).css('background').split(') ');
    $(':root').css('--color',colorarr[0]+')'); 
    localStorage.themecolor = colorarr[0]+')'; 
}); 
//load themecolor from localstorage
$(':root').css('--color',localStorage.themecolor);    
   
       
      
//change profile pic 
$('.profile .profpic').on('click', function() {
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
    $('nav, .homeapp, .messengerapp, .settingsbox, .container,.typebox,.closedapp,.chattools,.chatinfo,.appwindow,.startify,.notifdiv,.addreccont').css('background','var(--dark)'); 
    $('nav, .topbar,.chattools,.notifinject p').css('border-color','var(--lightdark)');
    $('input,textarea,.chatinfocall i,.heyoctacore,.closenotif,.notifdash,.recscontent > div,.appbox').css('background','var(--lightdark)');  
    $('.heymsg').find('input').css('background','none');
    $('h4,h6,p,.options span,i').css('color','#ccc');
    $('.msgleft p').css({'background':'#444','color':'#eee'});
    $('.msgright p').css('color','#fff');
    $('.appbox h4').css({'color':'#aaa'});
    localStorage.darkmod = 1; 
    localStorage.darkcheck = 1;
    $('.addedstyles').html('.contactbox:hover,.notifinject p:hover{background:var(--lightdark)}');
}       
function undarkMode() {
    $('nav, .homeapp, .messengerapp, .settingsbox, .container,.typebox,.closedapp,.chattools,.chatinfo,.appwindow,.startify,.notifdiv,.addreccont').css('background',''); 
    $('nav, .topbar,.chattools,.notifinject p').css('border-color','');
    $('input,textarea,.chatinfocall i,.heyoctacore,.closenotif,.notifdash,.recscontent > div,.appbox').css('background','');
    $('h4,h6,p,.options span,i').css('color','');
    $('.msgleft p').css({'background':'','color':''});
    $('.msgright p').css('color','');
    $('.appbox h4').css({'color':''});
    localStorage.darkmod = 0;
    localStorage.darkcheck = 0;
    $('.addedstyles').html('.contactbox:hover{background:#f6f6f6}');
}    
if(localStorage.darkmod == 1) { darkMode() } 
if(localStorage.darkcheck == 1) { $('.darkmode input').prop("checked", true);}   if($('.darkmode input').prop("checked") == true) {    
    darkMode();
}
     
         
//Secret API 
secretbtn.on('click', function() { 
    if(secretbtn.prop("checked") == true) {
        $('<link href="css/firefly.css" rel="stylesheet"/>').appendTo('head');
        account.trigger('click');
        apps.fadeOut(200);
        setTimeout(function() {secretapi.fadeIn(300)},300);
        $('.secretcont').on('mouseover', function() {
           $(this).css({'top':'0','opacity':'1'}); 
        });
    } 
    else {  
        secretapi.fadeOut(300);
        setTimeout(function() {apps.fadeIn(200)},300);
        $('.secretcont').css({'top':'-30px','opacity':'0'});
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
    localStorage.profbirth = $('.profbirth').val();
    $(this).html('Changes Saved!');
    setTimeout(function() {$('.saveprofile').html('Save Changes')},1500);
    fullnamefill.html(localStorage.profname);  
    firstnamefill.html(localStorage.firstname);
    $('.tempcont h6').html(localStorage.profplace);
    $('.profname').val(localStorage.profname);
    $('.profplace').val(localStorage.profplace);    
    $('.profjob').val(localStorage.profjob); 
    $('.profemail').val(localStorage.profemail);
    $('.placefill').html(localStorage.profplace);
    $('.emailfill').html(localStorage.profemail);
    $('.jobfill').html(localStorage.profjob);
    $('.birthfill').html(localStorage.profbirth);
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
    $('.placefill').html('Not Specified');
}     
else {  
    $('.tempcont h6').html(localStorage.profplace);
    $('.profplace').val(localStorage.profplace);
    $('.placefill').html(localStorage.profplace);
}    
if(typeof localStorage.profjob == 'undefined' || typeof localStorage.profjob == null) {     
    $('.profjob').attr('placeholder','Enter a skill or job');
    $('.jobfill').html('Not Specified');
}  
else {
    $('.profjob').val(localStorage.profjob);
    $('.jobfill').html(localStorage.profjob);
}    
if(typeof localStorage.profemail == 'undefined' || typeof localStorage.profemail == null) {     
    $('.profemail').attr('placeholder','Enter an email');
    $('.emailfill').html('Not Specified');
}  
else {
    $('.profemail').val(localStorage.profemail);
    $('.emailfill').html(localStorage.profemail);
}
if(typeof localStorage.profbirth == 'undefined' || typeof localStorage.profbirth == null) {     
    $('.profbirth').attr('placeholder','Date of birth');
    $('.birthfill').html('Not Specified');
}  
else {
    $('.profbirth').val(localStorage.profbirth);
    $('.birthfill').html(localStorage.profbirth);
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
    setTimeout(function() { 
        if(notifdiv.is(":hover")) {}
        else { notifdiv.css({'top':'-140px'}) } 
    },4000);
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
    notifdash.fadeIn();
});    
notifdiv.on('click', function() {
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
 weathercityy.on('change', function() {
      localStorage.weathercity = weathercityy.val();
      weathercityy.val(localStorage.weathercity);
      var notifmsg = $('<p>Your city for the weather has been set.</p>');
      dropNotif(notifmsg);
 });
if(typeof localStorage.weathercity == 'undefined' || typeof localStorage.weathercity == null) {
    localStorage.weathercity = 'montreal';
    weathercityy.val(localStorage.weathercity);
}   
else {
    weathercityy.val(localStorage.weathercity); 
}     
     
   
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
    $(':root').css('--color','#6c33fd');
    $('.logo, .octacoremsg img, .appbox img,.constnotif img, .msgleft > img,.heylogo').attr('src','images/purplogo.png');
    localStorage.logo = 'images/purplogo.png';
    localStorage.themecolor = $(':root').css('--color');
    $('[rel=icon]').attr('href','images/purplogo.png');
    $('.fullnamefill').html('Uriel Bitton');    
    $('.placefill').html('Montreal, Canada');  
    $('.jobfill').html('App Developer');
    $('.emailfill').html('urielas@hotmail.com');
    $('.birthfill').html('October 01, 1991');
    $('.profname').val('Uriel Bitton'); 
    $('.profplace').val('Montreal, Canada');     
    $('.profjob').val('App Developer');     
    $('.profemail').val('urielas@hotmail.com');
    $('.profbirth').val('October 01, 1991');
    //save to localstorage
    localStorage.profname = $('.profname').val();
    var namearr = $('.profname').val().split(" ");
    localStorage.firstname = namearr[0];
    localStorage.profplace = $('.profplace').val();
    localStorage.profjob = $('.profjob').val();
    localStorage.profemail = $('.profemail').val();
    localStorage.profbirth = $('.profbirth').val();
    localStorage.weathercity = 'Montreal';
    weathercityy.val(localStorage.weathercity);
    //change automatically profile picture for admin   
    localStorage.profpic = 'images/uriel.jpg';
    $('.profpic').css('background-image','url('+localStorage.profpic+')');
    $('.tempcont img,.account img,.msgright img').attr('src',localStorage.profpic);
    $('.profpic').css('background-image','url('+localStorage.profpic+')');
    contgen.append($('<div class="msg msgleft"><img src="images/logo.png"/><p>Hello admin, welcome to Octacore. What can I do for you?</p></div>'));
    container.animate({scrollTop: container.prop('scrollHeight')});       
    $('.changeprofpic span i').html('Change Profile Picture');
    setTimeout(function() {settingsbox.css('top','-100%')},500)
}   
//load blu logo from memory
if(typeof localStorage.logo == 'undefined' || typeof localStorage.logo == null) {
    $('.logo, .octacoremsg img, .appbox img,.constnotif img, .msgleft > img').attr('src','images/logo.png');
    $('[rel=icon]').attr('href','images/logo.png');
}     
else {  
    $('.logo').attr('src',localStorage.logo);
    $('.logo, .octacoremsg img, .appbox img,.constnotif img, .msgleft > img,.heylogo').attr('src',localStorage.logo);
    $('[rel=icon]').attr('href',localStorage.logo);
}    
      
//set color picker color to theme color
$('.colorpicker').on('change', function() {
    $(':root').css('--color',$(this).val());
    localStorage.themecolor = $(this).val();
});  
if(typeof localStorage.themecolor == 'undefined' || typeof localStorage.themecolor == null) {
    $('.colorpicker').attr('value','#ff3b30'); 
}    
   
//set gradcolors from localstorage
  
if(typeof localStorage.gradcolor1 == 'undefined' || typeof localStorage.gradcolor1 == null) {
    gradcolor1 = '';
}   
else {
     gradcolor1 = localStorage.gradcolor1;
}    
if(typeof localStorage.gradcolor2 == 'undefined' || typeof localStorage.gradcolor2 == null) {
    gradcolor2 = ''; 
} 
else {
    gradcolor2 = localStorage.gradcolor2;
}    
    
//set gradient background chatapp 
$('.gradpicker1').on('change', function() {
    gradcolor1 = $(this).val();
    localStorage.gradcolor1 = gradcolor1;
});  
$('.gradpicker2').on('change', function() {
    gradcolor2 = $(this).val();
    localStorage.gradcolor2 = gradcolor2;
});      
$('.applygrad').on('click', function() {
    chatapp.css({'background':'linear-gradient(180deg, '+gradcolor1+' 0%, '+gradcolor2+' 100%)','background-position':'100% 150%','background-size':'100% 150%','background-attachment':'fixed'});
    notifmsg = $('<p>The gradient background color was successfully set.</p>')
    dropNotif(notifmsg);
    localStorage.chatbg = 'linear-gradient(180deg, '+gradcolor1+' 0%, '+gradcolor2+' 100%)';
    localStorage.chatbg2 = '100% 150%'; 
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
    
    //live notifs here
    if(firstmorn == true) {
    if($('.digital-clock').html() == '11:00 am') {
        var aimsg = '<p>Good morning '+localStorage.firstname+', here\'s what\'s new this morning, <a href="https://www.bbc.com/news/world">Click here</a><br>The weather right now:  <span class="addweather"></span></p>';
        aiSendMsg(aimsg);
        var notifmsg = $('<p>Good morning '+localStorage.firstname+', here\'s what\'s new this morning, <a href="https://www.bbc.com/news/world">Click here</a><br>The weather right now:  <span class="addweather"></span></p>'); 
        dropNotif(notifmsg);
        $('.notifs .addweather').load('https://api.openweathermap.org/data/2.5/weather?q=montreal&mode=html&appid=4a5344b7f84ba5c5c620525315413734');   
        container.animate({scrollTop: container.prop('scrollHeight')});
        firstmorn = false;
    }
    }
    if(firstnoon == true) {
    if($('.digital-clock').html() == '12:00 pm') {
        notifmsg = $('<p>Good afternoon '+localStorage.firstname+', How are you doing?</p>');
        dropNotif(notifmsg);
        var aimsg = '<p>Good afternoon '+localStorage.firstname+', How are you doing?</p>';
        aiSendMsg(aimsg);
        firstnoon = false;
    }   
    }    
    if(firsteven == true) {
    if($('.digital-clock').html() == '09:00 pm') {
        var aimsg = '<p>Good evening '+localStorage.firstname+', it is '+displayTime(date)+'. Here\'s the latest movies on netflix. Enjoy! <a href="https://www.whats-on-netflix.com/whats-new/">Latest movies</a></p>';
        aiSendMsg(aimsg);
        var notifmsg = $('<p>Good evening '+localStorage.firstname+', it is '+displayTime(date)+'. Here\'s the latest movies on netflix. Enjoy! <a href="https://www.whats-on-netflix.com/whats-new/">Latest movies</a></p>');
        dropNotif(notifmsg);
        container.animate({scrollTop: container.prop('scrollHeight')}); 
        firsteven = false;
    }  
    }
    if(firstlate == true) {
    if($('.digital-clock').html() == '03:00 am') {
        var aimsg = '<p>It\'s getting late, let\'s call it a night?</p>';
        aiSendMsg(aimsg);
        notifmsg = $('<p>It\'s getting late, let\'s call it a night?</p>');
        dropNotif(notifmsg);
        container.animate({scrollTop: container.prop('scrollHeight')});
        firstlate = false;
    }
    } 
    //trigger dark mode after 12am and before 6am
    if($('.digital-clock').html() == '12:00 am') {
        $('.darkmode input').prop( "checked", true );
        darkMode();
    }
    //turn off darkmode after 6am
    if($('.digital-clock').html() == '06:00 am') {
        $('.darkmode input').prop( "checked", false );
        undarkMode();
    }
      
         
}  
clockUpdate(),setInterval(clockUpdate,1e3);
    
//turn on darkmode between 12am and 6am
if(thetime >= 0 && thetime < 6) {
    $('.darkmode input').prop( "checked", true );
    darkMode();
}     
else if(thetime > 6) {
    $('.darkmode input').prop( "checked", false );
    undarkMode();
}     

    
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
$(document).on('click','.alarmclear,.dismiss', function() {
    $(this).parent().css('opacity','0');
    $(this).parent().remove();
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
cmsettings.on('click', function() {
    account.trigger('click');
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
        notifmsg = $('<p><i class="material-icons ringing">&#xe190;</i>Your alarm  is ringing<span class="dismiss">dismiss</span></p>');
        dropNotif(notifmsg);
    }         
});            
    
$(document).on('click','.dismiss', function() {
    $('#alarmaudio').remove();
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
      
//enable or disable notifications sounds
$('.soundbtn').on('click', function() {
    if($(this).prop('checked') == true) {
        $('audio').prop('muted',false);
        localStorage.sound = false;
    }
    else {
        $('audio').prop('muted',true);
        localStorage.sound = true;
    }
});   
//add sound setting to memory    
if($('.soundbtn').prop('checked') == true) {
    localStorage.sound = false;
}  
else {
    localStorage.sound = true;
}    
  
 
//move chat image uploder to mobile tools - if less than 550px 
function moveimgUploader(match) {
  if (match.matches) { // If media query matches
    $('.chatimguploader').appendTo('.mobtools');
  } else {
    $('.chatimguploader').appendTo('.toolsboximg');
  }
}
var match = window.matchMedia("(max-width: 720px)");
moveimgUploader(match); 
match.addListener(moveimgUploader);
   
//set bg chatapp img 
$('.bgcolor').on('click', function() {
    chatapp.css({'background-image':'url(https://picsum.photos/1400/3000)','animation':'none','background-position':'center','background-size':'cover','background-attachment':'fixed'});
});        
        
   
//emoji picker action
var chatemojis = reactions.find('i').clone();    
emojipicker.on('click', function() {
    if(emojiclick == false) {
        emojidiv.fadeIn(200);
        typebox.css('height','300px');
        chatemojis.appendTo(emojidiv);
        emojiclick = true;
        $('.closetypebox').css('opacity','1');
        suggestdiv.fadeOut(200);
    }
    else {
        emojidiv.fadeOut(200);
        typebox.css('height','120px');
        chatemojis.detach();
        emojiclick = false;
        $('.closetypebox').css('opacity','0');
    }
});    
    
//chatimguploader icon closes share and emojis tools and opens this one         
$('.chatimguploader').on('click', function() {
    chatemojis.detach();
    emojiclick = false;
    $('.closetypebox').css('opacity','1');
});     
   
$('.closetypebox').on('click', function() {
    typebox.css('height','120px');
    $(this).css('opacity','0'); 
    emojiclick = false;
});       
     
      
     
   
//me sending msgs function - everytime I send msg, i call this function and send the message as parameters
profimg = localStorage.profpic;    
function meSendMsg(mymsg) {
    if(typeof localStorage.profpic == 'undefined' || typeof localStorage.profpic == null) {profimg='images/prof.png'}
    else {
        profimg = localStorage.profpic;
    }
    contgen.append($('<div class="msg msgright lastmsg"><img src="'+profimg+'"/>'+mymsg+'<small>'+digitalclock.html()+'</small></div>'));
    container.animate({scrollTop: container.prop('scrollHeight')});
}     

$(document).on('click', '.emojidiv i', function() {
    var emoji = $(this).clone();
    var emojiclass = emoji.attr('class');
    $('.messenger').val(function(index, val) {
        return val + '<i class="'+emojiclass+'"></i>';
    });
    
});      
     
//suggested things to ask AI
var suggestclick = 0;    
suggestbtn.on('click', function() {
    if(suggestclick == 0) {
        suggestdiv.fadeIn(200);
        emojidiv.fadeOut(200);
        $('.closetypebox').css('opacity','1');
        typebox.css('height','300px');
        $('.suggestdiv').html('<h6>Things you can ask Octacore</h6><p>What\'s the weather today</p><p>What time is it?</p><p>Set a reminder</p><p>Set an alarm</p><p>Activate darkmode</p><p>Send a picture</p><p>Play some music</p>');
        suggestclick = 1;
    }
    else {
        suggestdiv.fadeOut(200);
        typebox.css('height','');
        $('.closetypebox').css('opacity','0');
        suggestclick = 0;
    }
    
});    
$(document).on('click', '.suggestdiv p', function() {
    messenger.val($(this).html());
});  
    
     
//chatback btn
chatback.on('click', function() {
    chatapp.fadeOut(300);
    setTimeout(function() {
        messengerapp.fadeIn(300);    
    },300)
});    
$('.contactback').on('click', function() {
    messengerapp.fadeOut(300);
    setTimeout(function() {
        homeapp.fadeIn(300);    
    },300)
});     
         
      
//slide down chat name info div
var chatinfoclick = false;    
$('.chatnameinfo').on('click', function() {
    if(chatinfoclick == false) {
        chatinfo.css({'top':'60px'});
        $(this).css({'color':'var(--color)','transform':'rotate(180deg)','top':'-10px'});
        chatinfoclick = true;
    }
    else {
        chatinfo.css({'top':''});
        $(this).css({'color':'','transform':'rotate(0deg)','top':''});
        chatinfoclick = false;
    }
});    
    
//set personal profile theme color
if(typeof localStorage.themecolor == 'undefined' || typeof localStorage.themecolor == null) {
    $('.personaltheme').css('background','#fafafa');
}
else {
    $('.personaltheme').css('background',localStorage.themecolor);
}    
    
      
/***Startify App***/    
$('.startifyapp').on('click', function() {
    $('.homeapp, .apps').fadeOut();
    $('.startifycont,.startdaynav,.startify,.heyrecommend').fadeIn();
    $('.chatinfo').css('top','-100vh');
    $('.startifygrad').html('<span class="backhome"><i class="fas fa-angle-left"></i>Home</span>');
    $('.tech-slide').html('<img src="images/tech.jpg"/>');
    $('.music-slide').html('<img src="images/music.jpg"/>'); 
    $('.video-slide').html('<img src="images/videos.jpg"/>');
    $('.news-slide').html('<img src="images/news.jpg"/>'); 
    $('.activity-slide').html('<img src="images/activity.jpg"/>');
    $('.sports-slide').html('<img src="images/sports.jpg"/>'); 
    $('.def-slide').html('<img src="images/def-app.jpg"/>');
});       
 
//back home from startify
$(document).on('click','.backhome', function() {
    $('.startify').fadeOut();
    setTimeout(function() { $('.homeapp, .apps').fadeIn() },10)
});       
     
//heyoctacore click 
heyoctacore.on('click', function() {
    openHeyOcta();   
});      
        
//open heyoctacore func
function openHeyOcta() {
    if(heylock == false){
    $('.heyoctacore').css({'height':'450px','width':'70%'});
    heymsg.fadeIn(300); $('.heystyles').html('.heyoctacore:hover{background:#f9f9f9;}.heyoctacore:hover h5{color:var(--color)}'); 
    $('.heyloader').fadeIn(300);    
    $('.startifygrad').addClass('startifyanimate');
    $('.closehey').fadeIn(300); 
    $('.heyoctacore h5').css('text-align','left'); 
    $('.swipecont').trigger('swipe');    
    heylock = true;      
    setTimeout(function() {
        $('.heyloader').fadeOut(300);
        $('.heytitle').css('opacity','1');
    },3000)     
    }
}    
$('.closehey').fadeOut(0);    
var heylock = false;
//close hey octa click    
$('.closehey').on('click', function() {
    closeHeyOcta();
});     
//close hey octa func
function closeHeyOcta() {
    $('.heyoctacore').css({'height':'40px','width':'70%'});
    $('.heymsg,.closehey').fadeOut(300); 
    $('.heystyles').html('.heyoctacore:hover{background:var(--color);}.heyoctacore:hover h5{color:#fafafa}');
    $('.startifygrad').removeClass('startifyanimate');
    $('.heyloader').fadeIn();
    setTimeout(function() {heylock = false;},500)
    $('.heyoctacore h5').css('text-align','center');
    setTimeout(function() {
        $('.heyloader').fadeOut();
    },3000)
}    
   
       
       
    
//slick objects
$('.swipecont').slick({prevArrow:false,nextArrow:false,centerMode: true,autoplay:true,pauseOnHover:false,asNavFor:'.heytitle',infinite:true});   
$('.lifecont,.travelcont,.techcont,.activitycont,.musiccont,.videoscont,.newscont,.sportscont').slick({prevArrow:false,nextArrow:false,variableWidth: true,infinite:false});      
     
$('.heytitle').slick({prevArrow:false,nextArrow:false,centerMode: true,autoplay:true,pauseOnHover:false,asNavFor:'.swipecont',infinite:true,fade: true});    
         
      
      
//time of day var intiialize
var timeofday = '';    
if(thetime > 6 && thetime <= 11) {
    timeofday = 'morning';
}    
else if(thetime >= 12 && thetime < 18) {
    timeofday = 'afternoon';
}    
else {
    timeofday = 'evening';
}    
$('.timeofday').html(timeofday);     
       
 
/*    
//speech recognition JS
if (annyang) {
    // Let's define a command.
    var commands = {
    'open start app': function() { startifyapp.trigger('click'); },
    'hey octa core': function() { openHeyOcta(); },
    'close octa core': function() { closeHeyOcta(); },
    'open notifications': function() { notifs.trigger('click'); },
    'close notifications': function() { closenotif.trigger('click'); },
    'open settings': function() { settingsbox.css('top','0'); setclick = 0; },
    'close settings': function() { settingsbox.css('top','-100%'); setclick = 1; },
    'dark mode': function() { darkMode(); $('.darkmode input').prop( "checked", true );},
    'dark mode off': function() { undarkMode(); $('.darkmode input').prop( "checked", false );},
    'weather': function() { 
        var notifmsg = $('<p>Here\'s the weather right now:  <span class="addweather"></span></p>'); 
        dropNotif(notifmsg);
        $('.notifs .addweather').load('https://api.openweathermap.org/data/2.5/weather?q=montreal&mode=html&appid=4a5344b7f84ba5c5c620525315413734');
    },
    'home': function() { apps.fadeOut(200);homeapp.fadeIn(300);},
    'test': function() { alert('Speech Recognition Active') },
    'chat now': function() { apps.fadeOut();homeapp.fadeOut();messengerapp.fadeOut();chatapp.fadeIn(); },
    'send reaction': function() {bonusicon.trigger('click'); }
    }; //end of commands

    // Add our commands to annyang
    annyang.addCommands(commands);


    // Start listening if speech icon clicked
    var speechclick = true;
    $('.speechicon').on('click', function() {
        if(speechclick == true) {
            $(this).css({'background':'linear-gradient(135deg, rgba(105,5,255,1) 0%, rgba(189,0,251,1) 100%)','-webkit-background-clip':'text','-webkit-text-fill-color':'transparent'});
            speechclick = false;
            annyang.start();
        }
        else {
            $(this).css({'background':'#aaa','-webkit-background-clip':'text','-webkit-text-fill-color':'transparent'});
            speechclick = true;
            annyang.pause();
        }
    }); 
    
} 
*/ 
    
    
//on scroll down of startifycont adjust startday btn  

$('.startifycont').on('scroll', function() {
    if($(this).scrollTop() > 0) {
        $('.startdaytitle').css({'height':'0','opacity':'0'});
        startdaybtn.css('padding','10px 20px');
        $('.startifycont').css('margin-top','0');
        $('.startdaynav').css('top','-30px'); 
        $('.startdaybtn').css('font-size','16px');
    }
    else {
        $('.startdaytitle').css({'height':'','opacity':'1'});
        startdaybtn.css('padding','20px 30px');
        $('.startifycont').css('margin-top','');
        $('.startdaynav').css('top',''); 
        $('.startdaybtn').css('font-size','');
    }
}); 
 
//startday container
startdaybtn.on('click', function() {
    startday.css('bottom','0');
});    
$('.closestartday').on('click', function() {
    startday.css('bottom','-100vh');
});    
$('.chooseday').slick({prevArrow:false,nextArrow:false,variableWidth: true});      
$('.chooseday .startstudy').on('click', function() {
    $('.startdaygen').html('<h6>Here\'s what i recommend for today</h6><iframe src="comps/timeline.html"></iframe><div class="spacer"></div>');
});      
     
      
//add recommend btn
$('.addrectitle').on('click', function() {
    $('.addreccont').css('bottom','70px');
});    
   
//add recommendation image upload
var addimgurl = '';    
document.getElementById('addrecimg').addEventListener('change', addRecImg, true);
function addRecImg(){
    var file = document.getElementById("addrecimg").files[0];
    var reader = new FileReader();
    reader.onloadend = function(){
        $('.addpreview').find('img').remove();
        $('.addpreview').find('i').css({'color':'white'});
        $('.addpreview').append('<img src="'+reader.result+'"/>').css('border','none');  
        addimgurl = reader.result; 
    }  
    if(file){
        reader.readAsDataURL(file);
    }
}     
       
//add recommendation to app
$('.addrecbtn').on('click', function() { 
    addrectxt = $('.addrectxt').val();
    $('.addreccont').css('bottom','-55%');
    $('.recselect option').on('click', function() { $(this).attr('selected'); });
    if($('.recselect').val() == 1){
        $('<div class="slick-slide"><img src="'+addimgurl+'"/><h5>'+addrectxt+'</h5></div>').appendTo('.lifecont .slick-track');
        localStorage.lifecont = addimgurl;
        localStorage.addrectxt1 = addrectxt;
    }
    else if($('.recselect').val() == 2){
        $('<div class="slick-slide"><img src="'+addimgurl+'"/><h5>'+addrectxt+'</h5></div>').appendTo('.travelcont .slick-track');
        localStorage.travelcont = addimgurl;
        localStorage.addrectxt2 = addrectxt;
    }
    else if($('.recselect').val() == 3){
        $('<div class="slick-slide"><img src="'+addimgurl+'"/><h5>'+addrectxt+'</h5></div>').appendTo('.techcont .slick-track');
        localStorage.techcont = addimgurl;
        localStorage.addrectxt3 = addrectxt;
    }
    else if($('.recselect').val() == 4){
        $('<div class="slick-slide"><img src="'+addimgurl+'"/><h5>'+addrectxt+'</h5></div>').appendTo('.activitycont .slick-track');
        localStorage.activitycont = addimgurl;
        localStorage.addrectxt4 = addrectxt;
    }
    else if($('.recselect').val() == 5){
        $('<div class="slick-slide"><img src="'+addimgurl+'"/><h5>'+addrectxt+'</h5></div>').appendTo('.musiccont .slick-track');
        localStorage.musiccont = addimgurl;
        localStorage.addrectxt5 = addrectxt;
    }
    else if($('.recselect').val() == 6){
        $('<div class="slick-slide"><img src="'+addimgurl+'"/><h5>'+addrectxt+'</h5></div>').appendTo('.videoscont .slick-track');
        localStorage.videoscont = addimgurl;
        localStorage.addrectxt6 = addrectxt;
    }
    else if($('.recselect').val() == 7){
        $('<div class="slick-slide"><img src="'+addimgurl+'"/><h5>'+addrectxt+'</h5></div>').appendTo('.sportscont .slick-track');
        localStorage.sportscont = addimgurl;
        localStorage.addrectxt7 = addrectxt;
    }
    else if($('.recselect').val() == 8){
        $('<div class="slick-slide"><img src="'+addimgurl+'"/><h5>'+addrectxt+'</h5></div>').appendTo('.newscont .slick-track');
        localStorage.newscont = addimgurl;
        localStorage.addrectxt8 = addrectxt;
    }  
    
});   
//close addrec btn      
$('.closeaddrec').on('click', function() {
    $('.addreccont').css('bottom','-55%');
});    
 
//call added recommendations from memory   
if(typeof localStorage.lifecont == 'undefined' || typeof localStorage.lifecont == null) {}
else {$('.lifecont .slick-track').append('<div class="slick-slide"><img src="'+localStorage.lifecont+'"/><h5>'+localStorage.addrectxt1+'</h5></div>');}
if(typeof localStorage.travelcont == 'undefined' || typeof localStorage.travelcont == null) {}
else {$('.travelcont .slick-track').append('<div class="slick-slide"><img src="'+localStorage.travelcont+'"/><h5>'+localStorage.addrectxt2+'</h5></div>');} 
if(typeof localStorage.techcont == 'undefined' || typeof localStorage.techcont == null) {}
else {$('.techcont .slick-track').append('<div class="slick-slide"><img src="'+localStorage.techcont+'"/><h5>'+localStorage.addrectxt3+'</h5></div>');}    
if(typeof localStorage.activitycont == 'undefined' || typeof localStorage.activitycont == null) {}
else {$('.activitycont .slick-track').append('<div class="slick-slide"><img src="'+localStorage.activitycont+'"/><h5>'+localStorage.addrectxt4+'</h5></div>');} if(typeof localStorage.musiccont == 'undefined' || typeof localStorage.musiccont == null) {}
else {$('.musiccont .slick-track').append('<div class="slick-slide"><img src="'+localStorage.musiccont+'"/><h5>'+localStorage.addrectxt5+'</h5></div>');} 
if(typeof localStorage.videoscont == 'undefined' || typeof localStorage.videoscont == null) {}
else {$('.videoscont .slick-track').append('<div class="slick-slide"><img src="'+localStorage.videoscont+'"/><h5>'+localStorage.addrectxt6+'</h5></div>');}   if(typeof localStorage.sportscont == 'undefined' || typeof localStorage.sportscont == null) {}
else {$('.sportscont .slick-track').append('<div class="slick-slide"><img src="'+localStorage.sportscont+'"/><h5>'+localStorage.addrectxt7+'</h5></div>');} 
if(typeof localStorage.newscont == 'undefined' || typeof localStorage.newscont == null) {}
else {$('.newscont .slick-track').append('<div class="slick-slide"><img src="'+localStorage.newscont+'"/><h5>'+localStorage.addrectxt8+'</h5></div>');}     
     
//click on indiv category recommendation box
$('.startifycont').find('.slick-slide').on('click', function() {
    rectitle = $(this).find('h5').html();
    recimg = $(this).find('img').attr('src');
    $('.recommendscont,.startdaynav,.heyrecommend').fadeOut();
    $('.recspage').html('<img class="recscontbanner" src="'+recimg+'"/><h4>'+rectitle+'</h4><small class="recsgenbtn">Generate More</small><div class="recscontent"></div>');
    setTimeout(function() { $('.recspage').fadeIn() },10)
    $('.startifygrad').html('<span class="backstartify"><i class="fas fa-angle-left"></i>Startify</span>');
});    
        
//back btn to startify app     
$(document).on('click','.backstartify', function() {
    setTimeout(function() { $('.recommendscont').fadeIn(); },10)
    $('.recspage').fadeOut();
    $('.startifygrad').html('<span class="backhome"><i class="fas fa-angle-left"></i>Home</span>');
    $('.heyrecommend').fadeIn();
    $('.startdaynav').fadeIn();
});          
//vacation app box      
$('.vacabox').on('click', function() {
    vacaPage();
    $('.heyloader').css('visibility','hidden');  
});       
  
$(document).on('click','.recsgenbtn', function() { vacaPage(); });    
function vacaPage() {
    //get size of 2d array
    Object.size = function(vacations) {
    var size = 0, key;
    for (key in vacations) {
        if (vacations.hasOwnProperty(key)) size++;
    }
    return size;
    };
    vacasize = Object.size(vacations);
    
    var rand1 = (Math.floor(Math.random() * vacasize) + 0);
    var rand2 = (Math.floor(Math.random() * vacasize) + 0);
    var rand3 = (Math.floor(Math.random() * vacasize) + 0);
    var rand4 = (Math.floor(Math.random() * vacasize) + 0);
    $('.recscontent').addClass('vacacontent');
    $('.recscontent').html(`<div><img src="`+vacations[rand1][4]+`"/><div class="vacatxtcont"><h4>`+vacations[rand1][0]+`, <span>`+vacations[rand1][1]+`</span></h4><div class="clear"></div><h6><i class="fas fa-water"></i>`+vacations[rand1][2]+`</h6><h6><i class="fas fa-fire"></i>`+vacations[rand1][3]+`</h6><h6><i class="fas fa-dollar-sign"></i>`+vacations[rand1][5]+`</h6></div></div>
    <div><img src="`+vacations[rand2][4]+`"/><div class="vacatxtcont"><h4>`+vacations[rand2][0]+`, <span>`+vacations[rand2][1]+`</span></h4><div class="clear"></div><h6><i class="fas fa-water"></i>`+vacations[rand2][2]+`</h6><h6><i class="fas fa-fire"></i>`+vacations[rand2][3]+`</h6><h6><i class="fas fa-dollar-sign"></i>`+vacations[rand2][5]+`</h6></div></div>
    <div><img src="`+vacations[rand3][4]+`"/><div class="vacatxtcont"><h4>`+vacations[rand3][0]+`, <span>`+vacations[rand3][1]+`</span></h4><div class="clear"></div><h6><i class="fas fa-water"></i>`+vacations[rand3][2]+`</h6><h6><i class="fas fa-fire"></i>`+vacations[rand3][3]+`</h6><h6><i class="fas fa-dollar-sign"></i>`+vacations[rand3][5]+`</h6></div></div>
    <div><img src="`+vacations[rand4][4]+`"/><div class="vacatxtcont"><h4>`+vacations[rand4][0]+`, <span>`+vacations[rand4][1]+`</span></h4><div class="clear"></div><h6><i class="fas fa-water"></i>`+vacations[rand4][2]+`</h6><h6><i class="fas fa-fire"></i>`+vacations[rand4][3]+`</h6><h6><i class="fas fa-dollar-sign"></i>`+vacations[rand4][5]+`</h6></div></div>
    <h5>Find a Destination</h5><script async src="https://cse.google.com/cse.js?cx=002959026916917152546:myhtapdissz"></script><div class="gcse-search"></div><div class="spacerl"></div>`);
}     

//recscontent on scroll down - hide top banner img
$(document).on('scroll','.recscontent', function() {
    if($(this).scrollTop() > 0) {
         
    }  
    else {
        
    }
});    
     
//youtube app box
$('.youtubebox').on('click', function() {
    youtubePage();
    $('.heyloader').css('visibility','hidden');    
});     
function youtubePage() {
    $('<script async src="https://cse.google.com/cse.js?cx=002959026916917152546:vrzdriih8vf"></script><div class="gcse-search"></div>').appendTo('.recscontent');
}  
    
              
     
    
    
    
    
     
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
//has to be last line    
//make all links external
$('a').not('#dllink').attr('target','_blank');     
    
});
