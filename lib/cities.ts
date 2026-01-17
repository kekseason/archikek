// lib/cities.ts
// Popüler mimarlık/kentsel tasarım şehirleri
// Her şehir Google'da ayrı indexlenecek

export interface City {
  slug: string
  name: string
  country: string
  lat: number
  lng: number
  description: string
  keywords: string[]
  population?: number
  famous_for?: string
}

export const CITIES: City[] = [
  // ============ EUROPE ============
  {
    slug: 'barcelona',
    name: 'Barcelona',
    country: 'Spain',
    lat: 41.3851,
    lng: 2.1734,
    description: 'Famous for its Eixample grid by Ildefons Cerdà and Gaudí architecture',
    keywords: ['eixample', 'gaudi', 'grid plan', 'superblocks'],
    famous_for: 'Eixample grid pattern'
  },
  {
    slug: 'paris',
    name: 'Paris',
    country: 'France',
    lat: 48.8566,
    lng: 2.3522,
    description: 'Haussmann boulevards and radial urban planning masterpiece',
    keywords: ['haussmann', 'boulevards', 'radial plan', 'arrondissements'],
    famous_for: 'Haussmann boulevards'
  },
  {
    slug: 'rome',
    name: 'Rome',
    country: 'Italy',
    lat: 41.9028,
    lng: 12.4964,
    description: 'Ancient urban fabric with layers of history from Roman Empire to Renaissance',
    keywords: ['ancient rome', 'piazza', 'historic center', 'nolli map'],
    famous_for: 'Original Nolli Map (1748)'
  },
  {
    slug: 'amsterdam',
    name: 'Amsterdam',
    country: 'Netherlands',
    lat: 52.3676,
    lng: 4.9041,
    description: 'Concentric canal ring system, UNESCO World Heritage',
    keywords: ['canals', 'grachtengordel', 'dutch urbanism'],
    famous_for: 'Canal ring system'
  },
  {
    slug: 'london',
    name: 'London',
    country: 'United Kingdom',
    lat: 51.5074,
    lng: -0.1278,
    description: 'Organic medieval street pattern with Georgian squares',
    keywords: ['squares', 'georgian', 'organic growth', 'the city'],
    famous_for: 'Georgian squares'
  },
  {
    slug: 'berlin',
    name: 'Berlin',
    country: 'Germany',
    lat: 52.5200,
    lng: 13.4050,
    description: 'Post-war reconstruction and reunification urbanism',
    keywords: ['reunification', 'plattenbau', 'kreuzberg', 'mitte'],
    famous_for: 'Post-reunification planning'
  },
  {
    slug: 'vienna',
    name: 'Vienna',
    country: 'Austria',
    lat: 48.2082,
    lng: 16.3738,
    description: 'Ringstrasse boulevard and social housing innovations',
    keywords: ['ringstrasse', 'karl marx hof', 'social housing'],
    famous_for: 'Ringstrasse'
  },
  {
    slug: 'copenhagen',
    name: 'Copenhagen',
    country: 'Denmark',
    lat: 55.6761,
    lng: 12.5683,
    description: 'Finger Plan and bicycle-friendly urban design',
    keywords: ['finger plan', 'bicycle', 'sustainable', 'gehl'],
    famous_for: 'Finger Plan'
  },
  {
    slug: 'lisbon',
    name: 'Lisbon',
    country: 'Portugal',
    lat: 38.7223,
    lng: -9.1393,
    description: 'Pombaline grid in Baixa after 1755 earthquake',
    keywords: ['baixa', 'pombaline', 'earthquake reconstruction'],
    famous_for: 'Pombaline reconstruction'
  },
  {
    slug: 'prague',
    name: 'Prague',
    country: 'Czech Republic',
    lat: 50.0755,
    lng: 14.4378,
    description: 'Preserved medieval old town with baroque additions',
    keywords: ['old town', 'medieval', 'baroque', 'vltava'],
    famous_for: 'Medieval old town'
  },
  {
    slug: 'milan',
    name: 'Milan',
    country: 'Italy',
    lat: 45.4642,
    lng: 9.1900,
    description: 'Roman grid meets modern design capital',
    keywords: ['duomo', 'navigli', 'design district'],
    famous_for: 'Design capital'
  },
  {
    slug: 'madrid',
    name: 'Madrid',
    country: 'Spain',
    lat: 40.4168,
    lng: -3.7038,
    description: 'Habsburg and Bourbon royal planning legacy',
    keywords: ['gran via', 'plaza mayor', 'paseo'],
    famous_for: 'Gran Vía'
  },
  {
    slug: 'athens',
    name: 'Athens',
    country: 'Greece',
    lat: 37.9838,
    lng: 23.7275,
    description: 'Ancient agora meets neoclassical modern city',
    keywords: ['acropolis', 'plaka', 'neoclassical'],
    famous_for: 'Ancient urban planning'
  },
  {
    slug: 'stockholm',
    name: 'Stockholm',
    country: 'Sweden',
    lat: 59.3293,
    lng: 18.0686,
    description: 'Island archipelago urbanism with ABC planning',
    keywords: ['gamla stan', 'archipelago', 'abc towns'],
    famous_for: 'ABC satellite towns'
  },
  {
    slug: 'helsinki',
    name: 'Helsinki',
    country: 'Finland',
    lat: 60.1699,
    lng: 24.9384,
    description: 'Neoclassical Senate Square and modern Finnish design',
    keywords: ['senate square', 'engel', 'aalto'],
    famous_for: 'Finnish modernism'
  },
  {
    slug: 'munich',
    name: 'Munich',
    country: 'Germany',
    lat: 48.1351,
    lng: 11.5820,
    description: 'Bavarian royal planning with modern Olympic legacy',
    keywords: ['marienplatz', 'olympic park', 'english garden'],
    famous_for: 'Olympic Park planning'
  },
  {
    slug: 'zurich',
    name: 'Zurich',
    country: 'Switzerland',
    lat: 47.3769,
    lng: 8.5417,
    description: 'Compact Swiss urbanism around lake and river',
    keywords: ['altstadt', 'bahnhofstrasse', 'swiss planning'],
    famous_for: 'Swiss precision planning'
  },
  {
    slug: 'florence',
    name: 'Florence',
    country: 'Italy',
    lat: 43.7696,
    lng: 11.2558,
    description: 'Renaissance birthplace with intact historic center',
    keywords: ['renaissance', 'duomo', 'ponte vecchio', 'arno'],
    famous_for: 'Renaissance urban design'
  },
  {
    slug: 'venice',
    name: 'Venice',
    country: 'Italy',
    lat: 45.4408,
    lng: 12.3155,
    description: 'Unique car-free island urbanism on water',
    keywords: ['canals', 'car-free', 'biennale', 'islands'],
    famous_for: 'Car-free water urbanism'
  },
  {
    slug: 'porto',
    name: 'Porto',
    country: 'Portugal',
    lat: 41.1579,
    lng: -8.6291,
    description: 'UNESCO riverside historic center',
    keywords: ['ribeira', 'douro', 'azulejos'],
    famous_for: 'Ribeira waterfront'
  },
  {
    slug: 'oslo',
    name: 'Oslo',
    country: 'Norway',
    lat: 59.9139,
    lng: 10.7522,
    description: 'Fjord city with ambitious waterfront redevelopment',
    keywords: ['opera house', 'barcode', 'fjord city'],
    famous_for: 'Barcode waterfront'
  },
  {
    slug: 'dublin',
    name: 'Dublin',
    country: 'Ireland',
    lat: 53.3498,
    lng: -6.2603,
    description: 'Georgian architecture and Liffey riverside',
    keywords: ['georgian', 'liffey', 'temple bar'],
    famous_for: 'Georgian Dublin'
  },
  {
    slug: 'brussels',
    name: 'Brussels',
    country: 'Belgium',
    lat: 50.8503,
    lng: 4.3517,
    description: 'Art Nouveau heritage and EU quarter',
    keywords: ['grand place', 'art nouveau', 'eu quarter'],
    famous_for: 'Art Nouveau architecture'
  },
  {
    slug: 'budapest',
    name: 'Budapest',
    country: 'Hungary',
    lat: 47.4979,
    lng: 19.0402,
    description: 'Danube-divided twin city with thermal bath culture',
    keywords: ['danube', 'buda', 'pest', 'andrassy'],
    famous_for: 'Danube riverfront'
  },
  {
    slug: 'warsaw',
    name: 'Warsaw',
    country: 'Poland',
    lat: 52.2297,
    lng: 21.0122,
    description: 'Post-war reconstruction of historic old town',
    keywords: ['reconstruction', 'old town', 'socialist realism'],
    famous_for: 'Historic reconstruction'
  },
  
  // ============ NORTH AMERICA ============
  {
    slug: 'new-york',
    name: 'New York',
    country: 'USA',
    lat: 40.7128,
    lng: -74.0060,
    description: 'Manhattan grid plan of 1811 and Central Park',
    keywords: ['manhattan grid', 'central park', 'times square', 'high line'],
    famous_for: 'Manhattan grid (1811)'
  },
  {
    slug: 'chicago',
    name: 'Chicago',
    country: 'USA',
    lat: 41.8781,
    lng: -87.6298,
    description: 'Birthplace of skyscrapers and Burnham Plan',
    keywords: ['burnham plan', 'skyscrapers', 'lake michigan', 'loop'],
    famous_for: 'Burnham Plan (1909)'
  },
  {
    slug: 'san-francisco',
    name: 'San Francisco',
    country: 'USA',
    lat: 37.7749,
    lng: -122.4194,
    description: 'Hilly grid with painted ladies and cable cars',
    keywords: ['hills', 'painted ladies', 'embarcadero', 'mission'],
    famous_for: 'Hilly street grid'
  },
  {
    slug: 'washington-dc',
    name: 'Washington D.C.',
    country: 'USA',
    lat: 38.9072,
    lng: -77.0369,
    description: "L'Enfant Plan with monumental diagonal avenues",
    keywords: ['lenfant plan', 'mall', 'diagonal avenues', 'capitol'],
    famous_for: "L'Enfant Plan"
  },
  {
    slug: 'boston',
    name: 'Boston',
    country: 'USA',
    lat: 42.3601,
    lng: -71.0589,
    description: 'Organic colonial streets meet Back Bay grid',
    keywords: ['back bay', 'beacon hill', 'freedom trail'],
    famous_for: 'Back Bay landfill grid'
  },
  {
    slug: 'los-angeles',
    name: 'Los Angeles',
    country: 'USA',
    lat: 34.0522,
    lng: -118.2437,
    description: 'Sprawling car-oriented polycentricity',
    keywords: ['sprawl', 'freeways', 'downtown', 'hollywood'],
    famous_for: 'Car-oriented sprawl'
  },
  {
    slug: 'toronto',
    name: 'Toronto',
    country: 'Canada',
    lat: 43.6532,
    lng: -79.3832,
    description: 'Concession road grid with diverse neighborhoods',
    keywords: ['concession roads', 'ravines', 'neighborhoods'],
    famous_for: 'Concession road system'
  },
  {
    slug: 'vancouver',
    name: 'Vancouver',
    country: 'Canada',
    lat: 49.2827,
    lng: -123.1207,
    description: 'Vancouverism high-density waterfront towers',
    keywords: ['vancouverism', 'towers', 'stanley park', 'density'],
    famous_for: 'Vancouverism'
  },
  {
    slug: 'montreal',
    name: 'Montreal',
    country: 'Canada',
    lat: 45.5017,
    lng: -73.5673,
    description: 'French colonial grid with underground city',
    keywords: ['underground city', 'mount royal', 'plateau'],
    famous_for: 'Underground city (RÉSO)'
  },
  {
    slug: 'mexico-city',
    name: 'Mexico City',
    country: 'Mexico',
    lat: 19.4326,
    lng: -99.1332,
    description: 'Aztec Tenochtitlan foundations with colonial overlay',
    keywords: ['zocalo', 'reforma', 'tenochtitlan', 'colonial'],
    famous_for: 'Aztec-colonial layering'
  },
  {
    slug: 'havana',
    name: 'Havana',
    country: 'Cuba',
    lat: 23.1136,
    lng: -82.3666,
    description: 'Preserved colonial Spanish grid frozen in time',
    keywords: ['malecon', 'habana vieja', 'colonial'],
    famous_for: 'Preserved colonial center'
  },
  
  // ============ ASIA ============
  {
    slug: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    lat: 35.6762,
    lng: 139.6503,
    description: 'Organic growth with intense mixed-use density',
    keywords: ['shibuya', 'shinjuku', 'organic', 'density'],
    famous_for: 'Organic dense urbanism'
  },
  {
    slug: 'kyoto',
    name: 'Kyoto',
    country: 'Japan',
    lat: 35.0116,
    lng: 135.7681,
    description: 'Ancient Chinese-inspired grid preserved for centuries',
    keywords: ['heian', 'machiya', 'temples', 'grid'],
    famous_for: 'Heian period grid'
  },
  {
    slug: 'singapore',
    name: 'Singapore',
    country: 'Singapore',
    lat: 1.3521,
    lng: 103.8198,
    description: 'Master-planned city-state with HDB public housing',
    keywords: ['hdb', 'marina bay', 'garden city', 'planning'],
    famous_for: 'Master-planned city-state'
  },
  {
    slug: 'hong-kong',
    name: 'Hong Kong',
    country: 'China',
    lat: 22.3193,
    lng: 114.1694,
    description: 'Extreme vertical density on hilly terrain',
    keywords: ['vertical', 'density', 'kowloon', 'victoria peak'],
    famous_for: 'Extreme vertical density'
  },
  {
    slug: 'shanghai',
    name: 'Shanghai',
    country: 'China',
    lat: 31.2304,
    lng: 121.4737,
    description: 'Bund colonial heritage meets Pudong supertalls',
    keywords: ['bund', 'pudong', 'lilong', 'french concession'],
    famous_for: 'Bund and Pudong contrast'
  },
  {
    slug: 'beijing',
    name: 'Beijing',
    country: 'China',
    lat: 39.9042,
    lng: 116.4074,
    description: 'Imperial grid with hutong courtyard neighborhoods',
    keywords: ['forbidden city', 'hutong', 'ring roads', 'axis'],
    famous_for: 'Imperial axis and hutongs'
  },
  {
    slug: 'seoul',
    name: 'Seoul',
    country: 'South Korea',
    lat: 37.5665,
    lng: 126.9780,
    description: 'Rapid modernization with hanok village preservation',
    keywords: ['gangnam', 'hanok', 'cheonggyecheon', 'han river'],
    famous_for: 'Cheonggyecheon restoration'
  },
  {
    slug: 'dubai',
    name: 'Dubai',
    country: 'UAE',
    lat: 25.2048,
    lng: 55.2708,
    description: 'Rapid development with iconic artificial islands',
    keywords: ['palm jumeirah', 'burj khalifa', 'marina'],
    famous_for: 'Palm Jumeirah'
  },
  {
    slug: 'istanbul',
    name: 'Istanbul',
    country: 'Turkey',
    lat: 41.0082,
    lng: 28.9784,
    description: 'Bosphorus-divided historic peninsula',
    keywords: ['sultanahmet', 'bosphorus', 'galata', 'bazaar'],
    famous_for: 'Historic peninsula'
  },
  {
    slug: 'mumbai',
    name: 'Mumbai',
    country: 'India',
    lat: 19.0760,
    lng: 72.8777,
    description: 'Colonial fort area meets informal settlements',
    keywords: ['fort', 'marine drive', 'dharavi', 'chawls'],
    famous_for: 'Art Deco Marine Drive'
  },
  {
    slug: 'delhi',
    name: 'Delhi',
    country: 'India',
    lat: 28.6139,
    lng: 77.2090,
    description: 'Lutyens Delhi colonial capital meets Old Delhi',
    keywords: ['lutyens', 'connaught place', 'old delhi', 'chandni chowk'],
    famous_for: 'Lutyens Delhi'
  },
  {
    slug: 'bangkok',
    name: 'Bangkok',
    country: 'Thailand',
    lat: 13.7563,
    lng: 100.5018,
    description: 'Canal city transformed with elevated transit',
    keywords: ['klongs', 'bts', 'sukhumvit', 'rattanakosin'],
    famous_for: 'Canal (klong) urbanism'
  },
  {
    slug: 'hanoi',
    name: 'Hanoi',
    country: 'Vietnam',
    lat: 21.0285,
    lng: 105.8542,
    description: 'French colonial quarter with tube house old quarter',
    keywords: ['old quarter', 'french quarter', 'tube houses'],
    famous_for: 'Tube house old quarter'
  },
  {
    slug: 'taipei',
    name: 'Taipei',
    country: 'Taiwan',
    lat: 25.0330,
    lng: 121.5654,
    description: 'Japanese colonial grid with night market culture',
    keywords: ['xinyi', 'night markets', 'dadaocheng'],
    famous_for: 'Night market urbanism'
  },
  {
    slug: 'tel-aviv',
    name: 'Tel Aviv',
    country: 'Israel',
    lat: 32.0853,
    lng: 34.7818,
    description: 'Bauhaus White City UNESCO heritage',
    keywords: ['white city', 'bauhaus', 'rothschild', 'neve tzedek'],
    famous_for: 'Bauhaus White City'
  },
  {
    slug: 'jerusalem',
    name: 'Jerusalem',
    country: 'Israel',
    lat: 31.7683,
    lng: 35.2137,
    description: 'Ancient walled old city with religious quarters',
    keywords: ['old city', 'quarters', 'walls', 'temple mount'],
    famous_for: 'Walled old city'
  },
  
  // ============ SOUTH AMERICA ============
  {
    slug: 'buenos-aires',
    name: 'Buenos Aires',
    country: 'Argentina',
    lat: -34.6037,
    lng: -58.3816,
    description: 'European-style grid with wide Avenida 9 de Julio',
    keywords: ['9 de julio', 'san telmo', 'la boca', 'recoleta'],
    famous_for: 'Avenida 9 de Julio'
  },
  {
    slug: 'rio-de-janeiro',
    name: 'Rio de Janeiro',
    country: 'Brazil',
    lat: -22.9068,
    lng: -43.1729,
    description: 'Beach urbanism squeezed between mountains and sea',
    keywords: ['copacabana', 'favelas', 'corcovado', 'beaches'],
    famous_for: 'Beach-mountain urbanism'
  },
  {
    slug: 'sao-paulo',
    name: 'São Paulo',
    country: 'Brazil',
    lat: -23.5505,
    lng: -46.6333,
    description: 'Massive South American megacity with vertical growth',
    keywords: ['paulista', 'jardins', 'pinheiros', 'megacity'],
    famous_for: 'Vertical megacity'
  },
  {
    slug: 'bogota',
    name: 'Bogotá',
    country: 'Colombia',
    lat: 4.7110,
    lng: -74.0721,
    description: 'TransMilenio BRT pioneer with ciclovía tradition',
    keywords: ['transmilenio', 'ciclovia', 'candelaria', 'usaquen'],
    famous_for: 'TransMilenio BRT'
  },
  {
    slug: 'lima',
    name: 'Lima',
    country: 'Peru',
    lat: -12.0464,
    lng: -77.0428,
    description: 'Colonial grid centro with Miraflores coastal district',
    keywords: ['miraflores', 'barranco', 'centro historico'],
    famous_for: 'Colonial historic center'
  },
  {
    slug: 'santiago',
    name: 'Santiago',
    country: 'Chile',
    lat: -33.4489,
    lng: -70.6693,
    description: 'Andean valley city with clear grid structure',
    keywords: ['providencia', 'las condes', 'bellavista', 'andes'],
    famous_for: 'Andean valley grid'
  },
  {
    slug: 'medellin',
    name: 'Medellín',
    country: 'Colombia',
    lat: 6.2442,
    lng: -75.5812,
    description: 'Urban transformation with metrocable and escalators',
    keywords: ['metrocable', 'comuna 13', 'urban acupuncture'],
    famous_for: 'Metrocable transformation'
  },
  
  // ============ AFRICA & MIDDLE EAST ============
  {
    slug: 'cairo',
    name: 'Cairo',
    country: 'Egypt',
    lat: 30.0444,
    lng: 31.2357,
    description: 'Islamic Cairo maze meets Haussmann-inspired downtown',
    keywords: ['islamic cairo', 'khan el khalili', 'downtown', 'nile'],
    famous_for: 'Islamic Cairo'
  },
  {
    slug: 'marrakech',
    name: 'Marrakech',
    country: 'Morocco',
    lat: 31.6295,
    lng: -7.9811,
    description: 'Medina labyrinth with Jemaa el-Fnaa square',
    keywords: ['medina', 'jemaa el fnaa', 'souks', 'riads'],
    famous_for: 'Medina labyrinth'
  },
  {
    slug: 'cape-town',
    name: 'Cape Town',
    country: 'South Africa',
    lat: -33.9249,
    lng: 18.4241,
    description: 'Colonial grid at Table Mountain base',
    keywords: ['table mountain', 'waterfront', 'bo-kaap'],
    famous_for: 'Table Mountain setting'
  },
  {
    slug: 'johannesburg',
    name: 'Johannesburg',
    country: 'South Africa',
    lat: -26.2041,
    lng: 28.0473,
    description: 'Mining town turned African economic hub',
    keywords: ['maboneng', 'soweto', 'sandton', 'cbd'],
    famous_for: 'Post-apartheid regeneration'
  },
  
  // ============ OCEANIA ============
  {
    slug: 'sydney',
    name: 'Sydney',
    country: 'Australia',
    lat: -33.8688,
    lng: 151.2093,
    description: 'Harbor city with iconic Opera House and bridge',
    keywords: ['opera house', 'harbour', 'rocks', 'cbd'],
    famous_for: 'Harbor urbanism'
  },
  {
    slug: 'melbourne',
    name: 'Melbourne',
    country: 'Australia',
    lat: -37.8136,
    lng: 144.9631,
    description: 'Hoddle Grid with famous laneway culture',
    keywords: ['hoddle grid', 'laneways', 'federation square'],
    famous_for: 'Laneway culture'
  },
  {
    slug: 'auckland',
    name: 'Auckland',
    country: 'New Zealand',
    lat: -36.8509,
    lng: 174.7645,
    description: 'Volcanic isthmus city between two harbors',
    keywords: ['volcanoes', 'harbours', 'waterfront'],
    famous_for: 'Volcanic urbanism'
  },
  
  // ============ TURKEY (Detailed) ============
  {
    slug: 'ankara',
    name: 'Ankara',
    country: 'Turkey',
    lat: 39.9334,
    lng: 32.8597,
    description: 'Planned republican capital by Jansen Plan',
    keywords: ['jansen plan', 'kizilay', 'ulus', 'republican'],
    famous_for: 'Jansen master plan'
  },
  {
    slug: 'izmir',
    name: 'Izmir',
    country: 'Turkey',
    lat: 38.4237,
    lng: 27.1428,
    description: 'Aegean port city with Kordon waterfront',
    keywords: ['kordon', 'alsancak', 'kemeralti', 'aegean'],
    famous_for: 'Kordon waterfront'
  },
  {
    slug: 'antalya',
    name: 'Antalya',
    country: 'Turkey',
    lat: 36.8969,
    lng: 30.7133,
    description: 'Mediterranean coast with Kaleiçi old town',
    keywords: ['kaleici', 'mediterranean', 'old town', 'marina'],
    famous_for: 'Kaleiçi old town'
  },
  {
    slug: 'bursa',
    name: 'Bursa',
    country: 'Turkey',
    lat: 40.1885,
    lng: 29.0610,
    description: 'Ottoman first capital with historic hans and bazaars',
    keywords: ['ottoman', 'uludag', 'hans', 'bazaar'],
    famous_for: 'Early Ottoman capital'
  },
  
  // ============ MORE EUROPEAN CITIES ============
  {
    slug: 'rotterdam',
    name: 'Rotterdam',
    country: 'Netherlands',
    lat: 51.9244,
    lng: 4.4777,
    description: 'Post-war modernist reconstruction with bold architecture',
    keywords: ['reconstruction', 'cube houses', 'markthal', 'erasmus bridge'],
    famous_for: 'Post-war modernism'
  },
  {
    slug: 'antwerp',
    name: 'Antwerp',
    country: 'Belgium',
    lat: 51.2194,
    lng: 4.4025,
    description: 'Diamond district and port city with Art Nouveau',
    keywords: ['grote markt', 'port', 'fashion district'],
    famous_for: 'Diamond district'
  },
  {
    slug: 'bilbao',
    name: 'Bilbao',
    country: 'Spain',
    lat: 43.2630,
    lng: -2.9350,
    description: 'Guggenheim effect urban regeneration',
    keywords: ['guggenheim', 'nervion', 'casco viejo', 'regeneration'],
    famous_for: 'Guggenheim effect'
  },
  {
    slug: 'seville',
    name: 'Seville',
    country: 'Spain',
    lat: 37.3891,
    lng: -5.9845,
    description: 'Moorish-Christian layered old town with Metropol Parasol',
    keywords: ['alcazar', 'metropol parasol', 'santa cruz', 'moorish'],
    famous_for: 'Metropol Parasol'
  },
  {
    slug: 'valencia',
    name: 'Valencia',
    country: 'Spain',
    lat: 39.4699,
    lng: -0.3763,
    description: 'City of Arts and Sciences riverbed transformation',
    keywords: ['city of arts', 'turia', 'old town', 'calatrava'],
    famous_for: 'Turia riverbed park'
  },
  {
    slug: 'lyon',
    name: 'Lyon',
    country: 'France',
    lat: 45.7640,
    lng: 4.8357,
    description: 'Confluence of Rhône and Saône rivers',
    keywords: ['presquile', 'vieux lyon', 'confluence', 'traboules'],
    famous_for: 'Confluence district'
  },
  {
    slug: 'marseille',
    name: 'Marseille',
    country: 'France',
    lat: 43.2965,
    lng: 5.3698,
    description: 'Mediterranean port with Unité d\'Habitation',
    keywords: ['vieux port', 'unite habitation', 'le corbusier', 'panier'],
    famous_for: "Unité d'Habitation"
  },
  {
    slug: 'bordeaux',
    name: 'Bordeaux',
    country: 'France',
    lat: 44.8378,
    lng: -0.5792,
    description: 'UNESCO waterfront with 18th century urban ensemble',
    keywords: ['garonne', 'place de la bourse', 'saint pierre'],
    famous_for: 'UNESCO waterfront'
  },
  {
    slug: 'edinburgh',
    name: 'Edinburgh',
    country: 'United Kingdom',
    lat: 55.9533,
    lng: -3.1883,
    description: 'Medieval Old Town meets Georgian New Town',
    keywords: ['old town', 'new town', 'royal mile', 'princes street'],
    famous_for: 'Old Town / New Town'
  },
  {
    slug: 'glasgow',
    name: 'Glasgow',
    country: 'United Kingdom',
    lat: 55.8642,
    lng: -4.2518,
    description: 'Victorian industrial city with Mackintosh legacy',
    keywords: ['mackintosh', 'merchant city', 'clyde', 'victorian'],
    famous_for: 'Mackintosh architecture'
  },
  {
    slug: 'manchester',
    name: 'Manchester',
    country: 'United Kingdom',
    lat: 53.4808,
    lng: -2.2426,
    description: 'Industrial Revolution birthplace with canal regeneration',
    keywords: ['canals', 'northern quarter', 'castlefield', 'industrial'],
    famous_for: 'Industrial heritage'
  },
  {
    slug: 'hamburg',
    name: 'Hamburg',
    country: 'Germany',
    lat: 53.5511,
    lng: 9.9937,
    description: 'Port city with HafenCity new district',
    keywords: ['hafencity', 'speicherstadt', 'elbphilharmonie', 'port'],
    famous_for: 'HafenCity development'
  },
  {
    slug: 'frankfurt',
    name: 'Frankfurt',
    country: 'Germany',
    lat: 50.1109,
    lng: 8.6821,
    description: 'German financial hub with skyline and Römer',
    keywords: ['skyline', 'romer', 'bankenviertel', 'main'],
    famous_for: 'Mainhattan skyline'
  },
  {
    slug: 'cologne',
    name: 'Cologne',
    country: 'Germany',
    lat: 50.9375,
    lng: 6.9603,
    description: 'Rhine cathedral city with Roman foundations',
    keywords: ['dom', 'rhine', 'altstadt', 'roman'],
    famous_for: 'Cologne Cathedral'
  },
  {
    slug: 'krakow',
    name: 'Krakow',
    country: 'Poland',
    lat: 50.0647,
    lng: 19.9450,
    description: 'Preserved medieval market square and Jewish quarter',
    keywords: ['rynek', 'kazimierz', 'wawel', 'medieval'],
    famous_for: 'Rynek Główny square'
  },
  {
    slug: 'split',
    name: 'Split',
    country: 'Croatia',
    lat: 43.5081,
    lng: 16.4402,
    description: 'Roman Diocletian Palace living old town',
    keywords: ['diocletian', 'palace', 'riva', 'roman'],
    famous_for: 'Diocletian Palace'
  },
  {
    slug: 'dubrovnik',
    name: 'Dubrovnik',
    country: 'Croatia',
    lat: 42.6507,
    lng: 18.0944,
    description: 'Walled medieval city on Adriatic',
    keywords: ['walls', 'old town', 'stradun', 'adriatic'],
    famous_for: 'City walls'
  },
  {
    slug: 'tallinn',
    name: 'Tallinn',
    country: 'Estonia',
    lat: 59.4370,
    lng: 24.7536,
    description: 'Preserved Hanseatic medieval old town',
    keywords: ['old town', 'hanseatic', 'toompea', 'medieval'],
    famous_for: 'Medieval old town'
  },
  {
    slug: 'riga',
    name: 'Riga',
    country: 'Latvia',
    lat: 56.9496,
    lng: 24.1052,
    description: 'Art Nouveau capital with Hanseatic roots',
    keywords: ['art nouveau', 'old riga', 'jugendstil', 'hanseatic'],
    famous_for: 'Art Nouveau district'
  },
  
  // ============ MORE ASIAN CITIES ============
  {
    slug: 'osaka',
    name: 'Osaka',
    country: 'Japan',
    lat: 34.6937,
    lng: 135.5023,
    description: 'Merchant city with castle and Dotonbori',
    keywords: ['dotonbori', 'castle', 'shinsekai', 'namba'],
    famous_for: 'Dotonbori entertainment'
  },
  {
    slug: 'shenzhen',
    name: 'Shenzhen',
    country: 'China',
    lat: 22.5431,
    lng: 114.0579,
    description: 'Rapid urbanization from fishing village to megacity',
    keywords: ['special economic zone', 'tech hub', 'rapid growth'],
    famous_for: 'Fastest urbanization'
  },
  {
    slug: 'kuala-lumpur',
    name: 'Kuala Lumpur',
    country: 'Malaysia',
    lat: 3.1390,
    lng: 101.6869,
    description: 'Petronas Towers and colonial Merdeka Square',
    keywords: ['petronas', 'merdeka', 'bukit bintang', 'colonial'],
    famous_for: 'Petronas Twin Towers'
  },
  {
    slug: 'jakarta',
    name: 'Jakarta',
    country: 'Indonesia',
    lat: -6.2088,
    lng: 106.8456,
    description: 'Massive Indonesian capital with Dutch colonial core',
    keywords: ['kota tua', 'monas', 'dutch colonial', 'megacity'],
    famous_for: 'Dutch colonial old town'
  },
  {
    slug: 'ho-chi-minh-city',
    name: 'Ho Chi Minh City',
    country: 'Vietnam',
    lat: 10.8231,
    lng: 106.6297,
    description: 'French colonial Saigon meets rapid development',
    keywords: ['district 1', 'french colonial', 'ben thanh', 'saigon'],
    famous_for: 'French colonial district'
  },
  {
    slug: 'manila',
    name: 'Manila',
    country: 'Philippines',
    lat: 14.5995,
    lng: 120.9842,
    description: 'Spanish colonial Intramuros and American city beautiful',
    keywords: ['intramuros', 'makati', 'spanish colonial', 'manila bay'],
    famous_for: 'Intramuros walled city'
  },
  {
    slug: 'doha',
    name: 'Doha',
    country: 'Qatar',
    lat: 25.2854,
    lng: 51.5310,
    description: 'Rapid development with cultural district',
    keywords: ['pearl', 'west bay', 'souq waqif', 'cultural district'],
    famous_for: 'Rapid development'
  },
  {
    slug: 'abu-dhabi',
    name: 'Abu Dhabi',
    country: 'UAE',
    lat: 24.4539,
    lng: 54.3773,
    description: 'Planned capital with Saadiyat cultural island',
    keywords: ['saadiyat', 'corniche', 'louvre', 'planned city'],
    famous_for: 'Saadiyat Island'
  }
]

// Slug'dan şehir bul
export function getCityBySlug(slug: string): City | undefined {
  return CITIES.find(city => city.slug === slug)
}

// Tüm slug'ları al (static generation için)
export function getAllCitySlugs(): string[] {
  return CITIES.map(city => city.slug)
}

// Ülkeye göre şehirleri grupla
export function getCitiesByCountry(): Record<string, City[]> {
  return CITIES.reduce((acc, city) => {
    if (!acc[city.country]) {
      acc[city.country] = []
    }
    acc[city.country].push(city)
    return acc
  }, {} as Record<string, City[]>)
}

// Random şehirler (homepage için)
export function getRandomCities(count: number): City[] {
  const shuffled = [...CITIES].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}
