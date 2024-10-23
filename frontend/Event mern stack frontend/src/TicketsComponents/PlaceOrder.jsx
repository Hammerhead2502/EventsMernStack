import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems } from "../lib/action/action";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const [cookie, setCookie, removeCookie] = useCookies(["token", "userdata"]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cart?.data?.data?.data);
  const [amount, setAmount] = useState(null);
  useEffect(() => {
    dispatch(getCartItems(cookie.userdata?._id));
  }, []);
  useEffect(() => {
    if (cartData && cartData.length) {
      let sum = cartData
        .map((item) => item.price * item.quantity)
        .reduce((a, b) => a + b);
      setAmount(sum);
    }
  }, [cartData]);
  console.log(cartData);
  const createOrder = async (e) => {
    const orderData = await axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/create-order`, {
        amount: amount,
        product: cartData.map((item) => {
          return { ...item.event, seat: item.seating, quantity: item.quantity };
        }),
      })
      .then((res) => {
        if (res.status == 200) {
          return res?.data?.data;
        }
      })
      .catch((err) => console.log(err));

    var options = {
      key: "rzp_test_gRUuf80PxHUuUA", // Enter the Key ID generated from the Dashboard
      amount: orderData.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Acme Corp", //your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: orderData.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (response) {
        await axios
          .post(`${import.meta.env.VITE_BACKEND_URL}/verify-order`, {
            paymentID: response.razorpay_payment_id,
            orderID: response.razorpay_order_id,
            signature: response.razorpay_signature,
          })
          .then(async (res) => {
            if (res.status == 200) {
              await axios
                .post(`${import.meta.env.VITE_BACKEND_URL}/add-order`, {
                  userID: cookie.userdata?._id,
                  products: cartData.map((item) => {
                    return {
                      ...item.event,
                      seat: item.seating,
                      quantity: item.quantity,
                    };
                  }),
                  orderID: response.razorpay_order_id,
                  paymentID: response.razorpay_payment_id,
                  signature: response.razorpay_signature,
                  cart: cartData,
                })
                .then((res) => {
                  if (res.status == 200) {
                    navigate("/my-orders", { replace: true });
                  }
                })
                .catch((err) => console.log(err));
            }
          })
          .catch((err) => {
            console.log(err);
          });
      },
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
        name: "TryCatch", //your customer's name
        email: "trycatch@example.com",
        contact: "9000090000", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    rzp1.open();
    e.preventDefault();
  };
  const handleDelete = async (e) => {
    e.preventDefault();
    await axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/delete-item`, {
        data: {
          id: e.target.value,
        },
      })
      .then((res) => {
        if (res.status == 200) {
          window.location.reload();
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="mx-2 my-10">
      {cartData && cartData.length ? (
        cartData.map((item, index) => {
          return (
            <div key={index} className="events w-max lg:mx-10 my-4">
              <h1 className="px-4 pt-3">{index + 1}</h1>
              <div className="p-4">
                <h1 className="text-lg">
                  <span>Event name - </span>
                  {item.event?.event_name}
                </h1>
                <h1 className="text-lg">
                  <span>Class - </span>
                  {item?.seating.split("_")[0]}
                </h1>
                <h1 className="text-lg">
                  <span>No. of tickets - </span>
                  {item?.quantity} tickets
                </h1>
                <h1 className="text-lg">
                  <span>Event venue - </span>
                  {item.event?.venue}
                </h1>
                <h1 className="text-lg">
                  <span>Time and date - </span>
                  {item.event?.date} at {item.event?.time}
                </h1>
                <h1 className="text-lg">
                  <span>Price - </span>
                  Rs.{item?.price}
                </h1>
                <button
                  className="border px-4 py-2 text-red-700"
                  onClick={handleDelete}
                  value={item._id}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <></>
      )}
      <div className="lg:mx-10 my-4">
        <h1>
          Grand total - <span>Rs.{amount}</span>
        </h1>
      </div>
      <button
        onClick={() => navigate("/")}
        className="block text-green-700 py-2 px-4 my-4 lg:mx-10 but hover:bg-green-700 hover:text-white"
      >
        Continue browsing
      </button>
      <button
        onClick={createOrder}
        className="block text-green-700 px-4 py-2 lg:mx-10 but hover:bg-green-700 hover:text-white"
      >
        Pay
      </button>
    </div>
  );
};

export default PlaceOrder;
