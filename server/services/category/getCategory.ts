/* eslint-disable no-restricted-syntax */
const getCategory = (text: string) => {
  let response = "general";
  const adultsContentKeyWords = [
    "porn",
    "sex",
    "xxx",
    "taboo",
    "child",
    "teen",
    "c.p",
    "s3x",
    "hot",
  ];
  const cryptoKeyWords = [
    "crypto",
    "bitcoin",
    "ethereum",
    "mining",
    "coin",
    "binance",
  ];
  const hackingKeyWords = [
    "database",
    "hack",
    "leak",
    "users",
    "data",
    "injection",
    "brut",
  ];
  const drugsAndWeaponsKeyWords = [
    "drug",
    "weapon",
    "pistol",
    "rifle",
    "psychedelic",
    "cocaine",
    "mushrooms",
    "lsd",
    "hashish",
    "weed",
    "molly",
    "dmt",
  ];
  for (const word of adultsContentKeyWords) {
    if (text.includes(word)) {
      response = "adultsContent";
      return response;
    }
  }
  for (const word of cryptoKeyWords) {
    if (text.includes(word)) {
      response = "crypto";
      return response;
    }
  }
  for (const word of hackingKeyWords) {
    if (text.includes(word)) {
      response = "hacking";
      return response;
    }
  }
  for (const word of drugsAndWeaponsKeyWords) {
    if (text.includes(word)) {
      response = "drugsAndWeapons";
      return response;
    }
  }
  return response;
};

export default getCategory;
