export interface TimelineEntry {
  period: string;
  organization: string;
  role: string;
  details: string;
}

export interface AcademicWork {
  degreeOrType: string;
  year: string;
  title: string;
  description: string;
}

export interface LiteraryBook {
  id: string;
  number: string;
  title: string;
  genre: 'fantastika' | 'tarixiy';
  genreLabel: string;
  summary: string;
  highlights: string[];
}

export const AUTHOR_PORTRAIT_MAIN = '/assets/aistudio/image_2f79056b.png';
export const AUTHOR_SLIDE_IMAGE = '/assets/aistudio/image_0d04cc44.png';

export const AUTHOR_BASIC_INFO = {
  fullName: 'Saʼdullo Quronov Dilmurodovich',
  birthDate: '1989-yil 31-yanvar',
  birthPlace: 'Andijon viloyati, Andijon tumani',
  roles: 'Filologiya fanlari doktori (DSc) · Yozuvchi · Adabiyotshunos olim · Darsliklar hammuallifi',
  slideExactTranscript:
    'Saʼdullo Quronov 1989-yil 31-yanvarda Andijon tumanida tugʻilgan. 4-umumtaʼlim maktabida, 2004 – 2006-yillarda ADU qoshidagi 11-litsey-internatda oʻqigan. 2006 – 2007-yillarda Andijon davlat universiteti, 2007 – 2012-yillar davomida Oʻzbekiston Milliy universiteti filologiya fakultetining bakalavr, magistratura bosqichlarini tamomlagan. Mehnat faoliyatini 2011-yilda “Sharq yulduzi” jurnalida boshlab, masʼul kotib, adabiyotshunoslik boʻlimi muharriri lavozimlarida ishlagan. 2015-yildan boshlab “Jajji akademik” bolalar jurnalida muharrir, keyinroq bosh muharrir lavozimlarida ishlagan.',
};

export const AUTHOR_EDUCATION: TimelineEntry[] = [
  {
    period: 'Boshlangʻich va oʻrta taʼlim',
    organization: 'Andijon tumani 4-umumtaʼlim maktabi',
    role: 'Oʻquvchi',
    details: 'Ilk maktab taʼlimini tugʻilib oʻsgan Andijon tumanidagi 4-umumtaʼlim maktabida olgan.',
  },
  {
    period: '2004–2006',
    organization: 'ADU qoshidagi 11-litsey-internat',
    role: 'Tinglovchi',
    details: 'Andijon davlat universiteti qoshidagi ixtisoslashtirilgan 11-litsey-internatda tahsil olgan.',
  },
  {
    period: '2006–2007',
    organization: 'Andijon davlat universiteti (ADU)',
    role: 'Talaba',
    details: 'Oliy taʼlimning dastlabki bosqichini Andijon davlat universitetida boshlagan.',
  },
  {
    period: '2007–2012',
    organization: 'Oʻzbekiston Milliy universiteti (OʻzMU)',
    role: 'Bakalavr va Magistratura (Filologiya fakulteti)',
    details: 'Oʻzbekiston Milliy universiteti filologiya fakultetining bakalavriat hamda magistratura bosqichlarini muvaffaqiyatli tamomlagan.',
  },
];

export const AUTHOR_CAREER: TimelineEntry[] = [
  {
    period: '2011–2015',
    organization: '„Sharq yulduzi“ adabiy jurnali',
    role: 'Masʼul kotib, adabiyotshunoslik boʻlimi muharriri',
    details: 'Mehnat faoliyatini nufuzli adabiy nashrda boshlab, masʼul kotib va adabiyotshunoslik boʻlimi muharriri lavozimlarida ishladi.',
  },
  {
    period: '2015–2018',
    organization: '„Jajji akademik“ ilmiy-ommabop bolalar jurnali',
    role: 'Asoschilardan biri, muharrir va bosh muharrir',
    details: 'Yosh avlod uchun moʻljallangan mashhur ilmiy-ommabop bolalar jurnalining asoschilaridan biri hamda bosh muharriri boʻldi.',
  },
  {
    period: '2018–2020',
    organization: '„Yoshlik“ jurnali',
    role: 'Tahririyat aʼzosi',
    details: 'Yosh ijodkorlar va zamonaviy oʻzbek adabiyoti jarayonlarida faol ishtirok etib, „Yoshlik“ jurnalida faoliyat olib bordi.',
  },
  {
    period: '2020–2022',
    organization: 'Respublika taʼlim markazi',
    role: 'Metodist va yangi avlod darsliklari hammuallifi',
    details: 'Milliy taʼlim tizimida katta burilish yasagan yangi avlod darsliklarini yaratish va taʼlim metodikasini takomillashtirish ustida ishladi.',
  },
  {
    period: '2024 – hozirgacha',
    organization: '„Mutolaa“ loyihasi',
    role: 'Loyiha aʼzosi va targʻibotchi',
    details: '„Mutolaa“ loyihasida faoliyat yuritib, Oʻzbekiston yoshlari oʻrtasida zamonaviy va tizimli kitobxonlikni keng targʻib qilmoqda.',
  },
];

