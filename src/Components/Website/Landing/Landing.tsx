import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="flex items-center justify-between flex-wrap bg-landing bg-cover bg-center py-36">
      <div className="container">
        <div>
          <h1 className="lg:text-6xl text-3xl mb-16 fw-bold">Nice Shampo</h1>
          <h5 className="fw-normal mb-10">
            Another Nice Thing Which is used by someone i don't know (just
            random text)
          </h5>

          <Link
            to="/shop"
            className="bg-blue-600 hover:bg-blue-700 transition text-white mt-3 p-4 fw-bold"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
}
