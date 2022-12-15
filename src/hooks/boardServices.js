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

export const getArticleList = async (id, pageNum, postNum) => {
  try {
    return await api.get(
      `/no-permit/api/boards/${id}/pages/${pageNum}?pageSize=${postNum}`
    );
  } catch (error) {
    window.location.href = "/login";
  }
};

export const getBoards = async (location) => {
  try {
    return await api.get(
      "/api/boards/" +
        location.state.boardId +
        "/articles/" +
        location.state.articleId
    );
  } catch (error) {
    window.location.href = "/login";
  }
};

/**
 * 게시판 내 (검색 구분) 선택 및 (키워드) 입력 후
 * 검색 버튼 클릭 시 '특정 게시글 검색' 기능을 수행하는 함수
 * @param {number} boardId 게시판 id값을 넣어주세요
 * @param {number} pageNum 게시판 내 페이지 번호를 넣어주세요
 * @param {string} keyword 검색 문자열 키워드를 넣어주세요
 * @param {string} keywordSelectOption 검색 구분으로 사용될 문자열 값을 넣어주세요
 */
export const searchArticles = async (
  boardId,
  pageNum,
  keyword,
  keywordSelectOption
) => {
  try {
    return await api.get(
      `/no-permit/api/boards/${boardId}/searchResult/pages/${pageNum}?keyword=${keyword}&pageSize=${10}&searchSubject=${keywordSelectOption}`
    );
  } catch (error) {
    Swal.fire({
      icon: "info",
      title: "게시판에 등록된 글이 없습니다.",
    });
  }
};
