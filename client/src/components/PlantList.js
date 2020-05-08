import React, { Component } from "react";
import axios from "axios";

export default class PlantList extends Component {
  constructor(props){
    super(props);
    this.state = {
      plants: [],
      searchTerm: "",
      searchResults:[]
    }
    this.fetchPlants = this.fetchPlants.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    axios
      .get('http://localhost:3333/plants')
      .then(res => {
        this.setState({plants: res.data.plantsData})
      })
      .catch(err => console.log(err));
  }

  fetchPlants(){
    const results = this.state.plants.filter(plant =>
      plant.toLowerCase().includes(this.state.searchTerm.toLowerCase()));
      this.setState({...this.state, searchResults: results})
   
  };

  handleChange = event => {
    console.log(event.target.value)
    //this.setState({...this.state, searchResults: event.target.value});
  }

  
  // add state with a property called "plants" - initialize as an empty array

  // when the component mounts:
  //   - fetch data from the server endpoint - http://localhost:3333/plants
  //   - set the returned plants array to this.state.plants

  /*********  DON'T CHANGE ANYTHING IN THE RENDER FUNCTION *********/
  render() {
    console.log(this.state.searchResults)
    return (
      <main className="plant-list">
         <form>
        <label htmlFor="searchTerm">Search For Your Fav Plant</label>
        <input
          id="searchTerm"
          type="text"
          name="searchTerm"
          placeholder="Search"
          value={this.state.searchTerm}
          onChange={this.handleChange}
        />
      </form>
      <div className="plant-list">
        <ul>
          {this.state.searchResults.map(plant => (
            <li key={plant}>{plant}</li>
          ))}
        </ul>
      </div>
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
