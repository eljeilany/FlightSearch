function parseData(data,id,date){
  htmldata = "";
  for (var i = 0; i < data.length; i++) {
    start = new Date(data[i].start.dateTime);
    finish = new Date(data[i].finish.dateTime);
    htmldata+= '<tr>'
    +'<td>'+data[i].airline.name+'</td>'
    +'<td>'+data[i].flightNum+'</td>'
    +'<td>'+data[i].start.airportName+'</td>'
    +'<td>'+("0"+start.getHours()).slice(-2)+":"+("0"+start.getMinutes()).slice(-2)+'</td>'
    +'<td>'+data[i].finish.airportName+'</td>'
    +'<td>'+("0"+finish.getHours()).slice(-2)+":"+("0"+finish.getMinutes()).slice(-2)+'</td>'
    +'<td>'+data[i].durationMin.toString()+'</td>'
    +'<td>'+data[i].price.toString()+'</td>'
    +'</tr>';
  }
  document.getElementById(id+"t").innerHTML = htmldata;
  document.getElementById(id+"l").innerHTML = date;
}

function getDay(from,to,date,id) {
  console.log(date);
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    //console.log(xmlhttp.responseText);
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          var res = JSON.parse(xmlhttp.responseText);
          parseData(res,id,date);
      }
  };
  xmlhttp.open("GET", "/api/search?from="+from+"&to="+to+"&date="+date, true);
  xmlhttp.send();
}

function ulterDate(date,inc) {
  var tDate = new Date(date);
  tDate.setDate(tDate.getDate() + inc);
  return tDate.getFullYear()+"-"+("0"+(tDate.getMonth() + 1)).slice(-2)+"-"+("0"+tDate.getDate()).slice(-2);
}

function search(){
  var from = document.getElementById('From').value
  var to = document.getElementById('To').value
  var date = document.getElementById('datepicker').value
  getDay(from,to,date,"day")
  getDay(from,to,ulterDate(date,-1),"daym1")
  getDay(from,to,ulterDate(date,-2),"daym2")
  getDay(from,to,ulterDate(date,1),"dayp1")
  getDay(from,to,ulterDate(date,2),"dayp2")
}
