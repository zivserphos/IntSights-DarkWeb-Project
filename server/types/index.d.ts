interface Paste {
  author: string;
  title: string;
  content: string;
  date: Date;
  id?: string;
}

interface AuthorAndDate {
  author: string;
  date: Date;
}
