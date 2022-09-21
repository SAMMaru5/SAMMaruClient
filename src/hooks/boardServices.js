import api from "../utils/api";
import Swal from "sweetalert2";

export const getBoardList = async () => {
    try {
        return await api.get("/no-permit/api/boards");
    } catch (error) {
        console.error(error);
        return Swal.fire({
            icon: "error",
            title: "게시판 목록 가져오기를 실패했습니다.",
        });
    }
};

export const getArticleList = async (id) => {
    try {
        return await api.get(`/no-permit/api/boards/${id}/pages/1`);
    } catch (error) {
        console.error(error);
        return Swal.fire({
            icon: "error",
            title: "자유게시판 목록 가져오기를 실패했습니다.",
        });
    }
};

export const getBoards = async (location) => {
    try {
        return await api.get("/api/boards/" + location.state.boardId + "/articles/" + location.state.articleId);
    } catch (error) {
        console.error(error);
    }
};