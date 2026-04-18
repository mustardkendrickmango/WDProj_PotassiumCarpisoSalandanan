let rating = 0;

const stars = document.querySelectorAll('.star');

const seasonData = { 
    "1": 24, 
    "2": 23, 
    "3": 12 
};

function updateStars(rating) {
    stars.forEach(star => {
        star.classList.toggle('selected', star.getAttribute('data-value') <= rating);
        });
    }

    stars.forEach(star=>{
        star.addEventListener("click", function(){
            rating = this.dataset.value

            stars.forEach(s=>s.classList.remove("active"))

                for(let i = 0; i < rating; i++){
                    stars[i].classList.add("active")
                }
            })
    })

    function updateEpisode() {
        const seasonSelect = document.getElementById('season');
        const episodeSelect = document.getElementById('episode');
        const selectedSeason = seasonSelect.value;

        episodeSelect.innerHTML = '<option value="" disabled selected>Choose Episode</option>';
        episodeSelect.disabled = false;

        const count = seasonData[selectedSeason];
        for (let i = 1; i <= count; i++) {
            let opt = document.createElement('option');
            opt.value = i;
            opt.innerHTML = `Episode ${i}`;
            episodeSelect.appendChild(opt);
        }
    }

    function addRating() {
        const season = document.getElementById('season').value;
        const episode = document.getElementById('episode').value;
        const comments = document.getElementById('comments').value;

        if (!season || !episode || rating === 0) {
            alert("Fill in all fields.");
            return;
        }

        const logId = `S${season}E${episode}`;
        const logTitle = `Season ${season}, Episode ${episode}`;

        const entry = {
            id: logId,
            title: logTitle,
            comments: comments,
            rating: Number(rating)
        };

        let logs = JSON.parse(localStorage.getItem('borderland_logs')) || [];
        const index = logs.findIndex(l => l.id === logId);

        if (index !== -1) {
            logs[index] = entry;
        } else {
            logs.push(entry);
        }

        localStorage.setItem('borderland_logs', JSON.stringify(logs));
        clearForm();
        displayRatings();   
    }

    function clearForm() {
        document.getElementById('season').value = "";
        document.getElementById('episode').innerHTML = '<option value="" disabled selected>Select Season first</option>';
        document.getElementById('episode').disabled = true;
        document.getElementById('comments').value = '';
        rating = 0;
        updateStars(0);
    }

    function displayRatings() {
        const logs = JSON.parse(localStorage.getItem('borderland_logs')) || [];
        const container = document.querySelector('.epRatings');
        container.innerHTML = '';

        logs.forEach((log, index) => {
            const item = document.createElement('div');
            item.className = 'episode-log-item';
            item.innerHTML = `
                <h4>${log.title}</h4>
                <div class="log-stars">${'★'.repeat(log.rating)}</div>
                <span class="log-notes">${log.comments ? '"' + log.comments + '"' : 'No comments made.'}</span>
                <button class="delete-log" onclick="deleteRatings(${index})">DELETE</button>
            `;
            container.appendChild(item);
        });
    }

    function deleteRatings(index) {
        if (confirm("Delete this rating permanently?")) {
            let logs = JSON.parse(localStorage.getItem('borderland_logs')) || [];
            logs.splice(index, 1);
            localStorage.setItem('borderland_logs', JSON.stringify(logs));
            displayRatings();
        }
    }

displayRatings();