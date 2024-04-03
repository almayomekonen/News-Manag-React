import { useContext, useEffect, useState } from "react";
import "../Articles/Articles.css";
import { GeneralContext } from "../App/App";
import { AiOutlineAlignRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { FaRecycle } from "react-icons/fa6";

const RecyclingBin = () => {
  const [article, setArticle] = useState([]);
  const { snackbar, setIsLoader } = useContext(GeneralContext);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoader(true);

    fetch(`https://api.shipap.co.il/articles/recycle-bin`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setArticle(data);
        setIsLoader(false);
      });
  }, []);

  const Restore = (ArticleId) => {
    if (!window.confirm("Are you sure you want to restore")) {
      return;
    }

    setIsLoader(true);
    fetch(`https://api.shipap.co.il/articles/restore/${ArticleId}`, {
      credentials: "include",
      method: "PUT",
    }).then(() => {
      setArticle(article.filter((article) => article.id !== ArticleId));
      setIsLoader(false);
      snackbar("Article Restored successfully");
    });
  };

  return (
    <>
      <div>
        <button onClick={() => navigate("/")} className="btnFrame">
          <AiOutlineAlignRight /> Back
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
          {article.map((article, i) => (
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
                <button onClick={() => Restore(article.id)} className="red">
                  <FaRecycle />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default RecyclingBin;
