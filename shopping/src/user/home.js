import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

const MyHome = () => {

    let [allproduct, setProduct] = useState([]);
    let [ordericon, seticon] = useState("fa fa-arrow-up");
    let [order, setOrder] = useState("asc");

    const getProduct = () => {
        fetch("http://localhost:1234/productlist")
            .then(response => response.json())
            .then(productArray => {

                if (order == "asc") {
                    productArray.sort((a, b) => a.pprice - b.pprice);
                    setProduct(productArray);
                    setOrder("desc");
                    seticon("fa fa-arrow-up")
                } else {
                    productArray.sort((a, b) => b.pprice - a.pprice);
                    setProduct(productArray);
                    setOrder("asc");
                    seticon("fa fa-arrow-down")
                }

            })
    }

    useEffect(() => {
        getProduct();
    }, []);

    let [keyword, setKeyword] = useState("");

    const addincart = (product) => {

        product["qty"] = 1;
        let url = "http://localhost:1234/cartapi";
        let postdata = {
            header: { 'Content-Type': 'application/json' },
            method: 'post',
            body: JSON.stringify(product)
        }

        try {
            fetch(url, postdata)
                .then(response => response.json())
                .then(proinfo => {
                    alert(proinfo.pname + " Added in your cart ");
                })
        } catch (error) {
            alert("Technical Error, Try in sometime");
        }

    }

    const PER_PAGE = 5; //displays 5 items/records per page
    const [currentPage, setCurrentPage] = useState(0);
    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage)
    }
    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(allproduct.length / PER_PAGE);

    return (
        <div className="container mt-4">
            <div className="row mb-4">
                <div className="col-lg-2"></div>
                <div className="col-lg-5 mb-2">
                    <input type="text"
                        className="form-control"
                        placeholder="Search...."
                        onChange={obj => setKeyword(obj.target.value)}
                        value={keyword}
                    />
                </div>
                <div className="col-lg-2"></div>
                <div className="col-lg-3">
                    <select className="form-select" onChange={getProduct}>
                        <option> Price Low to High </option>
                        <option> Price High to Low </option>
                    </select>
                </div>
            </div>

            <div className="row mt-5">
                {
                    allproduct.slice(offset, offset + PER_PAGE).map((product, index) => {
                        if (product.pname.toLowerCase().match(keyword.toLowerCase()) || product.pprice.toString().match(keyword))
                            return (
                                <div className="col-xl-3 mb-4" key={index}>
                                    <div className="p-3 shadow">
                                        <h4 className="mb-3"> {product.pname} </h4>
                                        <img src={product.photo} className="rounded" width="100%" height="180" />
                                        <p className="mt-3"> <i className="fa fa-rupee text-primary"></i>. {product.pprice} </p>
                                        <p className="mt-3"> {product.pdetails.slice(0, 30)} </p>
                                        <p className="text-center">
                                            <button className="btn btn-warning btn-sm" onClick={addincart.bind(this, product)}>
                                                <i className="fa fa-shopping-cart"></i> Add to cart
                                            </button>
                                        </p>
                                    </div>
                                </div>
                            )
                    })
                }
            </div>

            <div className="mt-4 text-center">
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    breakLabel={"..."}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination  justify-content-center"}
                    pageClassName={"page-item "}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                    breakClassName={"page-item"}
                    breakLinkClassName={"page-link"}
                    activeClassName={"active primary"}
                />
            </div>
        </div>
    )  
}


export default MyHome;

//sort function = if we give to 2 poperty(a, b) then sort make 2 partition half for a and half for b then it compares together...as sort function give asending order by default 