import { addPost, getPosts, editPost, deletePost, filterPostsByTitle } from "./posts.js";
import { addCommentToPost, editComment, deleteComment } from "./comments.js";

$(document).ready(() => {
    const renderPosts = (filteredPosts) => {
        const postsContainer = $("#posts-container");
        postsContainer.html("");

        const postsToRender = filteredPosts || getPosts();

        postsToRender.forEach((post) => {
            const postElement = $(`
                <div class="post">
                    <h3>${post.title}</h3>
                    <p>${post.description}</p>
                    <p><small>Publicado: ${post.date}</small></p>
                    <button class="btn edit-post" data-id="${post.id}">Editar</button>
                    <button class="btn delete-post" data-id="${post.id}">Eliminar</button>
                    
                    <!-- Formulario de edición de post -->
                    <form class="edit-form" data-id="${post.id}">
                        <input type="text" class="edit-title" value="${post.title}">
                        <textarea class="edit-description">${post.description}</textarea>
                        <button type="submit" class="btn">Guardar Cambios</button>
                    </form>

                    <div class="comment-section">
                        <h4>Comentarios</h4>
                        <div class="comments-container"></div>
                        <input type="text" class="new-comment" placeholder="Escribe un comentario">
                        <button class="btn add-comment" data-id="${post.id}">Comentar</button>
                    </div>
                </div>
            `);

            // Renderizar comentarios
            const commentsContainer = postElement.find(".comments-container");
            post.comments.forEach((comment) => {
                const commentElement = $(`
                    <div class="comment">
                        <p>${comment.text}</p>
                        <button class="btn edit-comment" data-post-id="${post.id}" data-id="${comment.id}">Editar</button>
                        <button class="btn delete-comment" data-post-id="${post.id}" data-id="${comment.id}">Eliminar</button>
                        
                        <!-- Formulario de edición de comentario -->
                        <form class="edit-comment-form" data-id="${comment.id}" data-post-id="${post.id}">
                            <input type="text" class="edit-comment-text" value="${comment.text}">
                            <button type="submit" class="btn">Guardar</button>
                        </form>
                    </div>
                `);
                commentsContainer.append(commentElement);
            });

            postsContainer.append(postElement);
        });
    };

    // Evento para crear un post
    $("#create-post-form").on("submit", (e) => {
        e.preventDefault();
        const title = $("#post-title").val();
        const description = $("#post-description").val();
        addPost(title, description);
        renderPosts();
        e.target.reset();
    });

    // Eventos para editar y eliminar posts
    $("#posts-container").on("click", ".edit-post", function () {
        $(this).siblings(".edit-form").toggle();
    });

    $("#posts-container").on("submit", ".edit-form", function (e) {
        e.preventDefault();
        const postId = Number($(this).data("id"));
        const newTitle = $(this).find(".edit-title").val();
        const newDescription = $(this).find(".edit-description").val();
        editPost(postId, newTitle, newDescription);
        renderPosts();
    });

    $("#posts-container").on("click", ".delete-post", function () {
        const postId = Number($(this).data("id"));
        deletePost(postId);
        renderPosts();
    });

    // Eventos para comentarios
    $("#posts-container").on("click", ".add-comment", function () {
        const postId = Number($(this).data("id"));
        const commentText = $(this).siblings(".new-comment").val();
        addCommentToPost(postId, commentText);
        renderPosts();
    });

    $("#posts-container").on("click", ".edit-comment", function () {
        $(this).siblings(".edit-comment-form").toggle();
    });

    $("#posts-container").on("submit", ".edit-comment-form", function (e) {
        e.preventDefault();
        const commentId = Number($(this).data("id"));
        const postId = Number($(this).data("post-id"));
        const newText = $(this).find(".edit-comment-text").val();
        editComment(postId, commentId, newText);
        renderPosts();
    });

    $("#posts-container").on("click", ".delete-comment", function () {
        const commentId = Number($(this).data("id"));
        const postId = Number($(this).data("post-id"));
        deleteComment(postId, commentId);
        renderPosts();
    });

    // Filtro de posts
    $("#filter-posts").on("input", function () {
        const keyword = $(this).val();
        const filteredPosts = filterPostsByTitle(keyword);
        renderPosts(filteredPosts);
    });

    renderPosts();
});
