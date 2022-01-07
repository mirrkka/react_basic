import EmployeesListItem from "../employees-list-item/employees-list-item";

import './employees-list.css';

const EmployeesList = ({data, onDelete, onToggleIncrease, onToggleRise}) => {

    const elements = data.map( item => { // item -- каждый элемент массива
        const {id, ...itemProps} = item; // деструктуризация, достаем id из item, оставляя другие пропсы
        return (
            <EmployeesListItem 
            key = {id} 
            {...itemProps} // spread-оператор, который разворачивает item'ы {item.name} salary = {item.salary}
            onDelete = {() => onDelete(id)}
            onToggleIncrease = {() => onToggleIncrease(id)}
            onToggleRise = {() => onToggleRise(id)}/> 
        )
    })
    return (
        <ul className="app-list list-group">
            {elements}
        </ul>
    )
}

export default EmployeesList;