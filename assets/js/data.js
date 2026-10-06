window.ADAM = {
  branches: {
    athaiba: { en: 'Al Athaiba', ar: 'العذيبة', phone: '00000000000', display: '+000 0000 0000' },
    mawaleh: { en: 'Al Mawaleh', ar: 'الموالح', phone: '00000000000', display: '+000 0000 0000' }
  },
  categories: [
    { id: 'breads', en: 'Breads', ar: 'الخبز', den: 'Baked fresh every morning.', dar: 'يُخبز طازجاً كل صباح.' },
    { id: 'manakish', en: 'Manakish', ar: 'المناقيش', den: 'Straight from the oven, the way Muscat loves it.', dar: 'من الفرن مباشرة، كما تحبها مسقط.' },
    { id: 'pastries', en: 'Croissants & pastries', ar: 'الكرواسان والمعجنات', den: 'Flaky, buttery and crisp.', dar: 'هشّة، مقرمشة وبتذوب بالفم.' },
    { id: 'sandwiches', en: 'Sandwiches', ar: 'الساندويتشات', den: 'Made daily with fresh ingredients.', dar: 'تُحضّر يومياً بمكونات طازجة.' },
    { id: 'sweets', en: 'Arabic sweets', ar: 'الحلويات العربية', den: 'Kunafa, maamoul and more.', dar: 'كنافة، معمول والمزيد.' },
    { id: 'cakes', en: 'Cakes', ar: 'الكيك', den: 'For birthdays, gatherings and every celebration.', dar: 'لأعياد الميلاد والتجمعات وكل المناسبات.' }
  ],
  items: [
    { id: 'lebanese-bread', cat: 'breads', img: 'bread', en: 'Lebanese bread', ar: 'خبز لبناني', den: 'Soft, fresh pita for the family table.', dar: 'خبز طري وطازج لسفرة العائلة.', fav: true },
    { id: 'samoon', cat: 'breads', en: 'Samoon bread', ar: 'خبز صمون', den: 'Classic oven-baked samoon.', dar: 'صمون كلاسيكي من الفرن.' },
    { id: 'chocolate-samoon', cat: 'breads', en: 'Chocolate samoon', ar: 'صمون بالشوكولاتة', den: 'Soft samoon filled with chocolate.', dar: 'صمون طري محشو بالشوكولاتة.' },

    { id: 'zaatar-cheese', cat: 'manakish', en: 'Cheese & zaatar manakish', ar: 'مناقيش جبنة وزعتر', den: 'A customer favourite.', dar: 'المفضّلة لدى زبائننا.', tag: { en: 'Best seller', ar: 'الأكثر طلباً' } },
    { id: 'akkawi', cat: 'manakish', en: 'Akkawi cheese manakish', ar: 'مناقيش جبنة عكاوي', den: 'Melted akkawi on fresh dough.', dar: 'جبنة عكاوي ذائبة على عجينة طازجة.' },
    { id: 'meat-manakish', cat: 'manakish', en: 'Meat manakish', ar: 'مناقيش لحم', den: 'Seasoned minced meat, baked crisp.', dar: 'لحم مفروم متبّل ومخبوز مقرمش.' },
    { id: 'tomato-onion', cat: 'manakish', en: 'Tomato & onion manakish', ar: 'مناقيش طماطم وبصل', den: 'Fresh, light and tasty.', dar: 'طازجة وخفيفة ولذيذة.' },
    { id: 'red-pepper', cat: 'manakish', img: 'manakish', en: 'Red pepper & sesame manakish', ar: 'مناقيش فليفلة وسمسم', den: 'Spiced red pepper paste topped with sesame.', dar: 'معجون الفليفلة المتبّل مع السمسم.' },

    { id: 'croissant', cat: 'pastries', img: 'croissant-cut', en: 'Butter croissant', ar: 'كرواسان بالزبدة', den: 'Flaky, crisp and melts in the mouth.', dar: 'هش، مقرمش وبيذوب بالفم.', fav: true },
    { id: 'croissant-seeds', cat: 'pastries', img: 'croissant-seeds', en: 'Black seed croissant', ar: 'كرواسان بحبة البركة', den: 'Topped with nigella seeds.', dar: 'مزيّن بحبة البركة.', fav: true },
    { id: 'croissant-caramel', cat: 'pastries', img: 'croissant-caramel', en: 'Caramel crunch croissant', ar: 'كرواسان كراميل مقرمش', den: 'Creamy caramel with a crunchy crumble.', dar: 'كراميل كريمي مع فتات مقرمش.', fav: true },
    { id: 'cheese-croissant', cat: 'pastries', en: 'Cheese croissant', ar: 'كرواسان بالجبنة', den: 'A breakfast classic.', dar: 'كلاسيكي للفطور.' },
    { id: 'cherry-danish', cat: 'pastries', img: 'danish', en: 'Cherry danish', ar: 'دانش بالكرز', den: 'Light and fluffy, with a cherry centre.', dar: 'خفيفة وهشة مع حشوة الكرز.', fav: true },
    { id: 'raisin-swirl', cat: 'pastries', img: 'pastries', en: 'Breakfast pastry selection', ar: 'تشكيلة معجنات الفطور', den: 'Raisin swirls, twists and more.', dar: 'رول الزبيب والمزيد.' },

    { id: 'turkey-sandwich', cat: 'sandwiches', img: 'sandwich-turkey', en: 'Cold cuts sandwich', ar: 'ساندويتش لحوم باردة', den: 'Soft roll, fresh lettuce.', dar: 'خبز طري مع خس طازج.' },
    { id: 'mini-sandwiches', cat: 'sandwiches', img: 'sandwich-trio', en: 'Mini sandwich trio', ar: 'ثلاثي الساندويتش الصغير', den: 'Baked daily, perfect for the office.', dar: 'مخبوز يومياً، مثالي للمكتب.', fav: true },
    { id: 'cheese-olive', cat: 'sandwiches', img: 'sandwich-cheese', en: 'Cream cheese & olive sandwich', ar: 'ساندويتش جبنة وزيتون', den: 'Fresh ingredients, simple and tasty.', dar: 'مكونات طازجة، بسيط ولذيذ.' },
    { id: 'falafel', cat: 'sandwiches', en: 'Falafel sandwich', ar: 'ساندويتش فلافل', den: 'Crispy falafel in fresh bread.', dar: 'فلافل مقرمشة في خبز طازج.' },

    { id: 'kunafa', cat: 'sweets', img: 'kunafa', en: 'Kunafa', ar: 'كنافة', den: 'Stretchy cheese kunafa, made daily.', dar: 'كنافة بالجبنة، تُحضّر يومياً.', tag: { en: 'Daily at Al Athaiba', ar: 'يومياً في العذيبة' }, fav: true },
    { id: 'ward-alsham', cat: 'sweets', img: 'ward-alsham', en: 'Ward Al Sham', ar: 'ورد الشام', den: 'Crisp layers topped with pistachio.', dar: 'طبقات مقرمشة مع الفستق.', fav: true },
    { id: 'maamoul', cat: 'sweets', img: 'maamoul', en: 'Pistachio maamoul', ar: 'معمول بالفستق', den: 'The taste of Eid.', dar: 'طعم العيد.' },
    { id: 'qatayef', cat: 'sweets', img: 'qatayef', en: 'Qatayef', ar: 'قطايف', den: 'A Ramadan favourite.', dar: 'المفضّلة في رمضان.', tag: { en: 'Ramadan', ar: 'رمضان' } },
    { id: 'shamiyat', cat: 'sweets', en: 'Date shamiyat', ar: 'شاميات بالتمر', den: 'Sweet, crunchy and filled with dates.', dar: 'حلوة ومقرمشة ومحشوة بالتمر.' },

    { id: 'chocolate-cake', cat: 'cakes', img: 'cake', en: 'Chocolate strawberry cake', ar: 'كيك شوكولاتة بالفراولة', den: 'Rich chocolate, fresh strawberries, hazelnuts.', dar: 'شوكولاتة غنية مع فراولة طازجة وبندق.', fav: true },
    { id: 'custom-cake', cat: 'cakes', en: 'Custom celebration cake', ar: 'كيك مناسبات حسب الطلب', den: 'Tell us the size, flavour and message.', dar: 'أخبرنا بالحجم والنكهة والعبارة.' }
  ]
};
