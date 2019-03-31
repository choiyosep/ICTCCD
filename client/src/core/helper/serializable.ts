/* */
export class Serializable {
  fromJson(json: any): void {
      for (const key in json) {
      if (json.hasOwnProperty(key)) {
        this[key] = json[key];
      }
    }
  }
}
