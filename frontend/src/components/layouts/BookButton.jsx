import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";

const { addToCart } = useCart();
const navigate = useNavigate();

<button
  onClick={() => {
    addToCart(service);
    navigate("/checkout");
  }}
>
  Book Service
</button>
