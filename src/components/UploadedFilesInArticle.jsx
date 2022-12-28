export const UploadedFilesInArticle = ({ location, article }) => {
  return (
    <section className="fileSection m-0">
      {article.files.length !== 0 ? (
        <div className="row">
          <div
            className="col-1 text-center p-0 ml-3"
            style={{ margin: "auto 0" }}
          >
            <strong style={{ color: "black" }}>파일</strong>
          </div>
          <div className="files col">
            {article.files.map((file, id) => (
              <div key={id} className="uploadedFile">
                <a
                  href={
                    process.env.REACT_APP_URL +
                    "/no-permit/api/boards/" +
                    location.state.boardId +
                    "/articles/" +
                    location.state.articleId +
                    "/files/" +
                    file.filePath
                  }
                  className="text-decoration-none"
                >
                  {file.fileName}
                </a>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
};
