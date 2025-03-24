export default function AddItem() {
    return <form>
        <h1>Add Item</h1>
        <form>
            <fieldset>
                <label htmlFor="name">Name</label>
                <input name={"name"}/>
            </fieldset>
            <fieldset>
                <label htmlFor="description">Description</label>
                <input name={"description"}/>
            </fieldset>
            <fieldset>
                <label htmlFor="category">Category</label>
                <input name={"category"}/>
            </fieldset>
            <fieldset>
                <label htmlFor="image">Image</label>
                <input name={"image"}/>
            </fieldset>
        </form>
    </form>
}