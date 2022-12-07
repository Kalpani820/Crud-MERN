import "./App.css";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  return (
    <div className="container-md container-fluid">
      <div className="App">

        <div class="container">
          <div class="row justify-content-md-center">

            <div class="col" style={{ paddingTop: "35vh" }}>
              <p class="fs-2 fw-bold">
                Post Your thoughts!
                Share with us!
              </p>

              <Button
                variant="danger"
                style={{ width: "50%" }}
                onClick={() => navigate("create")}
              >
                NEXT
              </Button>
            </div>
            <div class="col-lg-auto">
              <img src="https://img.freepik.com/free-vector/creative-thinking-concept-illustration_114360-2603.jpg?w=740&t=st=1670444395~exp=1670444995~hmac=b1a2b87711dc21db4cf17c654eace944a8a1eb6bb45dd7a30011fbd288f70d6f"
                class="img-fluid" alt="thinking" style={{ height: "100vh" }} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
