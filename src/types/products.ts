export type image = {
  image: string;
};

export type product = {
  id: number;
  category?: string;
  title: string;
  description: string;
  rating: number;
  price: string;
  discount: string;
  stock?: string;
  About?: string;
  sale?: boolean;
  col?: string;
  images: image[] | string;
};
