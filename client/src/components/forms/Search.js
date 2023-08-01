import axios from "axios";
import { useSearch } from "../../context/search";
import { useNavigate } from "react-router-dom";
import { Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons"; // Import the SearchOutlined icon

export default function Search() {
  // hooks
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`/products/search/${values?.keyword}`);
      // console.log(data);
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className="d-flex" onSubmit={handleSubmit}>
      <Input
        type="search"
        style={{ borderRadius: "0px", marginRight: "0px" }}
        placeholder="Search"
        prefix={<SearchOutlined />} // Add the SearchOutlined icon as a prefix
        onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        value={values.keyword}
      />
      <Button
        type="primary"
        style={{ borderRadius: "0px", height: "40px" }}
        onClick={handleSubmit}
      >
        Search
      </Button>
    </form>
  );
}
