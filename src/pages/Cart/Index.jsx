import { useContext } from "react";
import useCart from "../../hook/useCart";
import { FaTrashCan } from "react-icons/fa6";
import { AuthContext } from "../../context/AuthContext";
import cartService from "../../services/cart.service";
import Swal from "sweetalert2";

const Index = () => {
  const [cart, refetch] = useCart();
  const { user } = useContext(AuthContext);
  const formatPrice = (price) => {
    return new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
    }).format(price);
  };
  const handleClearCart = async () => {
    Swal.fire({
      icon: "question",
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      cancelButtonColor: "#d33",
      confirmButtonColor: "#3085d6",
      showConfirmButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await cartService.clearCart(user?.email);
          if (response.status === 200) {
            refetch();
            Swal.fire({
              icon: "success",
              title: "Delete Success",
              text: response.message,
            });
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: error.message,
          });
        }
      }
    });
  };
  const handleDeleteItem = async (cartItem) => {
    Swal.fire({
      icon: "question",
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      cancelButtonColor: "#d33",
      confirmButtonColor: "#3085d6",
      showConfirmButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await cartService.deleteCartItem(cartItem._id);
          if (response.status === 200) {
            refetch();
            Swal.fire({
              icon: "success",
              title: "Delete Success",
              text: response.message,
            });
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: error.message,
          });
        }
      }
    });
  };

  const handleIncrease = async (cartItem) => {
    try {
      const response = await cartService.updateCart(cartItem._id, {
        quantity: cartItem.quantity + 1,
      });

      if (response.status === 200) {
        refetch(); // รีเฟรชข้อมูล
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

  const handleDecrease = async (cartItem) => {
    try {
      const response = await cartService.updateCart(cartItem._id, {
        quantity: cartItem.quantity - 1,
      });

      if (response.status === 200) {
        refetch(); // รีเฟรชข้อมูล
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };
  // const totalprice = (items) => {
  //   let total = 0;
  //   items.forEach(items);
  // };

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr className="bg-red font-semibold text-white">
            <th>#</th>
            <th>Product</th>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Price Per Unit</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {cart.length > 0 &&
            cart.map((cartItem, index) => (
              <tr key={cartItem.id || index}>
                <td>{index + 1}</td>
                <td>{cartItem.name}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={
                            cartItem.image ||
                            "https://img.daisyui.com/images/profile/demo/2@94.webp"
                          }
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{cartItem.name}</div>
                      <div className="text-sm opacity-50">
                        {cartItem.description}
                      </div>
                    </div>
                  </div>
                </td>
                <div className="flex items-center">
                  <button
                    className="btn btn-xs"
                    onClick={() => handleDecrease(cartItem)}
                  >
                    -
                  </button>
                  <span className="mx-2">{cartItem.quantity}</span>
                  <button
                    className="btn btn-xs"
                    onClick={() => handleIncrease(cartItem)}
                  >
                    +
                  </button>
                </div>
                <td>{formatPrice(cartItem.price)}</td>
                <td>{formatPrice(cartItem.quantity * cartItem.price)}</td>
                <button onClick={() => handleDeleteItem(cartItem)}>
                  <FaTrashCan />
                </button>
              </tr>
            ))}
        </tbody>
        {/* foot */}
        <tfoot>
          <tr>
            <th></th>
            <th>Product</th>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Price Per Unit</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Index;
