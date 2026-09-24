/* Atelier Volos — all studio data in one place.
   Sources: Yandex Maps listing (org 146799649318),
   catalog atelier-volos.clients.site, reviews — verbatim.
   Content edits are made here, no need to touch the layout. */

window.AV = {
  /* ─── studio ─────────────────────────────────────────────── */
  name: 'Atelier Volos',
  nameRu: 'Hair Atelier',
  city: 'Sochi',
  address: 'Sochi, Svetlana microdistrict, 10 Deputatskaya St.',
  addressShort: '10 Deputatskaya St.',
  landmark: 'Next to the "Svetlana" resort, 127 m',
  phone: '+7 (928) 234-98-38',
  phoneRaw: '79282349838',
  wa: 'https://wa.me/79282349838',
  tg: 'https://t.me/+79282349838',
  maps: 'https://yandex.ru/maps/org/atelier_volos/146799649318/',
  mapsReviews: 'https://yandex.ru/maps/org/atelier_volos/146799649318/reviews/',
  /* "Book online" on Yandex Maps — live studio schedule */
  booking:
    'https://yandex.ru/maps/org/atelier_volos/146799649318/?booking%5Bpage%5D=menu&booking%5Bpermalink%5D=146799649318',
  hours: 'Daily until 8:00 PM',
  legal: 'IE Kurokhtina Marina Valeryevna · OGRNIP 317237500223792 · INN 230404935692',

  rating: {
    score: '5,0',
    marks: 74,
    reviews: 69,
    award: 'Good Place 2026',
    aspects: [
      { name: 'Staff', pct: 94, n: 60 },
      { name: 'Atmosphere', pct: 100, n: 26 },
      { name: 'Coloring', pct: 93, n: 14 },
    ],
  },

  /* ─── measure: premium Slavic hair, price per 100 g ───────── */
  lengths: [
    { cm: 40, per100: 25000 },
    { cm: 45, per100: 26000 },
    { cm: 50, per100: 28000 },
    { cm: 55, per100: 29000 },
    { cm: 60, per100: 30000 },
    { cm: 65, per100: 32000 },
    { cm: 70, per100: 35000 },
    { cm: 75, per100: 36000 },
  ],

  /* ─── master's work ──────────────────────────────────────── */
  capsule: [
    {
      id: 'master',
      label: 'Master',
      exp: '4+ years experience',
      perStrand: 65,
      note: 'All inclusive: hair wash, encapsulation and extensions, haircut and styling.',
    },
    {
      id: 'top',
      label: 'Top Master',
      exp: '7+ years experience',
      perStrand: 85,
      note: 'All inclusive: hair wash, encapsulation and extensions, styling and haircut.',
    },
  ],
  /* «four hands» — two top masters simultaneously, 150–200 strands per hour, no extra charge */
  fourHands: { perStrand: 85, rateMin: 150, rateMax: 200 },

  hollywood: [
    { tress: 1, master: 6000, top: 8000 },
    { tress: 2, master: 9000, top: 11000 },
    { tress: 3, master: 12000, top: 14000 },
    { tress: 4, master: 15000, top: 17000 },
  ],

  /* ─── techniques ─────────────────────────────────────────────── */
  methods: [
    {
      id: 'capsule',
      title: 'Capsule',
      photo: 61,
      lead: 'Micro-capsules across the whole head, strand by strand.',
      body:
        'Priced per strand: 65 ₽ with a Master, 85 ₽ with a Top Master. Price already includes hair wash, encapsulation, the extension itself, haircut and styling.',
      facts: ['65–85 ₽ per strand', 'Strand removal — 20 ₽', 'Strand encapsulation — 20 ₽'],
    },
    {
      id: 'hollywood',
      title: 'Hollywood',
      photo: 1,
      lead: 'Wefts on a thread — no capsules, can be removed and reattached.',
      body:
        'Priced per weft, not per strand. One weft — 6,000 ₽ with a Master, 8,000 ₽ with a Top Master; each additional weft is cheaper. Correction is more affordable than capsule.',
      facts: ['From 6,000 ₽ per weft', '1–4 wefts', 'Cheaper correction'],
    },
    {
      id: 'four',
      title: 'Four Hands',
      photo: 95,
      lead: 'Two Top Masters work simultaneously.',
      body:
        'The procedure is twice as fast — 150–200 strands per hour — and costs the same as with one Top Master. No extra charge for speed: studio promotion until October 31, 2026.',
      facts: ['85 ₽ per strand', '150–200 strands per hour', 'No extra charge for speed'],
    },
  ],

  /* ─── price list (as published by the studio) ─────────────────────── */
  price: [
    {
      group: 'Hair Extensions',
      items: [
        { n: 'Capsule extensions, Master', p: '65 ₽ / strand', d: '4+ years experience. Hair wash, encapsulation, extensions, haircut and styling — all inclusive' },
        { n: 'Capsule extensions, Top Master', p: '85 ₽ / strand', d: '7+ years experience' },
        { n: 'Four-hands extensions', p: '85 ₽ / strand', d: 'Two Top Masters, 150–200 strands per hour, no extra charge for speed' },
        { n: 'Hollywood technique, Master', p: 'from 6,000 ₽', d: '1 weft — 6,000, 2 — 9,000, 3 — 12,000, 4 — 15,000 ₽' },
        { n: 'Hollywood technique, Top Master', p: 'from 8,000 ₽', d: '1 weft — 8,000, 2 — 11,000, 3 — 14,000, 4 — 17,000 ₽' },
        { n: 'Strand encapsulation', p: '20 ₽ / pc' },
        { n: 'Strand removal', p: '20 ₽ / pc' },
      ],
    },
    {
      group: 'Hair for Extensions',
      items: [
        { n: 'Slavic, premium', p: 'from 25,000 ₽ / 100 g', d: '40 cm — 25,000, 45 — 26,000, 50 — 28,000, 55 — 29,000, 60 — 30,000, 65 — 32,000, 70 — 35,000, 75 cm — 36,000 ₽' },
        { n: "Children's, exclusive category", p: 'per bundle', d: "Price is individual per bundle. Full collection with descriptions — in the studio's Telegram" },
        { n: 'Weft making', p: '25,000–30,000 ₽', d: 'Per 100 g of hair' },
        { n: 'Clip-in hair rental', p: '3,500 ₽ / day' },
      ],
    },
    {
      group: 'Coloring',
      items: [
        { n: 'Root coloring', p: '5,000–7,000 ₽' },
        { n: 'Hair toning', p: 'from 6,000 ₽' },
        { n: 'Total blonde', p: 'from 8,000 ₽' },
        { n: 'Micro-highlighting', p: 'from 12,000 ₽', d: 'Top zone — from 12,000, full — from 15,000 ₽' },
        { n: 'Air touch', p: 'from 13,000 ₽', d: 'Top zone — from 13,000, full — from 22,000 ₽' },
        { n: 'Complex coloring techniques', p: 'from 15,000 ₽', d: 'Brazilian blonde, air touch, micro-highlighting' },
      ],
    },
    {
      group: 'Hair Care',
      items: [
        { n: 'Tokio Inkarami', p: '8,500–10,500 ₽' },
        { n: 'Tokio Inkarami, full protocol', p: '8,500–13,500 ₽', d: 'Short & medium — 8,500–11,500, long, thick & extended — 11,500–13,500 ₽' },
        { n: 'Lebel "Happiness for Hair"', p: '6,500–11,500 ₽', d: 'Short & medium — 6,500–9,500, long, thick & extended — 8,500–11,500 ₽' },
        { n: 'Dr. Sorbie', p: '6,000–11,000 ₽', d: 'Short & medium — 6,000–8,000, long, thick & extended — 8,000–11,000 ₽' },
        { n: 'Nioxin peeling', p: '5,000 ₽' },
      ],
    },
    {
      group: 'Haircut & Styling',
      items: [
        { n: "Women's haircut", p: '3,500–4,000 ₽' },
        { n: 'Trimming ends', p: '2,500 ₽' },
        { n: 'Bangs trim', p: '1,200 ₽' },
        { n: 'Express styling', p: '3,500–4,500 ₽', d: 'Hair wash and blow-dry with brushing' },
        { n: 'Heat-tool styling', p: '4,500–5,500 ₽', d: 'Wash, blow-dry and styling' },
        { n: 'Makeup & styling', p: '6,500 ₽' },
      ],
    },
    {
      group: 'Clip-in Hair',
      items: [
        { n: 'Natural hair bun chignon', p: '14,000 ₽', d: 'In stock and on order' },
        { n: 'Clip-in bangs', p: '12,000 ₽', d: 'In stock and on order' },
        { n: 'Hair on a claw clip', p: '12,000 ₽', d: 'In stock and on order' },
        { n: 'Ponytails on elastic and ribbon', p: '12,000 ₽', d: 'In stock and on order' },
        { n: 'Tangle Teezer brush', p: '2,500 ₽' },
      ],
    },
    {
      group: 'Manicure',
      items: [
        { n: 'Classic manicure with coating', p: '3,200–3,900 ₽' },
        { n: 'Combined manicure', p: '2,100 ₽' },
      ],
    },
  ],

  promos: [
    { t: '10% off first visit', d: 'On all studio services' },
    { t: 'Free consultation', d: 'Length, shade and technique selection — before booking the procedure' },
    { t: 'Free care treatment', d: 'With complex coloring' },
    { t: '10% on Saturdays', d: 'On hair care treatments' },
    { t: '10% off manicure', d: 'With a Top Master' },
  ],

  /* ─── reviews: verbatim from Yandex Maps ──────────────────────── */
  reviews: [
    {
      name: 'Gloria Moore',
      date: 'June 2026',
      text:
        "I have been getting extensions at the Atelier for four years now. In the past I had a bad extension experience and was afraid they would damage my hair. My fears were unfounded. Over these years my hair has become stronger and longer, the extensions have not harmed it at all. The hairstyle looks gorgeous and completely natural (no one suspects it's not mine). The hair is matched so precisely that you can't tell it from my own, and the work is so microscopic that even on close inspection the capsules are hard to spot."
    },
    {
      name: 'Kamila Kh.',
      date: 'April 2025',
      text:
        "I have been getting hair extensions for many years, during this time I have been to various masters in Sochi and I know what poor-quality work looks like. In one salon capsules fell out and stayed on the comb. In another I bought \"luxury\" hair, and after the first wash it turned into a washcloth — I removed it the very next day. A friend recommended this studio, I have been doing corrections here for a year and am satisfied with everything. I bought hair from them once and still wear it."
    },
    {
      name: 'Varvara Skryabina',
      date: 'June 2026',
      text:
        "As a birthday gift I booked my mom for hair extensions, and the result exceeded all our expectations. The work is simply exquisite — so neat and natural that it's hard to believe it's extensions. The most valuable thing for me is my mom's emotions. When she saw herself in the mirror, she couldn't hold back tears."
    },
    {
      name: 'Ksenia Roenko',
      date: 'April 2025',
      text:
        "I got extensions at this salon, found it on maps, urgently needed it before leaving. They booked me for a consultation, explained everything, offered Hollywood extensions — before I had only heard about capsules. I absolutely loved it: firstly, correction is much more profitable, secondly, it's completely invisible."
    },
    {
      name: 'Kis',
      date: 'July 2026',
      text:
        "I got extensions with Top Master Inessa. First she gave a detailed consultation, helped decide on length and shade, calmly explained everything. In the end the hair looks very natural, I almost don't feel the capsules at all."
    },
    {
      name: 'Anna Chevychelova',
      date: 'June 2026',
      text:
        "Wonderful master Inessa did Hollywood extensions on 3 wefts for me — simply super volume. I have very sparse and thin hair, but thanks to the master's golden hands I am now the owner of a luxurious mane. And the hair for sale is absolutely amazing in quality."
    },
    {
      name: 'Marina A.',
      date: 'April 2025',
      text:
        "Something terrible happened to my hair: within a month it simply broke off almost all over my head. The girls were very attentive to my problem, selected hair, did everything very neatly. It's completely invisible that I had short hair somewhere, and they matched the color very well."
    },
    {
      name: 'Lyubov Nikolaeva',
      date: 'September 2025',
      text:
        "I had highlights, but the hair quality, honestly, was terrible. I really wanted total blonde, but was afraid the last hair would break. In the end the masters of this salon dyed me total blonde, did a treatment and added gorgeous extensions. I was very satisfied."
    },
    {
      name: 'Natalya P.',
      date: 'April 2025',
      text:
        "I had complex coloring and extension of the temple area. I was very pleased with the result. The quality of the selected hair is delightful: after washing the hair retained its quality, as with extensions."
    },
    {
      name: 'Elena Guletskaya',
      date: 'May 2025',
      text:
        "I rarely write reviews, and never about beauty salons, but this time I was simply struck by the work of master Yulia. She is a super-professional, a colorist who understands the client's wishes instantly. And the haircut was also done gorgeously."
    },
    {
      name: 'Zinaida Proshak',
      date: 'April 2025',
      text:
        "The girls are polite and pleasant, they always walk you in, show you everything, answer all questions. The masters are experienced, they do their work 10 out of 10. I especially want to thank master Vlada for beautiful hair: she understands instantly, works quickly and flawlessly."
    },
    {
      name: 'Koroleva_vysoti',
      date: 'March 2026',
      text:
        "Master Anastasia works with such heart that the room is always incredibly cozy, you rest both body and mind. Separate love — the hospitality. The coffee here is insanely delicious even with alternative milk, and with it they always bring a whole plate of joy: chocolate, cookies, and nuts."
    },
  ],

  /* ─── masters: only those mentioned by clients in reviews ── */
  masters: [
    { name: 'Inessa', role: 'Top Master in extensions', note: 'Capsule and Hollywood, length and shade matching' },
    { name: 'Vlada', role: 'Extension Master' },
    { name: 'Marina', role: 'Extension Master', note: 'Founder of the studio' },
    { name: 'Yulia', role: 'Colorist, haircuts' },
    { name: 'Alyona', role: 'Hairdresser-stylist' },
    { name: 'Anastasia', role: 'Manicure Master' },
    { name: 'Sofia', role: 'Manicure Master' },
    { name: 'Alina', role: 'Manicure Master' },
  ],

  /* ─── amenities (from Yandex listing) ─────────────── */
  comforts: [
    'Coffee and complimentary menu',
    'Wi-Fi',
    'Parking',
    'Dog-friendly up to 35 cm',
    'Card, SBP, installment payments',
    'Gift certificate',
    'Several procedures at once',
  ],

  /* ─── gallery: 129 photos, manually categorized ──────── */
  galleryLabels: {
    works: 'Works',
    hair: 'Hair',
    process: 'Process',
    studio: 'Studio',
    care: 'Care',
  },
  gallery: {
    works: [3, 6, 15, 16, 18, 20, 25, 37, 38, 40, 41, 42, 44, 46, 48, 49, 50, 52, 53, 55, 56, 57, 58, 60, 62, 67, 70, 74, 90, 94, 96, 97, 101, 103, 104, 108, 109, 110, 111, 112, 116, 121, 124, 128],
    hair: [1, 4, 5, 9, 11, 22, 31, 51, 54, 88, 89, 100, 122, 127],
    process: [8, 14, 19, 24, 27, 61, 64, 65, 66, 71, 72, 75, 95, 98, 102, 105, 106, 114],
    studio: [2, 7, 12, 13, 21, 28, 29, 30, 32, 33, 34, 35, 36, 39, 43, 63, 73, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 91, 92, 93, 107, 115, 119],
    care: [10, 17, 23, 26, 45, 59, 68, 69, 86, 87, 99],
  },
  /* route from the street to the door — for the 'how to find us' block */
  wayfinding: [129, 126, 125, 113],
  heroPhotos: [6, 57, 1],
};
