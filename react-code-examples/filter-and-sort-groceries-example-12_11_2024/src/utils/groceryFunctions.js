export const sortAscending = items => {
  return [...items].sort((a, b) => a.price - b.price);
};

export const filterByCategory = (items, category) => {
    if (!category || category === 'all') {
        return items; // early return
    }
    return items.filter(item => {
        return item.category.toLowerCase() === category.toLowerCase();
    });
}