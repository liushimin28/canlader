var myDate= new Date();
var year=myDate.getFullYear();//今天的年份
var month=myDate.getMonth()+1;//今天的月份
var date=myDate.getDate();//今天的日期
var day=myDate.getDay();//今天的星期
    if(day==0){
      day=7;
    }
var day_length=junge_day(year,month);
 function junge_day(objy,objm){   //根据月份获取该月天数
  var day_length=30;
   if(objm==4 || objm==6 || objm==9 || objm==11){      
 	 	var day_length=30;
 	 }
 	 else if(objm==2&&((objy%4==0&&objy%100!=0)||(objy%400==0))){
 	    var day_length=29;
 	}
 	else if(objm==2){
 		var day_length=28;
 	}
 	else {
 		var day_length=31;
 	}
  return day_length;
  } 

function set_select(){                 //实现年月的下拉选择框
   for (var j=0;j<150;j++){
        var select_html=document.createElement("option");
        select_html.value=j+1900;
        select_html.id="year_"+(j+1900);
        if(j+1900==year){
          select_html.selected="selected";
        }
       select_html.innerHTML=j+1900+"年";
        document.getElementById("select_year").appendChild(select_html);
        }
   for (var j=1;j<=12;j++){
    var select_month=document.createElement("option");
    select_month.value=j;
    select_month.id="month_"+j;
    if(j==month){
          select_month.selected="selected";
        }
    select_month.innerHTML=j+"月";
    document.getElementById("select_month").appendChild(select_month);
   }
}

function goback_today(){       //点击回到今天
     document.getElementById("year_"+year).selected="selected";
     document.getElementById("month_"+month).selected="selected";
     t_month();
     getdate(year,month,date,day);
     for(var l=1;l<=7;l++){
        for(var w=0;w<=5;w++){
          document.getElementById("day"+w+"_"+l).style.border="none";
        }
      } //清空之前的边框
}
function getfocus(obj){   //点击实现高亮
 var y = parseInt(document.getElementById("select_year").value);
   var mo = parseInt(document.getElementById("select_month").value);
   var dainner= document.getElementById(obj).innerText;
   var da=dainner.substring(0,2);
   var we=parseInt(obj.substring(5));

  for(var l=1;l<=7;l++){
        for(var w=0;w<=5;w++){
          document.getElementById("day"+w+"_"+l).style.border="none";
        }
      } //清空之前的边框
         getdate(y,mo,da,we);
  document.getElementById(obj).style.border="3px solid #FFBB00";
}

function getdate(year,month,date,day){     //日历右侧显示信息
  var t_info=document.getElementById("t_info");
  var weekday;
   if (day == 7)
        weekday = "星期日";
    else if (day == 1)
        weekday = "星期一";
    else if (day == 2)
        weekday = "星期二";
    else if (day == 3)
        weekday = "星期三";
    else if (day == 4)
        weekday = "星期四";
    else if (day == 5)
        weekday = "星期五";
    else if (day == 6)
        weekday = "星期六";
    t_info.innerHTML='<p class="ye_mo_da">'+year+'-'+month+'-'+date+'</p><p class="weekdays">'+weekday+'</p><span id="t_date">'+date+'</span>';
  }
 

 function vocation(month,date){    //国际节日
   var voc=""
  if(month==1&&date==1){
   voc="元旦";
  }
  if(month==2&&date==14){
     voc="情人节";
  }
  if(month==3&&date==8){
   voc="妇女节";
  }
    if(month==4&&date==1){
       voc="愚人节";
    }
    if(month==5&&date==1){
        voc="劳动节";
    }
    if(month==6&&date==1){
        voc="儿童节";
    }
    if(month==7&&date==1){
        voc="建军节";
    }
    if(month==8&&date==1){
        voc="建党节";
    }
    if(month==9&&date==10){
        voc="教师节";
    }
    if(month==10&&date==1){
        voc="国庆节";
    }
    if(month==12&&date==25){
       voc="圣诞节";
    }

    return voc;
  }
 
 

