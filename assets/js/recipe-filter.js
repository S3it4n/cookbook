document.addEventListener('DOMContentLoaded', function () {
    let recipeIndex = [];

    fetch('/assets/search-index.json')
        .then(response => response.json())
        .then(data => { recipeIndex = data })
        .catch(error => { console.error('Recipe index loading error:', error) });

    const searchInput = document.getElementById('recipe-search');
    const clearIcon = document.querySelector('.search-icon-clear');
    const recipePosts = document.querySelectorAll('.recipe-post');

    searchInput.addEventListener('input', function (e) {
        filterRecipes(e.target.value.trim(), recipeIndex, recipePosts);
    });

    clearIcon.addEventListener('click', function () {
        clearSearch(searchInput, recipeIndex, recipePosts);
    });
});

function clearSearch(searchInput, recipeIndex, recipeCards) {
    searchInput.value = '';
    filterRecipes('', recipeIndex, recipeCards);
    searchInput.focus();
}

function filterRecipes(searchTerm, recipeIndex, recipeCards) {
    const searchTermLower = searchTerm.toLowerCase();

    recipeCards.forEach(card => {
        const indexRecipe = recipeIndex.find(recipe => recipe.url === card.querySelector('a').getAttribute('href'));

        let shouldShow = true;

        if (searchTerm.length >= 3 && indexRecipe) {
            const title = indexRecipe.title
                ? indexRecipe.title.toLowerCase()
                : '';

            const author = indexRecipe.author
                ? indexRecipe.author.toLowerCase() 
                : '';

            const ingredients = indexRecipe.ingredients 
                ? indexRecipe.ingredients.map(ing => ing.toLowerCase()).join(' ') 
                : '';

            const tags = indexRecipe.tags 
                ? indexRecipe.tags.map(tag => tag.toLowerCase()).join(' ') 
                : '';

            const content = [title, ingredients, tags, author].join(' ');
            shouldShow = content.includes(searchTermLower);
        }

        card.style.display = shouldShow ? '' : 'none';
        card.style.opacity = shouldShow ? '1' : '0';
    });
}