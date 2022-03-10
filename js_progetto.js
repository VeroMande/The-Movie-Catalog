function returnGuestSessionId(callback) {
get_url("https://api.themoviedb.org/3/authentication/guest_session/new?api_key=e5cc0a861c328c8c659316a3fe327d0f",function(status,data) {
  callback(data.guest_session_id)
})
}


function returnVote(url,value) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-type', 'application/json')
  xhr.onreadystatechange = function () {
    if(this.readyState===XMLHttpRequest.DONE  && this.status === 201) {
    // do something to response
    console.log(this.responseText);
    console.log(JSON.stringify({"value": value}))
  } else if (this.readyState===XMLHttpRequest.DONE  && this.status != 201) {
    console.log(this.response.error)
  }
};
  xhr.send(JSON.stringify({"value": value}) )
}




    function get_film(id, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET',"https://api.themoviedb.org/3/movie/"+id+"?api_key=e5cc0a861c328c8c659316a3fe327d0f&language=en-US", true);
    xhr.responseType = 'json';
    xhr.onload = function () {
        var status = xhr.status;
        callback(status, xhr.response);
    }
    xhr.onreadystatechange = function () {
      if (this.readyState===XMLHttpRequest.DONE  && this.status != 200) {
        console.log(this.response.error)
      }
    }
    xhr.send();
    }


function get_url(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function () {
        var status = xhr.status;
        callback(status, xhr.response);
    }
    xhr.onreadystatechange = function () {
      if (this.readyState===XMLHttpRequest.DONE  && this.status != 200) {
        console.log(this.response.error)
      }
    }

    xhr.send();
}    

    function get_cast(id, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET',"https://api.themoviedb.org/3/movie/"+id+"/credits?api_key=e5cc0a861c328c8c659316a3fe327d0f&language=en-US", true);
    xhr.responseType = 'json';
    xhr.onload = function () {
        var status = xhr.status;
        callback(status, xhr.response);
    }
  xhr.onreadystatechange = function () {
      if (this.readyState===XMLHttpRequest.DONE  && this.status != 200) {
        console.log(this.response.error)
      }
    }
    xhr.send();
    }

      function get_actor(id, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET',"https://api.themoviedb.org/3/person/"+id+"?api_key=e5cc0a861c328c8c659316a3fe327d0f&language=en-US", true);
    xhr.responseType = 'json';
    xhr.onload = function () {
        var status = xhr.status;
         

        callback(status, xhr.response);
    }
    xhr.onreadystatechange = function () {
      if (this.readyState===XMLHttpRequest.DONE  && this.status != 200) {
        console.log(this.response.error)
      }
    }
    xhr.send();
    }



    function get_film_of_acthor(id, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET',"https://api.themoviedb.org/3/person/"+id+"/movie_credits?api_key=e5cc0a861c328c8c659316a3fe327d0f&language=en-US", true);
    xhr.responseType = 'json';
    xhr.onload = function () {
        var status = xhr.status;
        callback(status, xhr.response);
    }
    xhr.onreadystatechange = function () {
      if (this.readyState===XMLHttpRequest.DONE  && this.status != 200) {
        console.log(this.response.error)
      }
    }
    xhr.send();
    }

//pagina signing_up

function ControllLength(value,value_err) {
  if (value.value.length==0) {
    value.style.borderBottom="solid 2px red"
    value_err.innerHTML='Required field'
  }
}


 //ritorna array per i generi selezionati 
 function returnFavouriteGenresChecked() {
  var checkboxes = document.getElementsByClassName("selected_genres");

  var array = new Array()

  for(var i=0;i<checkboxes.length;i++) {

    if (checkboxes[i].checked ){                                         
      array.push(checkboxes[i].value)

      
    }
    
  }

  return array
}

function SaveUserToLocalStorage() {

  var user=  {'name':document.getElementById('name').value, 'last_name': document.getElementById('last_name').value,'favourites_genres': JSON.stringify(returnFavouriteGenresChecked()),
  'e-mail': document.getElementById('e-mail').value,'username':document.getElementById('username').value,'password':document.getElementById('password').value}


  if (localStorage.getItem('RegisteredUsers') === null) { /* se la lista dei miei utenti ancora non esiste*/
    var firstUser =[];


        //controllo se  esista uno username uguale nei venditori
        if (localStorage.getItem('RegisteredShopkeepers') != null) {
          var shopkeepers=JSON.parse(localStorage.getItem('RegisteredShopkeepers'))

          for (i=0; i<shopkeepers.length; i++) {


            if (shopkeepers[i]['username'] === document.getElementById('username').value) {
             alert('Account già esistente')
             return ;
           }
         }
       }

       firstUser.push(user);

       localStorage.setItem('RegisteredUsers', JSON.stringify(firstUser));
       alert('Thank you for your registration! Click here to log-in!')
       location.href="log_in.html"
       return true

     } else {

      var users=JSON.parse(localStorage.getItem('RegisteredUsers'))

         //controllo che esista uno username uguale negli utenti
         for (i=0; i<users.length; i++) {
          if (users[i]['username'] === document.getElementById('username').value) {
            alert('Account già esistente')
            return ;   //ritorna senza proseguire con la funzione
          }
        }
        //controllo che esista uno username uguale nei venditori
        if (localStorage.getItem('RegisteredShopkeepers') != null) {
          var shopkeepers=JSON.parse(localStorage.getItem('RegisteredShopkeepers'))
          for (i=0;i<shopkeepers.length;i++) {

            if (shopkeepers[i]['username'] === document.getElementById('username').value) {
              alert('Account già esistente')

            return ;   //ritorna senza proseguire con la funzione
          }
        }
      }

      users.push(user);
      var usersJ= JSON.stringify(users);
      localStorage.setItem('RegisteredUsers', usersJ);
      alert('Thank you for your registration! Click here to log-in!')
      location.href="log_in.html"
      return true;
    }
  }


  function SaveShopkeeperToLocalStorage() {  


   var shopkeeper=  {'name':document.getElementById('name').value, 'last_name': document.getElementById('last_name').value,
   'e-mail': document.getElementById('e-mail').value,'username':document.getElementById('username').value,'password':document.getElementById('password').value,
   'vat_number':document.getElementById('vat_number').value,'company_name':document.getElementById('company_name').value,'telephone_number':document.getElementById('telephone_number').value,
   'city':document.getElementById('city').value,'address':document.getElementById('address').value,'sellingPrice':document.getElementById('selling-price').value,'rentalPrice':document.getElementById('rental-price').value,'catalog':JSON.stringify([]) }


   if (localStorage.getItem('RegisteredShopkeepers') === null) { /* se la lista dei miei utenti ancora non esiste*/
    var firstShopkeeper =[];

          //controllo che esista uno username uguale negli utenti
          if (localStorage.getItem('RegisteredUsers') != null) {
            var users=JSON.parse(localStorage.getItem('RegisteredUsers'))
            for (i=0; i<users.length; i++) {
              if (users[i]['username'] === document.getElementById('username').value) {
                alert('Account già esistente')

            return ;   //ritorna senza proseguire con la funzione
          }
        }
      }

      firstShopkeeper.push(shopkeeper);


      localStorage.setItem('RegisteredShopkeepers', JSON.stringify(firstShopkeeper));
      alert('Thank you for your registration! Click here to log-in!')
      location.href="log_in.html"
      return true


//se invece esistono altri shopkeepers

} else {

  var shopkeepers=JSON.parse(localStorage.getItem('RegisteredShopkeepers'))
  for (i=0; i<shopkeepers.length; i++) {


    if (shopkeepers[i]['username'] === document.getElementById('username').value) {
     alert('Account già esistente')

     return ;
   }
   if (shopkeepers[i]['company_name'] === document.getElementById('company_name').value) {
    alert('Company Name già esistente')
    return;
  }

}
          //controllo che esista uno username uguale negli utenti
          if (localStorage.getItem('RegisteredUsers') != null) {
            var users=JSON.parse(localStorage.getItem('RegisteredUsers'))
            for (i=0; i<users.length; i++) {


              if (users[i]['username'] === document.getElementById('username').value) {
                alert('Account già esistente')

            return ;   //ritorna senza proseguire con la funzione
          }
        }
      }

      shopkeepers.push(shopkeeper);
      var shopkeepersJ= JSON.stringify(shopkeepers);
      localStorage.setItem('RegisteredShopkeepers', shopkeepersJ);
      alert('Thank you for your registration! Click here to log-in!')
      location.href="log_in.html"
      
      return true;
    }
  }

//pagina generi.html
//lato User

function returnSellingFilms() {


  var shopkeepers=JSON.parse(localStorage.getItem('RegisteredShopkeepers'))

        for (i=0; i<shopkeepers.length; i++) {
          

           var catalog=JSON.parse(shopkeepers[i]['catalog'])
           
             for ( var j= 0; j< catalog.length; j++) {
              controllOfGenre(shopkeepers[i],catalog[j]);
            }
          }
        }



//tramite i due parametri gli passo il nome del venditore e  l'id del film(quello dei cataloghi dei venditori)
//e controllo se quel film è del genere della pagina in cui mi trovo-->altrimento non lo mostro

