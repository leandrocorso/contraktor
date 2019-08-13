// Get the size of a objects
export function objectSize(obj) {
  if (obj) {
    let size = 0;
    let key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  }
  return false;
}

// Transform de date time from database to Brazilian format
export function dateToBr(string) {
  const dateTime = string.split(' ');
  const date = dateTime[0].split('-');
  return `${date[1]}/${date[2]}/${date[0]}`;
}

// Transform the Brazilian format to date time for database
export function brToDate(string, time) {
  const date = string.split('/');
  return `${date[2]}-${date[0]}-${date[1]} ${time}`;
}

// Remove non numeric characters
export function numeric(string) {
  const numsStr = string.replace(/[^0-9]/g, '');
  return parseInt(numsStr);
}