function getthroday(){   //计算天数差函数
   var y = parseInt(document.getElementById("select_year").value);
   var mo = parseInt(document.getElementById("select_month").value);
   var sum=0;
    for(var l=1;l<=7;l++){
        for(var w=0;w<=5;w++){
          document.getElementById("day"+w+"_"+l).innerText="";
          document.getElementById("day"+w+"_"+l).style.backgroundColor="#fff";
          document.getElementById("day"+w+"_"+l).style.color="#444";
          document.getElementById("day"+w+"_"+l).style.border="0";
        
        }
      }    //清空<li>内容

   if(y<year)
   {
    for(var i=y; i<year;i++)
    {    
    for(var j=mo;j<=12;j++)
    {
      
      if(i==year&&j==month){
       break;
     }
      var GetDay=[i,j];
      var sum=sum+junge_day(GetDay[0],GetDay[1]);
      if(j==12)
      {
        i=i+1;
        j=0;
      }
    }
  }
    
    var week_num=0;                  //第i天位于第几周
    for(var k=1;k<=junge_day(y,mo);k++)
    {
      var i_week=(k-sum+date-1)%7;   //计算得出星期几i_week
      if(i_week<=0)
      {
        i_week=i_week+7;
      }
      if(i_week==1&&k!=1)
      {
      week_num++;
      }
      var array=[k,i_week,week_num,mo,y];
 var vocat=vocation(mo,k);
      if (vocat!=""){
        var botton=vocat;
      }
      else {botton=GetLunarDay(array[4], array[3], array[0]);}
       var position= document.getElementById("day"+array[2]+"_"+array[1]);
          position.innerHTML=k+"<br />"+botton;
          if(array[0]==date){
            position.style.border="3px solid #FFBB00";
          }
          if(array[1]==6||array[1]==7)
          {
            position.style.color="#E02D2D";
          }
     }
   }

else if(y>year){
  for(var i=y; i>=year;i--){    
    for(var j=(mo-1);j<=12;j--){
     if(i==year&&j==month){
       break;
     }
      var GetDay=[i,j];
      var sum=sum+junge_day(GetDay[0],GetDay[1]);
      if(j==1){
        i=i-1;
        j=13;
      }
    }
  }
   var week_num=0;                     //第i天位于第几周
    for(var k=1;k<=junge_day(y,mo);k++){
      var i_week=(sum-date+k+1)%7+day+1;      //计算得出星期几i_week
      if(i_week>7){
        i_week=i_week-7;
      }
      if(i_week==1&&k!=1){
      week_num++;
      }
      var array=[k,i_week,week_num,mo,y];
       var vocat=vocation(mo,k);
      if (vocat!=""){
        var botton=vocat;
      }
      else {botton=GetLunarDay(array[4], array[3], array[0]);}
       var position= document.getElementById("day"+array[2]+"_"+array[1]);
          position.innerHTML=k+"<br />"+botton;
          if(array[0]==date){
            position.style.border="3px solid #FFBB00";
          }
          if(array[1]==6||array[1]==7)
          {
            position.style.color="#E02D2D";
          }
      }
    }
    else if(y==year){
      if(mo<month)
      {   
    for(var j=mo;j<month;j++)
    {
      var GetDay=[year,j];
      var sum=sum+junge_day(GetDay[0],GetDay[1]);
    }
  }
    
    var week_num=0;                  //第i天位于第几周
    for(var k=1;k<=junge_day(y,mo);k++)
    {
      var i_week=(k-sum+date-1)%7;   //计算得出星期几i_week
      if(i_week<=0)
      {
        i_week=i_week+7;
      }
      if(i_week==1&&k!=1)
      {
      week_num++;
      }
      var array=[k,i_week,week_num,mo,y];
      var vocat=vocation(mo,k);
      if (vocat!=""){
        var botton=vocat;
      }
      else {botton=GetLunarDay(array[4], array[3], array[0]);}
       var position= document.getElementById("day"+array[2]+"_"+array[1]);
          position.innerHTML=k+"<br />"+botton;
          if(array[0]==date){
            position.style.border="3px solid #FFBB00";
          }
          if(array[1]==6||array[1]==7)
          {
            position.style.color="#E02D2D";
          }
     }
     if(mo>month){   
     for(var j=mo;j>month;j--){
      var GetDay=[year,(j-1)];
      var sum=sum+junge_day(GetDay[0],GetDay[1]);
  }
   var week_num=0;                     //第i天位于第几周
    for(var k=1;k<=junge_day(year,mo);k++){
      var i_week=(sum-date+k)%7+day;      //计算得出星期几i_week
      if(i_week>7){
        i_week=i_week-7;
      }
      if(i_week==1&&k!=1){
      week_num++;
      }
      var array=[k,i_week,week_num,mo,y];
       var vocat=vocation(mo,k);
      if (vocat!=""){
        var botton=vocat;
      }
      else {botton=GetLunarDay(array[4], array[3], array[0]);}
       var position= document.getElementById("day"+array[2]+"_"+array[1]);
          position.innerHTML=k+"<br />"+botton;
          if(array[0]==date){
            position.style.border="3px solid #FFBB00";
          }
          if(array[1]==6||array[1]==7)
          {
            position.style.color="#E02D2D";
          }
      }
     }
   }
  getdate(y,mo,date,i_week);
}





