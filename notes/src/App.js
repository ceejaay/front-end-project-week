import React, { Component } from 'react';
import axios from 'axios';
import NoteList from './components/NoteList'
import NoteForm from './components/NoteForm'
import NavBar from './components/NavBar'
import NoteCard from './components/NoteCard'
import UpdateForm from './components/UpdateForm'
// import DeleteNote from './components/DeleteNote'
import {Route } from 'react-router-dom'
import './App.css';

class App extends Component {
  constructor() {
    super()
      this.state = {
        notes: []
      }

  }

  componentDidMount() {
    axios
      .get('https://fe-notes.herokuapp.com/note/get/all')
      .then(res => this.setState({notes: res.data}))
      .catch(error => console.log(error))
    //axios stuff here
  }




 createNote = (noteData) => {
     axios
      .post('https://fe-notes.herokuapp.com/note/create', noteData ) 
      // .then(res => console.log(res))
      //we need to try to get get an update of the notes here.
     // .get('https://fe-notes.herokuapp.com/note/get/all')
      // .then(res => this.setState({notes: res.data}))
      .then(res => this.props.history.push(`/note/${res.data.success}`))
      // .then(res => this.setState({notes: res.data}) )
      .catch(err => console.log(err))
  }

 deleteNote = (noteId) => {
   axios
     .delete(`https://fe-notes.herokuapp.com/note/delete/${noteId}`)
     .then(res => console.log(res))
     .catch(err => console.log(err))
 }




  render() {
    return (
      <div className="App">
        <NavBar />
        <Route exact path={'/'} render={(props) => <NoteList notes={this.state.notes} />} />
        <Route path={'/newNote'} render={(props) => <NoteForm {...props}  createNote={this.createNote} updateNote={this.updateNote}/>} />
        <Route path={'/note/:id'}  render={(props) => <NoteCard {...props} notes={this.state.notes} deleteNote={this.deleteNote} />  }/>
        <Route path={'/updateForm/:id'} component={UpdateForm} />
      </div>
    );
  }
}

export default App;
