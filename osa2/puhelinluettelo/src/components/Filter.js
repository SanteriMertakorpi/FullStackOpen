import React from "react"
const Filter = (props) =>{
    return(
      <div>
        <form>
          <div>
            filter shown with <input 
                                value={props.newFilter}
                                onChange={props.handleFilterChange} 
                              />
          </div>
        </form>
      </div>
    )
}
export default Filter