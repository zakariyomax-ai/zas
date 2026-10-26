export interface PlotStage {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  keyFact: string;
}

export interface CharacterProfile {
  name: string;
  origin: string;
  role: string;
  description: string;
  traits: string[];
}

export interface GalaxyLocation {
  id: string;
  name: string;
  distanceLabel: string;
  coordinates: { x: number; y: number };
  roleInBook: string;
  scientificNote: string;
}

export interface ScienceConcept {
  id: string;
  title: string;
  formulaOrPrinciple: string;
  bookConnection: string;
  simpleExplanation: string;
}

export const BOOK_PDF_URL =
  'https://www.scribd.com/document/768519634/Galaktikada-bir-kun';

export const BOOK_OVERVIEW = {
  title: 'Galaktikada bir kun',
  partTitle: '1-qism: Koinot xaritasi',
  author: 'Saʼdullo Quronov',
  writtenYears: '2018–2019',
  genre: 'Ilmiy-fantastik qissa',
  internationalReach: 'Ingliz tiliga tarjima qilinib, xalqaro Amazon platformasida sotuvga qoʻyilgan',
  leadSummary:
    '„Galaktikada bir kun“ (1-kitob) — 12 yoshli oʻzbek vunderkindi Ahmad hamda Sirius yulduzlar tizimidagi Salmir sayyorasidan kelgan Margolning fazodagi aqlbovar qilmas sarguzashtlari haqidagi ilmiy-fantastik asar. Muallif badiiy syujet ichiga gravitatsion manyovrlar, nisbiylik nazariyasi, kvant mexanikasi va astrofizika qonuniyatlarini mahorat bilan singdirgan.',
};

export const PLOT_STAGES: PlotStage[] = [
  {
    step: '01',
    title: 'Noyob ixtiro va kutilmagan uchrashuv',
    subtitle: 'Yer sayyorasi · Ixtirochilar tanlovi',
    description:
      '12 yoshli zukko ixtirochi Ahmad gravitatsion manyovrlar va tortishish toʻlqinlari yordamida harakatlanadigan „Koʻkkezar“ fazo kemasi loyihasini ixtirochilar tanloviga olib chiqadi. Kattalar va olimlar uning loyihasiga ishonchsizlik bilan qarab kulishadi, ammo koinot qaroqchilaridan jabr koʻrib Yerga tushib qolgan oʻzga sayyoralik Margol bu chizmaning haqiqiy qiymatini anglaydi.',
    keyFact: '„Koʻkkezar“ kemasi yoqilgʻi sarflamasdan sayyora va yulduzlarning tortishish kuchidan tezlanish oladi.',
  },
  {
    step: '02',
    title: 'Salmir sayyorasini qutqarish rejasi',
    subtitle: 'Moviy tosh missiyasi · Parvoz boshlanishi',
    description:
      'Sirius yulduzlar tizimidagi Salmir sayyorasi halokat yoqasida qolgan edi. Uni qutqarish uchun noyob energiya manbai — „moviy tosh“ zarur boʻladi. Ahmad Margolga yordam berishga qaror qiladi va ular „Koʻkkezar“ kemasida koinot bagʻriga parvoz qilishadi.',
    keyFact: 'Doʻstlik va javobgarlik hissi 12 yoshli Ahmadni butun boshli sayyorani qutqarish safariga undaydi.',
  },
  {
    step: '03',
    title: 'Gikslar taʼqibi va Al-Toyir yulduziga sakrash',
    subtitle: 'Yerdan 17 yorugʻlik yili uzoqlikda',
    description:
      'Fazo kengliklarida yovuz koinot qaroqchilari — gikslar qahramonlarning iziga tushadi. Taʼqibdan qochish chogʻida kema kutilmaganda Yerdan 17 yorugʻlik yili olisdagi Al-Toyir yulduzi yaqiniga borib qoladi. Koordinatalar yoʻqolgach, Yerga ham, Salmirga ham toʻgʻridan-toʻgʻri qaytish imkonsiz boʻlib qoladi.',
    keyFact: 'Al-Toyir (Burgut yulduz turkumidagi eng yorqin yulduz) haqiqatan ham Yerdan taxminan 16,7–17 yorugʻlik yili uzoqlikda joylashgan.',
  },
  {
    step: '04',
    title: 'Toʻrt boʻlakka boʻlingan Galaktika xaritasi',
    subtitle: 'Zagun · Miks · Koinot muzeyi',
    description:
      'Uyga qaytish va moviy toshni topishning yagona yoʻli — xavfsizlik maqsadida 4 boʻlakka ajratib, galaktikaning turli burchaklariga yashirilgan qadimiy Galaktika xaritasini yigʻish edi. Ahmad va Margol mehmondoʻst Zagun sayyorasi, besoʻnaqay mikslar makoni hamda gʻaroyib Koinot muzeyi boʻylab xatarli sarguzashtlarni boshdan kechirishadi.',
    keyFact: 'Xarita 4 qismga boʻlib yashirilgan boʻlib, har bir boʻlak topilishi uchun ilmiy topqirlik va mantiq talab etiladi.',
  },
  {
    step: '05',
    title: 'Sinovlardan gʻalaba va vaqt nisbiyligi',
    subtitle: '1-kitob yakuni va keyingi sarguzashtlarga yoʻl',
    description:
      'Ahmad oʻzining fizika va matematika bilimlari, Margol esa fazoviy tajribasi bilan qaroqchi gikslarning hiylalarini yengib oʻtadi. Yorugʻlik tezligiga yaqin parvozlar tufayli koinotdagi vaqt bilan Yerdagi vaqt oʻrtasidagi nisbiylik siri asar nomining tub maʼnosini ochib beradi.',
    keyFact: 'Eynshteynning nisbiylik nazariyasiga koʻra, katta tezlikda va kuchli gravitatsiya maydonida vaqt sekinroq oqadi.',
  },
];

