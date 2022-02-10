interface PasteI {
  author: string;
  title: string;
  content: string;
  date: Date;
  category?: string;
}

interface AuthorAndDate {
  author: string;
  date: Date;
}

interface Percentage {
  General: number;
  Crypto: number;
  Hacking: number;
  DrugsAndWeapons: number;
  AdultsContent: number;
}
