import React, { Component } from "react";
import "./Home.css";


let isAlertForNA = false
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Location: "New_Delhi",
      userLocation: "N/A",
      tempC: "N/A",
      tempF: "N/A",
      apiLocation: "N/A",
      apiRegion: "N/A",
      apiCountry: "N/A",
      apiTime: "N/A",
      apifeelslikec: "N/A",
      apifeelslikef: "N/A",
      apiLastUpdate: "N/A",
      backgroundColorrState: "N/A",
      backgroundColorrStateGradient: "N/A",
      pageBackground: "black",
      pageColor: "white",
      SunOpacity: 1,
      moonOpacity: 0,
      suncolor: "white",
      mooncolor: "black",
      progress: "0%",
      progressColor: "bg-info",
      alertmsg: null,
      YourWhatsappNumber:"Remove this text & Enter Your Whatsapp Number Here"

    };
  }
  async componentDidMount() {
    await this.getweather();
  }

  async getweather() {
    try {
      this.setState({ progress: "3%" });
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "ccbbb9265fmsh23310fd9f46a253p1c2e41jsn6a15149f6366",
          "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
        },
      };
      let url = await fetch(
        `https://weatherapi-com.p.rapidapi.com/current.json?q=${this.state.Location}`,
        options
      );
      let response = await url.json();
      this.setState({ apiCountry: response.location.country });
      this.setState({ apiLocation: response.location.name });
      this.setState({ apiRegion: response.location.region });
      this.setState({ apiTime: response.location.localtime });
      this.setState({ tempC: response.current.temp_c });
      this.setState({ tempF: response.current.temp_f });
      this.setState({ apiLastUpdate: response.current.last_updated });
      this.setState({ userLocation: this.state.apiLocation });
      this.setState({ apifeelslikec: response.current.feelslike_c });
      this.setState({ apifeelslikef: response.current.feelslike_f });
      setTimeout(() => {
        this.ChangeColor();
      }, 50);
      this.setState({ progress: "100%" });

    } catch {
      this.setState({ alertmsg: "Either location is unavailable or input is wrong. Check again.", progress: "100%" })
      isAlertForNA = true
      setTimeout(() => {
        this.setState({ alertmsg: null })
        isAlertForNA = false
      }, 3000);
    }
  }

  changeText = (userInput) => {
    this.setState({ Location: userInput.target.value});
  };

  pressHandle = () => {
    this.getweather();
  };
  ChangeColor = () => {
    if (this.state.tempC <= 20.0) {
      this.setState({ backgroundColorrState: "rgb(0,22,255)", progressColor: "bg-info" });
      this.setState({
        backgroundColorrStateGradient:
          "linear-gradient(87deg, rgba(0,22,255,1) 0%, rgba(24,228,230,1) 71%)",
      });
    }

    else if (this.state.tempC > 20.0 && this.state.tempC <= 25.0) {
      this.setState({ backgroundColorrState: "rgb(143,17,228)", progressColor: "bg-primary" });
      this.setState({
        backgroundColorrStateGradient:
          "linear-gradient(87deg, rgba(143,17,228,1) 2%, rgba(150,53,156,1) 16%, rgba(253,29,29,1) 46%, rgba(252,176,69,1) 95%)",
      });
    }

    else if (this.state.tempC > 25.0 && this.state.tempC <= 35.0) {
      this.setState({ backgroundColorrState: "rgb(255,0,0)", progressColor: "bg-warning" });
      this.setState({
        backgroundColorrStateGradient:
          "linear-gradient(87deg, rgba(255,0,0,1) 19%, rgba(251,169,16,1) 80%)",
      });
    }

    else {
      this.setState({ backgroundColorrState: "rgb(255,0,0)", progressColor: "bg-danger" });
      this.setState({
        backgroundColorrStateGradient:
          "linear-gradient(87deg, rgba(255,0,0,1) 19%, rgba(251,177,16,1) 89%)",
      });
    }
  };
  lightmodefunc = () => {
    this.setState({ pageBackground: "white", pageColor: "black" });
  };
  nightmodefunc = () => {
    this.setState({ pageBackground: "black", pageColor: "white" });
  };
  whatsapp = () => {
    window.open(`https://wa.me/${this.state.YourWhatsappNumber}?text=Hello!!%20%0Acontacting%20from%20WeatherWeb.`);
  };
  /*eslint-disable */
  render() {
    return (
      <>
        <div
          className="main"
          style={{
            backgroundColor: this.state.pageBackground,
            color: this.state.pageColor,
          }}
        >
          <div className="progress fixed-top" style={{ "height": "12px" }} role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
            <div className={`progress-bar ${this.state.progressColor}`} style={{ "width": this.state.progress, "height": "12px" }}></div>
          </div>

          <div className="container py-3">
            <header>
              <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
                <a
                  href="/"
                  className="d-flex align-items-center text-decoration-none"
                >
                  <span
                    className="fs-4 "
                    style={{ color: this.state.pageColor }}
                  >
                    WeatherWeb
                  </span>
                </a>
                <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">

                  <i
                    onClick={this.whatsapp}
                    className="fa-brands mx-3 fa-whatsapp"
                  ></i>

                  <div
                    className="sunicon mx-2"
                    onClick={this.lightmodefunc}
                    style={{ color: this.state.suncolor }}
                  >
                    <i className="fa-solid fa-sun"></i>
                  </div>
                  <div
                    className="moonicon"
                    onClick={this.nightmodefunc}
                    style={{ color: this.state.mooncolor }}
                  >
                    <i className="fa-solid fa-moon"></i>
                  </div>
                </nav>
              </div>

              {isAlertForNA === true && <div class="alert text-center alert-danger alert-dismissible fade show" role="alert">
                <i class="fa fa-info-circle mx-2" aria-hidden="true"></i>
                <strong>{this.state.alertmsg}</strong>
              </div>}


              <div className="pricing-header p-3 pb-md-4 mx-auto text-center">
                <h1 className="display-4 fw-bold fw-normal">
                  {this.state.apiLocation}
                </h1>
                <p className="fs-5 ">
                  All details related to {this.state.apiLocation}'s weather are
                  listed below.
                </p>
              </div>

              <div className="text-center">
                <div className="input-group">
                  <input
                    type="text"
                    id="inputbox"
                    style={{
                      borderColor: "red",
                      borderWidth: "3px",
                      backgroundColor: this.state.pageBackground,
                      color: this.state.pageColor,
                    }}
                    onChange={this.changeText}
                    className="form-control text-center fs-3"
                    placeholder="Search City, State or Country"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </div>
                <div className="my-3">
                  <div
                    className="btn btn-lg btn-warning px-4 fw-bold"
                    onClick={this.pressHandle}
                  >
                    Enter
                  </div>
                </div>
              </div>
            </header>
            <div className="text-center my-3">
              <div className="mb-2 text-center">
                <div className="col">
                  <div
                    className="card mb-4 rounded-4 border border-light border-3  shadow-sm"
                    style={{

                      background: this.state.backgroundColorrState,
                      background: this.state.backgroundColorrStateGradient,
                      color: "white",
                    }}
                  >
                    <div className="card-body">
                      <h1 className="card-title pricing-card-title py-2">
                        {this.state.tempC}°C
                      </h1>
                      <ul className="list-unstyled mt-3 mb-4">
                        <li>Feels like {this.state.apifeelslikec}°C</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-2 text-center">
                <div className="col">
                  <div
                    className="card mb-4 rounded-4 border border-light border-3 shadow-sm"
                    style={{


                      background: this.state.backgroundColorrState,
                      background: this.state.backgroundColorrStateGradient,
                      color: "white",
                    }}
                  >
                    <div className="card-body">
                      <h1 className="card-title pricing-card-title py-2">
                        {this.state.tempF}°F
                      </h1>
                      <ul className="list-unstyled mt-3 mb-4">
                        <li>Feels like {this.state.apifeelslikef}°F</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-2 text-center">
                <div className="col">
                  <div
                    className="card mb-4 rounded-4 border border-light border-3 shadow-sm"
                    style={{


                      background: this.state.backgroundColorrState,
                      background: this.state.backgroundColorrStateGradient,
                      color: "white",
                    }}
                  >
                    <div className="card-body">
                      <h1 className="card-title pricing-card-title py-2">
                        {this.state.apiRegion}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-2 text-center">
                <div className="col">
                  <div
                    className="card mb-4 rounded-4 border border-light border-3 shadow-sm"
                    style={{


                      background: this.state.backgroundColorrState,
                      background: this.state.backgroundColorrStateGradient,
                      color: "white",
                    }}
                  >
                    <div className="card-body">
                      <h1 className="card-title pricing-card-title py-2">
                        {this.state.apiCountry}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-2 text-center">
                <div className="col">
                  <div
                    className="card mb-4 rounded-4 border border-light border-3 shadow-sm"
                    style={{


                      background: this.state.backgroundColorrState,
                      background: this.state.backgroundColorrStateGradient,
                      color: "white",
                    }}
                  >
                    <div className="card-body">
                      <h1 className="card-title pricing-card-title py-2">
                        {this.state.apiTime}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
