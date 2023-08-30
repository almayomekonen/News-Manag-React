import { Link, useNavigate, useParams } from "react-router-dom";
import "./Articles.css";
import { useContext, useEffect, useState } from "react";
import { AiOutlineRight } from "react-icons/ai";
import moment from "moment";
import { GeneralContext } from "../App/App";

export default function ArticlesEdit() {
  const { id } = useParams();
  const [item, setItem] = useState();
  const { snackbar, setIsLoader } = useContext(GeneralContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Check whether the article exists or not
    if (id === "new") {
      setItem({
        publishDate: moment("MM/DD/YYYY"),
        headline: "",
        description: "",
        content: "",
        imgUrl: "",
      });
    } else {
      setIsLoader(true);

      // Fetch the article for editing using a GET request to the server
      fetch(`https://api.shipap.co.il/articles/${id}`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => setItem(data))
        .finally(() => setIsLoader(false));
    }
  }, [id]);

  // Function to handle changes in input fields
  const handleInput = (ev) => {
    const { name, value } = ev.target;

    setItem({
      ...item,
      [name]: value,
    });
  };

  // Function to save the article
  const save = (ev) => {
    ev.preventDefault();
    setIsLoader(true);

    // Perform a POST or PUT request to the server based on the desired action (create or edit)
    fetch(
      `https://api.shipap.co.il/articles` + (item.id ? `/${item.id}` : ""),
      {
        credentials: "include",
        method: item.id ? "PUT" : "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(item),
      }
    ).then(() => {
      navigate("/");
    });
  };

  return (
    <div className="ArticlesEdit">
      <button className="returnLink">
        <Link to="/">
          <AiOutlineRight /> Back to Article List
        </Link>
      </button>

      {item && (
        <>
          <h2>{item.id ? "Edit" : "Add"} Article</h2>

          <form onSubmit={save}>
            <label>
              Headline:
              <input
                type="text"
                name="headline"
                value={item.headline}
                onChange={handleInput}
              />
            </label>

            <label>
              Image URL:
              <input
                type="text"
                name="imgUrl"
                value={item.imgUrl}
                onChange={handleInput}
              />
            </label>

            <label>
              Publish Date:
              <input
                type="date"
                name="publishDate"
                value={item.publishDate}
                onChange={handleInput}
              />
            </label>

            <label>
              Description:
              <textarea
                name="description"
                cols="30"
                rows="5"
                value={item.description}
                onChange={handleInput}
              ></textarea>
            </label>

            <label>
              Content:
              <textarea
                name="content"
                cols="30"
                rows="10"
                value={item.content}
                onChange={handleInput}
              ></textarea>
            </label>

            <div className="save-add-Btn">
              <button>{item.id ? "Save" : "Add"}</button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
