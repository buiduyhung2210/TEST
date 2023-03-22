interface CategoryInterface {
  id: number;
  name: string;
  type: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  prefix: string;
};

export default CategoryInterface;