function t_month()                 //今天日期所在月的日历
{      
   var week_num=0;                   //第i天位于第几周
   for(var i=1;i<=day_length;i++){
      var i_week=(day+i-date)%7;   //计算得出星期几i_week
      if(i_week<=0){
        i_week=i_week+7;
      }
      if(i_week==1&&i!=1){
      week_num++;
      }
      var array=[i,i_week,week_num,month,year];
      var position= document.getElementById("day"+array[2]+"_"+array[1]);
          position.innerHTML=i+"<br />"+GetLunarDay(array[4], array[3], array[0]);
          if(array[1]==6||array[1]==7)
          {
            position.style.color="#E02D2D";
          }
      if(i==date){
        position.style.color="#fff";
        position.style.backgroundColor="#FFBB00";  
           //今天日期背景变色
      }
    }
}

  var CalendarData = new Array(100);   //获取农历信息
var lunarmo_length = new Array(12);
var lunardate = "一二三四五六七八九十";
var lunarmo = "正二三四五六七八九十冬腊";
var lYear, lMonth, lDay, TheDate;
CalendarData = new Array(0xA4B, 0x5164B, 0x6A5, 0x6D4, 0x415B5, 0x2B6, 0x957, 0x2092F, 0x497, 0x60C96, 0xD4A, 0xEA5, 0x50DA9, 0x5AD, 0x2B6, 0x3126E, 0x92E, 0x7192D, 0xC95, 0xD4A, 0x61B4A, 0xB55, 0x56A, 0x4155B, 0x25D, 0x92D, 0x2192B, 0xA95, 0x71695, 0x6CA, 0xB55, 0x50AB5, 0x4DA, 0xA5B, 0x30A57, 0x52B, 0x8152A, 0xE95, 0x6AA, 0x615AA, 0xAB5, 0x4B6, 0x414AE, 0xA57, 0x526, 0x31D26, 0xD95, 0x70B55, 0x56A, 0x96D, 0x5095D, 0x4AD, 0xA4D, 0x41A4D, 0xD25, 0x81AA5, 0xB54, 0xB6A, 0x612DA, 0x95B, 0x49B, 0x41497, 0xA4B, 0xA164B, 0x6A5, 0x6D4, 0x615B4, 0xAB6, 0x957, 0x5092F, 0x497, 0x64B, 0x30D4A, 0xEA5, 0x80D65, 0x5AC, 0xAB6, 0x5126D, 0x92E, 0xC96, 0x41A95, 0xD4A, 0xDA5, 0x20B55, 0x56A, 0x7155B, 0x25D, 0x92D, 0x5192B, 0xA95, 0xB4A, 0x416AA, 0xAD5, 0x90AB5, 0x4BA, 0xA5B, 0x60A57, 0x52B, 0xA93, 0x40E95);
lunarmo_length[0] = 0;
lunarmo_length[1] = 31;
lunarmo_length[2] = 59;
lunarmo_length[3] = 90;
lunarmo_length[4] = 120;
lunarmo_length[5] = 151;
lunarmo_length[6] = 181;
lunarmo_length[7] = 212;
lunarmo_length[8] = 243;
lunarmo_length[9] = 273;
lunarmo_length[10] = 304;
lunarmo_length[11] = 334;
function GetBit(m, n) {
    return (m >> n) & 1;
}
function exchange() {
    TheDate = (arguments.length != 3) ? new Date() : new Date(arguments[0], arguments[1], arguments[2]);
    var total, m, n, k;
    var isEnd = false;
     var lunarcont = TheDate.getYear();
      if (lunarcont < 1900) {
        lunarcont += 1900;
    }
    total = (lunarcont - 1921) * 365 + Math.floor((lunarcont - 1921) / 4) + lunarmo_length[TheDate.getMonth()] + TheDate.getDate() - 38;

    if (TheDate.getYear() % 4 == 0 && TheDate.getMonth() > 1) {
        total++;
    }
    for (m = 0; ; m++) {
        k = (CalendarData[m] < 0xfff) ? 11 : 12;
        for (n = k; n >= 0; n--) {
            if (total <= 29 + GetBit(CalendarData[m], n)) {
                isEnd = true; break;
            }
            total = total - 29 - GetBit(CalendarData[m], n);
        }
        if (isEnd) break;
    }
    lYear = 1921 + m;
    lMonth = k - n + 1;
    lDay = total;
    if (k == 12) {
        if (lMonth == Math.floor(CalendarData[m] / 0x10000) + 1) {
            lMonth = 1 - lMonth;
        }
        if (lMonth > Math.floor(CalendarData[m] / 0x10000) + 1) {
            lMonth--;
        }
    }
}

