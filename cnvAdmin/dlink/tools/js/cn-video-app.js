(function() {
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  if (isSafari) document.documentElement.classList.add('is-safari');
})();

function titleCase(str) {
  const lower = ['a','an','the','and','but','or','for','nor','on','at','to','by','in','of','up','as','is'];
  return str.toLowerCase().split(' ').map((word, i) =>
    (i === 0 || !lower.includes(word)) ? word.charAt(0).toUpperCase() + word.slice(1) : word
  ).join(' ');
}

function setButtonImage(btnId, normalSrc, hoverSrc) {
  const btn = document.getElementById(btnId);
  if (!btn) return;
  const imgN = btn.querySelector('.btn-img-normal');
  const imgH = btn.querySelector('.btn-img-hover');
  if (!normalSrc) {
    btn.classList.remove('has-image');
    imgN.style.display = imgH.style.display = 'none';
    return;
  }
  imgN.src = normalSrc; imgH.src = hoverSrc || normalSrc;
  imgN.style.display = imgH.style.display = 'block';
  btn.classList.add('has-image');
}

function setBanner(tabKey, imageSrc, fallbackText, bgColor) {
  const wrap = document.getElementById('banner-' + tabKey);
  const img  = document.getElementById('bannerImg-' + tabKey);
  const txt  = document.getElementById('bannerText-' + tabKey);
  if (!wrap) return;
  if (bgColor) wrap.style.background = bgColor;
  if (imageSrc) {
    img.src = imageSrc;
    img.classList.add('visible');
    if (txt) txt.style.display = 'none';
  } else {
    img.classList.remove('visible');
    if (txt) txt.style.display = '';
  }
  if (fallbackText !== undefined) txt.textContent = fallbackText;
}

function _decodeXmlEntities(str) {
  if (!str) return '';
  return str
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g,  '&')
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g,   '<')
    .replace(/&gt;/g,   '>');
}

function _normalizeShowName(name) {
  return _decodeXmlEntities(name)
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '');
}

function _parseEpisodeNode(epEl) {
  const attr  = n => epEl.getAttribute(n) || '';
  const rawExp = attr('expirationDate');
  const avail  = rawExp
    ? 'Available Until ' + rawExp
    : 'Available Until 12.31.2099';

  const descEl = epEl.querySelector('description');
  const desc   = descEl
    ? _decodeXmlEntities(descEl.textContent.trim())
    : '';

  const segments = Array.from(epEl.querySelectorAll('segment')).map(s => ({
    id: s.getAttribute('id') || '',
  }));

  return {
    id:          attr('id'),
    ep:          _decodeXmlEntities(attr('title')).toUpperCase(),
    desc,
    avail,
    rating:      attr('rating'),
    episodeType: attr('episodeType'),
    segments,
  };
}

const _collectionFolders = {
  '8a25c3921295356001129678023b0b48': 'tools/collections/023b0/img/headerTs.png',
  '8a25c3920d1231fe010d126d05bc0098': 'tools/collections/05bc0/header.png',
  '8a25c3920d1231fe010d126608c4008f': 'tools/collections/08c40/img/header.jpg',
  '8a25c3920d1231fe010d126811d20094': 'tools/collections/11d20/img/header.png',
  '8a25c3920d1231fe010d12671b6f0091': 'tools/collections/1b6f0/img/header.jpg',
  '8a25c392122e52f901122fa52a011682': 'tools/collections/2a011/img/header.png',
  '8a25c3920d1231fe010d12652d03008d': 'tools/collections/2d030/img/header.jpg',
  '8a25c3920d9d36d1010d9ec2313d0012': 'tools/collections/313d0/header.jpg',
  '8a25c3921a71b5a0011a72ef40c1009b': 'tools/collections/40c10/img/header.jpg',
  '8a25c3920d1231fe010d1266637f0090': 'tools/collections/637f0/img/header.png',
  '8a25c3920d9d36d1010d9ec1695b000b': 'tools/collections/695b0/header.jpg',
  '8a25c3920d311098010d31466c290001': 'tools/collections/6c290/header.png',
  '8a25c3920d1231fe010d126776100092': 'tools/collections/76100/img/header_76100.jpg',
  '8a25c3920d311098010d314695990002': 'tools/collections/95990/img/header.jpg',
  '8a25c3920d1231fe010d1265b77a008e': 'tools/collections/b77a0/img/header.jpg',
  '8a25c3920d1231fe010d1267d9af0093': 'tools/collections/d9af0/img/header.png',
  '8a25c3920d9d36d1010d9ec1fb130010': 'tools/collections/fb130/img/header.jpg',
};
const _bannerForId = id => _collectionFolders[id] || '';

async function _fetchXML(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error('Failed to load ' + path + ' (' + res.status + ')');
  const text   = await res.text();
  const parser = new DOMParser();
  const doc    = parser.parseFromString(text, 'application/xml');

const _collectionFolders = {
  '8a25c3921295356001129678023b0b48': 'tools/collections/023b0/img/headerTs.png',
  '8a25c3920d1231fe010d126d05bc0098': 'tools/collections/05bc0/header.png',
  '8a25c3920d1231fe010d126608c4008f': 'tools/collections/08c40/img/header.jpg',
  '8a25c3920d1231fe010d126811d20094': 'tools/collections/11d20/img/header.png',
  '8a25c3920d1231fe010d12671b6f0091': 'tools/collections/1b6f0/img/header.jpg',
  '8a25c392122e52f901122fa52a011682': 'tools/collections/2a011/img/header.png',
  '8a25c3920d1231fe010d12652d03008d': 'tools/collections/2d030/img/header.jpg',
  '8a25c3920d9d36d1010d9ec2313d0012': 'tools/collections/313d0/header.jpg',
  '8a25c3921a71b5a0011a72ef40c1009b': 'tools/collections/40c10/img/header.jpg',
  '8a25c3920d1231fe010d1266637f0090': 'tools/collections/637f0/img/header.png',
  '8a25c3920d9d36d1010d9ec1695b000b': 'tools/collections/695b0/header.jpg',
  '8a25c3920d311098010d31466c290001': 'tools/collections/6c290/header.png',
  '8a25c3920d1231fe010d126776100092': 'tools/collections/76100/img/header_76100.jpg',
  '8a25c3920d311098010d314695990002': 'tools/collections/95990/img/header.jpg',
  '8a25c3920d1231fe010d1265b77a008e': 'tools/collections/b77a0/img/header.jpg',
  '8a25c3920d1231fe010d1267d9af0093': 'tools/collections/d9af0/img/header.png',
  '8a25c3920d9d36d1010d9ec1fb130010': 'tools/collections/fb130/img/header.jpg',
};
const _bannerForId = id => _collectionFolders[id] || '';

  const results = [];

  const collections = Array.from(doc.querySelectorAll('episodes > collection'));
  for (const col of collections) {
    const colId      = col.getAttribute('id')           || '';
    const colTitle   = _decodeXmlEntities(col.getAttribute('title') || '');
    const colColor   = col.getAttribute('color')        || '';
    const colBanner  = _bannerForId(colId) || col.getAttribute('bannerSrc') || '';
    const colCatType = col.getAttribute('categoryType') || 'Shows';

    Array.from(col.querySelectorAll('episode')).forEach(el => {
      const ep = _parseEpisodeNode(el);
      ep.src                    = el.getAttribute('src')      || '';
      ep.collectionTitle        = colTitle;
      ep.collectionCategoryType = colCatType;
      ep.showId                 = colId;
      ep._collectionId          = colId;
      ep._collectionColor       = colColor;
      ep._collectionBannerSrc   = colBanner;
      results.push(ep);
    });
  }

  const whatsNewWrappers = Array.from(doc.querySelectorAll('episodes > whatsNew'));
  for (const wn of whatsNewWrappers) {
    Array.from(wn.querySelectorAll('episode')).forEach(el => {
      const ep = _parseEpisodeNode(el);
      ep.src      = el.getAttribute('src')      || '';
      ep.show     = _decodeXmlEntities(el.getAttribute('show') || '');
      ep.color    = el.getAttribute('color')    || '#336699';
      ep._isWhatsNew = true;
      results.push(ep);
    });
  }

  const flatNodes = Array.from(doc.querySelectorAll('episodes > episode'));
  flatNodes.forEach(el => {
    const ep = _parseEpisodeNode(el);
    ep.src                    = el.getAttribute('src')                    || '';
    ep.collectionTitle        = el.getAttribute('collectionTitle')        || '';
    ep.collectionCategoryType = el.getAttribute('collectionCategoryType') || 'Shows';
    ep.showId                 = el.getAttribute('showId')                 || '';
    ep._collectionId          = '';
    ep._collectionColor       = '';
    ep._collectionBannerSrc   = '';
    results.push(ep);
  });

  return results;
}

async function loadEpisodesFromXML(paths) {
  let allEpisodes = [];
  try {
    const results = await Promise.all(paths.map(_fetchXML));
    results.forEach(arr => allEpisodes = allEpisodes.concat(arr));
  } catch (err) {
    console.warn('[XML Loader] Could not load one or more XML files:', err);

    refreshTab('whats-new');
    refreshTab('shows');
    refreshTab('extras');
    return;
  }

  const seen    = new Set();
  const unique  = [];
  for (const ep of allEpisodes) {
    if (ep.id && !seen.has(ep.id)) { seen.add(ep.id); unique.push(ep); }
  }

  for (const ep of unique) {

    if (ep._isWhatsNew) {
      const alreadyWN = whatsNewEps.some(e => e.id === ep.id);
      if (!alreadyWN) whatsNewEps.push(ep);
      continue;
    }

    const isShows   = ep.collectionCategoryType === 'Shows';
    const target    = isShows ? showsData : extrasData;
    const normTitle = _normalizeShowName(ep.collectionTitle);

    let show = target.find(s => _normalizeShowName(s.name) === normTitle);

    if (!show) {
      const decodedTitle = _decodeXmlEntities(ep.collectionTitle);
      show = {
        id:        ep._collectionId || decodedTitle.toLowerCase().replace(/[^a-z0-9]/g, ''),
        name:      decodedTitle.toUpperCase(),
        color:     ep._collectionColor  || '#336699',
        bannerSrc: ep._collectionBannerSrc || '',
        episodes:  [],
      };
      target.push(show);
    } else {

      if (ep._collectionColor    && !show.color)     show.color     = ep._collectionColor;
      if (ep._collectionBannerSrc && !show.bannerSrc) show.bannerSrc = ep._collectionBannerSrc;
      if (ep._collectionId       && show.id !== ep._collectionId) show.id = ep._collectionId;
    }

    const existingIdx = show.episodes.findIndex(e => e.id === ep.id || e.ep === ep.ep);
    const existingEp  = existingIdx !== -1 ? show.episodes.splice(existingIdx, 1)[0] : null;
    show.episodes.push({
      id:       ep.id,
      ep:       ep.ep,
      desc:     ep.desc,
      avail:    ep.avail,
      src:      ep.src      || (existingEp && existingEp.src) || '',
      segments: ep.segments || (existingEp && existingEp.segments) || [],
      color:    show.color,
    });
  }

  console.log('[XML Loader] Merged', unique.length, 'XML episodes into showsData/extrasData.');

  function _availToDate(avail) {
    const m = (avail || '').match(/(\d{2})\.(\d{2})\.(\d{2,4})$/);
    if (!m) return 0;
    const year = m[3].length === 2 ? 2000 + parseInt(m[3]) : parseInt(m[3]);
    return new Date(year, parseInt(m[1]) - 1, parseInt(m[2])).getTime();
  }
  [...showsData, ...extrasData].forEach(show => {
    show.episodes.sort((a, b) => _availToDate(b.avail) - _availToDate(a.avail));
  });
}

let favorites = (function() {
  try {
    const ids = JSON.parse(localStorage.getItem('VideoBrowser.favorites') || '[]');

    return ids;
  } catch(e) { return []; }
})();
let searchResults = [];
let activeId     = null;
let activePage   = 'whats-new';
let isPlaying    = false;
const videoEl    = document.getElementById('videoEl');

const DEFAULT_THEME_SHOWS = new Set([
  'BEN 10',
  'CAMP LAZLO',
  'COURAGE THE COWARDLY DOG',
  "ED, EDD N' EDDY",
  "FOSTER'S HOME FOR IMAGINARY FRIENDS",
  'THE GRIM ADVENTURES OF BILLY & MANDY',
  "MY GYM PARTNER'S A MONKEY",
  'SQUIRREL BOY',
  'THE POWERPUFF GIRLS',
  'COW & CHICKEN',
  "DEXTER'S LABORATORY",
  'EVIL CON CARNE',
  'CLASS OF 3000',
  'JOHNNY BRAVO',
  'CODENAME: KIDS NEXT DOOR',
  'CODE LYOKO',
  'TOTALLY SPIES',
  'TIME SQUAD',
  'WHATEVER HAPPENED TO ROBOT JONES?',
  'MIKE, LU & OG',
  'TEAM GALAXY',
]);

const EXTRAS_IN_SHOWS = new Set([
  'FRIDAYS MUSIC', 'MUSIC', 'CARTOON NETWORK SPOTLIGHT',
  'FALL SONG', 'FRIED DYNAMITE', 'SHORTIES',
  'PREMIERES', 'WEDGIES',
]);

function getVisibleShows() {
  return showsData.filter(s => !EXTRAS_IN_SHOWS.has(s.name.toUpperCase()));
}
const PER_PAGE   = 6;

const drillState = { shows: null, extras: null };

const pageState = {
  'whats-new': { current: 1 },
  'shows':     { current: 1 },
  'extras':    { current: 1 },
};

function renderEpisodeTiles(listId, items, parentName) {
  const list = document.getElementById(listId);
  if (!list) return;
  if (!items || items.length === 0) {
    list.innerHTML = '<div class="empty-state"><div class="empty-state-icon"></div><div class="empty-state-text"></div></div>';
    return;
  }
  list.innerHTML = items.map(ep => {
    const showLabel = ep.show || parentName || '';
    const isFav = favorites.some(f => f.id === ep.id);
    const favChar = isFav ? '<span style="position:relative;top:-2px;">−</span>' : '+';
    const favTitle = isFav ? 'Remove from Favorites' : 'Add to Favorites';
    const deleteBtn = window.adminMode ? `<div class="pill-divider"></div>
            <button class="img-btn delete-ep-btn" onclick="admDeleteEpFromList('${ep.id}')" title="Delete Episode">
              <img class="btn-img btn-img-normal" src="" alt="" style="display:none">
              <img class="btn-img btn-img-hover"  src="" alt="" style="display:none">
              <span class="btn-svg-fallback" style="background:linear-gradient(180deg,#cc2200,#880000)!important;"><svg viewBox="0 0 24 24" fill="#fff"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg></span>
            </button>` : '';
    return `
    <div class="video-item-wrap">
      <div class="video-item ${ep.id === activeId ? 'active' : ''}" id="item-${ep.id}" onclick="selectEpById('${ep.id}')">
        <div class="thumb-wrap">
          ${ep.thumbSrc ? `<img src="${ep.thumbSrc}" alt="">` : `<div class="thumb-placeholder" style="background:${ep.color||'#336699'}33;"></div>`}
          <div class="play-overlay"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></div>
        </div>
        <div class="item-info">
          <div class="item-show">${showLabel}</div>
          <div class="item-ep">${titleCase(ep.ep)}</div>
          <div class="item-avail">${ep.avail}</div>
        </div>
        <div class="item-actions" onclick="event.stopPropagation()">
          <div class="item-action-pill">
            <button class="img-btn ${isFav ? 'is-fav' : ''}" id="favBtn-${ep.id}" onclick="toggleFavorite('${ep.id}')" title="${favTitle}">
              <img class="btn-img btn-img-normal" src="" alt="" style="display:none">
              <img class="btn-img btn-img-hover"  src="" alt="" style="display:none">
              <span class="btn-svg-fallback fav-char">${favChar}</span>
            </button>
            <div class="pill-divider"></div>
            <button class="img-btn expand-btn" id="expandBtn-${ep.id}" onclick="toggleExpand('${ep.id}')" title="Show Description">
              <img class="btn-img btn-img-normal" src="" alt="" style="display:none">
              <img class="btn-img btn-img-hover"  src="" alt="" style="display:none">
              <span class="btn-svg-fallback"><svg viewBox="0 0 24 24" class="expand-icon"><path d="M12 16 L4 8 H20 Z"/></svg></span>
            </button>
            ${deleteBtn}
          </div>
        </div>
      </div>
      <div class="item-expanded" id="expanded-${ep.id}">
        <div>${ep.desc}</div>
      </div>
      <div class="item-scene-row" id="scene-row-${ep.id}" style="display:none;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:3px;">
          <div class="item-scene-label" style="display:block;color:#000;font-family:Arial,sans-serif;font-size:8px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">Scene Selection</div>
          <div class="item-scene-label" id="scene-counter-${ep.id}" style="display:block;color:#000;font-family:Arial,sans-serif;font-size:8px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">${ep.segments && ep.segments.length > 0 ? `1-${ep.segments.length} of ${ep.segments.length}` : ''}</div>
        </div>
        <div class="scene-boxes" style="justify-content:flex-start; padding-right: 68px;">
          ${(() => {
            const segs = ep.segments || [];
            return segs.map((seg, i) => {
              const seekSec = i * 362;
              const thumbSec = 77 + (i * 320);
              const m = Math.floor(seekSec / 60);
              const s = seekSec % 60;
              const label = `${m}:${String(s).padStart(2,'0')}`;
              return `<div class="scene-box" data-sec="${seekSec}" data-thumb-sec="${thumbSec}" onclick="event.stopPropagation(); seekScene('${ep.id}', ${seekSec})" title="Scene ${i+1} — ${label}">
                <div class="scene-box-badge"></div>
                <div class="scene-box-num">${i+1}</div>
              </div>`;
            }).join('');
          })()}
        </div>
      </div>
    </div>`;
  }).join('');
}

