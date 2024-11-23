import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Link } from "react-router-dom";

import PaginatedItems from "./Pagination/Pagination";
import React, { useEffect, useState } from "react";
import { Axios } from "../../Api/axios";
import TransformDate from "../../helpers/TransformDate";
import { BaseItem, TableType } from "../../types/table";
import Loader from "./Loader";

const TableShow = ({
  data,
  header,
  searchLink,
  loading,
  limit,
  setLimit,
  deleteFn,
  setPage,
  total,
}: TableType) => {
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [filtredData, setFiltredData] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const filtredDataByDate =
    date.length !== 0
      ? data.filter((item: BaseItem) => TransformDate(item.created_at) === date)
      : data;

  const filterSearchByDate =
    date.length !== 0
      ? filtredData.filter(
          (item: BaseItem) => TransformDate(item.created_at) === date
        )
      : filtredData;

  const showWhichData =
    search.length > 0 ? filterSearchByDate : filtredDataByDate;

  async function getSearchedData() {
    try {
      const res = await Axios.post(`${searchLink}/search?title=${search}`);
      setFiltredData(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setSearchLoading(false);
    }
  }

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (search?.length > 0) {
        getSearchedData();
      } else {
        setSearchLoading(false);
      }
    }, 500);

    return () => clearTimeout(debounce);
  }, [search]);

  // Header Show
  const headerShow = header?.map((item: any, key: number) => (
    <th key={key} className="px-6 py-3">
      {item.name}
    </th>
  ));
  // Body Show
  const dataShow = showWhichData?.map((item: any, key: number) => (
    <tr className="odd:bg-white even:bg-gray-50" key={key}>
      <td className="px-6 py-4">{item.id}</td>
      {header?.map((item2: any, key2: number) => (
        <td className="px-6 py-4" key={key2}>
          {item2.key === "image" ? (
            <img width="50px" src={item[item2.key]} alt="" />
          ) : item2.key === "images" ? (
            <div className="flex items-center justify-start gap-2 flex-wrap">
              {item[item2.key].map((img) => (
                <img className="" width="50px" src={img?.image} alt="" />
              ))}
            </div>
          ) : item2.key === "created_at" || item2.key === "updated_at" ? (
            TransformDate(item[item2.key])
          ) : item[item2.key] === "1995" ? (
            "admin"
          ) : item[item2.key] === "2001" ? (
            "User"
          ) : item[item2.key] === "1996" ? (
            "Writer"
          ) : item[item2.key] === "1999" ? (
            "Product Manger"
          ) : (
            item[item2.key]
          )}
        </td>
      ))}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <Link to={`${item.id}`}>
            <FontAwesomeIcon fontSize={"19px"} icon={faPenToSquare} />
          </Link>

          <FontAwesomeIcon
            onClick={() => deleteFn(item.id)}
            fontSize={"19px"}
            color="red"
            cursor={"pointer"}
            icon={faTrash}
          />
        </div>
      </td>
    </tr>
  ));

  // Return Data
  return (
    <>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 mb-6 items-stretch">
        <div>
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
              placeholder="Search Mockups, Logos..."
              onChange={(e) => {
                setSearch(e.target.value);
                setSearchLoading(true);
              }}
              required
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
            >
              Search
            </button>
          </div>
        </div>{" "}
        <div>
          <input
            type="date"
            id="first_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2 h-full"
            placeholder="John"
            onChange={(e) => {
              setDate(e.target.value);
            }}
            required
          />
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                id
              </th>
              {headerShow}
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr className="odd:bg-white  even:bg-gray-50 p-4"></tr>
            ) : searchLoading ? (
              <tr className="odd:bg-white even:bg-gray-50">
                <td className="px-6 py-4">Searching...</td>
              </tr>
            ) : (
              dataShow
            )}
          </tbody>
        </table>
      </div>
      {loading && (
        <span className="flex items-center justify-center mt-8">
          <Loader className="w-8 h-8" />{" "}
        </span>
      )}
      <div className="flex items-center gap-3 justify-end flex-wrap mt-6">
        <div className="">
          <select
            onChange={(e: React.ChangeEvent<HTMLSelectElement> | number) =>
              setLimit(e.target.value)
            }
            aria-label="Default select example"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </div>
        <PaginatedItems
          setPage={setPage}
          itemsPerPage={limit}
          data={data}
          total={total}
        />
      </div>
    </>
  );
};

export default TableShow;
