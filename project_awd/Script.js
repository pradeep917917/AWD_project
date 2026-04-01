// ═══════════════════════════════════════════════════════
//  MUSIFY — script.js
// ═══════════════════════════════════════════════════════

// ── TYPES (JSDoc / TypeScript equivalent) ──────────────
/*
  @typedef {{ id:number, title:string, artist:string, album:string,
    genre:string, duration:number, favorite:boolean, playCount:number,
    emoji:string, audioSrc:string|null, srcType:'file'|'url'|'demo' }} Song
  @typedef {{ name:string, songs:Song[], createdDate:string, songCount:number }} Playlist
*/

// ── SONG DATA ──────────────────────────────────────────
/** @type {Song[]} */
const songs = [
  { id:1,  title:"Rowdy Baby",          artist:"Dhanush & Dhee",    album:"Maari 2",           genre:"Tamil Pop",     duration:234, favorite:false, playCount:0, emoji:"🎤", audioSrc:null, srcType:"demo" },
  { id:2,  title:"Kannaana Kanney",     artist:"D. Imman",          album:"Viswasam",           genre:"Tamil Folk",    duration:318, favorite:false, playCount:0, emoji:"💛", audioSrc:null, srcType:"demo" },
  { id:3,  title:"Vaathi Coming",       artist:"Anirudh",           album:"Master",             genre:"Tamil Hip-Hop", duration:197, favorite:false, playCount:0, emoji:"🔥", audioSrc:null, srcType:"demo" },
  { id:4,  title:"Enjoy Enjaami",       artist:"Dhee & Arivu",      album:"Enjoy Enjaami",      genre:"Tamil Folk",    duration:286, favorite:true,  playCount:0, emoji:"🌿", audioSrc:null, srcType:"demo" },
  { id:5,  title:"Chinna Chinna Aasai", artist:"A.R. Rahman",       album:"Roja",               genre:"Tamil Classic", duration:305, favorite:false, playCount:0, emoji:"🌹", audioSrc:null, srcType:"demo" },
  { id:6,  title:"Kuthu Paramasivam",   artist:"Vijay Antony",      album:"Paramasivam",        genre:"Tamil Folk",    duration:248, favorite:false, playCount:0, emoji:"🥁", audioSrc:null, srcType:"demo" },
  { id:7,  title:"Aalaporan Tamizhan",  artist:"A.R. Rahman",       album:"Mersal",             genre:"Tamil Mass",    duration:274, favorite:true,  playCount:0, emoji:"🇮🇳", audioSrc:null, srcType:"demo" },
  { id:8,  title:"Kaavaalaa",           artist:"Anirudh",           album:"Jailer",             genre:"Tamil Pop",     duration:211, favorite:false, playCount:0, emoji:"💃", audioSrc:null, srcType:"demo" },
  { id:9,  title:"Naatu Naatu",         artist:"M.M. Keeravani",    album:"RRR",                genre:"Tamil Mass",    duration:243, favorite:true,  playCount:0, emoji:"🏆", audioSrc:null, srcType:"demo" },
  { id:10, title:"Surviva",             artist:"Anirudh",           album:"Vikram",             genre:"Tamil Hip-Hop", duration:188, favorite:false, playCount:0, emoji:"⚔️", audioSrc:null, srcType:"demo" },
  { id:11, title:"Roja Kaathal",        artist:"A.R. Rahman",       album:"Roja",               genre:"Tamil Classic", duration:331, favorite:false, playCount:0, emoji:"🌸", audioSrc:null, srcType:"demo" },
  { id:12, title:"Vettai Mannan",       artist:"Anirudh",           album:"Leo",                genre:"Tamil Mass",    duration:223, favorite:false, playCount:0, emoji:"🦁", audioSrc:null, srcType:"demo" },
  { id:13, title:"Nenjukkul Peidhidum", artist:"Harris Jayaraj",    album:"Vaaranam Aayiram",   genre:"Tamil Melody",  duration:342, favorite:true,  playCount:0, emoji:"🌧️", audioSrc:null, srcType:"demo" },
  { id:14, title:"Unnai Kaanadhu Naan", artist:"A.R. Rahman",       album:"180",                genre:"Tamil Melody",  duration:298, favorite:false, playCount:0, emoji:"🎶", audioSrc:null, srcType:"demo" },
  { id:15, title:"Moves Like Jagger",   artist:"Yuvan Shankar Raja", album:"Mankatha",          genre:"Tamil Mass",    duration:217, favorite:false, playCount:0, emoji:"🕺", audioSrc:null, srcType:"demo" },
  { id:16, title:"Azhagiya Laila",      artist:"Vijay Antony",      album:"Naan",               genre:"Tamil Pop",     duration:256, favorite:false, playCount:0, emoji:"❤️", audioSrc:null, srcType:"demo" },
  { id:17, title:"Roja Roja",           artist:"A.R. Rahman",       album:"Roja",               genre:"Tamil Classic", duration:289, favorite:false, playCount:0, emoji:"🌺", audioSrc:null, srcType:"demo" },
  { id:18, title:"Pattu Vaasi",         artist:"Anirudh",           album:"Enthiran",           genre:"Tamil Pop",     duration:204, favorite:false, playCount:0, emoji:"🤖", audioSrc:null, srcType:"demo" },
  { id:19, title:"Inaindha Kaigal",     artist:"G.V. Prakash",      album:"Aadukalam",          genre:"Tamil Folk",    duration:267, favorite:true,  playCount:0, emoji:"🤝", audioSrc:null, srcType:"demo" },
  { id:20, title:"Arabic Kuthu",        artist:"Anirudh",           album:"Beast",              genre:"Tamil Hip-Hop", duration:193, favorite:false, playCount:0, emoji:"🌍", audioSrc:null, srcType:"demo" },
];

