const setCookie = (token: string) => {
  const d = new Date();
  d.setTime(d.getTime() + 1000 * 60 * 60 * 24 * 7);
  const exp = "expires=" + d.toUTCString();
  // console.log("cookie: ", "myCookies=" + token + ";" + exp + ";path=/");

  document.cookie = "myCookies=" + token + ";" + exp + ";path=/";
};

const getCookie = (cookie: any) => {
  const cname = "myCookies=";
  const decoded = decodeURIComponent(cookie);
  const ca = decoded.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }

    if (c.indexOf(cname) == 0) {
      // console.log("getCookie: ", c.substring(cname.length, c.length));
      return c.substring(cname.length, c.length);
    }
  }
  return "";
};

export { setCookie, getCookie };
// export { setCookie };