function renderBannerTiles(listId, items, tabKey) {
  const list = document.getElementById(listId);
  if (!list) return;
  list.innerHTML = items.map(s => `
    <div class="show-tile ${s.id === drillState[tabKey] ? 'active' : ''}"
         style="background: linear-gradient(135deg, ${s.color}cc, ${s.color}66);"
         onclick="drillInto('${tabKey}','${s.id}')">
      ${s.bannerSrc ? `<img src="${s.bannerSrc}" alt="${s.name}">` : `<div class="show-tile-label">${s.name}</div>`}
    </div>
  `).join('');
}

function drillInto(tabKey, itemId) {
  const source = tabKey === 'shows' ? getVisibleShows() : extrasData;
  const item = source.find(s => s.id === itemId);
  if (!item) return;
  drillState[tabKey] = item.id;
  _updateURL();

  const bc = document.getElementById('bc-' + tabKey);
  bc.innerHTML = `
    <span class="back-link" onclick="drillBack('${tabKey}')">${tabKey === 'shows' ? 'ALL SHOWS' : 'ALL EXTRAS'}</span>
    <span class="sep">›</span>
    <span class="current">${item.name}</span>`;

  const bannerWrap = document.getElementById('banner-' + tabKey);
  const bannerImg  = document.getElementById('bannerImg-' + tabKey);
  const bannerTxt  = document.getElementById('bannerText-' + tabKey);
  if (item.bannerSrc) {
    bannerImg.src = item.bannerSrc;
    bannerImg.classList.add('visible');
    bannerTxt.style.display = 'none';
  } else {
    bannerImg.classList.remove('visible');
    bannerTxt.style.display = '';
    bannerWrap.style.background = `linear-gradient(135deg, ${item.color}dd, ${item.color}88)`;
  }
  bannerTxt.textContent = item.name.split(' ').slice(0,1).join('');

  document.getElementById('banner-' + tabKey).style.display = 'flex';
  document.getElementById('page-' + tabKey).classList.remove('banner-page');
  const laIn = document.querySelector('#page-' + tabKey + ' .list-area');
  if (laIn) { laIn.classList.add('has-banner'); laIn.classList.remove('banner-area'); }
  const listEl = document.getElementById('list-' + tabKey);
  if (listEl) { listEl.classList.remove('banner-list'); listEl.classList.add('video-list'); }
  pageState[tabKey].current = 1;
  refreshDrill(tabKey);

  item.episodes.forEach(ep => {
    if (ep.src && !ep.thumbSrc) {
      generateThumb(ep.src, null, dataUrl => {
        ep.thumbSrc = dataUrl;
        const thumb = document.querySelector(`#item-${ep.id} .thumb-placeholder`);
        if (thumb) {
          const img = document.createElement('img');
          img.src = dataUrl;
          img.style.cssText = 'width:100%;height:100%;object-fit:cover;';
          thumb.parentNode.replaceChild(img, thumb);
        }
      });
    }
  });

  document.getElementById('count-' + tabKey).style.display = '';
  const pagRowDrill = document.getElementById('pag-' + tabKey);
  pagRowDrill.style.display = 'flex';
  pagRowDrill.classList.remove('no-controls');
}

function drillBack(tabKey) {
  drillState[tabKey] = null;
  _updateURL();
  pageState[tabKey].current = 1;
  const la = document.querySelector('#page-' + tabKey + ' .list-area');
  if (la) { la.classList.add('banner-area'); la.classList.remove('has-banner'); }
  const listElBack = document.getElementById('list-' + tabKey);
  if (listElBack) { listElBack.classList.remove('video-list'); listElBack.classList.add('banner-list'); }

  const bc = document.getElementById('bc-' + tabKey);
  bc.innerHTML = `<span class="current">${tabKey === 'shows' ? 'ALL SHOWS' : 'ALL EXTRAS'}</span>`;

  const bannerWrap = document.getElementById('banner-' + tabKey);
  const bannerImg  = document.getElementById('bannerImg-' + tabKey);
  const bannerTxt  = document.getElementById('bannerText-' + tabKey);
  bannerImg.classList.remove('visible');
  bannerWrap.style.background = '';
  bannerTxt.textContent = tabKey === 'shows' ? 'SHOWS' : 'EXTRAS';

  document.getElementById('banner-' + tabKey).style.display = 'none';
  const pagRow = document.getElementById('pag-' + tabKey);
  pagRow.style.display = 'flex';
  pagRow.classList.add('no-controls');
  document.getElementById('page-' + tabKey).classList.add('banner-page');
  const laBack = document.querySelector('#page-' + tabKey + ' .list-area');
  if (laBack) laBack.classList.remove('has-banner');
  document.getElementById('count-' + tabKey).style.display = 'none';
  const source = tabKey === 'shows' ? getVisibleShows() : extrasData;
  renderBannerTiles('list-' + tabKey, source, tabKey);
  updateCount(tabKey, source.length, source.length);
}

function refreshDrill(tabKey) {
  const source = tabKey === 'shows' ? getVisibleShows() : extrasData;
  const item = source.find(s => s.id === drillState[tabKey]);
  if (!item) return;
  const all   = item.episodes.map(ep => ({ ...ep, show: item.name, color: item.color }));
  const s     = pageState[tabKey];
  const start = (s.current - 1) * PER_PAGE;
  const end   = Math.min(start + PER_PAGE, all.length);
  const maxPage = Math.max(1, Math.ceil(all.length / PER_PAGE));
  renderEpisodeTiles('list-' + tabKey, all.slice(start, end), item.name);
  all.slice(start, end).forEach(ep => {
    if (ep.thumbSrc) {
      const thumb = document.querySelector(`#item-${ep.id} .thumb-placeholder`);
      if (thumb) {
        const img = document.createElement('img');
        img.src = ep.thumbSrc;
        img.style.cssText = 'width:100%;height:100%;object-fit:cover;';
        thumb.parentNode.replaceChild(img, thumb);
      }
    }
  });
  updateCount(tabKey, start + 1, end, all.length);
  const numEl = document.getElementById('page-' + tabKey + '-num');
  if (numEl) numEl.value = s.current;
  const ofEl = document.getElementById('page-' + tabKey + '-of');
  if (ofEl) ofEl.textContent = 'of ' + maxPage;
  setTimeout(() => updateScrollThumb(tabKey), 50);
}

function refreshTab(tabKey) {
  if (tabKey === 'help') { return; }
  if (tabKey === 'comments') { renderCNComments(); return; }
  if (tabKey === 'admin') { return; }
  if (tabKey === 'search') {
    renderEpisodeTiles('list-search', searchResults);
    updateCount('search', searchResults.length, searchResults.length);
    setTimeout(() => updateScrollThumb('search'), 50);
    return;
  }
  if (tabKey === 'favorites') {
    renderFavorites(); return;
  }
  if (tabKey === 'whats-new') {
    document.getElementById('banner-whats-new').style.display = 'none';
    const all   = whatsNewEps;
    const s     = pageState['whats-new'];
    const start = (s.current - 1) * PER_PAGE;
    const end   = Math.min(start + PER_PAGE, all.length);
    const maxPage = Math.max(1, Math.ceil(all.length / PER_PAGE));
    renderEpisodeTiles('list-whats-new', all.slice(start, end));
    all.slice(start, end).forEach(ep => {
      if (ep.src && !ep.thumbSrc) {
        generateThumb(ep.src, null, dataUrl => {
          ep.thumbSrc = dataUrl;
          const thumb = document.querySelector(`#item-${ep.id} .thumb-placeholder`);
          if (thumb) {
            const img = document.createElement('img');
            img.src = dataUrl;
            img.style.cssText = 'width:100%;height:100%;object-fit:cover;';
            thumb.parentNode.replaceChild(img, thumb);
          }
        });
      } else if (ep.thumbSrc) {
        const thumb = document.querySelector(`#item-${ep.id} .thumb-placeholder`);
        if (thumb) {
          const img = document.createElement('img');
          img.src = ep.thumbSrc;
          img.style.cssText = 'width:100%;height:100%;object-fit:cover;';
          thumb.parentNode.replaceChild(img, thumb);
        }
      }
    });
    updateCount('whats-new', start + 1, end, all.length);
    setTimeout(() => updateScrollThumb('whats-new'), 50);
    const numEl = document.getElementById('page-whats-new-num');
    if (numEl) numEl.value = s.current;
    const ofEl = document.getElementById('page-whats-new-of');
    if (ofEl) ofEl.textContent = 'of ' + maxPage;
    return;
  }
  if (drillState[tabKey]) {
    document.getElementById('banner-' + tabKey).style.display = '';
    document.getElementById('page-' + tabKey).classList.remove('banner-page');
    document.getElementById('count-' + tabKey).style.display = '';
    refreshDrill(tabKey);
  } else {
    const source = tabKey === 'shows' ? getVisibleShows() : extrasData;
    document.getElementById('banner-' + tabKey).style.display = 'none';
    document.getElementById('page-' + tabKey).classList.add('banner-page');
    document.getElementById('count-' + tabKey).style.display = 'none';
    renderBannerTiles('list-' + tabKey, source, tabKey);
    const pagRow = document.getElementById('pag-' + tabKey);
    pagRow.style.display = 'flex';
    pagRow.classList.add('no-controls');
    updateCount(tabKey, source.length, source.length);
    setTimeout(() => updateScrollThumb(tabKey), 50);
  }
}

function renderFavorites() {
  const list = document.getElementById('list-favorites');
  const deleteBtn = document.getElementById('deleteAllBtn');
  if (favorites.length === 0) {
    list.innerHTML = `
      <div class="fav-empty-state">
        <div class="fav-empty-title">HERE'S HOW THE MY FAVORITES LIST WORKS:</div>
        <ul class="fav-empty-list">
          <li>Click the <span class="fav-plus-icon">+</span> icon to add the video to your My Favorites list.</li>
          <li>Click on the first video in your My Favorites list, and the whole list will play automatically.</li>
          <li>Click the <span class="fav-minus-icon">−</span> icon to remove the video from your My Favorites list.</li>
          <li>To clear the entire list of My Favorites, click the <strong>REMOVE ALL</strong> button.</li>
        </ul>
      </div>`;
    if (deleteBtn) deleteBtn.disabled = true;
  } else {
    renderEpisodeTiles('list-favorites', favorites);
    if (deleteBtn) deleteBtn.disabled = false;
  }
  updateCount('favorites', favorites.length, favorites.length);
  setTimeout(() => updateScrollThumb('favorites'), 50);
}

function clearFavorites() {
  favorites = [];
  try { localStorage.setItem('VideoBrowser.favorites', '[]'); } catch(e) {}
  renderFavorites();
  refreshTab(activePage);
}

function resolveFavorites() {
  const savedIds = favorites.filter(f => typeof f === 'string' || typeof f === 'number');
  if (savedIds.length === 0) return;
  const allEps = [
    ...whatsNewEps,
    ...showsData.flatMap(s => s.episodes.map(ep => ({ ...ep, show: s.name, color: s.color }))),
    ...extrasData.flatMap(s => s.episodes.map(ep => ({ ...ep, show: s.name, color: s.color }))),
  ];
  favorites = savedIds.map(id => allEps.find(ep => ep.id === id)).filter(Boolean);
  renderFavorites();
}

function updateCount(tabKey, from, to, total) {
  const el = document.getElementById('count-' + tabKey);
  if (!el) return;
  if (total === undefined) {
    el.textContent = to > 0 ? to + ' RESULT' + (to !== 1 ? 'S' : '') : '';
  } else if (total === 0) {
    el.textContent = '';
  } else if (from === to) {
    el.textContent = to + ' TOTAL';
  } else {
    el.textContent = from + '-' + to + ' OF ' + total;
  }
}

const thumbCache = {};

function _thumbCacheKey(src, time) { return src + '@' + time; }

function generateThumb(src, time, callback) {

  const isMid = time === null;
  const cacheKey = _thumbCacheKey(src, isMid ? 'mid' : time);
  if (thumbCache[cacheKey]) { callback(thumbCache[cacheKey]); return; }
  const video = document.createElement('video');
  video.src = src;
  video.muted = true;
  video.playsInline = true;
  video.preload = 'metadata';
  video.addEventListener('loadedmetadata', () => {
    video.currentTime = isMid ? (77 + video.duration) / 2 - 7 : time;
  }, { once: true });
  video.addEventListener('seeked', () => {
    const canvas = document.createElement('canvas');
    canvas.width  = 120;
    canvas.height = 90;
    try {
      canvas.getContext('2d').drawImage(video, 0, 0, 120, 90);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
      thumbCache[cacheKey] = dataUrl;
      callback(dataUrl);
    } catch(e) {
      console.warn('Thumbnail generation failed:', e);
    }
    video.src = '';
  }, { once: true });
}

function preloadThumbs() {
  const allEps = [
    ...whatsNewEps,
    ...showsData.flatMap(s => s.episodes),
    ...extrasData.flatMap(s => s.episodes),
  ];
  allEps.forEach(ep => {
    if (ep.src) generateThumb(ep.src, null, dataUrl => {
      ep.thumbSrc = dataUrl;
      const thumb = document.querySelector(`#item-${ep.id} .thumb-placeholder`);
      if (thumb) {
        const img = document.createElement('img');
        img.src = dataUrl;
        img.style.cssText = 'width:100%;height:100%;object-fit:cover;';
        thumb.parentNode.replaceChild(img, thumb);
      }
    });
  });
}

function addFlashListeners() {
  const sel = '.nav-tab:not(.active), .player-action-btn, .more-btn, .footer-btn, .admin-plus-btn:not(.active)';
  document.querySelectorAll(sel).forEach(btn => {
    let hovered = false;
    btn.addEventListener('mouseenter', function() {
      hovered = true;
      this.style.transition = 'none';
      this.style.background = '#fff';
      this.style.color = '#000';
      const svg = this.querySelector('svg');
      if (svg) svg.style.fill = '#000';
      const el = this;
      setTimeout(() => {
        if (!hovered) return;
        el.style.transition = 'background 0.15s ease-out, color 0.15s ease-out';
        el.style.background = 'linear-gradient(180deg, #ff4422, #cc0000)';
        el.style.color = '#fff';
        if (svg) svg.style.fill = '#fff';
      }, 60);
    });
    btn.addEventListener('mouseleave', function() {
      hovered = false;
      this.style.transition = 'none';
      this.style.background = '';
      this.style.color = '';
      const svg = this.querySelector('svg');
      if (svg) svg.style.fill = '';
    });
  });

  document.querySelectorAll('.play-img-btn:not(:disabled):not(.active), .mute-img-btn:not(:disabled)').forEach(btn => {
    let hovered = false;
    btn.addEventListener('mouseenter', function() {
      hovered = true;
      const fb = this.querySelector('.btn-svg-fallback');
      if (!fb) return;
      const isMutedBtn = this.id === 'muteBtn';
      if (isMutedBtn && videoEl.muted) return;
      fb.style.transition = 'none';
      fb.style.background = '#fff';
      const svg = fb.querySelector('svg');
      if (svg) svg.style.fill = '#000';
      const el = this;
      setTimeout(() => {
        if (!hovered) return;
        fb.style.transition = 'background 0.15s ease-out';
        fb.style.background = 'linear-gradient(180deg, #ff4422, #cc0000)';
        if (svg) { svg.style.transition = 'fill 0.15s'; svg.style.fill = '#fff'; }
      }, 60);
    });
    btn.addEventListener('mouseleave', function() {
      hovered = false;
      const fb = this.querySelector('.btn-svg-fallback');
      if (!fb) return;
      const isMutedBtn = this.id === 'muteBtn';
      if (isMutedBtn && videoEl.muted) return;
      fb.style.transition = 'none';
      fb.style.background = '';
      const svg = fb.querySelector('svg');
      if (svg) { svg.style.transition = ''; svg.style.fill = ''; }
    });
  });

  document.querySelectorAll('.pill-container:not(.disabled) .img-btn').forEach(btn => {
    let hovered = false;
    btn.addEventListener('mouseenter', function() {
      hovered = true;
      const fb = this.querySelector('.btn-svg-fallback');
      if (!fb) return;
      fb.style.transition = 'none';
      fb.style.background = '#fff';
      const svg = fb.querySelector('svg');
      if (svg) svg.style.fill = '#000';
      const el = this;
      setTimeout(() => {
        if (!hovered) return;
        fb.style.transition = 'background 0.15s ease-out';
        fb.style.background = 'linear-gradient(180deg, #ff4422, #cc0000)';
        if (svg) { svg.style.transition = 'fill 0.15s'; svg.style.fill = '#fff'; }
      }, 60);
    });
    btn.addEventListener('mouseleave', function() {
      hovered = false;
      const fb = this.querySelector('.btn-svg-fallback');
      if (!fb) return;
      fb.style.transition = 'none';
      fb.style.background = '';
      const svg = fb.querySelector('svg');
      if (svg) { svg.style.transition = ''; svg.style.fill = ''; }
    });
  });

  document.querySelectorAll('.size-btn:not(.active)').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      this.style.transition = 'none';
      this.style.background = '#fff';
      this.style.color = '#000';
      setTimeout(() => {
        this.style.transition = 'background 0.15s ease-out, color 0.15s';
        this.style.background = 'linear-gradient(180deg, #ff4422, #cc0000)';
        this.style.color = '#fff';
      }, 60);
    });
    btn.addEventListener('mouseleave', function() {
      this.style.transition = 'none';
      this.style.background = '';
      this.style.color = '';
    });
  });
}
addFlashListeners();