/** @type {Playlist} */
const mainPlaylist = {
  name: "TAMIL HITS",
  songs,
  createdDate: new Date().toISOString().split("T")[0],
  songCount: songs.length
};

// ── RECENTLY PLAYED TUPLE [5 fixed slots] ───────────────
// TS equivalent: [Song|null, Song|null, Song|null, Song|null, Song|null]
/** @type {[any,any,any,any,any]} */
let recentlyPlayed = [null, null, null, null, null];

function addToRecent(song) {
  const filtered = recentlyPlayed.filter(s => s && s.id !== song.id);
  recentlyPlayed = [song, filtered[0]||null, filtered[1]||null, filtered[2]||null, filtered[3]||null];
  renderRecent();
}

// ── FILTER FUNCTIONS ────────────────────────────────────
function filterByGenre(list, genre) {
  return genre ? list.filter(s => s.genre === genre) : list;
}

function filterByArtist(list, artist) {
  return artist ? list.filter(s => s.artist === artist) : list;
}

function filterBySearch(list, q) {
  if (!q) return list;
  const lq = q.toLowerCase();
  return list.filter(s =>
    s.title.toLowerCase().includes(lq) ||
    s.artist.toLowerCase().includes(lq) ||
    s.album.toLowerCase().includes(lq)
  );
}

// ── SORT FUNCTION (keyof Song pattern) ──────────────────
const SONG_KEYS = ['id','title','artist','album','genre','duration','favorite','playCount'];

function sortBy(list, key) {
  if (!SONG_KEYS.includes(key)) throw new Error('Invalid Song key: ' + key);
  return [...list].sort((a, b) =>
    typeof a[key] === 'string' ? a[key].localeCompare(b[key]) : b[key] - a[key]
  );
}

// ── STATE ────────────────────────────────────────────────
let currentSong   = null;
let isPlaying     = false;
let shuffleOn     = false;
let filteredSongs = [...songs];
const audio       = document.getElementById('audioPlayer');

// ── AUDIO EVENTS ────────────────────────────────────────
audio.addEventListener('timeupdate', () => {
  if (!currentSong || !audio.duration) return;
  const pct = (audio.currentTime / audio.duration) * 100;
  document.getElementById('progressFill').style.width = pct + '%';
  document.getElementById('timeElapsed').textContent  = fmtSec(audio.currentTime);
  document.getElementById('timeDuration').textContent = fmtSec(audio.duration);
});
audio.addEventListener('ended', playNext);
audio.addEventListener('error', () => {
  if (currentSong && currentSong.srcType !== 'demo')
    showToast('Could not load audio file', true);
});
audio.addEventListener('play',  () => setCoverSpin(true));
audio.addEventListener('pause', () => setCoverSpin(false));

document.getElementById('volumeSlider').addEventListener('input', e => {
  audio.volume = e.target.value / 100;
});

