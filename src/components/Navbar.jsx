import React, { useState } from "react";
import { useSelector } from "react-redux";

function Navbar() {
  const [showSidebar, setShowSidebar] = useState(false);

  const user = useSelector((state) => state.user.user);

  return (
    <>
      <div className="bg-blue-900 h-16 flex px-10">
        <div className="flex items-center gap-6">
          <div className="w-10" onClick={() => setShowSidebar(!showSidebar)}>
            <svg
              fill="none"
              stroke="white"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              ></path>
            </svg>
          </div>
          <div className="text-white text-3xl tracking-tighter font-extrabold">
            CashierApp
          </div>
        </div>
        <div className="w-full flex items-center gap-6 justify-end">
          <div className="flex text-white items-center gap-6">
            <p className="text-xl">{user.store_name}</p>
            <div className="w-10">
              <svg
                fill="none"
                stroke="white"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div
        class={`fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform bg-white w-80 dark:bg-gray-800 ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          type="button"
          class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>

        <br />
        <br />

        <div className="flex flex-col gap-6 px-6">
          <div className="">
            <p>Dashboard</p>
            <p>Product</p>
            <p>Category</p>
            <p>Transaction</p>
          </div>
          <div className="">
            <button>Logout</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