function controllOfGenre(shopkeeper,filmId) {
  const url = window.location.search;
  const urlParams = new URLSearchParams(url);
  var id= urlParams.get('id')

    get_url("https://api.themoviedb.org/3/movie/"+parseInt(filmId)+"?api_key=e5cc0a861c328c8c659316a3fe327d0f&language=en-US", function(status,data) {
        for(var i=0;i<data.genres.length;i++) {
          if( data.genres[i].id==id){
            if(data.poster_path==null) {
              document.getElementById('film').innerHTML+="<div class='caption' > <span id='title_caption'>"+shopkeeper['company_name']+"</span><span id='year_caption'>"+data.release_date+"</span> <a href='info_film.html?id="+ data.id + "&shopkeeper="+ shopkeeper['company_name'] +"'><img src=\"loc_error.jpg  onMouseover=\"cambiacolore(getElementById('year_caption'))\"></div>";
            document.getElementById('title').innerHTML=data.genres[i].name

            } else {

            document.getElementById('film').innerHTML+="<div class='caption' > <span id='title_caption'>"+shopkeeper['company_name']+"</span><span id='year_caption'>"+data.release_date+"</span> <a href='info_film.html?id="+ data.id + "&shopkeeper="+ shopkeeper['company_name'] +"'><img src=\"https://image.tmdb.org/t/p/w500/" + data.poster_path +"\"  onMouseover=\"cambiacolore(getElementById('year_caption'))\"></div>";
            document.getElementById('title').innerHTML=data.genres[i].name
          }
          }

        }

      })

    }

//latoShopkeeper


//return pages voleva passare il valore a una funziona-->allora prende la funzione  come callback in moodo  che puù passargli quel dato come suo parameto
//la funzione che tramita API mi ritorna numero massimo delle pagine
//ritorna numero totale di pagine di quel genere
function returnPages(callback) {
 const url = window.location.search;
 const urlParams = new URLSearchParams(url);
 var id= urlParams.get('id')
 var pages=0

 get_url("https://api.themoviedb.org/3/discover/movie?api_key=e5cc0a861c328c8c659316a3fe327d0f&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres="+id+"&with_watch_monetization_types=flatrate", function(status,data) {

   callback(data.total_pages);

 })

   }


    function showPageOfThisGenre(value) {
  const url = window.location.search;
  const urlParams = new URLSearchParams(url);
  var id= urlParams.get('id')

      get_url("https://api.themoviedb.org/3/discover/movie?api_key=e5cc0a861c328c8c659316a3fe327d0f&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page="+value+"&with_genres="+id+"&with_watch_monetization_types=flatrate", function(status,data) {

        document.getElementById('film').innerHTML=""

        for (var i=0;i<data.results.length;i++) {
          if(data.results[i].poster_path==null) {
            document.getElementById('film').innerHTML+="<div class='caption' > <span id='title_caption'>"+data.results[i].title.toUpperCase()+"</span><span id='year_caption'>"+data.results[i].release_date+"</span> <a href='info_film.html?id="+ data.results[i].id+ "'> <img src='loc_error.jpg'  onMouseover=\"cambiacolore(getElementById('year_caption'))\"></div>";
          } else {

          document.getElementById('film').innerHTML+="<div class='caption' > <span id='title_caption'>"+data.results[i].title.toUpperCase()+"</span><span id='year_caption'>"+data.results[i].release_date+"</span> <a href='info_film.html?id="+ data.results[i].id+ "'> <img src=\"https://image.tmdb.org/t/p/w500/" + data.results[i].poster_path +"\"  onMouseover=\"cambiacolore(getElementById('year_caption'))\"></div>";

        }

        }
      });

    }

     function showButtonPagesOfThisGenre() {
    
    returnPages(function (pages){ //richiamo la funzione in modo da poter utilizzare il valore 
      document.getElementById('pagination').innerHTML=""

    if (pages>12) {
      //mettiamo noi un massimo di 12 bottoni
     for(var i=1;i<13;i++) {
    document.getElementById('pagination').innerHTML+="<li class='page-item'><a class='page-link' href='#'  onclick='showPageOfThisGenre("+i+")' '>"+i+"</a></li>"
         
     }
    } else {
      for( var i=1;i<pages+1;i++) {
    
      document.getElementById('pagination').innerHTML+="<li class='page-item'><a class='page-link'  href='#' onclick='showPageOfThisGenre("+i+")'>"+i+"</a></li>"

      }
    }

   })
  }

//pagina info_film.html
function mostraFilm() {
  const url = window.location.search;
  const urlParams = new URLSearchParams(url);
  var id= urlParams.get('id')

  get_film(id,function(status,data) {
    if (data.poster_path==null) {
        document.getElementById('poster').innerHTML+="<img width='100%'  height='auto'  src='loc_error.jpg'>"
    } else {
    document.getElementById('poster').innerHTML+="<img width='100%'  height='auto'  src=\"https://image.tmdb.org/t/p/w500/" + data.poster_path +" \">"
  }

    document.getElementById('titoloFilm').innerHTML+="<h2><b>"+data.title+"</b></h2>"
    document.getElementById('titoloFilm').innerHTML+="<span style='font-size:20px'>("+data.release_date.substring(0,4)+")   </span>"
    for(i=0;i<data.genres.length;i++) {
      document.getElementById('titoloFilm').innerHTML+="<span><i><a   style='text-decoration:none'href='generi.html?id="+data.genres[i].id+"'>"+data.genres[i].name+" "+"</a></i></span>"
    }
    document.getElementById('overview').innerHTML+="<h5>Overview:</h5>"+ data.overview
    if (data.vote_average==0.0) {
      nascondi(document.getElementById('vote_average'))
    } else {
    document.getElementById('text_vote').innerHTML=data.vote_average*10+"%"
    document.getElementById('circle_vote').setAttribute("stroke-dasharray",""+data.vote_average*10+", 100")
  }
  
  });

  get_cast(id,function(status,data) {

    for(i=0;i<data.cast.length;i++) {
      if(data.cast[i].profile_path==null) {
 document.getElementById('wrapper').innerHTML+= "<div class='item'><a href='info_attori.html?id="+ data.cast[i].id + "'><img height='170' width='120' src='omino_error.jpg'><b>"+data.cast[i].original_name+"</b></a><br>"+data.cast[i].character+"</div>" 
      } else {
    
      document.getElementById('wrapper').innerHTML+= "<div class='item'><a href='info_attori.html?id="+ data.cast[i].id + "'><img height='170' width='120' src=\"https://image.tmdb.org/t/p/w500/" + data.cast[i].profile_path +" \"><b>"+data.cast[i].original_name+"</b></a><br>"+data.cast[i].character+"</div>" 
    }
    }
    
      for(i=0;i<data.crew.length;i++) {
          if(data.crew[i].job=="Producer") {
            document.getElementById('producer').innerHTML+=data.crew[i].name+"</br>"
          } else if (data.crew[i].job=="Director") {
            document.getElementById('director').innerHTML+=data.crew[i].name+"</br>"
          }
        }

  
 
  })

}

//controlla se un film è già nel carrello
function filmExistsInCart(id) {

   if (sessionStorage.getItem('ShoppingCart') === null) { 
    return false
  } else {

var shoppingCart=JSON.parse(sessionStorage.getItem('ShoppingCart'))

  for(var j=0;j<shoppingCart.length;j++ ) {
    if (shoppingCart[j]['id'] == id ) {
      return true
    } else {
        continue
    }
  }
}
    return false
}



function vote(value) {
   const url = window.location.search;
const urlParams = new URLSearchParams(url);
var id=urlParams.get('id')
  if ((sessionStorage.getItem('ShopkeeperLogged')==null) && (sessionStorage.getItem('UserLogged')==null)) {
    popupBlack()
   
  } else if(sessionStorage.getItem('UserLogged')!=null) {
    //prendo la chiave per la POST
      returnGuestSessionId(function(guest_session_id){
        //efettuo la POST
      returnVote("https://api.themoviedb.org/3/movie/"+id+"/rating?api_key=e5cc0a861c328c8c659316a3fe327d0f&guest_session_id="+guest_session_id+"",value*2)
      //popup
      popupVote()
    })
    } 
}

//popupPerIlVoto
function popupVote() {
  
  var popup = document.getElementById("popup_vote");
  popup.classList.toggle("show");
  

setTimeout(function(){ popup.classList.toggle("show");}, 1500);

}
function popupBlack() {
  
  var popup = document.getElementById("popup_black");
  popup.classList.toggle("show");
  setTimeout(function(){ popup.classList.toggle("show");}, 3000);
  

}

//pagina info_attori.html
function mostraAttore() {
  const url = window.location.search;
  const urlParams = new URLSearchParams(url);
  var id= urlParams.get('id')

  get_actor(id,function(status,data) {
    
    //in questo modo non ritorna l'errore 404 sul quell'immagine
    if (data.profile_path==null) {
      document.getElementById('photo_actor').innerHTML+="<img width='100%'  height='auto' src='omino_error.jpg' >"
    } else {
document.getElementById('photo_actor').innerHTML+="<img width='100%'  height='auto' src=\"https://image.tmdb.org/t/p/w500/" + data.profile_path +" \">"
    }
    if(data.name==null) {
      document.getElementById('name_actor').innerHTML+="<h1>Information not available</h1>"
    } else {
      document.getElementById('name_actor').innerHTML+="<h1><b>"+data.name+"</b></h1>"
    }
    if ((data.biography=="") || (data.biography==null)){
      document.getElementById('biography').innerHTML+="Information not available"
    } else {
      document.getElementById('biography').innerHTML+=data.biography
    }
    if(data.birthday==null) {
    document.getElementById('birthday').innerHTML+="Information not available"
    } else {
      document.getElementById('birthday').innerHTML+=data.birthday
    }
    if (data.place_of_birth==null) {
      document.getElementById('birth_place').innerHTML+="Information not available"
    } else {
       document.getElementById('birth_place').innerHTML+=data.place_of_birth
    }
    
  });
}
//film linkabili
function showFilmsOfActhor() {
  const url = window.location.search;
  const urlParams = new URLSearchParams(url);
  var id= urlParams.get('id')
  
  get_film_of_acthor(id,function(status,data) {
    for(i=0;i<data.cast.length;i++) {
      if(data.cast[i].poster_path==null) {
document.getElementById('wrapper').innerHTML+= "<div class='item'><a href='info_film.html?id="+ data.cast[i].id + "'><img height='170' width='120' src='loc_error.jpg'><b>"+data.cast[i].title+"</b></a><br>"+data.cast[i].character+"</div>" 
      } else {
      document.getElementById('wrapper').innerHTML+= "<div class='item'><a href='info_film.html?id="+ data.cast[i].id + "'><img height='170' width='120' src=\"https://image.tmdb.org/t/p/w500/" + data.cast[i].poster_path +" \"><b>"+data.cast[i].title+"</b></a><br>"+data.cast[i].character+"</div>" 
    }
    }


  

  })
}
//film non linkabili
function showFilmsOfActor_users() {
//qui i film non sono più cliccabili-->perchè non tutti sono in vendita-->non ha senso visualizzarli
const url = window.location.search;
  const urlParams = new URLSearchParams(url);
  var id= urlParams.get('id')

  get_film_of_acthor(id,function(status,data) {

    for(i=0;i<data.cast.length;i++) {
      if(data.cast[i].poster_path==null) {
document.getElementById('wrapper').innerHTML+= "<div class='item'><a><img height='170' width='120' src='loc_error.jpg'><b>"+data.cast[i].title+"</b></a><br>"+data.cast[i].character+"</div>" 
      } else {
      document.getElementById('wrapper').innerHTML+= "<div class='item'><a ><img height='170' width='120' src=\"https://image.tmdb.org/t/p/w500/" + data.cast[i].poster_path +" \"><b>"+data.cast[i].title+"</b></a><br>"+data.cast[i].character+"</div>" 
    }
    }

  })
}

