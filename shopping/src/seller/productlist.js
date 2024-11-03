import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

const MyProduct = () => {
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

    const PER_PAGE = 5; //displays 5 items/records per page
    const [currentPage, setCurrentPage] = useState(0);
    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage)
    }
    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(allproduct.length / PER_PAGE);

    const delproduct = (id) => {
        let url = "http://localhost:1234/productlist/" + id;
        let postdata = { method: "Delete" }

        fetch(url, postdata)
            .then(response => response.json())
            .then(info => {
                alert(info.pname + " Deleted ")
                getProduct();
            })
    }

    return (
        <div className="container mt-4">
            <div className="row mb-4">
                <div className="col-lg-9">
                    <h3 className="text-center text-info"> {allproduct.length} - Product in Inventory </h3>
                </div>
                <div className="col-lg-3">
                    <input type="text"
                        className="form-control"
                        placeholder="Search...."
                        onChange={obj => setKeyword(obj.target.value)}
                        value={keyword}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-lg-12 text-center">
                    <table className="table table-bordered shadow-lg">
                        <thead>
                            <tr className="table-info ">
                                <th>#Id</th>
                                <th>Product Name</th>
                                <th className="bg-warning mypointer" onClick={getProduct}><i className={ordericon}></i> Product Price</th>
                                <th>Product Detail</th>
                                <th>Photo</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allproduct.slice(offset, offset + PER_PAGE).map((product, index) => {
                                    if (product.pname.toLowerCase().match(keyword.toLowerCase()) || product.pprice.toString().match(keyword))
                                        return (
                                            <tr key={index}>
                                                <td> {product.id} </td>
                                                <td> {product.pname} </td>
                                                <td> {product.pprice} </td>
                                                <td> {product.pdetails} </td>
                                                <td> <img src={product.photo} height="40" width="70" /> </td>
                                                <td>
                                                    <button className="btn btn-danger btn-sm" onClick={delproduct.bind(this, product.id)} > <i className="fa fa-trash"></i> </button>
                                                </td>
                                            </tr>
                                        )
                                })
                            }
                        </tbody>
                    </table>

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
            </div>
        </div>
    )
}
export default MyProduct;

//sort function = if we give to 2 poperty(a, b) then sort make 2 partition half for a and half for b then it compares together...as sort function give asending order by default 