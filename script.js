document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('fileInput');
    const videoPlayer = document.getElementById('videoPlayer');
    const resultElement = document.getElementById('result');
    const loadingElement = document.getElementById('loading');
    const randomScoreElement = document.getElementById('randomScore');
    const messageElement = document.getElementById('message');
    const resultsList = document.getElementById('lastResults');

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
                videoPlayer.src = '';
                videoPlayer.load();
                fileInput.value = '';
                fileInput.disabled = false;
            }, 4000);
        }, 4000);
    });

    function updateMessage(score) {
        let message = '';
        if (score <= 70) {
            message = 'Você pode fazer melhor do que isso';
        } else if (score <= 80) {
            message = 'Bom trabalho, mas ainda pode melhorar!';
        } else if (score <= 90) {
            message = 'Ótimo! Você está quase lá!';
        } else {
            message = 'Incrível! Você é um superstar do karaokê!';
        }
        messageElement.textContent = message;
    }

    function addAndSaveResult(score) {
        const gradientStyle = `linear-gradient(to right, #27ae60 ${score}%, #fff ${score}%)`;
        addResultToList(score, gradientStyle);
        saveResults({ score, gradientStyle });
    }

    function addResultToList(score, style) {
        const newItem = document.createElement('li');
        newItem.textContent = score + '%';
        newItem.style.background = style;
        resultsList.insertBefore(newItem, resultsList.firstChild);
    }

    function loadSavedResults() {
        const savedResults = JSON.parse(localStorage.getItem('karaokeResults')) || [];
        savedResults.reverse().forEach(result => {
            addResultToList(result.score, result.gradientStyle);
        });
    }
    
    function saveResults(result) {
        let savedResults = JSON.parse(localStorage.getItem('karaokeResults')) || [];
        savedResults.unshift(result);
        savedResults = savedResults.slice(0, 100); // Limit to 100 results for performance
        localStorage.setItem('karaokeResults', JSON.stringify(savedResults));
    }
});