setTimeout(() => {
  ['whats-new','shows','extras','search','favorites'].forEach(k => initScrollThumb(k));
}, 200);

const _origSwitchTab = switchTab;
switchTab = function(el, tabKey) {
  _origSwitchTab(el, tabKey);
  addFlashListeners();
};
function _updateURL() {
  const params = new URLSearchParams();

  if (activePage === 'shows') params.set('section', 'shows');
  else if (activePage === 'extras') params.set('section', 'categories');
  else if (activePage === 'favorites') params.set('section', 'favorites');
  else if (activePage === 'search') params.set('section', 'search');
  else if (activePage === 'whats-new') params.set('section', 'featured');

  if (drillState['shows']) params.set('showID', drillState['shows']);
  if (drillState['extras']) params.set('categoryID', drillState['extras']);

  if (activeId) params.set('episodeID', activeId);
  const newUrl = window.location.pathname + (params.toString() ? '?' + params.toString() : '');
  history.replaceState(null, '', newUrl);
}

function switchTab(el, tabKey) {
  if (activePage === tabKey && drillState[tabKey]) {
    drillBack(tabKey);
    return;
  }
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  if (el) el.classList.add('active');
  document.querySelectorAll('.page-view').forEach(p => p.classList.remove('active'));
  const view = document.getElementById('page-' + tabKey);
  if (view) view.classList.add('active');
  activePage = tabKey;
  refreshTab(tabKey);
  _updateURL();
}

function getEpById(id) {
  const all = [
    ...whatsNewEps,
    ...showsData.flatMap(s => s.episodes.map(ep => ({ ...ep, show: s.name, color: s.color }))),
    ...extrasData.flatMap(s => s.episodes.map(ep => ({ ...ep, show: s.name, color: s.color }))),
  ];
  return all.find(e => e.id === id);
}

function selectEpById(id) {
  const ep = getEpById(id);
  if (ep) selectEp(ep);
}

function selectEp(ep) {
  if (typeof ep === 'string') ep = JSON.parse(ep);
  activeId = ep.id;

  if (ep.id && history.replaceState) {
    _updateURL();
  }
  document.getElementById('nowTitle').textContent = ep.show || ep.parentName || '';
  document.getElementById('nowEp').textContent    = titleCase(ep.ep);
  document.getElementById('nowDesc').textContent  = ep.desc || '';

  if (ep.src) {
    document.getElementById('placeholder').style.display = 'none';
    document.body.classList.remove('video-ready');

    videoEl.src = ep.src;
    videoEl.load();
    setPlayerState('BUFFERING');
    isPlaying = true;
    updatePlayIcon();

    startLoadingClip();
  } else {

    document.getElementById('placeholder').style.display = 'flex';
    videoEl.classList.remove('active');
    videoEl.src = '';
    setPlayerState('DISCONNECTED');
    isPlaying = false;
    updatePlayIcon();
  }
  setControlsEnabled(true);

  const sceneSection = document.getElementById('playerSceneSection');
  const sceneBoxes   = document.getElementById('playerSceneBoxes');
  const sceneCounter = document.getElementById('playerSceneCounter');

  function _renderScenes(segs) {
    if (!sceneSection || !sceneBoxes) return;
    sceneBoxes.innerHTML = segs.map((seg, i) => {
      const seekSec  = i * 362;
      const thumbSec = 77 + (i * 320);
      const m = Math.floor(seekSec / 60);
      const s = seekSec % 60;
      const label = `${m}:${String(s).padStart(2,'0')}`;
      return `<div class="scene-box" data-sec="${seekSec}" data-thumb-sec="${thumbSec}" onclick="seekScene('${ep.id}', ${seekSec})" title="Scene ${i+1} — ${label}">
        <div class="scene-box-badge"></div>
        <div class="scene-box-num">${i+1}</div>
      </div>`;
    }).join('');
    if (sceneCounter) sceneCounter.textContent = segs.length > 0 ? `1-${segs.length} of ${segs.length}` : '';
    sceneSection.style.display = segs.length > 0 ? 'block' : 'none';
    if (segs.length > 0) setTimeout(() => generateSceneThumbsInEl(sceneBoxes, ep), 1500);
  }

  const segs = ep.segments || [];
  if (segs.length > 0) {
    _renderScenes(segs);
  } else if (ep.src) {
    if (sceneSection) sceneSection.style.display = 'none';
    videoEl.addEventListener('loadedmetadata', function _autoSegs() {
      videoEl.removeEventListener('loadedmetadata', _autoSegs);
      if (activeId !== ep.id) return;
      const dur = videoEl.duration;
      if (!dur || !isFinite(dur) || dur <= 60) return;
      const origEp = [...showsData, ...extrasData].flatMap(s => s.episodes).find(e => e.id === ep.id);
      if (!origEp) return;
      const count = Math.max(1, Math.round(dur / 362));
      origEp.segments = Array.from({ length: count }, (_, i) => ({ id: 'auto-' + i }));
      _renderScenes(origEp.segments);
    });
  }

  refreshTab(activePage);
}

function seekScene(epId, seconds) {
  if (activeId !== epId) selectEpById(epId);
  setTimeout(() => {
    if (videoEl.readyState >= 1) {
      videoEl.currentTime = seconds;
    } else {
      videoEl.addEventListener('loadedmetadata', () => { videoEl.currentTime = seconds; }, { once: true });
    }
  }, 100);
}

function captureSceneFrame(boxEl, thumbSec, src) {
  if (!src || src === window.location.href) return;
  const key = _thumbCacheKey(src, thumbSec);
  if (thumbCache[key]) {
    boxEl.style.backgroundImage = `url(${thumbCache[key]})`;
    boxEl.style.backgroundSize = 'cover';
    boxEl.style.backgroundPosition = 'center';
    return;
  }
  const canvas = document.createElement('canvas');
  canvas.width = 88; canvas.height = 66;
  const ctx = canvas.getContext('2d');
  const tmp = document.createElement('video');
  tmp.src = src;
  tmp.muted = true;
  tmp.preload = 'metadata';
  tmp.addEventListener('seeked', () => {
    try {
      ctx.drawImage(tmp, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
      thumbCache[key] = dataUrl;
      boxEl.style.backgroundImage = `url(${dataUrl})`;
      boxEl.style.backgroundSize = 'cover';
      boxEl.style.backgroundPosition = 'center';
    } catch(e) {}
    tmp.src = '';
  }, { once: true });
  tmp.addEventListener('loadedmetadata', () => { tmp.currentTime = thumbSec; }, { once: true });
}

function generateSceneThumbsInEl(container, ep) {
  const src = ep.src;
  if (!src || src === window.location.href) return;
  container.querySelectorAll('.scene-box').forEach(box => {
    const thumbSec = parseInt(box.dataset.thumbSec || '77');
    captureSceneFrame(box, thumbSec, src);
  });
}

function generateSceneThumbs(epId) {
  const allEps = [
    ...whatsNewEps,
    ...showsData.flatMap(s => s.episodes.map(ep => ({ ...ep, show: s.name }))),
    ...extrasData.flatMap(s => s.episodes.map(ep => ({ ...ep, show: s.name }))),
  ];
  const ep = allEps.find(e => e.id === epId);
  const container = document.querySelector(`#expanded-${epId} .scene-boxes`);
  if (container && ep) generateSceneThumbsInEl(container, ep);
}

function toggleExpand(id) {
  const exp = document.getElementById('expanded-' + id);
  const btn = document.getElementById('expandBtn-' + id);
  const sceneRow = document.getElementById('scene-row-' + id);
  const tile = document.getElementById('item-' + id);
  const wrap = tile ? tile.closest('.video-item-wrap') : null;
  if (!exp || !btn) return;
  const open = exp.classList.toggle('open');
  btn.classList.toggle('expanded', open);
  if (wrap) wrap.classList.toggle('expanded-tile', open);
  if (sceneRow) {
    sceneRow.style.display = open ? 'block' : 'none';
    if (open) {
      const allEps = [
        ...whatsNewEps,
        ...showsData.flatMap(s => s.episodes.map(ep => ({ ...ep, show: s.name }))),
        ...extrasData.flatMap(s => s.episodes.map(ep => ({ ...ep, show: s.name }))),
      ];
      const ep = allEps.find(e => e.id === id);
      const container = sceneRow.querySelector('.scene-boxes');
      if (container && ep) generateSceneThumbsInEl(container, ep);
      const counter = document.getElementById('scene-counter-' + id);
      if (counter && ep) {
        const count = (ep.segments || []).length;
        counter.textContent = count > 0 ? `1-${count} of ${count}` : '';
      }
    }
  }
}

function toggleFavorite(id) {
  const allEps = [
    ...whatsNewEps,
    ...showsData.flatMap(s => s.episodes.map(ep => ({ ...ep, show: s.name, color: s.color }))),
    ...extrasData.flatMap(s => s.episodes.map(ep => ({ ...ep, show: s.name, color: s.color }))),
  ];
  const ep = allEps.find(e => e.id === id);
  if (!ep) return;
  const idx = favorites.findIndex(f => f.id === id);
  if (idx === -1) { favorites.push(ep); }
  else            { favorites.splice(idx, 1); }

  try { localStorage.setItem('VideoBrowser.favorites', JSON.stringify(favorites.map(f => f.id))); } catch(e) {}
  renderFavorites();
  if (activePage !== 'favorites') refreshTab(activePage);
}

function moreVideosLikeThis() {
  const showName = document.getElementById('nowTitle').textContent;
  if (!showName || showName === 'SHOW') { return; }

  const match = showsData.find(s => s.name.toUpperCase() === showName.toUpperCase());

  const showsTab = document.querySelector('.nav-tab[onclick*="shows"]');
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  if (showsTab) showsTab.classList.add('active');
  document.querySelectorAll('.page-view').forEach(p => p.classList.remove('active'));
  document.getElementById('page-shows').classList.add('active');
  activePage = 'shows';

  if (match) {
    drillInto('shows', match.id);
  } else {
    drillState['shows'] = null;
    refreshTab('shows');
    updatePanelFit();
  }
}

function updatePanelFit() {
  ['whats-new', 'shows', 'extras', 'search', 'favorites'].forEach(tab => {
    updateScrollThumb(tab);
  });
}

const MouseWheelManager = (() => {
  const targets = {};
  function onWheel(e) {
    let el = e.target;
    while (el) {
      const key = el.dataset && el.dataset.scrollKey;
      if (key && targets[key]) {
        targets[key].onMouseWheel(e.deltaY > 0 ? -1 : 1);
        e.preventDefault();
        return;
      }
      el = el.parentElement;
    }
  }
  window.addEventListener('wheel', onWheel, { passive: false });
  return {
    register(key, instance) { targets[key] = instance; },
    unregister(key)         { delete targets[key]; }
  };
})();

class ScrollBarUI {
  constructor(tabKey) {
    this.tabKey      = tabKey;
    this.list        = document.getElementById('list-'  + tabKey);
    this.track       = document.getElementById('track-' + tabKey);
    this.thumb       = document.getElementById('thumb-' + tabKey);
    this.upBtn       = this._findScrollBtn(tabKey, 'up');
    this.downBtn     = this._findScrollBtn(tabKey, 'down');

    this.minPos        = 0;
    this.maxPos        = 0;
    this.pageSize      = 0;
    this.smallScroll   = 1;
    this.largeScroll   = 0;
    this.scrollPos     = 0;
    this.trackHt       = 0;
    this.thumbHt       = 0;
    this.scrollTop     = 0;
    this.scrollBot     = 0;
    this._scrollingID  = null;
    this._dragging     = false;
    this._lastY        = 0;
    this._dragStartScrollTop = 0;

    if (!this.list || !this.track || !this.thumb) return;

    this.list.dataset.scrollKey = tabKey;
    MouseWheelManager.register(tabKey, this);

    this._initBtns();
    this._initDrag();
    this._initTrackClick();

    this.list.addEventListener('scroll', () => this._syncThumbFromList());
    this._syncThumbFromList();
  }

  _findScrollBtn(tabKey, dir) {
    const col = this.track && this.track.closest('.scroll-col');
    if (!col) return null;
    return col.querySelector(`.scroll-img-btn.${dir}`);
  }

  _initBtns() {
    const startBtn = (btn, dir) => {
      if (!btn) return;
      btn.addEventListener('mousedown', (e) => {
        if (this.list.scrollHeight <= this.list.clientHeight) return;
        e.preventDefault();
        this._scrollOne(dir);
        this._stopScrolling();
        this._scrollingID = setTimeout(() => {
          this._scrollingID = setInterval(() => this._scrollOne(dir), 35);
        }, 500);
      });
      btn.addEventListener('mouseup',    () => this._stopScrolling());
      btn.addEventListener('mouseleave', () => this._stopScrolling());
    };
    startBtn(this.upBtn,   -1);
    startBtn(this.downBtn,  1);
  }

  _initTrackClick() {
    if (!this.track) return;
    this.track.addEventListener('mousedown', (e) => {
      if (this.list.scrollHeight <= this.list.clientHeight) return;
      if (e.target === this.thumb || this.thumb.contains(e.target)) return;
      e.preventDefault();
      this._trackScroller(e);
      this._stopScrolling();
      this._scrollingID = setTimeout(() => {
        this._scrollingID = setInterval(() => this._trackScroller(e), 35);
      }, 500);
    });
    this.track.addEventListener('mouseup',    () => this._stopScrolling());
    this.track.addEventListener('mouseleave', () => this._stopScrolling());
  }

  _trackScroller(e) {
    const trackRect = this.track.getBoundingClientRect();
    const clickY    = e.clientY - trackRect.top;
    const thumbTop  = parseFloat(this.thumb.style.top) || 0;
    if (clickY > thumbTop + this.thumbHt) this._scrollPage(1);
    else if (clickY < thumbTop)           this._scrollPage(-1);
  }

  _initDrag() {
    if (!this.thumb) return;
    this.thumb.addEventListener('mousedown', (e) => {
      if (this.list.scrollHeight <= this.list.clientHeight) return;
      this._dragging = true;
      this._lastY    = e.clientY;
      this._dragStartScrollTop = this.list.scrollTop;
      this.thumb.style.cursor = 'grabbing';
      e.preventDefault();
      e.stopPropagation();
    });
    document.addEventListener('mousemove', (e) => {
      if (!this._dragging) return;
      const delta      = e.clientY - this._lastY;
      const thumbH     = this.thumb.getBoundingClientRect().height;
      const maxTop     = this.track.clientHeight - 10 - thumbH - 10;
      const newThumbY  = Math.min(maxTop, Math.max(this.scrollTop,
                          (parseFloat(this.thumb.style.top) || 0) + delta));
      this._lastY      = e.clientY;
      this.thumb.style.top = newThumbY + 'px';
      const scrollable = this.list.scrollHeight - this.list.clientHeight;
      this.list.scrollTop = scrollable > 0
        ? (newThumbY - this.scrollTop) / this.trackHt * scrollable
        : 0;
    });
    document.addEventListener('mouseup', () => {
      if (!this._dragging) return;
      this._dragging = false;
      this.thumb.style.cursor = '';
    });
  }

  _scrollOne(dir) {
    const itemH = this._itemHeight();
    this.list.scrollTop += dir * this.smallScroll * itemH;
  }

  _scrollPage(dir) {
    const amount = this.largeScroll !== 0 ? this.largeScroll : this.pageSize;
    const itemH  = this._itemHeight();
    this.list.scrollTop += dir * amount * itemH;
  }

  onMouseWheel(delta) {
    this._scrollOne(-delta);
  }

  _stopScrolling() {
    if (this._scrollingID !== null) {
      clearTimeout(this._scrollingID);
      clearInterval(this._scrollingID);
      this._scrollingID = null;
    }
  }

  _syncThumbFromList() {
    if (!this.list || !this.track || !this.thumb) return;
    const scrollable = this.list.scrollHeight - this.list.clientHeight;
    if (scrollable <= 0) { this.thumb.style.display = 'none'; return; }
    this.thumb.style.display = 'flex';

    const TRACK_PAD = 10;
    const trackH  = this.track.clientHeight - TRACK_PAD * 2;
    const visible = this.list.clientHeight;
    const total   = this.list.scrollHeight;
    this.thumbHt  = Math.max(23, (visible / total) * trackH);
    this.trackHt  = trackH - this.thumbHt;
    this.scrollTop = TRACK_PAD;
    this.scrollBot = TRACK_PAD + this.trackHt;

    const maxTop = this.track.clientHeight - TRACK_PAD - this.thumbHt;
    const thumbTop = Math.min(maxTop, Math.max(TRACK_PAD, TRACK_PAD + (this.list.scrollTop / scrollable) * this.trackHt));
    this.thumb.style.height = this.thumbHt + 'px';
    this.thumb.style.top    = thumbTop + 'px';
  }

  _itemHeight() {
    const isBanner = this.list.classList.contains('banner-list');
    return isBanner ? 61 : 69;
  }

  update() { this._syncThumbFromList(); }

  destroy() {
    this._stopScrolling();
    MouseWheelManager.unregister(this.tabKey);
  }
}

const _scrollBars = {};

function updateScrollThumb(tabKey) {
  if (_scrollBars[tabKey]) _scrollBars[tabKey].update();
}

function initScrollThumb(tabKey) {
  if (_scrollBars[tabKey]) _scrollBars[tabKey].destroy();
  _scrollBars[tabKey] = new ScrollBarUI(tabKey);
  _scrollBars[tabKey].update();
}

function scrollList(tabKey, dir) {
  if (_scrollBars[tabKey]) {
    _scrollBars[tabKey]._scrollOne(dir);
  } else {
    const list = document.getElementById('list-' + tabKey);
    if (list) list.scrollBy({ top: dir * 69 });
  }
}

function changePage(tabKey, dir) {
  if (!drillState[tabKey] && (tabKey === 'shows' || tabKey === 'extras')) return;
  const source = tabKey === 'whats-new' ? whatsNewEps
    : drillState[tabKey] ? (tabKey === 'shows' ? showsData : extrasData).find(s => s.id === drillState[tabKey])?.episodes || []
    : [];
  const max = Math.ceil(source.length / PER_PAGE);
  pageState[tabKey].current = Math.max(1, Math.min(max, pageState[tabKey].current + dir));
  refreshTab(tabKey);
}

function goToPage(tabKey) {
  const val = parseInt(document.getElementById('page-' + tabKey + '-num').value);
  const source = tabKey === 'whats-new' ? whatsNewEps
    : drillState[tabKey] ? (tabKey === 'shows' ? showsData : extrasData).find(s => s.id === drillState[tabKey])?.episodes || []
    : [];
  const max = Math.ceil(source.length / PER_PAGE);
  if (!isNaN(val)) { pageState[tabKey].current = Math.max(1, Math.min(max, val)); refreshTab(tabKey); }
}

function doSearch() {
  const q = document.getElementById('searchInput').value.trim().toLowerCase();
  const allEps = [
    ...whatsNewEps,
    ...showsData.flatMap(s => s.episodes.map(ep => ({ ...ep, show: s.name, color: s.color }))),
    ...extrasData.flatMap(s => s.episodes.map(ep => ({ ...ep, show: s.name, color: s.color }))),
  ];
  searchResults = q ? allEps.filter(ep =>
    (ep.show||'').toLowerCase().includes(q) || (ep.ep||'').toLowerCase().includes(q) || (ep.desc||'').toLowerCase().includes(q)
  ) : [];
  renderEpisodeTiles('list-search', searchResults);
  updateCount('search', searchResults.length, searchResults.length);
  setTimeout(() => updateScrollThumb('search'), 50);
}

function setControlsEnabled(enabled) {
  const btns = ['playBtn', 'prevBtn', 'skipBtn'];
  btns.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.disabled = !enabled;
  });
  const pill = document.querySelector('.pill-container');
  if (pill) pill.classList.toggle('disabled', !enabled);
  const sizePill = document.querySelector('.size-pill');
  if (sizePill) sizePill.classList.toggle('disabled', !enabled);
  document.querySelectorAll('.size-btn').forEach(b => b.disabled = !enabled);
  const progressWrap = document.querySelector('.progress-wrap');
  if (progressWrap) progressWrap.classList.toggle('controls-disabled', !enabled);
  const progressTrack = document.getElementById('progressTrack');
  if (progressTrack) progressTrack.style.pointerEvents = enabled ? '' : 'none';
}

