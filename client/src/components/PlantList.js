import React, { Component } from "react";
import axios from "axios";


export default class PlantList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plants: [],
      plantFilter: "",
      filteredPlants: [],
    };
    
    this.handleChange = this.handleChange.bind(this);
    //this.filterPlants = this.filterPlants.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://localhost:3333/plants")
      .then((res) => {
        this.setState({ plants: res.data.plantsData,  filteredPlants: res.data.plantsData});
      })
      .catch((err) => console.log(err));   

    }

    componentDidUpdate(prevProps, prevState) {
      if (prevState.plantFilter !== this.state.plantFilter) {
        this.setState({
          plants: this.state.filteredPlants.filter((x) =>
              x.name.toLowerCase().includes(this.state.plantFilter.toLowerCase())
              || x.scientificName.toLowerCase().includes(this.state.plantFilter.toLowerCase())|| x.difficulty.toLowerCase().includes(this.state.plantFilter.toLowerCase()) || x.light.toLowerCase().includes(this.state.plantFilter.toLowerCase()) || x.description.toLowerCase().includes(this.state.plantFilter.toLowerCase()))
        });
      }
    }


  // filterPlants(plantFilter) {
  //   let filteredPlants = this.state.plants;
   
  //   this.setState({
  //     filteredPlants: filteredPlants.filter((plant) =>{
  //       //plant is an object of all the plants
  //       //plant.name is the name of each plant
  //       let plantName = plant.name.toLowerCase().includes(plantFilter.toLowerCase())
  //     })
  //   })
  // }
  
  handleChange = (event) => {
    this.setState({plantFilter: event.target.value});
    // this.filterPlants(event.target.value);
  };
  
  // add state with a property called "plants" - initialize as an empty array

  // when the component mounts:
  //   - fetch data from the server endpoint - http://localhost:3333/plants
  //   - set the returned plants array to this.state.plants

  /*********  DON'T CHANGE ANYTHING IN THE RENDER FUNCTION *********/
  render() {  
    return (
      <main className="plant-list">
        <form>
          <label htmlFor="filter">What Plant Do You Need To Brighten Your Life?</label>
          <input
            name="searchValue"
            type="text"
            placeholder="Search"
            //value={this.state.plantFilter}
            onChange={this.handleChange}
          />
          </form>
        {this.state?.plants?.map((plant) => (
          <div className="plant-card" key={plant.id}>
            <img className="plant-image" src={plant.img} alt={plant.name} />
            <div className="plant-details">
              <h2 className="plant-name">{plant.name}</h2>
              <p className="plant-scientific-name">{plant.scientificName}</p>
              <p>{plant.description}</p>
              <div className="plant-bottom-row">
                <p>${plant.price}</p>
                <p>☀️ {plant.light}</p>
                <p>💦 {plant.watering}x/month</p>
              </div>
              <button
                className="plant-button"
                onClick={() => this.props.addToCart(plant)}
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </main>
    );
  }
}

