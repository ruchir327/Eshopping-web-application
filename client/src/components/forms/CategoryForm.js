import { Button } from "antd";
import { SyncOutlined } from "@ant-design/icons";

export default function CategoryForm({
  value,
  setValue,
  handleSubmit,
  buttonText = "Submit",
  handleDelete,
}) {
  return (
    <div className="p-3">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control p-3"
          placeholder="Write category name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="d-flex justify-content-between pt-4">
          <div style={{ width: "200px" }}>
            <Button type="primary" onClick={handleSubmit} block>
              {buttonText}
            </Button>
          </div>
          {handleDelete && (
            <div style={{ width: "200px" }}>
              <Button type="danger" onClick={handleDelete} block>
                Delete
              </Button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
