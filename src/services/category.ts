import { CategoryListResponse } from '../libs/category';
import { api } from './api';

export async function getCategories() {
  const { data } = await api.get<CategoryListResponse>('/api/category');
  return data;
}
