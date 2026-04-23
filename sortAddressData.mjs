import fs from 'fs';

// Read the current file
let fileContent = fs.readFileSync('src/data/bangladesh-address.ts', 'utf-8');

// The JSON starts after "export const bangladeshAddressData: BangladeshDivision[] = "
const declaration = "export const bangladeshAddressData: BangladeshDivision[] = ";
const jsonStart = fileContent.indexOf(declaration) + declaration.length;
const jsonEnd = fileContent.lastIndexOf(';');
const jsonString = fileContent.substring(jsonStart, jsonEnd);

let data;
try {
    data = JSON.parse(jsonString);
} catch (e) {
    console.error("Failed to parse JSON. Error:", e);
    process.exit(1);
}

// Sort the data
data.sort((a, b) => a.name.localeCompare(b.name));
data.forEach(division => {
    division.districts.sort((a, b) => a.name.localeCompare(b.name));
    division.districts.forEach(district => {
        district.upazilas.sort((a, b) => a.name.localeCompare(b.name));
        district.upazilas.forEach(upazila => {
            if (upazila.unions) {
                upazila.unions.sort((a, b) => a.localeCompare(b));
            }
        });
    });
});

// Reconstruct the file
const newFileContent = `export interface BangladeshAddressNode {
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

export const bangladeshAddressData: BangladeshDivision[] = ${JSON.stringify(data, null, 2)};

export const bangladeshDivisions = bangladeshAddressData.map((division) => division.name);
`;

fs.writeFileSync('src/data/bangladesh-address.ts', newFileContent);
console.log('Successfully sorted all address data alphabetically!');
