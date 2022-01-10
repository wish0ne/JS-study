import React from "react";
import classNames from "classnames/bind";
import styles from "./CSSModule.module.css"; //CSS Module이 적용된 스타일 파일을 불러오면 객체를 전달받음(styles). 클래스 이름과 해당 이름을 고유한값이 키-값 형태로 들어있음.
//console.log(styles) -> {wrapper : 'CSSModule_wrapper_1SbdQ}
//'파일이름_클래스이름_해쉬값' 형태로 고유화됨

//CSS Module + classnames
const cx = classNames.bind(styles); //미리 styles에서 클래스를 받아 오도록 설정.

const CSSModule = () => {
  return (
    //className={styles.[클래스이름]} 형태로 사용
    //클래스 이름을 두개 이상 적용할때는 템플릿 리터럴 또는 join을 사용하여 문자열을 합해서 사용
    //className={[styles.wrapper, styles.inverted].join(' )}

    //classnames 함께 사용하면 className={cx('wrapper', 'inverted')}로 사용가능.
    <div className={`${styles.wrapper} ${styles.inverted}`}>
      {/* 전역적으로 선언한 클래스는 그냥 문자열 형태로 사용 */}
      안녕하세요, 저는 <span className="something">CSS Module</span>
    </div>
  );
};

export default CSSModule;
