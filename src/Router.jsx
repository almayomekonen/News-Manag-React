import { Routes, Route } from "react-router-dom";
import Article from "./Articles/Articles";
import ArticleEdit from "./Articles/ArtcilesEdit";
import Login from "./Authorization/Login";
import Signup from "./Authorization/Signup";
import RecyclingBin from "./Articles/RecyclingBin";

export const Router = () => {
  return (
    <Routes>
      <Route path="/article" element={<Article />} />
      <Route path="/article/:id" element={<ArticleEdit />} />
      <Route path="/recycle-bin" element={<RecyclingBin />} />
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
