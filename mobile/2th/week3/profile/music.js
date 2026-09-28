(() => {
    const audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
    audio.loop = true;
    audio.preload = 'none';
    audio.volume = 0.3;

    const player = document.createElement('aside');
    player.className = 'music-player';
    player.setAttribute('aria-label', '배경 음악 플레이어');

    const copy = document.createElement('div');
    copy.className = 'music-player-copy';

    const title = document.createElement('span');
    title.className = 'music-player-title';
    title.textContent = '배경 음악';

    const status = document.createElement('span');
    status.className = 'music-player-status';
    status.textContent = '자동 재생 시도 중';

    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = '▶';
    button.setAttribute('aria-label', '배경 음악 재생');
    button.title = '배경 음악 재생';

    copy.append(title, status);
    player.append(copy, button);
    document.body.append(player);

    const updatePlayer = (playing) => {
        button.textContent = playing ? 'Ⅱ' : '▶';
        button.setAttribute('aria-label', playing ? '배경 음악 일시 정지' : '배경 음악 재생');
        button.title = playing ? '배경 음악 일시 정지' : '배경 음악 재생';
        status.textContent = playing ? 'SoundHelix · 재생 중' : '버튼을 눌러 재생';
    };

    button.addEventListener('click', async () => {
        if (audio.paused) {
            try {
                await audio.play();
                updatePlayer(true);
            } catch {
                status.textContent = '음악을 불러오지 못했습니다';
            }
        } else {
            audio.pause();
            updatePlayer(false);
        }
    });

    audio.addEventListener('play', () => updatePlayer(true));
    audio.addEventListener('pause', () => updatePlayer(false));
    audio.addEventListener('error', () => {
        status.textContent = '음악 파일을 불러오지 못했습니다';
    });

    audio.play().catch(() => updatePlayer(false));
})();