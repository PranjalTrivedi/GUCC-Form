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

    // Function to populate cities
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

    // Global countries list
    const countries = [
        "Canada", "India"
    ];

    // Country codes for phone numbers
    const countryCodes = [
        "+1", "+91"
    ];

    // Provinces/States and Cities by country
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

    const countryCities = {
        "Canada": {
            "Alberta": ["Calgary", "Edmonton", "Red Deer", "Lethbridge", "St. Albert", "Medicine Hat", "Grande Prairie", "Airdrie", "Spruce Grove", "Leduc", "Fort Saskatchewan", "Chestermere", "Beaumont", "Lloydminster", "Camrose", "Cold Lake", "Brooks", "Lacombe", "Wetaskiwin"],
            "British Columbia": ["Vancouver", "Surrey", "Burnaby", "Richmond", "Abbotsford", "Coquitlam", "Kelowna", "Langley", "Saanich", "Delta", "North Vancouver", "Victoria", "Kamloops", "Nanaimo", "Prince George", "Chilliwack", "Maple Ridge", "New Westminster", "Port Coquitlam", "Vernon", "West Vancouver", "Langford", "Mission", "Port Moody", "Campbell River", "Penticton", "White Rock", "Courtenay", "Cranbrook"],
            "Manitoba": ["Winnipeg", "Brandon", "Steinbach", "Thompson", "Portage la Prairie", "Selkirk", "Winkler", "Dauphin", "Morden", "Flin Flon"],
            "New Brunswick": ["Fredericton", "Moncton", "Saint John", "Dieppe", "Riverview", "Quispamsis", "Bathurst", "Miramichi"],
            "Newfoundland and Labrador": ["St. John's", "Mount Pearl", "Corner Brook"],
            "Nova Scotia": ["Halifax", "Dartmouth", "Sydney", "Truro", "New Glasgow", "Glace Bay"],
            "Ontario": ["Toronto", "Ottawa", "Mississauga", "Brampton", "Hamilton", "London", "Markham", "Vaughan", "Kitchener", "Windsor", "Richmond Hill", "Oakville", "Burlington", "Greater Sudbury", "Oshawa", "Barrie", "St. Catharines", "Cambridge", "Kingston", "Guelph", "Thunder Bay", "Waterloo", "Brantford", "Pickering", "Niagara Falls", "Peterborough", "Sault Ste. Marie", "Sarnia", "Belleville", "North Bay", "Cornwall", "Chatham", "Georgetown", "St. Thomas", "Woodstock", "Bowmanville", "Leamington", "Stratford", "Orillia", "Orangeville", "Bradford"],
            "Prince Edward Island": ["Charlottetown", "Summerside"],
            "Quebec": ["Montréal", "Québec City", "Laval", "Gatineau", "Longueuil", "Sherbrooke", "Saguenay", "Lévis", "Trois-Rivières", "Terrebonne", "Saint-Jean-sur-Richelieu", "Brossard", "Repentigny", "Drummondville", "Saint-Jérôme", "Granby", "Blainville", "Saint-Hyacinthe", "Shawinigan", "Dollard-des-Ormeaux"],
            "Saskatchewan": ["Saskatoon", "Regina", "Prince Albert", "Moose Jaw", "Swift Current", "Yorkton", "North Battleford", "Estevan", "Weyburn", "Melfort"],
            "Northwest Territories": ["Yellowknife"],
            "Nunavut": ["Iqaluit"],
            "Yukon": ["Whitehorse"]
        },
        "India": {
            "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool", "Rajahmundry", "Tirupati", "Kadapa", "Anantapur", "Vizianagaram"],
            "Arunachal Pradesh": ["Itanagar", "Naharlagun", "Pasighat"],
            "Assam": ["Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Nagaon", "Tinsukia"],
            "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Purnia", "Darbhanga"],
            "Chhattisgarh": ["Raipur", "Bhilai", "Durg", "Bilaspur", "Korba"],
            "Goa": ["Panaji", "Margao", "Vasco da Gama"],
            "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Junagadh", "Gandhinagar", "Anand", "Bharuch"],
            "Haryana": ["Faridabad", "Gurgaon", "Hisar", "Rohtak", "Panipat", "Karnal"],
            "Himachal Pradesh": ["Shimla", "Dharamshala", "Solan", "Mandi"],
            "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Deoghar"],
            "Karnataka": ["Bangalore", "Mysuru", "Hubli", "Mangalore", "Belgaum", "Gulbarga", "Davanagere"],
            "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam"],
            "Madhya Pradesh": ["Bhopal", "Indore", "Jabalpur", "Gwalior", "Ujjain"],
            "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik", "Aurangabad", "Solapur", "Kolhapur", "Amravati", "Navi Mumbai"],
            "Manipur": ["Imphal"],
            "Meghalaya": ["Shillong"],
            "Mizoram": ["Aizawl"],
            "Nagaland": ["Kohima", "Dimapur"],
            "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur"],
            "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda"],
            "Rajasthan": ["Jaipur", "Jodhpur", "Kota", "Bikaner", "Ajmer", "Udaipur"],
            "Sikkim": ["Gangtok"],
            "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli"],
            "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar"],
            "Tripura": ["Agartala"],
            "Uttar Pradesh": ["Lucknow", "Kanpur", "Ghaziabad", "Agra", "Varanasi", "Meerut", "Allahabad", "Noida"],
            "Uttarakhand": ["Dehradun", "Haridwar", "Roorkee", "Haldwani"],
            "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri"],
            "Andaman and Nicobar Islands": ["Port Blair"],
            "Chandigarh": ["Chandigarh"],
            "Dadra and Nagar Haveli and Daman and Diu": ["Daman", "Silvassa"],
            "Delhi": ["New Delhi"],
            "Jammu and Kashmir": ["Srinagar", "Jammu"],
            "Ladakh": ["Leh"],
            "Lakshadweep": ["Kavaratti"],
            "Puducherry": ["Puducherry"]
        }
    };

    // Populate country code, contact country, and origin country dropdowns
    populateDropdown(countryCodeSelect, countryCodes);
    populateDropdown(contactCountrySelect, countries);
    populateDropdown(countryOriginSelect, countries);

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
        // If all validations pass, submit the form
        alert("Form submitted successfully!");
        return true; // Uncomment and replace with actual form submission logic if needed
    };
});