export const CHARACTERS: CharacterProfile[] = [
  {
    name: 'Ahmad',
    origin: 'Yer sayyorasi (Oʻzbekiston)',
    role: '12 yoshli vunderkind ixtirochi, bosh qahramon',
    description:
      'Fizika, matematika va astrofizikaga juda qiziquvchi, mustaqil fikrlaydigan oʻquvchi. U „Koʻkkezar“ fazo kemasi chizmalarini yaratadi va har qanday murakkab vaziyatdan ilmiy mantiq orqali chiqib ketadi.',
    traits: ['12 yoshli vunderkind', '„Koʻkkezar“ muallifi', 'Topqir va jasur'],
  },
  {
    name: 'Margol',
    origin: 'Salmir sayyorasi (Sirius yulduz tizimi)',
    role: 'Oʻzga sayyoralik sayohatchi, Ahmadning sodiq doʻsti',
    description:
      'Qaroqchi gikslar hujumidan keyin kemasidan ayrilib Yerga tushib qolgan salmirlik qahramon. Oʻz ona sayyorasi Salmirni halokatdan asrab qolish uchun moviy toshni izlaydi va Ahmadning ixtirosiga chin dildan ishonadi.',
    traits: ['Salmir farzandi', 'Sodiq hamroh', 'Fazoviy tajriba egasi'],
  },
  {
    name: 'Qaroqchi gikslar',
    origin: 'Galaktikaning qorongʻu hududlari',
    role: 'Asosiy salbiy kuchlar — koinot qaroqchilari',
    description:
      'Galaktika boʻylab noyob boyliklar, jumladan, moviy tosh va Koinot xaritasini qoʻlga kiritish uchun Ahmad hamda Margolni tinimsiz taʼqib qiluvchi xavfli fazo qaroqchilari.',
    traits: ['Xavfli taʼqibchilar', 'Moviy tosh ovchilari', 'Hiylakor'],
  },
  {
    name: 'Zagunliklar va Mikslar',
    origin: 'Zagun va Miks sayyoralari',
    role: 'Galaktikadagi oʻzga sivilizatsiya vakillari',
    description:
      'Galaktika xaritasining boʻlaklarini qidirish davomida qahramonlar duch keladigan turfa xil sayyoraliklar: mehmondoʻst va madaniyatli zagunliklar hamda oʻziga xos feʼl-atvorli mikslar.',
    traits: ['Turfa sivilizatsiyalar', 'Xarita sirlari guvohlari', 'Sinov va koʻmak'],
  },
];

