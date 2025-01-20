export let posts = [];

// Agregar un nuevo post
export const addPost = (title, description) => {
    const postId = Date.now();
    const creationDate = new Date().toLocaleString();
    posts.push({ id: postId, title, description, date: creationDate, comments: [] });
    return postId;
};

// Editar un post existente
export const editPost = (postId, newTitle, newDescription) => {
    const post = posts.find((post) => post.id === postId);
    if (post) {
        post.title = newTitle;
        post.description = newDescription;
    }
};

// Eliminar un post
export const deletePost = (postId) => {
    posts = posts.filter((post) => post.id !== postId);
};

// Filtrar posts por título
export const filterPostsByTitle = (keyword) => {
    return posts.filter((post) => post.title.toLowerCase().includes(keyword.toLowerCase()));
};

// Obtener todos los posts
export const getPosts = () => posts;
