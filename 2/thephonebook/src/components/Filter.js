const Filter = (props) => {
    return (
    <form>
        <div>
            filter shown with: <input
            value={props.newFilter}
            onChange={props.handleFilter}
            />
        </div>
      </form>
    )
}

export default Filter