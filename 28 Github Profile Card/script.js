const APIURL = 'https://api.github.com/users/';

const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');

// getUser('adnan-revnix')


// function getUser(username) {
//     axios(APIURL + username)
//         .then(res =>  console.log(res.data))
//         .catch(err => console.log(err))
// }


async function getUser(username) {

    try {
        const {data} = await axios(APIURL + username);
        createCard(data);
        getRepos(username)

    }catch(err) {
        if(err.response.status == 404) {
            createErrorCard('No User Found')

        } else if (err.response.status == 403) {

            createErrorCard(`${err.response.status} Forbidden`)
            
            console.log(err.response.status)
        }
    } 
     
}

async function getRepos(username) {
    try {
        const {data} = await axios(APIURL + username + '/repos?sort=created');
        addReposToCard(data);

    }  catch(err) {

        createErrorCard('Problem Fetching Repos')
} 

}

function createCard(user) {
    const cardHTML = `
    <div class="card">
        <div>
            <img src="${user.avatar_url}" alt="" class="avatar">
        </div>
        <div class="user-info">
            <h2>${user.name}</h2>
            <p>${user.bio}</p>
            <ul>
                <li>${user.followers} <strong>Followers</strong></li>
                <li>${user.following} <strong>Following</strong></li>
                <li>${user.public_repos} <strong>repos</strong></li>
            </ul>

            <div id="repos"> </div>
        </div>
    </div>
    `;

    main.innerHTML = cardHTML
}


function createErrorCard(msg) {

    const cardHTML = `
        <div class='card'>
            <h1> ${msg} </h1>
        </div>
    `;

    main.innerHTML = cardHTML;
}

function addReposToCard(repos) {
    const  reposEl = document.getElementById('repos');

    repos.slice(0, 10).forEach(repo => {
         const repoLink = document.createElement('a');
         repoLink.classList.add('repo');
         repoLink.href = repo.html_url;

         repoLink.target = "_blank";

         repoLink.innerText= repo.name;

         reposEl.append(repoLink)
    })
}
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = search.value
    if(user) {
        getUser(user);

        search.value= ''
    }
})