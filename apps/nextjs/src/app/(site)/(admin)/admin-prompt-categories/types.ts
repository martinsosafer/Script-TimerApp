export interface PromptCategory {
  id?: string;
  name: string;
}

export interface PromptSubcategory {
  id?: string;
  name: string;
  categoryId?: string;
}
