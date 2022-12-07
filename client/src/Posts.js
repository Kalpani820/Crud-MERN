import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

function Posts() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [updatedPost, setUpdatedPost] = useState({
    id: "",
    title: "",
    description: "",
  });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    axios
      .get("/posts")
      .then((res) => {
        console.log(res);
        setPosts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const deletePost = (id) => {
    console.log(id);

    axios
      .delete(`/delete/${id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    window.location.reload();
  };

  const updatePost = (id, title, description) => {
    setUpdatedPost((prev) => {
      return {
        ...prev,
        id: id,
        title: title,
        description: description,
      };
    });
    handleShow();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedPost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const saveUpdatedPost = () => {
    console.log(updatedPost);

    axios
      .put(`/update/${updatedPost.id}`, updatedPost)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    handleClose();
    window.location.reload();
  };

  return (
    <div className="container-md container-fluid" style={{ width: "90%", margin: "auto auto", marginTop: "2rem", textAlign: "center" }}>
      <div class="container">
        <div class="row justify-content-md-center">

          <div class="row-md-auto" style={{ color: "red" }}>
            <h1>Your Magical thoughts</h1>
          </div>
          <div class="row-md-auto">
            <Button
              variant="dark"
              style={{ marginBottom: "1rem", float: "right" }}
              onClick={() => navigate(-1)}
            >
              POST NEW +
            </Button>
          </div>
        </div>
      </div>



      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update a post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            placeholder="title"
            name="title"
            value={updatedPost.title ? updatedPost.title : ""}
            style={{ marginBottom: "1rem" }}
            onChange={handleChange}
          />
          <Form.Control
            placeholder="description"
            name="description"
            onChange={handleChange}
            value={updatedPost.description ? updatedPost.description : ""}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={saveUpdatedPost}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {posts ? (
        <>
          {posts.map((post) => {
            return (
              <div className="container-md container-fluid">
                <div
                  style={{
                    marginBottom: "1rem",
                    border: "solid lightgray 1px",
                    borderRadius: "8px",
                  }}
                  key={post._id}
                >
                  <h4>{post.title}</h4>
                  <p>{post.description}</p>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",

                      padding: "1rem",
                    }}
                  >
                    <div class="container">
                      <div class="row justify-content-md-center" style={{ float: "right" }}>

                        <div class="col-md-auto">
                          <Button
                            variant="info"
                            onClick={() =>
                              updatePost(post._id, post.title, post.description)
                            }
                            style={{ float: "right" , marginBottom:"5px"}}
                          >
                            UPDATE
                          </Button>
                        </div>
                        <div class="col-md-auto">
                          <Button
                            onClick={() => deletePost(post._id)}
                            variant="outline-danger"
                            style={{float:"right"}}
                          >
                            DELETE
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default Posts;
