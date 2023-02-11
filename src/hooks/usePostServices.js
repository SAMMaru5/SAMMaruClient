import api from "../utils/api";
import Swal from "sweetalert2";
import { createBrowserHistory } from "history";
import { checkExpiredAccesstoken } from "./useAuth";

export const deletePost = (props) => {
  const customHistory = createBrowserHistory();
  checkExpiredAccesstoken().then((response) => {
    if (response) {
      try {
        api
          .delete(`/api/boards/${props.boardId}/articles/${props.articleId}`)
          .then((response) => {
            Swal.fire({
              icon: "success",
              title: "게시글을 삭제하였습니다.",
            }).then((result) => {
              customHistory.back();
            });
          });
      } catch (error) {
        return Swal.fire({
          icon: "error",
          title: "게시글이 삭제 중 오류가 발생하였습니다.",
        });
      }
    }
  });
};
