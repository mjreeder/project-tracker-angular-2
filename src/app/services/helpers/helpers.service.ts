export class Helper{
  
  constructor() { }

  getFormattedDate(date){
    var dateParts = date.split('-');
    var myDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
    var locale = "en-us";
    var month = myDate.toLocaleString(locale, { month: "long" });
    var day = myDate.getDate();
    return month + ' ' + day;
  }

}
