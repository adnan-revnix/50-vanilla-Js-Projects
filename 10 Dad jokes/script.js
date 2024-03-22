const joke = document.getElementById('joke')
const jokeBtn = document.getElementById('joke-btn');

jokeBtn.addEventListener('click', genreatejoke)

 function genreatejoke (){

    
  fetch(('https://icanhazdadjoke.com/'),{
   
    headers:{
        'Accept': 'application/json',
        // 'Accept': 'text/plain',
    //   'Content-Type': 'application/json'
    }
 }).then(res =>  res.json()).then(data => joke.innerHTML = data.joke);
 
 }

 genreatejoke()

