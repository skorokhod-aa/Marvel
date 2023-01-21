
import './employees-list-item.css'

const EmployeesListItem = (props) => {

    const {name, salary, onToggleProp, onDelete, increase, rise} = props


    let newClass = "list-group-item d-flex justify-content-between";
    if (increase === true){
        newClass+=" increase"
    }
    if (rise === true){
        newClass+=" like"
    }

    return (
        <li className={newClass}>
            <span onClick={onToggleProp} className="list-group-item-label" data-prop="rise">{name}</span>
            <input type="text" className="list-group-item-input" defaultValue={salary + '$'}/>
            <div className='d-flex justify-content-center align-items-center'>
                <button type="button"
                    className="btn-cookie btn-sm "
                    onClick={onToggleProp}
                    data-prop="increase">
                    <i className="fas fa-cookie"></i>
                </button>

                <button type="button"
                        className="btn-trash btn-sm "
                        onClick = {onDelete}>
                    <i className="fas fa-trash"></i>
                </button>
                <i className="fas fa-star"></i>
            </div>
        </li>
    )
}

export default EmployeesListItem