(function() {
  document.addEventListener('DOMContentLoaded', () => {
    const fullBtn = document.querySelector('.size-btn-full');
    if (!fullBtn) return;
    fullBtn.addEventListener('mouseenter', () => {
      if (document.body.classList.contains('video-ready')) {

        fullBtn.style.transition = 'none';
        fullBtn.style.background = 'linear-gradient(180deg, #fff 0%, #ccc 100%)';
        fullBtn.style.color = '#333';
        setTimeout(() => {
          fullBtn.style.transition = 'background 0.1s, color 0.1s';
          fullBtn.style.background = 'linear-gradient(180deg, #ff3322 0%, #cc1100 100%)';
          fullBtn.style.color = '#fff';
          fullBtn.style.borderColor = '#fff';
        }, 30);
      }
    });
    fullBtn.addEventListener('mouseleave', () => {
      fullBtn.style.transition = 'background 0.1s, color 0.1s';
      if (document.body.classList.contains('video-ready')) {
        fullBtn.style.background = 'linear-gradient(180deg, #222, #000)';
        fullBtn.style.color = '#fff';
        fullBtn.style.borderColor = '#fff';
      } else {
        fullBtn.style.background = '';
        fullBtn.style.color = '';
        fullBtn.style.borderColor = '';
      }
    });
  });
})();

function setLoadingControls(loading) {
  const controlsBar = document.querySelector('.controls-bar');
  if (controlsBar) controlsBar.classList.toggle('loading-active', loading);

  if (!loading) {
    const sizePill = document.querySelector('.size-pill');
    if (sizePill) sizePill.classList.remove('disabled');
    document.querySelectorAll('.size-btn').forEach(b => b.disabled = false);
  }
}

function updatePlayIcon() {
  document.getElementById('playIcon').innerHTML = isPlaying
    ? '<path d="M7 19h3V5H7v14zm7 0h3V5h-3v14z"/>'
    : '<path d="M8 5v14l11-7z"/>';
}

function togglePlay() {
  if (!videoEl.src || videoEl.src === window.location.href) { return; }
  if (isPlaying) {
    videoEl.pause();
  } else {
    document.getElementById('placeholder').style.display = 'none';
    videoEl.classList.add('active');
    videoEl.play();
  }
  isPlaying = !isPlaying;
  updatePlayIcon();
}

function getPlaylist() {
  if (activePage === 'favorites' || favorites.some(f => f.id === activeId)) {
    return favorites.map(f => {
      const all = [...whatsNewEps,
        ...showsData.flatMap(s => s.episodes.map(ep => ({...ep, show:s.name, color:s.color}))),
        ...extrasData.flatMap(s => s.episodes.map(ep => ({...ep, show:s.name, color:s.color}))),
      ];
      return all.find(e => e.id === f.id) || f;
    });
  }
  return [...whatsNewEps,
    ...showsData.flatMap(s => s.episodes.map(ep => ({...ep, show:s.name, color:s.color}))),
    ...extrasData.flatMap(s => s.episodes.map(ep => ({...ep, show:s.name, color:s.color}))),
  ];
}

function prevVideo() {
  if (videoEl.currentTime > SEEK_TO_PREV_OFFSET) {
    videoEl.currentTime = 0;
    return;
  }
  const all = getPlaylist();
  const idx = all.findIndex(e => e.id === activeId);
  if (idx > 0) {
    if (favorites.some(f => f.id === activeId)) switchTab(document.querySelector('.nav-tab[onclick*="favorites"]'), 'favorites');
    selectEp(all[idx - 1]);
  }
}

function skipVideo() {
  const all = getPlaylist();
  const idx = all.findIndex(e => e.id === activeId);
  if (idx < all.length - 1) {
    if (favorites.some(f => f.id === activeId)) switchTab(document.querySelector('.nav-tab[onclick*="favorites"]'), 'favorites');
    selectEp(all[idx + 1]);
  }
}

function toggleMute() {
  videoEl.muted = !videoEl.muted;
  const icon = document.getElementById('muteIcon');
  const fb = document.querySelector('#muteBtn .btn-svg-fallback');
  icon.innerHTML = '<path d="M3 9v6h4l5 5V4L7 9H3z"/>';
  if (videoEl.muted) {
    fb.style.background = 'linear-gradient(180deg, #ff4422, #cc0000)';
  } else {
    fb.style.background = '';
  }
}

function seekVideo(e) {
  const track = document.getElementById('progressTrack');
  if (videoEl.duration) {
    const rect = track.getBoundingClientRect();
    videoEl.currentTime = ((e.clientX - rect.left) / rect.width) * videoEl.duration;
  }
}

(function() {
  const track = document.getElementById('progressTrack');
  const thumb = document.getElementById('progressThumb');
  let scrubbing = false;

  function setScrubPos(e) {
    if (!videoEl.duration) return;
    const rect = track.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    videoEl.currentTime = pct * videoEl.duration;
  }

  track.addEventListener('mouseenter', () => {
    thumb.classList.add('scrubbing');
  });
  track.addEventListener('mouseleave', () => {
    if (!scrubbing) thumb.classList.remove('scrubbing');
  });
  track.addEventListener('mousedown', e => {
    scrubbing = true;
    thumb.classList.add('scrubbing');
    setScrubPos(e);
    e.preventDefault();
  });
  document.addEventListener('mousemove', e => {
    if (!scrubbing) return;
    setScrubPos(e);
  });
  document.addEventListener('mouseup', () => {
    if (!scrubbing) return;
    scrubbing = false;
    thumb.classList.remove('scrubbing');
  });
})();
videoEl.addEventListener('timeupdate', () => {
  if (videoEl.duration) {
    const pct = videoEl.currentTime / videoEl.duration * 100;
    document.getElementById('progressFill').style.width = pct + '%';
    const thumb = document.getElementById('progressThumb');
    thumb.style.left = pct + '%';
    thumb.style.display = 'block';
  }
  const cur = videoEl.currentTime;
  const m = Math.floor(cur / 60).toString().padStart(2, '0');
  const s = Math.floor(cur % 60).toString().padStart(2, '0');
  document.getElementById('progressTime').textContent = m + ':' + s;
  updateBufferBar();
  if (playerState === 'PLAYING') resetIdleTimer();
});

const SEEK_TO_PREV_OFFSET = 1;   
const IDLE_TIMEOUT_MS    = 300000; 
let   playerState        = 'DISCONNECTED';
let   idleTimerID        = null;

function setPlayerState(state) {
  playerState = state;
  const statusEl = document.getElementById('progressStatus');
  const states = { DISCONNECTED:'', STOPPED:'', PLAYING:'Playing',
                   PAUSED:'Paused', BUFFERING:'Buffering', SEEKING:'Seeking',
                   OPENING:'Opening...', READY:'Ready' };
  statusEl.textContent = states[state] ?? '';
  const hasVideo = (state !== 'DISCONNECTED' && state !== 'STOPPED');
  setControlsEnabled(hasVideo);

  const placeholder = document.getElementById('placeholder');
  if (placeholder) placeholder.style.display = hasVideo ? 'none' : 'flex';
}

function resetIdleTimer() {
  clearTimeout(idleTimerID);
  idleTimerID = setTimeout(() => {
    if (playerState === 'PLAYING') {
      videoEl.pause();
      setPlayerState('PAUSED');
    }
  }, IDLE_TIMEOUT_MS);
}

function updateBufferBar() {
  if (!videoEl.duration || !videoEl.buffered.length) return;
  const bufferedEnd = videoEl.buffered.end(videoEl.buffered.length - 1);
  const pct = (bufferedEnd / videoEl.duration) * 100;
  document.getElementById('progressBuffer').style.width = pct + '%';
}

let _loadingActive   = false;
let _realVideoReady  = false;
let _crossfadeDone   = false;

function getLoadingVid() { return document.getElementById('loadingVideo'); }

function startLoadingClip() {
  const lv = getLoadingVid();
  _loadingActive  = true;
  _realVideoReady = false;
  _crossfadeDone  = false;

  videoEl.classList.add('active');
  videoEl.style.transition = 'none';
  videoEl.style.opacity    = '0';

  setLoadingControls(true);

  if (!lv) {
    _loadingActive = false;
    return;
  }
  lv.style.display    = 'block';
  lv.style.transition = 'none';
  lv.style.opacity    = '1';
  lv.currentTime      = 0;
  lv.load();
  lv.play().catch((e) => {

    _loadingActive = false;
    if (_realVideoReady) doCrossfade();
  });
}

function doCrossfade() {
  if (_crossfadeDone) return;
  _crossfadeDone = true;
  _loadingActive = false;

  const lv = getLoadingVid();

  if (lv) {
    lv.style.transition = 'opacity 0.6s ease';
    lv.style.opacity    = '0';
    setTimeout(() => {
      lv.style.display = 'none';
      lv.pause();
      lv.currentTime = 0;
    }, 700);
  }

  videoEl.style.transition = 'opacity 0.6s ease';
  videoEl.style.opacity    = '1';
  videoEl.currentTime      = 0;
  videoEl.play().catch(() => {});

  const cnBug = document.getElementById('cnBug');
  if (cnBug) cnBug.style.display = '';
  setLoadingControls(false);
  document.body.classList.add('video-ready');
  setPlayerState('PLAYING');
}

(function() {
  const lv = getLoadingVid();
  if (!lv) return;
  lv.addEventListener('ended', () => {
    if (!_loadingActive) return;
    if (_realVideoReady) {
      doCrossfade();
    } else {
      lv.currentTime = 0;
      lv.play().catch(() => {});
    }
  });

  lv.addEventListener('error', () => {
    if (!_loadingActive) return;
    doCrossfade();
  });
})();

videoEl.addEventListener('canplaythrough', () => {
  _realVideoReady = true;

  if (!_loadingActive) {
    doCrossfade();
  }
});

videoEl.addEventListener('loadstart', () => {
  if (_loadingActive) return;
  setPlayerState('OPENING');
});

videoEl.addEventListener('loadedmetadata', () => {
  if (_loadingActive) return;
  setPlayerState('READY');
});

videoEl.addEventListener('waiting', () => {
  if (_loadingActive) return;
  setPlayerState('BUFFERING');
});
videoEl.addEventListener('stalled', () => {
  if (_loadingActive) return;
  setPlayerState('BUFFERING');
});
videoEl.addEventListener('playing', () => {
  if (_loadingActive) return;
  setPlayerState('PLAYING');
  resetIdleTimer();
});
videoEl.addEventListener('pause', () => {
  if (!videoEl.ended) setPlayerState('PAUSED');
});
videoEl.addEventListener('seeking', () => {
  setPlayerState('SEEKING');
});
videoEl.addEventListener('seeked', () => {
  setPlayerState(videoEl.paused ? 'PAUSED' : 'PLAYING');
});
videoEl.addEventListener('progress', updateBufferBar);
videoEl.addEventListener('ended', () => {
  clearTimeout(idleTimerID);
  setPlayerState('STOPPED');
  document.getElementById('progressThumb').style.display = 'none';

  videoEl.currentTime = 0;

  videoEl.classList.remove('active');
  document.getElementById('placeholder').style.display = 'flex';
  isPlaying = false;
  updatePlayIcon();

  if (favorites.some(f => f.id === activeId)) {
    const all = getPlaylist();
    const idx = all.findIndex(e => e.id === activeId);
    if (idx !== -1 && idx < all.length - 1) {
      switchTab(document.querySelector('.nav-tab[onclick*="favorites"]'), 'favorites');
      selectEp(all[idx + 1]);
    }
  }
});
videoEl.addEventListener('error', () => {
  setPlayerState('DISCONNECTED');
  clearTimeout(idleTimerID);
});

function setFullBtnText(isFullscreen) {
  if (!document.body.classList.contains('theme-cn')) return;
  const fullBtn = document.querySelector('.size-btn[onclick*="full"]');
  if (fullBtn) fullBtn.textContent = isFullscreen ? 'NORMAL' : 'FULL';
}

