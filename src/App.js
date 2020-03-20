import React from 'react';
import './App.css';
import quit from './quit.png'

function SearchBar(props) {
    return (

    <div className="SearchBarContainer">
      <h1>TODO</h1>
      <form >
        <input className="SearchBar" type="text" value={props.UserInput} onChange={props.handleChange} onKeyPress={props.handleKeyPress} />
      </form>

    </div>
    );
};


function handleTaskExpansion() {
  // alert("taxk expanded");
}

function handleTaskSimplify(id) {
  // alert("task minimized" + id);
}
function Task(props) {


  if( props.task["completed"] !== true){

    return(

      <li onMouseLeave={() => handleTaskSimplify(props.id)} onMouseEnter={handleTaskExpansion} onClick={() => props.handleItemCheckOff(props.id)}>
      {props.task["taskText"]}
      </li>

    );
  } else {

    return(
      <li className="CompletedTask" onMouseLeave={() => handleTaskSimplify(props.id)} onMouseEnter={handleTaskExpansion} onClick={() => props.handleItemCheckOff(props.id)}>
      {props.task["taskText"]}
      </li>
    );

  }

}

// delete button
//<img className="DeleteButton" src={quit} />


function TaskList(props) {
  const listTasks = props.tasks.map((task, index) =>
  <Task task={task} key={index} id={index} handleItemCheckOff={props.handleItemCheckOff}/>
  );

  return(
    <div className="TaskBoard">
      {props.tasks.length < 1 &&
        <p> no tasks...</p>
      }
      <ul>{listTasks}</ul>

    </div>
  );

}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: "",
      tasks: []
    }

    // bind function
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleItemCheckOff = this.handleItemCheckOff.bind(this);
  }

  handleItemCheckOff(id) {
    var list = this.state.tasks.slice();
    var completed = !this.state.tasks[id]["completed"]
    list[id] = { "taskText": this.state.tasks[id]["taskText"], "completed": completed}
    // list.splice(id,1);
    this.setState({
      tasks: list
    });

  }

  // handleItemCheckOff(id) {
  //   var list = this.state.tasks.slice();
  //   list.splice(id,1);
  //   this.setState({
  //     tasks: list
  //   });

  // }

  handleChange(event) {
    this.setState({userInput: event.target.value});
  }


  // aka adding task to the list
  handleKeyPress(event) {
    if( event.key === "Enter" ) {

      if(this.state.userInput !== "") {
        var list = this.state.tasks.slice();
        list.unshift({ "taskText": this.state.userInput, "completed": false});
        this.setState({
          userInput: "",
          tasks: list
        });
        event.target.value = "";
      }
      // alert( " \"" + this.state.userInput + " \" - added to list" );

      event.preventDefault();
    }
  }



  render() {

    return (
      <div className="App">
        <SearchBar userInput={this.state.userInput} handleChange={this.handleChange} handleKeyPress={this.handleKeyPress}/>
        <TaskList tasks={this.state.tasks} handleItemCheckOff={this.handleItemCheckOff}/>
      </div>
    );

  }

};

export default App;
