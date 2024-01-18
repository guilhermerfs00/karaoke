document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('fileInput');
    const videoPlayer = document.getElementById('videoPlayer');
    const resultElement = document.getElementById('result');
    const loadingElement = document.getElementById('loading');
    const randomScoreElement = document.getElementById('randomScore');
    const messageElement = document.getElementById('message');
    const resultsList = document.getElementById('lastResults'); // Adiciona um elemento para exibir os resultados

    // Carrega os resultados salvos quando a página é carregada
    loadSavedResults();

    fileInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            videoPlayer.src = URL.createObjectURL(file);
            videoPlayer.style.display = 'block';
            videoPlayer.load();
            videoPlayer.play();
            fileInput.disabled = true;
        }
    });

    videoPlayer.addEventListener('ended', function() {
        loadingElement.style.display = 'block';

        setTimeout(function() {
            loadingElement.style.display = 'none';

            const randomScore = Math.floor(Math.random() * 51) + 50;
            randomScoreElement.textContent = randomScore;
            updateMessage(randomScore);
            addAndSaveResult(randomScore);

            resultElement.style.display = 'flex';

            setTimeout(function() {
                resultElement.style.display = 'none';
                fileInput.disabled = false;
                // Não recarrega a página para manter os resultados visíveis
            }, 10000);
        }, 4000);
    });

    function updateMessage(score) {
        let message = '';
        if (score <= 70) {
            message = 'Você pode fazer melhor do que isso';
        } else if (score <= 80) {
            message = 'Foi bom mas pode melhorar, tente novamente !';
        } else if (score <= 90) {
            message = 'Muito bom, você é quase um profissional';
        } else {
            message = 'EXCELENTEEEEE !';
        }
        messageElement.textContent = message;
    }

    function addAndSaveResult(score) {
        const newItem = document.createElement('li');
        newItem.textContent = score + '%';
        resultsList.insertBefore(newItem, resultsList.firstChild);

        saveResults(score);
    }

    function loadSavedResults() {
        const savedResults = JSON.parse(localStorage.getItem('karaokeResults')) || [];
        savedResults.reverse().forEach(score => {
            const newItem = document.createElement('li');
            newItem.textContent = score + '%';
            resultsList.appendChild(newItem);
        });
    }

    function saveResults(newScore) {
        let savedResults = JSON.parse(localStorage.getItem('karaokeResults')) || [];
        savedResults.unshift(newScore);
        savedResults = savedResults.slice(0, 10);
        localStorage.setItem('karaokeResults', JSON.stringify(savedResults));
    }
});
