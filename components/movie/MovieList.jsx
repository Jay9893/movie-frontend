import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./movie.css";
import ReactPaginate from "react-paginate";
import Link from "next/link";
import btmImage from "../../public/Vector.svg";
import Group from "../../public/Group.svg";
import axiosInstance from "../../axiosInstance";
import { useRouter } from "next/router";

const MovieList = () => {
  const router = useRouter();

  const [movie, setMovie] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("token");
      if (!storedData) {
        router.push("/login");
      }
    }
  }, []);

  const fetchmovieList = async (Page) => {
    try {
      const response = await axiosInstance.get(`/movies?page=${currentPage}`);
      setMovie(response.data.result);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error creating User:", error.message);
    }
  };

  useEffect(() => {
    fetchmovieList();
  }, [currentPage]);

  useEffect(()=>{
    fetchmovieList()
  },[])

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  // const getImage = async (id) => {
  //   const response = await axiosInstance.get(
  //     `${process.env.NEXT_PUBLIC_BASE_URL}/movies/image/${id}`
  //   );
    
  //   return response;
  // };
  // getImage();
  return (
    <div style={{ paddingBottom: "220px" }}>
      {movie?.length ? (
        <div className="container">
          <div className="titleSection justify-content-between">
            <div className="titlediv">
              <div>
                <p className="movietitle mb-0">My movies</p>
              </div>
              <Link href="/create">
                <img
                  src={btmImage?.src}
                  style={{
                    textAlign:"center",
                    marginLeft:"10px",
                    width: "32px",
                    height: "32px",
                  }}
                />
              </Link>
            </div>
            <div className="loginsection gap-2 align-items-center">
              <div>
                <h2 className="logouttitle mb-0">Logout</h2>
              </div>
              <Link href="/login">
                <img
                  src={Group?.src}
                  style={{
                    width: "32px",
                    height: "32px",
                  }}
                />
              </Link>
            </div>
          </div>

          <div className="row">
            {movie?.map((item, index) => (
              <div className="col-3" key={index}>
                <div className="card">
                  <Link
                    href={`/${item._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <img
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}/movies/image/${item._id}`}
                      style={{ width: "100%", height: "400px" ,borderRadius:"12px",objectFit:"cover"}}
                    />
                    <div className="contentarea">
                      <h3 className="imagetitle">{item.title}</h3>
                      <p className="publishingyer">{item.publishingYear}</p>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <ReactPaginate
            pageCount={totalPages}
            pageRangeDisplayed={10}
            marginPagesDisplayed={currentPage}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        </div>
      ) : (
        <div className="container">
          <div className="emptyContent">
            <div className="titlediv">
              <div>
                <p className="movietitle">Your movie list is empty</p>
              </div>
              <div className="createButton">
                <Link href="/create">
                  <button>Add a new movie</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieList;
