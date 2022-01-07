import {Component} from 'react'

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
  constructor(props) {
    super (props)
    this.state = {
      data:  [
        {name: 'John K.', salary: 3000, increase: false, like: false, id: 1},
        {name: 'Angelina G.', salary: 3500, increase: true, like: true, id: 2},
        {name: 'Brad P.', salary: 5000, increase: false, like: false, id : 3}
      ],
      term: '',
      filter: 'all'

    }
  }

  deleteItem = (id) => {
    this.setState(({data}) => {
      //const index = data.findIndex(elem => elem.id === id)
      
      return {
        data: data.filter(item => item.id !== id)
      }
    })
  }

  addItem = (name, salary) => {
    const newItem = {
        name, 
        salary,
        increase: false,
        like: false,
        id: this.maxId++
    }
    this.setState(({data}) => {
        const newArr = [...data, newItem];
        return {
            data: newArr
        }
    });
}


  onToggleIncrease = (id) => {
  /*this.setState(({data}) => {
    const index = data.findIndex(elem => elem.id === id);
    const old = data[index]
    const newItem = {...old, increase: !old.increase}
    const newArr = [...data.slice(0, newItem), newItem, ...data.slice(index + 1) ];

    return {
      data: newArr */

      this.setState(({data}) => ({
       data: data.map(item => {
        if (item.id === id) {
          return {...item, increase: !item.increase}
        }
        return item;
        })
      }))

}
    
  

onToggleRise = (id) => {
  this.setState(({data}) => ({
    data: data.map(item => {
     if (item.id === id) {
       return {...item, like: !item.like}
     }
     return item;
     })
   }))
}

searchEmp = (items, term) => {
  if (term.length === 0) {
    return items
  }

  return items.filter(item => {
    return item.name.indexOf(term) > -1
  })

}

onUpdateSearch = (term) => {
  
  this.setState({term})
}
  
filterPost = (items, filter) => {
  switch (filter) {
    case 'rise':
    return items.filter(item => item.like);
    case 'moreThan1000':
      return items.filter (item => item.salary > 1000);
    default: return items
  }
}


onFilterSelect = (filter) => {
  this.setState({filter})

}
  render() {
    const {data, term, filter} = this.state;
    const employees = this.state.data.length;
    const increased = this.state.data.filter(item => item.increase).length;
    const visibleData = this.filterPost(this.searchEmp(data, term), filter)

    return (
      <div className="app">
          <AppInfo employees = {employees} increased = {increased}/>
  
          <div className="search-panel">
              <SearchPanel onUpdateSearch = {this.onUpdateSearch}/>
              <AppFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
          </div>
          
          <EmployeesList  
          data = {visibleData}
          onDelete = {this.deleteItem}
          onToggleIncrease = {this.onToggleIncrease}
          onToggleRise = {this.onToggleRise}/>
          <EmployeesAddForm
          onAdd = {this.addItem}/>
      </div>
    );
  }
}

export default App;
