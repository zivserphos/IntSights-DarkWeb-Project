/* eslint-disable no-restricted-syntax */
import initalStats from "./initialStats";

const getStats = (pastelist: Paste[]) => {
  const stats = { ...initalStats };
  const percentPerPaste = 100 / pastelist.length;
  for (const paste of pastelist) {
    switch (paste.category) {
      case "general":
        stats.General += 1;
        break;
      case "crypto":
        stats.Crypto += 1;
        break;
      case "hacking":
        stats.Hacking += 1;
        break;
      case "drugsAndWeapons":
        stats.DrugsAndWeapons += 1;
        break;
      case "adultsContent":
        stats.AdultsContent += 1;
        break;

      default:
        break;
    }
  }
  stats.General *= percentPerPaste;
  stats.Crypto *= percentPerPaste;
  stats.Hacking *= percentPerPaste;
  stats.DrugsAndWeapons *= percentPerPaste;
  stats.AdultsContent *= percentPerPaste;
  return stats;
};

export default getStats;
