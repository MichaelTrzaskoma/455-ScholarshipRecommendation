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


export function parse_UTCTimeStamp(timer){
  // parse utc timestamp
  // INPUT: timer (utc time stamp)
  // OUTPUT: returns a parsed time stamp in MM/DD/YYYY
  const fields = String(timer).split(" ");
  // const dater = parseMonth(fields[2]) + "/" + fields[1] + "/" + fields[3]
  return (parseMonth(fields[2]) + "/" + fields[1] + "/" + fields[3]);
}


export function parseAmount(amount) {
  // parse the amount attribute
  // INPUT: amount (int)
  // OUTPUT: return desired val based on input leading character
  if (amount === 0) {
    return "See Description...";
  } else {
    return "$" + amount.toString();
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


// special case when sorting the amount
// merge sort, ref: https://jsfiddle.net/hhc879099766/a56qfpz7/11/

export function mergeSort_a2z(arr) {
  if (arr.length <= 1) return arr;

  let mid = Math.floor(arr.length / 2),
    left = mergeSort_a2z(arr.slice(0, mid)),
    right = mergeSort_a2z(arr.slice(mid));

  return merge_a2z(left, right);
};


function merge_a2z(arr1, arr2) {
  let sorted = [];

  while (arr1.length && arr2.length) {
    
    if (parseInt(arr1[0].amount) < parseInt(arr2[0].amount)) sorted.push(arr1.shift());
    // if (Buffer.from(arr1[0].amount, 'utf-8') < Buffer.from(arr2[0].amount, 'utf-8')) sorted.push(arr1.shift());
    else sorted.push(arr2.shift());

  };

  return sorted.concat(arr1.slice().concat(arr2.slice()));
};


export function mergeSort_z2a(arr) {
  if (arr.length <= 1) return arr;

  let mid = Math.floor(arr.length / 2),
    left = mergeSort_z2a(arr.slice(0, mid)),
    right = mergeSort_z2a(arr.slice(mid));

  return merge_z2a(left, right);
};


function merge_z2a(arr1, arr2) {
  let sorted = [];

  while (arr1.length && arr2.length) {
    
    if (parseInt(arr1[0].amount) > parseInt(arr2[0].amount)) sorted.push(arr1.shift());
    // if (Buffer.from(arr1[0].amount, 'utf-8') < Buffer.from(arr2[0].amount, 'utf-8')) sorted.push(arr1.shift());
    else sorted.push(arr2.shift());

  };

  return sorted.concat(arr1.slice().concat(arr2.slice()));
};

