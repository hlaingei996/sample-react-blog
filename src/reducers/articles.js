const articles = ( state = [], action) => {
    switch (action.type) {
        case 'ADD_NEW_ARTICLE':
            return [
                ...state,
                {
                    id: action.article.id,
                    title: action.article.title,
                    content: action.article.content,
                    created_by: action.article.created_by
                }
            ];
        case 'FETCH_ARTICLES':
            return [...action.data];
        default:
            return state
    }
}

export default articles;