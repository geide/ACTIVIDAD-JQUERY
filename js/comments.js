import { posts } from "./posts.js";

// Agregar un comentario
export const addCommentToPost = (postId, commentText) => {
    const post = posts.find((post) => post.id === postId);
    if (post) {
        const commentId = Date.now();
        post.comments.push({ id: commentId, text: commentText });
    }
};

// Editar un comentario
export const editComment = (postId, commentId, newText) => {
    const post = posts.find((post) => post.id === postId);
    if (post) {
        const comment = post.comments.find((comment) => comment.id === commentId);
        if (comment) {
            comment.text = newText;
        }
    }
};

// Eliminar un comentario
export const deleteComment = (postId, commentId) => {
    const post = posts.find((post) => post.id === postId);
    if (post) {
        post.comments = post.comments.filter((comment) => comment.id !== commentId);
    }
};
