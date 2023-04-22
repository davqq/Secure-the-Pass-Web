import { useRouteError } from "react-router-dom";
import "./errorPage.css";

export default function ErrorPage() {
  const error: any = useRouteError();
  console.error(error);

  return (
    <section className="errorpage">
      <div className="wrapper">
        <h1>
          {error.status} - {error.statusText}
        </h1>
        <a className="underlineHover" href="/">
          TAKE ME HOME
        </a>
      </div>
    </section>
  );
}