// ── HELPERS ──────────────────────────────────────────────
function fmtSec(s) {
  if (!s || isNaN(s)) return '0:00';
  return Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0');
}
function fmtDuration(sec) { return fmtSec(sec); }
function setCoverSpin(on) {
  document.getElementById('npCoverArt').className = 'np-cover-art' + (on ? ' spinning' : '');
}

// ── APPLY FILTERS ────────────────────────────────────────
function applyFilters() {
  const search  = document.getElementById('searchInput').value;
  const genre   = document.getElementById('genreFilter').value;
  const artist  = document.getElementById('artistFilter').value;
  const sortKey = document.getElementById('sortSelect').value;
  let result = filterBySearch(songs, search);
  result = filterByGenre(result, genre);
  result = filterByArtist(result, artist);
  result = sortBy(result, sortKey);
  filteredSongs = result;
  renderGrid();
}

// ── POPULATE DROPDOWNS ───────────────────────────────────
function populateDropdowns() {
  const genres  = [...new Set(songs.map(s => s.genre))].sort();
  const artists = [...new Set(songs.map(s => s.artist))].sort();
  const gSel = document.getElementById('genreFilter');
  const aSel = document.getElementById('artistFilter');
  gSel.innerHTML = '<option value="">All Genres</option>';
  aSel.innerHTML = '<option value="">All Artists</option>';
  genres.forEach(g  => { const o = document.createElement('option'); o.value = g; o.textContent = g; gSel.appendChild(o); });
  artists.forEach(a => { const o = document.createElement('option'); o.value = a; o.textContent = a; aSel.appendChild(o); });
  const dl = document.getElementById('artistSuggestions');
  dl.innerHTML = '';
  artists.forEach(a => { const o = document.createElement('option'); o.value = a; dl.appendChild(o); });
}

// ── RENDER GRID ──────────────────────────────────────────
function renderGrid() {
  const grid = document.getElementById('songGrid');
  document.getElementById('songCount').textContent = filteredSongs.length;
  grid.innerHTML = '';

  if (!filteredSongs.length) {
    const hasSearch = document.getElementById('searchInput').value ||
                      document.getElementById('genreFilter').value ||
                      document.getElementById('artistFilter').value;
    if (hasSearch) {
      grid.innerHTML = '<div class="empty-state"><div class="empty-icon">🔍</div>NO TRACKS MATCH YOUR SEARCH</div>';
    } else {
      grid.innerHTML = `<div class="empty-state upload-welcome">
        <div class="empty-icon">🎵</div>
        <div class="welcome-title">YOUR PLAYLIST IS EMPTY</div>
        <div class="welcome-sub">Upload your Tamil MP3 files to hear them</div>
        <div class="welcome-actions">
          <button class="welcome-upload-btn" onclick="document.getElementById('headerUploadBtn').click()">
            ▲ UPLOAD SONGS
          </button>
          <div class="welcome-hint">or drag &amp; drop MP3 files anywhere on this page</div>
        </div>
      </div>`;
    }
    return;
  }

  filteredSongs.forEach(song => {
    const isActive = currentSong && currentSong.id === song.id;
    const card = document.createElement('div');
    card.className = 'song-card' + (isActive ? ' active' : '') + (song.srcType !== 'demo' ? ' user-song' : '');
    card.dataset.id = song.id;
    card.innerHTML = `
      <div class="card-cover">
        <span style="position:relative;z-index:1">${song.emoji}</span>
        <div class="card-cover-overlay"></div>
        <div class="card-play-overlay">
          <div class="card-play-btn">${isActive && isPlaying ? '⏸' : '▶'}</div>
        </div>
      </div>
      <span class="card-fav ${song.favorite ? 'active' : ''}" data-fav="${song.id}">${song.favorite ? '❤️' : '🤍'}</span>
      <div class="card-body">
        <div class="card-title">${song.title}</div>
        <div class="card-artist">${song.artist}</div>
        <div class="card-album">${song.album}</div>
        <div class="card-footer">
          <span class="card-genre">${song.genre}</span>
          <span class="card-duration">${fmtDuration(song.duration)}</span>
        </div>
      </div>`;
    card.addEventListener('click', e => { if (e.target.closest('.card-fav')) return; playSong(song); });
    card.querySelector('.card-fav').addEventListener('click', e => { e.stopPropagation(); toggleFavorite(song.id); });
    grid.appendChild(card);
  });
}

