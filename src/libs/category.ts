import { ResponseProps } from './common';

export type CategoryListResponse = ResponseProps<CategoryProps[]>;

export type CategoryProps = {
  uuidcategory: string;
  nmcategory: string;
  category_permalink: string;
  created_at: string;
  updated_at: string;
};
