function convertToObjects(values) {
  const headers = values[0];

  return values.slice(1).map(row => {
    let obj = {};

    headers.forEach((key, i) => {
      const val = row[i];

      // Convert numbers that come in as strings
      obj[key] = (typeof val === "string" && val.trim() !== "" && !isNaN(val))
        ? Number(val)
        : val;
    });

    return obj;
  });
}

// function filterTeams(minOvr, maxOvr, type) {
//     const teams = teamSetFC26;
//     const filteredTeams = [];
//         teams.forEach(element => {
//             if (minOvr == null && element.gender == type) {
//                 filteredTeams.push(element)
//             } else if (element.ovr >= minOvr && element.ovr < maxOvr && element.gender == type) 
//                 filteredTeams.push(element);
//             }); 
//             return filteredTeams
// };

function filterTeams(minOvr, maxOvr, type, FC) {
    let teams = teamSetFC25;
    if (FC == 'FC26'){
        teams = teamSetFC26
    }
    const filteredTeams = [];
        teams.forEach(element => {
            if (minOvr == null && element.gender == type) {
                filteredTeams.push(element)
            } else if (element.ovr >= minOvr && element.ovr < maxOvr && element.gender == type) 
                filteredTeams.push(element);
            }); 
            return filteredTeams
};