// ── RENDER RECENT ─────────────────────────────────────────
function renderRecent() {
  const list = document.getElementById('recentList');
  list.innerHTML = '';
  recentlyPlayed.forEach((song, i) => {
    if (!song) return;
    const el = document.createElement('div');
    el.className = 'recent-item' + (currentSong && currentSong.id === song.id ? ' active' : '');
    el.innerHTML = `
      <div class="recent-emoji">${song.emoji}</div>
      <div class="recent-info">
        <div class="recent-title">${song.title}</div>
        <div class="recent-artist">${song.artist}</div>
      </div>
      <div class="recent-num">#${i + 1}</div>`;
    el.addEventListener('click', () => playSong(song));
    list.appendChild(el);
  });
}

// ── PLAY SONG ─────────────────────────────────────────────
function playSong(song) {
  currentSong = song;
  song.playCount++;
  addToRecent(song);

  if (song.audioSrc) {
    audio.src = song.audioSrc;
    audio.play().catch(() => showToast('Playback blocked by browser', true));
    isPlaying = true;
  } else {
    audio.src = '';
    isPlaying = true;
    setCoverSpin(true);
  }

  updateNowPlaying();
  renderGrid();
  renderRecent();
}

// ── UPDATE NOW PLAYING UI ─────────────────────────────────
function updateNowPlaying() {
  if (!currentSong) return;
  document.getElementById('npCoverArt').textContent   = currentSong.emoji;
  document.getElementById('npTitle').textContent      = currentSong.title;
  document.getElementById('npArtist').textContent     = currentSong.artist;
  document.getElementById('npAlbum').textContent      = currentSong.album;
  document.getElementById('timeDuration').textContent = fmtDuration(currentSong.duration);

  const playBtn = document.getElementById('btnPlay');
  playBtn.className   = 'ctrl-play' + (isPlaying ? ' playing' : '');
  playBtn.textContent = isPlaying ? '⏸' : '▶';
  document.getElementById('btnFav').textContent = currentSong.favorite ? '❤️' : '♡';

  const labels = { file: '🎵 LOCAL FILE', url: '🔗 ONLINE URL', demo: '◈ DEMO TRACK' };
  document.getElementById('npSourceBadge').innerHTML =
    `<span class="np-source-badge ${currentSong.srcType}">${labels[currentSong.srcType] || ''}</span>`;

  document.getElementById('npStats').innerHTML = `
    <span class="badge badge-genre">${currentSong.genre}</span>
    <span class="badge badge-plays">▶ ${currentSong.playCount} plays</span>
    ${currentSong.favorite ? '<span class="badge badge-fav">♥ FAVED</span>' : ''}`;
}

// ── NAV ───────────────────────────────────────────────────
function playNext() {
  if (!filteredSongs.length) return;
  if (shuffleOn) { playSong(filteredSongs[Math.floor(Math.random() * filteredSongs.length)]); return; }
  const idx = currentSong ? filteredSongs.findIndex(s => s.id === currentSong.id) : -1;
  playSong(filteredSongs[(idx + 1) % filteredSongs.length]);
}

function playPrev() {
  if (!filteredSongs.length) return;
  const idx = currentSong ? filteredSongs.findIndex(s => s.id === currentSong.id) : 0;
  playSong(filteredSongs[(idx - 1 + filteredSongs.length) % filteredSongs.length]);
}

// ── TOGGLE FAVORITE ───────────────────────────────────────
function toggleFavorite(id) {
  const song = songs.find(s => s.id === id);
  if (!song) return;
  song.favorite = !song.favorite;
  if (currentSong && currentSong.id === id) updateNowPlaying();
  renderGrid();
}

// ── TOAST ─────────────────────────────────────────────────
function showToast(msg, isError = false) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast show' + (isError ? ' error' : '');
  setTimeout(() => t.className = 'toast', 2800);
}

