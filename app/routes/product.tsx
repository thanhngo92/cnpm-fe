import { useParams } from "react-router";
import ProductPage from "../components/products/index";

export default function Product() {
  const { slug } = useParams();

  return <ProductPage slug={slug} />;
}