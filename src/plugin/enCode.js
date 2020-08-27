import md5 from "js-md5";
const enCode = function(pwd) {
  pwd = "&*()" + pwd + "!@#$%^";
  var hexDigits = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f"
  ];
  try {
    let array = md5.digest(pwd);
    let j = array.length;
    let str = [];
    let k = 0;
    for (let i = 0; i < j; i++) {
      var byte0 = array[i];
      str[k++] = hexDigits[(byte0 >>> 4) & 0xf];
      str[k++] = hexDigits[byte0 & 0xf];
    }
    return str.join("");
  } catch (e) {
    console.log(e);
  }
  return null;
};
export default enCode;
