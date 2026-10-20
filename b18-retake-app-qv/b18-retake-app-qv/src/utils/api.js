/*
  INSTRUCTION:
  - Create a constant API_URL that holds the base URL of the back-end.
    The Express server in the b18-retake-api folder runs on http://localhost:5123
  - Create a function fetchMenu that calls GET /menu.
    It must be able to send an optional `search`, an optional `state`, an
    optional `course` and an optional `sort` parameter ("name" or "price"),
    together with a `page` parameter and a `limit` parameter. Any of them can
    be sent at the same time.
    Remember: this endpoint returns an OBJECT, not an array. The items are in
    the `data` property, and `totalPages` tells you how many pages there are.

  - Export the function so the Menu component can import it.

  Use the native fetch() function. Refer to the README.md file inside the
  b18-retake-api folder for the full API documentation.
*/

export const API_URL = "http://localhost:5123";

export async function fetchMenu({ search = "", state = "", course = "", sort = "", page = 1, limit = 10 } = {}) {
    const params = new URLSearchParams();
    if (search.trim()) params.set("search", search.trim());
    if (state) params.set("state", state);
    if (course) params.set("course", course);
    if (sort) params.set("sort", sort);
    params.set("page", String(page));
    params.set("limit", String(limit));
    const query = params.toString();
    params.set("page", String(page));
    params.set("limit", String(limit));
    const response = await fetch(`${API_URL}/menu${query ? `?${query}` : ""}`);
    return response.json();
}