function getTitle(id,callback) {
 get_film(id,function(status,data) {
  callback(data.title);
})
}
//metto un acquisto nel carrello
function shopThisFilm() {
const url = window.location.search;
const urlParams = new URLSearchParams(url);
var id=urlParams.get('id')
var company_name=urlParams.get('shopkeeper')

var shopkeepers=JSON.parse(localStorage.getItem('RegisteredShopkeepers'))
for(var i=0;i<shopkeepers.length;i++) {
  if( shopkeepers[i]['company_name']==company_name) {
    var price=shopkeepers[i]['sellingPrice']
  }
}

getTitle(id,function (title){ 

var cartItem=  { 'id': id,'title': title,'company_name': company_name, 'price':price,'rental':false}


      if (sessionStorage.getItem('ShoppingCart') === null) { /* se la lista dei miei utenti ancora non esiste*/
        var firstItem =[];
        

        firstItem.push(cartItem);

        sessionStorage.setItem('ShoppingCart', JSON.stringify(firstItem));


      } else {

        var shoppingCart=JSON.parse(sessionStorage.getItem('ShoppingCart'))
       

        shoppingCart.push(cartItem);
        sessionStorage.setItem('ShoppingCart', JSON.stringify(shoppingCart));

      }
})

}

//metto nel carrello uun film fittato
function rentThisFilm() {
  const url = window.location.search;
const urlParams = new URLSearchParams(url);
var id=urlParams.get('id')
var company_name=urlParams.get('shopkeeper')
var shopkeepers=JSON.parse(localStorage.getItem('RegisteredShopkeepers'))
for(var i=0;i<shopkeepers.length;i++) {
  if( shopkeepers[i]['company_name']==company_name) {
    var price=shopkeepers[i]['rentalPrice']
  }
}



getTitle(id,function (title){ 

var cartItem=  { 'id': id,'title': title,'company_name': company_name, 'price':price,'rental':true}


      if (sessionStorage.getItem('ShoppingCart') === null) { /* se la lista dei miei utenti ancora non esiste*/
        var firstItem =[];
        

        firstItem.push(cartItem);

        sessionStorage.setItem('ShoppingCart', JSON.stringify(firstItem));


      } else {

        var shoppingCart=JSON.parse(sessionStorage.getItem('ShoppingCart'))
       

        shoppingCart.push(cartItem);
        sessionStorage.setItem('ShoppingCart', JSON.stringify(shoppingCart));

      }
    })


}
// pagina cart.html

