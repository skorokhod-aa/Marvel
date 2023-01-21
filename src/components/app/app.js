import { Component } from 'react'

import AppInfo from '../app-info/app-info'
import SearchPanel from '../search-panel/search-panel'
import AppFilter from '../app-filter/app-filter'
import EmployeesList from '../employees-list/employees-list'
import EmployeesAddForm from '../employees-add-form/employees-add-form'

import './app.css'

class App extends Component{

    constructor(props){
        super(props)
        this.state = {
            data: [
                {name: 'John C.', salary: 800, increase: false, rise: true, id: 1},
                {name: 'Alex S.', salary: 1500, increase: false, rise: false, id: 2},
                {name: 'Mark O.', salary: 1900, increase: true, rise: false, id: 3}
            ],
            term: '',
            filter: 'all'
        }
        this.maxId = 4
    }

    searchEmp = (items, term) => {
        if (term === ''){
            return items
        }
        return items.filter((item) => {
            return item.name.indexOf(term) > -1
        })
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            return {data: data.filter((item) => item.id !==id )}
        })
    }
    
    addForm = (name, salary) => {
        const newItem = {
            name: name,
            salary: salary,
            increase: false,
            rise: false,
            id: this.maxId++
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem]
            return {data: newArr}
        })
    }

    onUpdateSearch = (term) => {
        this.setState({term: term})
    }

    onToggleProp = (id, prop) => {
        this.setState(({data}) => ({
            data: data.map((item) => {
                if (item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item
            })
        }))
    }

    onToggleIncrease = (id) => {
        this.setState(({data}) => ({
            data: data.map((item) => {
                if (item.id === id) {
                    return {...item, increase: !item.increase}
                }
                return item
            })
        }))
    }

    onToggleRise = (id) => {
        this.setState(({data}) => ({
            data: data.map((item) => {
                if (item.id === id) {
                    return {...item, rise: !item.rise}
                }
                return item
            })
        }))
    }

    filterPost = (items, filter) => {
        switch(filter){
            case 'rise':
                return items.filter(item => item.rise)
            case 'moreThan1000':
                return items.filter(item => item.salary > 1000)
            default:
                return items
        }
    }

    onSelectFilter = (filter) => {
        this.setState({filter: filter})

    }


    countIncrease = () => {
        return this.state.data.filter(item => item.increase).length
    }

    render(){
        const visibleData = this.filterPost(this.searchEmp(this.state.data, this.state.term), this.state.filter)

        return (
            <div className="app">
                <AppInfo 
                    countEmployees = {this.state.data.length}
                    countIncrease = {this.countIncrease()}/>
                <div className="search-panel">
                    <SearchPanel
                    onUpdateSearch = {this.onUpdateSearch}
                    />
                    <AppFilter
                    onSelectFilter = {this.onSelectFilter}
                    filter = {this.state.filter}
                    />
                </div>
                    
                <EmployeesList 
                    data = {visibleData}
                    onDelete = {this.deleteItem}
                    // onToggleIncrease = {(id) => this.onToggleIncrease(id)}
                    // onToggleRise = {(id) => this.onToggleRise(id)}
                    onToggleProp = {this.onToggleProp}
                />
                
                <EmployeesAddForm
                    onAddForm = {this.addForm}
                    />
    
            </div>
            
        )
    }
}

export default App

