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
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add("col");
        categoryDiv.innerHTML = `<div class="p-2 border text-white bg-info" onclick="loadAllNewsCategory('${category.category_id}')">${category.category_name}</div>`;
        categoriesContainer.appendChild(categoryDiv);
    });
};

const loadAllNewsCategory = (category_id) => {
    const spinner = document.getElementById('spinner');
    spinner.classList.remove('d-none');
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayAllNews(data.data))
        .catch(err => console.log(err))
};

const displayAllNews = (allNews) => {
    const sectionFound = document.getElementById('section-found');
    sectionFound.classList.remove('d-none');
    const itemFound = document.getElementById('item-found');
    itemFound.innerHTML = `<h4> ${allNews.length ? allNews.length + ' items found for category' : 'No News found'}</h4>`;
    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent = '';
    allNews.forEach(news => {
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
                                            <p>${news.author.published_date ? news.author.published_date : 'No Date Available'}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p class="fw-bold">${news.total_view ? news.total_view + '.M Views' : 'No Data Available'}</p>
                                    </div>
                                    <div class="">
                                        <button onclick="loadNewsDetails('${news._id}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newsModal">
                                        News Details</button>
                                    </div> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        newsContainer.appendChild(newsDiv);
        const spinner = document.getElementById('spinner');
        spinner.classList.add('d-none');
    });
};

const loadNewsDetails = (news_id) => {
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayNewsDetails(data.data[0]))
        .catch(err => console.log(err))
};

const displayNewsDetails = (newsDetail) => {
    console.log(newsDetail);
    const { author, category_id, others_info, rating, total_view, _id, thumbnail_url, title, details } = newsDetail;
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <div class="card mb-3">
            <img src="${thumbnail_url}" class="card-img-top" alt="">
            <div class="card-body">
            <h5 class="card-title">${title}.</h5>
            <p class="card-text"><span class="fw-bold">News Description</span>: ${details}</p>
            <div class="d-sm-block d-md-flex justify-content-around">
                <div class="d-flex">
                    <img  style="width: 60px; height: 60px" class="rounded-5" src="${author.img}" alt="" />
                    <div class="ms-2">
                        <p class="fw-bold">${author.name ? author.name : 'No Data Available'}</p>
                        <p>${author.published_date}</p>
                    </div>
                </div>
                <div class="fw-bold">
                    <p>${total_view ? total_view + '.M Views' : 'No data'}</p>
                </div>
                <div class="">
                    <p>${rating.badge}</p>
                    <p>${rating.number} star</p>
                </div>
            </div>
            <div class="d-flex justify-content-between">
                <p class="fw-bold">${others_info.is_todays_pick === true ? 'todays pick' : 'todays is not pick'}</p>
                <p>${others_info.is_trending === true ? "It's trending" : "This is not trending"}</p>
            </div>
            </div>
        </div>
    `;
}

loadNewsData();