function checkPaypal() {
    var eMail = document.getElementById("paypal").value;

            var result = true;
            if(eMail.length > 0) {
              var regex = /^[_a-z0-9+-]+(\.[_a-z0-9+-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)+$/i

               if(!eMail.match(regex)){   
                    document.getElementById('paypal').style.borderBottom="solid 2px red"    
                    document.getElementById('error_paypal').innerHTML = 'Enter only valid characters'
                    result = false; 

                } else  if (eMail.match(regex)){
                  document.getElementById('paypal').style.borderBottom="solid 2px green"
                  document.getElementById('error_paypal').innerHTML = ' '

                }

            } else {
              document.getElementById('paypal').style.borderBottom="solid 2px red"  
              document.getElementById('error_paypal').innerHTML = 'Required field'
              result = false;
            }

            return result;
}



function checkPwdPaypal() {

          
          var pw= document.getElementById("pwdPay").value;

            var result = true;
            if(pw.length > 0) {

          
                  document.getElementById('pwdPay').style.borderBottom="solid 2px green"
                  document.getElementById('error_pwdPay').innerHTML = ' '

              

            } else {
              document.getElementById('pwdPay').style.borderBottom="solid 2px red"  
              document.getElementById('error_pwdPay').innerHTML = 'Required field' 
              result = false;         }

            return result;
          
          }


function checkCardNumber() {
 var card = document.getElementById("card-number").value;

            var result = true;
            if(card.length > 0) {
              var regex = /^[0-9]{16}$/


               if(!card.match(regex)){   
                    document.getElementById('card-number').style.borderBottom="solid 2px red"    
                    document.getElementById('error_card-number').innerHTML = 'Enter only valid characters'
                    result = false; 

                } else  if (card.match(regex)){
                  document.getElementById('card-number').style.borderBottom="solid 2px green"
                  document.getElementById('error_card-number').innerHTML = ' '
                }

            } else {
              document.getElementById('card-number').style.borderBottom="solid 2px red"  
              document.getElementById('error_card-number').innerHTML = 'Required field'
              result = false;
            }

            return result;
          

}

function checkCvv() {
 var cvv = document.getElementById("cvv").value;

            var result = true;
            if(cvv.length > 0) {
              var regex = /^[0-9]{3}$/


               if(!cvv.match(regex)){   
                    document.getElementById('cvv').style.borderBottom="solid 2px red"    
                    document.getElementById('error_cvv').innerHTML = 'Enter up 3 values'
                    result = false; 

                } else  if (cvv.match(regex)){
                  document.getElementById('cvv').style.borderBottom="solid 2px green"
                  document.getElementById('error_cvv').innerHTML = ' '
                }

            } else {
              document.getElementById('cvv').style.borderBottom="solid 2px red"  
              document.getElementById('error_cvv').innerHTML = 'Required field'
              result = false;
            }

            return result;
          
}

function completePayment() {
  //salvare gli acquisti

  var items=[]
  var data= new Date()
  var gg, mm, aaaa;
  gg = data.getDate() + "/";
  mo = data.getMonth() + 1 + "/";
  aaaa = data.getFullYear();
  var Hh, Mm, Ss, mm;
  Hh = data.getHours() + ":";
  Mm = data.getMinutes() + ":";
  Ss = data.getSeconds() ;


  if (localStorage.getItem('Orders') === null) {

    var orders=[]
    var user= JSON.parse(sessionStorage.getItem('UserLogged'))
    user=user['username']

    var cart=JSON.parse(sessionStorage.getItem('ShoppingCart'))
    for (var i=0; i<cart.length; i++) {
      items.push(cart[i])
    }
    //metto prima mese così salvo in formato americano-->che mi servirà dopo per risalire alla data con new Date()
    var order= {'user':user,'date':""+mo+gg+aaaa,'hour':""+Hh+Mm+Ss,'items':JSON.stringify(items),'tot':""+returnTot()}    
    
    orders.push(order) 
    localStorage.setItem('Orders',JSON.stringify(orders))
  } else {
    var orders=JSON.parse(localStorage.getItem('Orders'))
    var user= JSON.parse(sessionStorage.getItem('UserLogged'))
    user=user['username']

    var cart=JSON.parse(sessionStorage.getItem('ShoppingCart'))
    for (var i=0; i<cart.length; i++) {

      items.push(cart[i])
    }
    var order= {'user':user,'date':""+mo+gg+aaaa,'hour':""+Hh+Mm+Ss,'items':JSON.stringify(items),'tot':""+returnTot()}    

    orders.push(order) 
    localStorage.setItem('Orders',JSON.stringify(orders))
  }

}

function removeFromCart(id) {
   var cart=JSON.parse(sessionStorage.getItem('ShoppingCart'))

        for (var i=0; i<cart.length; i++) {
            if (cart[i]['id']==id) {
                cart.splice(i,1)
            }
        }
        sessionStorage.setItem('ShoppingCart', JSON.stringify(cart))
        alert('Removed from Shopping Cart')
        location.href="cart.html"
}


//pagina shopkeeper_page.html


 function ChangeShopkeeperData() {

  name=document.getElementById('name').value

  last_name= document.getElementById('last_name').value
   //favourites_genres': JSON.stringify(saveChecked()),
  Email= document.getElementById('e-mail').value 
  vat_number=document.getElementById('vat_number').value 
  company_name=document.getElementById('company_name').value 
  telephone_number=document.getElementById('telephone_number').value 
  city=document.getElementById('city').value 
  address=document.getElementById('address').value 
  sellingPrice=document.getElementById('selling-price').value 
  rentalPrice=document.getElementById('rental-price').value 
  
 


  var shopkeeper=JSON.parse(sessionStorage.getItem('ShopkeeperLogged'))


    
        var shopkeepers=JSON.parse(localStorage.getItem('RegisteredShopkeepers'))
        for (i=0; i<shopkeepers.length; i++) {


          if (shopkeepers[i]['username'] === shopkeeper['username'] ){

            if( (shopkeepers[i]['name'] == name)  && (shopkeepers[i]['last_name'] == last_name) && (shopkeepers[i]['e-mail'] == Email) && 
              (shopkeepers[i]['vat_number']==vat_number) && (shopkeepers[i]['company_name'] == company_name)  && (shopkeepers[i]['telephone_number'] == telephone_number)
               && (shopkeepers[i]['city'] == city) && (shopkeepers[i]['address']==address)  && (shopkeepers[i]['rentalPrice']==rentalPrice)  && (shopkeepers[i]['sellingPrice']==sellingPrice)                               ){
            alert('You have not made any changes')
            return
          }

            if(shopkeepers[i]['name'] != name)  {

               shopkeepers[i]['name']= name;

            } else if (shopkeepers[i]['last_name'] != last_name) {

                shopkeepers[i]['last_name']= last_name;

            }  else if (shopkeepers[i]['e-mail'] !=Email)  {

               shopkeepers[i]['e-mail']= Email;

            }  else if (shopkeepers[i]['vat_number'] !=vat_number) {

              shopkeepers[i]['vat_number']=vat_number;

            } else if(shopkeepers[i]['company_name'] !=company_name) {

              shopkeepers[i]['company_name']=company_name;

            }  else if(shopkeepers[i]['telephone_number'] !=telephone_number) {

              shopkeepers[i]['telephone_number']=telephone_number;
            } else if  (shopkeepers[i]['city'] !=city) {

              shopkeepers[i]['city']=city;

            }  else if(shopkeepers[i]['address'] !=address) {

              shopkeepers[i]['address']=address;

            } else if(shopkeepers[i]['rentalPrice'] !=rentalPrice) {

              shopkeepers[i]['rentalPrice']=rentalPrice;

            } else if(shopkeepers[i]['sellingPrice'] !=sellingPrice) {

              shopkeepers[i]['sellingPrice']=sellingPrice;
            }

           
              localStorage.setItem('RegisteredShopkeepers', JSON.stringify(shopkeepers))
              sessionStorage.setItem('ShopkeeperLogged', JSON.stringify(shopkeepers[i]))
              document.getElementById('shopkeeper_hello').innerHTML = "Ciao!</br><b>"+shopkeepers[i].name+"</b></br>"
              alert('Your data has been changed!')

        }
      }  
      
    }


 //funzione che controlla se non esistono username uguali(sia negli utenti che nei venditori)

function ControllUsername(value) {
  var users = JSON.parse(localStorage.getItem('RegisteredUsers'))
  var shopkeepers=JSON.parse(localStorage.getItem('RegisteredShopkeepers'))

   if (shopkeepers!= null) {
          for (i=0; i<shopkeepers.length; i++) {


            if (shopkeepers[i]['username'] != value) {
               continue
    
            } else {
              return false
              break
            }
          }
        }
        if (users != null) {
          for (i=0; i<users.length; i++) {


            if (users[i]['username'] != value) {
               continue
    
            } else {
              return false
              break
            }
          }
        }
        return true
      }




  
  
   

   function ChangeUsername(value, registered) {
     username=document.getElementById('username').value 
  
     var logged=JSON.parse(value)
     var registered=JSON.parse(registered)
     
     if (logged['username']!=username) { 

//se non esistono altri loggati con questo username
      if (ControllUsername(username)==true) {

        for (i=0; i<registered.length; i++) {


          if (registered[i]['username'] === logged['username'] ) {

          
           registered=JSON.stringify(registered)
           

          //se gli ho passato utenti
           if (registered==localStorage.getItem('RegisteredUsers')){

            registered=JSON.parse(registered)
             registered[i]['username']= username;

           localStorage.setItem('RegisteredUsers',JSON.stringify( registered))
           sessionStorage.setItem('UserLogged',JSON.stringify(registered[i]))
        //se gli ho passato shopkeeper
         } else  if (registered==localStorage.getItem('RegisteredShopkeepers')){
            registered=JSON.parse(registered)
             registered[i]['username']= username;
          localStorage.setItem('RegisteredShopkeepers', JSON.stringify(registered))
           sessionStorage.setItem('ShopkeeperLogged', JSON.stringify(registered[i]))
           alert('Your data has been saved correctly!')
         }

         }


       }

     } else {
      alert('This username already exists!')
    }

} else {
  alert('Enter a username different from yours ')
}



}
//value è lo shopkeeper loggato-->registered sono tutti gli shopkeepers
           function CheckUsernameChanged(value,registered) {

          
          var username = document.getElementById("username").value;

            var result = true;
            if(username.length > 0) {

              var regex = /^[a-z0-9]{4,10}$/i;


                 if(!username.match(regex)){ 

  
                    document.getElementById('username').style.borderBottom="solid 2px red"    
                    document.getElementById('error_username').innerHTML = 'Username must contain at least 4 and maximum 10 alphanumeric characters'
                    result = false; 

                } else  if (username.match(regex)){
                  document.getElementById('username').style.borderBottom="solid 2px gray"
                  document.getElementById('error_username').innerHTML = ' '

                }

            } else {
              document.getElementById('username').style.borderBottom="solid 2px red"  
              document.getElementById('error_username').innerHTML = 'Required field' 
              result = false;        


           }
           var logged=value
           var registered=registered
           

           if (result==true) {
            ChangeUsername(logged,registered);

           }

            return result;
          
          }


 function ChangeUserPwd(value,registered) {
     password=document.getElementById('password').value 


     var logged=JSON.parse(value)
     var registered=JSON.parse(registered)
     
     if (logged['password']!=password) { 
      

        for (i=0; i<registered.length; i++) {


          if (registered[i]['username'] === logged['username'] ) {


             registered=JSON.stringify(registered)
           

           if (registered==localStorage.getItem('RegisteredUsers')){

            registered=JSON.parse(registered)
             registered[i]['password']= password;

           localStorage.setItem('RegisteredUsers',JSON.stringify( registered))
           sessionStorage.setItem('UserLogged',JSON.stringify(registered[i]))

            } else  if (registered==localStorage.getItem('RegisteredShopkeepers')){
            registered=JSON.parse(registered)
             registered[i]['password']= password;
          localStorage.setItem('RegisteredShopkeepers', JSON.stringify(registered))
           sessionStorage.setItem('ShopkeeperLogged', JSON.stringify(registered[i]))
           alert('Your data has been saved correctly!')
            }

         }
}



     

} else {
  alert('Enter a password different from yours ')
}




}

 function CheckPwdChanged(value,registered) {


            var pw= document.getElementById("password").value;

            var result = true;
            if(pw.length > 0) {

              var regex = /^[a-z0-9]{8,12}$/i;


              if(!pw.match(regex)){ 


                document.getElementById('password').style.borderBottom="solid 2px red"    
                document.getElementById('error_password').innerHTML = 'Password must contain at least 8 and maximum 12 alphanumeric characters'
                result = false; 

              } else  if (pw.match(regex)){
                document.getElementById('password').style.borderBottom="solid 2px gray"
                document.getElementById('error_password').innerHTML = ' '

              }

            } else {
              document.getElementById('password').style.borderBottom="solid 2px red"  
              document.getElementById('error_password').innerHTML = 'Required field' 
              result = false;        
            }
          var logged=value
           var registered=registered
           

            if (result==true) {
              ChangeUserPwd(logged,registered);
            }

            return result;

          }
          //ritorna dizionario con i film venduti dallo shopkeeper e la quantità
function statisticShop() {
  var dictShop= {}


  var shopkeeper=JSON.parse(sessionStorage.getItem('ShopkeeperLogged'))
  if(localStorage.getItem('Orders')!=null) {
   
  var orders=JSON.parse(localStorage.getItem('Orders'))
  for(var i=0;i<orders.length;i++) {
    var items=JSON.parse(orders[i]['items'])
    for(var j=0;j<items.length;j++) {

      //se tra gli ordini trova film venduti da questo shopkeeper
      if((items[j]['company_name']==shopkeeper['company_name']) &&(items[j]['rental']==false) ){
        if(Object.keys(dictShop).length===0) {
          
          dictShop[items[j]['title']]=1
         
        } else {

            if(isPresent(dictShop,items[j]['title'])) { //se quel titolo è già una chiave di quel dizionario

               
                   dictShop[items[j]['title']]= dictShop[items[j]['title']]+1
  
             } else {
              
                     dictShop[items[j]['title']]=1
             }
        }


      }
       
      }
    }
  }



return dictShop
}

//ritorna dizionario con i film affittati dallo shopkeeper e la quantità
function statisticRental() {
  var dictRental= {}


  var shopkeeper=JSON.parse(sessionStorage.getItem('ShopkeeperLogged'))
  if(localStorage.getItem('Orders')!=null) {

    var orders=JSON.parse(localStorage.getItem('Orders'))
    for(var i=0;i<orders.length;i++) {
      var items=JSON.parse(orders[i]['items'])
      for(var j=0;j<items.length;j++) {
        if((items[j]['company_name']==shopkeeper['company_name']) &&(items[j]['rental']==true) ){
          if(Object.keys(dictRental).length===0) {
         
            dictRental[items[j]['title']]=1
          } else {

            for(var key in dictRental) {
            
              if(key==items[j]['title']) {
              
               dictRental[key]= dictRental[key]+1
              } else {
               dictRental[items[j]['title']]=1
              }
            }

          }

        }
      }
    }
  }

return dictRental

}

function getShopkeeperCatalog() {

          var shopkeeper=JSON.parse(sessionStorage.getItem('ShopkeeperLogged'))
    

                   var catalog=JSON.parse(shopkeeper['catalog'])
          
                  return catalog
                }



function mostraPersonalCatalog(value) {
 var catalog=getShopkeeperCatalog()

 if(catalog!=0) {
   document.getElementById('catalog').innerHTML=""
   if(catalog.length<value*9) {
     for(var i=(value-1)*9;i<catalog.length;i++) {
       get_film(catalog[i],function(status,data) {
        if(data.poster_path==null) {
document.getElementById('catolog').innerHTML+="<div class='caption' > <span id='title_caption'>"+data.title.toUpperCase()+"</span><span id='year_caption'>"+data.release_date+"</span> <a href='info_film.html?id="+ data.id+ "'> <img src='loc_error.jpg'  onMouseover=\"cambiacolore(getElementById('year_caption'))\"></div>";
    } else {

    document.getElementById('catalog').innerHTML+="<div class='caption' > <span id='title_caption'>"+data.title.toUpperCase()+"</span><span id='year_caption'>"+data.release_date+"</span> <a href='info_film.html?id="+ data.id+ "'> <img src=\"https://image.tmdb.org/t/p/w500/" + data.poster_path +"\"  onMouseover=\"cambiacolore(getElementById('year_caption'))\"></div>";

    }

        });
     }
  } else {
//abbiamo fissato noi massimo di 9 film a pagina
      for(var i=9*(value-1);i<value*9;i++) {


        get_film(catalog[i],function(status,data) {
          if(data.poster_path==null) {
document.getElementById('catolog').innerHTML+="<div class='caption' > <span id='title_caption'>"+data.title.toUpperCase()+"</span><span id='year_caption'>"+data.release_date+"</span> <a href='info_film.html?id="+ data.id+ "'> <img src='loc_error.jpg'  onMouseover=\"cambiacolore(getElementById('year_caption'))\"></div>";
    } else {

            document.getElementById('catalog').innerHTML+="<div class='caption' > <span id='title_caption'>"+data.title.toUpperCase()+"</span><span id='year_caption'>"+data.release_date+"</span> <a href='info_film.html?id="+ data.id+ "'> <img src=\"https://image.tmdb.org/t/p/w500/" + data.poster_path +"\"  onMouseover=\"cambiacolore(getElementById('year_caption'))\"></div>";

    }

         });
      }
}
  
}else  {
  document.getElementById('catalog').style="display:block"
  document.getElementById('catalog').innerHTML="<h2>Your catalog is empty!</h2><a href='index.html'>Fill your catalog!</a>"
}
}

function createPages() {
  var catalog=getShopkeeperCatalog()
 if (catalog.length!=0) {
  console.log(catalog.length)
 var pages= Math.ceil(catalog.length/9)
}

return pages

}


function showButtonPersonalCatalog() {
    var pages=createPages();
      document.getElementById('paginationPersonalCatalog').innerHTML=""
      if(pages>1) {
      for( var i=1;i<pages+1;i++) {
    
     document.getElementById('paginationPersonalCatalog').innerHTML+="<li class='page-item'><a class='page-link'  href='#' onclick='mostraPersonalCatalog("+i+")'>"+i+"</a></li>"

      } 
    }else  if (pages==1) {
      document.getElementById('paginationPersonalCatalog').innerHTML==""
    }
}

//pagina user_page.html

//calcolo i generi più visti di un utente-->in base ai film acquistati-->li salvo nel session storage
function statisticGenresSeen() {

  //creiamo dizionario con generi di tutti i film e numero di volte in cui compaiono tali generi
  var dict = {}
    var list= getUserMovieList()
    if(list.length>0) {
  sessionStorage.setItem('genres_seen', JSON.stringify(dict))
  
  var max=0
  var value=""
  for (var i=0;i<list.length;i++) {
      get_film(list[i],function(status,data) {

    var dizio=JSON.parse(sessionStorage.getItem('genres_seen'))
   
        
        for(j=0;j<data.genres.length;j++) {
         
          if(Object.keys(dizio).length===0) {

          
          dizio[data.genres[j].name]=1
          //per mettere il valore in stringa
          dizio[data.genres[j].name]=JSON.stringify(dizio[data.genres[j].name])


        } else {

            if(isPresent(dizio,data.genres[j].name)) { //se quel titolo è già una chiave di quel dizionario

               
                   dizio[data.genres[j].name]= JSON.parse(dizio[data.genres[j].name])+1
                   dizio[data.genres[j].name]=JSON.stringify(dizio[data.genres[j].name])
  
             } else {
              
                     dizio[data.genres[j].name]=1
                     dizio[data.genres[j].name]=JSON.stringify(dizio[data.genres[j].name])
            }
        }
   
      }
      
      sessionStorage.setItem('genres_seen',JSON.stringify(dizio))

    })

    }
  }
 }

function ChangeUserData() {


  name=document.getElementById('name').value
 
  last_name= document.getElementById('last_name').value
   //favourites_genres': JSON.stringify(saveChecked()),
  Email= document.getElementById('e-mail').value 

  fav_gen=returnFavouriteGenresChecked()
 
  var user=JSON.parse(sessionStorage.getItem('UserLogged'))
  

    
        var users=JSON.parse(localStorage.getItem('RegisteredUsers'))
        for (i=0; i<users.length; i++) {


          if (users[i]['username'] === user['username'] ){
            if( (users[i]['name'] == name)  && (users[i]['last_name'] == last_name) && (users[i]['e-mail'] == Email) &&(users[i]['favourites_genres'] == JSON.stringify(fav_gen))){
            alert('You have not made any changes')
            return
          }
            if(users[i]['name'] != name) {

              users[i]['name']= name;

            } else if (users[i]['last_name'] != last_name) {

              users[i]['last_name']= last_name;

            } else if (users[i]['e-mail'] !=Email)  {
  
              users[i]['e-mail']= Email;
            } else if (JSON.parse(users[i]['favourites_genres']!=fav_gen)) {
                users[i]['favourites_genres']=JSON.stringify(fav_gen)
            }

              
   
              localStorage.setItem('RegisteredUsers', JSON.stringify(users))
              sessionStorage.setItem('UserLogged', JSON.stringify(users[i]))
              document.getElementById('user_hello').innerHTML = "Ciao!</br><b>"+users[i].name+"</b></br>"
              alert('Your data has been changed!')

        }
      }
}
function mostraPersonalMovieList(value) {
 var list=getUserMovieList()

 if(list!=0) {
   document.getElementById('movie-list').innerHTML=""
  if(list.length<value*9) {
     for(var i=(value-1)*9;i<list.length;i++) {


  get_film(list[i],function(status,data) {
    if(data.poster_path==null) {
document.getElementById('movie-list').innerHTML+="<div class='caption' > <span id='title_caption'>"+data.title.toUpperCase()+"</span><span id='year_caption'>"+data.release_date+"</span> <a href='info_film.html?id="+ data.id+ "'> <img src='loc_error.jpg'  onMouseover=\"cambiacolore(getElementById('year_caption'))\"></div>";
    } else {

    document.getElementById('movie-list').innerHTML+="<div class='caption' > <span id='title_caption'>"+data.title.toUpperCase()+"</span><span id='year_caption'>"+data.release_date+"</span> <a href='info_film.html?id="+ data.id+ "'> <img src=\"https://image.tmdb.org/t/p/w500/" + data.poster_path +"\"  onMouseover=\"cambiacolore(getElementById('year_caption'))\"></div>";
  }

    

  });
  }
} else {

//il massimo di 9 lo stabilisco io
  for(var i=9*(value-1);i<value*9;i++) {


  get_film(list[i],function(status,data) {
    if(data.poster_path==null) {
document.getElementById('movie-list').innerHTML+="<div class='caption' > <span id='title_caption'>"+data.title.toUpperCase()+"</span><span id='year_caption'>"+data.release_date+"</span> <a href='info_film.html?id="+ data.id+ "'> <img src='loc_error.jpg'  onMouseover=\"cambiacolore(getElementById('year_caption'))\"></div>";
    } else {

    document.getElementById('movie-list').innerHTML+="<div class='caption' > <span id='title_caption'>"+data.title.toUpperCase()+"</span><span id='year_caption'>"+data.release_date+"</span> <a href='info_film.html?id="+ data.id+ "'> <img src=\"https://image.tmdb.org/t/p/w500/" + data.poster_path +"\"  onMouseover=\"cambiacolore(getElementById('year_caption'))\"></div>";
  }

    

  });
}
}
  
}else  {
  document.getElementById('movie-list').style="display:block"
  document.getElementById('movie-list').innerHTML="<h4>Your list is empty!</h4><a href='index.html'>Buy new films!</a>"
}
}

function createPagesUser() {
  var list=getUserMovieList()
 if (list.length!=0) {
  
 var pages= Math.ceil(list.length/9)
}

return pages

}


function showButtonUserList() {
    var pages=createPagesUser();

      document.getElementById('paginationUserList').innerHTML=""
      if(pages>1) {
      for( var i=1;i<pages+1;i++) {
    
     document.getElementById('paginationUserList').innerHTML+="<li class='page-item'><a class='page-link'  href='#' onclick='mostraPersonalMovieList("+i+")'>"+i+"</a></li>"

      } 
    }else  if (pages==1) {
      document.getElementById('paginationUserList').innerHTML=""
    }
}
   
//mi dice tutto querello che ho comprato in un ordidne
function reportOrder(i) {

var user= JSON.parse(sessionStorage.getItem('UserLogged'))
var titles=[]
  if(localStorage.getItem('Orders')!=null) {
   
  var orders=JSON.parse(localStorage.getItem('Orders'))

    
    if(orders[i]['user']==user['username']) {
      var items=JSON.parse(orders[i]['items'])
      for(var j=0;j<items.length;j++) {

        titles.push(items[j]['title'])

      }
    }
  }

  var string=""
  for(var x=0;x<titles.length;x++) {
    string+=titles[x]+"\n"
  }
  return string

}
//pagina index.html

function SearchMovieForUsers() {
 document.getElementById('films').innerHTML=""


 //https://api.themoviedb.org/3/search/multi?api_key=e5cc0a861c328c8c659316a3fe327d0f&language=en-US&query="+document.getElementById('search').value+"&page=1&include_adult=false
get_url("https://api.themoviedb.org/3/search/movie?api_key=e5cc0a861c328c8c659316a3fe327d0f&language=en-US&query="+document.getElementById('search').value+"&page=1&include_adult=false", function(status,data) {


    if(data.results.length!=0) {
         
  
          nascondi(document.getElementById("containerCarousel"))
          nascondi(document.getElementById("containerCarouselUser"))
          
           mostra(document.getElementById('buttonChoices'))

         mostra(document.getElementById('containerFilms'))
         nascondi(document.getElementById('containerAct'))
         activateButton(document.getElementById('buttonFilms'))
         disactivateButton(document.getElementById('buttonAct'))

    

         for(i=0;i<data.results.length;i++) {
           
          var shopkeepers=JSON.parse(localStorage.getItem('RegisteredShopkeepers'))

        for (x=0; x<shopkeepers.length; x++) {
          

           var catalog=JSON.parse(shopkeepers[x]['catalog'])
           
             for ( var j= 0; j< catalog.length; j++) {

//filtro solo i film in vendita
              if(data.results[i].id==catalog[j]) {
                  if(data.results[i].poster_path==null) {
                    document.getElementById('films').innerHTML+="<div class='caption'> <span id='title_caption'>"+shopkeepers[x]['company_name']+"</span><span id='year_caption'>"+data.results[i].release_date+"</span> <a href='info_film.html?id="+ data.results[i].id + "&shopkeeper="+shopkeepers[x]['company_name']+"'> <img src='loc_error.jpg'  onMouseover=\"cambiacolore(getElementById('year_caption'))\"></div>"

                  } else {
        

          document.getElementById('films').innerHTML+="<div class='caption'> <span id='title_caption'>"+shopkeepers[x]['company_name']+"</span><span id='year_caption'>"+data.results[i].release_date+"</span> <a href='info_film.html?id="+ data.results[i].id + "&shopkeeper="+shopkeepers[x]['company_name']+"'> <img src=\"https://image.tmdb.org/t/p/w500/" + data.results[i].poster_path +"\"  onMouseover=\"cambiacolore(getElementById('year_caption'))\"></div>"
        }
      
       }  
     }
   }
   if( document.getElementById('films').innerHTML=="") {
      document.getElementById('films').innerHTML="</br><h5>No Movies for sales for this search</h5>"
   }
  
 }

SearchActhor(1)
       




  } else {
    document.getElementById('films').innerHTML="</br><h5>No films for this search</h5>"
    document.getElementById('paginationFilms').innerHTML=""
    SearchActhor(1)
    mostra(document.getElementById('containerAct'))
   nascondi(document.getElementById('containerFilms'))
   activateButton(document.getElementById('buttonAct'))
   disactivateButton(document.getElementById('buttonFilms'))

     }
 
});
}

function returnPagesFilmSearch(callback) {
     const url = window.location.search;
     const urlParams = new URLSearchParams(url);
     var id= urlParams.get('id')
     var pages=0

     get_url("https://api.themoviedb.org/3/search/movie?api_key=e5cc0a861c328c8c659316a3fe327d0f&language=en-US&query="+document.getElementById('search').value+"&page=1&include_adult=false", function(status,data) {


     callback(data.total_pages);
     
    })
     //console.log(pages)
     //eturn pages
   }

function returnPagesActSearch(callback) {
     const url = window.location.search;
     const urlParams = new URLSearchParams(url);
     var id= urlParams.get('id')
     var pages=0

     get_url("https://api.themoviedb.org/3/search/person?api_key=e5cc0a861c328c8c659316a3fe327d0f&language=en-US&query="+document.getElementById('search').value+"&page=1&include_adult=false", function(status,data) {


     callback(data.total_pages);
     
    })

   }

        
 function showButtonFilms() {
    returnPagesFilmSearch(function (pages) { //richiamo la funzione in modo da poter utilizzare il valore 
      document.getElementById('paginationFilms').innerHTML=""
    if (pages>12) {
      //scelgo io il massimo di pagine-->12
     for(var i=1;i<13;i++) {
    
         document.getElementById('paginationFilms').innerHTML+="<li class='page-item'><a class='page-link' href='#' onclick='SearchMovie("+i+")'>"+i+"</a></li>"
     }
    } else if((pages>1) && (pages<=12)) {
      for( var i=1;i<pages+1;i++) {
    
      document.getElementById('paginationFilms').innerHTML+="<li class='page-item'><a class='page-link'  href='#' onclick='SearchMovie("+i+")'>"+i+"</a></li>"

      }
    } else if(pages==1) {
        document.getElementById('paginationFilms').innerHTML=""
    }

   })
  }




function SearchMovie(value) {


 //https://api.themoviedb.org/3/search/multi?api_key=e5cc0a861c328c8c659316a3fe327d0f&language=en-US&query="+document.getElementById('search').value+"&page=1&include_adult=false
get_url("https://api.themoviedb.org/3/search/movie?api_key=e5cc0a861c328c8c659316a3fe327d0f&language=en-US&query="+document.getElementById('search').value+"&page="+value+"&include_adult=false", function(status,data) {


    if(data.results.length!=0) {
         
         document.getElementById('films').innerHTML=""
          nascondi(document.getElementById("containerCarousel"))
          mostra(document.getElementById('buttonChoices'))
        
  

         mostra(document.getElementById('containerFilms'))
         nascondi(document.getElementById('containerAct'))
         activateButton(document.getElementById('buttonFilms'))
         disactivateButton(document.getElementById('buttonAct'))

    

         for(i=0;i<data.results.length;i++) {
          if(data.results[i].poster_path==null) {
 document.getElementById('films').innerHTML+="<div class='caption'> <span id='title_caption'>"+data.results[i].
  title.toUpperCase()+"</span><span id='year_caption'>"+data.results[i].release_date+"</span> <a href='info_film.html?id="+ data.results[i].id
  + "'><img src='loc_error.jpg' onMouseover=\"cambiacolore(getElementById('year_caption'))\"></div>"
          } else {
 document.getElementById('films').innerHTML+="<div class='caption'> <span id='title_caption'>"+data.results[i].
  title.toUpperCase()+"</span><span id='year_caption'>"+data.results[i].release_date+"</span> <a href='info_film.html?id="+ data.results[i].id
  + "'><img src=\"https://image.tmdb.org/t/p/w500/" + data.results[i].poster_path +"\"  onMouseover=\"cambiacolore(getElementById('year_caption'))\"></div>"
          }
        
      
       }  

       showButtonFilms()
      SearchActhor(1)
  } else {
    document.getElementById('films').innerHTML="</br><h5>No films for this search</h5>"
    document.getElementById('paginationFilms').innerHTML=""
    SearchActhor(1)
    mostra(document.getElementById('containerAct'))
   nascondi(document.getElementById('containerFilms'))
   activateButton(document.getElementById('buttonAct'))
   disactivateButton(document.getElementById('buttonFilms'))

     }

       
});

  

}




 function showButtonAct() {
    returnPagesActSearch(function (pages){ //richiamo la funzione in modo da poter utilizzare il valore 
      document.getElementById('paginationAct').innerHTML=""
    if (pages>12) {
     for(var i=1;i<13;i++) {
    
         document.getElementById('paginationAct').innerHTML+="<li class='page-item'><a class='page-link' href='#' onclick='SearchActhor("+i+")'>"+i+"</a></li>"
     }
    } else if( pages>1 && pages<=12) {
      for( var i=1;i<pages+1;i++) {
    
     document.getElementById('paginationAct').innerHTML+="<li class='page-item'><a class='page-link'  href='#' onclick='SearchActhor("+i+")'>"+i+"</a></li>"

      } 
    } else if (pages==1) {
      document.getElementById('paginationAct').innerHTML==""
    }

   })

}

function SearchActhor(value) {


 //https://api.themoviedb.org/3/search/multi?api_key=e5cc0a861c328c8c659316a3fe327d0f&language=en-US&query="+document.getElementById('search').value+"&page=1&include_adult=false
get_url("https://api.themoviedb.org/3/search/person?api_key=e5cc0a861c328c8c659316a3fe327d0f&language=en-US&query="+document.getElementById('search').value+"&page="+value+"&include_adult=false", function(status,data) {
  mostra(document.getElementById('buttonChoices'))
   nascondi(document.getElementById("containerCarousel"))
   

    
if(data.results.length==0) {
 

    document.getElementById('acthors').innerHTML="</br><h5>No results for this search</h5>"
     document.getElementById('paginationAct').innerHTML=""
    
 
  } else {
document.getElementById('acthors').innerHTML=""
         for(i=0;i<data.results.length;i++) {
          if(data.results[i].profile_path==null) {
document.getElementById('acthors').innerHTML+="<div class='caption'><span id='title_caption'>"+data.results[i].name.toUpperCase()+"</span><a href='info_attori.html?id="+ data.results[i].id + "'><img src='omino_error.jpg'></a></div>" 
          } else {

    
      document.getElementById('acthors').innerHTML+="<div class='caption'><span id='title_caption'>"+data.results[i].name.toUpperCase()+"</span><a href='info_attori.html?id="+ data.results[i].id + "'><img src=\"https://image.tmdb.org/t/p/w500/" + data.results[i].profile_path +" \"><b>"+data.results[i].name+"</b></a></div>" 
      }
       }  
       showButtonAct()
       //controllo se non mi ha dato nessun risultato
      }

});
}

//funzioni generiche
function isPresent(dict,value) {
  for(var key in dict) {
    if (key==value) {
      return true
    }
  }
  return false
 }

function contains(a, obj) {
    for (var i = 0; i < a.length; i++) {

        if (parseInt(a[i]) == obj) {
       
            return true;

        }
    }
    return false;
}

function cambiacolore(content) {
  content.style.backgroud="blue";
}

function mostra(content) {
content.style.display="block";
}

function nascondi(content) {
content.style.display="none";
}
function mostraErrore(input_text) {
          
  input_text.value="Questo campo è obbligatorio"

}

function containsString(a, obj) {
    for (var i = 0; i < a.length; i++) {

        if (a[i] == obj) {
       
            return true;

        }
    }
    return false;

}
function changeButtom() {
  document.getElementById('shop').disabled=true
  document.getElementById('rent').disabled=true
}


function activateButton(value) {

value.className = "btn btn-outline-dark active";
}
function disactivateButton(value) {
  value.className = "btn btn-outline-dark ";
}

function returnGenresID(name,callback) {
  get_url("https://api.themoviedb.org/3/genre/movie/list?api_key=e5cc0a861c328c8c659316a3fe327d0f", function(status,data) {
          for(i = 0; i < data.genres.length; i++) {
            if (data.genres[i].name==name) {
                callback(data.genres[i].id)
            }

          }

        
});
}


function SaveData() {
  if (document.getElementById('log_in_shopkeeper').style.display=="block") {
    SaveShopkeeperToLocalStorage();
  } else if  (document.getElementById('log_in_shopkeeper').style.display=="none") {
    SaveUserToLocalStorage();
  }
}

//ritorna lista di film di un utente-->accedendo agli ordini
function getUserMovieList() {
  var list= []

    var user=JSON.parse(sessionStorage.getItem('UserLogged'))
   
  var orders=JSON.parse(localStorage.getItem('Orders'))

  for(var i=0;i<orders.length;i++) {
    
    if(orders[i]['user']==user['username']) {

     var items=JSON.parse(orders[i]['items'])
      for(var j=0;j<items.length;j++) {
        
  
        list.push(items[j]['id'])
     
        }
      }
    }
    return list;
  }


function changeTextSuccess() {
  document.getElementById('success').innerHTML="<img src='check.png' width='30px'><b>Added to your personal catalog!</b>"
  document.getElementById('success').style="width:350px"
  document.getElementById('success').disabled=true
}
function changeTextDanger() {
  document.getElementById('danger').innerHTML="<img src='check.png' width='30px'><b>Removed from your personal catalog!</b>"
  document.getElementById('danger').style="width:350px"
  document.getElementById('danger').disabled=true
}


//funzioni di log-out

function log_out() {
 if(sessionStorage.getItem('UserLogged')!=null) {
   sessionStorage.removeItem('UserLogged');
   sessionStorage.removeItem('genres_seen')
  location.href="index.html"
 } else if (sessionStorage.getItem('ShopkeeperLogged')!=null) {
  sessionStorage.removeItem('ShopkeeperLogged');
  location.href="index.html"
 }

}


function confirmRemoval() {
  var r = confirm("Are you sure you want to remove your account?");
  if (r == true) {
    removeAccount()
  } 
}

function confirmDelete() {
  var r = confirm("Are you sure you want to remove this film from your catalog?");
  if (r == true) {
    RemoveFromCatalog();
  } 
}

function confirmShop() {
  var r = confirm("If you want to buy this film you have to register!");
  if (r == true) {
    location.href='log_in.html';
  } 
}


//funzione RIMOZIONE ACCOUNT

function removeAccount() {
   var user=JSON.parse(sessionStorage.getItem('UserLogged'))
   var shopkeeper=JSON.parse(sessionStorage.getItem('ShopkeeperLogged'))
   var users=JSON.parse(localStorage.getItem('RegisteredUsers'))
   var shopkeepers=JSON.parse(localStorage.getItem('RegisteredShopkeepers'))
    if(user!=null) {
        for (i=0; i<users.length; i++) {


          if (users[i]['username'] === user['username'] ) {
            users.splice(i,1)  
      
            localStorage.setItem('RegisteredUsers', JSON.stringify(users))
            log_out()
            

          }
        }
      } else if (shopkeeper!=null) {
        for (i=0; i<shopkeepers.length; i++) {


          if (shopkeepers[i]['username'] === shopkeeper['username'] ) {
             
            shopkeepers.splice(i,1)  //elimina l'i-esimo elemento-->'1' significa che ne elimino solo 1
      
            localStorage.setItem('RegisteredShopkeepers', JSON.stringify(shopkeepers))
            log_out()
            

          }
        }
      }
    }

//al click sulla navbar
function ShowPersonalPage() {   //mostra al click la pagina di registrazione se non sei loggato,altrimenti la user_page
 var user=JSON.parse(sessionStorage.getItem('UserLogged'))
 var shopkeeper=JSON.parse(sessionStorage.getItem('ShopkeeperLogged'))
 if ((user ===null) && (shopkeeper===null)){
  location.href="log_in.html"

 } else if (user!=null) {
  location.href= "user_page.html"
 } else if(shopkeeper!=null) {
  location.href="shopkeeper_page.html"
 }

}

//aggiunge film al CATALOGO VENIDTORE
function AddToCatalog() {

  const url = window.location.search;
  const urlParams = new URLSearchParams(url);
  var id= urlParams.get('id')

  var shopkeeper=JSON.parse(sessionStorage.getItem('ShopkeeperLogged'))
  

  var shopkeepers=JSON.parse(localStorage.getItem('RegisteredShopkeepers'))
        for (i=0; i<shopkeepers.length; i++) {


          if (shopkeepers[i]['username'] === shopkeeper['username'] ){

           var catalog=JSON.parse(shopkeepers[i]['catalog'])
           
           
           if(contains(catalog,id)==false) {
            catalog.push(id)
           }
          
        
           shopkeepers[i]['catalog']= JSON.stringify(catalog);
          
             localStorage.setItem('RegisteredShopkeepers',JSON.stringify(shopkeepers))
            sessionStorage.setItem('ShopkeeperLogged', JSON.stringify(shopkeepers[i]))
           
          }
        }
}


//RIMUOVE film al CATALOGO VENIDTORE
function RemoveFromCatalog() {

  const url = window.location.search;
  const urlParams = new URLSearchParams(url);
  var id= urlParams.get('id')

  var shopkeeper=JSON.parse(sessionStorage.getItem('ShopkeeperLogged'))
  

  var shopkeepers=JSON.parse(localStorage.getItem('RegisteredShopkeepers'))

        for (i=0; i<shopkeepers.length; i++) {


          if (shopkeepers[i]['username'] === shopkeeper['username'] ){


           var catalog=JSON.parse(shopkeepers[i]['catalog'])
           
             for ( var j= 0; j< catalog.length; j++) {

                    if (parseInt(catalog[j]) == id) {

                     catalog.splice(j,1)
                   
                      }
                    
                  }

     
             shopkeepers[i]['catalog']= JSON.stringify(catalog);

             localStorage.setItem('RegisteredShopkeepers',JSON.stringify(shopkeepers))
            sessionStorage.setItem('ShopkeeperLogged', JSON.stringify(shopkeepers[i]))
            location.href='javascript:history.back()'
            
           
          }
        }
      }


//FUNZIONI DI CHECK

   function check1(){
            var name = document.getElementById("name").value;

            var result = true;
            if(name.length > 0) {
              var regex = /^[a-z\s]+$/i

                if(name.length < 3) {
               
                    document.getElementById('name').style.borderBottom="solid 2px red"
                    document.getElementById('error_name').innerHTML = 'At least 3 characters' 
                    result = false;

                } else if(!name.match(regex)){   
                    document.getElementById('name').style.borderBottom="solid 2px red"  
                    document.getElementById('error_name').innerHTML = 'Enter only valid characters'   
                  
                    result = false; 

                } else  if (name.match(regex)){
                  document.getElementById('name').style.borderBottom="solid 2px green"
                  document.getElementById('error_name').innerHTML = ' '
                }

            } else {
              document.getElementById('name').style.borderBottom="solid 2px red"  
              document.getElementById('error_name').innerHTML = 'Required field'
              result = false; 

            }
            return result;
          }


function check2() {

          var last_name = document.getElementById("last_name").value;

            var result = true;
            if(last_name.length > 0) {
              var regex = /^[a-z\s]+$/i

                if(last_name.length < 3) {
               
                    document.getElementById('last_name').style.borderBottom="solid 2px red"
                    document.getElementById('error_last_name').innerHTML = 'At least 3 characters' 
                    result = false;

                } else if(!last_name.match(regex)){   
                    document.getElementById('last_name').style.borderBottom="solid 2px red"    
                    document.getElementById('error_last_name').innerHTML = 'Enter only valid characters'
                    result = false; 

                } else  if (last_name.match(regex)){
                  document.getElementById('last_name').style.borderBottom="solid 2px green"
                  document.getElementById('error_last_name').innerHTML = ' '
                }

            } else {
              document.getElementById('last_name').style.borderBottom="solid 2px red"  
              document.getElementById('error_last_name').innerHTML = 'Required field'
               result = false; 
            }

            return result;
          
          }

         

    function check3() {

          var eMail = document.getElementById("e-mail").value;

            var result = true;
            if(eMail.length > 0) {
              var regex = /^[_a-z0-9+-]+(\.[_a-z0-9+-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)+$/i

               if(!eMail.match(regex)){   
                    document.getElementById('e-mail').style.borderBottom="solid 2px red"    
                    document.getElementById('error_e-mail').innerHTML = 'Enter only valid characters'
                    result = false; 

                } else  if (eMail.match(regex)){
                  document.getElementById('e-mail').style.borderBottom="solid 2px green"
                  document.getElementById('error_e-mail').innerHTML = ' '
                }

            } else {
              document.getElementById('e-mail').style.borderBottom="solid 2px red"  
              document.getElementById('error_e-mail').innerHTML = 'Required field'
              result = false;
            }

            return result;
          
          }

           function check4() {

          
          var username = document.getElementById("username").value;

            var result = true;
            if(username.length > 0) {

              var regex = /^[a-z0-9]{4,10}$/i;

                /*if(cognom.length < 3) {
               
                    document.getElementById('last_name').style.borderBottom="solid 2px red"
                    alert('Il nome deve essere almeno di lunghezza 3')
                    result = false;*/

                 if(!username.match(regex)){ 

  
                    document.getElementById('username').style.borderBottom="solid 2px red"    
                    document.getElementById('error_username').innerHTML = 'Username must contain at least 4 and maximum 10 alphanumeric characters'
                    result = false; 

                } else  if (username.match(regex)){
                  document.getElementById('username').style.borderBottom="solid 2px green"
                  document.getElementById('error_username').innerHTML = ' '

                }

            } else {
              document.getElementById('username').style.borderBottom="solid 2px red"  
              document.getElementById('error_username').innerHTML = 'Required field' 
              result = false;         }

            return result;
          
          }


           function check5() {

          
          var pw= document.getElementById("password").value;

            var result = true;
            if(pw.length > 0) {

              var regex = /^[a-z0-9]{8,12}$/i;


                 if(!pw.match(regex)){ 

  
                    document.getElementById('password').style.borderBottom="solid 2px red"    
                    document.getElementById('error_password').innerHTML = 'Password must contain at least 8 and maximum 12 alphanumeric characters'
                    result = false; 

                } else  if (pw.match(regex)){
                  document.getElementById('password').style.borderBottom="solid 2px green"
                  document.getElementById('error_password').innerHTML = ' '

                }

            } else {
              document.getElementById('password').style.borderBottom="solid 2px red"  
              document.getElementById('error_password').innerHTML = 'Required field' 
              result = false;         }

            return result;
          
          }


           function check6() {

          
          var vat_number= document.getElementById("vat_number").value;

            var result = true;
            if(vat_number.length > 0) {

              var regex = /^[0-9]{11}$/;


                 if(!vat_number.match(regex)){ 

  
                    document.getElementById('vat_number').style.borderBottom="solid 2px red"    
                    document.getElementById('error_vat_number').innerHTML = 'VAT number must contain 11 digits'
                    result = false; 

                } else  if (vat_number.match(regex)){
                  document.getElementById('vat_number').style.borderBottom="solid 2px green"
                  document.getElementById('error_vat_number').innerHTML = ' '

                }

            } else {
              document.getElementById('vat_number').style.borderBottom="solid 2px red"  
              document.getElementById('error_vat_number').innerHTML = 'Required field' 
              result = false;           }

            return result;
          
          }

           function check7() {

          
          var company_name= document.getElementById("company_name").value;

            var result = true;
            if(company_name.length > 0) {

              var regex = /^[a-z0-9\s]+$/i;


                 if(!company_name.match(regex)){ 

  
                    document.getElementById('company_name').style.borderBottom="solid 2px red"    
                    document.getElementById('error_company_name').innerHTML = 'Enter only valid characters'
                    result = false; 

                } else  if (company_name.match(regex)){
                  document.getElementById('company_name').style.borderBottom="solid 2px green"
                  document.getElementById('error_company_name').innerHTML = ' '

                }

            } else {
              document.getElementById('company_name').style.borderBottom="solid 2px red"  
              document.getElementById('error_company_name').innerHTML = 'Required field' 
              result = false;           }

            return result;
          
          }

          function check8() {

          
          var telephone_number= document.getElementById("telephone_number").value;

            var result = true;
            if(telephone_number.length > 0) {

              var regex = /^[0-9]{9}$/;


                 if(!telephone_number.match(regex)){ 

  
                    document.getElementById('telephone_number').style.borderBottom="solid 2px red"    
                    document.getElementById('error_telephone_number').innerHTML = 'Numero non valido'
                    result = false; 

                } else  if (telephone_number.match(regex)){
                  document.getElementById('telephone_number').style.borderBottom="solid 2px green"
                  document.getElementById('error_telephone_number').innerHTML = ' '

                }

            } else {
              document.getElementById('telephone_number').style.borderBottom="solid 2px red"  
              document.getElementById('error_telephone_number').innerHTML = 'Required field' 
              result = false;           }

            return result;
          
          }
          function check9() {

          
          var city = document.getElementById("city").value;

            var result = true;
            if(city.length > 0) {

              var regex = /^[a-z\s]+$/i;


                 if(!city.match(regex)){ 

  
                    document.getElementById('city').style.borderBottom="solid 2px red"    
                    document.getElementById('error_city').innerHTML = 'Enter only valid characters'
                    result = false; 

                } else  if (city.match(regex)){
                  document.getElementById('city').style.borderBottom="solid 2px green"
                  document.getElementById('error_city').innerHTML = ' '

                }

            } else {
              document.getElementById('city').style.borderBottom="solid 2px red"  
              document.getElementById('error_city').innerHTML = 'Required field'
              result = false;           }

            return result;
          
          }


        function check10() {

          
          var address = document.getElementById("address").value;

            var result = true;
            if(address.length > 0) {

              var regex = /^[a-z0-9\s]+$/i;


                 if(!address.match(regex)){ 

  
                    document.getElementById('address').style.borderBottom="solid 2px red"    
                    document.getElementById('error_address').innerHTML = 'Enter only valid characters'
                    result = false; 

                } else  if (address.match(regex)){
                  document.getElementById('address').style.borderBottom="solid 2px green"
                  document.getElementById('error_address').innerHTML = ' '

                }

            } else {
              document.getElementById('address').style.borderBottom="solid 2px red"  
              document.getElementById('error_address').innerHTML = 'Required field'   
              result = false;         }

            return result;
          
          }
          function check11() {

          
          var sellingPrice = document.getElementById("selling-price").value;

            var result = true;
            if(sellingPrice.length > 0) {

              var regex =  /^\d+(\.\d{1,2})?$/;


                 if(!sellingPrice.match(regex)){ 

  
                    document.getElementById('selling-price').style.borderBottom="solid 2px red"    
                    document.getElementById('error_selling-price').innerHTML = 'Enter only valid characters'
                    result = false; 

                } else  if (sellingPrice.match(regex)){
                  document.getElementById('selling-price').style.borderBottom="solid 2px green"
                  document.getElementById('error_selling-price').innerHTML = ' '

                }

            } else {
              document.getElementById('selling-price').style.borderBottom="solid 2px red"  
              document.getElementById('error_selling-price').innerHTML = 'Required field'   
              result = false;         }

            return result;
          
          }

                function check12() {

          
          var rentalPrice = document.getElementById("rental-price").value;

            var result = true;
            if(rentalPrice.length > 0) {

              var regex =  /^\d+(\.\d{1,2})?$/;


                 if(!rentalPrice.match(regex)){ 

  
                    document.getElementById('rental-price').style.borderBottom="solid 2px red"    
                    document.getElementById('error_rental-price').innerHTML = 'Enter only valid characters'
                    result = false; 

                } else  if (rentalPrice.match(regex)){
                  document.getElementById('rental-price').style.borderBottom="solid 2px green"
                  document.getElementById('error_rental-price').innerHTML = ' '

                }

            } else {
              document.getElementById('rental-price').style.borderBottom="solid 2px red"  
              document.getElementById('error_rental-price').innerHTML = 'Required field'   
              result = false;         }

            return result;
          
          }

  
//popup-->aggiunto al carrello

function myPopup() {
  mostra(document.getElementById("myPopup"))
  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");

setTimeout(function(){ nascondi(popup) }, 3000);
}



//controllo se film esiste già nella lista dei film degli utenti
function filmExistsInUserList(id) {
  
  var user= JSON.parse(sessionStorage.getItem('UserLogged'))
  if(localStorage.getItem('Orders')!=null) {
   
  var orders=JSON.parse(localStorage.getItem('Orders'))

  for(var i=0;i<orders.length;i++) {
    
    if(orders[i]['user']==user['username']) {

     var items=JSON.parse(orders[i]['items'])
      for(var j=0;j<items.length;j++) {
  
        if(items[j]['id']==id) {
              console.log('ciao')
          return true
        }
      }
    }
  }
}
  return false;
}


//FUNZIONE TIMEOUT
function timeOutRental() {
  const url = window.location.search;
  const urlParams = new URLSearchParams(url);
  var id= urlParams.get('id')

var dataOggi = new Date()   
                             

  var user= JSON.parse(sessionStorage.getItem('UserLogged'))
  if(localStorage.getItem('Orders')!=null) {
   
  var orders=JSON.parse(localStorage.getItem('Orders'))

  for(var i=0;i<orders.length;i++) {
    
    if(orders[i]['user']==user['username'])  {

     var items=JSON.parse(orders[i]['items'])
      for(var j=0;j<items.length;j++) {
      //controllo se questo film(con questo id)è stato afittato
        if((items[j]['rental']==true) && (JSON.parse(items[j]['id'])==id)) {

           var dataOrdine = new Date(orders[i]['date']+" "+orders[i]['hour'])


          if ( +dataOggi > dataOrdine.setDate(dataOrdine.getDate() +3 )) {
  
            return true //è scaduto il tempo
          }
        } 
        

      }
    }
  }
}
return false;



}