// ── CONTROLS ─────────────────────────────────────────────
document.getElementById('btnPlay').addEventListener('click', () => {
  if (!currentSong) { if (filteredSongs.length) playSong(filteredSongs[0]); return; }
  if (isPlaying) {
    isPlaying = false;
    if (audio.src) audio.pause();
    setCoverSpin(false);
  } else {
    isPlaying = true;
    if (audio.src) audio.play();
    else setCoverSpin(true);
  }
  const b = document.getElementById('btnPlay');
  b.className   = 'ctrl-play' + (isPlaying ? ' playing' : '');
  b.textContent = isPlaying ? '⏸' : '▶';
});
document.getElementById('btnNext').addEventListener('click', playNext);
document.getElementById('btnPrev').addEventListener('click', playPrev);
document.getElementById('btnFav').addEventListener('click', () => { if (currentSong) toggleFavorite(currentSong.id); });
document.getElementById('btnShuffle').addEventListener('click', () => {
  shuffleOn = !shuffleOn;
  document.getElementById('btnShuffle').classList.toggle('active', shuffleOn);
});
document.getElementById('progressTrack').addEventListener('click', e => {
  if (!currentSong) return;
  const pct = (e.clientX - e.currentTarget.getBoundingClientRect().left) / e.currentTarget.offsetWidth;
  if (audio.src && audio.duration) audio.currentTime = pct * audio.duration;
  document.getElementById('progressFill').style.width  = (pct * 100) + '%';
  document.getElementById('timeElapsed').textContent   = fmtSec(pct * (audio.duration || currentSong.duration));
});
['searchInput', 'genreFilter', 'artistFilter', 'sortSelect'].forEach(id => {
  document.getElementById(id).addEventListener('input', applyFilters);
  document.getElementById(id).addEventListener('change', applyFilters);
});

// ── MODAL LOGIC ───────────────────────────────────────────
const EMOJIS = ['🎵','🎶','🎸','🎹','🥁','🎷','🎺','🎻','🎤','🎧',
                '🌆','⚡','🌌','🤖','💜','🌠','📼','🛣️','🌅','✨',
                '🕳️','🌸','👻','☀️','🎛️','💿','🔥','🌙','💫','🎯'];
let selectedEmoji    = '🎵';
let activeTab        = 'file';
let pendingFile      = null;
let pendingObjectURL = null;

function initEmojiPicker() {
  const picker = document.getElementById('emojiPicker');
  picker.innerHTML = '';
  EMOJIS.forEach(e => {
    const btn = document.createElement('span');
    btn.className = 'emoji-opt' + (e === selectedEmoji ? ' selected' : '');
    btn.textContent = e;
    btn.addEventListener('click', () => {
      selectedEmoji = e;
      picker.querySelectorAll('.emoji-opt').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
    });
    picker.appendChild(btn);
  });
}

function openModal() {
  pendingFile = null; pendingObjectURL = null;
  document.getElementById('fTitle').value    = '';
  document.getElementById('fArtist').value   = '';
  document.getElementById('fAlbum').value    = '';
  document.getElementById('fDuration').value = '';
  document.getElementById('fUrl').value      = '';
  document.getElementById('selectedFileInfo').style.display = 'none';
  selectedEmoji = '🎵'; initEmojiPicker();
  switchTab('file');
  document.getElementById('modalOverlay').classList.add('open');
  setTimeout(() => document.getElementById('fTitle').focus(), 200);
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
}