function setSize(size, btn) {
  const isCN = document.body.classList.contains('theme-cn');
  document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  if (size === 'full') {
    if (isCN) {

      if (document.documentElement.classList.contains('player-fullscreen')) {
        document.documentElement.classList.remove('player-fullscreen');
        document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
        document.querySelector('.size-btn').classList.add('active');
        setFullBtnText(false);
        return;
      }

      if (!setSize._confirmedFullscreen) {
        if (!confirm('Press ESC to exit Full Screen mode.')) {
          document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
          document.querySelector('.size-btn').classList.add('active');
          return;
        }
        setSize._confirmedFullscreen = true;
      }
      document.documentElement.classList.add('player-fullscreen');
      setFullBtnText(true);
    } else {

      if (document.fullscreenElement) {
        document.exitFullscreen();
        document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
        document.querySelector('.size-btn').classList.add('active');
        return;
      }

      if (!setSize._confirmedFullscreen) {
        if (!confirm('Press ESC to exit Full Screen mode.')) {
          document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
          document.querySelector('.size-btn').classList.add('active');
          return;
        }
        setSize._confirmedFullscreen = true;
      }
      videoEl.requestFullscreen().catch(() => {
        document.querySelector('.size-btn').classList.add('active');
      });

      document.addEventListener('fullscreenchange', function onFSChange() {
        if (!document.fullscreenElement) {
          document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
          document.querySelector('.size-btn').classList.add('active');
          document.removeEventListener('fullscreenchange', onFSChange);
        }
      });
    }
  } else if (size === 'normal') {
    document.documentElement.classList.remove('player-fullscreen');
    setFullBtnText(false);
  } else if (size === 'min') {
    document.documentElement.classList.remove('player-fullscreen');
    setFullBtnText(false);
    if (!videoEl.src || videoEl.src === window.location.href) {
      document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
      document.querySelector('.size-btn').classList.add('active');
      return;
    }
    const currentTime = videoEl.currentTime;
    const title = document.getElementById('nowTitle').textContent + ' — ' + document.getElementById('nowEp').textContent;

    const miniHTML = `<!DOCTYPE html>
<html>
<head>
<title>${title}</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; background: #000; }
  video { width: 100vw; height: 100vh; display: block; object-fit: contain; }
</style>
</head>
<body>
<video id="v" src="${videoEl.src}" autoplay playsinline></video>
<script>
  const v = document.getElementById('v');
  v.currentTime = ${currentTime};
  v.play();
  window.opener && window.addEventListener('beforeunload', () => {});
<\/script>
</body>
</html>`;

    const blob = new Blob([miniHTML], { type: 'text/html' });
    const url  = URL.createObjectURL(blob);
    const w = window.open(url, 'miniPlayer',
      'width=320,height=180,resizable=yes,toolbar=no,menubar=no,scrollbars=no,location=no,status=no');

    if (!w) {
      document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
      document.querySelector('.size-btn').classList.add('active');
      return;
    }

    videoEl.pause();
    isPlaying = false;
    updatePlayIcon();

    const poll = setInterval(() => {
      if (w.closed) {
        clearInterval(poll);
        URL.revokeObjectURL(url);
        document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
        document.querySelector('.size-btn').classList.add('active');
      }
    }, 500);
  }
}

const cnVideoComments = [{"name": "the powerpuff girls", "text": "it must be hard to handle something that knows your evry move, but you still did good mojond powerpuff girls you did good to."}, {"name": "Bakugan", "text": "Bakugan is cool even if I'm a girl I like it, its not bad if you watch it you can call me a tomboy I don't care thats how I am thats how I am, SO DEAL WITH IT!"}, {"name": "CartoonNicky", "text": "cartoon network video is soooooooo!, A-W-S-O-M-E!"}, {"name": "courage the cowardly dog", "text": "Courage,you are so funny! I think you should be comedian. You even make my mom laugh,and shes' thirty-nine!!!! P.S. Get a denist Couage for that tooth of yours!"}, {"name": "Chowder", "text": "In chowder I like the person that  always  say  raaada he so funny because he always pickup rocks"}, {"name": "cow and chicken", "text": "I love cow and chicken. it is so funny."}, {"name": "Scooby-Doo", "text": "My Name is Susan I would like to see Scooby-Doo on cartoonnetwork.com/video"}, {"name": "Totally spies total fan!", "text": "Totally Spies So Totally rock! I just love them!"}, {"name": "i ate a sushi kabob", "text": "i love watching Totaally spies, they are so cool! i also luv 'fsters home for imaignary freinds'"}, {"name": "Abeehagirl", "text": "Ben 10 is the best! I hope the new show will be good."}, {"name": "Joshua B", "text": "Ben 10: Alien Force WAS AWESOME!!! I CAN'T WAIT TO SEE THE WHOLE SHOW!!!"}, {"name": "davonta", "text": "bakugan is the best show  ever"}, {"name": "ben 10", "text": "I AM Jacob and I like ben10 because he looks like me"}, {"name": "Mrs.Happy", "text": "I love Bakugan it is a real awesome.I wish I had some Bakugan of my own!"}, {"name": "Mr. Quiet", "text": "I love The Mr. Men Show! Their actions and emotions are funny and the short music videos are nice."}, {"name": "Nene", "text": "This is so awesome Cartoon Network Rocks! I get to watch my old favortie cartoons online. I absolutly love it. Thanks Cartoon Network."}, {"name": "Code Lyoko", "text": "Code Lyoko is the best show in the whole entire show of Cartoon Network."}, {"name": "123friend", "text": "I love Fosters home for imaginary friends!!!!!!!!!!"}, {"name": "Lily", "text": "I love that you guys put your cartoons on your web site because right now my t.v. is broken!"}, {"name": "Nene", "text": "This is so awesome Cartoon Network Rocks!"}, {"name": "AnimeGirl", "text": "Care Bears on Fire ROCK!!!!!!!!!!!!!!!! Go Cartoonnetwork and Fried Dynomite"}, {"name": "Zeak", "text": "I miss Ed Edd n Eddy"}, {"name": "SaintSaturn", "text": "Long live The Aquabats!"}, {"name": "Forrest", "text": "Ben 10, Ed Edd N' Eddy, and Chowder are my favorite shows. I like watching them all the time."}, {"name": "Donny P", "text": "It's great that you've put Total Drama Island on cartoonnetworkvideo. Now I can watch that show whenever I want."}, {"name": "im not your boyfriend", "text": "im not your boy friendddddddddddddddddddddddddddddddddddddddddd that was funny"}];

function renderCNComments() {
  const list = document.getElementById('cn-comment-list');
  if (!list) return;
  list.innerHTML = '';
  cnVideoComments.forEach((c, i) => {
    const div = document.createElement('div');
    div.style.cssText = 'padding:3px 0;border-bottom:1px solid #ddd;font:normal 10px Arial,Verdana,Helvetica,sans-serif;color:#000;background:' + (i % 2 === 0 ? '#f0f0f0' : '#fff') + ';padding:3px 4px;';
    div.innerHTML = '<b>' + c.name.replace(/</g,'&lt;') + ':</b> ' + c.text.replace(/</g,'&lt;');
    list.appendChild(div);
  });
}

function submitCNComment() {
  const name = (document.getElementById('cn-comment-name').value || '').trim();
  const text = (document.getElementById('cn-comment-text').value || '').trim();
  if (!name || !text) return;
  cnVideoComments.unshift({ name, text });
  document.getElementById('cn-comment-name').value = '';
  document.getElementById('cn-comment-text').value = '';
  renderCNComments();
}

