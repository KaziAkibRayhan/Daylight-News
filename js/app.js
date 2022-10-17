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
        // console.log(category);
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add("col");
        categoryDiv.innerHTML = `<div class="p-1 border bg-info" onclick="loadAllNewsCategory('${category.category_id}')">${category.category_name}</div>`;
        categoriesContainer.appendChild(categoryDiv);
    });
};

const loadAllNewsCategory = (category_id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayAllNews(data.data))
        .catch(err => console.log(err))
};

const displayAllNews = (allNews) => {
    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent = '';
    allNews.forEach(news => {
        console.log(news)
        const newsDiv = document.createElement('div');
        newsDiv.classList.add("col-12");
        newsDiv.innerHTML = `
            <div class="card mb-3">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${news.image_url}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${news.title}</h5>
                            <p class="card-text">${news.details.length > 200 ? news.details.slice(0, 200) + ' ...' : news.details}</p>
                            <div class=" d-sm-block d-md-flex justify-content-around">
                                    <div class="d-flex">
                                        <img style="width: 60px; height: 60px" class="rounded-5" src="${news.author.img}" alt=""/>
                                        <div class="ms-2">
                                            <p class="fw-bold">${news.author.name ? news.author.name : 'No Data Available'}</p>
                                            <p>${news.author.published_date}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p class="fw-bold">${news.total_view ? news.total_view + '.M Views' : 'No Data Available'}</p>
                                    </div>
                                    <div class="">
                                        <button class="btn btn-primary">News Details</button>
                                    </div> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        newsContainer.appendChild(newsDiv);
    });
}

loadNewsData();