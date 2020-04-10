import React  from 'react'


export const Search = (props) => {
    return (
        <form onSubmit={props.onSubmit}>
            <i className="fas fa-search"></i>
            <input type="search" placeholder="Enter a location" onChange={props.onChange} value={props.value}/>
        </form>
    )
}