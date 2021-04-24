// A collection of utilities function for the project

export function parseMonth(month) {
  // convert string formated month to digital
  // INPUT: month (str) as in text
  // OUTPUT: return corrsponding month in int
  switch (month) {
    case "January":
      return "01";
      break;
    case "February":
      return "02";
      break;
    case "March":
      return "03";
      break;
    case "April":
      return "04";
      break;
    case "May":
      return "05";
      break;
    case "June":
      return "06";
      break;
    case "July":
      return "07";
      break;
    case "August":
      return "08";
      break;
    case "September":
      return "09";
      break;
    case "October":
      return "10";
      break;
    case "November":
      return "11";
      break;
    default:
      return "12";
      break;
  }
}


export function parseAmount(amount) {
  if (amount === "See Description For Amount") {
    return "See Description...";
  } else {
    return String(amount).replace(",", "");
  }
}

export function parseSimilarScore(score) {
  // parse the similarity score to two decimal place
  // INPUT: score (int) similarity score
  // OUTPUT: return a two-decimal-place float val
  return parseFloat(score).toFixed(2);
}


export function dynamicSort(property) {
  // sort the dictionary list in asending or descending order
  // INPUT: attribute of the dictionary
  // OUTPUT: return a sorted dictionary list
  // ref: https://ourcodeworld.com/articles/read/764/how-to-sort-alphabetically-an-array-of-objects-by-key-in-javascript

  var sortOrder = 1;

  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }

  return function (a, b) {
    if (sortOrder == -1) {
      return b[property].localeCompare(a[property]);
    } else {
      return a[property].localeCompare(b[property]);
    }
  }
}

export function sortAmount(property) {
  // sort the dictionary list in asending or descending order
  // INPUT: attribute of the dictionary
  // OUTPUT: return a sorted dictionary list
  // ref: https://ourcodeworld.com/articles/read/764/how-to-sort-alphabetically-an-array-of-objects-by-key-in-javascript

  var sortOrder = 1;

  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }



  // return function (a, b) {
  //   if (sortOrder == -1) {
  //     return b[property].substring(1).localeCompare(a[property].substring(1));
  //   } else {
  //     return a[property].substring(1).localeCompare(b[property].substring(1));
  //   }
  // }


  return function (a, b) {
    if (sortOrder == -1) {
      return parseInt(b[property].substring(1)) - parseInt(a[property].substring(1));
    } else {
      return parseInt(a[property].substring(1)) - parseInt(b[property].substring(1));
    }
  }



}


export function sortAmount_a2z(target) {
  //Sort ArrayList by ascending order
  // Ref: https://www.techup.co.in/sort-arraylist-by-id-react-native/

  target.sort(function (obj1, obj2) {
    // Ascending: first id less than the previous
    return obj1.amount - obj2.amount;
  });
}