const showsData = [
  {
    id: '8a25c3920d1231fe010d12652d03008d', name: 'BEN 10',
    color: '#44AA44', bannerSrc: '',
    episodes: []
  },
  {
    id: '8a25c3920d1231fe010d1267d9af0093', name: 'THE GRIM ADVENTURES OF BILLY & MANDY',
    color: '#336699', bannerSrc: '',
    episodes: [
      { id:'bm1', timelineOffset:0, ep:'THE SECRET SNAKE CLUB', avail:'Available Until 12.31.2099', src:'protected_auth!/bm_0308.mp4', segments:[{id:'bm1_s0'},{id:'bm1_s1'},{id:'bm1_s2'}], desc: 'Mandy joins the Secret Snake Club where they call forth an ancient entity to save nerds from persecution.' },
    ]
  },
  {
    id: '8a25c3920d1231fe010d1265b77a008e', name: 'CAMP LAZLO',
    color: '#FF9944', bannerSrc: '',
    episodes: []
  },
  {
    id: '8a25c3920d1231fe010d126608c4008f', name: 'COURAGE THE COWARDLY DOG',
    color: '#AA44FF', bannerSrc: '',
    episodes: [
      { id:'cou1', timelineOffset:0, ep:'BALL OF REVENGE', avail:'Available Until 12.31.2099', src:'protected_auth!/cow_0411.mp4', segments:[{id:'cou1_s0'},{id:'cou1_s1'}], desc: 'The Farmer is in an exceptionally bitter mood, taking note of all the attention Muriel gives to Courage. He decides to get rid of Courage forever when Muriel gives Courage a colorful new blanket that the Farmer assumed she was knitting for him.' },
    ]
  },
  {
    id: '8a25c3920d311098010d31466c290001', name: "DEXTER'S LABORATORY",
    color: '#AA44FF', bannerSrc: '',
    episodes: [
      { id:'dex1', timelineOffset:0, ep:'DEXTER DODGE BALL', avail:'Available Until 12.31.2099' },
    ]
  },
  {
    id: '8a25c3920d1231fe010d1266637f0090', name: "ED, EDD N' EDDY",
    color: '#FFCC00', bannerSrc: '',
    episodes: [
      { id:'ed1', timelineOffset:0, ep:'QUICK SHOT ED', avail:'Available Until 12.31.2099', src:'protected_auth!/ed_qs.mp4', segments:[{id:'ed1_s0'},{id:'ed1_s1'}] },
    ]
  },
  {
    id: '8a25c3920d1231fe010d12671b6f0091', name: "FOSTER'S HOME FOR IMAGINARY FRIENDS",
    color: '#FF6633', bannerSrc: '',
    episodes: [
      { id:'fos1', timelineOffset:0, ep:'WORLD WIDE WABBIT', avail:'Available Until 12.31.2099', src:'protected_auth!/fos_08.mp4', segments:[{id:'fos1_s0'},{id:'fos1_s1'},{id:'fos1_s2'}] },
    ]
  },
  {
    id: '8a25c3920d1231fe010d126776100092', name: "MY GYM PARTNER'S A MONKEY",
    color: '#FF9944', bannerSrc: '',
    episodes: []
  },
  {
    id: '8a25c3920d1231fe010d126d05bc0098', name: 'THE POWERPUFF GIRLS',
    color: '#FF44AA', bannerSrc: '',
    episodes: [
      { id:'ppg1', timelineOffset:0, ep:'BUBBLEVICIOUS', avail:'Available Until 12.31.2099', src:'protected_auth!/ppg_17.mp4', segments:[{id:'ppg1_s0'},{id:'ppg1_s1'}] },
    ]
  },
  {
    id: '8a25c3920d1231fe010d126811d20094', name: 'SQUIRREL BOY',
    color: '#77CC44', bannerSrc: '',
    episodes: [
      { id:'sb1', timelineOffset:175, ep:'THE HAIRY TRUTH', avail:'Available Until 12.31.2099', src:'protected_auth!/sb_05.mp4', segments:[{id:'sb1_s0'},{id:'sb1_s1'}] },
    ]
  },
  {
    id: 'teamgalaxy', name: 'TEAM GALAXY',
    color: '#4488FF', bannerSrc: 'tools/images/tgBanner.png',
    episodes: [
      { id:'tg1', timelineOffset:0, ep:'EMPEROR BRETT', avail:'Available Until 12.31.2099', src:'protected_auth!/tg_04.mp4', segments:[{id:'tg1_s0'},{id:'tg1_s1'},{id:'tg1_s2'}] },
    ]
  },
];

const extrasData = [
  {
    id: 'bts', name: 'BEHIND THE SCENES',
    color: '#FF7722', bannerSrc: 'tools/images/headerBTS.jpg',
    episodes: []
  },
  {
    id: 'crazyfrog', name: 'CRAZY FROG',
    color: '#66BBFF', bannerSrc: 'tools/images/headerFrog.jpg',
    episodes: []
  },
  {
    id: 'fridaysmusic', name: 'FRIDAYS MUSIC',
    color: '#FF9944', bannerSrc: 'tools/images/headerFridays.jpg',
    episodes: []
  },
  {
    id: 'musicvids', name: 'MUSIC VIDEOS',
    color: '#77CC44', bannerSrc: 'tools/images/headerMusic.jpg',
    episodes: []
  },
  {
    id: 'podcasts', name: 'PODCASTS',
    color: '#9955CC', bannerSrc: 'tools/images/headerPodcasts.jpg',
    episodes: []
  },
  {
    id: 'promos', name: 'PROMOS',
    color: '#CC3333', bannerSrc: '',
    episodes: []
  },
];

const XML_EPISODE_FEEDS = [
  'tools/images/getAllEpisodes.xml',
];

const whatsNewEps = [
  { id:'wn1', timelineOffset:0, show:'CAMP LAZLO',    ep:'LAZLO LOVES A PARADE',  avail:'Available Until 12.31.2099', color:'#FF9944', src:'protected_auth!/laz_0310.mp4', segments:[{id:'wn1_s0'},{id:'wn1_s1'}], desc:'Lazlo is determined to make the best float for the Prickly Pines parade and ends up in a fierce competition with the Squirrel Scouts.' },
  { id:'wn2', timelineOffset:0, show:"ELLEN'S ACRES", ep:'DINOSAUR LOVE',          avail:'Available Until 12.31.2099', src:'', color:'#77CC44' },
];
