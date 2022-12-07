import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const createPost = (e) => {
    e.preventDefault();

    axios
      .post("/create", post)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    navigate("posts");
  };

  return (
    <div className="container-md container-fluid" style={{ marginTop: "2rem" }}>

      <h1 style={{ color: "red" }}>Write your Post here</h1>
      <Form>
        <Form.Group>
          <Form.Control
            name="title"
            value={post.title}
            onChange={handleChange}
            style={{ marginBottom: "1rem" }}
            placeholder="title"
          />

          <div class="form-floating">
        
            
            <Form.Control
            class="form-control"
            onChange={handleChange}
            name="description"
            value={post.description}
            style={{ marginBottom: "1rem",height: "200px" }}
            placeholder="description"
          />
          <label for="floatingTextarea2">Write here.....</label>
          </div>

          

        </Form.Group>


        <div class="container">
          <div class="row justify-content-md-center" style={{float:"right"}}>

            <div class="col-md-auto">
              <Button
                onClick={createPost}
                variant="danger"
                style={{ marginBottom: "1rem"}}
              >
                POST YOUR THOUGHT
              </Button>
            </div>
            <div class="col-md-auto">
              <Button
                onClick={() => navigate("posts")}
                variant="outline-danger"
                
              >
                CANCEL
              </Button>
            </div>
          </div>
        </div>
      </Form>

    </div>
  );
}

export default CreatePost;