export const GALAXY_LOCATIONS: GalaxyLocation[] = [
  {
    id: 'yer',
    name: 'Yer sayyorasi (Quyosh tizimi)',
    distanceLabel: '0.0 yorugʻlik yili (Boshlangʻich nuqta)',
    coordinates: { x: 16, y: 74 },
    roleInBook:
      'Ahmadning vatani. Ixtirochilar tanlovi oʻtkazilgan joy, Ahmad va Margolning ilk uchrashuvi hamda „Koʻkkezar“ kemasining parvoz nuqtasi.',
    scientificNote:
      'Yorugʻlik Quyoshdan Yerga taxminan 8 daqiqa 20 soniyada yetib keladi, yulduzlararo masofalar esa yorugʻlik yillarida oʻlchanadi.',
  },
  {
    id: 'salmir',
    name: 'Salmir sayyorasi (Sirius tizimi)',
    distanceLabel: '~8.6 yorugʻlik yili',
    coordinates: { x: 35, y: 34 },
    roleInBook:
      'Margolning ona sayyorasi. Energetik va ekologik halokat yoqasiga kelib qolgan Salmirni qutqarish uchun maxsus „moviy tosh“ talab etiladi.',
    scientificNote:
      'Sirius — tungi osmondagi eng yorqin yulduz boʻlib, Sirius A va oq mitti Sirius B qoʻshaloq yulduz tizimidan iborat.',
  },
  {
    id: 'al-toyir',
    name: 'Al-Toyir yulduzi',
    distanceLabel: '17.0 yorugʻlik yili',
    coordinates: { x: 54, y: 66 },
    roleInBook:
      'Qaroqchi gikslar taʼqibidan qochayotgan Ahmad va Margol kutilmaganda Al-Toyir yulduzi yaqiniga tushib qoladi va ortga qaytish yoʻlini yoʻqotadi.',
    scientificNote:
      'Al-Toyir (Altair) — Burgut yulduz turkumidagi real yulduz boʻlib, oʻz oʻqi atrofida nihoyatda tez aylanishi tufayli qutblari yassilangan.',
  },
  {
    id: 'zagun',
    name: 'Zagun sayyorasi',
    distanceLabel: 'Chuqur galaktika sektori · I boʻlak',
    coordinates: { x: 68, y: 26 },
    roleInBook:
      'Toʻrt boʻlakka boʻlib yashirilgan Galaktika xaritasining qismlarini izlash yoʻlida Ahmad va Margol tashrif buyuradigan mehmondoʻst sayyora.',
    scientificNote:
      'Ekzosayyoralarda atmosfera tarkibi va yulduz nurlanishiga qarab tiriklik shakllari Yerdagidan tubdan farq qilishi mumkin.',
  },
  {
    id: 'miks',
    name: 'Miks sayyorasi',
    distanceLabel: 'Tashqi spiral tarmoq · II boʻlak',
    coordinates: { x: 82, y: 58 },
    roleInBook:
      'Besoʻnaqay mikslar yashaydigan gʻaroyib maskan. Qahramonlar bu yerda xarita boʻlaklari bilan bogʻliq murakkab toʻsiqlarni yengib oʻtishadi.',
    scientificNote:
      'Kattaroq massali sayyoralarda ogʻirlik kuchi yuqori boʻlgani sababli u yerdagi mavjudotlarning tana tuzilishi zich va baquvvat boʻladi.',
  },
  {
    id: 'muzey',
    name: 'Koinot muzeyi',
    distanceLabel: 'Markaziy galaktika halqasi · Xarita kaliti',
    coordinates: { x: 88, y: 22 },
    roleInBook:
      'Qadimiy sivilizatsiyalar merosi va Galaktika xaritasining muhim sirlarini oʻzida jamlagan muhtasham fazoviy maskan.',
    scientificNote:
      'Somon yoʻli galaktikasi diametri taxminan 100 000 yorugʻlik yiliga teng boʻlib, unda 100–400 milliard atrofida yulduz mavjud.',
  },
];

