/*
  INSTRUCTION:
  - Import useState and useEffect from "react"
  - Import the fetchMenu function from "../utils/api"
*/
import { useState, useEffect } from "react";
import { fetchMenu } from "../utils/api";

const STATES = ["Penang", "Kuala Lumpur", "Melaka", "Perak", "Kelantan", "Sarawak"];
const COURSES = ["Main", "Dessert", "Drink"];

function Menu() {
    const [items, setItems] = useState([]);
    const [search, setSearch] = useState("");
    const [state, setState] = useState("");
    const [course, setCourse] = useState("");
    const [sort, setSort] = useState("");
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    /*
    INSTRUCTION:
    - Use useState to store the list of menu items returned by the API
    - Use useState to store the search term, the selected state and the
      selected course
    - Use useState to store the selected sort option, the current page number
      and the number of items per page
    - Use useState to store the total number of items and the total number of
      pages returned by the API
    - Use useState to store a loading flag and an error message

    - Use useEffect to fetch the menu from the back-end. The effect must run
      again whenever the search term, the selected state, the selected course,
      the sort option, the page number or the number of items per page changes.

    - Remember: this endpoint returns an object. The items are in the `data`
      property, the number of matching items is in the `total` property and
      the number of pages is in the `totalPages` property.

    - When the search term, a filter, the sort option or the number of items
      per page changes, go back to page 1.
  */
    useEffect(() => {
        let cancelled = false;

        async function loadMenu() {
            setLoading(true);
            setError("");
            try {
                const result = await fetchMenu({
                    search,
                    state,
                    course,
                    sort,
                    page,
                });
                console.log(typeof result.data);
                if (cancelled) return;
                setItems(Array.isArray(result.data) ? result.data : []);
                setTotal(Number(result.total) || 0);
                setTotalPages(Number(result.totalPages) || 0);
            } catch (err) {
                if (!cancelled) {
                    setError(err.message || "Some wrong");
                    setItems([]);
                    setTotal(0);
                    setTotalPages(0);
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        loadMenu();

        return () => {
            cancelled = true;
        };
    }, [search, state, course, sort, page]);

    function updateSearch(value) {
        setSearch(value);
        setPage(1);
    }

    function updateFilter(setter, value) {
        setter(value);
        setPage(1);
    }

    return (
        <div className="menu">
            <div className="controls">
                <label className="search-control">
                    <span>Search menu</span>
                    <input type="search" value={search} onChange={(e) => updateSearch(e.target.value)} placeholder="Search name or main ingredient..." />
                </label>
                <label>
                    <span>State</span>
                    <select value={state} onChange={(e) => updateFilter(setState, e.target.value)}>
                        <option value="">All states</option>
                        {STATES.map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    <span>Course</span>
                    <select value={course} onChange={(e) => updateFilter(setCourse, e.target.value)}>
                        <option value="">All courses</option>
                        {COURSES.map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    <span>Sort by</span>
                    <select value={sort} onChange={(e) => updateFilter(setSort, e.target.value)}>
                        <option value="">None</option>
                        <option value="name">Name (A-Z)</option>
                        <option value="price">Price (cheapest first)</option>
                    </select>
                </label>
            </div>
            {totalPages > 1 && (
                <nav className="pagination" aria-label="Menu pagination">
                    <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
                        Previous
                    </button>
                    {Array.from({ length: totalPages }, (____, i) => i + 1).map((number) => (
                        <button key={number} className={page === number ? "active" : ""} aria-current={page === number ? "page" : undefined} onClick={() => setPage(number)}>
                            {number}
                        </button>
                    ))}
                    <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
                        Next
                    </button>
                </nav>
            )}

            <>
                <div className="table-wrap">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Course</th>
                                <th>State</th>
                                <th>Main ingredient</th>
                                <th className="numeric">Calories</th>
                                <th className="numeric">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => (
                                <tr key={item.id}>
                                    <td className="item-name">{item.name}</td>
                                    <td>
                                        <span>{item.course}</span>
                                    </td>
                                    <td>{item.state}</td>
                                    <td className="ingredient">{item.mainIngredient}</td>
                                    <td className="">{item.calories}</td>
                                    <td className="price">RM {Number(item.price).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </>
            {/*
        INSTRUCTION:
        - Add these controls above the table:
            - a search box that lets the user search the menu. The search must
              be sent to the BACK-END, which matches the search term against
              the item name and the main ingredient.
            - a dropdown to filter by state, with an option for every state
              (Penang, Kuala Lumpur, Melaka, Perak, Kelantan, Sarawak) plus an
              "All states" option that clears the filter
            - a dropdown to filter by course, with an option for every course
              (Main, Dessert, Drink) plus an "All courses" option that clears
              the filter
            - a dropdown to sort the items, with three options:
                "None" (the default — no sorting is applied),
                "Name (A-Z)" which sends sort=name,
                "Price (cheapest first)" which sends sort=price
            - a dropdown that lets the user choose how many items are shown
              per page (5, 10 or 20). The default is 10.

        - Both filters must be able to be applied at the same time. Searching,
          filtering and sorting must all be performed by the BACK-END, not in
          the browser.

        - Display the items in a table. Each row must show:
            the name, the course, the state, the main ingredient,
            the calories and the price
            

        - Add pagination controls below the table so the user can move between
          pages. The page that is currently being viewed should be highlighted,
          and the controls must ask the BACK-END for each page.

        - Show a loading message while the data is being fetched
        - Show an error message if the API call fails
        - If no items are returned, display the message "No items found"

        - Refer to Figures 1 to 10 in the question paper
      */}
        </div>
    );
}

export default Menu;
