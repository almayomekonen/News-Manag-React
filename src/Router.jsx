import { Routes, Route } from "react-router-dom";
import Article from "./Articles/Articles";
import ArticleEdit from "./Articles/ArtcilesEdit";
import Login from "./Authorization/Login";
import Signup from "./Authorization/Signup";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Article />} />
      <Route path="/article/:id" element={<ArticleEdit />} />
    </Routes>
  );
};

export const RouterAuth = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};
