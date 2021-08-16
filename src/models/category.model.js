export const CategoryModel = item => {
  return {
    id: item.id,
    emoji: item.emoji,
    title: item.title,
  };
};
export const CategoryModels = items => {
  return items.map(item => {
    return CategoryModel(item);
  });
};
