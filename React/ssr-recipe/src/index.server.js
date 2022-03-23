import React from "react";
import ReactDOMServer from "react-dom/server";
import express from "express";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";
import path from "path";
import fs from "fs";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./modules";
import PreloadContext from "./lib/PreloadContext";

// asset-manifest.json에서 파일 경로들을 조회
const manifest = JSON.parse(
  fs.readFileSync(path.resolve("./build/asset-manifest.json"), "utf8")
);

const chunks = Object.keys(manifest.files)
  .filter((key) => /chunk\.js$/.exec(key)) //chunk.js로 끝나는 키를 찾아서
  .map((key) => `<script src="${manifest.files[key]}"></script>`) //스크립트 태그로 변환하고
  .join(""); //합침

function createPage(root, stateScript) {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="shortcut icon" href="/favicon.ico" />
    <meta
      name="viewport"
      content="width=device-width,initial-scale=1,shrink-to-fit=no"
    />
    <meta name="theme-color" content="#000000" />
    <title>React App</title>
    <link href="${manifest.files["main.css"]}" rel="stylesheet" />
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root">
      ${root}
    </div>
    ${stateScript}
    <script src="${manifest.files["runtime-main.js"]}"></script>
    ${chunks}
    <script src="${manifest.files["main.js"]}"></script>
  </body>
  </html>
    `;
}

const app = express();

//서버 사이드 렌더링을 처리할 핸들러 함수
const serverRender = (req, res, next) => {
  //이 함수는 404가 떠야 하는 상황에 404를 띄우지 않고 서버 사이드 렌더링을 해줌
  const context = {};
  const store = createStore(rootReducer, applyMiddleware(thunk));

  const preloadContext = {
    done: false,
    promises: [],
  };
  const jsx = (
    //StaticRouter : 서버 사이드 렌더링 용도로 사용되는 라우터
    //location값에 따라 라우팅해줌
    //context값을 사용하여 나중에 렌더링한 컴포넌트에 따라 http 상태 코드 설정 가능
    <PreloadContext.Provider value={preloadContext}>
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      </Provider>
    </PreloadContext.Provider>
  );

  ReactDOMServer.renderToStaticMarkup(jsx); // renderToStaticMarkup으로 한번 렌더링합니다.
  try {
    await Promise.all(preloadContext.promises); // 모든 프로미스를 기다립니다.
  } catch (e) {
    return res.staus(500);
  }
  preloadContext.done = true;
  const root = ReactDOMServer.renderToString(jsx); //렌더링을 하고

  //json을 문자열로 변환하고 악성 스크립트가 실행되는 것을 방지하기 위해 <를 치환 처리
  const stateString = JSON.stringify(store.getState()).replace(/</g, "\\u003c");
  const stateScript = `<script>__PRELOADED_STATE__ = ${stateString}</script>`; //redux초기상태를 스크립트로 주입
  res.send(createPage(root, stateScript)); //클라이언트에게 결과물을 응답함
};

const serve = express.static(path.resolve("./build"), {
  index: false, // "/"경로에서 index.html을 보여주지 않도록 설정
});

app.use(serve); //순서가 중요. serverRender 전에 위치해야함
app.use(serverRender);

//5000 포트로 서버 가동
app.listen(5000, () => {
  console.log("Running on http://localhost:5000");
});

//서버에서 React component를 렌더링할때는 ReactDOMServer의 renderToString 함수 사용.
//이 함수에 JSX를 넣어서 호출하면 렌더링 결과를 문자열로 반환
// const html = ReactDOMServer.renderToString(
//   <div>Hello Server Side Rendering!</div>
// );

// console.log(html);
