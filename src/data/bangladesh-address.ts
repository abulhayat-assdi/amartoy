export interface BangladeshAddressNode {
  name: string;
  city?: boolean;
  unions?: string[];
}

export interface BangladeshDistrict {
  name: string;
  upazilas: BangladeshAddressNode[];
}

export interface BangladeshDivision {
  name: string;
  districts: BangladeshDistrict[];
}

const district = (name: string, upazilas: BangladeshAddressNode[]): BangladeshDistrict => ({
  name,
  upazilas,
});

export const bangladeshAddressData: BangladeshDivision[] = [
  {
    name: "Dhaka",
    districts: [
      {
        name: "Dhaka",
        upazilas: [
          { name: "Dhanmondi", city: true },
          { name: "Gulshan", city: true },
          { name: "Mirpur", city: true },
          { name: "Uttara", city: true },
        ],
      },
      {
        name: "Gazipur",
        upazilas: [
          { name: "Gazipur Sadar", city: true },
          { name: "Kaliakair", unions: ["Atabaha", "Boali", "Mouchak"] },
          { name: "Sreepur", unions: ["Barmi", "Gazipur", "Tepirbari"] },
        ],
      },
      {
        name: "Narayanganj",
        upazilas: [
          { name: "Narayanganj Sadar", city: true },
          { name: "Araihazar", unions: ["Duptara", "Mahmudpur", "Brahmandi"] },
          { name: "Sonargaon", unions: ["Mograpara", "Pirojpur", "Sadipur"] },
        ],
      },
    ],
  },
  {
    name: "Chattogram",
    districts: [
      district("Chattogram", [
        { name: "Kotwali", city: true },
        { name: "Pahartali", city: true },
        { name: "Panchlaish", city: true },
        { name: "Hathazari", unions: ["Fatikchhari", "Mekhal", "Nangalmora"] },
        { name: "Raozan", unions: ["Binajuri", "Noapara", "Pahartali"] },
        { name: "Sitakunda", unions: ["Barabkunda", "Kumira", "Muradpur"] },
      ]),
      district("Cox's Bazar", [
        { name: "Cox's Bazar Sadar", city: true },
        { name: "Chakaria", unions: ["Bomobil", "Harbang", "Kakara"] },
        { name: "Maheshkhali", unions: ["Dhalghata", "Hoanak", "Matarbari"] },
        { name: "Ramu", unions: ["Fatekharkul", "Garjaniya", "Kachhapia"] },
        { name: "Teknaf", unions: ["Baharchhara", "Hnila", "Sabrang"] },
        { name: "Ukhia", unions: ["Haldiapalong", "Jalia Palong", "Raja Palong"] },
      ]),
      district("Cumilla", [
        { name: "Cumilla Sadar", city: true },
        { name: "Daudkandi", unions: ["Eliotganj", "Barapara", "Panchgachia"] },
        { name: "Muradnagar", unions: ["Bangra", "Chapitala", "Jahapur"] },
        { name: "Chandina", unions: ["Barera", "Joag", "Madhaiya"] },
        { name: "Debidwar", unions: ["Fatehabad", "Jafarganj", "Rajamehar"] },
        { name: "Laksam", unions: ["Bipulasar", "Mudafarganj", "Uttarda"] },
      ]),
      district("Brahmanbaria", [
        { name: "Brahmanbaria Sadar", city: true },
        { name: "Ashuganj", unions: ["Char Chartala", "Durgapur", "Lalpur"] },
        { name: "Nasirnagar", unions: ["Bural", "Chapartala", "Haripur"] },
        { name: "Sarail", unions: ["Arual", "Noagaon", "Shahbazpur"] },
      ]),
      district("Chandpur", [
        { name: "Chandpur Sadar", city: true },
        { name: "Faridganj", unions: ["Balithuba", "Paikpara", "Subidpur"] },
        { name: "Hajiganj", unions: ["Bakila", "Hajiganj", "Hatila East"] },
        { name: "Matlab South", unions: ["Khadergaon", "Narayanpur", "Nayergaon South"] },
      ]),
      district("Feni", [
        { name: "Feni Sadar", city: true },
        { name: "Chhagalnaiya", unions: ["Gopal", "Mahamaya", "Pathannagar"] },
        { name: "Daganbhuiyan", unions: ["Matubhuiyan", "Rajapur", "Yeakubpur"] },
        { name: "Sonagazi", unions: ["Amirabad", "Char Majlishpur", "Mongalkandi"] },
      ]),
      district("Khagrachhari", [
        { name: "Khagrachhari Sadar", city: true },
        { name: "Dighinala", unions: ["Babuchhara", "Boalkhali", "Meriya"] },
        { name: "Mahalchhari", unions: ["Kayangghat", "Mahalchhari", "Mobachhari"] },
        { name: "Matiranga", unions: ["Belchhari", "Guimara", "Tabalchhari"] },
      ]),
      district("Lakshmipur", [
        { name: "Lakshmipur Sadar", city: true },
        { name: "Raipur", unions: ["Bamni", "Char Ababil", "Keroa"] },
        { name: "Ramganj", unions: ["Bhadur", "Dattapara", "Ichhapur"] },
        { name: "Ramgati", unions: ["Boro Kheri", "Char Alexander", "Char Gazi"] },
      ]),
      district("Noakhali", [
        { name: "Noakhali Sadar", city: true },
        { name: "Begumganj", unions: ["Alaiyarpur", "Amanullapur", "Chayani"] },
        { name: "Chatkhil", unions: ["Khilpara", "Mohammadpur", "Noakhola"] },
        { name: "Companiganj", unions: ["Char Elahi", "Char Fakira", "Sirajpur"] },
      ]),
      district("Rangamati", [
        { name: "Rangamati Sadar", city: true },
        { name: "Baghaichhari", unions: ["Bangaltali", "Kedarmara", "Rupkari"] },
        { name: "Kaptai", unions: ["Chandraghona", "Chitmorom", "Raikhali"] },
        { name: "Langadu", unions: ["Bhulban", "Gulshakhali", "Mainimukh"] },
      ]),
      district("Bandarban", [
        { name: "Bandarban Sadar", city: true },
        { name: "Lama", unions: ["Aziznagar", "Fasiakhali", "Rupushipara"] },
        { name: "Naikhongchhari", unions: ["Baishari", "Dochhari", "Ghumdhum"] },
        { name: "Thanchi", unions: ["Balipara", "Remakri", "Tindu"] },
      ]),
    ],
  },
  {
    name: "Rajshahi",
    districts: [
      {
        name: "Rajshahi",
        upazilas: [
          { name: "Boalia", city: true },
          { name: "Paba", unions: ["Harian", "Hujripara", "Darusha"] },
          { name: "Bagmara", unions: ["Bhabaniganj", "Goalkandi", "Taherpur"] },
        ],
      },
      {
        name: "Bogura",
        upazilas: [
          { name: "Bogura Sadar", city: true },
          { name: "Sherpur", unions: ["Khanpur", "Kusumbi", "Mirzapur"] },
          { name: "Shibganj", unions: ["Mokamtala", "Pirob", "Roynagar"] },
        ],
      },
      {
        name: "Pabna",
        upazilas: [
          { name: "Pabna Sadar", city: true },
          { name: "Ishwardi", unions: ["Dashuria", "Muladuli", "Sara"] },
          { name: "Bera", unions: ["Chakla", "Mashumdia", "Natore"] },
        ],
      },
    ],
  },
  {
    name: "Khulna",
    districts: [
      {
        name: "Khulna",
        upazilas: [
          { name: "Khulna Sadar", city: true },
          { name: "Batiaghata", unions: ["Amirpur", "Gangarampur", "Surkhali"] },
          { name: "Dumuria", unions: ["Atlia", "Gutudia", "Rudaghara"] },
        ],
      },
      {
        name: "Jashore",
        upazilas: [
          { name: "Jashore Sadar", city: true },
          { name: "Abhaynagar", unions: ["Sundoli", "Siddhipasha", "Payra"] },
          { name: "Bagherpara", unions: ["Bandhabila", "Jadabpur", "Narikelbaria"] },
        ],
      },
      {
        name: "Satkhira",
        upazilas: [
          { name: "Satkhira Sadar", city: true },
          { name: "Kaliganj", unions: ["Champaphul", "Moutala", "Nalta"] },
          { name: "Shyamnagar", unions: ["Atulia", "Burigoalini", "Ishwaripur"] },
        ],
      },
    ],
  },
  {
    name: "Barishal",
    districts: [
      {
        name: "Barishal",
        upazilas: [
          { name: "Barishal Sadar", city: true },
          { name: "Bakerganj", unions: ["Darial", "Dudhal", "Faridpur"] },
          { name: "Banaripara", unions: ["Baisari", "Bisharkandi", "Chakhar"] },
        ],
      },
      {
        name: "Bhola",
        upazilas: [
          { name: "Bhola Sadar", city: true },
          { name: "Borhanuddin", unions: ["Deula", "Sachra", "Tobgi"] },
          { name: "Char Fasson", unions: ["Abdullahpur", "Aslampur", "Nazrulnagar"] },
        ],
      },
      {
        name: "Patuakhali",
        upazilas: [
          { name: "Patuakhali Sadar", city: true },
          { name: "Bauphal", unions: ["Adabaria", "Boga", "Madanpura"] },
          { name: "Kalapara", unions: ["Latachapli", "Mithaganj", "Nilganj"] },
        ],
      },
    ],
  },
  {
    name: "Sylhet",
    districts: [
      {
        name: "Sylhet",
        upazilas: [
          { name: "Sylhet Sadar", city: true },
          { name: "Beanibazar", unions: ["Alinagar", "Charkhai", "Mathiura"] },
          { name: "Golapganj", unions: ["Amura", "Lakshmipasha", "West Amura"] },
        ],
      },
      {
        name: "Moulvibazar",
        upazilas: [
          { name: "Moulvibazar Sadar", city: true },
          { name: "Kamalganj", unions: ["Adampur", "Alinagar", "Madhabpur"] },
          { name: "Sreemangal", unions: ["Ashidron", "Kalapur", "Sindurkhan"] },
        ],
      },
      {
        name: "Habiganj",
        upazilas: [
          { name: "Habiganj Sadar", city: true },
          { name: "Madhabpur", unions: ["Andiura", "Bulla", "Jalalpur"] },
          { name: "Nabiganj", unions: ["Aushkandi", "Bausha", "Kargaon"] },
        ],
      },
    ],
  },
  {
    name: "Rangpur",
    districts: [
      {
        name: "Rangpur",
        upazilas: [
          { name: "Rangpur Sadar", city: true },
          { name: "Badarganj", unions: ["Bishnupur", "Damodarpur", "Gopalpur"] },
          { name: "Pirgachha", unions: ["Annadanagar", "Kawania", "Tukuria"] },
        ],
      },
      {
        name: "Dinajpur",
        upazilas: [
          { name: "Dinajpur Sadar", city: true },
          { name: "Birampur", unions: ["Jotbani", "Katla", "Paltapur"] },
          { name: "Parbatipur", unions: ["Belaichandi", "Hamidpur", "Monmothpur"] },
        ],
      },
      {
        name: "Kurigram",
        upazilas: [
          { name: "Kurigram Sadar", city: true },
          { name: "Ulipur", unions: ["Begumganj", "Bhurungamari", "Pandul"] },
          { name: "Nageshwari", unions: ["Ballabherkhas", "Berubari", "Kachakata"] },
        ],
      },
    ],
  },
  {
    name: "Mymensingh",
    districts: [
      {
        name: "Mymensingh",
        upazilas: [
          { name: "Mymensingh Sadar", city: true },
          { name: "Bhaluka", unions: ["Birunia", "Dakatia", "Uthura"] },
          { name: "Trishal", unions: ["Bailor", "Harirampur", "Rampur"] },
        ],
      },
      {
        name: "Jamalpur",
        upazilas: [
          { name: "Jamalpur Sadar", city: true },
          { name: "Melandaha", unions: ["Adra", "Durmut", "Mahmudpur"] },
          { name: "Islampur", unions: ["Belgacha", "Charputimari", "Kulkandi"] },
        ],
      },
      {
        name: "Netrokona",
        upazilas: [
          { name: "Netrokona Sadar", city: true },
          { name: "Atpara", unions: ["Baliashimul", "Duoj", "Sunoi"] },
          { name: "Madan", unions: ["Fatehpur", "Gobindashree", "Nayekpur"] },
        ],
      },
    ],
  },
];

export const bangladeshDivisions = bangladeshAddressData.map((division) => division.name);