function openCommentsPopup() {
  const cnVideoComments = [{"name": "the powerpuff girls", "text": "it must be hard to handle something that knows your evry move, but you still did good mojond powerpuff girls you did good to."}, {"name": "Bakugan", "text": "Bakugan is cool even if I'm a girl I like it, its not bad if you watch it you can call me a tomboy I don't care thats how I am thats how I am, SO DEAL WITH IT!"}, {"name": "CartoonNicky", "text": "cartoon network video is soooooooo!, A-W-S-O-M-E!"}, {"name": "courage the cowardly dog", "text": "Courage,you are so funny! I think you should be comedian. You even make my mom laugh,and shes' thirty-nine!!!! P.S. Get a denist Couage for that tooth of yours!"}, {"name": "Chowder", "text": "In chowder I like the person that  always  say  raaada he so funny because he always pickup rocks"}, {"name": "cow and chicken", "text": "I love cow and chicken. it is so funny."}, {"name": "Scooby-Doo", "text": "My Name is Susan I would like to see Scooby-Doo on cartoonnetwork.com/video"}, {"name": "Totally spies total fan!", "text": "Totally Spies So Totally rock! I just love them!"}, {"name": "i ate a sushi kabob", "text": "i love watching Totaally spies, they are so cool! i also luv 'fsters home for imaignary freinds'"}, {"name": "Abeehagirl", "text": "Ben 10 is the best! I hope the new show will be good."}, {"name": "2191998", "text": "i love totally spies. when i was littler, i used 2 wake up at 7 o'clock to watch totally spies. it waz like my fav show. now i have others. but i still come on Cartoon Nerwork 2 watch Totally Spies. I love Totally Spies."}, {"name": "Joshua B", "text": "Ben 10: Alien Force WAS AWESOME!!! I CAN'T WAIT TO SEE THE WHOLE SHOW!!!"}, {"name": "davonta", "text": "bakugan is the best show  ever"}, {"name": "chop socky chooks", "text": "Morgan. I just love chop socky chooks[kobura strikes is my fav] make shore you keep thows shows coming!"}, {"name": "ben 10", "text": "I AM Jacob and I like ben10 because he looks like me"}, {"name": "Mrs.Happy", "text": "I love Bakugan it is a real awesome.I wish I had some Bakugan of my own!"}, {"name": "bakugan master", "text": "I love every show on here, but really BAKUGAN!!!! I collect the cards and figures, and when I get them all I,m gonna be the BEST BAKUGAN BATTLE BRAWLER EVER!!!!!"}, {"name": "\"Absolute Boyfriend\"", "text": "Hi  Cartoon Network!! I've been watching CN since i born. now i'm 20 years old. haha. OK Here is a favor i really wanna ask you. I've read one of the Japanese Manga \"Absolute Boyfriend\".  And they putting it to video and video showing on 8th April..  Please can you get it and play it on TV???? Please Please... ^___^    Thank you guys!!! I'm always on your side! Keet it UP"}, {"name": "Bakugan.best show ever ma", "text": "jhan: Bakugan is awsome. I built my own Bakugan,Pran Matis"}, {"name": "Mr. Quiet", "text": "I love The Mr. Men Show! Their actions and emotions are funny and the short music videos are nice. My favorites are Mr. Small & Mr. Nosey, Mr. Grumpy and Ms. Chatterbox!"}, {"name": "DRAGO", "text": "bakugan rocks!!!!!! why just this morning i watched all the episodes thats how obsessed i am!!!! PS:ihave nine of their toys(drago, preyas, juggernoid, 2robotalians, raptornoid, serponoid, fear ripper, and stinglash.) rock on bakugan!!!!!!!!!!!!!"}, {"name": "yoyoyo", "text": "totally spies is so great and funny i abzsolutely LOVE evil salon"}, {"name": "Code Lyoko", "text": "Code Lyoko is the best show in the whole entire show of Cartoon Network.It's hilarious and very interesting when it comes to the story. My favorite character would be Aelita but I like all the main characters. I would really wish I was a part of Code Lyoko. I'd watch this amazing show every day and this is why I LOVE this show."}, {"name": "lorraine", "text": "i think it is going to be a good show when people watch the advetures of flapjack."}, {"name": "123friend", "text": "I love Fosters home for imaginary friends!!!!!!!!!!!"}, {"name": "Totally Spies", "text": "Clover you are my favorite character Totally Spies!"}, {"name": "Lego Indiana Jones", "text": "I Thought Lego Indiana Jones Was The Best!"}, {"name": "Swampfire (formerly munch", "text": "Ben 10 Alien force rocks! keep up the good work!"}, {"name": "chuchiegrl95", "text": "I cannot believe that they took Billy and Mandy off of the videos!!!! That is my favorite show!!!"}, {"name": "chowder", "text": "chowder is a funny show because they make crazy foods like the froggey apple crumble thumbkin since they do lots of steps its great!!!!!"}, {"name": "i luz bakugan", "text": "i think pyrus bakugan are really cool"}, {"name": "Nene", "text": "This is so awesome Cartoon Network Rocks! I get to watch my old favortie cartoons online. I absolutly love it. Thanks Cartoon Network."}, {"name": "iliuvcartoons", "text": "I love the Powerpuff Girls and Totally Spies. The fashions are awesome and cute. They are so funny!"}, {"name": "clellster", "text": "bakugan is super awsome!!!!!!!!!"}, {"name": "oric and umi", "text": "Code lyko is the best!!!! i love it because it's got all this cool idea of a super computer, and frienship problem solviing!!!! can't wait for more!"}, {"name": "Chopsockychooksisbest", "text": "I love Chop socky chooks Chop socky whoop episote."}, {"name": "Cartoonnetworkrules", "text": "I have a tip for Cartoon network they should make lots of chop socky chooks Videos i love chop socky chooks"}, {"name": "ben 10", "text": "hi ben 10 my name is rocco, and i am 5 years old.   i love you so so so so much can you do a new show!!"}, {"name": "Flapjack", "text": "Flapjack is funny and you learn a good lesson after."}, {"name": "fosters", "text": "how could you remove the shorties? i love them but i love the goo music video!"}, {"name": "lunch table", "text": "i just love the out of jimmy's episode the lunch table"}, {"name": "Forrest", "text": "Ben 10,Ben 10 alien force,Ed Edd N' Eddy, and Chowder are my favorite shows.I like watching them all the time.Evan my cousin,Alex, loves the show Chowder and my cousin is almost 13 this year."}, {"name": "Lily", "text": "I love that you guys put your cartoons on your web site because right now my t.v. is broken!"}, {"name": "teensara", "text": "Chowder is awesome! I love the episode \"Schnitzel Quits\"."}, {"name": "Bombaycat", "text": "OMG i love total drama island i like chris, trent, gwen, AND THE BEST DUNCAN!!!!! duncan needz to win duncan rockz"}, {"name": "Starfire", "text": "I'm starting to like Totally Spies!!!!!"}, {"name": "Total Drama Island", "text": "I love Total Drama Island my favorite characters are Lindsay and Courtney!"}, {"name": "total drama island", "text": "this website is so awesome and and the videos are sooooooo super duper sweeeeeeeeeeeeeet"}, {"name": "chowder and flapjack", "text": "omg i think chowder is the best now i like watching cartoon network now because of chowder and also flapjack is awesome i think they are both awesome yeah!!!!!!! but i really love chowder whoo!!!!! chowder and flapjack are so awesome"}, {"name": "Bakugan fan", "text": "I think bakugan is an awsome show. You should put on more episodes."}, {"name": "chowder man", "text": "my favorite show of all timeis definetly Flapjack and my favodrite episode is 'thats a wrap woudyou put it on cn video for maybe a day? please please"}, {"name": "lisa1234565", "text": "i love flapjack it the best show ever"}, {"name": "Total Drama Island", "text": "That show is the best in the world. Good thinking!... a cartoon reallity show. The drawings are sooooooooooooooooo good."}, {"name": "Kyra", "text": "I love Ben10 AlienForce. The show totally rocks. You should put more episodes on the  video site.:"}, {"name": "tottt", "text": "i like total drama island beacause it is funny"}, {"name": "w@b!z0n", "text": "i luv total drama island its one os my fav shows!!!!!!!!!!!!!! Post more videos on here!!! please?????"}, {"name": "Flapjack001", "text": "FLAPJACK IS AWSOME!!!! :) I hope new episodes are coming soon! :)"}, {"name": "Flappy-jack chick", "text": "awwwwww! I think Flapjack is just about the cutest thing ever! knuckles is so mean to poor flapjack! it's so cool how Bubbie acts like flapjacks mom! I LOVE YOU FLAPPYJACK!!!"}, {"name": "SanyaK", "text": "Ohayo gozaimasu everyone -^_^- oh yea that means Good morning in Japan I luv Code lyoko and Bumble Bee on Transfromer's Animated is real Cute, If only cartoonnetwork shows Pucca, DANG it would be paradise: PUCCA luv's Garu he's a pretty Boy Ninjas with Noodles Kissy-ChaseKissy-Face wham bam bam Oops! srry that was Pucca's Theme song he-he"}, {"name": "flapjack", "text": "i love the show flapjack  its so funny i love flapjacks voice its so cute its the best show everrrr and the funniest"}, {"name": "total drama island", "text": "total drama island #1 fan: i like total  drama island because cody peed in hes pants!"}, {"name": "kelly keepin it real!", "text": "o m g!i just luv Cowder. it is soooooo funney my whole familey luvz it.so keep on making new episods."}, {"name": "Donny P", "text": "It's great that you've put Total Drama Island on cartoonnetworkvideo. Now I can watch that show whenever I want."}, {"name": "chowder and flapjack", "text": "Chowder and Flapjack # 1 fan; I liked the two shows because they are so funny and they are so cool and my favorite show of Chowder is \"The broken Part' because i love pizzas and my favorite show of Flapjack is 'Thats a wrap' because i love candy ann chowder and flapjack are cute and cool."}, {"name": "FLAPJACK FAN", "text": "flapjack is so funny Thurop Van Oman is the best!!!!!!!!!! :) :) :) :) :) :) :) :) :)"}, {"name": "CN guy", "text": "i love flap jack...........ITS SOOOOOOOO FUNNY!!!!!"}, {"name": "dramatic 5", "text": "Ben 10 alien force x = ben +2.i just watched it today. iloved this episode"}, {"name": "SaintSaturn", "text": "Long live The Aquabats!"}, {"name": "selena", "text": "total drama is so funny because one of the clips harold saw heathers boobs like i was laghing like dead!!!"}, {"name": "xSprinklexx", "text": "I think Heather or that freaky boy is going to win."}, {"name": "ShadowMark", "text": "Bring back master control. I tire of waiting !!!!!!!!!!!!!!"}, {"name": "grahm phillips", "text": "i love ben 10  alien force i saw ben 10 race against time yesterday"}, {"name": "Camflapjack", "text": "Our whole family loves Flapjack!  When will there be merchandise?  My mom wants a Bubby t-shirt and I would love some bendable figures or stuffed animals. Flapjack rules!!!!"}, {"name": "Zeak", "text": "I miss Ed Edd n Eddy"}, {"name": "LarzMarz", "text": "i cant believe Harold liked Lashawna and saw .......ummm.......u know what"}, {"name": "AnimeGirl", "text": "Care Bears on Fire ROCK!!!!!!!!!!!!!!!! Go Cartoonnetwork and Fried Dynomite"}, {"name": "tdi lover", "text": "its not fair that cournty went to the dock of shame"}, {"name": "tdi", "text": "harold and lashanna should get married"}, {"name": "tdi rocks", "text": "i kind of like flap jack but he also kind of scares me with his freaky laugh. and on this episode with the 38 year old guy that's really freaky!!!!"}, {"name": "cartoonman", "text": "alienx was awesome"}, {"name": "ODD", "text": "HOW DID KEVIN GET THAT SPUERPOWER"}, {"name": "NYC TDI fan", "text": "OMG TDI is soooooo cool! i like watching the courtney dock of shame thing... i watched it like 20 times already!!!! PLEASE DON'T ERASE IT!!!!! go TDI!!!!!!!!!!!!!!"}, {"name": "Dock of shame - Courtney", "text": "I think that dock of shame - Courtney is awsome you people make cool video`s well good bey know I have to go P.S realy cool video`s you people make!!!!!!!!!"}, {"name": "Fay", "text": "Dan and Runo are cute together!"}, {"name": "TDI Lover", "text": "I love Ben 10 Alien Force it's so  cool!!!"}, {"name": "anna", "text": "you don't have totally spies anymore. i want to watch it."}, {"name": "n", "text": "what happened to totally spys we love to watch it after school"}, {"name": "hunter432", "text": "i cant belive dan jumped in the doom dimension"}, {"name": "skunk fu fan", "text": "keep it up with the skunk fu episodes... it is the most artistic show i have ever seen"}, {"name": "bears", "text": "the bear who eats marshmallows rocks"}, {"name": "Cryptidprof", "text": "The Secret Saturdays I believe has a possiblty to really hit it big because its blends the fact of \"seeing is believing\" with adventure beyond your wildest dreams so I gotta say kudos to the creator you rock man!"}, {"name": "jordan.", "text": "benten alien force and bn. i am the bigist fan in the world. i like everything in the show. but my favorite is the new and old aliens."}, {"name": "Bakugan", "text": "cartoonetwork you guys are awesome  if you guys never made bakugan i would of been bored my whole life. so tanks guys remember you guys are so awesome"}, {"name": "im not your boyfriend", "text": "im not your boy friendddddddddddddddddddddddddddddddddddddddddd that was funny"}];

  const shows = [
    {
      id: 'cnvideo',
      label: 'CN VIDEO',
      color: '#444444',
      odd: '#e8e8e8',
      even: '#ffffff',
      gradient: true,
      comments: cnVideoComments
    },
    {
      id: 'ben10af',
      label: 'BEN 10: ALIEN FORCE',
      color: '#8ea745',
      odd: '#b2d156',
      even: '#c0e15c',
      comments: [
        { name: 'mustafa10', text: 'I love ben ten and ben ten alien force. Your games are cool, total awesome.' },
        { name: 'Ben10 Fan', text: 'I like how they made Kevin a good guy, he plays that role pretty good.' },
        { name: 'Richard', text: 'Please get an alien that has 100000 eyes and 100000 tentacles and can fly.' },
        { name: 'swampfire', text: 'Can there be a new tv show called ben10: fusion force. Ben you rock and Gwen.' },
        { name: 'Justin', text: 'Dear ben ten your awesome. More ben10 alien force please!!!!!!!!!!!!!!!!' },
        { name: 'NABHAN', text: 'THIS SHOW IS THE BEST, WHEN I FIRST SAW IT I STARTED LIKING IT. LET ME TELL YOU BEN I WAS LIKE YOU WHEN I WAS 10.' },
        { name: 'Halinmonk', text: 'The show is cool but i miss Gwens magic Powers.' },
        { name: 'marty king of ben10', text: 'i wish i can be ben10 for the rest of my life and have 4 of his new and old aliens.' },
        { name: 'jon', text: 'i like major chill. he is so cool. he can fly, and he can shoot ice beams.' },
        { name: 'aubz', text: 'my fav character is big chill!! because he is awesome and has ice abilities and flies, just the kinda style i wish i had!! :D' },
        { name: 't-man', text: 'I like Alien X he is awesome but i wouldn\'t want to have to deal with those guys all the time, they could get annoying!' },
        { name: 'CoolBoy', text: 'I WANT A WATCH LIKE BEN.' },
        { name: 'ben10fan', text: 'ben 10 alien force is the best show on cartoon network!' },
        { name: 'gwen fan', text: 'I think Gwen is so cool with her powers. Kevin is pretty cool too.' },
        { name: 'heatblast4ever', text: 'I wish ben had heatblast in alien force. he should bring back the original aliens!' },
        { name: 'Kevin11fan', text: 'Kevin went from villain to hero and it is awesome. Best character development ever.' },
        { name: 'omnitrix', text: 'the omnitrix is so cool, I want one for my birthday.' },
        { name: 'bigchill', text: 'Big Chill is my favorite alien. Ice powers and flight? Yes please!' },
        { name: 'Skyler', text: 'ben 10 alien force is better than the original. the aliens are cooler.' },
        { name: 'AlienX', text: 'Alien X can do anything but you need two people to agree. I think that\'s funny.' }
      ]
    },
    {
      id: 'chowder',
      label: 'CHOWDER',
      color: '#948eab',
      odd: '#b9b1d6',
      even: '#cac0f0',
      comments: [
        { name: 'Emily', text: 'I think this show is sooooooooooo AWESOME! CHOWDER IS SO FUNNY! Ice cream is not so good for you.' },
        { name: 'cherry 18c', text: 'chowder your show is so cute you should marry Panini you guys will be a cute couple chowder you are so cute.' },
        { name: 'CheezeBall', text: 'I love the food in chowder it all looks so yummy and funny.' },
        { name: 'Mung fan', text: 'Mung Daal is the best chef character in all of cartoons!' },
        { name: 'bubbles333', text: 'Chowder is so funny! I love when he eats everything in sight.' },
        { name: 'Panini4ever', text: 'Panini is my favorite. She loves Chowder so much and she is so funny.' },
        { name: 'schnitzel', text: 'RADDA RADDA RADDA. Schnitzel is hilarious that all he says is radda.' },
        { name: 'TrufflesRox', text: 'Truffles is the best! She keeps everyone in line.' },
        { name: 'FoodieKid', text: 'The food in this show looks amazing. I want to eat everything they make.' },
        { name: 'chowder#1fan', text: 'I watch this show every single day after school. Best show ever on CN!' },
        { name: 'marzipan', text: 'I love how the characters are named after food. So creative!' },
        { name: 'kitty', text: 'Chowder is sooooo cute! His little hat and his big purple polka dot outfit.' },
        { name: 'cookingkid', text: 'This show makes me want to be a chef when I grow up just like Mung.' },
        { name: 'grape', text: 'My favorite episode is when they make the giant birthday cake. So funny!' },
        { name: 'purplefan', text: 'The purple color everywhere is so cool and unique for a cartoon.' },
        { name: 'GazelleGuy', text: 'Gazpacho is so funny! He is always dramatic about everything.' },
        { name: 'dumpling', text: 'best cartoon ever! Chowder reminds me of myself because i love eating too.' },
        { name: 'nightshadow', text: 'I love the new episodes. They get funnier every week!' },
        { name: 'cartoon king', text: 'Chowder is the funniest thing on TV right now. Never stop making it.' },
        { name: 'mung daal', text: 'This show is amazing and the jokes are so clever for kids and adults.' }
      ]
    },
    {
      id: 'tdi',
      label: 'TOTAL DRAMA ISLAND',
      color: '#648a97',
      odd: '#7dacbd',
      even: '#8bbfcc',
      comments: [
        { name: 'Heather', text: 'I love your show so much I watch it everyday. Gwen I like your attitude, you are awesome.' },
        { name: 'mcluvin', text: 'total drama island is awesome great job with the show.' },
        { name: 'coincidence', text: 'you know i think that you should have Courtney back on it was not her fault that she got voted off.' },
        { name: 'mioku', text: 'i really like the show! my friend and i always talk about it during school.' },
        { name: 'zack442', text: 'i think trent should win hes cool and caring.' },
        { name: 'Owen#1fan', text: 'Owen is the best character! He is so funny and he always makes everyone laugh.' },
        { name: 'GwenFan', text: 'Gwen is so cool and unique. I love her style and how she stands up for herself.' },
        { name: 'DuncanRocks', text: 'Duncan is my fav because he is tough but he has a soft side too.' },
        { name: 'TDI4life', text: 'This show is better than any reality show on regular TV. Best cartoon ever!' },
        { name: 'lindsay lover', text: 'I like Lindsay because she is funny without trying to be.' },
        { name: 'bridgette', text: 'Bridgette and Geoff are the cutest couple on the show by far.' },
        { name: 'Izzy fan', text: 'IZZY IS CRAZY AND AWESOME! She is so random and unpredictable.' },
        { name: 'trentfan', text: 'Trent should not have been voted off so early. He was one of the best.' },
        { name: 'HaroldGeek', text: 'Harold is underrated. His mad skills are actually pretty useful.' },
        { name: 'courtneyftw', text: 'Bring Courtney back! She is so competitive and entertaining to watch.' },
        { name: 'leshawna', text: 'Leshawna tells it like it is and I respect that so much.' },
        { name: 'cody', text: 'Cody is so cute and funny even when he gets hurt all the time.' },
        { name: 'sadie&katie', text: 'Sadie and Katie are hilarious together! Best friendship on the show.' },
        { name: 'noah', text: 'Noah is so sarcastic and funny. He needs more screen time for sure.' },
        { name: 'totaldramamaster', text: 'This show is amazing. Please make more seasons, this is my favorite show on CN!' },
        { name: 'chefhatchet', text: 'Chef Hatchet and Chris McLean are the best villain hosts. Love the drama!' },
        { name: 'season2hype', text: 'I can\'t wait for the next season! I hope all my favorites come back.' },
        { name: 'survivor fan', text: 'This is way better than the real Survivor on TV. Keep making more episodes.' },
        { name: 'heatherhater', text: 'Heather is SO mean but also SO entertaining. Great character.' },
        { name: 'campwawanakwa', text: 'I would love to go to Camp Wawanakwa even with all the crazy challenges.' },
        { name: 'TDIwatcher', text: 'My whole family watches this show together. It\'s that good.' },
        { name: 'eliminatedtoo', text: 'DJ should have stayed longer. He was sweet and strong.' },
        { name: 'confessional', text: 'The confessional cam scenes are my favorite part of every episode.' },
        { name: 'spikeyblonde', text: 'Geoff is such a great guy. He deserves to win.' },
        { name: 'finale fan', text: 'That finale was incredible! I was on the edge of my seat the whole time.' }
      ]
    },
    {
      id: 'secretsaturdays',
      label: 'THE SECRET SATURDAYS',
      color: '#ebc129',
      odd: '#eb9b29',
      even: '#ebc129',
      comments: [
        { name: 's.sfan', text: 'you know you should put the secret saturdays back on friday at 9pm.' },
        { name: 'ssatfan', text: 'i loved fisk from the start i always knew there was something special about him. love your show.' },
        { name: 'fan', text: 'what would happen if zak lost control of his cryptid powers?' },
        { name: 'kiann', text: 'Zak fan he is awesome!!!!!!!!!' },
        { name: 'fisk/doyle', text: 'Fisk is a really cool character.' },
        { name: 'zacfan', text: 'i like zack the most in the whole show.' },
        { name: 'willie', text: 'what does kur look like?' },
        { name: 'cryptid hunter', text: 'The cryptids in this show are so creative. I look them up after every episode.' },
        { name: 'DrDrawn', text: 'Doc Saturday is the coolest dad ever! He has the best gadgets.' },
        { name: 'DrewFan', text: 'Drew Saturday is the most awesome cartoon mom. She fights with a claw hand!' },
        { name: 'Komodo', text: 'Komodo is so cool and scary at the same time. Best family pet ever.' },
        { name: 'secretsaturdaysfan', text: 'This show needs to stay on longer! It is one of the best shows on Cartoon Network.' },
        { name: 'doyle fan', text: 'Uncle Doyle is the coolest uncle in cartoons. He is so funny and tough.' },
        { name: 'Van Rook', text: 'Even the villains are cool in this show. Van Rook is so interesting.' },
        { name: 'Argost', text: 'V.V. Argost is one of the best cartoon villains I have ever seen.' },
        { name: 'cryptid lover', text: 'I love learning about real cryptids after watching each episode.' },
        { name: 'saturdays4ever', text: 'The family sticks together no matter what. That is what makes this show great.' },
        { name: 'zakpower', text: 'Zak\'s powers are so unique. Controlling cryptids is the coolest superpower.' },
        { name: 'new episodes pls', text: 'Please make more episodes! This is the best show on all of Cartoon Network.' },
        { name: 'timefire', text: 'The action in this show is incredible. Every episode has great adventures.' }
      ]
    }
  ];

  const commentsHTML = `<!DOCTYPE html>
<html>
<head>
<title>Cartoon Network Comments</title>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; outline: none; }
body {
  font-family: Arial, Helvetica, sans-serif;
  background: #2a2a2a;
  width: 520px;
  height: 480px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

#tab-bar {
  display: flex;
  background: #1a1a1a;
  border-bottom: 3px solid #000;
  flex-shrink: 0;
}
.show-tab {
  flex: 1;
  padding: 6px 4px;
  font: bold 8px Arial, sans-serif;
  text-transform: uppercase;
  color: #aaa;
  background: #1a1a1a;
  outline: none;
  border: none;
  border-right: 1px solid #333;
  cursor: pointer;
  text-align: center;
  line-height: 1.2;
  transition: background 0.15s, color 0.15s;
}
.show-tab:last-child { border-right: none; }
.show-tab:hover { background: #2e2e2e; color: #fff; }
.show-tab.active { color: #fff; }

#show-header {
  padding: 7px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  border-bottom: 2px solid rgba(0,0,0,0.3);
}
#show-title {
  font: bold 11px Arial, sans-serif;
  color: #fff;
  text-shadow: 0 1px 2px rgba(0,0,0,0.6);
  letter-spacing: 0.5px;
}
#comment-count {
  font: 10px Arial, sans-serif;
  color: rgba(255,255,255,0.75);
}

#comment-list {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
}
#comment-list::-webkit-scrollbar { width: 8px; }
#comment-list::-webkit-scrollbar-track { background: rgba(0,0,0,0.2); }
#comment-list::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.25); border-radius: 4px; }
#comment-list::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.4); }

.comment-entry {
  padding: 7px 10px;
  font: 11px Arial, Helvetica, sans-serif;
  color: #111;
  border-bottom: 1px solid rgba(0,0,0,0.1);
  line-height: 1.4;
}
.comment-name {
  font-weight: bold;
  margin-right: 4px;
}

#comment-form {
  border-top: 2px solid rgba(0,0,0,0.3);
  padding: 7px 10px;
  background: rgba(0,0,0,0.2);
  flex-shrink: 0;
}
#form-row {
  display: flex;
  gap: 6px;
  align-items: flex-end;
}
#form-left { flex: 1; display: flex; flex-direction: column; gap: 4px; }
#name-input, #comment-input {
  width: 100%;
  background: rgba(255,255,255,0.92);
  border: 1px solid rgba(0,0,0,0.3);
  border-radius: 3px;
  font: 11px Arial, sans-serif;
  color: #222;
  padding: 4px 6px;
  outline: none;
}
#name-input { height: 22px; }
#comment-input {
  height: 40px;
  resize: none;
}
#name-input:focus, #comment-input:focus {
  border-color: rgba(255,255,255,0.5);
  background: #fff;
}
#name-input::placeholder, #comment-input::placeholder {
  color: #999;
}
#submit-btn {
  height: 66px;
  width: 68px;
  border: none;
  outline: none;
  border-radius: 4px;
  font: bold 11px Arial, sans-serif;
  color: #fff;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  text-shadow: 0 1px 2px rgba(0,0,0,0.4);
  flex-shrink: 0;
  transition: opacity 0.15s;
}
#submit-btn:hover { opacity: 0.85; }
#submit-btn:active { opacity: 0.7; }
</style>
</head>
<body>

<div id="tab-bar"></div>
<div id="show-header">
  <span id="show-title">SHOW COMMENTS</span>
  <span id="comment-count"></span>
</div>
<div id="comment-list"></div>
<div id="comment-form">
  <div id="form-row">
    <div id="form-left">
      <input id="name-input" type="text" placeholder="Your name..." maxlength="30">
      <textarea id="comment-input" placeholder="Leave a comment..." maxlength="200"></textarea>
    </div>
    <button id="submit-btn">SEND</button>
  </div>
</div>

<script>
const SHOWS = ${JSON.stringify(shows)};
let activeIdx = 0;

function buildTabs() {
  const bar = document.getElementById('tab-bar');
  SHOWS.forEach((s, i) => {
    const btn = document.createElement('button');
    btn.className = 'show-tab' + (i === 0 ? ' active' : '');
    const label = s.label.replace('THE SECRET SATURDAYS','SECRET SATS').replace('BEN 10: ALIEN FORCE','BEN 10 AF').replace('TOTAL DRAMA ISLAND','TOTAL DRAMA');
    btn.textContent = label;
    if (s.gradient) {
      btn.style.background = 'linear-gradient(135deg, #111 0%, #555 100%)';
      btn.style.color = '#ccc';
    }
    btn.onmouseenter = function() {
      if (s.gradient) { this.style.background = 'linear-gradient(135deg, #222 0%, #777 100%)'; this.style.color = '#fff'; }
    };
    btn.onmouseleave = function() {
      if (s.gradient && !this.classList.contains('active')) { this.style.background = 'linear-gradient(135deg, #111 0%, #555 100%)'; this.style.color = '#ccc'; }
      else if (s.gradient && this.classList.contains('active')) { this.style.background = 'linear-gradient(135deg, #222 0%, #777 100%)'; this.style.color = '#fff'; }
    };
    btn.onclick = () => switchShow(i);
    bar.appendChild(btn);
  });
}

function switchShow(idx) {
  activeIdx = idx;
  const s = SHOWS[idx];

  document.querySelectorAll('.show-tab').forEach((t, i) => {
    t.classList.toggle('active', i === idx);
  });

  if (s.gradient) {
    document.getElementById('show-header').style.background = 'linear-gradient(135deg, #1a1a1a 0%, #555 50%, #ccc 100%)';
    document.getElementById('submit-btn').style.background  = 'linear-gradient(135deg, #333 0%, #888 100%)';
    document.getElementById('tab-bar').style.borderBottomColor = '#888';
  } else {
    document.getElementById('show-header').style.background = s.color;
    document.getElementById('submit-btn').style.background  = s.color;
    document.getElementById('tab-bar').style.borderBottomColor = s.color;
  }

  document.querySelectorAll('.show-tab').forEach((t, i) => {
    t.style.borderBottom = i === idx ? ('3px solid ' + (s.gradient ? '#aaa' : s.color)) : '3px solid transparent';
  });

  document.getElementById('show-title').textContent = s.label;
  document.getElementById('show-title').style.color = s.gradient ? '#fff' : '#fff';
  document.getElementById('show-header').style.borderBottomColor = s.gradient ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.3)';
  document.getElementById('comment-count').textContent = s.comments.length + ' comments';

  const list = document.getElementById('comment-list');
  list.innerHTML = '';
  s.comments.forEach((c, i) => {
    const div = document.createElement('div');
    div.className = 'comment-entry';
    if (s.gradient) {
      div.style.background = i % 2 === 0
        ? 'linear-gradient(135deg, #d8d8d8 0%, #f0f0f0 100%)'
        : 'linear-gradient(135deg, #ebebeb 0%, #ffffff 100%)';
      div.style.borderBottom = '1px solid rgba(0,0,0,0.08)';
    } else {
      div.style.background = i % 2 === 0 ? s.odd : s.even;
    }
    div.innerHTML = '<span class="comment-name">' + escHtml(c.name) + ':</span>' + escHtml(c.text);
    list.appendChild(div);
  });
  list.scrollTop = 0;
}

function escHtml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

document.getElementById('submit-btn').onclick = function() {
  const name = document.getElementById('name-input').value.trim();
  const text = document.getElementById('comment-input').value.trim();
  if (!name || !text) return;
  const s = SHOWS[activeIdx];
  s.comments.unshift({ name, text });
  document.getElementById('comment-input').value = '';
  switchShow(activeIdx);
};

buildTabs();
switchShow(0);
<\/script>
</body>
</html>`;

  const blob = new Blob([commentsHTML], { type: 'text/html' });
  const url  = URL.createObjectURL(blob);
  const w = window.open(url, 'commentsWindow',
    'width=520,height=510,resizable=no,toolbar=no,menubar=no,scrollbars=no,location=no,status=no');
  if (!w) { return; }
  w.addEventListener('beforeunload', () => URL.revokeObjectURL(url));
}

