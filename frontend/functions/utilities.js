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


export function parseAmount(amount){
  if (amount === "See Description For Amount"){
    return "See Description...";
  } else {
    return amount;
  }
}

export function parseSimilarScore(score){
  // parse the similarity score to two decimal place
  // INPUT: score (int) similarity score
  // OUTPUT: return a two decimal place float val
  return parseFloat(score).toFixed(2);
}