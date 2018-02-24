import React from 'react';

const APPS = [
    {id : "APP_10",
    name : "Google"},
    {id : "APP_15",
    name : "Localhost React APP2"},
    {id: "APP_20",
    name : "Macif"}
]

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { applicationInformations: null };
    this.searchInformations = this.searchInformations.bind(this);
  }

  searchInformations(buttonID) {

    console.log('Load ' + buttonID + ' informations from LocalStorage or API');

    const  value  = buttonID;

    this.search(value);

  }

  search(value) {
    if (value === '') {
        return;
    }

    const cachedHits = localStorage.getItem(value);
    if (cachedHits) {
        console.log('Find in localStorage, no need to call API !!');
        const result = JSON.parse(cachedHits);
        this.setState({ applicationInformations: result});
        console.log('Open url : ' + result.applicationUrl)
        window.open(result.applicationUrl, "_blank")

    }
    else {
        fetch('http://localhost:8080/application/informations?application_id=' + value)
        .then(response => response.json())
        .then(result => this.onSetResult(result, value));
    }
    
  }

  onSetResult (result, key) {
    localStorage.setItem(key, JSON.stringify(result));
    this.setState({ applicationInformations: result });
    console.log('open url : ' + result.url);
    window.open(result.applicationUrl, "_blank");
  }

  render() {
    return (
      <div>
        <h1>F@cette applications simulations</h1>
        <p>App informtions in LocalStorage.</p>

        {
          APPS.map(app=> 
            <button key={app.id} onClick={() => this.searchInformations(app.id)} type="text">{app.name}</button>
          )
        }

        
      </div>
    );
  }
}

export default App;