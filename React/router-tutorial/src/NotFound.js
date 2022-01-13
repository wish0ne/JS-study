//NotFound 페이지 : 사전에 정의되지 않은 경로에 사용자가 진입했을때 보여주는 페이지

const NotFound = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 64,
        position: "absolute",
        width: "100%",
        height: "100%",
      }}
    >
      404
    </div>
  );
};

export default NotFound;
