const fs = require('fs');

async function fetchData() {
  console.log("Fetching divisions...");
  const divRes = await fetch("https://raw.githubusercontent.com/nuhil/bangladesh-geocode/master/divisions/divisions.json");
  const divisions = (await divRes.json())[2].data;

  console.log("Fetching districts...");
  const distRes = await fetch("https://raw.githubusercontent.com/nuhil/bangladesh-geocode/master/districts/districts.json");
  const districts = (await distRes.json())[2].data;

  console.log("Fetching upazilas...");
  const upaRes = await fetch("https://raw.githubusercontent.com/nuhil/bangladesh-geocode/master/upazilas/upazilas.json");
  const upazilas = (await upaRes.json())[2].data;

  console.log("Fetching unions...");
  const unRes = await fetch("https://raw.githubusercontent.com/nuhil/bangladesh-geocode/master/unions/unions.json");
  const unions = (await unRes.json())[2].data;

  const result = [];

  for (const div of divisions) {
    const divData = { name: div.name, districts: [] };
    const divDistricts = districts.filter(d => d.division_id === div.id);

    for (const dist of divDistricts) {
      const distData = { name: dist.name, upazilas: [] };
      const distUpazilas = upazilas.filter(u => u.district_id === dist.id);

      for (const upa of distUpazilas) {
        const upaUnions = unions.filter(u => u.upazilla_id === upa.id).map(u => u.name);
        
        const upaData = {
          name: upa.name,
        };
        if (upaUnions.length > 0) {
          upaData.unions = upaUnions;
        } else {
            // Some upazilas are city corporations and may not have unions listed in the DB in a straightforward way,
            // or they are mostly urban.
        }
        distData.upazilas.push(upaData);
      }
      divData.districts.push(distData);
    }
    result.push(divData);
  }

  // Also some cities might not be properly mapped, let's just make everything an upazila. 
  // If it doesn't have unions, the dropdown will just be empty.

  fs.writeFileSync('bangladeshData.json', JSON.stringify(result, null, 2));
  console.log("Done. Wrote to bangladeshData.json");
}

fetchData().catch(console.error);
