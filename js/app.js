const loadNewsData = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategoriesData(data.data.news_category))
        .catch(err => console.log(err))
};

const displayCategoriesData = (categories) => {
    const categoriesContainer = document.getElementById('categories-container');
    categories.forEach(category => {
        console.log(category.category_name);
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add("col");
        categoryDiv.innerHTML = `<div class="p-1 border bg-info">${category.category_name}</div>`;
        categoriesContainer.appendChild(categoryDiv);
    });
};

loadNewsData();