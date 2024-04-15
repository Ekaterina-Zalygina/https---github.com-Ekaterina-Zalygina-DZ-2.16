// import { CommentsSample } from "./render.js";

export function ReplyToСomment({Comments}) {
    const CommUser = document.querySelectorAll(".comment-text")
    for (const CommUsers of CommUser)
      CommUsers.addEventListener("click", () => {
        const index = CommUsers.dataset.index;
        const inputTextElement = document.getElementById("add-form-text");
        const CaseTextComment = document.querySelectorAll(".comment-body");
        inputTextElement.value = `${Comments[index].name}:\n${Comments[index].text}`;
        CommentsSample({Comments});
      })
    }