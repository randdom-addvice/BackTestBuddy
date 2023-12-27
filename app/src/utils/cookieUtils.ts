import Cookies from "js-cookie";

class CookieUtility {
  public static setCookie(
    name: string,
    value: string,
    options?: Cookies.CookieAttributes
  ): void {
    Cookies.set(name, value, options);
  }

  public static getCookie(name: string): string | undefined {
    return Cookies.get(name);
  }

  public static updateCookie(name: string, value: string): void {
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // Example: 7 days from now
    this.setCookie(name, value, { expires });
  }

  public static deleteCookie(name: string): void {
    Cookies.remove(name);
  }
}

export default CookieUtility;

// class CookieUtility {
//   public static setCookie(
//     name: string,
//     value: string,
//     expires?: Date,
//     path: string = "/",
//     secure: boolean = false,
//     httpOnly: boolean = false,
//     sameSite: "Lax" | "Strict" | "None" = "Strict"
//   ): void {
//     let cookieString = `${name}=${value}`;

//     if (expires) {
//       cookieString += `; expires=${expires.toUTCString()}`;
//     }

//     cookieString += `; path=${path}`;

//     if (secure) {
//       cookieString += `; Secure`;
//     }

//     if (httpOnly) {
//       cookieString += `; HttpOnly`;
//     }

//     cookieString += `; SameSite=${sameSite}`;
//     document.cookie = cookieString;
//     console.log(cookieString);
//   }

//   public static getCookie(name: string): string | null {
//     const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
//     const matchingCookie = cookies.find((cookie) =>
//       cookie.startsWith(`${name}=`)
//     );

//     return matchingCookie ? matchingCookie.split("=")[1] : null;
//   }

//   public static updateCookie(name: string, value: string): void {
//     const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000); // Example: 1 year from now
//     this.setCookie(name, value, expires);
//   }

//   public static deleteCookie(name: string): void {
//     const expires = new Date(0); // Set expiration date in the past to delete the cookie
//     this.setCookie(name, "", expires);
//   }
// }

// export default CookieUtility;