function openHelpPopup() {
  const helpHTML = `<!DOCTYPE html>
<html>
<head><title>Help</title>
<style>* { margin:0; padding:0; } body { background:#000; overflow:hidden; } img { width:640px; height:480px; display:block; object-fit:fill; }</style>
</head>
<body>
<img src="data:image/png;base64,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" alt="Help">
</body>
</html>`;
  const blob = new Blob([helpHTML], { type: 'text/html' });
  const url  = URL.createObjectURL(blob);
  const w = window.open(url, 'helpWindow',
    'width=640,height=502,resizable=no,toolbar=no,menubar=no,scrollbars=no,location=no,status=no');
  if (!w) { return; }
  w.addEventListener('beforeunload', () => URL.revokeObjectURL(url));
}

document.getElementById('pag-shows').style.display  = 'flex';
document.getElementById('pag-extras').style.display = 'flex';
document.getElementById('pag-shows').classList.add('no-controls');
document.getElementById('pag-extras').classList.add('no-controls');
document.getElementById('banner-shows').style.display    = 'none';
document.getElementById('banner-extras').style.display   = 'none';
document.getElementById('banner-whats-new').style.display = 'none';
document.getElementById('count-shows').style.display  = 'none';
document.getElementById('count-extras').style.display = 'none';
(async function initApp() {
  await loadEpisodesFromXML(XML_EPISODE_FEEDS);

  showsData.slice().forEach(s => {
    if (EXTRAS_IN_SHOWS.has(s.name.toUpperCase())) {
      const alreadyInExtras = extrasData.some(e => e.id === s.id);
      if (!alreadyInExtras) extrasData.push(s);
      const idx = showsData.indexOf(s);
      if (idx !== -1) showsData.splice(idx, 1);
    }
  });

  resolveFavorites();

  refreshTab('whats-new');
  document.getElementById('deleteAllBtn').disabled = true;
  setControlsEnabled(false);
  updatePanelFit();

  const _urlParams = new URLSearchParams(window.location.search);

  const _appType = _urlParams.get('applicationType');

  const _section = _urlParams.get('section');
  if (_section === 'featured') {
    const _tabEl = document.querySelector('.nav-tab[onclick*="whats-new"]');
    if (_tabEl) switchTab(_tabEl, 'whats-new');
  } else if (_section === 'shows') {
    const _tabEl = document.querySelector('.nav-tab[onclick*="shows"]');
    if (_tabEl) switchTab(_tabEl, 'shows');
  } else if (_section === 'categories') {
    const _tabEl = document.querySelector('.nav-tab[onclick*="extras"]');
    if (_tabEl) switchTab(_tabEl, 'extras');
  } else if (_section === 'favorites') {
    const _tabEl = document.querySelector('.nav-tab[onclick*="favorites"]');
    if (_tabEl) switchTab(_tabEl, 'favorites');
  } else if (_section === 'search') {
    const _tabEl = document.querySelector('.nav-tab[onclick*="search"]');
    if (_tabEl) switchTab(_tabEl, 'search');
  }

  const _showId = _urlParams.get('showID') || _urlParams.get('categoryID');
  if (_showId) {
    const _allShows = [...getVisibleShows(), ...extrasData];
    const _show = _allShows.find(s => s.id === _showId);
    if (_show) {
      const _tabKey = extrasData.includes(_show) ? 'extras' : 'shows';

      const _tabEl = document.querySelector(`.nav-tab[onclick*="${_tabKey}"]`);
      if (_tabEl) switchTab(_tabEl, _tabKey);
      drillInto(_tabKey, _showId);
    }
  }

  const _requestedId = _urlParams.get('episodeID');
  if (_requestedId) {
    const _requestedEp = getEpById(_requestedId);
    if (_requestedEp) {
      let _allowed = false;
      if (!_section) {

        _allowed = true;
      } else if (_section === 'featured' || _section === 'whats-new') {

        _allowed = whatsNewEps.some(e => e.id === _requestedId);
      } else if (_section === 'shows') {

        const _showEps = _showId
          ? getVisibleShows().find(s => s.id === _showId)?.episodes || []
          : getVisibleShows().flatMap(s => s.episodes);
        _allowed = _showEps.some(e => e.id === _requestedId);
      } else if (_section === 'categories') {

        const _catEps = _showId
          ? extrasData.find(s => s.id === _showId)?.episodes || []
          : extrasData.flatMap(s => s.episodes);
        _allowed = _catEps.some(e => e.id === _requestedId);
      } else if (_section === 'favorites') {

        _allowed = favorites.some(f => f.id === _requestedId);
      } else if (_section === 'search') {

        _allowed = searchResults.some(e => e.id === _requestedId);
      }
      if (_allowed) selectEp(_requestedEp);
    }
  } else if (whatsNewEps.length > 0) {
    selectEp(whatsNewEps[0]);
  }
})();

