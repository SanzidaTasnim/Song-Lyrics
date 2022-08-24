const searchButton = document.getElementById('search-btn');
const result = document.getElementById('result');

searchButton.addEventListener('click',function(){
   const searchSong = document.getElementById('search-song').value;
   if(!searchSong){
      alert('Nothing To Search!');
   }else{
      const apiUrl = `https://api.lyrics.ovh/suggest/${searchSong}`;
      fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
      showSong(data);
   })
   }
   
})

function showSong(data) {
   const requiredData = data.data.slice(0,10);
   result.innerHTML = 
      `<div>
      ${requiredData.map(song => `
      <div class="single-result row align-items-center my-3 p-3">
         <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by <span>${song.artist.name}</span></p>
         </div>
      
         <div class="col-md-3 text-md-right text-center">
            <button class="btn btn-success" data-title="${song.title}" data-artist="${song.artist.name}">Get Lyrics</button>
         </div>
      </div>
      `)
      .join(``)}
   <div/>`;
}

result.addEventListener('click', e =>{
   const clickElement = e.target;
   if(clickElement.tagName === 'BUTTON'){
      const songTitle = clickElement.getAttribute('data-title');
      const songArtist = clickElement.getAttribute('data-artist');
      getLyrics(songTitle,songArtist);
   }
});

async function getLyrics(songTitle, songArtist){
   const url = `https://api.lyrics.ovh/v1/${songArtist}/${songTitle}`;

   const res = await fetch(url);
   const data = await res.json();
   const lyrics = data.lyrics;
   result.innerHTML = `
      <div class='full-lyrics'>
         <h2>${songArtist} - ${songTitle}</h2>
         <p>${lyrics}</p>
      </div>
   `
};