function GetcDateString() {     //农历信息显示
    var lunarcont = "";
    lunarcont += (lDay < 11) ? "初" : ((lDay < 20) ? "十" : ((lDay < 30) ? "廿" : "三十"));
    if (lDay % 10 != 0 || lDay == 10) {
        lunarcont += lunardate.charAt((lDay - 1) % 10);
    }
    if(lunarcont=="初一"&&lunarmo.charAt(lMonth - 1)=="正"){    
      lunarcont="春节";
    }
    if(lunarcont=="十五"&&lunarmo.charAt(lMonth - 1)=="正"){
      lunarcont="元宵节";
    }
    if(lunarcont=="初五"&&lunarmo.charAt(lMonth - 1)=="五"){
      lunarcont="端午节";
    }
    if(lunarcont=="十五"&&lunarmo.charAt(lMonth - 1)=="八"){
      lunarcont="中秋节";
    }
    if(lunarcont=="初七"&&lunarmo.charAt(lMonth - 1)=="七"){
      lunarcont="七夕";
    }
    if(lunarcont=="初九"&&lunarmo.charAt(lMonth - 1)=="九"){
      lunarcont="重阳节";
    }
    if(lunarcont=="初一"){
      lunarcont=lunarmo.charAt(lMonth - 1)+"月";
    }

    return lunarcont;
}

function GetLunarDay(solarYear, solarMonth, solarDay) {
    
        solarMonth = (parseInt(solarMonth) > 0) ? (solarMonth - 1) : 11;
        exchange(solarYear, solarMonth, solarDay);
        return GetcDateString();
    }