(function initScrollShapes() {

  const TRACK     = "data:image/png;base64,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";
  const UP_N      = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAdCAYAAACuc5z4AAACwUlEQVR4nK2Wv09TURTHP7ctEdAXCZhHIx06ODyf1GCemjSWiv+BfwCDgw7EMDjpYu67MyxuJk5OLg4mOjI0YKLRNg5iJZGhJIY0JgwYDRhqjwO3pC2vPxC+2/2eez73vHvPe+8qOkhrnVZKzQI3gCkgCewCa0BRRJ4bY952ylftRhiG54AFYBZIdEq0KorIvDHmfVew1npGKfXCVtevasCiiDw2xtQa5kFFFvoaOHMEaIPxSCk1CDxoqdg+/icgdURoi0RkzhjzFCBmvYXjQgGUUgta6yRATGudZv+gTkJnlFL3AWK2pbqefhAEhampqUKf8FmtdSIB3OwFDYJgBiAej38qlUpXeoDTQDoGTPYDteMrvu9/7FWyUmoyRoeebYc2lMvlrgVB0BUuIiOxqEAul1uOgjYtes3zvA/d4IfA+Xx+xff9fLckO+96JpN51xc4n8+veJ433Qtar9cByGazWc/zIuEHbeb7/vLg4OCpYrH4dXt7+6LrumQymUjw0tISm5ubtdHR0YTjONmBgYHlvb29lqc8AJfL5Xy5XF4GfgKFdDo9BkSSU6kUlUqlVK1WvWq1ugHEgd/A6UNgq4NVXdf9HlkuMD4+DvAHOAtcjpoT2RWO43x3HKfjt2NsbIzh4eHzneIN8G67mUwmN7olAUxMTFwAfnQI12LAarvruu7fXmC7Hd86hNcTFny12d3a2lKlUukLcAkgHo8zNDTUkrmzswMQVUANWE2IyHOl1J3myNra2jSwIiKFhqeUgrbDFpG69Zv10hjzq/EH+UyXj9FRJCK3jDGFmB3MnwSU/WoLYNvNDhaPCV0F5hqDlg0Kw/AZcPc/oBW7BZWG0fKChGF4T0QM+yfbr96ISLYZChE3IbuABzwEbgMjEVNqwFvgSRiGr6IYkeBmaa1T7N/dzimldkVkHVg1xhx6Y5v1D3oi4ovc0DytAAAAAElFTkSuQmCC";
  const UP_H      = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAdCAYAAACuc5z4AAACKUlEQVR4nK2Vv2tTURTHPwnBLF0KEZ4gNEMHwcVBqJIECvYPyJIhkKFDhjd27GDhlQ4ODmZ7Q4RSHCo4aOnQoUKaRLS2YIiNOLQQSgUblwoVjLyU4/Dy4muS+37YfuHA4977Pvfcc869BxQSSAo8FtgS+C4gAr8FGgJlgbTqXxUwIbAqYPVhXrYv8CAIdNblXVCzBJ4IxLyg5yGhbnumOv7JFaCO6cPg1WuASv/Emjv7QRIV1FYAokABVeAdGcYOi4s7vtm3VRCIIbDt6YFhVKSvumF8Cuj1NJ7l5YI62tT1vQDgLGGgjvYNww8+Px5smlUV1NFGsfgxHLhcrvlBHX1YWHgfDBwQalnW4Hu7WBwHn48OikTXayQSN94sLX3N5/OUSiVlPeVyOW5OTvYymQxr3e7DtYmJ2sgi904mVLOwuwKV4/X1zyqPTdOU17B7Bj/r0HwB787hl3/yQKTdPlGBG42G6FANXxXJpBLq6JGmHXqBo0B3JD7p9LHfvb01Nzd9Cj8U070o0BoZnpm58AOnUinewqFi+ijWB9+/NNxsRraWl7/swV2AeDyOpmmXlnQ6HZpwURjjLdCKCMwCleHZ51D/BgPP/wCnQ6/gFPQM+3+3XkYgD4DAQcg318v+bSR2v7sO6KuRwAg8vSL0QCAxGnIbXv5PaFsgORbqghsSrgduitNA/SRwR+zOfaaAWQIVgayKEQmwyW3gHnb8usAR0IqMu7Eu/QWGKdQKQjJREQAAAABJRU5ErkJggg==";
  const DN_N      = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAdCAYAAACuc5z4AAADA0lEQVR4nK2WMW/bVhRGz6OFQpXTKjDUwGjjQIDRWkMGD4GBpkNS2D+gP8BjOwRFhk7tUpBvdpZuLTpl6pKhcOvBpA1kEIoMErJoaAGhlkVYtV0wg1UTRMzn20GkIMkUqyT9JvJ79x7eS95HUjFFtm1XlVKbwCfAKrAIRMDvQENEHmut69Py1aThOE4F2AI2gcK0xEQNEXmotX6WC7Zt+75S6qekulkVA49E5FutdZyaw4oS6C/AtVeApoxvlFJF4KuxipP2nwM3XxE6JhF5oLX+HsBKvK03hQIopbZs214EsGzbrjJ4UP+HrimlvgQoJCM1vNfLy8u/ra+v3x2NDsPw1BjzctSr1+vHvu/fyYBv2ratC8C9Uffo6KgmIkYpNZd6pVLpxmR2EAQW0AAm4VWgagG3R90oihb6/X5varPA+fk5YRi+D9zKWldK3bbImNler9fJA/d6PYC/gCudAIjIdStr4eDg4O088OnpKcCfeTGZ4JOTkw/zko6PjwHMEGJZ8WTMcBpWVlbq5XI5Pjs7m+v3+/NhGN4qlUqVyYTLy0uWlpao1WqFSqXSiuP45f7+fjWKondHecODdrt9Z2Njo7u6uvpRbouWxdraGsDdIAhe7O7unkRR1GEwDQvDuPTAGFP0PO+Dbrf7dx44VRAE7OzsLERRZE1Cx8BJm/Ou677T7XaDGaBEUfQH8N4k9Ao4gRc9zyv6vv8iC+r7Ptvb27nQFBxNmsaYedd15w4PD8cq930f13W5uLhoMHhpZUKB2AJaWSvGmPLe3l4hvecp1BjTYLBb56dAAdpTwSnc87y3ms1mZwJazIHGQMsSkcc5QRhjys1mczGO46czQAGeaK3/sbTWT/OqTlRUSt2fAYqI/ADJVIjIw/9KmFFPkkIH4OTk0RtCW8CD9GTs8+84zo/A568B7YjIp1rrTmqMbRDHcb4QEc3gyc6qX0Xk41EoZPwJJReoAV8DnwHXM0JioA585zjOz1mMTPCobNu+yeDfraKUikSkDbS01ld27Kj+BTn3UPr9aIrDAAAAAElFTkSuQmCC";
  const DN_H      = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAdCAYAAACuc5z4AAACPElEQVR4nK2VPW/TUBSGn6YeLiJCDBbyUKEMoDJ2KKIDQwYGjx1TKUOkLvwIJCIxMDDwAzp0gwF18uCBoRkilJAiD60QqJREDSilJCJSIxlh08OQD5zEdhzClV7Jur738bnnvD4XIoZARuCRgC3QEhABV8AR2BG4H7U3CqgL7Ap4A1icagIbSaDZQHRJ5Qk8FdDioBdzQoN6HnX85gLQoR5Ognf/A1QGJzaC1U9SqKR6ApAC8gQTn8u9mVraap1Tr38Zk2keRHggL6Ah8HoMo+udS8/zZca4axhf7b7dwqK+RZi9/OPj0zhos9kUQFrwLQK8mWKY7MBYLpUacX4vlUqsQMuAGxFLrqdCp/f2rsSBq9UqWfgctyYcXKncjttULpe5B79HE5rmT67564ZCoczqqs/JyTKNxtXLs7ObKcPQJzf4vo9pmuS2tzXW14/o9X6xtZXx2+1rWpA3SrhS7qllfZzlhrEiOk7H1PX3D+Ddd+gEilcgWE1X03pvLes8CdRxHNF1XdbgwwR0Giwgnqa5B7bdXgAaDhYQT6lezbY7YVDbtiWdTsdBR2A37KWrVLdiWe1JqFJKTKhdQC+mX+SR6N9SXKW6w5wHoW5EMAFtzGyZrlLdF8VifQ6oJ5Ae3hyxrdAF9zHsJ4CKwMuglw8TbEiqbBA8M+qEejX1/ws8WxB6KDDVAobwnX+E1gUycY0LgaLMdwdaEtLTo+B3Bjb8EWOpfYHNKMZSgo+sAGv08/cT+AQcLfWfI8cf/xft2AEeecQAAAAASUVORK5CYII=";
  const THUMB_TOP = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAJCAYAAADU6McMAAABGklEQVR4nJXMsUrDQADG8f9d2hqMFFq7BEKGFEnBTAXBwSVS8CG6+AgOPkQ3X8B3cHIT+gDlToKCDgdO3bTY0lIlknMqSGqh/U/f8v0EpbTWPWttH0iADvAOPAsh7qfT6W2apj/lj1iNLMuCPM9vHMc59n1/0mg0olqt5hdF8bVYLMx4PJ4sl8tD4Krb7T6UIbIsC5RSb8aYYVEUud3QbDZ70lp/KKUu1xCl1J0xZrjp/Lf5fP46Go0+B4PBxeovtdY9KWUcRdHZmv5PnufFrVbrMQiCayAAkNbavu/7EyFEZRsEIAzDkziOT9vt9jmABJJms3m0LQAgpfRc131JkiQB9itAp1qtHuyCADiO812v1/eAUAI7A6XcX4dSmCCGCrCPAAAAAElFTkSuQmCC";
  const THUMB_MID = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAKCAYAAABSfLWiAAAAJklEQVR4nGM4e/bsf3LAs2fPDsfGxk5kYGAwYGKgAhg1ZNQQYgAAvyU8kusPMfgAAAAASUVORK5CYII=";
  const THUMB_BOT = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAKCAYAAABSfLWiAAABKUlEQVR4nKWQsUrDYACEP/+pdNBJXMRJSkHQ7Jlcuzp36aYv4eKUzQdwLLr5AgUTMgQqKWlNRQRpofDbgk1LiCalSX4HLahQsHrz3XfH4bqu+ouklHa1Wj0HNAFE/FMC8IHnVYNJkhSm0+kcQCilvDiOn1YBKKVex+Nx2bKsCEiEEOJiMBhsrAIJw/C23W7bYRjOgT4AruteBkFw85tDsyx7aLVaI03TzoAj+PgEIcRxr9fbnkwmJpAuW5Cmacf3/U3DMK48z4sB55vBtu0d0zSb3W63H0WRpZQafZbHs9msKaW0Hcd5qVQqBnAK7C+yaz/K1mu12omu64elUumgWCxu5XmeSinvG42GU6/Xh0EQxMA18LgMslAZ2AN2gQKQA0PgDugAb1/N7x+n7rPx1gofAAAAAElFTkSuQmCC";

  const style = document.createElement('style');
  style.textContent = `
    .scroll-col {
      width: 22px !important;
      background: url("${TRACK}") no-repeat center center / 22px 100% !important;
      border-left: none !important;
    }
    .scroll-track {
      background: none !important;
      border: none !important;
      box-shadow: none !important;
      width: 17px !important;
      top: 29px !important;
      bottom: 29px !important;
      left: 50% !important;
      transform: translateX(-50%) !important;
      overflow: visible !important;
    }
    .scroll-thumb {
      display: flex !important;
      flex-direction: column !important;
      position: absolute !important;
      left: 0 !important; right: 0 !important;
      background: none !important;
      border: none !important;
      box-shadow: none !important;
      border-radius: 0 !important;
      min-height: 31px !important;
      cursor: grab !important;
      overflow: hidden !important;
    }
    .scroll-thumb:active { cursor: grabbing !important; }
    .thumb-top, .thumb-bot {
      flex-shrink: 0 !important;
      background-repeat: no-repeat !important;
      background-size: 17px 100% !important;
      background-position: center !important;
      width: 17px !important;
      align-self: center !important;
    }
    .thumb-top { height: 9px !important; background-image: url("${THUMB_TOP}") !important; }
    .thumb-bot { height: 10px !important; background-image: url("${THUMB_BOT}") !important; }
    .thumb-mid {
      flex: 1 !important;
      min-height: 10px !important;
      background: url("${THUMB_MID}") repeat-y center top / 17px 10px !important;
      width: 17px !important;
      align-self: center !important;
    }
    
    .scroll-img-btn {
      width: 22px !important;
      height: 29px !important;
      background: transparent !important;
      border: none !important;
      box-shadow: none !important;
      padding: 0 !important;
      position: absolute !important;
      left: 0 !important;
      transform: none !important;
      overflow: hidden !important;
    }
    .scroll-img-btn.up   { top: 0 !important; }
    .scroll-img-btn.down { bottom: 0 !important; top: auto !important; }
    .scroll-img-btn .btn-svg-fallback { display: none !important; }
    .scroll-img-btn .btn-img {
      width: 22px !important; height: 29px !important;
      object-fit: fill !important;
      position: absolute !important;
      top: 0 !important; left: 0 !important;
      display: block !important;
    }
    .scroll-img-btn .btn-img { transition: opacity 0.12s ease-in; }
    .scroll-img-btn .btn-img-normal { opacity: 1; }
    .scroll-img-btn .btn-img-hover  { opacity: 0; transition: opacity 0.05s ease-out; }
    .scroll-img-btn:hover .btn-img-normal { opacity: 0; }
    .scroll-img-btn:hover .btn-img-hover  { opacity: 1; transition: opacity 0.12s ease-in; }
    .scroll-img-btn.flash .btn-img-normal { opacity: 0 !important; }
    .scroll-img-btn.flash .btn-img-hover  { opacity: 1 !important; }
    
    .page-img-btn {
      background: transparent !important;
      border: none !important;
      box-shadow: none !important;
      padding: 0 !important;
      width: 15px !important;
      height: 17px !important;
      position: relative !important;
      overflow: hidden !important;
    }
    .page-img-btn .btn-svg-fallback { display: none !important; }
    .page-img-btn .btn-img {
      width: 15px !important; height: 17px !important;
      object-fit: fill !important;
      position: absolute !important;
      top: 0 !important; left: 0 !important;
      display: block !important;
      transition: opacity 0.12s ease;
    }
    .page-img-btn .btn-img-normal { opacity: 1; }
    .page-img-btn .btn-img-hover  { opacity: 0; }
    .page-img-btn:hover .btn-img-normal { opacity: 0; }
    .page-img-btn:hover .btn-img-hover  { opacity: 1; }
    .page-img-btn.flash .btn-img-normal { opacity: 0 !important; }
    .page-img-btn.flash .btn-img-hover  { opacity: 1 !important; }
  `;
  document.head.appendChild(style);

  document.querySelectorAll('.scroll-thumb').forEach(thumb => {
    thumb.innerHTML =
      '<div class="thumb-top"></div>' +
      '<div class="thumb-mid"></div>' +
      '<div class="thumb-bot"></div>';
  });

  function wireBtn(btn, normalSrc, hoverSrc) {
    if (!btn) return;
    const imgN = btn.querySelector('.btn-img-normal');
    const imgH = btn.querySelector('.btn-img-hover');
    if (!imgN || !imgH) return;
    imgN.src = normalSrc; imgH.src = hoverSrc;
    imgN.style.cssText = 'display:block;position:absolute;top:0;left:0;width:22px;height:29px;';
    imgH.style.cssText = 'display:block;position:absolute;top:0;left:0;width:22px;height:29px;';
    btn.style.position = 'relative';
    btn.classList.add('has-image');

    btn.addEventListener('mousedown', () => {
      btn.classList.add('flash');
    });
    const clearFlash = () => btn.classList.remove('flash');
    btn.addEventListener('mouseleave', clearFlash);
    document.addEventListener('mouseup', clearFlash);
  }

  document.querySelectorAll('.scroll-img-btn.up').forEach(b   => wireBtn(b, UP_N, UP_H));
  document.querySelectorAll('.scroll-img-btn.down').forEach(b => wireBtn(b, DN_N, DN_H));

  const PAGE_LEFT_N  = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAARCAYAAAACCvahAAAAAXNSR0IArs4c6QAAAFBlWElmTU0AKgAAAAgAAgESAAMAAAABAAEAAIdpAAQAAAABAAAAJgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAD6ADAAQAAAABAAAAEQAAAADKO9z0AAABWWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNi4wLjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgoZXuEHAAABf0lEQVQ4EWNgIAAaGhp4cClhwiUBEu/t7c0GUgG41ODUvGfPnhUSEhJTgBof4NLMgk3iyJEjK5SUlMLv3LkDkr4CUwP0ggSQ7QLE1kD8khEmAaN37ty5SVdX1xfEX7BgwZ9fv36FApnuPDw8tpKSktri4uIM379/Zzh79uwCFJtPnDixRU5Ozhuk8d+/fwxSUlIsMjIy60EahIWFQcJgcPPmTTAN17x79264RpAMExMTg5ubG1gRLgKs+ejRo3sUFRWdcSnCJc7y7NmzCqAkyRqBel4w/f//nwOXybjEQQEGBD+ZpKWlG4AGNOJSiE3879+/YGFwIiHHAJBueArDZsDly5cZPn78eAyo7gFIMQzw8fGdArKfYCQSYABOB0pkgBTu3buX4e7du7XAlNXy/PlzBaD3bBgZGc2B9EVgGpgDj2eQYhAACmYCDQCJpwBdcxao2RgkDkxdD4AUCC8BYjCAOxsmAKKBBqQCqTkaGhqPgfROkBjJAOgCsPNxaQQAJ0eBzqXGjAgAAAAASUVORK5CYII=";
  const PAGE_LEFT_H  = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAARCAYAAAACCvahAAAAAXNSR0IArs4c6QAAAFBlWElmTU0AKgAAAAgAAgESAAMAAAABAAEAAIdpAAQAAAABAAAAJgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAD6ADAAQAAAABAAAAEQAAAADKO9z0AAABWWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNi4wLjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgoZXuEHAAABNElEQVQ4EZ2Sv2qEQBDG9bgiRQrLNELwOQSLvIB2FpYpAnmBFCk2T6BgYAUL28PCgyN2qVOEgE0auytS+ApisfnGZCV7uNFkYNj58/1mV3cNY9nOdZKNrkF127Zvsfg6jRbOsmzned4jwKMOnq2XZbkTMNd1BQTWD9EF4gjO4QyuWhzHBwLJLMsa0KVjc3zCexRFgnMuGGM0tFDIuq6fvjAhhmEQvu+P4qZpZHlci6JQ4TRNJ1BRziQS3tLWVVU9B0FwpRxjRbLF4Dvo/gyC6eiqzlZsoki6rqO835imyRA8ULbW+r4fpeMj+c8AoqcXNjcgSRKjbdsX6I4kluY4ziviD5lPK34gl7cThiHd5z01UbuER/AUfj0BpwGaOVzkef6G3v60v5h/DyDwZlE8J8CAX8FPfELE/vBOlNoAAAAASUVORK5CYII=";
  const PAGE_RIGHT_N = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAARCAYAAAACCvahAAAAAXNSR0IArs4c6QAAAFBlWElmTU0AKgAAAAgAAgESAAMAAAABAAEAAIdpAAQAAAABAAAAJgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAD6ADAAQAAAABAAAAEQAAAADKO9z0AAABWWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNi4wLjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgoZXuEHAAABhElEQVQ4EYVSv2vCQBR+0QxBMrTQoSCBdCkdOwlSOriI3czWpksn/4aObu3fULpKwVEQiu3QtZub0CWiRW1UyFAhYmP6vYPEoJ4evLzH+368u8sRSVa1WlURRxJYtFPbwDAM1UqlcgDsZZfBVrGiKH8szGQybPAmMxBigCXEcXIXmK6Xy2VT07RzmYEyGAxKtVrtaTabGSB9Iz4Qn7ZtX+i6fj2dTqnZbJLv+230LzHkF1ksFjuoTIgJNbmuS6PRiAzDoFwuJ0hs0Gg0aLFYvKJhwcBnIBYLVuKzXC4plVpdSb/fp1arRUEQxAZSccInLtcNVtYxRV7wUYrFIqXT6RJY9yzW5PRNhA3y+fwXkEfedrhJkXd+sLrd7pllWZ4qp20iw+Fw3Ov1hJBR6ZnxSNykHAMnEJ7yxKgfiQOQ+X8/I67m8/kh8m1EgnDsed5JUsiYCtEN3vJ7NpudRGTOuAuTM58RQrNQKIiHwb29C+KHTqfTrtfr+l7yOgGXc+c4zs7f+A9R1b6t/sUkAQAAAABJRU5ErkJggg==";
  const PAGE_RIGHT_H = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAARCAYAAAACCvahAAAAAXNSR0IArs4c6QAAAFBlWElmTU0AKgAAAAgAAgESAAMAAAABAAEAAIdpAAQAAAABAAAAJgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAD6ADAAQAAAABAAAAEQAAAADKO9z0AAABWWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNi4wLjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgoZXuEHAAABO0lEQVQ4EZ1TO06EUBQlZgoKiikoJGyCzg1YsAESSwtLFkBJ5w5oLClM2ADFlAQoLLA1JAJS6DAbMEG4nouG4QVBx5sc8t49n8vnIUnLtQGlLtMLDBFtADbu/huw0zTtAebstwATgnNgLExOq6o6qKpKaP4cAJGp6/oLBCyqAR+wy7K8B0dZltEkQAF3LPAFi+q6Jt/3ybZtMgyDHMfh9lAcoCgKh4eAPLrBFl8S8dq2rdAIw5BkWRYDoCgE1cpmFnCKmXMnAa6E/Ss3TynP85742c9wET7R+DIWFkmS7JumuQD9zpP/XFEUNa7rbsfcJWfXdfspl6bpQTByAgv6vv9APWN5B5jAFrgEhoKxCYJAPCDf5isoZn8PejfsjOP4DROPB2O855UFfLd5nj9aljWfuOIbKJivgdWJn87swB7bk+/UAAAAAElFTkSuQmCC";

  document.querySelectorAll('.page-img-btn').forEach(btn => {
    const isPrev = (btn.getAttribute('onclick') || '').includes('-1');
    const imgN = btn.querySelector('.btn-img-normal');
    const imgH = btn.querySelector('.btn-img-hover');
    if (!imgN || !imgH) return;
    imgN.src = isPrev ? PAGE_LEFT_N  : PAGE_RIGHT_N;
    imgH.src = isPrev ? PAGE_LEFT_H  : PAGE_RIGHT_H;
    imgN.style.cssText = 'display:block;position:absolute;top:0;left:0;width:15px;height:17px;opacity:1;';
    imgH.style.cssText = 'display:block;position:absolute;top:0;left:0;width:15px;height:17px;opacity:0;';
    btn.style.position = 'relative';
    btn.classList.add('has-image');
    btn.addEventListener('mousedown', () => btn.classList.add('flash'));
    const clearPageFlash = () => btn.classList.remove('flash');
    btn.addEventListener('mouseleave', clearPageFlash);
    document.addEventListener('mouseup', clearPageFlash);
  });

})();