export const SCIENCE_CONCEPTS: ScienceConcept[] = [
  {
    id: 'gravity-assist',
    title: 'Gravitatsion manyovr (Tortishish sapchishi)',
    formulaOrPrinciple: 'Δv = 2u · sin(θ / 2)',
    bookConnection:
      'Ahmad ixtiro qilgan „Koʻkkezar“ kemasi osmon jismlarining gravitatsiya maydonidan tortishish toʻlqinlari orqali mislsiz tezlik oladi.',
    simpleExplanation:
      'Fazo kemasi yirik sayyora yoki yulduz yonidan maʼlum burchak ostida uchib oʻtganda, osmon jismining orbital energiyasi hisobiga yoqilgʻi sarflamay oʻz tezligi va yoʻnalishini keskin oshiradi (real hayotda „Voyager-1“ va „Voyager-2“ apparatlari shu usuldan foydalangan).',
  },
  {
    id: 'relativity',
    title: 'Nisbiylik nazariyasi va vaqt sekinlashuvi',
    formulaOrPrinciple: 'Δt′ = Δt / √(1 − v²/c²)',
    bookConnection:
      'Asarning „Galaktikada bir kun“ deb nomlanishi bevosita Albert Eynshteynning maxsus va umumiy nisbiylik nazariyasi bilan bogʻliq.',
    simpleExplanation:
      'Fazo kemasi yorugʻlik tezligiga (c ≈ 300 000 km/s) yaqinlashgan sari yoki kuchli gravitatsiya maydonida kema ichidagi kosmonavtlar uchun vaqt Yerdagi kuzatuvchilarga nisbatan ancha sekin oʻtadi.',
  },
  {
    id: 'quantum',
    title: 'Kvant mexanikasi',
    formulaOrPrinciple: 'Δx · Δp ≥ ℏ / 2',
    bookConnection:
      'Mikrodunyo zarralarining gʻayrioddiy xossalari, energiya almashinuvi va moviy toshning kvant xususiyatlarini tushunishda qoʻllanadi.',
    simpleExplanation:
      'Atom va subatom zarralar bir vaqtning oʻzida ham toʻlqin, ham zarra xossasini namoyon etadi hamda kvant chigalligi (entanglement) orqali ulkan masofalarda bogʻlanishi mumkin.',
  },
  {
    id: 'string-theory',
    title: 'Torlar nazariyasi va fazo-vaqt oʻlchamlari',
    formulaOrPrinciple: 'Koʻp oʻlchamli fazo-vaqt tuzilishi',
    bookConnection:
      'Galaktikaning bir chekkasidan ikkinchi chekkasiga qisqa muddatda oʻtish va koinot arxitekturasini tasavvur qilishda ilmiy gipoteza vazifasini bajaradi.',
    simpleExplanation:
      'Ushbu nazariyaga koʻra, koinotdagi barcha fundamental zarralar nuqtaviy emas, balki tebranib turuvchi oʻta mitti energetik torlardan tashkil topgan boʻlib, gravitatsiya va kvant fizikasini birlashtirishga xizmat qiladi.',
  },
];
