export interface PhotoItem {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

export interface PhotoWithLikes extends PhotoItem {
  likes: number;
}
