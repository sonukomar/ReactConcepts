import "../../App.css";
import "./Books.css";

const Books = ({ books }) => {
  return (
    <>
      <div className="books col-md-3">
        {/* <p>{books.title}</p> */}
        <div class="bookContent">
          <h3> "{books.title}"</h3>
        </div>
        <div class="bookContent">
          <h3>
            {" "}
            <strong>Author:</strong> {books.author}
          </h3>
        </div>
        <div class="bookContent">
          <h3>
            {" "}
            <strong>Year:</strong>
            {books.year_published}
          </h3>
        </div>
        <div class="bookContent">
          <h3>
            {" "}
            <strong>Genre:</strong> {books.genre}
          </h3>
        </div>
        <div class="bookContent">
          <h3>
            {" "}
            <strong>Rating:</strong>
            {books.rating}
          </h3>
        </div>
        <div class="bookContent">
          <h3>
            {" "}
            <strong>Review :</strong>
            {books.review}
          </h3>
        </div>
      </div>
    </>
  );
};

export default Books;