function switchTab(tab) {
  activeTab = tab;
  document.querySelectorAll('.modal-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('active', p.id === 'tab-' + tab));
}
document.querySelectorAll('.modal-tab').forEach(t => t.addEventListener('click', () => switchTab(t.dataset.tab)));

// File drop area inside modal
const fileDrop = document.getElementById('fileDrop');
fileDrop.addEventListener('click', () => {
  const inp = document.getElementById('fileInput');
  inp.multiple = false;
  inp.onchange = e => { handleFiles(e.target.files); inp.value = ''; };
  inp.click();
});
fileDrop.addEventListener('dragover',  e => { e.preventDefault(); fileDrop.classList.add('dragging'); });
fileDrop.addEventListener('dragleave', ()  => fileDrop.classList.remove('dragging'));
fileDrop.addEventListener('drop', e => { e.preventDefault(); fileDrop.classList.remove('dragging'); handleFiles(e.dataTransfer.files); });

function handleFiles(files) {
  if (!files || !files[0]) return;
  const file = files[0];
  if (!file.type.startsWith('audio/')) { showToast('Please select an audio file', true); return; }
  pendingFile = file;
  if (pendingObjectURL) URL.revokeObjectURL(pendingObjectURL);
  pendingObjectURL = URL.createObjectURL(file);
  const nameNoExt = file.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ');
  if (!document.getElementById('fTitle').value)
    document.getElementById('fTitle').value = nameNoExt;
  const tmp = new Audio(pendingObjectURL);
  tmp.addEventListener('loadedmetadata', () => {
    document.getElementById('fDuration').value = fmtSec(tmp.duration);
    tmp.src = '';
  });
  const info = document.getElementById('selectedFileInfo');
  info.style.display = 'block';
  info.textContent = '✓ ' + file.name + '  (' + (file.size / 1024 / 1024).toFixed(2) + ' MB)';
  showToast('File loaded: ' + file.name);
}

// Header quick-upload
document.getElementById('headerUploadBtn').addEventListener('click', () => {
  const inp = document.getElementById('fileInput');
  inp.multiple = true;
  inp.onchange = e => { bulkAddFiles(e.target.files); inp.value = ''; };
  inp.click();
});

function bulkAddFiles(files) {
  if (!files || !files.length) return;
  const audioFiles = Array.from(files).filter(f =>
    f.type.startsWith('audio/') || f.name.match(/\.(mp3|wav|ogg|flac|aac|m4a)$/i)
  );
  if (!audioFiles.length) { showToast('No audio files found', true); return; }

  let completed = 0;
  const total = audioFiles.length;

  audioFiles.forEach(file => {
    const objURL    = URL.createObjectURL(file);
    const nameNoExt = file.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ').trim();
    let handled     = false;

    function addSong(duration) {
      if (handled) return;
      handled = true;
      const song = {
        id: Date.now() + Math.random(),
        title: nameNoExt, artist: 'Unknown Artist',
        album: 'My Uploads', genre: 'Other',
        duration: Math.floor(duration) || 0,
        favorite: false, playCount: 0,
        emoji: '🎵', audioSrc: objURL, srcType: 'file'
      };
      songs.push(song);
      mainPlaylist.songs.push(song);
      mainPlaylist.songCount = songs.length;
      completed++;
      populateDropdowns();
      applyFilters();
      if (completed === total) showToast(total + ' track(s) added! Click to play.');
    }

    const tmp = new Audio();
    tmp.addEventListener('loadedmetadata', () => { addSong(tmp.duration); tmp.src = ''; }, { once: true });
    tmp.addEventListener('error',          () => { addSong(0);            tmp.src = ''; }, { once: true });
    tmp.src = objURL;
  });
}

function addCustomSong() {
  const title  = document.getElementById('fTitle').value.trim();
  const artist = document.getElementById('fArtist').value.trim();
  const album  = document.getElementById('fAlbum').value.trim() || 'My Uploads';
  const genre  = document.getElementById('fGenre').value;
  const durStr = document.getElementById('fDuration').value.trim();

  if (!title)  { showToast('Please enter a song title', true); return; }
  if (!artist) { showToast('Please enter an artist name', true); return; }

  let audioSrc = null, srcType = 'demo';
  if (activeTab === 'file') {
    if (!pendingObjectURL) { showToast('Please select an audio file first', true); return; }
    audioSrc = pendingObjectURL; srcType = 'file'; pendingObjectURL = null;
  } else if (activeTab === 'url') {
    const url = document.getElementById('fUrl').value.trim();
    if (!url) { showToast('Please enter an audio URL', true); return; }
    audioSrc = url; srcType = 'url';
  }

  let dur = 0;
  if (durStr) {
    const parts = durStr.split(':');
    if (parts.length === 2) dur = parseInt(parts[0]) * 60 + parseInt(parts[1]);
  }

  const song = {
    id: Date.now(), title, artist, album, genre,
    duration: dur, favorite: false, playCount: 0,
    emoji: selectedEmoji, audioSrc, srcType
  };
  songs.push(song);
  mainPlaylist.songs.push(song);
  mainPlaylist.songCount = songs.length;
  populateDropdowns();
  applyFilters();
  closeModal();
  showToast('Added: ' + title);
}

document.getElementById('fabAdd').addEventListener('click', openModal);
document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('btnCancel').addEventListener('click', closeModal);
document.getElementById('btnAddSong').addEventListener('click', addCustomSong);
document.getElementById('modalOverlay').addEventListener('click', e => {
  if (e.target === document.getElementById('modalOverlay')) closeModal();
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// Page-wide drag & drop
document.addEventListener('dragover', e => e.preventDefault());
document.addEventListener('drop', e => {
  e.preventDefault();
  if (e.dataTransfer.files && e.dataTransfer.files.length) bulkAddFiles(e.dataTransfer.files);
});

// ── INIT ──────────────────────────────────────────────────
audio.volume = 0.75;
populateDropdowns();
filteredSongs = sortBy(songs, 'title');
renderGrid();
renderRecent();