import { useRouteError } from "react-router-dom";
import "./ErrorPage.css";

export default function ErrorPage() {
  const error: any = useRouteError();
  console.error(error);

  return (
    <section className="errorpage">
      <div className="text">Error Page</div>
      <div className="wrapper">
        <div id="error-page">
          <h1>Oops!</h1>
          <p>Sorry, an unexpected error has occurred.</p>
          <p>
            <i>{error.statusText || error.message}</i>
          </p>
        </div>
      </div>
    </section>
  );
}
