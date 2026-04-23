const fs = require('fs');

const rawData = JSON.parse(fs.readFileSync('bangladeshData.json', 'utf8'));

// We need to know which upazilas/thanas are considered "city"
const cityUpazilas = new Set([
  "Dhanmondi", "Gulshan", "Mirpur", "Uttara", "Gazipur Sadar", "Narayanganj Sadar",
  "Kotwali", "Pahartali", "Panchlaish", "Cox's Bazar Sadar", "Cumilla Sadar", "Brahmanbaria Sadar",
  "Chandpur Sadar", "Feni Sadar", "Khagrachhari Sadar", "Lakshmipur Sadar", "Noakhali Sadar",
  "Rangamati Sadar", "Bandarban Sadar", "Boalia", "Bogura Sadar", "Pabna Sadar", "Khulna Sadar",
  "Jashore Sadar", "Satkhira Sadar", "Barishal Sadar", "Bhola Sadar", "Patuakhali Sadar",
  "Sylhet Sadar", "Moulvibazar Sadar", "Habiganj Sadar", "Rangpur Sadar", "Dinajpur Sadar",
  "Kurigram Sadar", "Mymensingh Sadar", "Jamalpur Sadar", "Netrokona Sadar", "Paba", "Sherpur"
]);

// Actually let's just make any upazila that has no unions a city, or we can use the original list.
// The user wants ALL upazilas and unions. Let's merge the original city tags.

for (const div of rawData) {
  for (const dist of div.districts) {
    for (const upa of dist.upazilas) {
      if (cityUpazilas.has(upa.name) || upa.name.includes("City Corporation")) {
        upa.city = true;
      }
      
      // If it still doesn't have unions but it's not a city, we might have an issue, but let's just let it be.
      // If an upazila has NO unions, the user can just select the upazila and the union dropdown might be empty.
      // Or we can set city: true if unions are empty.
      if (!upa.unions || upa.unions.length === 0) {
        upa.city = true;
      }
    }
  }
}

const fileContent = `export interface BangladeshAddressNode {
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

export const bangladeshAddressData: BangladeshDivision[] = ${JSON.stringify(rawData, null, 2)};

export const bangladeshDivisions = bangladeshAddressData.map((division) => division.name);
`;

fs.writeFileSync('src/data/bangladesh-address.ts', fileContent);
console.log("Updated src/data/bangladesh-address.ts");
