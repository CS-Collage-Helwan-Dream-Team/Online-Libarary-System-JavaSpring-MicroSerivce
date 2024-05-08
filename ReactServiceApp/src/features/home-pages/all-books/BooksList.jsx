import BookCard from "@/ui/BookCard";

const BooksList = ({ data }) => {
    // Render the data
    return (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-12 ">
            {data.map((book) => (
                <BookCard key={book.id} book={book} />
            ))}
        </div>
    );
};

export default BooksList;
