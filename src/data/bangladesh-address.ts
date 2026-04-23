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

export const bangladeshAddressData: BangladeshDivision[] = [
  {
    "name": "Chattagram",
    "districts": [
      {
        "name": "Comilla",
        "upazilas": [
          {
            "name": "Debidwar",
            "unions": [
              "Subil",
              "North Gunaighor",
              "South Gunaighor",
              "Boroshalghor",
              "Rajameher",
              "Yousufpur",
              "Rasulpur",
              "Fatehabad",
              "Elahabad",
              "Jafargonj",
              "Dhampti",
              "Mohanpur",
              "Vani",
              "Barkamta",
              "Sultanpur"
            ]
          },
          {
            "name": "Barura",
            "unions": [
              "Aganagar",
              "Bhabanipur",
              "North Khoshbas",
              "South Khoshbas",
              "Jhalam",
              "Chitodda",
              "North Shilmuri",
              "South Shilmuri",
              "Galimpur",
              "Shakpur",
              "Bhaukshar",
              "Adda",
              "Adra",
              "Payalgacha",
              "Laxmipur"
            ]
          },
          {
            "name": "Brahmanpara",
            "unions": [
              "Shidli",
              "Chandla",
              "Shashidal",
              "Dulalpur",
              "Brahmanpara Sadar",
              "Shahebabad",
              "Malapara",
              "Madhabpur"
            ]
          },
          {
            "name": "Chandina",
            "unions": [
              "Shuhilpur",
              "Bataghashi",
              "Joag",
              "Borcarai",
              "Madhaiya",
              "Dollai Nowabpur",
              "Mohichial",
              "Gollai",
              "Keronkhal",
              "Maijkhar",
              "Etberpur",
              "Barera",
              "Borcoit"
            ]
          },
          {
            "name": "Chauddagram",
            "unions": [
              "Sreepur",
              "Kashinagar",
              "Kalikapur",
              "Shuvapur",
              "Ghulpasha",
              "Moonshirhat",
              "Batisha",
              "Kankapait",
              "Cheora",
              "Jagannatdighi",
              "Goonabati",
              "Alkara"
            ]
          },
          {
            "name": "Daudkandi",
            "unions": [
              "Doulotpur",
              "Daudkandi",
              "North Eliotgonj",
              "South Eliotgonj",
              "Zinglatoli",
              "Sundolpur",
              "Gouripur",
              "East Mohammadpur",
              "West Mohammadpur",
              "Goalmari",
              "Maruka",
              "Betessor",
              "Podua",
              "West Passgacia",
              "Baropara"
            ]
          },
          {
            "name": "Homna",
            "unions": [
              "Mathabanga",
              "Gagutiea",
              "Asadpur",
              "Chanderchor",
              "Vashania",
              "Nilokhi",
              "Garmora",
              "Joypur",
              "Dulalpur"
            ]
          },
          {
            "name": "Laksam",
            "unions": [
              "Bakoi",
              "Mudafargonj",
              "Kandirpar",
              "Gobindapur",
              "Uttarda",
              "Laksam Purba",
              "Azgora"
            ]
          },
          {
            "name": "Muradnagar",
            "unions": [
              "Sreekil",
              "Akubpur",
              "Andicot",
              "Purbadair (East)",
              "Purbadair (West)",
              "Bangara (East)",
              "Bangara (West)",
              "Chapitala",
              "Camalla",
              "Jatrapur",
              "Ramachandrapur (North)",
              "Ramachandrapur (South)",
              "Muradnagar Sadar",
              "Nobipur (East)",
              "Nobipur (West)",
              "Damgar",
              "Jahapur",
              "Salikandi",
              "Darura",
              "Paharpur",
              "Babutipara",
              "Tanki"
            ]
          },
          {
            "name": "Nangalkot",
            "unions": [
              "Bangadda",
              "Paria",
              "Raykot",
              "Mokara",
              "Makrabpur",
              "Heshakhal",
              "Adra",
              "Judda",
              "Dhalua",
              "Doulkha",
              "Boxgonj",
              "Satbaria"
            ]
          },
          {
            "name": "Comilla Sadar",
            "unions": [
              "Kalirbazer",
              "North Durgapur",
              "South Durgapur",
              "Amratoli",
              "Panchthubi",
              "Jagannatpur"
            ]
          },
          {
            "name": "Meghna",
            "unions": [
              "Chandanpur",
              "Chalibanga",
              "Radanagar",
              "Manikarchar",
              "Barakanda",
              "Govindapur",
              "Luterchar",
              "Vaorkhola"
            ]
          },
          {
            "name": "Monohargonj",
            "unions": [
              "Baishgaon",
              "Shoroshpur",
              "Hasnabad",
              "Jholam (North)",
              "Jholam (South)",
              "Moishatua",
              "Lokkhanpur",
              "Khela",
              "Uttarhowla",
              "Natherpetua",
              "Bipulashar"
            ]
          },
          {
            "name": "Sadarsouth",
            "unions": [
              "Chuwara",
              "Baropara",
              "Jorkanoneast",
              "Goliara",
              "Jorkanonwest",
              "Bagmara (North)",
              "Bagmara (South)",
              "Bhuloin (North)",
              "Bhuloin (South)",
              "Belgor (North)",
              "Belgor (South)",
              "Perul (North)",
              "Perul (South)",
              "Bijoypur"
            ]
          },
          {
            "name": "Titas",
            "unions": [
              "Satani",
              "Jagatpur",
              "Balorampur",
              "Karikandi",
              "Kalakandi",
              "Vitikandi",
              "Narayandia",
              "Zearkandi",
              "Majidpur"
            ]
          },
          {
            "name": "Burichang",
            "unions": [
              "Moynamoti",
              "Varella",
              "Mokam",
              "Burichang Sadar",
              "Bakshimul",
              "Pirjatrapur",
              "Sholonal",
              "Rajapur"
            ]
          },
          {
            "name": "Lalmai",
            "unions": [
              "Bagmara (North)",
              "Bagmara (South)",
              "Bhuloin (North)",
              "Bhuloin (South)",
              "Belgor (North)",
              "Belgor (South)",
              "Perul (North)",
              "Perul (South)"
            ]
          }
        ]
      },
      {
        "name": "Feni",
        "upazilas": [
          {
            "name": "Chhagalnaiya",
            "unions": [
              "Mohamaya",
              "Pathannagar",
              "Subhapur",
              "Radhanagar",
              "Gopal"
            ]
          },
          {
            "name": "Feni Sadar",
            "unions": [
              "Sarishadi",
              "Panchgachia",
              "Dhormapur",
              "Kazirbag",
              "Kalidah",
              "Baligaon",
              "Dholia",
              "Lemua",
              "Chonua",
              "Motobi",
              "Fazilpur",
              "Forhadnogor"
            ]
          },
          {
            "name": "Sonagazi",
            "unions": [
              "Charmozlishpur",
              "Bogadana",
              "Motigonj",
              "Mongolkandi",
              "Chardorbesh",
              "Chorchandia",
              "Sonagazi",
              "Amirabad",
              "Nababpur"
            ]
          },
          {
            "name": "Fulgazi",
            "unions": [
              "Fulgazi",
              "Munshirhat",
              "Dorbarpur",
              "Anandopur",
              "Amzadhat",
              "Gmhat"
            ]
          },
          {
            "name": "Parshuram",
            "unions": [
              "Mizanagar",
              "Ctholia",
              "Boxmahmmud"
            ]
          },
          {
            "name": "Daganbhuiyan",
            "unions": [
              "Sindurpur",
              "Rajapur",
              "Purbachandrapur",
              "Ramnagar",
              "Yeakubpur",
              "Daganbhuiyan",
              "Matubhuiyan",
              "Jayloskor"
            ]
          }
        ]
      },
      {
        "name": "Brahmanbaria",
        "upazilas": [
          {
            "name": "Brahmanbaria Sadar",
            "unions": [
              "Basudeb",
              "Machihata",
              "Sultanpur",
              "Ramrail",
              "Sadekpur",
              "Talsahar",
              "Natai",
              "Natai",
              "Shuhilpur",
              "Bodhal",
              "Majlishpur"
            ]
          },
          {
            "name": "Kasba",
            "unions": [
              "Mulagram",
              "Mehari",
              "Badair",
              "Kharera",
              "Benauty",
              "Gopinathpur",
              "Kasbaw",
              "Kuti",
              "Kayempur",
              "Bayek"
            ]
          },
          {
            "name": "Nasirnagar",
            "unions": [
              "Chatalpar",
              "Bhalakut",
              "Kunda",
              "Goalnagar",
              "Nasirnagar",
              "Burishwar",
              "Fandauk",
              "Goniauk",
              "Chapartala",
              "Dharnondol",
              "Haripur",
              "Purbabhag",
              "Gokarna"
            ]
          },
          {
            "name": "Sarail",
            "unions": [
              "Auraol",
              "Pakshimuul",
              "Chunta",
              "Kalikaccha",
              "Panishor",
              "Sarail",
              "Noagoun",
              "Shahajadapur",
              "Shahbazpur"
            ]
          },
          {
            "name": "Ashuganj",
            "unions": [
              "Ashuganj",
              "Charchartala",
              "Durgapur",
              "Araishidha",
              "Talshaharw",
              "Sarifpur",
              "Lalpur",
              "Tarua"
            ]
          },
          {
            "name": "Akhaura",
            "unions": [
              "Monionda",
              "Dharkhar",
              "Mogra",
              "Akhauran",
              "Akhauras"
            ]
          },
          {
            "name": "Nabinagar",
            "unions": [
              "Barail",
              "Birgaon",
              "Krishnanagar",
              "Nathghar",
              "Biddayakut",
              "Nabinagare",
              "Nabinagarw",
              "Bitghar",
              "Shibpur",
              "Sreerampur",
              "Jinudpur",
              "Laurfatehpur",
              "Ibrahimpur",
              "Satmura",
              "Shamogram",
              "Rasullabad",
              "Barikandi",
              "Salimganj",
              "Ratanpur",
              "Kaitala (North)",
              "Kaitala (South)"
            ]
          },
          {
            "name": "Bancharampur",
            "unions": [
              "Tazkhali",
              "Pahariya Kandi",
              "Dariadulat",
              "Sonarampur",
              "Darikandi",
              "Saifullyakandi",
              "Bancharampur",
              "Ayabpur",
              "Fardabad",
              "Rupushdi",
              "Salimabad",
              "Ujanchar",
              "Manikpur"
            ]
          },
          {
            "name": "Bijoynagar",
            "unions": [
              "Bhudanty",
              "Chandura",
              "Ichapura",
              "Champaknagar",
              "Harashpur",
              "Pattan",
              "Singerbil",
              "Bishupor",
              "Charislampur",
              "Paharpur"
            ]
          }
        ]
      },
      {
        "name": "Rangamati",
        "upazilas": [
          {
            "name": "Rangamati Sadar",
            "unions": [
              "Jibtali",
              "Sapchari",
              "Kutukchari",
              "Bandukbhanga",
              "Balukhali",
              "Mogban"
            ]
          },
          {
            "name": "Kaptai",
            "unions": [
              "Raikhali",
              "Kaptai",
              "Wagga",
              "Chandraghona",
              "Chitmorom"
            ]
          },
          {
            "name": "Kawkhali",
            "unions": [
              "Ghagra",
              "Fatikchari",
              "Betbunia",
              "Kalampati"
            ]
          },
          {
            "name": "Baghaichari",
            "unions": [
              "Sajek",
              "Amtali",
              "Bongoltali",
              "Rupokari",
              "Marisha",
              "Khedarmara",
              "Sharoyatali",
              "Baghaichari"
            ]
          },
          {
            "name": "Barkal",
            "unions": [
              "Subalong",
              "Barkal",
              "Bushanchara",
              "Aimachara",
              "Borohorina"
            ]
          },
          {
            "name": "Langadu",
            "unions": [
              "Langad",
              "Maeinimukh",
              "Vasannadam",
              "Bogachattar",
              "Gulshakhali",
              "Kalapakujja",
              "Atarakchara"
            ]
          },
          {
            "name": "Rajasthali",
            "unions": [
              "Ghilachari",
              "Gaindya",
              "Bangalhalia"
            ]
          },
          {
            "name": "Belaichari",
            "unions": [
              "Kengrachari",
              "Belaichari",
              "Farua"
            ]
          },
          {
            "name": "Juraichari",
            "unions": [
              "Juraichari",
              "Banajogichara",
              "Moidong",
              "Dumdumya"
            ]
          },
          {
            "name": "Naniarchar",
            "unions": [
              "Sabekkhong",
              "Naniarchar",
              "Burighat",
              "Ghilachhari"
            ]
          }
        ]
      },
      {
        "name": "Noakhali",
        "upazilas": [
          {
            "name": "Noakhali Sadar",
            "unions": [
              "Charmatua",
              "Dadpur",
              "Noannoi",
              "Kadirhanif",
              "Binodpur",
              "Dharmapur",
              "Aujbalia",
              "Kaladara",
              "Ashwadia",
              "Newajpur",
              "East Charmatua",
              "Andarchar",
              "Noakhali"
            ]
          },
          {
            "name": "Companiganj",
            "unions": [
              "Sirajpur",
              "Charparboti",
              "Charhazari",
              "Charkakra",
              "Charfakira",
              "Musapur",
              "Charelahi",
              "Rampur"
            ]
          },
          {
            "name": "Begumganj",
            "unions": [
              "Amanullapur",
              "Gopalpur",
              "Jirtali",
              "Kutubpur",
              "Alyearpur",
              "Chayani",
              "Rajganj",
              "Eklashpur",
              "Begumganj",
              "Mirwarishpur",
              "Narottampur",
              "Durgapur",
              "Rasulpur",
              "Hajipur",
              "Sharifpur",
              "Kadirpur"
            ]
          },
          {
            "name": "Hatia",
            "unions": [
              "Sukhchar",
              "Nolchira",
              "Charishwar",
              "Charking",
              "Tomoroddi",
              "Sonadiya",
              "Burirchar",
              "Jahajmara",
              "Nijhumdwi"
            ]
          },
          {
            "name": "Subarnachar",
            "unions": [
              "Charjabbar",
              "Charbata",
              "Charclerk",
              "Charwapda",
              "Charjubilee",
              "Charaman Ullah",
              "East Charbata",
              "Mohammadpur"
            ]
          },
          {
            "name": "Kabirhat",
            "unions": [
              "Narottampur",
              "Dhanshiri",
              "Sundalpur",
              "Ghoshbag",
              "Chaprashirhat",
              "Dhanshalik",
              "Batoiya"
            ]
          },
          {
            "name": "Senbug",
            "unions": [
              "Chhatarpaia",
              "Kesharpar",
              "Dumurua",
              "Kadra",
              "Arjuntala",
              "Kabilpur",
              "Mohammadpur",
              "Nabipur",
              "Bejbagh"
            ]
          },
          {
            "name": "Chatkhil",
            "unions": [
              "Sahapur",
              "Ramnarayanpur",
              "Porokote",
              "Badalkot",
              "Panchgaon",
              "Hat-Pukuria Ghatlabag",
              "Noakhala",
              "Khilpara",
              "Mohammadpur"
            ]
          },
          {
            "name": "Sonaimori",
            "unions": [
              "Joyag",
              "Nodona",
              "Chashirhat",
              "Barogaon",
              "Ambarnagor",
              "Nateshwar",
              "Bajra",
              "Sonapur",
              "Deoti",
              "Amishapara"
            ]
          }
        ]
      },
      {
        "name": "Chandpur",
        "upazilas": [
          {
            "name": "Haimchar",
            "unions": [
              "Gazipur",
              "Algidurgapur (North)",
              "Algidurgapur (South)",
              "Nilkamal",
              "Haimchar",
              "Charbhairabi"
            ]
          },
          {
            "name": "Kachua",
            "unions": [
              "Pathair",
              "Bitara",
              "Shohodebpur (East)",
              "Shohodebpur (West)",
              "Kachua (North)",
              "Kachua (South)",
              "Gohat (North)",
              "Kadla",
              "Ashrafpur",
              "Gohat (South)",
              "Sachar",
              "Koroia"
            ]
          },
          {
            "name": "Shahrasti",
            "unions": [
              "Tamta (South)",
              "Tamta (North)",
              "Meher (North)",
              "Meher (South)",
              "Suchipara (North)",
              "Suchipara (South)",
              "Chitoshi (East)",
              "Raysree (South)",
              "Raysree (North)",
              "Chitoshiwest"
            ]
          },
          {
            "name": "Chandpur Sadar",
            "unions": [
              "Bishnapur",
              "Ashikati",
              "Shahmahmudpur",
              "Kalyanpur",
              "Rampur",
              "Maishadi",
              "Tarpurchandi",
              "Baghadi",
              "Laxmipur Model",
              "Hanarchar",
              "Chandra",
              "Rajrajeshwar",
              "Ibrahimpur",
              "Balia"
            ]
          },
          {
            "name": "Matlab South",
            "unions": [
              "Nayergaon (North)",
              "Nayergaon (South)",
              "Khadergaon",
              "Narayanpur",
              "Upadi (South)",
              "Upadi (North)"
            ]
          },
          {
            "name": "Hajiganj",
            "unions": [
              "Rajargaon (North)",
              "Bakila",
              "Kalocho (North)",
              "Hajiganj Sadar",
              "Kalocho (South)",
              "Barkul (East)",
              "Barkul (West)",
              "Hatila (East)",
              "Hatila (West)",
              "Gandharbapur (North)",
              "Gandharbapur (South)"
            ]
          },
          {
            "name": "Matlab North",
            "unions": [
              "Satnal",
              "Banganbari",
              "Sadullapur",
              "Durgapur",
              "Kalakanda",
              "Mohanpur",
              "Eklaspur",
              "Jahirabad",
              "Fatehpur (East)",
              "Fatehpur (West)",
              "Farajikandi",
              "Islamabad",
              "Sultanabad",
              "Gazra"
            ]
          },
          {
            "name": "Faridgonj",
            "unions": [
              "Balithuba (West)",
              "Balithuba (East)",
              "Subidpur (East)",
              "Subidpur (West)",
              "Gupti (West)",
              "Gupti (East)",
              "Paikpara (North)",
              "Paikpara (South)",
              "Gobindapur (North)",
              "Gobindapur (South)",
              "Chardukhia (East)",
              "Chardukhia (West)",
              "Faridgonj (South)",
              "Rupsha (South)",
              "Rupsha (North)"
            ]
          }
        ]
      },
      {
        "name": "Lakshmipur",
        "upazilas": [
          {
            "name": "Lakshmipur Sadar",
            "unions": [
              "Hamsadi (North)",
              "Hamsadi (South)",
              "Dalalbazar",
              "Charruhita",
              "Parbotinagar",
              "Bangakha",
              "Dattapara",
              "Basikpur",
              "Chandrogonj",
              "Nourthjoypur",
              "Hazirpara",
              "Charshahi",
              "Digli",
              "Laharkandi",
              "Vobanigonj",
              "Kusakhali",
              "Sakchor",
              "Tearigonj",
              "Tumchor",
              "Charramoni Mohon"
            ]
          },
          {
            "name": "Kamalnagar",
            "unions": [
              "Charkalkini",
              "Shaheberhat",
              "Char Martin",
              "Char Folcon",
              "Patarirhat",
              "Hajirhat",
              "Char Kadira",
              "Torabgonj",
              "Charlorench"
            ]
          },
          {
            "name": "Raipur",
            "unions": [
              "North Char Ababil",
              "North Char Bangshi",
              "Char Mohana",
              "Sonapur",
              "Charpata",
              "Bamni",
              "South Char Bangshi",
              "South Char Ababil",
              "Raipur",
              "Keora"
            ]
          },
          {
            "name": "Ramgati",
            "unions": [
              "Char Poragacha",
              "Charbadam",
              "Char Abdullah",
              "Alxendar",
              "Char Algi",
              "Char Ramiz",
              "Borokheri",
              "Chargazi"
            ]
          },
          {
            "name": "Ramganj",
            "unions": [
              "Kanchanpur",
              "Noagaon",
              "Bhadur",
              "Ichhapur",
              "Chandipur",
              "Lamchar",
              "Darbeshpur",
              "Karpara",
              "Bholakot",
              "Bhatra"
            ]
          }
        ]
      },
      {
        "name": "Chattogram",
        "upazilas": [
          {
            "name": "Rangunia",
            "unions": [
              "Rajanagar",
              "Hosnabad",
              "Swanirbor Rangunia",
              "Mariumnagar",
              "Parua",
              "Pomra",
              "Betagi",
              "Sharafbhata",
              "Shilok",
              "Chandraghona",
              "Kodala",
              "Islampur",
              "South Rajanagar",
              "Lalanagar"
            ]
          },
          {
            "name": "Sitakunda",
            "unions": [
              "Kumira",
              "Banshbaria",
              "Barabkunda",
              "Bariadyala",
              "Muradpur",
              "Saidpur",
              "Salimpur",
              "Sonaichhari",
              "Bhatiari"
            ]
          },
          {
            "name": "Mirsharai",
            "unions": [
              "Korerhat",
              "Hinguli",
              "Jorarganj",
              "Dhoom",
              "Osmanpur",
              "Ichakhali",
              "Katachhara",
              "Durgapur",
              "Mirsharai",
              "Mithanala",
              "Maghadia",
              "Khaiyachhara",
              "Mayani",
              "Haitkandi",
              "Wahedpur",
              "Saherkhali"
            ]
          },
          {
            "name": "Patiya",
            "unions": [
              "Asia",
              "Kachuai",
              "Kasiais",
              "Kusumpura",
              "Kelishahar",
              "Kolagaon",
              "Kharana",
              "Char Patharghata",
              "Char Lakshya",
              "Chanhara",
              "Janglukhain",
              "Jiri",
              "Juldha",
              "Dakkhin Bhurshi",
              "Dhalghat",
              "Bara Uthan",
              "Baralia",
              "Bhatikhain",
              "Sikalbaha",
              "Sobhandandi",
              "Habilasdwi",
              "Haidgaon"
            ]
          },
          {
            "name": "Sandwip",
            "unions": [
              "Rahmatpur",
              "Harispur",
              "Kalapania",
              "Amanullah",
              "Santoshpur",
              "Gachhua",
              "Bauria",
              "Haramia",
              "Magdhara",
              "Maitbhanga",
              "Sarikait",
              "Musapur",
              "Azimpur",
              "Urirchar"
            ]
          },
          {
            "name": "Banshkhali",
            "unions": [
              "Pukuria",
              "Sadhanpur",
              "Khankhanabad",
              "Baharchhara",
              "Kalipur",
              "Bailchhari",
              "Katharia",
              "Saral",
              "Silk",
              "Chambal",
              "Gandamara",
              "Sekherkhil",
              "Puichhari",
              "Chhanua"
            ]
          },
          {
            "name": "Boalkhali",
            "unions": [
              "Kandhurkhil",
              "Pashchim Gamdandi",
              "Purba Gomdandi",
              "Sakpura",
              "Saroatali",
              "Popadia",
              "Charandwi",
              "Sreepur-Kharandwi",
              "Amuchia",
              "Ahla Karaldenga"
            ]
          },
          {
            "name": "Anwara",
            "unions": [
              "Boirag",
              "Barasat",
              "Raipur",
              "Battali",
              "Barumchara",
              "Baroakhan",
              "Anwara",
              "Chatari",
              "Paraikora",
              "Haildhar",
              "Juidandi"
            ]
          },
          {
            "name": "Chandanaish",
            "unions": [
              "Kanchanabad",
              "Joara",
              "Barkal",
              "Barama",
              "Bailtali",
              "Satbaria",
              "Hashimpur",
              "Dohazari",
              "Dhopachhari"
            ]
          },
          {
            "name": "Satkania",
            "unions": [
              "Charati",
              "Khagaria",
              "Nalua",
              "Kanchana",
              "Amilaisi",
              "Eochiai",
              "Madarsa",
              "Dhemsa",
              "Paschim Dhemsa",
              "Keochia",
              "Kaliais",
              "Bazalia",
              "Puranagar",
              "Sadaha",
              "Satkania",
              "Sonakania"
            ]
          },
          {
            "name": "Lohagara",
            "unions": [
              "Padua",
              "Barahatia",
              "Amirabad",
              "Charamba",
              "Kalauzan",
              "Lohagara",
              "Putibila",
              "Chunati",
              "Adhunagar"
            ]
          },
          {
            "name": "Hathazari",
            "unions": [
              "Farhadabad",
              "Dhalai",
              "Mirjapur",
              "Nangolmora",
              "Gomanmordan",
              "Chipatali",
              "Mekhal",
              "Garduara",
              "Fathepur",
              "Chikondandi",
              "Uttar Madrasha",
              "Dakkin Madrasha",
              "Sikarpur",
              "Budirchar",
              "Hathazari"
            ]
          },
          {
            "name": "Fatikchhari",
            "unions": [
              "Dharmapur",
              "Baganbazar",
              "Dantmara",
              "Narayanhat",
              "Bhujpur",
              "Harualchari",
              "Paindong",
              "Kanchannagor",
              "Sunderpur",
              "Suabil",
              "Abdullapur",
              "Samitirhat",
              "Jafathagar",
              "Bokhtapur",
              "Roshangiri",
              "Nanupur",
              "Lelang",
              "Daulatpur"
            ]
          },
          {
            "name": "Raozan",
            "unions": [
              "Raozan",
              "Bagoan",
              "Binajuri",
              "Chikdair",
              "Dabua",
              "Purbagujra",
              "Paschim Gujra",
              "Gohira",
              "Holdia",
              "Kodolpur",
              "Noapara",
              "Pahartali",
              "Urkirchar",
              "Nowajushpur"
            ]
          },
          {
            "name": "Karnafuli",
            "unions": [
              "Char Patharghata",
              "Char Lakshya",
              "Juldha",
              "Barauthan",
              "Sikalbaha"
            ]
          }
        ]
      },
      {
        "name": "Coxsbazar",
        "upazilas": [
          {
            "name": "Coxsbazar Sadar",
            "unions": [
              "Islamabad",
              "Islampur",
              "Pokkhali",
              "Eidgaon",
              "Jalalabad",
              "Chowfaldandi",
              "Varuakhali",
              "Pmkhali",
              "Khurushkhul",
              "Jhilongjha"
            ]
          },
          {
            "name": "Chakaria",
            "unions": [
              "Kakhara",
              "Kaiar Bil",
              "Konakhali",
              "Khuntakhali",
              "Chiringa",
              "Demusia",
              "Dulahazara",
              "Paschim Bara Bheola",
              "Badarkhali",
              "Bamobil Chari",
              "Baraitali",
              "Bheola Manik Char",
              "Saharbil",
              "Surajpur Manikpur",
              "Harbang",
              "Fashiakhali"
            ]
          },
          {
            "name": "Kutubdia",
            "unions": [
              "Ali Akbar Deil",
              "Uttar Dhurung",
              "Kaiyarbil",
              "Dakshi Dhurung",
              "Baragho",
              "Lemsikhali"
            ]
          },
          {
            "name": "Ukhiya",
            "unions": [
              "Rajapalong",
              "Jaliapalong",
              "Holdiapalong",
              "Ratnapalong",
              "Palongkhali"
            ]
          },
          {
            "name": "Moheshkhali",
            "unions": [
              "Boro Moheshkhali",
              "Choto Moheshkhali",
              "Shaplapur",
              "Kutubjum",
              "Hoanak",
              "Kalarmarchhara",
              "Matarbari",
              "Dhalghata"
            ]
          },
          {
            "name": "Pekua",
            "unions": [
              "Ujantia",
              "Taitong",
              "Pekua",
              "Barabakia",
              "Magnama",
              "Rajakhali",
              "Shilkhali"
            ]
          },
          {
            "name": "Ramu",
            "unions": [
              "Fotekharkul",
              "Rajarkul",
              "Rashidnagar",
              "Khuniapalong",
              "Eidghar",
              "Chakmarkul",
              "Kacchapia",
              "Kauwarkho",
              "Dakkhin Mithachhari",
              "Jouarianala",
              "Garjoniya"
            ]
          },
          {
            "name": "Teknaf",
            "unions": [
              "Subrang",
              "Baharchara",
              "Hnila",
              "Whykong",
              "Saintmartin",
              "Teknaf Sadar"
            ]
          },
          {
            "name": "Eidgaon",
            "city": true
          }
        ]
      },
      {
        "name": "Khagrachhari",
        "upazilas": [
          {
            "name": "Khagrachhari Sadar",
            "unions": [
              "Khagrachhari Sadar",
              "Golabari",
              "Parachara",
              "Kamalchari"
            ]
          },
          {
            "name": "Dighinala",
            "unions": [
              "Merung",
              "Boalkhali",
              "Kabakhali",
              "Dighinala",
              "Babuchara"
            ]
          },
          {
            "name": "Panchari",
            "unions": [
              "Logang",
              "Changi",
              "Panchari",
              "Latiban"
            ]
          },
          {
            "name": "Laxmichhari",
            "unions": [
              "Dullyatali",
              "Barmachari",
              "Laxmichhari"
            ]
          },
          {
            "name": "Mohalchari",
            "unions": [
              "Bhaibonchara",
              "Mahalchari",
              "Mobachari",
              "Kayanghat",
              "Maischari"
            ]
          },
          {
            "name": "Manikchari",
            "unions": [
              "Manikchari",
              "Batnatali",
              "Jogyachola",
              "Tintahari"
            ]
          },
          {
            "name": "Ramgarh",
            "unions": [
              "Ramgarh",
              "Patachara",
              "Hafchari"
            ]
          },
          {
            "name": "Matiranga",
            "unions": [
              "Taindong",
              "Tabalchari",
              "Barnal",
              "Gomti",
              "Balchari",
              "Matiranga",
              "Guimara",
              "Amtali"
            ]
          },
          {
            "name": "Guimara",
            "city": true
          }
        ]
      },
      {
        "name": "Bandarban",
        "upazilas": [
          {
            "name": "Bandarban Sadar",
            "unions": [
              "Rajbila",
              "Tongkaboty",
              "Suwalok",
              "Bandarban Sadar",
              "Kuhalong"
            ]
          },
          {
            "name": "Alikadam",
            "unions": [
              "Alikadam Sadar",
              "Chwekhyong"
            ]
          },
          {
            "name": "Naikhongchhari",
            "unions": [
              "Naikhyongchari Sadar",
              "Gumdhum",
              "Baishari",
              "Sonaychari",
              "Duwchari"
            ]
          },
          {
            "name": "Rowangchhari",
            "unions": [
              "Rowangchari Sadar",
              "Taracha",
              "Alekyong",
              "Nawapotong"
            ]
          },
          {
            "name": "Lama",
            "unions": [
              "Gajalia",
              "Lama Sadar",
              "Fasiakhali",
              "Fythong",
              "Rupushipara",
              "Sarai",
              "Aziznagar"
            ]
          },
          {
            "name": "Ruma",
            "unions": [
              "Paind",
              "Ruma Sadar",
              "Ramakreprangsa",
              "Galanggya"
            ]
          },
          {
            "name": "Thanchi",
            "unions": [
              "Remakre",
              "Tind",
              "Thanchi Sadar",
              "Balipara"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Rajshahi",
    "districts": [
      {
        "name": "Sirajganj",
        "upazilas": [
          {
            "name": "Belkuchi",
            "unions": [
              "Rajapur",
              "Baradhul",
              "Belkuchi Sadar",
              "Dhukuriabera",
              "Doulatpur",
              "Bhangabari"
            ]
          },
          {
            "name": "Chauhali",
            "unions": [
              "Baghutia",
              "Gharjan",
              "Khaskaulia",
              "Khaspukuria",
              "Omarpur",
              "Sadia Chandpur",
              "Sthal"
            ]
          },
          {
            "name": "Kamarkhand",
            "unions": [
              "Bhadraghat",
              "Jamtail",
              "Jhawail",
              "Roydaulatpur"
            ]
          },
          {
            "name": "Kazipur",
            "unions": [
              "Chalitadangha",
              "Chargirish",
              "Gandail",
              "Kazipur Sadar",
              "Khasrajbari",
              "Maijbari",
              "Monsur Nagar",
              "Natuarpara",
              "Nishchintapur",
              "Sonamukhi",
              "Subhagacha",
              "Tekani"
            ]
          },
          {
            "name": "Raigonj",
            "unions": [
              "Brommogacha",
              "Chandaikona",
              "Dhamainagar",
              "Dhangora",
              "Dhubil",
              "Ghurka",
              "Nalka",
              "Pangashi",
              "Sonakhara"
            ]
          },
          {
            "name": "Shahjadpur",
            "unions": [
              "Beltail",
              "Jalalpur",
              "Kayempure",
              "Garadah",
              "Potazia",
              "Rupbati",
              "Gala",
              "Porzona",
              "Habibullah Nagar",
              "Khukni",
              "Koizuri",
              "Sonatoni",
              "Narina"
            ]
          },
          {
            "name": "Sirajganj Sadar",
            "unions": [
              "Bagbati",
              "Ratankandi",
              "Bohuli",
              "Sheyalkol",
              "Khokshabari",
              "Songacha",
              "Mesra",
              "Kowakhola",
              "Kaliahoripur",
              "Soydabad"
            ]
          },
          {
            "name": "Tarash",
            "unions": [
              "Baruhas",
              "Talam",
              "Soguna",
              "Magura Binod",
              "Naogaon",
              "Tarash Sadar",
              "Madhainagar",
              "Deshigram"
            ]
          },
          {
            "name": "Ullapara",
            "unions": [
              "Ullapara Sadar",
              "Ramkrisnopur",
              "Bangala",
              "Udhunia",
              "Boropangashi",
              "Durga Nagar",
              "Purnimagati",
              "Salanga",
              "Hatikumrul",
              "Borohor",
              "Ponchocroshi",
              "Salo",
              "Mohonpur"
            ]
          }
        ]
      },
      {
        "name": "Pabna",
        "upazilas": [
          {
            "name": "Sujanagar",
            "unions": [
              "Vaina",
              "Tantibonda",
              "Manikhat",
              "Dulai",
              "Ahammadpur",
              "Raninagar",
              "Satbaria",
              "Hatkhali",
              "Nazirganj",
              "Sagorkandi"
            ]
          },
          {
            "name": "Ishurdi",
            "unions": [
              "Sara",
              "Pakshi",
              "Muladuli",
              "Dashuria",
              "Silimpur",
              "Sahapur",
              "Luxmikunda"
            ]
          },
          {
            "name": "Bhangura",
            "unions": [
              "Bhangura",
              "Khanmarich",
              "Ashtamanisha",
              "Dilpasar",
              "Parbhangura"
            ]
          },
          {
            "name": "Pabna Sadar",
            "unions": [
              "Maligachha",
              "Malanchi",
              "Gayeshpur",
              "Ataikula",
              "Chartarapur",
              "Sadullahpur",
              "Bharara",
              "Dogachi",
              "Hemayetpur",
              "Dapunia"
            ]
          },
          {
            "name": "Bera",
            "unions": [
              "Haturia Nakalia",
              "Notun Varenga",
              "Koitola",
              "Chakla",
              "Jatsakhini",
              "Puran Varenga",
              "Ruppur",
              "Masumdia",
              "Dhalar Char"
            ]
          },
          {
            "name": "Atghoria",
            "unions": [
              "Majhpara",
              "Chandba",
              "Debottar",
              "Ekdanta",
              "Laxshmipur"
            ]
          },
          {
            "name": "Chatmohar",
            "unions": [
              "Handial",
              "Chhaikola",
              "Nimaichara",
              "Gunaigachha",
              "Parshadanga",
              "Failjana",
              "Mulgram",
              "Haripur",
              "Mothurapur",
              "Bilchalan",
              "Danthia Bamangram"
            ]
          },
          {
            "name": "Santhia",
            "unions": [
              "Nagdemra",
              "Dhulauri",
              "Bhulbaria",
              "Dhopadaha",
              "Karamja",
              "Kashinathpur",
              "Gaurigram",
              "Nandanpur",
              "Khetupara",
              "Ar-Ataikula"
            ]
          },
          {
            "name": "Faridpur",
            "unions": [
              "Brilahiribari",
              "Pungali",
              "Faridpur",
              "Hadal",
              "Banwarinagar",
              "Demra"
            ]
          }
        ]
      },
      {
        "name": "Bogura",
        "upazilas": [
          {
            "name": "Kahaloo",
            "unions": [
              "Birkedar",
              "Kalai",
              "Paikar",
              "Narhatta",
              "Murail",
              "Kahaloo",
              "Durgapur",
              "Jamgaon",
              "Malancha"
            ]
          },
          {
            "name": "Bogra Sadar",
            "unions": [
              "Fapore",
              "Shabgram",
              "Nishindara",
              "Erulia",
              "Rajapur",
              "Shakharia",
              "Sekherkola",
              "Gokul",
              "Noongola",
              "Lahiripara",
              "Namuja"
            ]
          },
          {
            "name": "Shariakandi",
            "unions": [
              "Sariakandi Sadar",
              "Narchi",
              "Bohail",
              "Chaluabari",
              "Chandanbaisha",
              "Hatfulbari",
              "Hatsherpur",
              "Karnibari",
              "Kazla",
              "Kutubpur",
              "Kamalpur",
              "Bhelabari"
            ]
          },
          {
            "name": "Shajahanpur",
            "unions": [
              "Asekpur",
              "Madla",
              "Majhira",
              "Aria",
              "Kharna",
              "Khottapara",
              "Chopinagar",
              "Amrul",
              "Gohail"
            ]
          },
          {
            "name": "Dupchanchia",
            "unions": [
              "Zianagar",
              "Chamrul",
              "Dupchanchia",
              "Gunahar",
              "Gobindapur",
              "Talora"
            ]
          },
          {
            "name": "Adamdighi",
            "unions": [
              "Chhatiangram",
              "Nasaratpur",
              "Adamdighi",
              "Kundagram",
              "Chapapur",
              "Shantahar"
            ]
          },
          {
            "name": "Nondigram",
            "unions": [
              "Burail",
              "Nandigram",
              "Bhatra",
              "Thalta Majhgram",
              "Bhatgram"
            ]
          },
          {
            "name": "Sonatala",
            "unions": [
              "Sonatala",
              "Balua",
              "Zorgacha",
              "Digdair",
              "Madhupur",
              "Pakulla",
              "Tekani Chukinagar"
            ]
          },
          {
            "name": "Dhunot",
            "unions": [
              "Nimgachi",
              "Kalerpara",
              "Chikashi",
              "Gossainbari",
              "Bhandarbari",
              "Gopalnagar",
              "Mothurapur",
              "Chowkibari",
              "Elangi",
              "Dhunat Sadar"
            ]
          },
          {
            "name": "Gabtali",
            "unions": [
              "Baliadighi",
              "Dakshinpara",
              "Durgahata",
              "Kagail",
              "Sonarai",
              "Rameshwarpur",
              "Naruamala",
              "Nepaltali",
              "Gabtali",
              "Mahishaban",
              "Nasipur"
            ]
          },
          {
            "name": "Sherpur",
            "unions": [
              "Mirzapur",
              "Khamarkandi",
              "Garidaha",
              "Kusumbi",
              "Bishalpur",
              "Shimabari",
              "Shahbondegi",
              "Sughat",
              "Khanpur",
              "Bhabanipur"
            ]
          },
          {
            "name": "Shibganj",
            "unions": [
              "Moidanhatta",
              "Kichok",
              "Atmul",
              "Pirob",
              "Majhihatta",
              "Buriganj",
              "Bihar",
              "Shibganj",
              "Deuly",
              "Sayedpur",
              "Mokamtala",
              "Raynagar"
            ]
          }
        ]
      },
      {
        "name": "Rajshahi",
        "upazilas": [
          {
            "name": "Paba",
            "unions": [
              "Darsanpara",
              "Hujuripara",
              "Damkura",
              "Horipur",
              "Horogram",
              "Harian",
              "Borgachi",
              "Parila"
            ]
          },
          {
            "name": "Durgapur",
            "unions": [
              "Naopara",
              "Kismatgankoir",
              "Pananagar",
              "Deluabari",
              "Jhaluka",
              "Maria",
              "Joynogor"
            ]
          },
          {
            "name": "Mohonpur",
            "unions": [
              "Dhuroil",
              "Ghasigram",
              "Raighati",
              "Mougachi",
              "Baksimoil",
              "Jahanabad"
            ]
          },
          {
            "name": "Charghat",
            "unions": [
              "Yousufpur",
              "Solua",
              "Sardah",
              "Nimpara",
              "Charghat",
              "Vialuxmipur"
            ]
          },
          {
            "name": "Puthia",
            "unions": [
              "Puthia",
              "Belpukuria",
              "Baneswar",
              "Valukgachi",
              "Shilmaria",
              "Jewpara"
            ]
          },
          {
            "name": "Bagha",
            "unions": [
              "Bajubagha",
              "Gorgori",
              "Pakuria",
              "Monigram",
              "Bausa",
              "Arani"
            ]
          },
          {
            "name": "Godagari",
            "unions": [
              "Godagari",
              "Mohonpur",
              "Pakri",
              "Risikul",
              "Gogram",
              "Matikata",
              "Dewpara",
              "Basudebpur",
              "Asariadaha"
            ]
          },
          {
            "name": "Tanore",
            "unions": [
              "Kalma",
              "Badhair",
              "Panchandar",
              "Saranjai",
              "Talondo",
              "Kamargaon",
              "Chanduria"
            ]
          },
          {
            "name": "Bagmara",
            "unions": [
              "Gobindopara",
              "Nordas",
              "Dippur",
              "Borobihanoli",
              "Auchpara",
              "Sreepur",
              "Basupara",
              "Kacharikoalipara",
              "Suvodanga",
              "Mariaup",
              "Ganipur",
              "Zhikara",
              "Gualkandi",
              "Hamirkutsa",
              "Jogipara",
              "Sonadanga"
            ]
          }
        ]
      },
      {
        "name": "Natore",
        "upazilas": [
          {
            "name": "Natore Sadar",
            "unions": [
              "Brahmapur",
              "Madhnagar",
              "Khajura",
              "Piprul",
              "Biprobelghoria",
              "Chhatni",
              "Tebaria",
              "Dighapatia",
              "Luxmipurkholabaria",
              "Barahorispur",
              "Kaphuria",
              "Halsa"
            ]
          },
          {
            "name": "Singra",
            "unions": [
              "Sukash",
              "Dahia",
              "Italy",
              "Kalam",
              "Chamari",
              "Hatiandaha",
              "Lalore",
              "Sherkole",
              "Tajpur",
              "Chaugram",
              "Chhatardighi",
              "Ramanandakhajura"
            ]
          },
          {
            "name": "Baraigram",
            "unions": [
              "Joari",
              "Baraigram",
              "Zonail",
              "Nagor",
              "Majgoan",
              "Gopalpur",
              "Chandai"
            ]
          },
          {
            "name": "Bagatipara",
            "unions": [
              "Panka",
              "Jamnagor",
              "Bagatipara",
              "Dayarampur",
              "Faguardiar"
            ]
          },
          {
            "name": "Lalpur",
            "unions": [
              "Lalpur",
              "Iswardi",
              "Chongdhupoil",
              "Arbab",
              "Bilmaria",
              "Duaria",
              "Oalia",
              "Durduria",
              "Arjunpur",
              "Kadimchilan"
            ]
          },
          {
            "name": "Gurudaspur",
            "unions": [
              "Nazirpur",
              "Biaghat",
              "Khubjipur",
              "Dharabarisha",
              "Moshindha",
              "Chapila"
            ]
          },
          {
            "name": "Naldanga",
            "city": true
          }
        ]
      },
      {
        "name": "Joypurhat",
        "upazilas": [
          {
            "name": "Akkelpur",
            "unions": [
              "Rukindipur",
              "Sonamukhi",
              "Tilakpur",
              "Raikali",
              "Gopinathpur"
            ]
          },
          {
            "name": "Kalai",
            "unions": [
              "Matrai",
              "Ahammedabad",
              "Punot",
              "Zindarpur",
              "Udaipur"
            ]
          },
          {
            "name": "Khetlal",
            "unions": [
              "Alampur",
              "Borail",
              "Tulshiganga",
              "Mamudpur",
              "Boratara"
            ]
          },
          {
            "name": "Panchbibi",
            "unions": [
              "Bagjana",
              "Dharanji",
              "Aymarasulpur",
              "Balighata",
              "Atapur",
              "Mohammadpur",
              "Aolai",
              "Kusumba"
            ]
          },
          {
            "name": "Joypurhat Sadar",
            "unions": [
              "Amdai",
              "Bamb",
              "Dogachi",
              "Puranapail",
              "Jamalpur",
              "Chakborkat",
              "Mohammadabad",
              "Dhalahar",
              "Bhadsha"
            ]
          }
        ]
      },
      {
        "name": "Chapainawabganj",
        "upazilas": [
          {
            "name": "Chapainawabganj Sadar",
            "unions": [
              "Alatuli",
              "Baroghoria",
              "Moharajpur",
              "Ranihati",
              "Baliadanga",
              "Gobratola",
              "Jhilim",
              "Char Anupnagar",
              "Debinagar",
              "Shahjahanpur",
              "Islampur",
              "Charbagdanga",
              "Narayanpur",
              "Sundarpur"
            ]
          },
          {
            "name": "Gomostapur",
            "unions": [
              "Radhanagar",
              "Rahanpur",
              "Boalia",
              "Bangabari",
              "Parbotipur",
              "Chowdala",
              "Gomostapur",
              "Alinagar"
            ]
          },
          {
            "name": "Nachol",
            "unions": [
              "Fhotepur",
              "Kosba",
              "Nezampur",
              "Nachol"
            ]
          },
          {
            "name": "Bholahat",
            "unions": [
              "Bholahat",
              "Jambaria",
              "Gohalbari",
              "Daldoli"
            ]
          },
          {
            "name": "Shibganj",
            "unions": [
              "Binodpur",
              "Chakkirti",
              "Daipukuria",
              "Dhainagar",
              "Durlovpur",
              "Ghorapakhia",
              "Mobarakpur",
              "Monakasha",
              "Noyalavanga",
              "Panka",
              "Chatrajitpur",
              "Shahabajpur",
              "Shyampur",
              "Kansat",
              "Ujirpur"
            ]
          }
        ]
      },
      {
        "name": "Naogaon",
        "upazilas": [
          {
            "name": "Mohadevpur",
            "unions": [
              "1nomohadevpur",
              "Hatur",
              "Khajur",
              "Chandas",
              "Enayetpur",
              "Sofapur",
              "Uttargram",
              "Cheragpur",
              "Vimpur",
              "Roygon"
            ]
          },
          {
            "name": "Badalgachi",
            "unions": [
              "Badalgachi",
              "Mothurapur",
              "Paharpur",
              "Mithapur",
              "Kola",
              "Bilashbari",
              "Adhaipur",
              "Balubhara"
            ]
          },
          {
            "name": "Patnitala",
            "unions": [
              "Patnitala",
              "Nirmail",
              "Dibar",
              "Akbarpur",
              "Matindar",
              "Krishnapur",
              "Patichrara",
              "Nazipur",
              "Ghasnagar",
              "Amair",
              "Shihara"
            ]
          },
          {
            "name": "Dhamoirhat",
            "unions": [
              "Dhamoirhat",
              "Alampur",
              "Umar",
              "Aranagar",
              "Jahanpur",
              "Isabpur",
              "Khelna",
              "Agradigun"
            ]
          },
          {
            "name": "Niamatpur",
            "unions": [
              "Hajinagar",
              "Chandannagar",
              "Bhabicha",
              "Niamatpur",
              "Rasulpur",
              "Paroil",
              "Sremantapur",
              "Bahadurpur"
            ]
          },
          {
            "name": "Manda",
            "unions": [
              "Varsho",
              "Valain",
              "Paranpur",
              "Manda",
              "Goneshpur",
              "Moinom",
              "Proshadpur",
              "Kosomba",
              "Tetulia",
              "Nurullabad",
              "Kalikapur",
              "Kashopara",
              "Koshob",
              "Bisnopur"
            ]
          },
          {
            "name": "Atrai",
            "unions": [
              "Shahagola",
              "Bhonpara",
              "Ahsanganj",
              "Panchupur",
              "Bisha",
              "Maniary",
              "Kalikapur",
              "Hatkalupara"
            ]
          },
          {
            "name": "Raninagar",
            "unions": [
              "Khatteshawr",
              "Kashimpur",
              "Gona",
              "Paroil",
              "Borgoca",
              "Kaligram",
              "Ekdala",
              "Mirat"
            ]
          },
          {
            "name": "Naogaon Sadar",
            "unions": [
              "Barshail",
              "Kritipur",
              "Baktiarpur",
              "Tilakpur",
              "Hapaniya",
              "Dubalhati",
              "Boalia",
              "Hashaigari",
              "Chandipur",
              "Bolihar",
              "Shekerpur",
              "Shailgachhi"
            ]
          },
          {
            "name": "Porsha",
            "unions": [
              "Nitpur",
              "Tetulia",
              "Chhaor",
              "Ganguria",
              "Ghatnagar",
              "Moshidpur"
            ]
          },
          {
            "name": "Sapahar",
            "unions": [
              "Sapahar",
              "Tilna",
              "Aihai",
              "Shironti",
              "Goala",
              "Patari"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Khulna",
    "districts": [
      {
        "name": "Jashore",
        "upazilas": [
          {
            "name": "Manirampur",
            "unions": [
              "Nehalpur",
              "Hariharnagar",
              "Haridaskati",
              "Shyamkur",
              "Rohita",
              "Maswimnagar",
              "Manoharpur",
              "Manirampur",
              "Bhojgati",
              "Durbadanga",
              "Dhakuria",
              "Jhanpa",
              "Chaluahati",
              "Khedapara",
              "Khanpur",
              "Kultia",
              "Kashimnagar"
            ]
          },
          {
            "name": "Abhaynagar",
            "unions": [
              "Baghutia",
              "Chalishia",
              "Sundoli",
              "Siddhipasha",
              "Sreedharpur",
              "Subharara",
              "Prambag",
              "Payra"
            ]
          },
          {
            "name": "Bagherpara",
            "unions": [
              "Jaharpur",
              "Jamdia",
              "Darajhat",
              "Dhalgram",
              "Narikelbaria",
              "Bandabilla",
              "Basuari",
              "Roypur",
              "Dohakula"
            ]
          },
          {
            "name": "Chougachha",
            "unions": [
              "Chougachha",
              "Jagadishpur",
              "Dhuliani",
              "Narayanpur",
              "Patibila",
              "Pashapole",
              "Fulsara",
              "Singhajhuli",
              "Sukpukhuria",
              "Swarupdaha",
              "Hakimpur"
            ]
          },
          {
            "name": "Jhikargacha",
            "unions": [
              "Gangananda",
              "Gadkhali",
              "Jhikargachha",
              "Nabharan",
              "Nibaskhola",
              "Panisara",
              "Bankra",
              "Shankarpur",
              "Shimulia",
              "Hajirbagh",
              "Magura"
            ]
          },
          {
            "name": "Keshabpur",
            "unions": [
              "Sufalakati",
              "Sagardari",
              "Majidpur",
              "Mongolkot",
              "Bidyanandakati",
              "Panjia",
              "Trimohini",
              "Gaurighona",
              "Keshabpur"
            ]
          },
          {
            "name": "Jessore Sadar",
            "unions": [
              "Lebutala",
              "Ichhali",
              "Arabpur",
              "Upasahar",
              "Kachua",
              "Kashimpur",
              "Chanchra",
              "Churamankati",
              "Narendrapur",
              "Noapara",
              "Fathehpur",
              "Basundia",
              "Ramnagar",
              "Haibatpur",
              "Dearamodel"
            ]
          },
          {
            "name": "Sharsha",
            "unions": [
              "Ulshi",
              "Sharsha",
              "Lakshmanpur",
              "Benapole",
              "Bahadurpur",
              "Bagachra",
              "Putkhali",
              "Nizampur",
              "Dihi",
              "Goga",
              "Kayba"
            ]
          }
        ]
      },
      {
        "name": "Satkhira",
        "upazilas": [
          {
            "name": "Assasuni",
            "unions": [
              "Anulia",
              "Assasuni",
              "Kadakati",
              "Kulla",
              "Khajra",
              "Durgapur",
              "Pratapnagar",
              "Budhhata",
              "Baradal",
              "Sreeula",
              "Sobhnali"
            ]
          },
          {
            "name": "Debhata",
            "unions": [
              "Kulia",
              "Debhata",
              "Noapara",
              "Parulia",
              "Sakhipur"
            ]
          },
          {
            "name": "Kalaroa",
            "unions": [
              "Kushadanga",
              "Keralkata",
              "Keragachhi",
              "Kaila",
              "Jallabad",
              "Jogikhali",
              "Langaljhara",
              "Sonabaria",
              "Helatala",
              "Chandanpur",
              "Deara",
              "Joynagar"
            ]
          },
          {
            "name": "Satkhira Sadar",
            "unions": [
              "Shibpur",
              "Labsa",
              "Bhomra",
              "Brahmarajpur",
              "Balli",
              "Banshdaha",
              "Baikari",
              "Fingri",
              "Dhulihar",
              "Jhaudanga",
              "Ghona",
              "Kuskhali",
              "Alipur",
              "Agardari"
            ]
          },
          {
            "name": "Shyamnagar",
            "unions": [
              "Atulia",
              "Ishwaripur",
              "Kaikhali",
              "Kashimari",
              "Nurnagar",
              "Padmapukur",
              "Burigoalini",
              "Bhurulia",
              "Munshiganj",
              "Ramjannagar",
              "Shyamnagar",
              "Gabura"
            ]
          },
          {
            "name": "Tala",
            "unions": [
              "Sarulia",
              "Magura",
              "Nagarghata",
              "Dhandia",
              "Tentulia",
              "Tala",
              "Jalalpur",
              "Khesra",
              "Khalishkhali",
              "Khalilnagar",
              "Kumira",
              "Islamkati"
            ]
          },
          {
            "name": "Kaliganj",
            "unions": [
              "Kushlia",
              "Champaphul",
              "Tarali",
              "Dakshin Sreepur",
              "Dhalbaria",
              "Nalta",
              "Bishnupur",
              "Bharasimla",
              "Mathureshpur",
              "Ratanpur",
              "Mautala",
              "Krishnanagar"
            ]
          }
        ]
      },
      {
        "name": "Meherpur",
        "upazilas": [
          {
            "name": "Mujibnagar",
            "unions": [
              "Dariapur",
              "Monakhali",
              "Bagowan",
              "Mohajanpur"
            ]
          },
          {
            "name": "Meherpur Sadar",
            "unions": [
              "Amjhupi",
              "Pirojpur",
              "Kutubpur",
              "Amdah",
              "Buripota"
            ]
          },
          {
            "name": "Gangni",
            "unions": [
              "Tentulbaria",
              "Kazipur",
              "Bamondi",
              "Motmura",
              "Sholotaka",
              "Shaharbati",
              "Dhankolla",
              "Raipur",
              "Kathuli"
            ]
          }
        ]
      },
      {
        "name": "Narail",
        "upazilas": [
          {
            "name": "Narail Sadar",
            "unions": [
              "Sheikhati",
              "Tularampur",
              "Kalora",
              "Shahabad",
              "Bashgram",
              "Habokhali",
              "Maijpara",
              "Bisali",
              "Chandiborpur",
              "Bhadrabila",
              "Auria",
              "Singasholpur",
              "Mulia"
            ]
          },
          {
            "name": "Lohagara",
            "unions": [
              "Lohagora",
              "Kashipur",
              "Naldi",
              "Noagram",
              "Lahuria",
              "Mallikpur",
              "Salnagar",
              "Lakshmipasha",
              "Joypur",
              "Kotakol",
              "Digholia",
              "Itna"
            ]
          },
          {
            "name": "Kalia",
            "unions": [
              "Jaynagor",
              "Pahordanga",
              "Babrahasla",
              "Salamabad",
              "Baioshona",
              "Chacuri",
              "Hamidpur",
              "Peroli",
              "Khashial",
              "Purulia",
              "Kalabaria",
              "Mauli",
              "Boronaleliasabad",
              "Panchgram"
            ]
          }
        ]
      },
      {
        "name": "Chuadanga",
        "upazilas": [
          {
            "name": "Chuadanga Sadar",
            "unions": [
              "Alukdia",
              "Mominpur",
              "Titudah",
              "Shankarchandra",
              "Begumpur",
              "Kutubpur",
              "Padmabila"
            ]
          },
          {
            "name": "Alamdanga",
            "unions": [
              "Bhangbaria",
              "Baradi",
              "Gangni",
              "Khadimpur",
              "Jehala",
              "Belgachi",
              "Dauki",
              "Jamjami",
              "Nagdah",
              "Kashkorara",
              "Chitla",
              "Kalidashpur",
              "Kumari",
              "Hardi",
              "Ailhash"
            ]
          },
          {
            "name": "Damurhuda",
            "unions": [
              "Damurhuda",
              "Karpashdanga",
              "Natipota",
              "Hawli",
              "Kurulgachhi",
              "Perkrishnopur Madna",
              "Juranpur"
            ]
          },
          {
            "name": "Jibannagar",
            "unions": [
              "Uthali",
              "Andulbaria",
              "Banka",
              "Shimanto",
              "Raypur",
              "Hasadah"
            ]
          }
        ]
      },
      {
        "name": "Kushtia",
        "upazilas": [
          {
            "name": "Kushtia Sadar",
            "unions": [
              "Hatash Haripur",
              "Barkhada",
              "Mazampur",
              "Bottail",
              "Alampur",
              "Ziaraakhi",
              "Ailchara",
              "Patikabari",
              "Jhaudia",
              "Ujangram",
              "Abdulpur",
              "Harinarayanpur",
              "Monohardia",
              "Goswami Durgapur"
            ]
          },
          {
            "name": "Kumarkhali",
            "unions": [
              "Kaya",
              "Jagonnathpur",
              "Sadki",
              "Shelaidah",
              "Nandolalpur",
              "Chapra",
              "Bagulat",
              "Jaduboyra",
              "Chadpur",
              "Panti",
              "Charsadipur"
            ]
          },
          {
            "name": "Khoksa",
            "unions": [
              "Khoksa",
              "Osmanpur",
              "Janipur",
              "Shimulia",
              "Joyntihazra",
              "Ambaria",
              "Bethbaria",
              "Shomospur",
              "Gopgram"
            ]
          },
          {
            "name": "Mirpur",
            "unions": [
              "Chithalia",
              "Bahalbaria",
              "Talbaria",
              "Baruipara",
              "Fulbaria",
              "Amla",
              "Sadarpur",
              "Chhatian",
              "Poradaha",
              "Kursha",
              "Ambaria",
              "Dhubail",
              "Malihad"
            ]
          },
          {
            "name": "Daulatpur",
            "unions": [
              "Daulatpur",
              "Adabaria",
              "Hogolbaria",
              "Boalia",
              "Philipnagor",
              "Aria",
              "Khalishakundi",
              "Chilmary",
              "Mothurapur",
              "Pragpur",
              "Piarpur",
              "Moricha",
              "Refaitpur",
              "Ramkrishnopur"
            ]
          },
          {
            "name": "Bheramara",
            "unions": [
              "Dharampur",
              "Bahirchar",
              "Mukarimpur",
              "Juniadah",
              "Chandgram",
              "Bahadurpur"
            ]
          }
        ]
      },
      {
        "name": "Magura",
        "upazilas": [
          {
            "name": "Shalikha",
            "unions": [
              "Dhaneshwargati",
              "Talkhari",
              "Arpara",
              "Shatakhali",
              "Shalikha",
              "Bunagati",
              "Gongarampur"
            ]
          },
          {
            "name": "Sreepur",
            "unions": [
              "Goyespur",
              "Sreekol",
              "Dariapur",
              "Kadirpara",
              "Shobdalpur",
              "Sreepur",
              "Nakol",
              "Amalshar"
            ]
          },
          {
            "name": "Magura Sadar",
            "unions": [
              "Hazipur",
              "Atharokhada",
              "Kosundi",
              "Bogia",
              "Hazrapur",
              "Raghobdair",
              "Jagdal",
              "Chawlia",
              "Satrijitpur",
              "Baroilpolita",
              "Kuchiamora",
              "Gopalgram",
              "Moghi"
            ]
          },
          {
            "name": "Mohammadpur",
            "unions": [
              "Digha",
              "Nohata",
              "Palashbaria",
              "Babukhali",
              "Balidia",
              "Binodpur",
              "Mohammadpur",
              "Rajapur"
            ]
          }
        ]
      },
      {
        "name": "Khulna",
        "upazilas": [
          {
            "name": "Paikgasa",
            "unions": [
              "Horidhali",
              "Goroikhali",
              "Kopilmuni",
              "Lota",
              "Deluti",
              "Loskor",
              "Godaipur",
              "Raruli",
              "Chandkhali",
              "Soladana"
            ]
          },
          {
            "name": "Fultola",
            "unions": [
              "Fultola",
              "Damodar",
              "Atra Gilatola",
              "Jamira"
            ]
          },
          {
            "name": "Digholia",
            "unions": [
              "Senhati",
              "Gajirhat",
              "Barakpur",
              "Aronghata",
              "Jogipol",
              "Digholia"
            ]
          },
          {
            "name": "Rupsha",
            "unions": [
              "Aichgati",
              "Srifoltola",
              "Noihati",
              "Tsb",
              "Ghatvog"
            ]
          },
          {
            "name": "Terokhada",
            "unions": [
              "Terokhada",
              "Chagladoho",
              "Barasat",
              "Sochiadaho",
              "Modhupur",
              "Ajgora"
            ]
          },
          {
            "name": "Dumuria",
            "unions": [
              "Dumuria",
              "Magurghona",
              "Vandarpara",
              "Sahos",
              "Rudaghora",
              "Ghutudia",
              "Shovna",
              "Khornia",
              "Atlia",
              "Dhamalia",
              "Raghunathpur",
              "Rongpur",
              "Shorafpur",
              "Magurkhali"
            ]
          },
          {
            "name": "Botiaghata",
            "unions": [
              "Botiaghata",
              "Amirpur",
              "Gongarampur",
              "Surkhali",
              "Vandarkot",
              "Baliadanga",
              "Jolma"
            ]
          },
          {
            "name": "Dakop",
            "unions": [
              "Dakop",
              "Bajua",
              "Kamarkhola",
              "Tildanga",
              "Sutarkhali",
              "Laudoba",
              "Pankhali",
              "Banishanta",
              "Koilashgonj"
            ]
          },
          {
            "name": "Koyra",
            "unions": [
              "Koyra",
              "Moharajpur",
              "Moheswaripur",
              "North Bedkashi",
              "South Bedkashi",
              "Amadi",
              "Bagali"
            ]
          }
        ]
      },
      {
        "name": "Bagerhat",
        "upazilas": [
          {
            "name": "Fakirhat",
            "unions": [
              "Betaga",
              "Lakhpur",
              "Fakirhat",
              "Bahirdia-Mansa",
              "Piljanga",
              "Naldha-Mouvhog",
              "Mulghar",
              "Suvhadia"
            ]
          },
          {
            "name": "Bagerhat Sadar",
            "unions": [
              "Karapara",
              "Bamorta",
              "Gotapara",
              "Bishnapur",
              "Baruipara",
              "Jatharapur",
              "Shaitgomboj",
              "Khanpur",
              "Rakhalgachi",
              "Dema"
            ]
          },
          {
            "name": "Mollahat",
            "unions": [
              "Udoypur",
              "Chunkhola",
              "Gangni",
              "Kulia",
              "Gaola",
              "Kodalia",
              "Atjuri"
            ]
          },
          {
            "name": "Sarankhola",
            "unions": [
              "Dhanshagor",
              "Khontakata",
              "Rayenda",
              "Southkhali"
            ]
          },
          {
            "name": "Rampal",
            "unions": [
              "Gouramva",
              "Uzzalkur",
              "Baintala",
              "Rampal",
              "Rajnagar",
              "Hurka",
              "Perikhali",
              "Vospatia",
              "Mollikerbar",
              "Bastoli"
            ]
          },
          {
            "name": "Morrelganj",
            "unions": [
              "Teligati",
              "Panchakaran",
              "Putikhali",
              "Daibagnyahati",
              "Ramchandrapur",
              "Chingrakhali",
              "Jiudhara",
              "Hoglapasha",
              "Banagram",
              "Balaibunia",
              "Hoglabunia",
              "Baharbunia",
              "Morrelganj",
              "Khaulia",
              "Nishanbaria",
              "Baraikhali"
            ]
          },
          {
            "name": "Kachua",
            "unions": [
              "Gojalia",
              "Dhopakhali",
              "Moghia",
              "Kachua",
              "Gopalpur",
              "Raripara",
              "Badhal"
            ]
          },
          {
            "name": "Mongla",
            "unions": [
              "Burrirdangga",
              "Mithakhali",
              "Sonailtala",
              "Chadpai",
              "Chila",
              "Sundarban"
            ]
          },
          {
            "name": "Chitalmari",
            "unions": [
              "Barobaria",
              "Kalatala",
              "Hizla",
              "Shibpur",
              "Chitalmari",
              "Charbaniri",
              "Shantoshpur"
            ]
          }
        ]
      },
      {
        "name": "Jhenaidah",
        "upazilas": [
          {
            "name": "Jhenaidah Sadar",
            "unions": [
              "Sadhuhati",
              "Modhuhati",
              "Saganna",
              "Halidhani",
              "Kumrabaria",
              "Ganna",
              "Maharazpur",
              "Paglakanai",
              "Porahati",
              "Harishongkorpur",
              "Padmakar",
              "Dogachhi",
              "Furshondi",
              "Ghorshal",
              "Kalicharanpur",
              "Surat",
              "Naldanga"
            ]
          },
          {
            "name": "Shailkupa",
            "unions": [
              "Tribeni",
              "Mirzapur",
              "Dignagore",
              "Kancherkol",
              "Sarutia",
              "Hakimpur",
              "Dhaloharachandra",
              "Manoharpur",
              "Bogura",
              "Abaipur",
              "Nityanandapur",
              "Umedpur",
              "Dudshar",
              "Fulhari"
            ]
          },
          {
            "name": "Harinakundu",
            "unions": [
              "Bhayna",
              "Joradah",
              "Taherhuda",
              "Daulatpur",
              "Kapashatia",
              "Falsi",
              "Raghunathpur",
              "Chandpur"
            ]
          },
          {
            "name": "Kaliganj",
            "unions": [
              "Sundarpurdurgapur",
              "Jamal",
              "Kola",
              "Niamatpur",
              "Simla-Rokonpur",
              "Trilochanpur",
              "Raygram",
              "Maliat",
              "Barabazar",
              "Kashtabhanga",
              "Rakhalgachhi"
            ]
          },
          {
            "name": "Kotchandpur",
            "unions": [
              "Sabdalpur",
              "Dora",
              "Kushna",
              "Baluhar",
              "Elangi"
            ]
          },
          {
            "name": "Moheshpur",
            "unions": [
              "Sbk",
              "Fatepur",
              "Panthapara",
              "Swaruppur",
              "Shyamkur",
              "Nepa",
              "Kazirber",
              "Banshbaria",
              "Jadabpur",
              "Natima",
              "Manderbaria",
              "Azampur"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Barisal",
    "districts": [
      {
        "name": "Jhalakathi",
        "upazilas": [
          {
            "name": "Jhalakathi Sadar",
            "unions": [
              "Basanda",
              "Binoykati",
              "Gabharamchandrapur",
              "Keora",
              "Kirtipasha",
              "Nabagram",
              "Nathullabad",
              "Ponabalia",
              "Sekherhat",
              "Gabkhandhansiri"
            ]
          },
          {
            "name": "Kathalia",
            "unions": [
              "Amua",
              "Awrabunia",
              "Chenchrirampur",
              "Kanthalia",
              "Patikhalghata",
              "Shaulajalia"
            ]
          },
          {
            "name": "Nalchity",
            "unions": [
              "Subidpur",
              "Siddhakati",
              "Ranapasha",
              "Nachanmohal",
              "Mollahat",
              "Magar",
              "Kusanghal",
              "Kulkathi",
              "Dapdapia",
              "Bharabpasha"
            ]
          },
          {
            "name": "Rajapur",
            "unions": [
              "Suktagarh",
              "Saturia",
              "Mathbari",
              "Galua",
              "Baraia",
              "Rajapur"
            ]
          }
        ]
      },
      {
        "name": "Patuakhali",
        "upazilas": [
          {
            "name": "Bauphal",
            "unions": [
              "Adabaria",
              "Bauphal",
              "Daspara",
              "Kalaiya",
              "Nawmala",
              "Najirpur",
              "Madanpura",
              "Boga",
              "Kanakdia",
              "Shurjamoni",
              "Keshabpur",
              "Dhulia",
              "Kalisuri",
              "Kachipara"
            ]
          },
          {
            "name": "Patuakhali Sadar",
            "unions": [
              "Laukathi",
              "Lohalia",
              "Kamalapur",
              "Jainkathi",
              "Kalikapur",
              "Badarpur",
              "Itbaria",
              "Marichbunia",
              "Auliapur",
              "Chotobighai",
              "Borobighai",
              "Madarbunia"
            ]
          },
          {
            "name": "Dumki",
            "unions": [
              "Pangasia",
              "Muradia",
              "Labukhali",
              "Angaria",
              "Sreerampur"
            ]
          },
          {
            "name": "Dashmina",
            "unions": [
              "Bashbaria",
              "Rangopaldi",
              "Alipur",
              "Betagi Shankipur",
              "Dashmina",
              "Baharampur"
            ]
          },
          {
            "name": "Kalapara",
            "unions": [
              "Chakamaia",
              "Tiakhali",
              "Lalua",
              "Dhankhali",
              "Mithagonj",
              "Nilgonj",
              "Dulaser",
              "Latachapli",
              "Mahipur",
              "Dalbugonj",
              "Baliatali",
              "Champapur"
            ]
          },
          {
            "name": "Mirzaganj",
            "unions": [
              "Madhabkhali",
              "Mirzaganj",
              "Amragachia",
              "Deuli Subidkhali",
              "Kakrabunia",
              "Majidbaria"
            ]
          },
          {
            "name": "Galachipa",
            "unions": [
              "Amkhola",
              "Golkhali",
              "Galachipa",
              "Panpatty",
              "Ratandi Taltali",
              "Dakua",
              "Chiknikandi",
              "Gazalia",
              "Charkajol",
              "Charbiswas",
              "Bakulbaria",
              "Kalagachhia"
            ]
          },
          {
            "name": "Rangabali",
            "unions": [
              "Rangabali",
              "Barobaisdia",
              "Chattobaisdia",
              "Charmontaz",
              "Chalitabunia"
            ]
          }
        ]
      },
      {
        "name": "Pirojpur",
        "upazilas": [
          {
            "name": "Pirojpur Sadar",
            "unions": [
              "Shikder Mallik",
              "Kodomtala",
              "Durgapur",
              "Kolakhali",
              "Tona",
              "Shariktola",
              "Shankorpasa"
            ]
          },
          {
            "name": "Nazirpur",
            "unions": [
              "Mativangga",
              "Malikhali",
              "Daulbari Dobra",
              "Dirgha",
              "Kolardoania",
              "Sriramkathi",
              "Shakhmatia",
              "Nazirpur Sadar",
              "Shakharikathi"
            ]
          },
          {
            "name": "Kawkhali",
            "unions": [
              "Sayna Rogunathpur",
              "Amrazuri",
              "Kawkhali Sadar",
              "Chirapara",
              "Shialkhathi"
            ]
          },
          {
            "name": "Zianagar",
            "unions": [
              "Balipara",
              "Pattashi",
              "Parerhat"
            ]
          },
          {
            "name": "Bhandaria",
            "unions": [
              "Vitabaria",
              "Nodmulla",
              "Telikhali",
              "Ekree",
              "Dhaoa",
              "Vandaria Sadar",
              "Gouripur"
            ]
          },
          {
            "name": "Mathbaria",
            "unions": [
              "Tuskhali",
              "Dhanisafa",
              "Mirukhali",
              "Tikikata",
              "Betmor Rajpara",
              "Amragachia",
              "Shapleza",
              "Daudkhali",
              "Mathbaria",
              "Baramasua",
              "Haltagulishakhali"
            ]
          },
          {
            "name": "Nesarabad",
            "unions": [
              "Boldia",
              "Sohagdal",
              "Atghorkuriana",
              "Jolabari",
              "Doyhary",
              "Guarekha",
              "Somudoykathi",
              "Sutiakathi",
              "Sarengkathi",
              "Shorupkathi"
            ]
          }
        ]
      },
      {
        "name": "Barisal",
        "upazilas": [
          {
            "name": "Barisal Sadar",
            "unions": [
              "Raipasha Karapur",
              "Kashipur",
              "Charbaria",
              "Shyastabad",
              "Charmonai",
              "Zagua",
              "Charcowa",
              "Chandpura",
              "Tungibaria",
              "Chandramohan"
            ]
          },
          {
            "name": "Bakerganj",
            "unions": [
              "Charamaddi",
              "Charade",
              "Darial",
              "Dudhal",
              "Durgapasha",
              "Faridpur",
              "Kabai",
              "Nalua",
              "Kalashkathi",
              "Garuria",
              "Bharpasha",
              "Rangasree",
              "Padreeshibpur",
              "Niamoti"
            ]
          },
          {
            "name": "Babuganj",
            "unions": [
              "Jahangir Nagar",
              "Kaderpur",
              "Deherhoti",
              "Chandpasha",
              "Rahamtpur",
              "Madhbpasha"
            ]
          },
          {
            "name": "Wazirpur",
            "unions": [
              "Shatla",
              "Harta",
              "Jalla",
              "Otra",
              "Sholok",
              "Barakhota",
              "Bamrail",
              "Shikerpur Wazirpur",
              "Gouthia"
            ]
          },
          {
            "name": "Banaripara",
            "unions": [
              "Bisharkandi",
              "Illuhar",
              "Sayedkathi",
              "Chakhar",
              "Saliabakpur",
              "Baishari",
              "Banaripara",
              "Udykhati"
            ]
          },
          {
            "name": "Gournadi",
            "unions": [
              "Khanjapur",
              "Barthi",
              "Chandshi",
              "Mahilara",
              "Nalchira",
              "Batajore",
              "Sarikal"
            ]
          },
          {
            "name": "Agailjhara",
            "unions": [
              "Rajihar",
              "Bakal",
              "Bagdha",
              "Goila",
              "Ratnapur"
            ]
          },
          {
            "name": "Mehendiganj",
            "unions": [
              "Andarmanik",
              "Lata",
              "Charakkorea",
              "Ulania",
              "Mehendigong",
              "Biddanandapur",
              "Bhashanchar",
              "Jangalia",
              "Alimabad",
              "Chandpur",
              "Darirchar Khajuria",
              "Gobindapur",
              "Chargopalpur"
            ]
          },
          {
            "name": "Muladi",
            "unions": [
              "Batamara",
              "Nazirpur",
              "Safipur",
              "Gaschua",
              "Charkalekha",
              "Muladi",
              "Kazirchar"
            ]
          },
          {
            "name": "Hizla",
            "unions": [
              "Harinathpur",
              "Memania",
              "Guabaria",
              "Barjalia",
              "Hizla Gourabdi",
              "Dhulkhola"
            ]
          }
        ]
      },
      {
        "name": "Bhola",
        "upazilas": [
          {
            "name": "Bhola Sadar",
            "unions": [
              "Razapur",
              "Ilisha",
              "Westilisa",
              "Kachia",
              "Bapta",
              "Dhania",
              "Shibpur",
              "Alinagor",
              "Charshamya",
              "Vhelumia",
              "Vheduria",
              "North Digholdi",
              "South Digholdi"
            ]
          },
          {
            "name": "Borhan Sddin",
            "unions": [
              "Boromanika",
              "Deula",
              "Kutuba",
              "Pakshia",
              "Kachia"
            ]
          },
          {
            "name": "Charfesson",
            "unions": [
              "Osmangonj",
              "Aslampur",
              "Zinnagor",
              "Aminabad",
              "Nilkomol",
              "Charmadraj",
              "Awajpur",
              "Awajpur",
              "Charkolmi",
              "Charmanika",
              "Hazarigonj",
              "Jahanpur",
              "Nurabad",
              "Rasulpur",
              "Kukrimukri",
              "Abubakarpur",
              "Abdullahpur",
              "Nazrulnagar",
              "Mujibnagar",
              "Dalchar"
            ]
          },
          {
            "name": "Doulatkhan",
            "unions": [
              "Madanpur",
              "Madua",
              "Charpata",
              "North Joy Nagar",
              "South Joy Nagar",
              "Char Khalipa",
              "Sayedpur",
              "Hazipur",
              "Vhovanipur"
            ]
          },
          {
            "name": "Monpura",
            "unions": [
              "Hazirhat",
              "Monpura",
              "North Sakuchia",
              "South Sakuchia"
            ]
          },
          {
            "name": "Tazumuddin",
            "unions": [
              "Chanchra",
              "Shambupur",
              "Sonapur",
              "Chadpur",
              "Baro Molongchora"
            ]
          },
          {
            "name": "Lalmohan",
            "unions": [
              "Badarpur",
              "Charbhuta",
              "Kalma",
              "Dholigour Nagar",
              "Lalmohan",
              "Lord Hardinge",
              "Ramagonj",
              "Paschim Char Umed",
              "Farajgonj"
            ]
          }
        ]
      },
      {
        "name": "Barguna",
        "upazilas": [
          {
            "name": "Amtali",
            "unions": [
              "Amtali",
              "Gulishakhali",
              "Athrogasia",
              "Kukua",
              "Haldia",
              "Chotobogi",
              "Arpangasia",
              "Chowra"
            ]
          },
          {
            "name": "Barguna Sadar",
            "unions": [
              "M. Baliatali",
              "Noltona",
              "Bodorkhali",
              "Gowrichanna",
              "Fuljhuri",
              "Keorabunia",
              "Ayla Patakata",
              "Burirchor",
              "Dhalua",
              "Barguna"
            ]
          },
          {
            "name": "Betagi",
            "unions": [
              "Bibichini",
              "Betagi",
              "Hosnabad",
              "Mokamia",
              "Buramajumder",
              "Kazirabad",
              "Sarisamuri"
            ]
          },
          {
            "name": "Bamna",
            "unions": [
              "Bukabunia",
              "Bamna",
              "Ramna",
              "Doutola"
            ]
          },
          {
            "name": "Pathorghata",
            "unions": [
              "Raihanpur",
              "Nachnapara",
              "Charduany",
              "Patharghata",
              "Kalmegha",
              "Kakchira",
              "Kathaltali"
            ]
          },
          {
            "name": "Taltali",
            "unions": [
              "Karibaria",
              "Panchakoralia",
              "Barabagi",
              "Chhotabagi",
              "Nishanbaria",
              "Sarikkhali",
              "Sonakata"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Sylhet",
    "districts": [
      {
        "name": "Sylhet",
        "upazilas": [
          {
            "name": "Balaganj",
            "unions": [
              "East Poilanpur",
              "Boaljur",
              "Dewanbazar",
              "West Gouripur",
              "East Gouripur",
              "Balaganj"
            ]
          },
          {
            "name": "Beanibazar",
            "unions": [
              "Tilpara",
              "Alinagar",
              "Charkhai",
              "Dubag",
              "Sheola",
              "Kurarbazar",
              "Mathiura",
              "Mullapur",
              "Muria",
              "Lauta"
            ]
          },
          {
            "name": "Bishwanath",
            "unions": [
              "Rampasha",
              "Lamakazi",
              "Khajanchi",
              "Alankari",
              "Dewkalash",
              "Bishwanath",
              "Doshghar",
              "Daulatpur"
            ]
          },
          {
            "name": "Companiganj",
            "unions": [
              "Telikhal",
              "Islampur Paschim",
              "Islampur Purba",
              "Isakalas",
              "Uttor Ronikhai",
              "Dakkin Ronikhai"
            ]
          },
          {
            "name": "Fenchuganj",
            "unions": [
              "Ghilachora",
              "Fenchuganj",
              "Uttar Kushiara",
              "Uttar Fenchuganj",
              "Maijgaon"
            ]
          },
          {
            "name": "Golapganj",
            "unions": [
              "Golapganj",
              "Fulbari",
              "Lakshmipasha",
              "Budhbaribazar",
              "Dhakadakshin",
              "Sharifganj",
              "Uttar Badepasha",
              "Lakshanaband",
              "Bhadeshwar",
              "West Amura"
            ]
          },
          {
            "name": "Gowainghat",
            "unions": [
              "Fothepur",
              "Rustampur",
              "Paschim Jaflong",
              "Purba Jaflong",
              "Lengura",
              "Alirgaon",
              "Nandirgaon",
              "Towakul",
              "Daubari"
            ]
          },
          {
            "name": "Jaintiapur",
            "unions": [
              "Nijpat",
              "Jaintapur",
              "Charikatha",
              "Darbast",
              "Fatehpur",
              "Chiknagul"
            ]
          },
          {
            "name": "Kanaighat",
            "unions": [
              "Rajagonj",
              "Lakshiprashad Purbo",
              "Lakshiprashad Pashim",
              "Digirpar Purbo",
              "Satbakh",
              "Barachotul",
              "Kanaighat",
              "Dakhin Banigram",
              "Jinghabari"
            ]
          },
          {
            "name": "Sylhet Sadar",
            "unions": [
              "Jalalabad",
              "Hatkhula",
              "Khadimnagar",
              "Khadimpara",
              "Tultikor",
              "Tukerbazar",
              "Mugolgaon",
              "Kandigaon"
            ]
          },
          {
            "name": "Zakiganj",
            "unions": [
              "Manikpur",
              "Sultanpur",
              "Barohal",
              "Birorsri",
              "Kajalshah",
              "Kolachora",
              "Zakiganj",
              "Barothakuri",
              "Kaskanakpur"
            ]
          },
          {
            "name": "Dakshinsurma",
            "unions": [
              "Lalabazar",
              "Moglabazar",
              "Boroikandi",
              "Silam",
              "Daudpur",
              "Mollargaon",
              "Kuchai",
              "Kamalbazar",
              "Jalalpur",
              "Tetli"
            ]
          },
          {
            "name": "Osmaninagar",
            "unions": [
              "Tazpur",
              "Umorpur",
              "West Poilanpur",
              "Burungabazar",
              "Goalabazar",
              "Doyamir",
              "Usmanpur",
              "Sadipur"
            ]
          }
        ]
      },
      {
        "name": "Moulvibazar",
        "upazilas": [
          {
            "name": "Barlekha",
            "unions": [
              "Talimpur",
              "Borni",
              "Dasherbazar",
              "Nizbahadurpur",
              "Uttar Shahbajpur",
              "Dakkhin Shahbajpur",
              "Talimpur",
              "Baralekha",
              "Dakshinbhag Uttar",
              "Dakshinbhag Dakkhin",
              "Sujanagar"
            ]
          },
          {
            "name": "Kamolganj",
            "unions": [
              "Adampur",
              "Patanushar",
              "Madhabpur",
              "Rahimpur",
              "Shamshernagar",
              "Kamalgonj",
              "Islampur",
              "Munshibazar",
              "Alinagar"
            ]
          },
          {
            "name": "Kulaura",
            "unions": [
              "Baramchal",
              "Bhukshimail",
              "Joychandi",
              "Brammanbazar",
              "Kadipur",
              "Kulaura",
              "Rauthgaon",
              "Tilagaon",
              "Sharifpur",
              "Prithimpassa",
              "Kormodha",
              "Bhatera",
              "Hazipur"
            ]
          },
          {
            "name": "Moulvibazar Sadar",
            "unions": [
              "Amtail",
              "Khalilpur",
              "Monumukh",
              "Kamalpur",
              "Apar Kagabala",
              "Akhailkura",
              "Ekatuna",
              "Chadnighat",
              "Konokpur",
              "Nazirabad",
              "Mostafapur",
              "Giasnagar"
            ]
          },
          {
            "name": "Rajnagar",
            "unions": [
              "Fotepur",
              "Uttorbhag",
              "Munsibazar",
              "Panchgaon",
              "Rajnagar",
              "Tengra",
              "Kamarchak",
              "Munsurnagar"
            ]
          },
          {
            "name": "Sreemangal",
            "unions": [
              "Mirzapur",
              "Bhunabir",
              "Sreemangal",
              "Sindurkhan",
              "Kalapur",
              "Ashidron",
              "Rajghat",
              "Kalighat",
              "Satgaon"
            ]
          },
          {
            "name": "Juri",
            "unions": [
              "Jafornagar",
              "West Juri",
              "Gualbari",
              "Sagornal",
              "Fultola",
              "Eastjuri"
            ]
          }
        ]
      },
      {
        "name": "Habiganj",
        "upazilas": [
          {
            "name": "Nabiganj",
            "unions": [
              "Barabhakoir Paschim",
              "Barabhakoir Purba",
              "Inatganj",
              "Digholbak",
              "Aushkandi",
              "Kurshi",
              "Kargoan",
              "Nabiganj Sadar",
              "Bausha",
              "Debparra",
              "Gaznaipur",
              "Kaliarbhanga",
              "Paniumda"
            ]
          },
          {
            "name": "Bahubal",
            "unions": [
              "Snanghat",
              "Putijuri",
              "Satkapon",
              "Bahubal Sadar",
              "Lamatashi",
              "Mirpur",
              "Bhadeshwar"
            ]
          },
          {
            "name": "Ajmiriganj",
            "unions": [
              "Shibpasha",
              "Kakailsao",
              "Ajmiriganj Sadar",
              "Badolpur",
              "Jolsuka"
            ]
          },
          {
            "name": "Baniachong",
            "unions": [
              "Baniachong North East",
              "Baniachong North West",
              "Baniachong South East",
              "Baniachong South West",
              "Daulatpur",
              "Khagaura",
              "Baraiuri",
              "Kagapasha",
              "Pukra",
              "Subidpur",
              "Makrampur",
              "Sujatpur",
              "Mandari",
              "Muradpur",
              "Pailarkandi"
            ]
          },
          {
            "name": "Lakhai",
            "unions": [
              "Lakhai",
              "Murakari",
              "Muriauk",
              "Bamoi",
              "Karab",
              "Bulla"
            ]
          },
          {
            "name": "Chunarughat",
            "unions": [
              "Gazipur",
              "Ahammadabad",
              "Deorgach",
              "Paikpara",
              "Shankhala",
              "Chunarughat",
              "Ubahata",
              "Shatiajuri",
              "Ranigaon",
              "Mirashi"
            ]
          },
          {
            "name": "Habiganj Sadar",
            "unions": [
              "Lukra",
              "Richi",
              "Teghoria",
              "Poil",
              "Gopaya",
              "Rajiura",
              "Nurpur",
              "Shayestaganj",
              "Nijampur",
              "Laskerpur"
            ]
          },
          {
            "name": "Madhabpur",
            "unions": [
              "Dharmaghar",
              "Choumohani",
              "Bahara",
              "Adaoir",
              "Andiura",
              "Shahjahanpur",
              "Jagadishpur",
              "Bulla",
              "Noapara",
              "Chhatiain",
              "Bagashura"
            ]
          }
        ]
      },
      {
        "name": "Sunamganj",
        "upazilas": [
          {
            "name": "Sunamganj Sadar",
            "unions": [
              "Jahangirnagar",
              "Rangarchar",
              "Aptabnagar",
              "Gourarang",
              "Mollapara",
              "Laxmansree",
              "Kathair",
              "Surma",
              "Mohonpur"
            ]
          },
          {
            "name": "South Sunamganj",
            "unions": [
              "Shimulbak",
              "Paschim Pagla",
              "Joykalash",
              "Purba Pagla",
              "Patharia",
              "Purba Birgaon",
              "Dargapasha",
              "Paschim Birgaon"
            ]
          },
          {
            "name": "Bishwambarpur",
            "unions": [
              "Palash",
              "Solukabad",
              "Dhanpur",
              "Badaghat South",
              "Fatepur"
            ]
          },
          {
            "name": "Chhatak",
            "unions": [
              "Islampur",
              "Noarai",
              "Chhatak Sadar",
              "Kalaruka",
              "Gobindganj-Syedergaon",
              "Chhaila Afjalabad",
              "Khurma North",
              "Khurma South",
              "Chormohalla",
              "Jauwabazar",
              "Singchapair",
              "Dolarbazar",
              "Bhatgaon"
            ]
          },
          {
            "name": "Jagannathpur",
            "unions": [
              "Kolkolia",
              "Patli",
              "Mirpur",
              "Chilaura Holdipur",
              "Raniganj",
              "Syedpur Shaharpara",
              "Asharkandi",
              "Pailgaon"
            ]
          },
          {
            "name": "Dowarabazar",
            "unions": [
              "Banglabazar",
              "Norsingpur",
              "Dowarabazar",
              "Mannargaon",
              "Pandargaon",
              "Dohalia",
              "Laxmipur",
              "Boglabazar",
              "Surma"
            ]
          },
          {
            "name": "Tahirpur",
            "unions": [
              "Sreepur North",
              "Sreepur South",
              "Bordal South",
              "Bordal North",
              "Badaghat",
              "Tahirpur Sadar",
              "Balijuri"
            ]
          },
          {
            "name": "Dharmapasha",
            "unions": [
              "Bongshikunda North",
              "Bongshikunda South",
              "Chamordani",
              "Madhyanagar",
              "Paikurati",
              "Selbarash",
              "Dharmapasha Sadar",
              "Joyasree",
              "Sukhair Rajapur North",
              "Sukhair Rajapur South"
            ]
          },
          {
            "name": "Jamalganj",
            "unions": [
              "Beheli",
              "Sachnabazar",
              "Bhimkhali",
              "Fenerbak",
              "Jamalganj Sadar"
            ]
          },
          {
            "name": "Shalla",
            "unions": [
              "Atgaon",
              "Habibpur",
              "Bahara",
              "Shalla Sadar"
            ]
          },
          {
            "name": "Derai",
            "unions": [
              "Rafinagar",
              "Bhatipara",
              "Rajanagar",
              "Charnarchar",
              "Derai Sarmangal",
              "Karimpur",
              "Jagddol",
              "Taral",
              "Kulanj"
            ]
          },
          {
            "name": "Madhyanagar",
            "city": true
          }
        ]
      }
    ]
  },
  {
    "name": "Dhaka",
    "districts": [
      {
        "name": "Narsingdi",
        "upazilas": [
          {
            "name": "Belabo",
            "unions": [
              "Amlaba",
              "Bajnaba",
              "Belabo",
              "Binnabayd",
              "Charuzilab",
              "Naraynpur",
              "Sallabad",
              "Patuli",
              "Diara"
            ]
          },
          {
            "name": "Monohardi",
            "unions": [
              "Barachapa",
              "Chalakchar",
              "Charmandalia",
              "Ekduaria",
              "Gotashia",
              "Kanchikata",
              "Khidirpur",
              "Shukundi",
              "Dawlatpur",
              "Krisnopur",
              "Labutala",
              "Chandanbari"
            ]
          },
          {
            "name": "Narsingdi Sadar",
            "unions": [
              "Alokbali",
              "Chardighaldi",
              "Chinishpur",
              "Hajipur",
              "Karimpur",
              "Khathalia",
              "Nuralapur",
              "Mahishasura",
              "Meherpara",
              "Nazarpur",
              "Paikarchar",
              "Panchdona",
              "Silmandi",
              "Amdia"
            ]
          },
          {
            "name": "Palash",
            "unions": [
              "Danga",
              "Charsindur",
              "Jinardi",
              "Gazaria"
            ]
          },
          {
            "name": "Raipura",
            "unions": [
              "Chanpur",
              "Alipura",
              "Amirganj",
              "Adiabad",
              "Banshgari",
              "Chanderkandi",
              "Chararalia",
              "Charmadhua",
              "Charsubuddi",
              "Daukarchar",
              "Hairmara",
              "Maheshpur",
              "Mirzanagar",
              "Mirzarchar",
              "Nilakhya",
              "Palashtali",
              "Paratali",
              "Sreenagar",
              "Roypura",
              "Musapur",
              "Uttar Bakharnagar",
              "Marjal"
            ]
          },
          {
            "name": "Shibpur",
            "unions": [
              "Dulalpur",
              "Joynagar",
              "Sadharchar",
              "Masimpur",
              "Chakradha",
              "Joshar",
              "Baghabo",
              "Ayubpur",
              "Putia"
            ]
          }
        ]
      },
      {
        "name": "Gazipur",
        "upazilas": [
          {
            "name": "Gazipur Sadar",
            "city": true
          },
          {
            "name": "Kaliakair",
            "unions": [
              "Atabaha",
              "Boali",
              "Chandora",
              "Dhala",
              "Full Baria",
              "Mouchak",
              "Shafipur"
            ]
          },
          {
            "name": "Sreepur",
            "unions": [
              "Barmi",
              "Gazipur",
              "Gosinga",
              "Maona",
              "Rajabari",
              "Tepirbari"
            ]
          },
          {
            "name": "Kapasia",
            "unions": [
              "Barid",
              "Ghagotia",
              "Kapasia",
              "Karihata",
              "Sinhasree",
              "Taranagar",
              "Toke"
            ]
          },
          {
            "name": "Kaliganj",
            "unions": [
              "Balia",
              "Bahadurpur",
              "Jangalia",
              "Kaliganj",
              "Nagari",
              "Tulshikhali"
            ]
          }
        ]
      },
      {
        "name": "Shariatpur",
        "upazilas": [
          {
            "name": "Shariatpur Sadar",
            "unions": [
              "Binodpur",
              "Tulasar",
              "Palong",
              "Domshar",
              "Rudrakar",
              "Angaria",
              "Chitolia",
              "Mahmudpur",
              "Chikondi",
              "Chandrapur",
              "Shulpara"
            ]
          },
          {
            "name": "Naria",
            "unions": [
              "Kedarpur",
              "Dingamanik",
              "Garishar",
              "Nowpara",
              "Moktererchar",
              "Charatra",
              "Rajnagar",
              "Japsa",
              "Vojeshwar",
              "Fategongpur",
              "Bijari",
              "Vumkhara",
              "Nashason"
            ]
          },
          {
            "name": "Zajira",
            "unions": [
              "Zajira Sadar",
              "Mulna",
              "Barokandi",
              "Bilaspur",
              "Kundarchar",
              "Palerchar",
              "Purba Nawdoba",
              "Nawdoba",
              "Shenerchar",
              "Bknagar",
              "Barogopalpur",
              "Jaynagor"
            ]
          },
          {
            "name": "Gosairhat",
            "unions": [
              "Nager Para",
              "Alaolpur",
              "Kodalpur",
              "Goshairhat",
              "Edilpur",
              "Nalmuri",
              "Samontasar",
              "Kuchipatti"
            ]
          },
          {
            "name": "Bhedarganj",
            "unions": [
              "Ramvadrapur",
              "Mahisar",
              "Saygaon",
              "Narayanpur",
              "D.M Khali",
              "Charkumaria",
              "Sakhipur",
              "Kachikata",
              "North Tarabunia",
              "Charvaga",
              "Arsinagar",
              "South Tarabunia",
              "Charsensas"
            ]
          },
          {
            "name": "Damudya",
            "unions": [
              "Shidulkura",
              "Kaneshar",
              "Purba Damudya",
              "Islampur",
              "Dankati",
              "Sidya",
              "Darulaman"
            ]
          }
        ]
      },
      {
        "name": "Narayanganj",
        "upazilas": [
          {
            "name": "Narayanganj Sadar",
            "city": true
          },
          {
            "name": "Araihazar",
            "unions": [
              "Araihazar",
              "Duptara",
              "Mahmudpur",
              "Brahmandi",
              "Fatullah",
              "Sirajdi"
            ]
          },
          {
            "name": "Bandar",
            "unions": [
              "Bandar",
              "Musapur",
              "Dhanbari",
              "Kadamrasul"
            ]
          },
          {
            "name": "Rupganj",
            "unions": [
              "Rupganj",
              "Bhulta",
              "Golakandail",
              "Kayetpara",
              "Murapara",
              "Tardubi"
            ]
          },
          {
            "name": "Sonargaon",
            "unions": [
              "Baidder Bazar",
              "Jampur",
              "Mograpara",
              "Pirojpur",
              "Sadipur",
              "Sonargaon"
            ]
          }
        ]
      },
      {
        "name": "Tangail",
        "upazilas": [
          {
            "name": "Basail",
            "unions": [
              "Basail",
              "Kanchanpur",
              "Habla",
              "Kashil",
              "Fulki",
              "Kauljani"
            ]
          },
          {
            "name": "Bhuapur",
            "unions": [
              "Arjuna",
              "Gabshara",
              "Falda",
              "Gobindashi",
              "Aloa",
              "Nikrail"
            ]
          },
          {
            "name": "Delduar",
            "unions": [
              "Deuli",
              "Lauhati",
              "Patharail",
              "Delduar",
              "Fazilhati",
              "Elasin",
              "Atia",
              "Dubail"
            ]
          },
          {
            "name": "Ghatail",
            "unions": [
              "Deulabari",
              "Ghatail",
              "Jamuria",
              "Lokerpara",
              "Anehola",
              "Dighalkandia",
              "Digar",
              "Deopara",
              "Sandhanpur",
              "Rasulpur",
              "Dhalapara"
            ]
          },
          {
            "name": "Gopalpur",
            "unions": [
              "Hadera",
              "Jhawail",
              "Nagdashimla",
              "Dhopakandi",
              "Alamnagor",
              "Hemnagor",
              "Mirzapur"
            ]
          },
          {
            "name": "Madhupur",
            "unions": [
              "Alokdia",
              "Aushnara",
              "Aronkhola",
              "Sholakuri",
              "Golabari",
              "Mirjabari"
            ]
          },
          {
            "name": "Mirzapur",
            "unions": [
              "Mahera",
              "Jamurki",
              "Fatepur",
              "Banail",
              "Anaitara",
              "Warshi",
              "Bhatram",
              "Bahuria",
              "Gorai",
              "Ajgana",
              "Tarafpur",
              "Bastail",
              "Baora",
              "Latifpur"
            ]
          },
          {
            "name": "Nagarpur",
            "unions": [
              "Bharra",
              "Sahabathpur",
              "Goyhata",
              "Solimabad",
              "Nagorpur",
              "Mamudnagor",
              "Mokna",
              "Pakutia",
              "Bekrah Atgram",
              "Dhuburia",
              "Bhadra",
              "Doptior"
            ]
          },
          {
            "name": "Sakhipur",
            "unions": [
              "Kakrajan",
              "Gajaria",
              "Jaduppur",
              "Hatibandha",
              "Kalia",
              "Dariapur",
              "Kalmegha",
              "Baharatoil"
            ]
          },
          {
            "name": "Tangail Sadar",
            "unions": [
              "Mogra",
              "Gala",
              "Gharinda",
              "Karatia",
              "Silimpur",
              "Porabari",
              "Dyenna",
              "Baghil",
              "Kakua",
              "Hugra",
              "Katuli",
              "Mahamudnagar"
            ]
          },
          {
            "name": "Kalihati",
            "unions": [
              "Durgapur",
              "Birbashinda",
              "Narandia",
              "Shahadebpur",
              "Kokdahara",
              "Balla",
              "Salla",
              "Nagbari",
              "Bangra",
              "Paikora",
              "Dashokia",
              "Parkhi",
              "Gohaliabari"
            ]
          },
          {
            "name": "Dhanbari",
            "unions": [
              "Dhopakhali",
              "Paiska",
              "Mushuddi",
              "Bolibodrow",
              "Birtara",
              "Baniajan",
              "Jadunathpur"
            ]
          }
        ]
      },
      {
        "name": "Kishoreganj",
        "upazilas": [
          {
            "name": "Itna",
            "unions": [
              "Chawganga",
              "Joysiddi",
              "Alonjori",
              "Badla",
              "Boribari",
              "Itna",
              "Mriga",
              "Dhonpur",
              "Raytoti"
            ]
          },
          {
            "name": "Katiadi",
            "unions": [
              "Banagram",
              "Shahasram Dhuldia",
              "Kargaon",
              "Chandpur",
              "Mumurdia",
              "Acmita",
              "Mosua",
              "Lohajuree",
              "Jalalpur"
            ]
          },
          {
            "name": "Bhairab",
            "unions": [
              "Sadekpur",
              "Aganagar",
              "Shimulkandi",
              "Gajaria",
              "Kalika Prashad",
              "Sreenagar",
              "Shibpur"
            ]
          },
          {
            "name": "Tarail",
            "unions": [
              "Taljanga",
              "Rauti",
              "Dhola",
              "Jawar",
              "Damiha",
              "Digdair",
              "Tarail-Sachail"
            ]
          },
          {
            "name": "Hossainpur",
            "unions": [
              "Jinari",
              "Gobindapur",
              "Sidhla",
              "Araibaria",
              "Sahedal",
              "Pumdi"
            ]
          },
          {
            "name": "Pakundia",
            "unions": [
              "Jangalia",
              "Hosendi",
              "Narandi",
              "Shukhia",
              "Patuavabga",
              "Chandipasha",
              "Charfaradi",
              "Burudia",
              "Egarasindur",
              "Pakundia"
            ]
          },
          {
            "name": "Kuliarchar",
            "unions": [
              "Ramdi",
              "Osmanpur",
              "Chhaysuti",
              "Salua",
              "Gobaria Abdullahpur",
              "Faridpur"
            ]
          },
          {
            "name": "Kishoreganj Sadar",
            "unions": [
              "Rashidabad",
              "Latibabad",
              "Maizkhapan",
              "Mohinanda",
              "Joshodal",
              "Bowlai",
              "Binnati",
              "Maria",
              "Chowddoshata",
              "Karshakarial",
              "Danapatuli"
            ]
          },
          {
            "name": "Karimgonj",
            "unions": [
              "Kadirjangal",
              "Gujadia",
              "Kiraton",
              "Barogharia",
              "Niamatpur",
              "Dehunda",
              "Sutarpara",
              "Gunodhar",
              "Joyka",
              "Zafrabad",
              "Noabad"
            ]
          },
          {
            "name": "Bajitpur",
            "unions": [
              "Kailag",
              "Pirijpur",
              "Gazirchar",
              "Hilochia",
              "Maijchar9",
              "Homypur",
              "Halimpur",
              "Sararchar",
              "Dilalpur",
              "Dighirpar",
              "Boliardi"
            ]
          },
          {
            "name": "Austagram",
            "unions": [
              "Dewghar",
              "Kastul",
              "Austagram Sadar",
              "Bangalpara",
              "Kalma",
              "Adampur",
              "Khyerpur-Abdullahpur",
              "Purba Austagram"
            ]
          },
          {
            "name": "Mithamoin",
            "unions": [
              "Gopdighi",
              "Mithamoin",
              "Dhaki",
              "Ghagra",
              "Keoarjore",
              "Katkhal",
              "Bairati"
            ]
          },
          {
            "name": "Nikli",
            "unions": [
              "Chatirchar",
              "Guroi",
              "Jaraitala",
              "Nikli Sadar",
              "Karpasa",
              "Dampara",
              "Singpur"
            ]
          }
        ]
      },
      {
        "name": "Manikganj",
        "upazilas": [
          {
            "name": "Harirampur",
            "unions": [
              "Balla",
              "Gala",
              "Chala",
              "Blara",
              "Harukandi",
              "Baira",
              "Ramkrishnapur",
              "Gopinathpur",
              "Kanchanpur",
              "Lacharagonj",
              "Sutalorie",
              "Dhulsura",
              "Azimnagar"
            ]
          },
          {
            "name": "Saturia",
            "unions": [
              "Baried",
              "Dighulia",
              "Baliyati",
              "Dargram",
              "Tilli",
              "Hargaj",
              "Saturia",
              "Dhankora",
              "Fukurhati"
            ]
          },
          {
            "name": "Manikganj Sadar",
            "unions": [
              "Betila-Mitara",
              "Jagir",
              "Atigram",
              "Dighi",
              "Putile",
              "Hatipara",
              "Vararia",
              "Nbogram",
              "Garpara",
              "Krishnapur"
            ]
          },
          {
            "name": "Gior",
            "unions": [
              "Paila",
              "Shingzuri",
              "Baliyakhora",
              "Gior",
              "Bartia",
              "Baniazuri",
              "Nalee"
            ]
          },
          {
            "name": "Shibaloy",
            "unions": [
              "Teota",
              "Utholi",
              "Shibaloy",
              "Ulayel",
              "Aruoa",
              "Mohadebpur",
              "Shimulia"
            ]
          },
          {
            "name": "Doulatpur",
            "unions": [
              "Charkataree",
              "Bachamara",
              "Baghutia",
              "Zionpur",
              "Khalshi",
              "Chakmirpur",
              "Klia",
              "Dhamswar"
            ]
          },
          {
            "name": "Singiar",
            "unions": [
              "Buyra",
              "Talebpur",
              "Singiar",
              "Baldhara",
              "Zamsha",
              "Charigram",
              "Shayesta",
              "Joymonto",
              "Dhalla",
              "Jamirta",
              "Chandhar"
            ]
          }
        ]
      },
      {
        "name": "Dhaka",
        "upazilas": [
          {
            "name": "Uttara East",
            "unions": [
              "Uttara Sector-1",
              "Uttara Sector-2",
              "Uttara Sector-3",
              "Uttara Sector-4",
              "Uttara Sector-5"
            ]
          },
          {
            "name": "Uttara West",
            "unions": [
              "Uttara Sector-6",
              "Uttara Sector-7",
              "Uttara Sector-8",
              "Uttara Sector-9",
              "Uttara Sector-10"
            ]
          },
          {
            "name": "Uttara Central",
            "unions": [
              "Uttara Sector-11",
              "Uttara Sector-12",
              "Uttara Sector-13",
              "Uttara Sector-14",
              "Diabari"
            ]
          },
          {
            "name": "Khilkhet",
            "unions": [
              "Khilkhet",
              "Nikunja-1",
              "Nikunja-2",
              "Nabinagar Housing"
            ]
          },
          {
            "name": "Turag",
            "unions": [
              "Abdullahpur",
              "Baunia",
              "Turag",
              "Dhour",
              "Kalopol"
            ]
          },
          {
            "name": "Dakshinkhan",
            "unions": [
              "Dakshinkhan",
              "Ashkona",
              "Kunia",
              "Izzu Nagar",
              "Guzastha"
            ]
          },
          {
            "name": "Uttarkhan",
            "unions": [
              "Uttarkhan",
              "Azampur",
              "Joarsahara"
            ]
          },
          {
            "name": "Pallabi",
            "unions": [
              "Pallabi",
              "Mirpur-13",
              "Mirpur-14",
              "Section-11 (Pallabi)"
            ]
          },
          {
            "name": "Mirpur",
            "unions": [
              "Mirpur-1",
              "Mirpur-2",
              "Mirpur-6",
              "Mirpur-7",
              "Mirpur-10",
              "Mirpur-11",
              "Mirpur-12"
            ]
          },
          {
            "name": "Shah Ali",
            "unions": [
              "Rupnagar",
              "Senpara Parbata",
              "Kalshi",
              "Pirerbagh"
            ]
          },
          {
            "name": "Kafrul",
            "unions": [
              "Kafrul",
              "Ibrahimpur",
              "Duaripara",
              "Taltola"
            ]
          },
          {
            "name": "Cantonment",
            "unions": [
              "Cantonment",
              "DOHS Banani",
              "DOHS Baridhara",
              "DOHS Mirpur"
            ]
          },
          {
            "name": "Gulshan",
            "unions": [
              "Gulshan-1",
              "Gulshan-2",
              "Niketan",
              "Baridhara",
              "Baridhara DOHS"
            ]
          },
          {
            "name": "Banani",
            "unions": [
              "Banani",
              "Banani DOHS",
              "Tejturi Bazar"
            ]
          },
          {
            "name": "Badda",
            "unions": [
              "Badda",
              "Uttar Badda",
              "Satarkul",
              "Shahjadpur",
              "Beraid"
            ]
          },
          {
            "name": "Khilgaon",
            "unions": [
              "Khilgaon",
              "Tilpapara",
              "Rampura",
              "Bashabo (Khilgaon)"
            ]
          },
          {
            "name": "Vatara",
            "unions": [
              "Vatara",
              "Aftabnagar",
              "Merul Badda",
              "Bashundhara R/A"
            ]
          },
          {
            "name": "Tejgaon",
            "unions": [
              "Farmgate",
              "Karwan Bazar",
              "Mogbazar",
              "Tejgaon",
              "Bijoy Sarani"
            ]
          },
          {
            "name": "Tejgaon Industrial",
            "unions": [
              "Tejgaon Industrial Area",
              "Tejgaon Link Road",
              "Sheora"
            ]
          },
          {
            "name": "Dhanmondi",
            "unions": [
              "Dhanmondi R/A",
              "Jigatola",
              "Shukrabad",
              "Satmasjid Road",
              "Panthapath"
            ]
          },
          {
            "name": "Kalabagan",
            "unions": [
              "Kalabagan",
              "Green Road",
              "Hatirpool",
              "Mirpur Road (Kalabagan)"
            ]
          },
          {
            "name": "New Market",
            "unions": [
              "New Market",
              "Nilkhet",
              "Azimpur",
              "Elephant Road",
              "Banglamotor"
            ]
          },
          {
            "name": "Mohammadpur",
            "unions": [
              "Mohammadpur",
              "Shyamoli",
              "Adabor",
              "Lalmatia",
              "Jafrabad",
              "Nurerchala"
            ]
          },
          {
            "name": "Adabor",
            "unions": [
              "Adabor",
              "Shekhertek",
              "PC Culture Housing",
              "Ring Road Area"
            ]
          },
          {
            "name": "Hazaribagh",
            "unions": [
              "Hazaribagh",
              "Rayerbazar",
              "Manikdi"
            ]
          },
          {
            "name": "Sher-e-Bangla Nagar",
            "unions": [
              "Agargaon",
              "Shangshad Bhaban Area",
              "NEC Area",
              "Bijoy Sarani South"
            ]
          },
          {
            "name": "Motijheel",
            "unions": [
              "Motijheel",
              "Dilkusha",
              "Arambagh",
              "Fakirapool",
              "Segunbagicha"
            ]
          },
          {
            "name": "Paltan",
            "unions": [
              "Paltan",
              "Bijoynagar",
              "Bakshi Bazar",
              "Shiddheshwari"
            ]
          },
          {
            "name": "Ramna",
            "unions": [
              "Ramna",
              "Shahbag",
              "Kakrail",
              "Mint Road"
            ]
          },
          {
            "name": "Wari",
            "unions": [
              "Wari",
              "Tipu Sultan Road",
              "Johnson Road",
              "Narinda"
            ]
          },
          {
            "name": "Sutrapur",
            "unions": [
              "Sutrapur",
              "Bangsal Road",
              "Patuatuli",
              "Farashganj"
            ]
          },
          {
            "name": "Kotwali",
            "unions": [
              "Kotwali",
              "Sadarghat",
              "Bangsal",
              "Laxmibazar"
            ]
          },
          {
            "name": "Lalbagh",
            "unions": [
              "Lalbagh",
              "Azimpur (Lalbagh)",
              "Imamganj",
              "Shakhari Bazar"
            ]
          },
          {
            "name": "Chawkbazar",
            "unions": [
              "Chawkbazar",
              "Islampur",
              "Waizghat",
              "Shyambazar"
            ]
          },
          {
            "name": "Gendaria",
            "unions": [
              "Gendaria",
              "Swamibagh",
              "Nazirabazar"
            ]
          },
          {
            "name": "Jatrabari",
            "unions": [
              "Jatrabari",
              "Donia",
              "Shonir Akhra",
              "Manda"
            ]
          },
          {
            "name": "Demra",
            "unions": [
              "Demra",
              "Matuail",
              "Shasongaon"
            ]
          },
          {
            "name": "Shyampur",
            "unions": [
              "Shyampur",
              "Pagla",
              "Rayerbag"
            ]
          },
          {
            "name": "Kadamtali",
            "unions": [
              "Kadamtali",
              "Jurain",
              "Postogola"
            ]
          },
          {
            "name": "Mugdapara",
            "unions": [
              "Mugda",
              "Bashabo",
              "Malibagh East"
            ]
          },
          {
            "name": "Sabujbagh",
            "unions": [
              "Sabujbagh",
              "Malibagh",
              "Manik Nagar"
            ]
          },
          {
            "name": "Savar",
            "unions": [
              "Savar Pourashava",
              "Ashulia",
              "Aminbazar",
              "Biralia",
              "Dhamsona",
              "Kaundia",
              "Shimulia",
              "Tetuljhora",
              "Yearpur"
            ]
          },
          {
            "name": "Keraniganj",
            "unions": [
              "Aganagar",
              "Basta",
              "Konda",
              "Ruhitpur",
              "Subhadya",
              "Teghoria",
              "Zinjira"
            ]
          },
          {
            "name": "Dhamrai",
            "unions": [
              "Dhamrai Pourashava",
              "Amta",
              "Balia",
              "Gangutia",
              "Jadabpur",
              "Kulla",
              "Nannor",
              "Rowail",
              "Sanora",
              "Sombhag",
              "Suapur"
            ]
          },
          {
            "name": "Nawabganj",
            "unions": [
              "Nawabganj",
              "Bakshinagar",
              "Baruakhali",
              "Banagram",
              "Kalatia",
              "Nayababu"
            ]
          },
          {
            "name": "Dohar",
            "unions": [
              "Dohar",
              "Bilaspur",
              "Jayparahat",
              "Mahmudpur",
              "Muksudpur",
              "Narisakanda",
              "Nayabari",
              "Roajpur"
            ]
          }
        ]
      },
      {
        "name": "Munshiganj",
        "upazilas": [
          {
            "name": "Munshiganj Sadar",
            "unions": [
              "Rampal",
              "Panchashar",
              "Bajrajogini",
              "Mohakali",
              "Charkewar",
              "Mollakandi",
              "Adhara",
              "Shiloy",
              "Banglabazar"
            ]
          },
          {
            "name": "Sreenagar",
            "unions": [
              "Baraikhali",
              "Hashara",
              "Birtara",
              "Shologhor",
              "Sreenagar",
              "Patabhog",
              "Shamshiddi",
              "Kolapara",
              "Vaggakol",
              "Bagra",
              "Rarikhal",
              "Kukutia",
              "Atpara",
              "Tantor"
            ]
          },
          {
            "name": "Sirajdikhan",
            "unions": [
              "Chitracoat",
              "Sekhornagar",
              "Rajanagar",
              "Keyain",
              "Basail",
              "Baluchar",
              "Latabdi",
              "Rasunia",
              "Ichhapura",
              "Bairagadi",
              "Malkhanagar",
              "Madhypara",
              "Kola",
              "Joyinshar"
            ]
          },
          {
            "name": "Louhajanj",
            "unions": [
              "Medinimandal",
              "Kumarbhog",
              "Haldia",
              "Kanaksar",
              "Lohajang-Teotia",
              "Bejgaon",
              "Baultoli",
              "Khidirpara",
              "Gaodia",
              "Kalma"
            ]
          },
          {
            "name": "Gajaria",
            "unions": [
              "Gajaria",
              "Baushia",
              "Vaberchar",
              "Baluakandi",
              "Tengarchar",
              "Hosendee",
              "Guagachia",
              "Imampur"
            ]
          },
          {
            "name": "Tongibari",
            "unions": [
              "Betka",
              "Abdullapur",
              "Sonarong Tongibari",
              "Autshahi",
              "Arial Baligaon",
              "Dhipur",
              "Kathadia Shimolia",
              "Joslong",
              "Panchgaon",
              "Kamarkhara",
              "Hasailbanari",
              "Dighirpar"
            ]
          }
        ]
      },
      {
        "name": "Rajbari",
        "upazilas": [
          {
            "name": "Rajbari Sadar",
            "unions": [
              "Mijanpur",
              "Borat",
              "Chandoni",
              "Khangonj",
              "Banibaha",
              "Dadshee",
              "Mulghar",
              "Basantapur",
              "Khankhanapur",
              "Alipur",
              "Ramkantapur",
              "Shahidwahabpur",
              "Panchuria",
              "Sultanpur"
            ]
          },
          {
            "name": "Goalanda",
            "unions": [
              "Doulatdia",
              "Debugram",
              "Uzancar",
              "Chotovakla"
            ]
          },
          {
            "name": "Pangsa",
            "unions": [
              "Bahadurpur",
              "Habashpur",
              "Jashai",
              "Babupara",
              "Mourat",
              "Patta",
              "Sarisha",
              "Kalimahar",
              "Kasbamajhail",
              "Machhpara"
            ]
          },
          {
            "name": "Baliakandi",
            "unions": [
              "Islampur",
              "Baharpur",
              "Nawabpur",
              "Narua",
              "Baliakandi",
              "Janjal",
              "Jamalpur"
            ]
          },
          {
            "name": "Kalukhali",
            "unions": [
              "Kalukhali",
              "Ratandia",
              "Kalikapur",
              "Boalia",
              "Majbari",
              "Madapur",
              "Shawrail",
              "Mrigi"
            ]
          }
        ]
      },
      {
        "name": "Madaripur",
        "upazilas": [
          {
            "name": "Madaripur Sadar",
            "unions": [
              "Sirkhara",
              "Bahadurpur",
              "Kunia",
              "Peyarpur",
              "Kandua",
              "Mastofapur",
              "Dudkhali",
              "Kalikapur",
              "Chilarchar",
              "Panchkhola",
              "Ghatmajhi",
              "Jhaoudi",
              "Khoajpur",
              "Rasti",
              "Dhurail"
            ]
          },
          {
            "name": "Shibchar",
            "unions": [
              "Shibchar",
              "Ditiyakhando",
              "Nilokhe",
              "Bandarkhola",
              "Charjanazat",
              "Madbarerchar",
              "Panchar",
              "Sannasirchar",
              "Kathalbari",
              "Kutubpur",
              "Kadirpur",
              "Vhandarikandi",
              "Bahertala South",
              "Baheratala North",
              "Baskandi",
              "Umedpur",
              "Vhadrasion",
              "Shiruail",
              "Dattapara"
            ]
          },
          {
            "name": "Kalkini",
            "unions": [
              "Alinagar",
              "Baligram",
              "Basgari",
              "Chardoulatkhan",
              "Dashar",
              "Enayetnagor",
              "Gopalpur",
              "Koyaria",
              "Kazibakai",
              "Laxmipur",
              "Nabogram",
              "Ramjanpur",
              "Shahebrampur",
              "Shikarmongol"
            ]
          },
          {
            "name": "Rajoir",
            "unions": [
              "Haridasdi-Mahendrodi",
              "Kadambari",
              "Bajitpur",
              "Amgram",
              "Rajoir",
              "Khaliya",
              "Ishibpur",
              "Badarpasa",
              "Kabirajpur",
              "Hosenpur",
              "Paikpara"
            ]
          },
          {
            "name": "Dasar",
            "city": true
          }
        ]
      },
      {
        "name": "Gopalganj",
        "upazilas": [
          {
            "name": "Gopalganj Sadar",
            "unions": [
              "Jalalabad",
              "Shuktail",
              "Chandradighalia",
              "Gopinathpur",
              "Paikkandi",
              "Urfi",
              "Lotifpur",
              "Satpar",
              "Sahapur",
              "Horidaspur",
              "Ulpur",
              "Nizra",
              "Karpara",
              "Durgapur",
              "Kajulia",
              "Majhigati",
              "Roghunathpur",
              "Gobra",
              "Borashi",
              "Kati",
              "Boultali"
            ]
          },
          {
            "name": "Kashiani",
            "unions": [
              "Kashiani",
              "Hatiara",
              "Fukura",
              "Rajpat",
              "Bethuri",
              "Nijamkandi",
              "Sajail",
              "Mamudpur",
              "Maheshpur",
              "Orakandia",
              "Parulia",
              "Ratail",
              "Puisur",
              "Singa"
            ]
          },
          {
            "name": "Tungipara",
            "unions": [
              "Kushli",
              "Gopalpur",
              "Patgati",
              "Borni",
              "Dumaria"
            ]
          },
          {
            "name": "Kotalipara",
            "unions": [
              "Sadullapur",
              "Ramshil",
              "Bandhabari",
              "Kolabari",
              "Kushla",
              "Amtoli",
              "Pinjuri",
              "Ghaghor",
              "Radhaganj",
              "Hiron",
              "Kandi"
            ]
          },
          {
            "name": "Muksudpur",
            "unions": [
              "Ujani",
              "Nanikhir",
              "Dignagar",
              "Poshargati",
              "Gobindopur",
              "Khandarpara",
              "Bohugram",
              "Banshbaria",
              "Vabrashur",
              "Moharajpur",
              "Batikamari",
              "Jalirpar",
              "Raghdi",
              "Gohala",
              "Mochna",
              "Kashalia"
            ]
          }
        ]
      },
      {
        "name": "Faridpur",
        "upazilas": [
          {
            "name": "Faridpur Sadar",
            "unions": [
              "Ishangopalpur",
              "Charmadbdia",
              "Aliabad",
              "Uttarchannel",
              "Decreerchar",
              "Majchar",
              "Krishnanagar",
              "Ambikapur",
              "Kanaipur",
              "Kaijuri",
              "Greda"
            ]
          },
          {
            "name": "Alfadanga",
            "unions": [
              "Buraich",
              "Alfadanga",
              "Tagarbanda",
              "Bana",
              "Panchuria",
              "Gopalpur"
            ]
          },
          {
            "name": "Boalmari",
            "unions": [
              "Boalmari",
              "Dadpur",
              "Chatul",
              "Ghoshpur",
              "Gunbaha",
              "Chandpur",
              "Parameshwardi",
              "Satair",
              "Rupapat",
              "Shekhar",
              "Moyna"
            ]
          },
          {
            "name": "Sadarpur",
            "unions": [
              "Char Bisnopur",
              "Akoter Char",
              "Char Nasirpur",
              "Narikel Bariya",
              "Bhashanchar",
              "Krishnapur",
              "Sadarpur",
              "Char Manair",
              "Dhaukhali"
            ]
          },
          {
            "name": "Nagarkanda",
            "unions": [
              "Charjashordi",
              "Purapara",
              "Laskardia",
              "Ramnagar",
              "Kaichail",
              "Talma",
              "Fulsuti",
              "Dangi",
              "Kodalia Shohidnagar"
            ]
          },
          {
            "name": "Bhanga",
            "unions": [
              "Gharua",
              "Nurullagonj",
              "Manikdha",
              "Kawlibera",
              "Nasirabad",
              "Tujerpur",
              "Algi",
              "Chumurdi",
              "Kalamridha",
              "Azimnagor",
              "Chandra",
              "Hamirdi"
            ]
          },
          {
            "name": "Charbhadrasan",
            "unions": [
              "Gazirtek",
              "Char Bhadrasan",
              "Char Harirampur",
              "Char Jahukanda"
            ]
          },
          {
            "name": "Madhukhali",
            "unions": [
              "Madhukhali",
              "Jahapur",
              "Gazna",
              "Megchami",
              "Raipur",
              "Bagat",
              "Dumain",
              "Nowpara",
              "Kamarkhali"
            ]
          },
          {
            "name": "Saltha",
            "unions": [
              "Bhawal",
              "Atghar",
              "Mazadia",
              "Ballabhdi",
              "Gatti",
              "Jadunandi",
              "Ramkantapur",
              "Sonapur"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Rangpur",
    "districts": [
      {
        "name": "Panchagarh",
        "upazilas": [
          {
            "name": "Panchagarh Sadar",
            "unions": [
              "Panchagarh Sadar",
              "Satmara",
              "Amarkhana",
              "Haribhasa",
              "Chaklahat",
              "Hafizabad",
              "Kamat Kajol Dighi",
              "Dhakkamara",
              "Magura",
              "Garinabari"
            ]
          },
          {
            "name": "Debiganj",
            "unions": [
              "Chilahati",
              "Shaldanga",
              "Debiganj Sadar",
              "Pamuli",
              "Sundardighi",
              "Sonahar Mollikadaha",
              "Tepriganj",
              "Dandopal",
              "Debiduba",
              "Chengthi Hazra Danga"
            ]
          },
          {
            "name": "Boda",
            "unions": [
              "Jholaishal Shiri",
              "Moidandighi",
              "Banghari",
              "Kajoldighi Kaligonj",
              "Boroshoshi",
              "Chandanbari",
              "Marea Bamonhat",
              "Boda",
              "Sakoa",
              "Pachpir"
            ]
          },
          {
            "name": "Atwari",
            "unions": [
              "Mirgapur",
              "Radhanagar",
              "Toria",
              "Balarampur",
              "Alowakhowa",
              "Dhamor"
            ]
          },
          {
            "name": "Tetulia",
            "unions": [
              "Banglabandha",
              "Bhojoanpur",
              "Bhojoanpur",
              "Buraburi",
              "Debnagar",
              "Salbahan",
              "Tentulia",
              "Timaihat"
            ]
          }
        ]
      },
      {
        "name": "Dinajpur",
        "upazilas": [
          {
            "name": "Nawabganj",
            "unions": [
              "Joypur",
              "Binodnagar",
              "Golapgonj",
              "Shalkhuria",
              "Putimara",
              "Bhaduria",
              "Daudpur",
              "Mahmudpur",
              "Kushdaha"
            ]
          },
          {
            "name": "Birganj",
            "unions": [
              "Shibrampur",
              "Polashbari",
              "Shatagram",
              "Paltapur",
              "Sujalpur",
              "Nijpara",
              "Mohammadpur",
              "Bhognagar",
              "Sator",
              "Mohonpur",
              "Moricha"
            ]
          },
          {
            "name": "Ghoraghat",
            "unions": [
              "Bulakipur",
              "Palsha",
              "Singra",
              "Ghoraghat"
            ]
          },
          {
            "name": "Birampur",
            "unions": [
              "Mukundopur",
              "Katla",
              "Khanpur",
              "Dior",
              "Binail",
              "Jatbani",
              "Poliproyagpur"
            ]
          },
          {
            "name": "Parbatipur",
            "unions": [
              "Belaichandi",
              "Monmothopur",
              "Rampur",
              "Polashbari",
              "Chandipur",
              "Mominpur",
              "Mostofapur",
              "Habra",
              "Hamidpur",
              "Harirampur"
            ]
          },
          {
            "name": "Bochaganj",
            "unions": [
              "Nafanagar",
              "Eshania",
              "Atgaon",
              "Shatail",
              "Rongaon",
              "Murshidhat"
            ]
          },
          {
            "name": "Kaharol",
            "unions": [
              "Dabor",
              "Rasulpur",
              "Mukundapur",
              "Targao",
              "Ramchandrapur",
              "Sundarpur"
            ]
          },
          {
            "name": "Fulbari",
            "unions": [
              "Aloary",
              "Aladipur",
              "Kagihal",
              "Bethdighi",
              "Khairbari",
              "Daulatpur",
              "Shibnagor"
            ]
          },
          {
            "name": "Dinajpur Sadar",
            "unions": [
              "Chealgazi",
              "Sundorbon",
              "Fazilpur",
              "Shekpura",
              "Shashora",
              "Auliapur",
              "Uthrail",
              "Sankarpur",
              "Askorpur",
              "Kamalpur"
            ]
          },
          {
            "name": "Hakimpur",
            "unions": [
              "Alihat",
              "Khattamadobpara",
              "Boalder"
            ]
          },
          {
            "name": "Khansama",
            "unions": [
              "Alokjhari",
              "Bherbheri",
              "Angarpara",
              "Goaldihi",
              "Bhabki",
              "Khamarpara"
            ]
          },
          {
            "name": "Birol",
            "unions": [
              "Azimpur",
              "Farakkabad",
              "Dhamoir",
              "Shohorgram",
              "Birol",
              "Bhandra",
              "Bijora",
              "Dharmapur",
              "Mongalpur",
              "Ranipukur",
              "Rajarampur"
            ]
          },
          {
            "name": "Chirirbandar",
            "unions": [
              "Nashratpur",
              "Satnala",
              "Fatejangpur",
              "Isobpur",
              "Abdulpur",
              "Amarpur",
              "Auliapukur",
              "Saitara",
              "Viail",
              "Punotti",
              "Tetulia",
              "Alokdihi"
            ]
          }
        ]
      },
      {
        "name": "Lalmonirhat",
        "upazilas": [
          {
            "name": "Lalmonirhat Sadar",
            "unions": [
              "Rajpur",
              "Harati",
              "Mogolhat",
              "Gokunda",
              "Barobari",
              "Kulaghat",
              "Mohendranagar",
              "Khuniagachh",
              "Panchagram"
            ]
          },
          {
            "name": "Kaliganj",
            "unions": [
              "Bhotmari",
              "Modati",
              "Dologram",
              "Tushbhandar",
              "Goral",
              "Chondropur",
              "Cholbola",
              "Kakina"
            ]
          },
          {
            "name": "Hatibandha",
            "unions": [
              "Barokhata",
              "Goddimari",
              "Singimari",
              "Tongvhanga",
              "Sindurna",
              "Paticapara",
              "Nowdabas",
              "Gotamari",
              "Vhelaguri",
              "Shaniajan",
              "Fakirpara",
              "Dawabari"
            ]
          },
          {
            "name": "Patgram",
            "unions": [
              "Sreerampur",
              "Patgram",
              "Jagatber",
              "Kuchlibari",
              "Jongra",
              "Baura",
              "Dahagram",
              "Burimari"
            ]
          },
          {
            "name": "Aditmari",
            "unions": [
              "Bhelabari",
              "Bhadai",
              "Kamlabari",
              "Durgapur",
              "Sarpukur",
              "Saptibari",
              "Palashi",
              "Mohishkhocha"
            ]
          }
        ]
      },
      {
        "name": "Nilphamari",
        "upazilas": [
          {
            "name": "Syedpur",
            "unions": [
              "Kamarpukur",
              "Kasiram Belpukur",
              "Bangalipur",
              "Botlagari",
              "Khata Madhupur"
            ]
          },
          {
            "name": "Domar",
            "unions": [
              "Gomnati",
              "Bhogdaburi",
              "Ketkibari",
              "Jorabari",
              "Bamunia",
              "Panga Motukpur",
              "Boragari",
              "Domar",
              "Sonaray",
              "Harinchara"
            ]
          },
          {
            "name": "Dimla",
            "unions": [
              "Paschim Chhatnay",
              "Balapara",
              "Dimla Sadar",
              "Khogakharibari",
              "Gayabari",
              "Noutara",
              "Khalisha Chapani",
              "Jhunagach Chapani",
              "Tepa Khribari",
              "Purba Chhatnay"
            ]
          },
          {
            "name": "Jaldhaka",
            "unions": [
              "Douabari",
              "Golmunda",
              "Balagram",
              "Golna",
              "Dharmapal",
              "Simulbari",
              "Mirganj",
              "Kathali",
              "Khutamara",
              "Shaulmari",
              "Kaimari"
            ]
          },
          {
            "name": "Kishorganj",
            "unions": [
              "Barabhita",
              "Putimari",
              "Nitai",
              "Bahagili",
              "Chandkhana",
              "Kishoreganj",
              "Ranachandi",
              "Garagram",
              "Magura"
            ]
          },
          {
            "name": "Nilphamari Sadar",
            "unions": [
              "Chaora Bargacha",
              "Gorgram",
              "Khoksabari",
              "Palasbari",
              "Ramnagar",
              "Kachukata",
              "Panchapukur",
              "Itakhola",
              "Kundapukur",
              "Sonaray",
              "Songalsi",
              "Charaikhola",
              "Chapra Sarnjami",
              "Lakshmicha",
              "Tupamari"
            ]
          }
        ]
      },
      {
        "name": "Gaibandha",
        "upazilas": [
          {
            "name": "Sadullapur",
            "unions": [
              "Rasulpur",
              "Noldanga",
              "Damodorpur",
              "Jamalpur",
              "Faridpur",
              "Dhaperhat",
              "Idilpur",
              "Vatgram",
              "Bongram",
              "Kamarpara",
              "Khodkomor"
            ]
          },
          {
            "name": "Gaibandha Sadar",
            "unions": [
              "Laxmipur",
              "Malibari",
              "Kuptola",
              "Shahapara",
              "Ballamjhar",
              "Ramchandrapur",
              "Badiakhali",
              "Boali",
              "Ghagoa",
              "Gidari",
              "Kholahati",
              "Mollarchar",
              "Kamarjani"
            ]
          },
          {
            "name": "Palashbari",
            "unions": [
              "Kishoregari",
              "Hosenpur",
              "Palashbari",
              "Barisal",
              "Mohdipur",
              "Betkapa",
              "Pobnapur",
              "Monohorpur",
              "Harinathpur"
            ]
          },
          {
            "name": "Saghata",
            "unions": [
              "Padumsahar",
              "Varotkhali",
              "Saghata",
              "Muktinagar",
              "Kachua",
              "Ghuridah",
              "Holdia",
              "Jumarbari",
              "Kamalerpara",
              "Bonarpara"
            ]
          },
          {
            "name": "Gobindaganj",
            "unions": [
              "Kamdia",
              "Katabari",
              "Shakhahar",
              "Rajahar",
              "Sapmara",
              "Dorbosto",
              "Talukkanupur",
              "Nakai",
              "Harirampur",
              "Rakhalburuj",
              "Phulbari",
              "Gumaniganj",
              "Kamardoho",
              "Kochasahar",
              "Shibpur",
              "Mahimaganj",
              "Shalmara"
            ]
          },
          {
            "name": "Sundarganj",
            "unions": [
              "Bamondanga",
              "Sonaroy",
              "Tarapur",
              "Belka",
              "Dohbond",
              "Sorbanondo",
              "Ramjibon",
              "Dhopadanga",
              "Chaporhati",
              "Shantiram",
              "Konchibari",
              "Sreepur",
              "Chandipur",
              "Kapasia",
              "Haripur"
            ]
          },
          {
            "name": "Phulchari",
            "unions": [
              "Kanchipara",
              "Uria",
              "Udakhali",
              "Gazaria",
              "Phulchari",
              "Erendabari",
              "Fazlupur"
            ]
          }
        ]
      },
      {
        "name": "Thakurgaon",
        "upazilas": [
          {
            "name": "Thakurgaon Sadar",
            "unions": [
              "Ruhea",
              "Akhanagar",
              "Ahcha",
              "Baragaon",
              "Balia",
              "Auliapur",
              "Chilarang",
              "Rahimanpur",
              "Roypur",
              "Jamalpur",
              "Mohammadpur",
              "Salandar",
              "Gareya",
              "Rajagaon",
              "Debipur",
              "Nargun",
              "Jagannathpur",
              "Sukhanpukhari",
              "Begunbari",
              "Ruhia Pashchim",
              "Dholarhat"
            ]
          },
          {
            "name": "Pirganj",
            "unions": [
              "Bhomradaha",
              "Kosharaniganj",
              "Khangaon",
              "Saidpur",
              "Pirganj",
              "Hajipur",
              "Daulatpur",
              "Sengaon",
              "Jabarhat",
              "Bairchuna"
            ]
          },
          {
            "name": "Ranisankail",
            "unions": [
              "Dhormogarh",
              "Nekmorod",
              "Hosengaon",
              "Lehemba",
              "Bachor",
              "Kashipur",
              "Ratore",
              "Nonduar"
            ]
          },
          {
            "name": "Haripur",
            "unions": [
              "Gedura",
              "Amgaon",
              "Bakua",
              "Dangipara",
              "Haripur",
              "Bhaturia"
            ]
          },
          {
            "name": "Baliadangi",
            "unions": [
              "Paria",
              "Charol",
              "Dhontola",
              "Boropalashbari",
              "Duosuo",
              "Vanor",
              "Amjankhore",
              "Borobari"
            ]
          }
        ]
      },
      {
        "name": "Rangpur",
        "upazilas": [
          {
            "name": "Rangpur Sadar",
            "unions": [
              "Mominpur",
              "Horidebpur",
              "Uttam",
              "Porshuram",
              "Topodhan",
              "Satgara",
              "Rajendrapur",
              "Sadwapuskoroni",
              "Chandanpat",
              "Dorshona",
              "Tampat"
            ]
          },
          {
            "name": "Gangachara",
            "unions": [
              "Betgari",
              "Kholeya",
              "Borobil",
              "Kolcondo",
              "Gongachora",
              "Gojoghonta",
              "Morneya",
              "Alambiditor",
              "Lakkhitari",
              "Nohali"
            ]
          },
          {
            "name": "Taragonj",
            "unions": [
              "Kurshatara",
              "Alampur",
              "Soyar",
              "Ikorchali",
              "Hariarkuthi"
            ]
          },
          {
            "name": "Badargonj",
            "unions": [
              "Radhanagar",
              "Gopinathpur",
              "Modhupur",
              "Kutubpur",
              "Bishnapur",
              "Kalupara",
              "Lohanipara",
              "Gopalpur",
              "Damodorpur",
              "Ramnathpurupb"
            ]
          },
          {
            "name": "Mithapukur",
            "unions": [
              "Khoragach",
              "Ranipukur",
              "Payrabond",
              "Vangni",
              "Balarhat",
              "Kafrikhal",
              "Latibpur",
              "Chengmari",
              "Moyenpur",
              "Baluya Masimpur",
              "Borobala",
              "Mirzapur",
              "Imadpur",
              "Milonpur",
              "Mgopalpur",
              "Durgapur",
              "Boro Hazratpur"
            ]
          },
          {
            "name": "Pirgonj",
            "unions": [
              "Chattracol",
              "Vendabari",
              "Borodargah",
              "Kumedpur",
              "Modankhali",
              "Tukuria",
              "Boro Alampur",
              "Raypur",
              "Pirgonj",
              "Shanerhat",
              "Mithipur",
              "Ramnathpur",
              "Chattra",
              "Kabilpur",
              "Pachgachi"
            ]
          },
          {
            "name": "Kaunia",
            "unions": [
              "Sarai",
              "Balapara",
              "Shahidbag",
              "Haragach",
              "Tepamodhupur",
              "Kurshaupk"
            ]
          },
          {
            "name": "Pirgacha",
            "unions": [
              "Kollyani",
              "Parul",
              "Itakumari",
              "Saula",
              "Kandi",
              "Pirgacha",
              "Annodanagar",
              "Tambulpur",
              "Koikuri"
            ]
          }
        ]
      },
      {
        "name": "Kurigram",
        "upazilas": [
          {
            "name": "Kurigram Sadar",
            "unions": [
              "Holokhana",
              "Ghogadhoh",
              "Belgacha",
              "Mogolbasa",
              "Panchgachi",
              "Jatrapur",
              "Kanthalbari",
              "Bhogdanga"
            ]
          },
          {
            "name": "Nageshwari",
            "unions": [
              "Ramkhana",
              "Raigonj",
              "Bamondanga",
              "Berubari",
              "Sontaspur",
              "Hasnabad",
              "Newyashi",
              "Bhitorbond",
              "Kaligonj",
              "Noonkhawa",
              "Narayanpur",
              "Kedar",
              "Kachakata",
              "Bollobherkhas"
            ]
          },
          {
            "name": "Bhurungamari",
            "unions": [
              "Pathordubi",
              "Shilkhuri",
              "Tilai",
              "Paikarchara",
              "Bhurungamari",
              "Joymonirhat",
              "Andharirjhar",
              "Char-Bhurungamari",
              "Bangasonahat",
              "Boldia"
            ]
          },
          {
            "name": "Phulbari",
            "unions": [
              "Nawdanga",
              "Shimulbari",
              "Phulbari",
              "Baravita",
              "Bhangamor",
              "Kashipur"
            ]
          },
          {
            "name": "Rajarhat",
            "unions": [
              "Chinai",
              "Rajarhat",
              "Nazimkhan",
              "Gharialdanga",
              "Chakirpashar",
              "Biddanondo",
              "Umarmajid"
            ]
          },
          {
            "name": "Ulipur",
            "unions": [
              "Daldalia",
              "Durgapur",
              "Pandul",
              "Buraburi",
              "Dharanibari",
              "Dhamsreni",
              "Gunaigas",
              "Bazra",
              "Tobockpur",
              "Hatia",
              "Begumgonj",
              "Shahabiar Alga",
              "Thetrai"
            ]
          },
          {
            "name": "Chilmari",
            "unions": [
              "Ranigonj",
              "Nayarhat",
              "Thanahat",
              "Ramna",
              "Chilmari",
              "Austomirchar"
            ]
          },
          {
            "name": "Rowmari",
            "unions": [
              "Dadevanga",
              "Shoulemari",
              "Bondober",
              "Rowmari",
              "Jadurchar"
            ]
          },
          {
            "name": "Charrajibpur",
            "unions": [
              "Rajibpur",
              "Kodalkati",
              "Mohongonj"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Mymensingh",
    "districts": [
      {
        "name": "Sherpur",
        "upazilas": [
          {
            "name": "Sherpur Sadar",
            "unions": [
              "Kamararchor",
              "Chorsherpur",
              "Bajitkhila",
              "Gajir Khamar",
              "Dhola",
              "Pakuriya",
              "Vatshala",
              "Losmonpur",
              "Rouha",
              "Kamariya",
              "Chor Mochoriya",
              "Chorpokhimari",
              "Betmari Ghughurakandi",
              "Balairchar"
            ]
          },
          {
            "name": "Nalitabari",
            "unions": [
              "Puraga",
              "Nonni",
              "Morichpuran",
              "Rajnogor",
              "Nayabil",
              "Ramchondrokura",
              "Kakorkandhi",
              "Nalitabari",
              "Juganiya",
              "Bagber",
              "Koloshpar",
              "Rupnarayankura"
            ]
          },
          {
            "name": "Sreebordi",
            "unions": [
              "Ranishimul",
              "Singabaruna",
              "Kakilakura",
              "Tatihati",
              "Gosaipur",
              "Sreebordi",
              "Bhelua",
              "Kharia Kazirchar",
              "Kurikahonia",
              "Garjaripa"
            ]
          },
          {
            "name": "Nokla",
            "unions": [
              "Gonopoddi",
              "Nokla",
              "Urpha",
              "Gourdwar",
              "Baneshwardi",
              "Pathakata",
              "Talki",
              "Choraustadhar",
              "Chandrakona"
            ]
          },
          {
            "name": "Jhenaigati",
            "unions": [
              "Kansa",
              "Dansail",
              "Nolkura",
              "Gouripur",
              "Jhenaigati",
              "Hatibandha",
              "Malijhikanda"
            ]
          }
        ]
      },
      {
        "name": "Mymensingh",
        "upazilas": [
          {
            "name": "Fulbaria",
            "unions": [
              "Deukhola",
              "Naogaon",
              "Putijana",
              "Kushmail",
              "Fulbaria",
              "Bakta",
              "Rangamatia",
              "Enayetpur",
              "Kaladaha",
              "Radhakanai",
              "Asimpatuli",
              "Vobanipur",
              "Balian"
            ]
          },
          {
            "name": "Trishal",
            "unions": [
              "Dhanikhola",
              "Bailor",
              "Kanthal",
              "Kanihari",
              "Trishal",
              "Harirampur",
              "Sakhua",
              "Balipara",
              "Mokshapur",
              "Mathbari",
              "Amirabari",
              "Rampur"
            ]
          },
          {
            "name": "Bhaluka",
            "unions": [
              "Uthura",
              "Meduari",
              "Varadoba",
              "Dhitpur",
              "Dakatia",
              "Birunia",
              "Bhaluka",
              "Mallikbari",
              "Kachina",
              "Habirbari",
              "Rajoi"
            ]
          },
          {
            "name": "Muktagacha",
            "unions": [
              "Dulla",
              "Borogram",
              "Tarati",
              "Kumargata",
              "Basati",
              "Mankon",
              "Ghoga",
              "Daogaon",
              "Kashimpur",
              "Kheruajani"
            ]
          },
          {
            "name": "Mymensingh Sadar",
            "unions": [
              "Austadhar",
              "Bororchar",
              "Dapunia",
              "Aqua",
              "Khagdohor",
              "Charnilaxmia",
              "Kushtia",
              "Paranganj",
              "Sirta",
              "Char Ishwardia",
              "Ghagra",
              "Vabokhali",
              "Boyra"
            ]
          },
          {
            "name": "Dhobaura",
            "unions": [
              "Dakshin Maijpara",
              "Gamaritola",
              "Dhobaura",
              "Porakandulia",
              "Goatala",
              "Ghoshgaon",
              "Baghber"
            ]
          },
          {
            "name": "Phulpur",
            "unions": [
              "Rambhadrapur",
              "Sondhara",
              "Vaitkandi",
              "Singheshwar",
              "Phulpur",
              "Baola",
              "Payari",
              "Balia",
              "Rahimganj",
              "Rupasi"
            ]
          },
          {
            "name": "Haluaghat",
            "unions": [
              "Bhubankura",
              "Jugli",
              "Kaichapur",
              "Haluaghat",
              "Gazirbhita",
              "Bildora",
              "Sakuai",
              "Narail",
              "Dhara",
              "Dhurail",
              "Amtoil",
              "Swadeshi"
            ]
          },
          {
            "name": "Gouripur",
            "unions": [
              "Sahanati",
              "Achintapur",
              "Mailakanda",
              "Bokainagar",
              "Gouripur",
              "Maoha",
              "Ramgopalpur",
              "Douhakhola",
              "Bhangnamari",
              "Sidhla"
            ]
          },
          {
            "name": "Gafargaon",
            "unions": [
              "Rasulpur",
              "Barobaria",
              "Charalgi",
              "Saltia",
              "Raona",
              "Longair",
              "Paithol",
              "Gafargaon",
              "Josora",
              "Moshakhali",
              "Panchbagh",
              "Usthi",
              "Dotterbazar",
              "Niguari",
              "Tangabo"
            ]
          },
          {
            "name": "Iswarganj",
            "unions": [
              "Iswarganj",
              "Sarisha",
              "Sohagi",
              "Atharabari",
              "Rajibpur",
              "Maijbagh",
              "Magtula",
              "Jatia",
              "Uchakhila",
              "Tarundia",
              "Barahit"
            ]
          },
          {
            "name": "Nandail",
            "unions": [
              "Batagoir",
              "Nandail",
              "Chandipasha",
              "Gangail",
              "Rajgati",
              "Muajjempur",
              "Sherpur",
              "Singroil",
              "Achargaon",
              "Mushulli",
              "Kharua",
              "Jahangirpur"
            ]
          },
          {
            "name": "Tarakanda",
            "unions": [
              "Banihala",
              "Biska",
              "Balikha",
              "Kakni",
              "Dhakua",
              "Tarakanda",
              "Galagaon",
              "Kamargaon",
              "Kamaria",
              "Rampur"
            ]
          }
        ]
      },
      {
        "name": "Jamalpur",
        "upazilas": [
          {
            "name": "Jamalpur Sadar",
            "unions": [
              "Kendua",
              "Sharifpur",
              "Laxirchar",
              "Tolshirchar",
              "Itail",
              "Narundi",
              "Ghorada",
              "Bashchara",
              "Ranagacha",
              "Sheepur",
              "Shahbajpur",
              "Titpalla",
              "Mesta",
              "Digpait",
              "Rashidpur"
            ]
          },
          {
            "name": "Melandah",
            "unions": [
              "Durmot",
              "Kulia",
              "Mahmudpur",
              "Nangla",
              "Nayanagar",
              "Adra",
              "Charbani Pakuria",
              "Fulkucha",
              "Ghuserpara",
              "Jhaugara",
              "Shuampur"
            ]
          },
          {
            "name": "Islampur",
            "unions": [
              "Kulkandi",
              "Belghacha",
              "Chinaduli",
              "Shapdari",
              "Noarpara",
              "Islampur",
              "Partharshi",
              "Palabandha",
              "Gualerchar",
              "Gaibandha",
              "Charputimari",
              "Chargualini"
            ]
          },
          {
            "name": "Dewangonj",
            "unions": [
              "Dungdhara",
              "Char Amkhawa",
              "Parram Rampur",
              "Hatibanga",
              "Bahadurabad",
              "Chikajani",
              "Chukaibari",
              "Dewangonj"
            ]
          },
          {
            "name": "Sarishabari",
            "unions": [
              "Satpoa",
              "Pogaldigha",
              "Doail",
              "Aona",
              "Pingna",
              "Bhatara",
              "Kamrabad",
              "Mahadan"
            ]
          },
          {
            "name": "Madarganj",
            "unions": [
              "Char Pakerdah",
              "Karaichara",
              "Gunaritala",
              "Balijuri",
              "Jorekhali",
              "Adarvita",
              "Sidhuli"
            ]
          },
          {
            "name": "Bokshiganj",
            "unions": [
              "Danua",
              "Bagarchar",
              "Battajore",
              "Shadurpara",
              "Bakshigonj",
              "Nilakhia",
              "Merurchar"
            ]
          }
        ]
      },
      {
        "name": "Netrokona",
        "upazilas": [
          {
            "name": "Barhatta",
            "unions": [
              "Asma",
              "Chhiram",
              "Baushi",
              "Barhatta",
              "Raypur",
              "Sahata",
              "Singdha"
            ]
          },
          {
            "name": "Durgapur",
            "unions": [
              "Durgapur",
              "Kakoirgora",
              "Kullagora",
              "Chandigarh",
              "Birisiri",
              "Bakaljora",
              "Gawkandia"
            ]
          },
          {
            "name": "Kendua",
            "unions": [
              "Asujia",
              "Dalpa",
              "Goraduba",
              "Gonda",
              "Sandikona",
              "Maska",
              "Bolaishimul",
              "Noapara",
              "Kandiura",
              "Chirang",
              "Roailbari Amtala",
              "Paikura",
              "Muzafarpur"
            ]
          },
          {
            "name": "Atpara",
            "unions": [
              "Shormushia",
              "Shunoi",
              "Lunesshor",
              "Baniyajan",
              "Teligati",
              "Duoj",
              "Sukhari"
            ]
          },
          {
            "name": "Madan",
            "unions": [
              "Fathepur",
              "Nayekpur",
              "Teosree",
              "Magan",
              "Gobindasree",
              "Madan",
              "Chandgaw",
              "Kytail"
            ]
          },
          {
            "name": "Khaliajuri",
            "unions": [
              "Krishnapur",
              "Nogor",
              "Chakua",
              "Khaliajuri",
              "Mendipur",
              "Gazipur"
            ]
          },
          {
            "name": "Kalmakanda",
            "unions": [
              "Koilati",
              "Najirpur",
              "Pogla",
              "Kolmakanda",
              "Rongchati",
              "Lengura",
              "Borokhapon",
              "Kharnoi"
            ]
          },
          {
            "name": "Mohongonj",
            "unions": [
              "Borokashia Birampur",
              "Borotoli Banihari",
              "Tetulia",
              "Maghan Siadar",
              "Somaj Sohildeo",
              "Suair",
              "Gaglajur"
            ]
          },
          {
            "name": "Purbadhala",
            "unions": [
              "Khalishaur",
              "Ghagra",
              "Jaria",
              "Narandia",
              "Bishkakuni",
              "Bairaty",
              "Hogla",
              "Gohalakanda",
              "Dhalamulgaon",
              "Agia",
              "Purbadhala"
            ]
          },
          {
            "name": "Netrokona Sadar",
            "unions": [
              "Chollisha",
              "Kailati",
              "Dokkhin Bishiura",
              "Modonpur",
              "Amtola",
              "Lokkhiganj",
              "Singher Bangla",
              "Thakurakona",
              "Mougati",
              "Rouha",
              "Medni",
              "Kaliara Babragati"
            ]
          }
        ]
      }
    ]
  }
];

export const bangladeshDivisions = bangladeshAddressData.map((division) => division.name);
