import { useContext, useEffect, useState } from "react";
import { GeneralContext } from "../App/App";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { FaRecycle } from "react-icons/fa6";
import moment from "moment";
import "./Articles.css";
import { Link, useNavigate } from "react-router-dom";

const Article = () => {
  const [articles, setArticles] = useState([]);
  const { setIsLoader, snackbar } = useContext(GeneralContext);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoader(true);
    fetch("https://api.shipap.co.il/articles", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setArticles(data);
        setIsLoader(false);
        snackbar("");
      });
  }, []);

  const remove = (articleId) => {
    if (
      !window.confirm(`Are you sure you want to remove this Item${articleId}?`)
    ) {
      return;
    }

    setIsLoader(true);

    fetch(`https://api.shipap.co.il/articles/${articleId}`, {
      credentials: "include",
      method: "DELETE",
    }).then(() => {
      setArticles(articles.filter((article) => article.id !== articleId));
      setIsLoader(false);
    });
  };

  return (
    <>
      <div className="btnFrame">
        <button className="returnLink" onClick={() => navigate("/article/new")}>
          New article +
        </button>
        <button className="returnLink" onClick={() => navigate("/recycle-bin")}>
          recycle-bin <FaRecycle />
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>headline</th>
            <th>views</th>
            <th>discription</th>
            <th>addedTime</th>
            <th>publishDate</th>
            <th>🗑️ 📝</th>
          </tr>
        </thead>

        <tbody>
          {articles.map((article, i) => (
            <tr
              onDoubleClick={() => navigate(`/article/${article.id}`)}
              key={article.id}
            >
              <td>{i + 1}</td>
              <td>{article.headline}</td>
              <td>{article.views}</td>
              <td>{article.description}</td>
              <td>{moment(article.publishDate).format("MM/DD")}</td>
              <td>{moment(article.addedTime).format("MM/DD/YY")}</td>
              <td>
                <Link to={`/article/${article.id}`}>
                  <button className="green">
                    <AiFillEdit />
                  </button>
                </Link>

                <button onClick={() => remove(article.id)} className="red">
                  <AiFillDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default Article;
