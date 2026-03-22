const content = document.querySelector("#tableBody");
const submit = document.querySelector("#add");
const update = document.querySelector("#update");

//POST API
submit.addEventListener('click', () => {
    let song_title = document.querySelector("#song_title").value;
    let artist = document.querySelector("#artist").value;
    let album = document.querySelector("#album").value;
    let genre = document.querySelector("#genre").value;
    let year_release = document.querySelector("#year_release").value;
    let formData = { song_title, artist, album, genre, year_release };
    fetch("http://localhost:1111/api/songs", {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
    }).catch((error) => { console.log(error); })
    alert("Song Added Successfully");
    location.reload();
});

window.addEventListener('load', () => {
    getSongs();
})

function getSongs() {
    let html = "";
    fetch('http://localhost:1111/api/songs', { mode: 'cors' })
    .then(response => {
        console.log(response);
        return response.json();
    })
    .then(data => {
        console.log(data);
        data.forEach((element, index) => {
            html += `
            <div class="song-row">
                <div class="col-title-cell">
                    <div class="track-thumb"><i class="fas fa-music"></i></div>
                    <div class="track-info">
                        <div class="track-title">${element.song_title}</div>
                        <div class="track-artist">${element.artist}</div>
                    </div>
                </div>
                <div class="col-album-cell">${element.album}</div>
                <div class="col-genre-cell">
                    <span class="genre-pill">${element.genre}</span>
                </div>
                <div class="col-year-cell">${element.year_release}</div>
                <div class="col-actions-cell">
                    <a class="btn-delete" href="javascript:void(0)" onClick="deleteSong(${element.id})" title="Delete">
                        <i class="fas fa-trash"></i>
                    </a>
                    <a class="btn-edit" href="javascript:void(0)" onClick="updateSong(${element.id})" title="Edit">
                        <i class="fas fa-pen"></i>
                    </a>
                </div>
            </div>`;
        });
        content.innerHTML = html;
    })
    .catch(error => { console.log(error); });
}

//DELETE
function deleteSong(id) {
    if (confirm("Are you sure you want to delete this song?")) {
        fetch("http://localhost:1111/api/songs", {
            method: 'DELETE',
            body: JSON.stringify({ id }),
            headers: { "Content-Type": "application/json" },
        }).then(response => response.text())
        .then(response => {
            console.log(response);
            location.reload();
        })
        .catch(error => { console.log(error); });
    } else {
        alert("You Canceled!");
    }
}

//search
function updateSong(id) {
    fetch(`http://localhost:1111/api/songs/${id}`)
    .then(response => response.json())
    .then(data => {
        document.querySelector("#song_title").value = data[0].song_title;
        document.querySelector("#artist").value = data[0].artist;
        document.querySelector("#album").value = data[0].album;
        document.querySelector("#genre").value = data[0].genre;
        document.querySelector("#year_release").value = data[0].year_release;
        document.querySelector("#ID").value = data[0].id;
    }).catch(error => { console.log(error); })
}

//PUT
update.addEventListener('click', () => {
    let song_title = document.querySelector("#song_title").value;
    let artist = document.querySelector("#artist").value;
    let album = document.querySelector("#album").value;
    let genre = document.querySelector("#genre").value;
    let year_release = document.querySelector("#year_release").value;
    let id = document.querySelector("#ID").value;
    let formData = { song_title, artist, album, genre, year_release, id };
    fetch(`http://localhost:1111/api/songs`, {
        method: 'PUT',
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
    }).catch((error) => { console.log(error); })
    alert("Song Updated Successfully");
    location.reload();
})