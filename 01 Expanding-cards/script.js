const imgs = document.querySelectorAll('.panel');

// img.addEventListener('click', () =>{
    imgs.forEach((img) =>{

        img.addEventListener('click', (e) =>{
            // console.log(e.target);

            // if(e.target.classList.contains('active')){
            //     e.target.classList.remove('active')
            // } else{
            //     e.target.classList.add('active')
            // }
            removeActiveClass()

            e.target.classList.toggle('active')
            
        })
    })
// })

 const removeActiveClass = function(){
    imgs.forEach( img =>{
        img.classList.remove('active')
    })
 }