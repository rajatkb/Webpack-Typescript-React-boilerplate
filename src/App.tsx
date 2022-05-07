import { Fragment, lazy, Suspense, useState } from "react";
import style from "./style/index.scss";
import other from "./style/other.scss"

const LazyComponent = lazy(() => import("./components/LazyCompotent"));

export default function App(props: { message: string }) {
    const [showLazy , setLazyShow] = useState(false)
  return (
      <h1>
        This is <span className={style.yellow}>awesome</span> React +{" "}
        <span className={other.aquafin}>Typescript</span> + Webpack Setup.
        {props.message}
        
        {showLazy && <Suspense  fallback={<div>...loading</div>}>
        <LazyComponent/>
        </Suspense>}
        <div onClick={() => setLazyShow(true)}>Click to load lazy component</div>
      </h1>
  );
}