export const AUTHOR_SCIENCE: AcademicWork[] = [
  {
    degreeOrType: 'Ilk ilmiy toʻplam',
    year: '2013',
    title: '„Ifoda va ifodaviylik“',
    description:
      'Yosh munaqqid sifatida badiiy sintez, modernizm va postmodernizm masalalariga bagʻishlangan ilk ilmiy-tanqidiy toʻplamini chop ettirdi.',
  },
  {
    degreeOrType: 'PhD darajasi va monografiya',
    year: 'Filologiya fanlari boʻyicha falsafa doktori',
    title: '„Zamonoviy oʻzbek adabiyotida sintez muammosi (sheʼriyat va rangtasvir sanʼatlari misolida)“',
    description:
      'Nomzodlik (PhD) dissertatsiyasini himoya qilgan. Olimning ushbu mavzudagi chuqur izlanishlari „Egiz sanʼatlar“ nomli monografiyada oʻz aksini topgan.',
  },
  {
    degreeOrType: 'DSc darajasi (Doktorlik)',
    year: '2024-yil dekabr',
    title: '„Mustaqillik davri oʻzbek romanlarida inson konsepsiyasi“',
    description:
      'Oʻzbek tili, adabiyoti va folklori instituti huzurida doktorlik (DSc) dissertatsiyasini muvaffaqiyatli himoya qilib, oʻzbek romanchiligi va sheʼriyatini chuqur tadqiq etgan yetuk adabiyotshunos olim sifatida eʼtirof etildi.',
  },
];

export const AUTHOR_TEXTBOOKS = {
  heading: 'Maktab darsliklari hammuallifi',
  summary:
    'Saʼdullo Quronov Respublika taʼlim markazidagi faoliyati davomida milliy taʼlim tizimida katta burilish yasagan yangi avlod darsliklarini yaratishda faol qatnashdi.',
  grades: 'Umumtaʼlim maktablarining 1, 2 va 3-sinflari',
  subject: '„Ona tili va oʻqish savodxonligi“ darsliklarining asosiy hammualliflaridan biri.',
};

export const AUTHOR_COMMERCIAL_FACT =
  'Zamonaviy oʻzbek bolalar adabiyotida eng muvaffaqiyatli va tijoriy jihatdan eng xaridorgir ijodkorlardan biri: yaqinda berilgan maʼlumotlarga koʻra, uning kitoblari savdosidan bir oyning oʻzida 238 million soʻm daromad koʻrilgan.';

export const AUTHOR_BOOKS: LiteraryBook[] = [
  {
    id: 'galaktika',
    number: '01',
    title: '„Galaktikada bir kun“ trilogiyasi (1, 2, 3-kitoblar)',
    genre: 'fantastika',
    genreLabel: 'Ilmiy-fantastika',
    summary:
      '12 yoshli vunderkind bola Ahmad va Salmir sayyorasidan kelgan Margol ismli oʻzga sayyoralikning koinotdagi sarguzashtlari haqidagi ilmiy-fantastik qissa. Asar shunchaki xayoliy uydirma emas, balki fizika, astrofizika, kvant mexanikasi, nisbiylik nazariyasi va torlar nazariyasi kabi real ilmiy qonuniyatlar hamda gipotezalarga tayanib yozilgan.',
    highlights: [
      '1, 2 va 3-kitoblardan iborat yaxlit ilmiy-fantastik trilogiya',
      'Fizika, astrofizika, kvant mexanikasi, nisbiylik va torlar nazariyasiga asoslangan',
      'Trilogiyaning inglizcha tarjimasi xalqaro Amazon platformasida ham sotiladi',
    ],
  },
  {
    id: 'buxoriy',
    number: '02',
    title: '„Buxoriy“',
    genre: 'tarixiy',
    genreLabel: 'Tarixiy-maʼrifiy',
    summary:
      'Buyuk muhaddis imom Ismoil al-Buxoriyning ibratli hayoti, ilm yoʻlidagi mashaqqatli safarlari va maʼnaviy jasoratiga bagʻishlangan tarixiy-badiiy asar.',
    highlights: [
      'Buyuk muhaddis Ismoil al-Buxoriy hayotiga bagʻishlangan tarixiy-badiiy asar',
      'Yosh kitobxonlar qalbida ilmga muhabbat va xotira quvvatiga havas uygʻotadi',
    ],
  },
  {
    id: 'beruniy',
    number: '03',
    title: '„Beruniy (Sahrodagi qahramon)“',
    genre: 'tarixiy',
    genreLabel: 'Tarixiy-maʼrifiy',
    summary:
      'Qomusiy alloma Abu Rayhon Beruniyning bolaligi, tabiat sirlariga qiziqishi va ulkan ilmiy izlanishlarini yoshlarga sodda, ravon hamda qiziqarli tilda yetkazuvchi kitob.',
    highlights: [
      'Alloma Abu Rayhon Beruniyning bolaligi va ilmiy izlanishlari sodda tilda yoritilgan',
      'Kuzatuvchanlik, tajriba va tanqidiy fikrlash koʻnikmalarini targʻib qiladi',
    ],
  },
];
