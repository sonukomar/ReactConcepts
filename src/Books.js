const Books = ({ books }) => {
  return (
    <>
      <div className="books col-md-3">
        {/* <p>{books.title}</p> */}
        <p>
          <strong>Author:</strong> {books.author}
        </p>
        <p>
          {" "}
          <strong>Year:</strong>
          {books.year_published}
        </p>
        <p>
          <strong>Genre:</strong> {books.genre}
        </p>
        <p>
          <strong>Rating:</strong>
          {books.rating}
        </p>
        <p>
          <strong>Review :</strong>
          {books.review}
        </p>
      </div>
    </>
  );
};

export default Books;
