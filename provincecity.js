document.addEventListener('DOMContentLoaded', () => {
    const provinceSelect = document.getElementById('province');
    const citySelect = document.getElementById('city');
    const contactCountrySelect = document.getElementById('contact-country');
    const countryCodeSelect = document.getElementById('country-code');
    const countryOriginSelect = document.getElementById('country-origin');
    const stateOriginSelect = document.getElementById('state-origin');
    const cityOriginSelect = document.getElementById('city-origin');

    // Function to populate dropdown options
    function populateDropdown(selectElement, options) {
        selectElement.innerHTML = '<option value="">Select ' + selectElement.id.replace(/-origin/, '').replace('contact-', '') + '</option>';
        options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option;
            optionElement.textContent = option;
            selectElement.appendChild(optionElement);
        });
    }

    // Function to populate cities/talukas/villages
    function populateCities(citySelect, cityData, parentSelect) {
        citySelect.innerHTML = '<option value="">Select City</option>';
        const parentValue = parentSelect.value;
        if (parentValue && cityData[parentValue]) {
            cityData[parentValue].forEach(city => {
                const option = document.createElement('option');
                option.value = city;
                option.textContent = city;
                citySelect.appendChild(option);
            });
        }
    }

    // Contact countries list (comment out any country to exclude from Contact Country dropdown)
    const contactCountries = [
        "Canada",
        "India"
    ];

    // Origin countries list (comment out any country to exclude from Country of Origin dropdown)
    const originCountries = [
        // "Canada",
        "India"
    ];

    // Country codes for phone numbers
    const countryCodes = [
        "+1", // Canada
        // "+91" // India
    ];

    // Provinces/States by country
    const countryRegions = {
        "Canada": [
            "Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador",
            "Nova Scotia", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan",
            "Northwest Territories", "Nunavut", "Yukon"
        ],
        "India": [
            "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat",
            "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
            "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
            "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
            "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh",
            "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh",
            "Lakshadweep", "Puducherry"
        ]
    };

    // Cities, talukas, and villages by country and region
    const countryCities = {
        "Canada": {
            "Alberta": ["Calgary", "Edmonton", "Red Deer", "Lethbridge", "St. Albert", "Medicine Hat", "Grande Prairie", "Airdrie", "Spruce Grove", "Leduc"],
            "British Columbia": ["Vancouver", "Surrey", "Burnaby", "Richmond", "Abbotsford", "Coquitlam", "Kelowna", "Langley", "Saanich", "Delta"],
            "Manitoba": ["Winnipeg", "Brandon", "Steinbach", "Thompson", "Portage la Prairie"],
            "New Brunswick": ["Fredericton", "Moncton", "Saint John", "Dieppe", "Riverview"],
            "Newfoundland and Labrador": ["St. John's", "Mount Pearl", "Corner Brook"],
            "Nova Scotia": ["Halifax", "Dartmouth", "Sydney", "Truro", "New Glasgow"],
            "Ontario": ["Toronto", "Ottawa", "Mississauga", "Brampton", "Hamilton", "London", "Markham", "Vaughan", "Kitchener", "Windsor"],
            "Prince Edward Island": ["Charlottetown", "Summerside"],
            "Quebec": ["Montréal", "Québec City", "Laval", "Gatineau", "Longueuil"],
            "Saskatchewan": ["Saskatoon", "Regina", "Prince Albert", "Moose Jaw", "Swift Current"],
            "Northwest Territories": ["Yellowknife"],
            "Nunavut": ["Iqaluit"],
            "Yukon": ["Whitehorse"]
        },
    "India": {
        "Andaman & Nicobar Islands": ["Port Blair"],
        "Andhra Pradesh": [
            "Adilabad", "Adoni", "Amadalavalasa", "Amalapuram", "Anakapalle", "Anantapur", "Badepalle",
            "Banganapalle", "Bapatla", "Bellampalle", "Bethamcherla", "Bhadrachalam", "Bhainsa", "Bheemunipatnam",
            "Bhimavaram", "Bhongir", "Bobbili", "Bodhan", "Chilakaluripet", "Chirala", "Chittoor", "Cuddapah",
            "Devarakonda", "Dharmavaram", "Eluru", "Farooqnagar", "Gadwal", "Gooty", "Gudivada", "Gudur",
            "Guntakal", "Guntur", "Hanuman Junction", "Hindupur", "Hyderabad", "Ichchapuram", "Jaggaiahpet",
            "Jagtial", "Jammalamadugu", "Jangaon", "Kadapa", "Kadiri", "Kagaznagar", "Kakinada", "Kalyandurg",
            "Kamareddy", "Kandukur", "Karimnagar", "Kavali", "Khammam", "Koratla", "Kothagudem", "Kothapeta",
            "Kovvur", "Kurnool", "Kyathampalle", "Macherla", "Machilipatnam", "Madanapalle", "Mahbubnagar",
            "Mancherial", "Mandamarri", "Mandapeta", "Manuguru", "Markapur", "Medak", "Miryalaguda", "Mogalthur",
            "Nagari", "Nagarkurnool", "Nandyal", "Narasapur", "Narasaraopet", "Narayanpet", "Narsipatnam",
            "Nellore", "Nidadavole", "Nirmal", "Nizamabad", "Nuzvid", "Ongole", "Palacole", "Palasa Kasibugga",
            "Palwancha", "Parvathipuram", "Pedana", "Peddapuram", "Pithapuram", "Pondur", "Ponnur", "Proddatur",
            "Punganur", "Puttur", "Rajahmundry", "Rajam", "Ramachandrapuram", "Ramagundam", "Rayachoti",
            "Rayadurg", "Renigunta", "Repalle", "Sadasivpet", "Salur", "Samalkot", "Sangareddy", "Sattenapalle",
            "Siddipet", "Singapur", "Sircilla", "Srikakulam", "Srikalahasti", "Suryapet", "Tadepalligudem",
            "Tadpatri", "Tandur", "Tanuku", "Tenali", "Tirupati", "Tuni", "Uravakonda", "Venkatagiri",
            "Vicarabad", "Vijayawada", "Vinukonda", "Visakhapatnam", "Vizianagaram", "Wanaparthy", "Warangal",
            "Yellandu", "Yemmiganur", "Yerraguntla", "Zahirabad", "Rajampet"
        ],
        "Arunachal Pradesh": ["Along", "Bomdila", "Itanagar", "Naharlagun", "Pasighat"],
        "Assam": [
            "Abhayapuri", "Amguri", "Anandnagaar", "Barpeta", "Barpeta Road", "Bilasipara", "Bongaigaon",
            "Dhekiajuli", "Dhubri", "Dibrugarh", "Digboi", "Diphu", "Dispur", "Gauripur", "Goalpara",
            "Golaghat", "Guwahati", "Haflong", "Hailakandi", "Hojai", "Jorhat", "Karimganj", "Kokrajhar",
            "Lanka", "Lumding", "Mangaldoi", "Mankachar", "Margherita", "Mariani", "Marigaon", "Nagaon",
            "Nalbari", "North Lakhimpur", "Rangia", "Sibsagar", "Silapathar", "Silchar", "Tezpur", "Tinsukia"
        ],
        "Bihar": [
            "Amarpur", "Araria", "Areraj", "Arrah", "Asarganj", "Aurangabad", "Bagaha", "Bahadurganj",
            "Bairgania", "Bakhtiarpur", "Banka", "Banmankhi Bazar", "Barahiya", "Barauli", "Barbigha",
            "Barh", "Begusarai", "Behea", "Bettiah", "Bhabua", "Bhagalpur", "Bihar Sharif", "Bikramganj",
            "Bodh Gaya", "Buxar", "Chandan Bara", "Chanpatia", "Chhapra", "Colgong", "Dalsinghsarai",
            "Darbhanga", "Daudnagar", "Dehri-on-Sone", "Dhaka", "Dighwara", "Dumraon", "Fatwah",
            "Forbesganj", "Gaya", "Gogri Jamalpur", "Gopalganj", "Hajipur", "Hilsa", "Hisua", "Islampur",
            "Jagdispur", "Jamalpur", "Jamui", "Jehanabad", "Jhajha", "Jhanjharpur", "Jogabani", "Kanti",
            "Katihar", "Khagaria", "Kharagpur", "Kishanganj", "Lakhisarai", "Lalganj", "Madhepura",
            "Madhubani", "Maharajganj", "Mahnar Bazar", "Makhdumpur", "Maner", "Manihari", "Marhaura",
            "Masaurhi", "Mirganj", "Mokameh", "Motihari", "Motipur", "Munger", "Murliganj", "Muzaffarpur",
            "Narkatiaganj", "Naugachhia", "Nawada", "Nokha", "Patna", "Piro", "Purnia", "Rafiganj",
            "Rajgir", "Ramnagar", "Raxaul Bazar", "Revelganj", "Rosera", "Saharsa", "Samastipur", "Sasaram",
            "Sheikhpura", "Sheohar", "Sherghati", "Silao", "Sitamarhi", "Siwan", "Sonepur", "Sugauli",
            "Sultanganj", "Supaul", "Warisaliganj"
        ],
        "Chhattisgarh": [
            "Ahiwara", "Akaltara", "Ambagarh Chowki", "Ambikapur", "Arang", "Bade Bacheli", "Balod",
            "Baloda Bazar", "Bemetra", "Bhatapara", "Bilaspur", "Birgaon", "Champa", "Chirmiri",
            "Dalli-Rajhara", "Dhamtari", "Dipka", "Dongargarh", "Durg-Bhilai Nagar", "Gobranawapara",
            "Jagdalpur", "Janjgir", "Jashpurnagar", "Kanker", "Kawardha", "Kondagaon", "Korba",
            "Mahasamund", "Mahendragarh", "Mungeli", "Naila Janjgir", "Raigarh", "Raipur", "Rajnandgaon",
            "Sakti", "Tilda Newra"
        ],
        "Dadra & Nagar Haveli": ["Amli", "Silvassa"],
        "Daman & Diu": ["Daman and Diu"],
        "Delhi": ["Asola", "Delhi"],
        "Goa": ["Aldona", "Curchorem Cacora", "Madgaon", "Mapusa", "Margao", "Marmagao", "Panaji"],
        "Gujarat": [
            "Adalaj", "Adityana", "Ahmedabad", "Alang", "Amreli", "Ambaji", "Ambaliyasan", "Andada",
            "Anand", "Anjar", "Ankleshwar", "Anklav", "Antaliya", "Arambhada", "Atul", "Bharuch",
            "Bhavnagar", "Bhuj", "Cambay", "Dahod", "Deesa", "Dholka", "Gandhinagar", "Godhra",
            "Himatnagar", "Idar", "Jamnagar", "Junagadh", "Kadi", "Kalavad", "Kalol", "Kapadvanj",
            "Karjan", "Keshod", "Khambhalia", "Khambhat", "Kheda", "Khedbrahma", "Kheralu", "Kodinar",
            "Lathi", "Limbdi", "Lunawada", "Mahesana", "Mahuva", "Manavadar", "Mandvi", "Mangrol",
            "Mansa", "Mehmedabad", "Modasa", "Morvi", "Nadiad", "Navsari", "Padra", "Palanpur",
            "Palitana", "Pardi", "Patan", "Petlad", "Porbandar", "Radhanpur", "Rajkot", "Rajpipla",
            "Rajula", "Ranavav", "Rapar", "Salaya", "Sanand", "Savarkundla", "Sidhpur", "Sihor",
            "Songadh", "Surat", "Talaja", "Thangadh", "Tharad", "Umbergaon", "Umreth", "Una", "Unjha",
            "Upleta", "Vadnagar", "Vadodara", "Valsad", "Vapi", "Veraval", "Vijapur", "Viramgam",
            "Visnagar", "Vyara", "Wadhwan", "Wankaner"
        ],
        "Haryana": [
            "Ambala", "Asankhurd", "Assandh", "Ateli", "Babiyal", "Bahadurgarh", "Ballabhgarh",
            "Barwala", "Bhiwani", "Charkhi Dadri", "Cheeka", "Ellenabad 2", "Faridabad", "Fatehabad",
            "Ganaur", "Gharaunda", "Gohana", "Gurgaon", "Haibat(Yamuna Nagar)", "Hansi", "Hisar",
            "Hodal", "Jhajjar", "Jind", "Kaithal", "Kalan Wali", "Kalka", "Karnal", "Ladwa",
            "Mahendragarh", "Mandi Dabwali", "Narnaul", "Narwana", "Palwal", "Panchkula", "Panipat",
            "Pehowa", "Pinjore", "Rania", "Ratia", "Rewari", "Rohtak", "Safidon", "Samalkha",
            "Shahbad", "Sirsa", "Sohna", "Sonipat", "Taraori", "Thanesar", "Tohana", "Yamunanagar"
        ],
        "Himachal Pradesh": [
            "Arki", "Baddi", "Bilaspur", "Chamba", "Dalhousie", "Dharamsala", "Hamirpur", "Mandi",
            "Nahan", "Shimla", "Solan", "Sundarnagar"
        ],
        "Jammu & Kashmir": [
            "Achabbal", "Akhnoor", "Anantnag", "Arnia", "Awantipora", "Bandipore", "Baramula",
            "Jammu", "Kathua", "Leh", "Punch", "Rajauri", "Sopore", "Srinagar", "Udhampur"
        ],
        "Jharkhand": [
            "Amlabad", "Ara", "Barughutu", "Bokaro Steel City", "Chaibasa", "Chakradharpur",
            "Chandrapura", "Chatra", "Chirkunda", "Churi", "Daltonganj", "Deoghar", "Dhanbad",
            "Dumka", "Garhwa", "Ghatshila", "Giridih", "Godda", "Gomoh", "Gumia", "Gumla",
            "Hazaribag", "Hussainabad", "Jamshedpur", "Jamtara", "Jhumri Tilaiya", "Khunti",
            "Lohardaga", "Madhupur", "Mihijam", "Musabani", "Pakaur", "Patratu", "Phusro",
            "Ramngarh", "Ranchi", "Sahibganj", "Saunda", "Simdega", "Tenu Dam-cum- Kathhara"
        ],
        "Karnataka": [
            "Arasikere", "Bangalore", "Belgaum", "Bellary", "Chamrajnagar", "Chikkaballapur",
            "Chikmagalur", "Chintamani", "Chitradurga", "Davanagere", "Dharwad", "Gadag",
            "Gulbarga", "Gundlupet", "Hassan", "Hospet", "Hubli", "Karkala", "Karwar", "Kolar",
            "Kota", "Lakshmeshwar", "Lingsugur", "Maddur", "Madhugiri", "Madikeri", "Magadi",
            "Mahalingpur", "Malavalli", "Malur", "Mandya", "Mangalore", "Manvi", "Mudalgi",
            "Mudbidri", "Muddebihal", "Mudhol", "Mulbagal", "Mundargi", "Mysore", "Nanjangud",
            "Pavagada", "Puttur", "Rabkavi Banhatti", "Raichur", "Ramanagaram", "Ramdurg",
            "Ranibennur", "Robertson Pet", "Ron", "Sadalgi", "Sagar", "Sakleshpur", "Sandur",
            "Sankeshwar", "Saundatti-Yellamma", "Savanur", "Sedam", "Shahabad", "Shahpur",
            "Shiggaon", "Shikapur", "Shimoga", "Shorapur", "Shrirangapattana", "Sidlaghatta",
            "Sindgi", "Sindhnur", "Sira", "Sirsi", "Siruguppa", "Srinivaspur", "Talikota",
            "Tarikere", "Tekkalakota", "Terdal", "Tiptur", "Tumkur", "Udupi", "Vijayapura",
            "Wadi", "Yadgir"
        ],
        "Kerala": [
            "Adoor", "Akathiyoor", "Alappuzha", "Ancharakandy", "Aroor", "Ashtamichira", "Attingal",
            "Avinissery", "Chalakudy", "Changanassery", "Chendamangalam", "Chengannur", "Cherthala",
            "Cheruthazham", "Chittur-Thathamangalam", "Chockli", "Erattupetta", "Guruvayoor",
            "Irinjalakuda", "Kadirur", "Kalliasseri", "Kalpetta", "Kanhangad", "Kanjikkuzhi",
            "Kannur", "Kasaragod", "Kayamkulam", "Kochi", "Kodungallur", "Kollam", "Koothuparamba",
            "Kothamangalam", "Kottayam", "Kozhikode", "Kunnamkulam", "Malappuram", "Mattannur",
            "Mavelikkara", "Mavoor", "Muvattupuzha", "Nedumangad", "Neyyattinkara", "Ottappalam",
            "Palai", "Palakkad", "Panniyannur", "Pappinisseri", "Paravoor", "Pathanamthitta",
            "Payyannur", "Peringathur", "Perinthalmanna", "Perumbavoor", "Ponnani", "Punalur",
            "Quilandy", "Shoranur", "Taliparamba", "Thiruvalla", "Thiruvananthapuram", "Thodupuzha",
            "Thrissur", "Tirur", "Vadakara", "Vaikom", "Varkala"
        ],
        "Lakshadweep": ["Kavaratti"],
        "Madhya Pradesh": [
            "Ashok Nagar", "Balaghat", "Betul", "Bhopal", "Burhanpur", "Chhatarpur", "Dabra", "Datia",
            "Dewas", "Dhar", "Fatehabad", "Gwalior", "Indore", "Itarsi", "Jabalpur", "Katni", "Kotma",
            "Lahar", "Lundi", "Maharajpur", "Mahidpur", "Maihar", "Malajkhand", "Manasa", "Manawar",
            "Mandideep", "Mandla", "Mandsaur", "Mauganj", "Mhow Cantonment", "Mhowgaon", "Morena",
            "Multai", "Murwara", "Nagda", "Nainpur", "Narsinghgarh", "Neemuch", "Nepanagar", "Niwari",
            "Nowgong", "Nowrozabad", "Pachore", "Pali", "Panagar", "Pandhurna", "Panna", "Pasan",
            "Pipariya", "Pithampur", "Porsa", "Prithvipur", "Raghogarh-Vijaypur", "Rahatgarh",
            "Raisen", "Rajgarh", "Ratlam", "Rau", "Rehli", "Rewa", "Sabalgarh", "Sagar", "Sanawad",
            "Sarangpur", "Sarni", "Satna", "Sausar", "Sehore", "Sendhwa", "Seoni", "Seoni-Malwa",
            "Shahdol", "Shajapur", "Shamgarh", "Sheopur", "Shivpuri", "Shujalpur", "Sidhi", "Sihora",
            "Singrauli", "Sironj", "Sohagpur", "Tarana", "Tikamgarh", "Ujhani", "Ujjain", "Umaria",
            "Vidisha", "Wara Seoni"
        ],
        "Maharashtra": [
            "Ahmednagar", "Akola", "Amravati", "Aurangabad", "Baramati", "Chalisgaon", "Chinchani",
            "Devgarh", "Dhule", "Dombivli", "Durgapur", "Ichalkaranji", "Jalna", "Kalyan", "Kolhapur",
            "Latur", "Loha", "Lonar", "Lonavla", "Mahad", "Mahuli", "Malegaon", "Malkapur", "Manchar",
            "Mangalvedhe", "Mangrulpir", "Manjlegaon", "Manmad", "Manwath", "Mehkar", "Mhaswad",
            "Miraj", "Morshi", "Mukhed", "Mul", "Mumbai", "Murtijapur", "Nagpur", "Nalasopara",
            "Nanded-Waghala", "Nandgaon", "Nandura", "Nandurbar", "Narkhed", "Nashik", "Navi Mumbai",
            "Nawapur", "Nilanga", "Osmanabad", "Ozar", "Pachora", "Paithan", "Palghar", "Pandharkaoda",
            "Pandharpur", "Panvel", "Parbhani", "Parli", "Parola", "Partur", "Pathardi", "Pathri",
            "Patur", "Pauni", "Pen", "Phaltan", "Pulgaon", "Pune", "Purna", "Pusad", "Rahuri",
            "Rajura", "Ramtek", "Ratnag26", "Raver", "Risod", "Sailu", "Sangamner", "Sangli",
            "Sangole", "Sasvad", "Satana", "Satara", "Savner", "Sawantwadi", "Shahade",
            "Shegaon", "Shendurjana", "Shirdi", "Shirpur-Warwade", "Shirur", "Shrigonda",
            "Shrirampur", "Sillod", "Sinnar", "Solapur", "Soyagaon", "Talegaon Dabhade",
            "Talode", "Tasgaon", "Tirora", "Tuljapur", "Tumsar", "Uchgaon", "Udgir", "Umarga",
            "Umarkhed", "Umred", "Uran", "Uran Islampur", "Vadgaon Kasba", "Vaijapur", "Vasai",
            "Virar", "Vita", "Wadgaon Road", "Wai", "Wani", "Wardha", "Warora", "Warud",
            "Washim", "Yavatmal", "Yawal", "Yevla"
        ],
        "Manipur": ["Imphal", "Kakching", "Lilong", "Mayang Imphal", "Thoubal"],
        "Meghalaya": ["Jowai", "Nongstoin", "Shillong", "Tura"],
        "Mizoram": ["Aizawl", "Champhai", "Lunglei", "Saiha"],
        "Nagaland": ["Dimapur", "Kohima", "Mokokchung", "Tuensang", "Wokha", "Zunheboto"],
        "Orissa": [
            "Anandapur", "Anugul", "Asika", "Balangir", "Balasore", "Baleshwar", "Bamra", "Barbil",
            "Bargarh", "Baripada", "Basudebpur", "Belpahar", "Bhadrak", "Bhawanipatna", "Bhuban",
            "Bhubaneswar", "Biramitrapur", "Brahmapur", "Brajrajnagar", "Byasanagar", "Cuttack",
            "Debagarh", "Dhenkanal", "Gunupur", "Hinjilicut", "Jagatsinghapur", "Jajapur",
            "Jaleswar", "Jatani", "Jeypur", "Jharsuguda", "Joda", "Kantabanji", "Karanjia",
            "Kendrapara", "Kendujhar", "Khordha", "Koraput", "Malkangiri", "Nabarangapur",
            "Paradip", "Parlakhemundi", "Pattamundai", "Phulabani", "Puri", "Rairangpur",
            "Rajagangapur", "Raurkela", "Rayagada", "Sambalpur", "Soro", "Sunabeda",
            "Sundargarh", "Talcher", "Titlagarh", "Umarkote"
        ],
        "Pondicherry": ["Karaikal", "Mahe", "Pondicherry", "Yanam"],
        "Punjab": [
            "Ahmedgarh", "Amritsar", "Barnala", "Batala", "Bathinda", "Bhagha Purana", "Budhlada",
            "Chandigarh", "Dasua", "Dhuri", "Dinanagar", "Faridkot", "Fazilka", "Firozpur",
            "Firozpur Cantt.", "Giddarbaha", "Gobindgarh", "Gurdaspur", "Hoshiarpur", "Jagraon",
            "Jaitu", "Jalalabad", "Jalandhar", "Jalandhar Cantt.", "Jandiala", "Kapurthala",
            "Karoran", "Kartarpur", "Khanna", "Kharar", "Kot Kapura", "Kurali", "Longowal",
            "Ludhiana", "Malerkotla", "Malout", "Mansa", "Maur", "Moga", "Mohali", "Morinda",
            "Mukerian", "Muktsar", "Nabha", "Nakodar", "Nangal", "Nawanshahr", "Pathankot",
            "Patiala", "Patran", "Patti", "Phagwara", "Phillaur", "Qadian", "Raikot", "Rajpura",
            "Rampura Phul", "Rupnagar", "Samana", "Sangrur", "Sirhind Fatehgarh Sahib", "Sujanpur",
            "Sunam", "Talwara", "Tarn Taran", "Urmar Tanda", "Zira", "Zirakpur"
        ],
        "Rajasthan": [
            "Ajmer", "Alwar", "Bali", "Bandikui", "Banswara", "Baran", "Barmer", "Bikaner",
            "Fatehpur", "Jaipur", "Jaisalmer", "Jodhpur", "Kota", "Lachhmangarh", "Ladnu",
            "Lakheri", "Lalsot", "Losal", "Makrana", "Malpura", "Mandalgarh", "Mandawa",
            "Mangrol", "Merta city", "Mount Abu", "Nadbai", "Nagar", "Nagaur", "Nargund",
            "Nasirabad", "Nathdwara", "Navalgund", "Nawalgarh", "Neem-Ka-Thana", "Nelamangala",
            "Nimbahera", "Nipani", "Niwai", "Nohar", "Nokha", "Pali", "Phalodi", "Phulera",
            "Pilani", "Pilibanga", "Pindwara", "Pipar city", "Prantij", "Pratapgarh",
            "Raisinghnagar", "Rajakhera", "Rajaldesar", "Rajgarh (Alwar)", "Rajgarh (Churu)",
            "Rajsamand", "Ramganj Mandi", "Ramngarh", "Ratangarh", "Rawatbhata", "Rawatsar",
            "Reengus", "Sadri", "Sadulshahar", "Sagwara", "Sambhar", "Sanchore", "Sangaria",
            "Sardarshahar", "Sawai Madhopur", "Shahpura", "Sheoganj", "Sikar", "Sirohi",
            "Sojat", "Sri Madhopur", "Sujangarh", "Sumerpur", "Suratgarh", "Taranagar",
            "Todabhim", "Todaraisingh", "Tonk", "Udaipur", "Udaipurwati", "Vijainagar"
        ],
        "Sikkim": ["Gangtok"],
        "Tamil Nadu": [
            "Arakkonam", "Arcot", "Aruppukkottai", "Bhavani", "Chengalpattu", "Chennai",
            "Chinna salem", "Coimbatore", "Coonoor", "Cuddalore", "Dharmapuri", "Dindigul",
            "Erode", "Gudalur", "Kanchipuram", "Karaikudi", "Karungal", "Karur", "Kollankodu",
            "Lalgudi", "Madurai", "Nagapattinam", "Nagercoil", "Namagiripettai", "Namakkal",
            "Nandivaram-Guduvancheri", "Nanjikottai", "Natham", "Nellikuppam", "Neyveli",
            "O Valley", "Oddanchatram", "P.N.Patti", "Pacode", "Padmanabhapuram", "Palani",
            "Palladam", "Pallapatti", "Pallikonda", "Panagudi", "Panruti", "Paramakudi",
            "Parangipettai", "Pattukkottai", "Perambalur", "Peravurani", "Periyakulam",
            "Periyasemur", "Pernampattu", "Pollachi", "Polur", "Ponneri", "Pudukkottai",
            "Pudupattinam", "Puliyankudi", "Punjaipugalur", "Rajapalayam", "Ramanathapuram",
            "Rameshwaram", "Rasipuram", "Salem", "Sankarankoil", "Sankari", "Sathyamangalam",
            "Sattur", "Shenkottai", "Sholavandan", "Sholingur", "Sirkali", "Sivaganga",
            "Sivagiri", "Sivakasi", "Srivilliputhur", "Surandai", "Suriyampalayam",
            "Tenkasi", "Thammampatti", "Thanjavur", "Tharamangalam", "Tharangambadi",
            "Theni Allinagaram", "Thirumangalam", "Thirunindravur", "Thiruparappu",
            "Thirupuvanam", "Thiruthuraipoondi", "Thiruvallur", "Thiruvarur",
            "Thoothukudi", "Thuraiyur", "Tindivanam", "Tiruchendur", "Tiruchengode",
            "Tiruchirappalli", "Tirukalukundram", "Tirukkoyilur", "Tirunelveli",
            "Tirupathur", "Tiruppur", "Tiruttani", "Tiruvannamalai", "Tiruvethipuram",
            "Tittakudi", "Udhagamandalam", "Udumalaipettai", "Unnamalaikadai",
            "Usilampatti", "Uthamapalayam", "Uthiramerur", "Vadakkuvalliyur",
            "Vadalur", "Vadipatti", "Valparai", "Vandavasi", "Vaniyambadi",
            "Vedaranyam", "Vellakoil", "Vellore", "Vikramasingapuram", "Viluppuram",
            "Virudhachalam", "Virudhunagar", "Viswanatham"
        ],
        "Tripura": [
            "Agartala", "Badharghat", "Dharmanagar", "Indranagar", "Jogendranagar",
            "Kailasahar", "Khowai", "Pratapgarh", "Udaipur"
        ],
        "Uttar Pradesh": [
            "Achhnera", "Adari", "Agra", "Aligarh", "Allahabad", "Amroha", "Azamgarh",
            "Bahraich", "Ballia", "Balrampur", "Banda", "Bareilly", "Chandausi", "Dadri",
            "Deoria", "Etawah", "Fatehabad", "Fatehpur", "Greater Noida", "Hamirpur",
            "Hardoi", "Jajmau", "Jaunpur", "Jhansi", "Kalpi", "Kanpur", "Kota", "Laharpur",
            "Lakhimpur", "Lal Gopalganj Nindaura", "Lalganj", "Lalitpur", "Lar", "Loni",
            "Lucknow", "Mathura", "Meerut", "Modinagar", "Muzaffarnagar", "Muradnagar",
            "Nagina", "Najibabad", "Nakur", "Nanpara", "Naraura", "Naugawan Sadat",
            "Nautanwa", "Nawabganj", "Nehtaur", "NOIDA", "Noorpur", "Obra", "Orai",
            "Padrauna", "Palia Kalan", "Parasi", "Phulpur", "Pihani", "Pilibhit",
            "Pilkhuwa", "Powayan", "Pukhrayan", "Puranpur", "Purquazi", "Purwa",
            "Rae Bareli", "Rampur", "Rampur Maniharan", "Rasra", "Rath", "Renukoot",
            "Reoti", "Robertsganj", "Rudauli", "Rudrapur", "Sadabad", "Safipur",
            "Saharanpur", "Sahaspur", "Sahaswan", "Sahawar", "Sahjanwa", "Sambhal",
            "Samdhan", "Samthar", "Sandi", "Sandila", "Sardhana", "Seohara", "Shahganj",
            "Shahjahanpur", "Shamli", "Sherkot", "Shikohabad", "Shishgarh", "Siana",
            "Sikanderpur", "Sikandra Rao", "Sikandrabad", "Sirsaganj", "Sirsi",
            "Sitapur", "Soron", "Suar", "Sultanpur", "Sumerpur", "Tanda", "Tetri Bazar",
            "Thakurdwara", "Thana Bhawan", "Tilhar", "Tirwaganj", "Tulsipur", "Tundla",
            "Unnao", "Utraula", "Varanasi", "Vrindavan", "Warhapur", "Zaidpur", "Zamania"
        ],
        "Uttarakhand": [
            "Almora", "Bazpur", "Chamba", "Dehradun", "Haldwani", "Haridwar", "Jaspur",
            "Kashipur", "kichha", "Kotdwara", "Manglaur", "Mussoorie", "Nagla", "Nainital",
            "Pauri", "Pithoragarh", "Ramnagar", "Rishikesh", "Roorkee", "Rudrapur",
            "Sitarganj", "Tehri"
        ],
        "West Bengal": [
            "Adra", "Alipurduar", "Arambagh", "Asansol", "Baharampur", "Bally", "Balurghat",
            "Bankura", "Barakar", "Barasat", "Bardhaman", "Bidhan Nagar", "Calcutta",
            "Chinsura", "Contai", "Cooch Behar", "Darjeeling", "Durgapur", "Haldia",
            "Howrah", "Islampur", "Jhargram", "Kharagpur", "Kolkata", "Mainaguri", "Mal",
            "Mathabhanga", "Medinipur", "Memari", "Monoharpur", "Murshidabad", "Nabadwip",
            "Naihati", "Panchla", "Pandua", "Paschim Punropara", "Purulia", "Raghunathpur",
            "Raiganj", "Rampurhat", "Ranaghat", "Sainthia", "Santipur", "Siliguri",
            "Sonamukhi", "Srirampore", "Suri", "Taki", "Tamluk", "Tarakeswar"
        ]
    }
    };

    // Populate dropdowns
    populateDropdown(countryCodeSelect, countryCodes);
    populateDropdown(contactCountrySelect, contactCountries);
    populateDropdown(countryOriginSelect, originCountries);

    // Event listener for contact country change
    contactCountrySelect.addEventListener('change', () => {
        const selectedCountry = contactCountrySelect.value;
        provinceSelect.innerHTML = '<option value="">Select Province/State</option>';
        citySelect.innerHTML = '<option value="">Select City</option>';
        if (selectedCountry && countryRegions[selectedCountry]) {
            populateDropdown(provinceSelect, countryRegions[selectedCountry]);
        }
    });

    // Event listener for province change
    provinceSelect.addEventListener('change', () => {
        const selectedCountry = contactCountrySelect.value;
        const selectedProvince = provinceSelect.value;
        citySelect.innerHTML = '<option value="">Select City</option>';
        if (selectedCountry && selectedProvince && countryCities[selectedCountry] && countryCities[selectedCountry][selectedProvince]) {
            populateCities(citySelect, countryCities[selectedCountry], provinceSelect);
        }
    });

    // Event listener for origin country change
    countryOriginSelect.addEventListener('change', () => {
        const selectedCountry = countryOriginSelect.value;
        stateOriginSelect.innerHTML = '<option value="">Select State/Province</option>';
        cityOriginSelect.innerHTML = '<option value="">Select City</option>';
        if (selectedCountry && countryRegions[selectedCountry]) {
            populateDropdown(stateOriginSelect, countryRegions[selectedCountry]);
        }
    });

    // Event listener for origin state change
    stateOriginSelect.addEventListener('change', () => {
        const selectedCountry = countryOriginSelect.value;
        const selectedState = stateOriginSelect.value;
        cityOriginSelect.innerHTML = '<option value="">Select City</option>';
        if (selectedCountry && selectedState && countryCities[selectedCountry] && countryCities[selectedCountry][selectedState]) {
            populateCities(cityOriginSelect, countryCities[selectedCountry], stateOriginSelect);
        }
    });

    // Form validation function
    window.validateForm = function(event) {
        event.preventDefault();
        const phoneNumber = document.getElementById('phone-number').value;
        if (!/^\d{10}$/.test(phoneNumber)) {
            alert("Phone Number must be exactly 10 digits.");
            return false;
        }
        const email = document.getElementById('email').value;
        if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(email)) {
            alert("Please enter a valid email address.");
            return false;
        }
        const firstName = document.getElementById('first-name').value;
        const lastName = document.getElementById('last-name').value;
        if (!/^[A-Za-z\s-]{1,50}$/.test(firstName) || !/^[A-Za-z\s-]{1,50}$/.test(lastName)) {
            alert("Names should contain only letters, spaces, or hyphens (max 50 characters).");
            return false;
        }
        const dob = document.getElementById('dob').value;
        const maxDate = new Date('2006-08-05');
        if (new Date(dob) > maxDate) {
            alert("Date of Birth must be before August 05, 2006 (19 years or older).");
            return false;
        }
        return true;
    };
});