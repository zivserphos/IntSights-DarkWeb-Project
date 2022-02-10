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
