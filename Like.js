// import { CommentsSample } from "./render.js";


export function LikesUser(Comments) {
    const LikeButtons = document.querySelectorAll(".like-button")
    for (const LikeButton of LikeButtons)
        LikeButton.addEventListener("click", (event) => {
            event.stopPropagation()
            const index = LikeButton.dataset.index;

            if (Comments[index].isLiked === false) {
                Comments[index].isLiked = true;
                Comments[index].likes++;
            }
            else {
                Comments[index].isLiked = false;
                Comments[index].likes--;
            }
            CommentsSample({Comments})
        })

}