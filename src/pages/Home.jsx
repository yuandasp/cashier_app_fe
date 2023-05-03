import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setProducts } from "../feature/product/productSlice";
import { Dropdown } from "flowbite-react";
import { authToken } from "../helpers/constant";
import { setCategories } from "../feature/category/categorySlice";

function Home() {
  const products = useSelector((state) => state.product.products);
  const categories = useSelector((state) => state.category.categories);
  const dispatch = useDispatch();
  const token = localStorage.getItem(authToken);
  const [selectedCategory, setSelectedCategory] = useState({
    name: "All category",
  });
  const [selectedSortBy, setselectedSortBy] = useState({
    label: "",
    sort: "",
    key: "",
  });

  // console.log(selectedCategory);

  const fetchAllProduct = async () => {
    try {
      if (token) {
        let response = await axios.get(`http://localhost:8001/product/all`, {
          params: {
            category:
              selectedCategory.id_category > 0
                ? selectedCategory.id_category
                : undefined,
            sort: selectedSortBy.sort !== "" ? selectedSortBy.sort : undefined,
            key: selectedSortBy.key,
          },
          headers: { Authorization: `Bearer ${token}` },
        });
        // console.log(response);
        dispatch(setProducts(response.data));
      }
    } catch (error) {}
  };

  const fetchAllCategory = async () => {
    try {
      if (token) {
        let response = await axios.get(
          `http://localhost:8001/product/category`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        dispatch(setCategories(response.data));
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchAllCategory();
  }, []);

  useEffect(() => {
    fetchAllProduct();
  }, [selectedCategory.id_category, selectedSortBy.label]);

  return (
    <div className="h-full flex bg-slate-100 pr-2">
      <div className="w-4/6 px-11 py-4">
        <div className="bg-slate-100 flex gap-9 mb-4 h-fit">
          <Dropdown
            className=""
            // label="All category"
            label={selectedCategory.name}
            // dismissOnClick={false}
            style={{
              backgroundColor: "transparent",
              color: "black",
              border: "2px solid black",
            }}
          >
            <Dropdown.Item
              onClick={() =>
                setSelectedCategory({ name: "All Category", id_category: 0 })
              }
            >
              All Category
            </Dropdown.Item>
            {categories.map((category) => (
              <Dropdown.Item
                key={category.id_category}
                onClick={() => setSelectedCategory(category)}
              >
                {category.name}
              </Dropdown.Item>
            ))}
          </Dropdown>

          <Dropdown
            label={selectedSortBy.label}
            // dismissOnClick={false}
            style={{
              backgroundColor: "transparent",
              color: "black",
              border: "2px solid black",
            }}
          >
            <Dropdown.Item
              onClick={() =>
                setselectedSortBy({ label: "Sort by", sort: "", key: "" })
              }
            >
              Sort By
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() =>
                setselectedSortBy({ label: "A - Z", sort: "ASC", key: "name" })
              }
            >
              A - Z
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() =>
                setselectedSortBy({ label: "Z - A", sort: "DESC", key: "name" })
              }
            >
              Z - A
            </Dropdown.Item>{" "}
            <Dropdown.Item
              onClick={() =>
                setselectedSortBy({
                  label: "price: low - high",
                  sort: "ASC",
                  key: "price",
                })
              }
            >
              price: low - high
            </Dropdown.Item>{" "}
            <Dropdown.Item
              onClick={() =>
                setselectedSortBy({
                  label: "price: high - low",
                  sort: "DESC",
                  key: "price",
                })
              }
            >
              price: high - low
            </Dropdown.Item>
          </Dropdown>
        </div>
        <div className="flex gap-11">
          {products.map((product) => (
            <div
              className="w-1/5 bg-slate-500 rounded-md box-shadow-product"
              key={product.id_product}
            >
              <div className="">
                <img
                  src={product.image}
                  alt=""
                  style={{
                    height: "150px",
                    width: "300px",
                    overflow: "hidden",
                    borderTopLeftRadius: "6px",
                    borderTopRightRadius: "6px",
                  }}
                />
              </div>
              <div className="h-10 bg-white rounded-b-md text-center grid place-items-center">
                <p
                  className="font-bold text-xl "
                  style={{ overflow: "hidden", textOverflow: "ellipsis" }}
                >
                  {product.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-2/6">
        <div className="h-5/6 bg-white  rounded-xl">
          <div className="text-center text-2xl font-bold p-6 bg-blue-100 rounded-t-xl">
            + Add customer
          </div>
        </div>
        <div className="h-1/6 bg-slate-100 pr-4 py-2">
          <div>
            <button className="w-full bg-blue-900 text-white mx-2 py-8 text-2xl font-bold rounded-md">
              <div className="flex justify-between px-11">
                <div>Charge</div>
                <div>Total</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
